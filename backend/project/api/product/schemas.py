from uuid import UUID

from ninja import ModelSchema

from project.api.product import models


class ProductResponse(ModelSchema):
    id: UUID

    class Meta:
        model = models.Product
        fields = "__all__"


class ProductCreate(ModelSchema):
    class Meta:
        model = models.Product
        fields = "__all__"
        exclude = [models.Product.id.field.name]  # noqa: RUF012


class ProductLogResponse(ModelSchema):
    id: UUID

    class Meta:
        model = models.ProductLog
        fields = "__all__"
