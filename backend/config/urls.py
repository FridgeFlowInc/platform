"""URL configuration for frigeflow-backend."""

from debug_toolbar.toolbar import debug_toolbar_urls
from django.contrib import admin
from django.urls import include, path

from config import handlers

urlpatterns = [
    path("admin/", admin.site.urls),
    # API urls
    path("api/", include("core.api.urls")),
    *debug_toolbar_urls(),
]


# Register custom error handlers

handler400 = handlers.handler400

handler403 = handlers.handler403

handler404 = handlers.handler404

handler500 = handlers.handler500
