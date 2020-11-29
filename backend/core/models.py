from django.db import models

# Create your models here.
class Activity(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.title