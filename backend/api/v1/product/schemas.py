import datetime
from typing import ClassVar
from uuid import UUID

from ninja import ModelSchema, Schema

from apps.product.models import Product


class ProductOut(ModelSchema):
    id: UUID

    class Meta:
        model = Product
        fields = "__all__"
        exclude: ClassVar[list[str]] = [Product.timestamp.field.name]


class ProductIn(ModelSchema):
    class Meta:
        model = Product
        fields = "__all__"
        exclude: ClassVar[list[str]] = [
            Product.id.field.name,
            Product.timestamp.field.name,
        ]


class DailyChangeOut(Schema):
    positive_quantity_change_for_date: float
    negative_quantity_change_for_date: float
    date: datetime.date


class NotificationOut(Schema):
    name: str
    level: str
    type: str
    timestamp: datetime.datetime
