import datetime
import uuid

from django.db import models


class ActionChoices(models.Choices):
    create = "C"
    update = "U"
    delete = "D"


class ProductLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    product_id = models.UUIDField(null=True)
    action_type = models.CharField(max_length=1, choices=ActionChoices)
    quantity_change = models.FloatField()
    description = models.TextField(blank=True)

    timestamp = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self) -> str:
        product_name = self.product.name if hasattr(self, "product") else "(deleted)"
        return f"{product_name} | {self.action_type}"
