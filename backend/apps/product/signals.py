from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver

from apps.product.log.models import ProductLog
from apps.product.models import Product


@receiver(pre_save, sender=Product)
def create_log_on_create_update(sender, instance: Product, **kwargs) -> None:  # noqa: ANN001, ANN003
    try:
        previous_instance = Product.objects.get(pk=instance.pk)

        ProductLog.objects.create(
            product_id=instance.id,
            quantity_change=instance.quantity - previous_instance.quantity,
            action_type="U",
        )
    except ObjectDoesNotExist:
        ProductLog.objects.create(
            product_id=instance.id,
            quantity_change=instance.quantity,
            action_type="C",
        )


@receiver(pre_delete, sender=Product)
def create_log_on_delete(sender, instance: Product, **kwargs) -> None:  # noqa: ANN001, ANN003
    ProductLog.objects.create(
        product_id=instance.id,
        quantity_change=-(instance.quantity),
        action_type="D",
    )
