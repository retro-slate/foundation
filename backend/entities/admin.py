from django.contrib import admin
from .models import Entity, EntityRegionLink


class EntityRegionLinkInline(admin.TabularInline):
    model = EntityRegionLink
    extra = 1


@admin.register(Entity)
class EntityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "entity_type",
        "primary_region",
        "status",
        "verification_status",
    )

    list_filter = (
        "entity_type",
        "status",
        "verification_status",
    )

    search_fields = (
        "name",
        "slug",
        "description",
        "short_description",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    inlines = [EntityRegionLinkInline]


@admin.register(EntityRegionLink)
class EntityRegionLinkAdmin(admin.ModelAdmin):
    list_display = (
        "entity",
        "region",
        "relationship_type",
    )

    list_filter = (
        "relationship_type",
        "region",
    )

    search_fields = (
        "entity__name",
        "region__name",
    )