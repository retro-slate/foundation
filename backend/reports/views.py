from rest_framework import viewsets

from .models import Report
from .serializers import ReportSerializer


class ReportViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReportSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = (
            Report.objects
            .select_related("region")
            .prefetch_related("source_links__source")
            .all()
        )

        report_type = self.request.query_params.get("type")
        region_slug = self.request.query_params.get("region")

        if report_type:
            queryset = queryset.filter(report_type=report_type)

        if region_slug:
            queryset = queryset.filter(region__slug=region_slug)

        return queryset