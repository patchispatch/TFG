from django.db import models


class Objective(models.Model):
    # Objective status
    class ObjectiveStatus(models.TextChoices):
        ACTIVE = 'active'
        PAUSED = 'paused'
    

    name = models.CharField(max_length=120)
    goal = models.PositiveSmallIntegerField()
    status = models.CharField(
        max_length=6,
        choices=ObjectiveStatus.choices,
        default=ObjectiveStatus.ACTIVE,
    )
    current_streak = models.PositiveSmallIntegerField()
    best_streak = models.PositiveSmallIntegerField()
    category_id = models.ForeignKey(
        'Category',
        null=True,
        on_delete=models.SET_NULL,
    )

    def __str__(self):
        return self.title


class ObjectiveEntry(models.Model):
    # Objective
    date = models.DateField()
    progress = models.PositiveSmallIntegerField()
    objective_id = models.ForeignKey(
        'Objective',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'ObjectiveEntry(objective: {self.objective_id}, date: {self.date}, progress: {self.progress})'


class Category(models.Model):
    name = models.CharField(max_length=16)

    def __Str__(self):
        return self.name