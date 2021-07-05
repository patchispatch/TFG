from django.db import models


class Objective(models.Model):
    # Objective status
    class ObjectiveStatus(models.TextChoices):
        ACTIVE = 'active'
        PAUSED = 'paused'
    

    name = models.CharField(max_length=120)
    goal = models.PositiveSmallIntegerField()
    paused = models.BooleanField(default=False)
    current_streak = models.PositiveSmallIntegerField()
    best_streak = models.PositiveSmallIntegerField()
    category_id = models.ForeignKey(
        'Category',
        default=None,
        null=True,
        on_delete=models.SET_NULL,
    )

    @property
    def progress(self):
        entries = ObjectiveEntry.objects.select_related('objective_id').filter(objective_id=self.id)

        progress = 0
        for entry in entries:
            progress += entry.progress
        
        return progress
    
    def __str__(self):
        return self.title

    def pause_resume(self):
        self.paused = not self.paused
        self.save()


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


class Category(models.Model):
    name = models.CharField(max_length=16)

    def __Str__(self):
        return self.name