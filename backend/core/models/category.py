from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from core.types import CategoryColor

def validate_color(value):
    if value not in [c.value for c in CategoryColor]:
        raise ValidationError(
            _('%(value)s is not a valid color'),
            params={'value': value},
        )


class Category(models.Model):
    name = models.CharField(max_length=16)
    color = models.CharField(max_length=32, 
                             default=CategoryColor.DEFAULT.value,
                             validators=[validate_color])

    def __str__(self):
        return self.name