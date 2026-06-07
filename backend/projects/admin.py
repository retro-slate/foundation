from django.contrib import admin
from .models import Project, ProjectEntityLink, Event


class ProjectEntityLinkInline(admin.TabularInline):
    model = ProjectEntityLink
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "status",
        "region",
        "start_date",
        "end_date",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "name",
        "slug",
        "description",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    inlines = [ProjectEntityLinkInline]


@admin.register(ProjectEntityLink)
class ProjectEntityLinkAdmin(admin.ModelAdmin):
    list_display = (
        "project",
        "entity",
    )

    search_fields = (
        "project__name",
        "entity__name",
    )

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "project",
        "region",
        "event_date",
        "location",
    )

    list_filter = (
        "event_date",
        "region",
    )

    search_fields = (
        "name",
        "slug",
        "description",
        "location",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }