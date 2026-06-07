from django.db import models


class Source(models.Model):
    class SourceType(models.TextChoices):
        GOVERNMENT = "government", "Government"
        NGO = "ngo", "NGO"
        RESEARCH = "research", "Research"
        INTERNATIONAL = "international", "International"
        NEWS = "news", "News"
        ACADEMIC = "academic", "Academic"
        FOUNDATION = "foundation", "Foundation"
        OTHER = "other", "Other"

    title = models.CharField(max_length=500)

    organization = models.CharField(
        max_length=255,
        blank=True,
    )

    url = models.URLField(
        max_length=1000,
        blank=True,
    )

    publication_date = models.DateField(
        null=True,
        blank=True,
    )

    source_type = models.CharField(
        max_length=30,
        choices=SourceType.choices,
        default=SourceType.OTHER,
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-publication_date", "title"]
        verbose_name = "Source"
        verbose_name_plural = "Sources"

    def __str__(self):
        return self.title