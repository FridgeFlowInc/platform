from django.apps import AppConfig


class ProductConfig(AppConfig):
    name = "apps.product"
    label = "product"

    def ready(self) -> None:
        import apps.product.signals  # noqa: F401
