from django.contrib import admin
from .models import *

class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'date', 'time')

# Register your models here.
admin.site.register(Activity, ActivityAdmin)
