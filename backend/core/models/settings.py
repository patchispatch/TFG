from django.db import models


class Settings(models.Model):
    weekly_reset_day = models.PositiveSmallIntegerField()

    # Singleton
    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)