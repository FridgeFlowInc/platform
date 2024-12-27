from django.conf import settings
from ninja.security import HttpBearer


class BearerAuth(HttpBearer):
    def authenticate(self, request, token):
        if token == settings.PASSWORD:
            return token

        return None
