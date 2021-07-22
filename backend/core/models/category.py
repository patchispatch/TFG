from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=16)
    # TODO: add color

    def __str__(self):
        return self.name