from django.db import models
from datetime import date, timedelta


class Objective(models.Model):
    # Objective status
    class ObjectiveStatus(models.TextChoices):
        ACTIVE = 'active'
        PAUSED = 'paused'
    

    name = models.CharField(max_length=120)
    goal = models.PositiveSmallIntegerField()
    paused = models.BooleanField(default=False)
    best_streak = models.PositiveSmallIntegerField(default=0)
    category_id = models.ForeignKey(
        'Category',
        default=None,
        null=True,
        on_delete=models.SET_NULL,
    )

    @property
    def progress(self):
        # Fetch current week entries
        reset_day = Settings.objects.filter().first().weekly_reset_day
        today = date.today()

        # Calculate dates
        last_date = today + timedelta((reset_day - today.weekday()) % 7)
        first_date = last_date - timedelta(7)

        entries = ObjectiveEntry.objects.select_related('objective_id').filter(
            objective_id=self.id,
            date__gte=first_date,
            date__lt=last_date
        )

        progress = 0
        for entry in entries:
            progress += entry.progress
        
        return progress
    
    @property
    def current_streak(self):
        # TODO: implement
        pass
    
    def __str__(self):
        return self.name

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

    def __str__(self):
        return self.name


class Settings(models.Model):
    weekly_reset_day = models.PositiveSmallIntegerField()

    # Singleton
    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)