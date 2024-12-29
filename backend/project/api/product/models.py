import uuid

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Product(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)
    nutritional_value = models.FloatField()
    total_net_weight = models.FloatField()
    total_gross_weight = models.FloatField()
    manufacture_date = models.DateField()
    expiration_date = models.DateField()
    notes = models.TextField(blank=True)
    allergens = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ProductLog(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="product_log",
    )
    action_type = models.TextField(
        choices=[
            ("create", "create"),
            ("update", "update"),
            ("delete", "delete"),
        ],
    )

    description = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name


@receiver(post_save, sender=Product)
def create_log(sender, instance, created, **kwargs):
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
