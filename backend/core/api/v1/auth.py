from django.conf import settings
from ninja.security import HttpBearer


class BearerAuth(HttpBearer):
    def authenticate(self, request, token):
        if token == settings.FRIDGE_PANEL_PASSWORD:
            return token

        return None
