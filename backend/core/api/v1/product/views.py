import uuid
from http import HTTPStatus as status  # noqa: N813

from django.shortcuts import get_object_or_404
from ninja import Router

from core.api.v1.product import schemas
from core.product.log.models import ProductLog
from core.product.models import Product

router = Router(tags=["product"])


@router.get("/logs", response=list[schemas.ProductLogOut])
def list_product_logs(request):
    return ProductLog.objects.all()


@router.get("/search", response=list[schemas.ProductOut])
def search_product(request, query: str): ...


@router.get("", response=list[schemas.ProductOut])
def list_products(request):
    return Product.objects.all()


@router.post("", response={status.CREATED: schemas.ProductOut})
def create_product(request, product: schemas.ProductIn):
    product = Product(**product.dict())
    product.full_clean()
    product.save()

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
    for attr, value in product.dict().items():
        setattr(product_obj, attr, value)
    product_obj.save()

    return product_obj


@router.delete("/{product_id}", response={status.OK: None})
def delete_product(request, product_id: uuid.UUID):
    product = get_object_or_404(Product, id=product_id)
    product.delete()
