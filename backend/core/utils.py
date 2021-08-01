from datetime import time
from .models.settings import Settings
from datetime import date, datetime, timedelta


def get_week(offset=0):
    """
    Returns first and last day of current week. If specified, returns week with an offset.
    """
    last_date = get_next_reset_day()
    first_date = last_date - timedelta(7)

    if offset != 0:
        offset *= 7
        first_date += timedelta(offset)
        last_date += timedelta(offset)
    
    return first_date, last_date


def get_next_reset_day(day=None):
    """
    Returns next reset day from a specified day (default is today)
    """
    if not day:
        day = date.today()
        
    reset_day = Settings.objects.filter().first().weekly_reset_day
    next_reset_date = day + timedelta((reset_day - day.weekday()) % 7)

    # If today is the first day of week, return next week day
    if reset_day == date.today().weekday():
        next_reset_date += timedelta(7)

    return next_reset_date
