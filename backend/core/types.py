from enum import Enum

class ObjectiveFilter(Enum):
  ACTIVE = 'active'
  PAUSED = 'paused'
  IN_PROGRESS = 'in-progress'
  COMPLETED = 'completed'