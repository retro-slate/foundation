from django.db import models


class GHICategory(models.Model):
    name = models.CharField(max_length=255)

    slug = models.SlugField(
        max_length=255,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    weight = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=1.00,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "GHI Category"
        verbose_name_plural = "GHI Categories"

    def __str__(self):
        return self.name
    
class GHIMetric(models.Model):
    class Direction(models.TextChoices):
        HIGHER_IS_BETTER = "higher_is_better", "Higher is better"
        LOWER_IS_BETTER = "lower_is_better", "Lower is better"
        TARGET_RANGE = "target_range", "Target range"
        BINARY = "binary", "Binary"
        COMPOSITE = "composite", "Composite"

    category = models.ForeignKey(
        GHICategory,
        on_delete=models.CASCADE,
        related_name="metrics",
    )

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    description = models.TextField(blank=True)

    unit = models.CharField(
        max_length=100,
        blank=True,
        help_text="Example: AQI, %, INR, years, count",
    )

    direction = models.CharField(
        max_length=30,
        choices=Direction.choices,
    )

    weight = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=1.00,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category__name", "name"]
        verbose_name = "GHI Metric"
        verbose_name_plural = "GHI Metrics"

    def __str__(self):
        return f"{self.category.name} — {self.name}"
    
class MethodologyVersion(models.Model):
    version = models.CharField(
        max_length=50,
        unique=True,
    )

    title = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(
        default=False,
    )

    published_date = models.DateField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-published_date"]
        verbose_name = "Methodology Version"
        verbose_name_plural = "Methodology Versions"

    def __str__(self):
        return self.version
    
class ConversionRule(models.Model):
    class RuleType(models.TextChoices):
        LINEAR = "linear", "Linear"
        INVERSE_LINEAR = "inverse_linear", "Inverse Linear"
        TARGET_RANGE = "target_range", "Target Range"
        BINARY = "binary", "Binary"
        CUSTOM_FORMULA = "custom_formula", "Custom Formula"

    metric = models.ForeignKey(
        GHIMetric,
        on_delete=models.CASCADE,
        related_name="conversion_rules",
    )

    methodology_version = models.ForeignKey(
        MethodologyVersion,
        on_delete=models.PROTECT,
        related_name="conversion_rules",
    )

    rule_type = models.CharField(
        max_length=30,
        choices=RuleType.choices,
    )

    minimum_value = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        null=True,
        blank=True,
    )

    maximum_value = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        null=True,
        blank=True,
    )

    target_value = models.DecimalField(
        max_digits=12,
        decimal_places=4,
        null=True,
        blank=True,
    )

    formula = models.TextField(
        blank=True,
        help_text="Optional formula notes or future calculation expression.",
    )

    version = models.CharField(
        max_length=50,
        default="1.0",
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["metric__category__name", "metric__name", "-created_at"]
        verbose_name = "Conversion Rule"
        verbose_name_plural = "Conversion Rules"

    def __str__(self):
        return f"{self.metric.name} — {self.rule_type}"
    
class MetricValue(models.Model):
    class ConfidenceLevel(models.TextChoices):
        HIGH = "high", "High"
        MEDIUM = "medium", "Medium"
        LOW = "low", "Low"
        ESTIMATED = "estimated", "Estimated"

    region = models.ForeignKey(
        "regions.Region",
        on_delete=models.CASCADE,
        related_name="metric_values",
    )

    metric = models.ForeignKey(
        GHIMetric,
        on_delete=models.CASCADE,
        related_name="metric_values",
    )

    source = models.ForeignKey(
        "sources.Source",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="metric_values",
    )

    raw_value = models.DecimalField(
        max_digits=14,
        decimal_places=4,
    )

    unit = models.CharField(
        max_length=100,
        blank=True,
    )

    year = models.PositiveIntegerField()

    confidence_level = models.CharField(
        max_length=20,
        choices=ConfidenceLevel.choices,
        default=ConfidenceLevel.MEDIUM,
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year", "region__name", "metric__name"]
        verbose_name = "Metric Value"
        verbose_name_plural = "Metric Values"

    def __str__(self):
        return f"{self.region.name} — {self.metric.name} — {self.year}"
    
class MetricScore(models.Model):
    region = models.ForeignKey(
        "regions.Region",
        on_delete=models.CASCADE,
        related_name="metric_scores",
    )

    metric = models.ForeignKey(
        GHIMetric,
        on_delete=models.CASCADE,
        related_name="metric_scores",
    )

    metric_value = models.ForeignKey(
        MetricValue,
        on_delete=models.CASCADE,
        related_name="scores",
    )

    normalized_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
    )

    calculated_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["region__name", "metric__name"]
        verbose_name = "Metric Score"
        verbose_name_plural = "Metric Scores"

    def __str__(self):
        return (
            f"{self.region.name} - "
            f"{self.metric.name} - "
            f"{self.normalized_score}"
        )
    
class GHIScoreSnapshot(models.Model):
    region = models.ForeignKey(
        "regions.Region",
        on_delete=models.CASCADE,
        related_name="ghi_score_snapshots",
    )

    methodology_version = models.ForeignKey(
        MethodologyVersion,
        on_delete=models.PROTECT,
        related_name="ghi_score_snapshots",
    )

    year = models.PositiveIntegerField()

    environmental_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    human_wellbeing_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    animal_welfare_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    community_health_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    economic_stability_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    governance_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    overall_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    data_completeness = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Percentage of required data available.",
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year", "region__name"]
        unique_together = ("region", "year", "methodology_version")
        verbose_name = "GHI Score Snapshot"
        verbose_name_plural = "GHI Score Snapshots"

    def __str__(self):
        return f"{self.region.name} — {self.year} — {self.overall_score}"