from django.contrib import admin
from .models import (
    GHICategory,
    GHIMetric,
    MethodologyVersion,
    ConversionRule,
    MetricValue,
    MetricScore,
    GHIScoreSnapshot,
)


@admin.register(GHICategory)
class GHICategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "weight",
    )

    search_fields = (
        "name",
        "slug",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

@admin.register(GHIMetric)
class GHIMetricAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "unit",
        "direction",
        "weight",
        "is_active",
    )

    list_filter = (
        "category",
        "direction",
        "is_active",
    )

    search_fields = (
        "name",
        "slug",
        "description",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

@admin.register(MethodologyVersion)
class MethodologyVersionAdmin(admin.ModelAdmin):
    list_display = (
        "version",
        "title",
        "is_active",
        "published_date",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "version",
        "title",
    )

@admin.register(ConversionRule)
class ConversionRuleAdmin(admin.ModelAdmin):
    list_display = (
        "metric",
        "methodology_version",
        "rule_type",
        "minimum_value",
        "maximum_value",
        "target_value",
        "version",
        "is_active",
    )

    list_filter = (
        "rule_type",
        "methodology_version",
        "is_active",
    )

    search_fields = (
        "metric__name",
        "formula",
        "version",
    )

@admin.register(MetricValue)
class MetricValueAdmin(admin.ModelAdmin):
    list_display = (
        "region",
        "metric",
        "raw_value",
        "unit",
        "year",
        "confidence_level",
        "source",
    )

    list_filter = (
        "year",
        "confidence_level",
        "metric__category",
    )

    search_fields = (
        "region__name",
        "metric__name",
        "source__title",
        "notes",
    )

@admin.register(MetricScore)
class MetricScoreAdmin(admin.ModelAdmin):
    list_display = (
        "region",
        "metric",
        "normalized_score",
        "calculated_at",
    )

    list_filter = (
        "metric__category",
    )

    search_fields = (
        "region__name",
        "metric__name",
    )

@admin.register(GHIScoreSnapshot)
class GHIScoreSnapshotAdmin(admin.ModelAdmin):
    list_display = (
        "region",
        "year",
        "overall_score",
        "data_completeness",
        "methodology_version",
    )

    list_filter = (
        "year",
        "methodology_version",
    )

    search_fields = (
        "region__name",
        "notes",
    )