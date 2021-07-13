from datetime import datetime, timedelta
from django.test import TestCase
from freezegun import freeze_time
from django.utils import timezone
from rest_framework.test import APIClient
from core.models import *


#### OBJECTIVES
class ObjectivesTestCase(TestCase):
    client = APIClient()
    fixtures = ['data']

    def add_progress(self, obj_id, entry):
        """
        Create an ObjectiveEntry by objective ID via POST request
        """
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
        response = self.client.post('/objectives/', obj, content_type='application/json')

        # Add progress for objective today
        entry = {
            'date': timezone.now(),
            'progress': 2
        }
        self.add_progress(response.data["id"], entry)

        # Add progress for objective 1 last week (should not count)
        entry = {
            'date': timezone.now() - timedelta(7),
            'progress': 2
        }
        self.add_progress(response.data["id"], entry)

        # Check current objective progress
        current_progress = Objective.objects.get(pk=response.data['id']).progress
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
        response = self.client.post('/objectives/', obj, content_type='application/json')

        # Add progress two weeks ago
        entry = {
            'date': timezone.now() - timedelta(14),
            'progress': 1
        }
        self.add_progress(response.data["id"], entry)

        # Add progress a week ago
        entry = {
            'date': timezone.now() - timedelta(7),
            'progress': 1
        }
        self.add_progress(response.data["id"], entry)

        # Add progress now
        entry = {
            'date': timezone.now(),
            'progress': 1
        }
        self.add_progress(response.data["id"], entry)

        # Check current objective streak
        current_streak = Objective.objects.get(pk=response.data['id']).current_streak
        self.assertEquals(current_streak, 3)
