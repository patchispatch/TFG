from django.test.testcases import TestCase
from rest_framework.test import APIClient


class CategoryAPITestCase(TestCase):
    """
    Unit tests of Category API
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