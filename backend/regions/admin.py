from django.contrib import admin
from .models import Region


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "region_type",
        "parent_region",
        "current_ghi_score",
        "data_status",
    )
    list_filter = ("region_type", "data_status")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    autocomplete_fields = ("parent_region",)