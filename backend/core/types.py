from enum import Enum

class ObjectiveFilter(Enum):
  ACTIVE = 'active'
  PAUSED = 'paused'
  IN_PROGRESS = 'in-progress'
  COMPLETED = 'completed'

class Color(Enum):
  DEFAULT = 'default'
  LIGHT_BLUE = 'light_blue'
  DARK_BLUE = 'dark_blue'
  LIGHT_GREEN = 'light_green'
  DARK_GREEN = 'dark_green'
  LIGHT_PINK = 'light_pink'
  DARK_PINK = 'dark_pink'
  LIGHT_YELLOW = 'light_yellow'
  DARK_YELLOW = 'dark_yellow'
  LIGHT_PURPLE = 'light_purple'
  DARK_PURPLE = 'dark_purple'
  