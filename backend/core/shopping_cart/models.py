import uuid

from django.core import validators
from django.db import models


class ShoppingCartProduct(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    quantity = models.DecimalField(
        max_digits=11,  # 7 digits + 4 decimal places
        decimal_places=4,
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(1000000),
        ],
    )
    unit = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"
