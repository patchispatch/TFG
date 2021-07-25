from ..utils import get_next_reset_day, get_week
from django.db import models
from datetime import timedelta

class ActivityInstance(models.Model):
    day = models.PositiveSmallIntegerField()
    start_hour = models.TimeField()
    end_hour = models.TimeField()
    activity = models.ForeignKey(
        'Activity',
        default=None,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name