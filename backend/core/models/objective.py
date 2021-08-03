from ..utils import get_next_reset_day, get_week
from django.db import models
from datetime import timedelta
from .objective_entry import ObjectiveEntry


class Objective(models.Model):
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
        streak = 1 if self.is_complete() else 0
        reset_day = get_next_reset_day()

        while True:
            # Check past week
            reset_day = reset_day - timedelta(7)
            first_dow = reset_day - timedelta(7)
            if not self.is_complete(first_dow, reset_day):
                break
            
            streak += 1
        
        return streak
    
    def __str__(self):
        return self.name

    def pause_resume(self):
        self.paused = not self.paused
        self.save()

    def calculate_best_streak(self, goal=None, save=False):
        """
        Calculates the best streak of an objective.
        If a goal is provided, overrides the actual goal defined in the objective.
        If save is set to True, saves the results in the current instance.
        """
        current_goal = goal if goal else self.goal
        entries = ObjectiveEntry.objects.filter(objective_id=self).order_by('date')
        best_streak = 0
        past_weeks = 0
        
        while True:
            first_date, last_date = get_week(-past_weeks)

            if self.is_complete(first_date, last_date, current_goal):
                best_streak += 1
            else:
                best_streak = 0
            
            if first_date < entries.first().date.date():
                break
            else:
                past_weeks += 1

        if save:
            self.best_streak = best_streak
            self.save()

        return best_streak

    def is_complete(self, first_date=None, last_date=None, goal=None):
        """
        Returns whether the objective is completed between the selected dates.
        If a goal is provided, overrides the defined one.
        """
        current_goal = goal if goal else self.goal

        if not first_date and not last_date:
            # Use current week start and end
            first_date, last_date = get_week()
        
        elif (first_date and not last_date) or (not first_date and last_date):
            # If only a date is passed, throw error
            raise ValueError('Must pass two dates as arguments')
          
        return True if self.__progress_between_dates(first_date, last_date) >= current_goal else False

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
        