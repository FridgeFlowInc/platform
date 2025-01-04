from dataclasses import Field
import datetime
from uuid import UUID, uuid4

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
        exclude = ["id"]


class ProductLogResponse(ModelSchema):
    id: UUID

    class Meta:
        model = models.ProductLog
        fields = "__all__"
