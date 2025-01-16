import uuid
from decimal import Decimal

from django.core import validators
from django.db import models

from apps.product.validators import (
    ExpirationDateValidator,
    GrossWeightValidator,
)


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    quantity = models.DecimalField(
        max_digits=11,  # 7 digits + 4 decimal places
        decimal_places=4,
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(1000000),
        ],
    )
    unit = models.CharField(max_length=50)
    nutritional_value = models.DecimalField(  # in kcals
        max_digits=9,  # 7 digits + 2 decimal places
        decimal_places=2,
        blank=True,
        null=True,
        validators=[
            validators.MinValueValidator(Decimal(0)),
            validators.MaxValueValidator(Decimal(1000000)),
        ],
    )
    total_net_weight = models.DecimalField(  # in grams
        max_digits=9,  # 7 digits + 2 decimal places
        decimal_places=2,
        blank=True,
        null=True,
        validators=[
            validators.MinValueValidator(Decimal(0)),
            validators.MaxValueValidator(Decimal(1000000)),
        ],
    )
    total_gross_weight = models.DecimalField(  # in grams
        max_digits=9,  # 7 digits + 2 decimal places
        decimal_places=2,
        blank=True,
        null=True,
        validators=[
            validators.MinValueValidator(Decimal(0)),
            validators.MaxValueValidator(Decimal(1000000)),
        ],
    )

    manufacture_date = models.DateField()
    expiration_date = models.DateField()

    notes = models.TextField(  # noqa: DJ001
        max_length=1000,
        blank=True,
        null=True,
    )
    allergens = models.TextField(  # noqa: DJ001
        max_length=1000,
        blank=True,
        null=True,
    )

    def __str__(self) -> None:
        return f"{self.name} ({self.category})"

    def clean(self) -> None:
        GrossWeightValidator()(self)
        ExpirationDateValidator()(self)
