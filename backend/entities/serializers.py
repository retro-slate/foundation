from rest_framework import serializers

from regions.serializers import RegionSerializer
from .models import Entity, EntityRegionLink


class EntityRegionLinkSerializer(serializers.ModelSerializer):
    region = RegionSerializer(read_only=True)

    class Meta:
        model = EntityRegionLink
        fields = [
            "id",
            "region",
            "relationship_type",
            "created_at",
        ]


class EntitySerializer(serializers.ModelSerializer):
    primary_region_name = serializers.CharField(
        source="primary_region.name",
        read_only=True,
    )

    region_links = EntityRegionLinkSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Entity
        fields = [
            "id",
            "name",
            "slug",
            "entity_type",
            "description",
            "short_description",
            "image",
            "website",
            "latitude",
            "longitude",
            "primary_region",
            "primary_region_name",
            "region_links",
            "status",
            "verification_status",
            "created_at",
            "updated_at",
        ]