from rest_framework import viewsets

from .models import Entity
from .serializers import EntitySerializer


class EntityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EntitySerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = (
            Entity.objects
            .select_related("primary_region")
            .prefetch_related("region_links__region")
            .all()
        )

        entity_type = self.request.query_params.get("type")
        region_slug = self.request.query_params.get("region")

        if entity_type:
            queryset = queryset.filter(entity_type=entity_type)

        if region_slug:
            queryset = queryset.filter(
                region_links__region__slug=region_slug
            ).distinct()

        return queryset