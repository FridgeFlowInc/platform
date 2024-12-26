from django.urls import include, path

urlpatterns = [
    path("health/", include("project.api.health.urls")),
]
