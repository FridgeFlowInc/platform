from django.core.exceptions import ValidationError


class GrossWeightValidator:
    def __call__(self, instance):
        if (
            instance.total_gross_weight is not None
            and instance.total_net_weight is not None
            and instance.total_gross_weight < instance.total_net_weight
        ):
            raise ValidationError(
                "Total gross weight must be greater than or equal to total net weight."
            )


class ExpirationDateValidator:
    def __call__(self, instance):
        if instance.expiration_date <= instance.manufacture_date:
            raise ValidationError(
                "Expiration date must be later than manufacture date."
            )
