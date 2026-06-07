from rest_framework import serializers

from entities.serializers import EntitySerializer
from .models import Project, ProjectEntityLink, Event


class ProjectEntityLinkSerializer(serializers.ModelSerializer):
    entity = EntitySerializer(read_only=True)

    class Meta:
        model = ProjectEntityLink
        fields = [
            "id",
            "entity",
            "created_at",
        ]


class EventSummarySerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(
        source="region.name",
        read_only=True,
    )

    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "event_date",
            "location",
            "region",
            "region_name",
            "registration_url",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(
        source="region.name",
        read_only=True,
    )

    entity_links = ProjectEntityLinkSerializer(
        many=True,
        read_only=True,
    )

    events = EventSummarySerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "status",
            "image",
            "website",
            "region",
            "region_name",
            "start_date",
            "end_date",
            "entity_links",
            "events",
            "created_at",
            "updated_at",
        ]