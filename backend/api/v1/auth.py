from django.conf import settings
from django.http import HttpRequest
from ninja.security import HttpBearer


class BearerAuth(HttpBearer):
    def authenticate(self, request: HttpRequest, token: str) -> str | None:
        if token == settings.FRIDGE_PANEL_PASSWORD:
            return token

        return None
