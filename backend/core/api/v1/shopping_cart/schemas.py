from uuid import UUID

from ninja import ModelSchema

from core.shopping_cart.models import ShoppingCartProduct


class ShoppingCartProductOut(ModelSchema):
    id: UUID

    class Meta:
        model = ShoppingCartProduct
        fields = "__all__"


class ShoppingCartProductIn(ModelSchema):
    class Meta:
        model = ShoppingCartProduct
        fields = "__all__"
        exclude = [ShoppingCartProduct.id.field.name]  # noqa: RUF012
