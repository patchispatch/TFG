from datetime import timedelta
from django.test import TestCase
from freezegun import freeze_time
from django.utils import timezone
from core.models.objective import Objective
from core.models.objective_entry import ObjectiveEntry


#### OBJECTIVES
class ObjectiveModelTestCase(TestCase):
    """
    Unit tests of Objective model
    Assumptions: weekly reset day is set on monday, tests are executed on monday 00:00:00 (edge case)
    """
    fixtures = ['settings']

    def create_objective(self, obj_data):
        obj = Objective(**obj_data)
        obj.save()
        return obj
    
    def get_objective(self, obj_id):
        return Objective.objects.get(id=obj_id)

    def add_progress(self, obj, date, progress):
        """
        Create an ObjectiveEntry by objective ID
        """
        entry = ObjectiveEntry(objective_id=obj, date=date, progress=progress)
        entry.save()
        return entry.id

    @freeze_time("21-09-1998 00:00:00")
    def test_update_progress(self):
        """
        Tests whether the progress of an objective is calculated properly.
        """
        # Create new objective
        obj = {
            "name": "Progress test objective",
            "goal": 3
        }
        obj = self.create_objective(obj)

        # Add progress for objective today
        self.add_progress(obj, timezone.now(), 2)

        # Add progress for objective 1 last week (should not count)
        self.add_progress(obj, timezone.now() - timedelta(7), 2)

        # Check current objective progress
        current_progress = self.get_objective(obj.id).progress
        self.assertEquals(current_progress, 2)

    @freeze_time("21-09-1998 00:00:00")
    def test_calculate_current_streak(self):
        """
        Tests whether the streak of an objective is calculated properly.
        """
        # Create new objective
        obj = {
            "name": "Progress test objective",
            "goal": 1
        }
        obj = self.create_objective(obj)

        # Add progress two weeks ago
        date = timezone.now() - timedelta(14)
        self.add_progress(obj, date, 1)

        # Add progress a week ago
        self.add_progress(obj, timezone.now() - timedelta(7), 1)

        # Add progress now
        self.add_progress(obj, timezone.now(), 1)

        # Check current objective streak
        current_streak = self.get_objective(obj.id).current_streak
        self.assertEquals(current_streak, 3)

    @freeze_time("21-09-1998 00:00:00")
    def test_calculate_best_streak(self):
        """
        Tests whether the best streak of an objective is updated correctly.
        """
        # Create new objective
        obj = {
            "name": "Best streak test objective",
            "goal": 1
        }
        obj = self.create_objective(obj)

        # Add entry last week to complete objective
        self.add_progress(obj, timezone.now() - timedelta(7), 1)

        # Check best streak is set to 1
        best_streak = self.get_objective(obj.id).best_streak
        self.assertEquals(best_streak, 1)

        # Add entry today to complete objective
        self.add_progress(obj, timezone.now(), 1)

        # Check best streak is set to 2
        best_streak = self.get_objective(obj.id).best_streak
        self.assertEquals(best_streak, 2)
