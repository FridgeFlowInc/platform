import uuid

from django.db import models

from core.product.models import Product


class ActionChoices(models.Choices):
    create = "C"
    update = "U"
    delete = "D"


class ProductLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, related_name="logs", null=True
    )
    action_type = models.CharField(max_length=1, choices=ActionChoices)
    description = models.TextField(blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} | {self.action_type}"
