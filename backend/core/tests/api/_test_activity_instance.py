from django.test.testcases import TestCase
from rest_framework.test import APIClient


class ActivityInstanceAPITestCase(TestCase):
    """
    Unit tests of ActivityInstance API
    """
    client = APIClient()
    fixtures = ['settings']

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