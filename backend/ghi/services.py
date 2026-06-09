from dataclasses import dataclass
from decimal import Decimal, InvalidOperation

from django.db import transaction
from django.utils import timezone

from ghi.models import (
    ConversionRule,
    GHICategory,
    GHIMetric,
    GHIScoreSnapshot,
    MethodologyVersion,
    MetricScore,
    MetricValue,
)
from regions.models import Region


CATEGORY_SCORE_FIELDS = {
    "environmental": "environmental_score",
    "environmental_health": "environmental_score",
    "environmental-health": "environmental_score",
    "human": "human_wellbeing_score",
    "human_wellbeing": "human_wellbeing_score",
    "human-wellbeing": "human_wellbeing_score",
    "animal": "animal_welfare_score",
    "animal_welfare": "animal_welfare_score",
    "animal-welfare": "animal_welfare_score",
    "community": "community_health_score",
    "community_health": "community_health_score",
    "community-health": "community_health_score",
    "economic": "economic_stability_score",
    "economic_stability": "economic_stability_score",
    "economic-stability": "economic_stability_score",
    "governance": "governance_score",
}


@dataclass
class GHICalculationResult:
    snapshot: GHIScoreSnapshot
    metric_scores_created: int
    metric_scores_updated: int
    missing_metric_count: int
    missing_rule_count: int


class GHICalculationError(Exception):
    pass


def clamp_score(value):
    return max(Decimal("0"), min(Decimal("100"), value))


def quantize_score(value):
    return clamp_score(value).quantize(Decimal("0.01"))


def decimal_or_none(value):
    if value is None:
        return None

    try:
        return Decimal(value)
    except (InvalidOperation, TypeError, ValueError):
        return None


def calculate_normalized_score(raw_value, rule):
    raw_value = decimal_or_none(raw_value)

    if raw_value is None:
        return None

    minimum = decimal_or_none(rule.minimum_value)
    maximum = decimal_or_none(rule.maximum_value)
    target = decimal_or_none(rule.target_value)

    # Linear rules map a raw value between min and max onto a 0-100 score.
    if rule.rule_type == ConversionRule.RuleType.LINEAR:
        if minimum is None or maximum is None or maximum == minimum:
            return None

        return quantize_score(((raw_value - minimum) / (maximum - minimum)) * 100)

    # Inverse linear rewards lower raw values.
    if rule.rule_type == ConversionRule.RuleType.INVERSE_LINEAR:
        if minimum is None or maximum is None or maximum == minimum:
            return None

        return quantize_score(((maximum - raw_value) / (maximum - minimum)) * 100)

    if rule.rule_type == ConversionRule.RuleType.BINARY:
        if target is None:
            return None

        return Decimal("100.00") if raw_value >= target else Decimal("0.00")

    # Target range gives 100 at target and falls away with distance.
    if rule.rule_type == ConversionRule.RuleType.TARGET_RANGE:
        if minimum is None or maximum is None or target is None:
            return None

        if raw_value == target:
            return Decimal("100.00")

        range_width = max(abs(maximum - target), abs(target - minimum))

        if range_width == 0:
            return None

        distance = abs(raw_value - target)
        return quantize_score(Decimal("100") - ((distance / range_width) * 100))

    return None


def category_snapshot_field(category):
    candidates = [
        category.slug,
        category.slug.replace("-", "_"),
        category.name.lower().replace(" ", "_"),
        category.name.lower().replace(" ", "-"),
    ]

    for candidate in candidates:
        if candidate in CATEGORY_SCORE_FIELDS:
            return CATEGORY_SCORE_FIELDS[candidate]

    return None


def weighted_average(weighted_values):
    weighted_sum = sum(score * weight for score, weight in weighted_values)
    total_weight = sum(weight for _, weight in weighted_values)

    if total_weight == 0:
        return None

    return quantize_score(weighted_sum / total_weight)


