from django.urls import path

from core.api.v1.router import router as api_v1_router

urlpatterns = [path("v1/", api_v1_router.urls)]
