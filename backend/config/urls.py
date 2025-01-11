"""URL configuration for frigeflow-backend."""

from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from config import handlers

urlpatterns = [
    # Admin urls
    path("admin/", admin.site.urls),
    # API urls
    path("api/", include("core.api.urls")),
]


# Add debug-toolbar urls

if settings.DEBUG:
    from debug_toolbar.toolbar import debug_toolbar_urls

    urlpatterns += debug_toolbar_urls()


# Register custom error handlers

handler400 = handlers.handler400

handler403 = handlers.handler403

handler404 = handlers.handler404

handler500 = handlers.handler500
