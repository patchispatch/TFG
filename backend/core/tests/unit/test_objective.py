from datetime import timedelta
from django.test import TestCase
from freezegun import freeze_time
from django.utils import timezone
from rest_framework.test import APIClient
from core.models.objective import Objective


#### OBJECTIVES
class ObjectivesTestCase(TestCase):
    client = APIClient()
    fixtures = ['data']

    def create_objective(self, obj):
        return self.client.post('/objectives/', obj, content_type='application/json')

    def add_progress(self, obj_id, date, progress):
        """
        Create an ObjectiveEntry by objective ID via POST request
        """
        entry = {
            'date': date,
            'progress': progress
        }
        self.client.post(f'/objectives/{obj_id}/entries/', entry)

    @freeze_time("1998-09-21")
    def test_update_progress(self):
        """
        Tests whether the progress of an objective is calculated properly.
        Assumptions: weekly reset day is set on sunday, test executes on monday.
        """
        # Create new objective
        obj = {
            "name": "Progress test objective",
            "goal": 3
        }
        response = self.create_objective(obj)
        obj_id = response.data['id']

        # Add progress for objective today
        self.add_progress(obj_id, timezone.now(), 2)

        # Add progress for objective 1 last week (should not count)
        self.add_progress(obj_id, timezone.now() - timedelta(7), 2)

        # Check current objective progress
        current_progress = Objective.objects.get(pk=obj_id).progress
        self.assertEquals(current_progress, 2)

    @freeze_time("1998-09-21")  
    def test_calculate_current_streak(self):
        """
        Tests whether the streak of an objective is calculated properly.
        Assumptions: weekly reset day is set on sunday, test executes on monday.
        """
        # Create new objective
        obj = {
            "name": "Progress test objective",
            "goal": 1
        }
        response = self.create_objective(obj)
        obj_id = response.data['id']

        # Add progress two weeks ago
        self.add_progress(obj_id, timezone.now() - timedelta(14), 1)

        # Add progress a week ago
        self.add_progress(obj_id, timezone.now() - timedelta(7), 1)

        # Add progress now
        self.add_progress(obj_id, timezone.now(), 1)

        # Check current objective streak
        current_streak = Objective.objects.get(pk=obj_id).current_streak
        self.assertEquals(current_streak, 3)

    def test_calculate_best_streak(self):
        """
        Tests whether the best streak of an objective is updated correctly.
        Assumptions
        """
        # Create new objective
        obj = {
            "name": "Best streak test objective",
            "goal": 1
        }
        response = self.create_objective(obj)
        obj_id = response.data['id']

        # Add entry last week to complete objective
        self.add_progress(obj_id, timezone.now() - timedelta(7), 1)

        # Check best streak is set to 1
        best_streak = Objective.objects.get(pk=obj_id).best_streak
        self.assertEquals(best_streak, 1)

        # Add entry today to complete objective
        self.add_progress(obj_id, timezone.now(), 1)

        # Check best streak is set to 2
        best_streak = Objective.objects.get(pk=obj_id).best_streak
        self.assertEquals(best_streak, 2)

