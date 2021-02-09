# Utils

# Enable partial update
class EnablePartialUpdateMixin:
    """
    Enable partial updates
    """
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
        