from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Region
from .serializers import RegionSerializer


class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RegionSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Region.objects.select_related("parent_region").all()

    @action(detail=True, methods=["get"])
    def children(self, request, slug=None):
        region = self.get_object()
        children = region.child_regions.all()
        serializer = self.get_serializer(children, many=True)
        return Response(serializer.data)
