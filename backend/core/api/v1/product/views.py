import datetime
import uuid
from collections import defaultdict
from http import HTTPStatus as status  # noqa: N813

from django.shortcuts import get_object_or_404
from ninja import Query, Router

from core.api.v1.product import schemas
from core.product.log.models import ProductLog
from core.product.models import Product
from core.product.search import search

router = Router(tags=["product"])


@router.get("/logs", response=list[schemas.ProductLogOut])
def list_product_logs(request):
    return ProductLog.objects.all()


@router.get("/search", response=list[schemas.ProductOut])
def search_product(request, filters: schemas.ProductFilterSchema = Query(...)):  # noqa: B008
    return search(dict(filters))


@router.get("", response=list[schemas.ProductOut])
def list_products(request):
    return Product.objects.all()


@router.post("", response={status.CREATED: schemas.ProductOut})
def create_product(request, product: schemas.ProductIn):
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
def get_product(request, product_id: uuid.UUID):
    return get_object_or_404(Product, id=product_id)


@router.put("/{product_id}", response={status.OK: schemas.ProductOut})
def update_product(
    request,
    product_id: uuid.UUID,
    product: schemas.ProductIn,
):
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


@router.delete("/{product_id}", response={status.OK: None})
def delete_product(request, product_id: uuid.UUID):
    product = get_object_or_404(Product, id=product_id)
    ProductLog.objects.create(
        product_id=product_id,
        quantity_change=-(product.quantity),
        action_type="D",
    )
    product.delete()


@router.get("/{product_id}/stats", response=schemas.ProductStatsResponse)
def get_product_stats(
    request,
    product_id: uuid.UUID,
    date_after: datetime.date,
    date_before: datetime.date,
):
    entries = ProductLog.objects.filter(product_id=product_id).filter(
        timestamp__date__range=(date_after, date_before)
    )
    daily_change = defaultdict(float)
    for entry in entries:
        day = entry.timestamp.date()
        daily_change[day] += entry.quantity_change

    daily_changes = [
        schemas.DailyChange(
            date=day, quantity_change_for_date=daily_change[day]
        )
        for day in daily_change
    ]

    return schemas.ProductStatsResponse(
        product_id=product_id, quantity_changes=daily_changes
    )


@router.get("/stats", response=list[schemas.DailyChange])
def get_products_stats(
    request,
    date_after: datetime.date,
    date_before: datetime.date,
):
    entries = ProductLog.objects.all().filter(
        timestamp__date__range=(date_after, date_before)
    )
    daily_change = defaultdict(float)
    for entry in entries:
        day = entry.timestamp.date()
        daily_change[day] += entry.quantity_change

    daily_changes = [
        schemas.DailyChange(
            date=day, quantity_change_for_date=daily_change[day]
        )
        for day in daily_change
    ]

    return daily_changes  # noqa: RET504
