from rest_framework import viewsets

from .models import Project, Event
from .serializers import ProjectSerializer, EventSummarySerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = (
            Project.objects
            .select_related("region")
            .prefetch_related(
                "entity_links__entity",
                "events",
            )
            .all()
        )

        status = self.request.query_params.get("status")
        region_slug = self.request.query_params.get("region")

        if status:
            queryset = queryset.filter(status=status)

        if region_slug:
            queryset = queryset.filter(region__slug=region_slug)

        return queryset


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSummarySerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = (
            Event.objects
            .select_related("project", "region")
            .all()
        )

        region_slug = self.request.query_params.get("region")
        project_slug = self.request.query_params.get("project")

        if region_slug:
            queryset = queryset.filter(region__slug=region_slug)

        if project_slug:
            queryset = queryset.filter(project__slug=project_slug)

        return queryset