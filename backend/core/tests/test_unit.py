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

    @freeze_time("1998-09-21")
    def test_update_progress(self):
        """
        Tests whether the progress of an objective is calculated properly.
        Assumptions: weekly reset day is set on sunday, test executes on monday.
        """
        # Create new objective
        obj = {
            "name": "Progress test objective",
            "goal": 3,
            "paused": False,
            "current_streak": 0,
            "best_streak": 0,
            "category_id": None
        }
        response = self.client.post('/objectives/', obj, content_type='application/json')

        # Add progress for objective today
        entry = {
            'date': timezone.now(),
            'progress': 2
        }
        self.client.post(f'/objectives/{response.data["id"]}/entries/', entry)

        # Add progress for objective 1 last week (should not count)
        entry = {
            'date': timezone.now() - timedelta(7),
            'progress': 2
        }
        self.client.post(f'/objectives/{response.data["id"]}/entries/', entry)

        # Check current objective progress
        current_progress = Objective.objects.get(pk=response.data['id']).progress
        self.assertEquals(current_progress, 2)
