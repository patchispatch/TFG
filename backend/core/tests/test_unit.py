from datetime import datetime
from django.test import TestCase
from rest_framework.test import APIClient
from core.models import *

#### OBJECTIVES
class ObjectivesTestCase(TestCase):
    client = APIClient()
    fixtures = ['data']

    def test_update_progress(self):
        # Add progress for objective 1
        entry = {
            'date': datetime.now(),
            'progress': 2
        }
        self.client.post('/objectives/1/entries/', entry)

        # Check current objective progress
        current_progress = Objective.objects.get(pk=1).progress()
        self.assertEquals(current_progress, 2)
