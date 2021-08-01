from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from .models.objective import Objective
from .models.objective_entry import ObjectiveEntry


@receiver(post_save, sender=ObjectiveEntry)
def update_best_streak_in_new_entry(sender, instance, **kwargs):
    """
    Updates best streak, if needed.
    Executes when an ObjectiveEntry is saved.
    """
    # Check updated objective
    obj = Objective.objects.get(id=instance.objective_id_id)

    if obj.current_streak > obj.best_streak:
        obj.best_streak = obj.current_streak
        obj.save()


@receiver(pre_save, sender=Objective)
def reset_best_streak_in_goal_change(sender, instance, **kwargs):
    """
    Calculate the best streak with the new goal when it is modified.
    """

    # Check previous goal value
    if instance.id:
        obj = Objective.objects.get(id=instance.id)

        if obj.goal != instance.goal:
            instance.best_streak = obj.calculate_best_streak(goal=instance.goal)
