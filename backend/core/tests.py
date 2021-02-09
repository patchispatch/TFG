from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import *

# UH1 - Create objective
class UH1TestCase(TestCase):
    client = APIClient()

    def create_objective(self, new_objective):
        # User makes POST request with data
        return self.client.post("/objectives/", new_objective)

    def test_post_new_objective(self):
        """New object shares data with request"""
        
        new_objective = {"title": "Running", "goal": "3"}

        # User makes POST request with data
        response = self.create_objective(new_objective)

        #The new objective has been created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Objective.objects.count(), 1)
        self.assertEqual(Objective.objects.get().title, 'Running')
        self.assertEqual(Objective.objects.get().goal, 3)
        self.assertEqual(Objective.objects.get().progress, 0)

# UH2 - Edit objective
class UH2TestCase(TestCase):
    client = APIClient()

    def create_objective(self, new_objective):
        # User makes POST request with data
        return self.client.post("/objectives/", new_objective)

    def edit_objective(self, id, new_data):
        # Make PUT request with new data
        return self.client.patch("/objectives/{}".format(id), new_data)


    def test_edit_objective(self):
        """Editing existing objective with new data"""

        # Create "existing" object
        new_objective = {"title": "Original title", "goal": "1"}
        request = self.create_objective(new_objective)

        # Select and make put request
        obj_to_edit = Objective.objects.get().id
        current_progress = Objective.objects.get().progress
        new_data = {"id": obj_to_edit, "title": "Modified title", "progress": current_progress, "goal": "4"}

        # User makes PUT request with new data:
        response = self.edit_objective(obj_to_edit, new_data)

        # The object has been edited successfully
        self.assertTrue(status.is_success(response.status_code))
        self.assertEqual(Objective.objects.get().title, "Modified title")
        self.assertEqual(Objective.objects.get().goal, 4)
