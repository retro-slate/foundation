from rest_framework import serializers

from sources.models import Source
from .models import Report, ReportSourceLink


class SourceSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = [
            "id",
            "title",
            "organization",
            "url",
            "publication_date",
            "source_type",
            "notes",
            "created_at",
        ]


class ReportSourceLinkSerializer(serializers.ModelSerializer):
    source = SourceSummarySerializer(read_only=True)

    class Meta:
        model = ReportSourceLink
        fields = [
            "id",
            "source",
            "notes",
            "created_at",
        ]


class ReportSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(
        source="region.name",
        read_only=True,
    )

    source_links = ReportSourceLinkSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Report
        fields = [
            "id",
            "title",
            "slug",
            "summary",
            "content",
            "report_type",
            "region",
            "region_name",
            "author",
            "published_date",
            "source_links",
            "created_at",
            "updated_at",
        ]