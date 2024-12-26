from django.urls import path

from project.api.health.views import api

urlpatterns = [
    path("", api.urls),
]
