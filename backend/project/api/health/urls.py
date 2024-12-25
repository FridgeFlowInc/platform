from django.urls import path

from api.health.views import api

urlpatterns = [
    path("", api.urls),
]
