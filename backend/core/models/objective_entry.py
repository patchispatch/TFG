from django.db import models


class ObjectiveEntry(models.Model):
    # Objective
    date = models.DateTimeField()
    progress = models.PositiveSmallIntegerField()
    objective_id = models.ForeignKey(
        'Objective',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'ObjectiveEntry(objective: {self.objective_id}, date: {self.date}, progress: {self.progress})'