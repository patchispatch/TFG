from django.contrib import admin
from .models import *


class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ['name']

class ObjectiveEntryAdmin(admin.ModelAdmin):
    list_display = ['progress']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

# Register your models here.
admin.site.register(Objective, ObjectiveAdmin)
admin.site.register(ObjectiveEntry, ObjectiveEntryAdmin)
admin.site.register(Category, CategoryAdmin)