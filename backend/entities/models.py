from django.db import models


class Entity(models.Model):
    class EntityType(models.TextChoices):
        ORGANIZATION = "organization", "Organization"
        NGO = "ngo", "NGO"
        ACTIVIST = "activist", "Activist"
        COMPANY = "company", "Company"
        PRODUCT = "product", "Product"
        INITIATIVE = "initiative", "Initiative"
        PROJECT = "project", "Project"
        EVENT = "event", "Event"

    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        INACTIVE = "inactive", "Inactive"
        PLANNED = "planned", "Planned"
        ARCHIVED = "archived", "Archived"

    class VerificationStatus(models.TextChoices):
        VERIFIED = "verified", "Verified"
        PARTIAL = "partial", "Partial"
        UNVERIFIED = "unverified", "Unverified"
        PENDING = "pending", "Pending Review"

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    entity_type = models.CharField(
        max_length=30,
        choices=EntityType.choices,
    )

    description = models.TextField(blank=True)

    short_description = models.CharField(
        max_length=300,
        blank=True,
    )

    image = models.URLField(
        max_length=1000,
        blank=True,
    )

    website = models.URLField(
        max_length=1000,
        blank=True,
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )

    primary_region = models.ForeignKey(
        "regions.Region",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="primary_entities",
    )

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    verification_status = models.CharField(
        max_length=30,
        choices=VerificationStatus.choices,
        default=VerificationStatus.UNVERIFIED,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Entity"
        verbose_name_plural = "Entities"

    def __str__(self):
        return self.name


class EntityRegionLink(models.Model):
    class RelationshipType(models.TextChoices):
        OPERATES_IN = "operates_in", "Operates In"
        HEADQUARTERED_IN = "headquartered_in", "Headquartered In"
        SUPPORTS = "supports", "Supports"
        IMPACTS = "impacts", "Impacts"

    entity = models.ForeignKey(
        Entity,
        on_delete=models.CASCADE,
        related_name="region_links",
    )

    region = models.ForeignKey(
        "regions.Region",
        on_delete=models.CASCADE,
        related_name="entity_links",
    )

    relationship_type = models.CharField(
        max_length=30,
        choices=RelationshipType.choices,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("entity", "region", "relationship_type")
        verbose_name = "Entity Region Link"
        verbose_name_plural = "Entity Region Links"

    def __str__(self):
        return f"{self.entity.name} → {self.region.name}"