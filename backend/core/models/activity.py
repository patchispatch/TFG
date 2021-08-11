from ..utils import get_next_reset_day, get_week
from django.db import models
from datetime import timedelta

class Activity(models.Model):
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=500, null=True)
    category = models.ForeignKey(
        'Category',
        default=None,
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name