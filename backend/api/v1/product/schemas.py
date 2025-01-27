import datetime
from typing import ClassVar
from uuid import UUID

from ninja import ModelSchema, Schema

from apps.product.log.models import ProductLog
from apps.product.models import Product


class ProductOut(ModelSchema):
    id: UUID

    class Meta:
        model = Product
        fields = "__all__"


class ProductIn(ModelSchema):
    class Meta:
        model = Product
        fields = "__all__"
        exclude: ClassVar[list[str]] = [Product.id.field.name]


class ProductLogOut(ModelSchema):
    id: UUID

    class Meta:
        model = ProductLog
        fields = "__all__"


class DailyChangeOut(Schema):
    positive_quantity_change_for_date: float
    negative_quantity_change_for_date: float
    date: datetime.date


class ProductStatsOut(Schema):
    product_id: UUID
    quantity_changes: list[DailyChangeOut]
