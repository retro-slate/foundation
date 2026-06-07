from django.contrib import admin
from .models import Source


@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "organization",
        "source_type",
        "publication_date",
    )

    list_filter = (
        "source_type",
        "publication_date",
    )

    search_fields = (
        "title",
        "organization",
        "url",
        "notes",
    )
