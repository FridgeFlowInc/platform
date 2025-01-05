from uuid import UUID

from ninja import ModelSchema

from project.api.product import models


class ProductOut(ModelSchema):
    id: UUID

    class Meta:
        model = models.Product
        fields = "__all__"


class ProductIn(ModelSchema):
    class Meta:
        model = models.Product
        fields = "__all__"
        exclude = [models.Product.id.field.name]  # noqa: RUF012


class ProductLogOut(ModelSchema):
    id: UUID

    class Meta:
        model = models.ProductLog
        fields = "__all__"