@transaction.atomic
def calculate_ghi_for_region_year(region_slug, year):
    region = Region.objects.get(slug=region_slug)
    methodology = (
        MethodologyVersion.objects.filter(is_active=True)
        .order_by("-published_date", "-created_at")
        .first()
    )

    if methodology is None:
        raise GHICalculationError("No active GHI methodology version was found.")

    metrics = (
        GHIMetric.objects.filter(is_active=True)
        .select_related("category")
        .order_by("category__name", "name")
    )

    metric_scores = {}
    created_count = 0
    updated_count = 0
    missing_metric_count = 0
    missing_rule_count = 0

    for metric in metrics:
        metric_value = (
            MetricValue.objects.filter(region=region, metric=metric, year=year)
            .order_by("-updated_at", "-created_at")
            .first()
        )

        if metric_value is None:
            missing_metric_count += 1
            continue

        rule = (
            ConversionRule.objects.filter(
                metric=metric,
                methodology_version=methodology,
                is_active=True,
            )
            .order_by("-updated_at", "-created_at")
            .first()
        )

        if rule is None:
            missing_rule_count += 1
            continue

        normalized_score = calculate_normalized_score(metric_value.raw_value, rule)

        if normalized_score is None:
            missing_rule_count += 1
            continue

        score, created = MetricScore.objects.update_or_create(
            region=region,
            metric=metric,
            metric_value=metric_value,
            defaults={
                "normalized_score": normalized_score,
                "calculated_at": timezone.now(),
            },
        )

        metric_scores[metric.id] = score

        if created:
            created_count += 1
        else:
            updated_count += 1

    categories = GHICategory.objects.prefetch_related("metrics").all()
    category_scores = {}
    category_completeness = {}
    overall_values = []
    total_active_metrics = metrics.count()
    total_scored_metrics = 0

    for category in categories:
        category_metrics = [metric for metric in metrics if metric.category_id == category.id]
        weighted_metric_scores = []

        for metric in category_metrics:
            score = metric_scores.get(metric.id)

            if score is None:
                continue

            weighted_metric_scores.append(
                (Decimal(score.normalized_score), Decimal(metric.weight))
            )

        total_scored_metrics += len(weighted_metric_scores)
        category_completeness[category.slug] = (
            quantize_score(
                (Decimal(len(weighted_metric_scores)) / Decimal(len(category_metrics)))
                * 100
            )
            if category_metrics
            else Decimal("0.00")
        )
        category_score = weighted_average(weighted_metric_scores)

        if category_score is None:
            continue

        field_name = category_snapshot_field(category)

        if field_name:
            category_scores[field_name] = category_score

        overall_values.append((category_score, Decimal(category.weight)))

    overall_score = weighted_average(overall_values)
    data_completeness = (
        quantize_score((Decimal(total_scored_metrics) / Decimal(total_active_metrics)) * 100)
        if total_active_metrics
        else Decimal("0.00")
    )

    snapshot_defaults = {
        "environmental_score": category_scores.get("environmental_score"),
        "human_wellbeing_score": category_scores.get("human_wellbeing_score"),
        "animal_welfare_score": category_scores.get("animal_welfare_score"),
        "community_health_score": category_scores.get("community_health_score"),
        "economic_stability_score": category_scores.get("economic_stability_score"),
        "governance_score": category_scores.get("governance_score"),
        "overall_score": overall_score,
        "data_completeness": data_completeness,
        "notes": (
            "Category completeness: "
            + ", ".join(
                f"{slug}={score}%"
                for slug, score in sorted(category_completeness.items())
            )
        ),
    }

    snapshot, _ = GHIScoreSnapshot.objects.update_or_create(
        region=region,
        year=year,
        methodology_version=methodology,
        defaults=snapshot_defaults,
    )

    region.current_ghi_score = overall_score
    region.save(update_fields=["current_ghi_score", "updated_at"])

    return GHICalculationResult(
        snapshot=snapshot,
        metric_scores_created=created_count,
        metric_scores_updated=updated_count,
        missing_metric_count=missing_metric_count,
        missing_rule_count=missing_rule_count,
    )
