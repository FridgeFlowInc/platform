from django.urls import path

import project.api.router

urlpatterns = [path("", project.api.router.api.urls)]
