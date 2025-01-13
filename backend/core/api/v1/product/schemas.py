import datetime
from uuid import UUID

from ninja import ModelSchema, Schema

from core.product.log.models import ProductLog
from core.product.models import Product


class ProductOut(ModelSchema):
    id: UUID

    class Meta:
        model = Product
        fields = "__all__"


class ProductIn(ModelSchema):
    class Meta:
        model = Product
        fields = "__all__"
        exclude = [Product.id.field.name]  # noqa: RUF012


class ProductLogOut(ModelSchema):
    id: UUID

    class Meta:
        model = ProductLog
        fields = "__all__"


class DailyChange(Schema):
    quantity_change_for_date: float
    date: datetime.date


class ProductStatsResponse(Schema):
    product_id: UUID
    quantity_changes: list[DailyChange]
