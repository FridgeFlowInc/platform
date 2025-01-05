from django.db.models import signals
from django.dispatch import receiver

from core.product.log.models import ProductLog
from core.product.models import Product


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


@receiver(signals.pre_delete, sender=Product)
def create_log_on_delete(sender, instance, **kwargs):
    ProductLog.objects.create(
        product=instance,
        action_type="delete",
    )
