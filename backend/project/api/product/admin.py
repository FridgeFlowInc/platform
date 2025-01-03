from django.contrib import admin

from project.api.product import models

admin.site.register(models.Product)
admin.site.register(models.ProductLog)
