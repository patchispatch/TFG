from typing import Set
from django.contrib import admin
from .models import *


class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ['name']

class ObjectiveEntryAdmin(admin.ModelAdmin):
    list_display = ['progress']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

class SettingsAdmin(admin.ModelAdmin):
    list_display = ['weekly_reset_day']

# Register your models here.
admin.site.register(Objective, ObjectiveAdmin)
admin.site.register(ObjectiveEntry, ObjectiveEntryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Settings, SettingsAdmin)