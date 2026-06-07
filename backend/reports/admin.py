from django.contrib import admin
from .models import Report, ReportSourceLink


class ReportSourceLinkInline(admin.TabularInline):
    model = ReportSourceLink
    extra = 1


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "report_type",
        "region",
        "published_date",
        "author",
    )

    list_filter = (
        "report_type",
        "published_date",
        "region",
    )

    search_fields = (
        "title",
        "slug",
        "summary",
        "content",
        "author",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    inlines = [ReportSourceLinkInline]


@admin.register(ReportSourceLink)
class ReportSourceLinkAdmin(admin.ModelAdmin):
    list_display = (
        "report",
        "source",
    )

    search_fields = (
        "report__title",
        "source__title",
    )