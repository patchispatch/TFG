from django.contrib import admin
from .models import *

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'date', 'time')

class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ('title', 'goal', 'progress')

# Register your models here.
admin.site.register(Activity, ActivityAdmin)
admin.site.register(Objective, ObjectiveAdmin)