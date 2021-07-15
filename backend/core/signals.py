from django.dispatch import receiver
from django.db.models.signals import post_save
from .models.objective import Objective
from .models.objective_entry import ObjectiveEntry

# @receiver(post_save, sender=ObjectiveEntry)
# def __update_best_streak(sender, **kwargs):
#     """
#     Updates best streak, if needed.
#     Executes when an ObjectiveEntry is saved.
#     """
#     # Check updated objective
#     obj = Objective.objects.get(kwargs['instance'].objective_id)

#     if obj.current_streak > obj.best_streak:
#         obj.best_streak = obj.current_streak
#         obj.save()
