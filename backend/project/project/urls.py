"""URL configuration for frigeflow-backend."""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    # API urls
    path("api/", include("api.urls")),
]
