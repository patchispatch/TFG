from rest_framework import serializers
from .models import *


class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = '__all__'


class ObjectiveEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectiveEntry
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
