import uuid

from django.core import validators
from django.db import models
from django.db.models import signals
from django.dispatch import receiver

from project.api.product.validators import (
    ExpirationDateValidator,
    GrossWeightValidator,
)


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    quantity = models.FloatField(
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(1000000),
        ],
    )
    unit = models.CharField(max_length=50)
    nutritional_value = models.FloatField(  # in kcals
        blank=True,
        null=True,
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(1000000),
        ],
    )
    total_net_weight = models.FloatField(  # in grams
        blank=True,
        null=True,
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(100000000),
        ],
    )
    total_gross_weight = models.FloatField(  # in grams
        blank=True,
        null=True,
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(100000000),
        ],
    )

    manufacture_date = models.DateField()
    expiration_date = models.DateField()

    notes = models.TextField(blank=True, max_length=1000)
    allergens = models.TextField(blank=True, max_length=1000)

    def __str__(self):
        return self.name

    def clean(self):
        GrossWeightValidator()(self)
        ExpirationDateValidator()(self)


class ProductLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="logs"
    )

    action_type = models.TextField(
        choices=[
            ("create", "create"),
            ("update", "update"),
            ("delete", "delete"),
        ]
    )
    description = models.TextField(blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} | {self.action_type}"


@receiver(signals.post_save, sender=Product)
def create_log_on_create_update(sender, instance, created, **kwargs):
    if created:
        ProductLog.objects.create(
            product=instance,
            action_type="create",
        )
    else:
        ProductLog.objects.create(
            product=instance,
            action_type="update",
        )


@receiver(
    signals.pre_delete, sender=Product
)  # TODO: dont delete logs when product deleted
def create_log_on_delete(sender, instance, **kwargs):
    ProductLog.objects.create(
        product=instance,
        action_type="delete",
    )
