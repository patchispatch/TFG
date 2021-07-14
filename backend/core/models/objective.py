from django.db import models
from datetime import date, timedelta
from .objective_entry import ObjectiveEntry
from .settings import Settings


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
        
        return self.__progress_between_dates(first_date, last_date)
    
    @property
    def current_streak(self):
        streak = 0
        completed = True if self.progress >= self.goal else False
        reset_day = Settings.objects.filter().first().weekly_reset_day
        reset_day = date.today() + timedelta((reset_day - date.today().weekday()) % 7)

        while completed:
            streak += 1

            # Check past week
            reset_day = reset_day - timedelta(7)
            first_dow = reset_day - timedelta(7)
            completed = True if self.__progress_between_dates(first_dow, reset_day) >= self.goal else False
        
        return streak
    
    def __str__(self):
        return self.name

    def pause_resume(self):
        self.paused = not self.paused
        self.save()

    def __is_complete(self, first_date=None, last_date=None):
        """
        Returns whether the objective is completed between the selected dates
        """
        if not first_date and not last_date:
          pass


    def __progress_between_dates(self, first_date, last_date):
        """
        Returns the progress of the current objective between two dates
        """
        entries = ObjectiveEntry.objects.select_related('objective_id').filter(
            objective_id=self.id,
            date__gte=first_date,
            date__lt=last_date
        )

        progress = 0
        for entry in entries:
            progress += entry.progress
        
        return progress
        