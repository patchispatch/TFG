from django.test.testcases import TestCase
from rest_framework.test import APIClient


class ObjectiveAPITestCase(TestCase):
    """
    Unit tests of Objective API
    """
    client = APIClient()
    fixtures = ['objectives', 'objective-entries']

    # TODO: make API tests

    def test_list(self):
        pass

    def test_create(self):
        pass

    def test_read(self):
        pass

    def test_update(self):
        pass

    def test_delete(self):
        pass
    
    def test_create_entry(self):
        pass

    def test_list_entries(self):
        pass

    def test_pause_resume(self):
        pass