from typing import ClassVar
from uuid import UUID

from ninja import ModelSchema

from apps.shopping_cart.models import ShoppingCartProduct


class ShoppingCartProductOut(ModelSchema):
    id: UUID

    class Meta:
        model = ShoppingCartProduct
        fields = "__all__"
        exclude: ClassVar[list[str]] = [
            ShoppingCartProduct.timestamp.field.name
        ]


class ShoppingCartProductIn(ModelSchema):
    class Meta:
        model = ShoppingCartProduct
        fields = "__all__"
        exclude: ClassVar[list[str]] = [
            ShoppingCartProduct.id.field.name,
            ShoppingCartProduct.timestamp.field.name,
        ]
