from rest_framework import serializers
from .models import *

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'title', 'description', 'date', 'time')

    def to_internal_value(self, data):
        # Check for "date": ""  and "time": "", and convert to None
        # This must be done before .validate()
        if data['date'] == '':
            data['date'] = None

        if data['time'] == '':
            data['time'] = None

        return super(ActivitySerializer, self).to_internal_value(data)

class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = ('id', 'title', 'goal', 'progress')