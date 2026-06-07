from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100)

    slug = models.SlugField(
        max_length=120,
        unique=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Tag"
        verbose_name_plural = "Tags"

    def __str__(self):
        return self.name