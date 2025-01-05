import uuid
from http import HTTPStatus as status  # noqa: N813

from django.shortcuts import get_object_or_404
from ninja import Router

from project.api.product import models, schemas

router = Router(tags=["product"])


@router.get("/logs", response=list[schemas.ProductLogOut])
def list_product_logs(request):
    return models.ProductLog.objects.all()


@router.get("/search", response=list[schemas.ProductOut])
def search_product(request, query: str): ...


@router.get("", response=list[schemas.ProductOut])
def list_products(request):
    return models.Product.objects.all()


@router.post("", response={status.CREATED: schemas.ProductOut})
def create_product(request, product: schemas.ProductIn):
    product = models.Product(**product.dict())
    product.full_clean()
    product.save()

    return status.CREATED, product


@router.get("/{product_id}", response=schemas.ProductOut)
def get_product(request, product_id: uuid.UUID):
    return get_object_or_404(models.Product, id=product_id)


@router.put("/{product_id}", response=schemas.ProductOut)
def update_product(
    request,
    product_id: uuid.UUID,
    product: schemas.ProductIn,
):
    product_model = get_object_or_404(models.Product, id=product_id)
    for attr, value in product.dict().items():
        setattr(product_model, attr, value)
    product_model.save()

    return product_model


@router.delete("/{product_id}", response={200: None})
def delete_product(request, product_id: uuid.UUID):
    product = get_object_or_404(models.Product, id=product_id)
    product.delete()
