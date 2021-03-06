from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from core.types import AppView, Color

def validate_color(value):
    if value not in [c.value for c in Color]:
        raise ValidationError(
            _('%(value)s is not a valid color'),
            params={'value': value},
        )

def validate_view(value):
     if value not in [v.value for v in AppView]:
        raise ValidationError(
            _('%(value)s is not a valid view'),
            params={'value': value},
        )


class Settings(models.Model):
    weekly_reset_day = models.PositiveSmallIntegerField()
    theme = models.CharField(max_length=32, 
                             default=Color.DEFAULT.value,
                             validators=[validate_color])
    default_view = models.CharField(max_length=32, 
                             default=AppView.OBJECTIVES.value,
                             validators=[validate_view])
                             

    # Singleton
    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)