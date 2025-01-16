import datetime
import uuid
from collections import defaultdict
from http import HTTPStatus as status
from typing import Literal

from django.db.models.manager import BaseManager
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from ninja import Router

from api.v1 import schemas as global_schemas
from api.v1.product import schemas
from apps.product.log.models import ProductLog
from apps.product.models import Product

router = Router(tags=["product"])


@router.get("/logs", response=list[schemas.ProductLogOut])
def list_product_logs(request: HttpRequest) -> BaseManager[Product]:
    return ProductLog.objects.all()


@router.post("/search_by_qr", response=list[schemas.ProductOut])
def search_product_by_qr(
    request: HttpRequest, product: schemas.ProductIn
) -> BaseManager[Product]:
    return Product.objects.filter(**product.dict())


@router.get("", response=list[schemas.ProductOut])
def list_products(request: HttpRequest) -> BaseManager[Product]:
    return Product.objects.all()


@router.post("", response={status.CREATED: schemas.ProductOut})
def create_product(
    request: HttpRequest, product: schemas.ProductIn
) -> tuple[Literal[status.CREATED], Product]:
    product = Product(**product.dict())
    product.full_clean()
    product.save()
    ProductLog.objects.create(
        product_id=product.id,
        quantity_change=product.quantity,
        action_type="C",
    )

    return status.CREATED, product


@router.get("/{product_id}", response=schemas.ProductOut)
def get_product(request: HttpRequest, product_id: uuid.UUID) -> Product:
    return get_object_or_404(Product, id=product_id)


@router.put("/{product_id}", response={status.OK: schemas.ProductOut})
def update_product(
    request: HttpRequest,
    product_id: uuid.UUID,
    product: schemas.ProductIn,
) -> Product:
    product_obj = get_object_or_404(Product, id=product_id)
    ProductLog.objects.create(
        product_id=product_id,
        quantity_change=product.quantity - product_obj.quantity,
        action_type="U",
    )
    for attr, value in product.dict().items():
        setattr(product_obj, attr, value)
    product_obj.save()

    return product_obj


@router.delete(
    "/{product_id}",
    response={
        status.OK: None,
        status.NOT_FOUND: global_schemas.NotFoundError,
    },
)
def delete_product(request: HttpRequest, product_id: uuid.UUID) -> None:
    product = get_object_or_404(Product, id=product_id)
    ProductLog.objects.create(
        product_id=product_id,
        quantity_change=-(product.quantity),
        action_type="D",
    )
    product.delete()


@router.get("/{product_id}/stats", response=schemas.ProductStatsOut)
def get_product_stats(
    request: HttpRequest,
    product_id: uuid.UUID,
    date_after: datetime.date,
    date_before: datetime.date,
) -> schemas.ProductStatsOut:
    entries = ProductLog.objects.filter(product_id=product_id).filter(
        timestamp__date__range=(date_after, date_before)
    )
    daily_change = defaultdict(float)
    for entry in entries:
        day = entry.timestamp.date()
        daily_change[day] += entry.quantity_change

    daily_changes = [
        schemas.DailyChangeOut(
            date=day, quantity_change_for_date=daily_change[day]
        )
        for day in daily_change
    ]

    return schemas.ProductStatsOut(
        product_id=product_id, quantity_changes=daily_changes
    )


@router.get("/analytics", response=list[schemas.DailyChangeOut])
def get_products_stats(
    request: HttpRequest,
    date_after: datetime.date,
    date_before: datetime.date,
) -> list[schemas.DailyChangeOut]:
    entries = ProductLog.objects.all().filter(
        timestamp__date__range=(date_after, date_before)
    )
    daily_change = defaultdict(float)
    for entry in entries:
        day = entry.timestamp.date()
        daily_change[day] += entry.quantity_change

    return [
        schemas.DailyChange(
            date=day, quantity_change_for_date=daily_change[day]
        )
        for day in daily_change
    ]
