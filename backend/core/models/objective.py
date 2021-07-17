from ..utils import get_next_reset_day, get_week
from django.db import models
from datetime import timedelta
from .objective_entry import ObjectiveEntry


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
        on_delete=models.SET_NULL
    )

    @property
    def progress(self):
        # Fetch current week entries
        first_date, last_date = get_week()
        return self.__progress_between_dates(first_date, last_date)
    
    @property
    def current_streak(self):
        streak = 1 if self.__is_complete() else 0
        reset_day = get_next_reset_day()

        while True:
            # Check past week
            reset_day = reset_day - timedelta(7)
            first_dow = reset_day - timedelta(7)
            if not self.__is_complete(first_dow, reset_day):
                break
            
            streak += 1
        
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
            # Use current week start and end
            first_date, last_date = get_week()
        
        elif (first_date and not last_date) or (not first_date and last_date):
            # If only a date is passed, throw error
            raise ValueError('Must pass two dates as arguments')
          
        return True if self.__progress_between_dates(first_date, last_date) >= self.goal else False

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
        