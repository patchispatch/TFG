from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import *

# UH1 - Create objective
class UH1TestCase(TestCase):
    client = APIClient()

    def test_post_new_objective(self):
        """New object shares data with request"""
        
        new_objective = {"title": "Running", "goal": "3"}

        # User makes POST request with data
        response = self.client.post("/objectives/", new_objective)

        #The new objective has been created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Objective.objects.count(), 1)
        self.assertEqual(Objective.objects.get().title, 'Running')
        self.assertEqual(Objective.objects.get().goal, 3)
        self.assertEqual(Objective.objects.get().progress, 0)
