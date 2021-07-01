from rest_framework import serializers
from .models import *


class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = ('id', 'name', 'goal', 'status', 'current_streak', 
                  'best_streak', 'category_id', 'progress')
        extra_kwargs = {
            'progress': {'read_only': True}
        }


class ObjectiveEntrySerializerInput(serializers.ModelSerializer):
    class Meta:
        model = ObjectiveEntry
        fields = '__all__'
        extra_kwargs = {
            'objective_id': {'read_only': True}
        }


class ObjectiveEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectiveEntry
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
