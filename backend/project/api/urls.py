from django.urls import include, path

urlpatterns = [
    path("health/", include("api.health.urls")),
]
