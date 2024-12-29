import uuid

from django.shortcuts import get_object_or_404
from ninja import Router

from project.api.product import models, schemas

router = Router(tags=["product"])


@router.get("/", response=list[schemas.ProductResponse])
def list_products(request):
    return models.Product.objects.all()


@router.post("/", response=schemas.ProductResponse)
def create_product(request, product: schemas.ProductCreate):
    return models.Product.objects.create(**product.dict())


@router.get("/log", response=list[schemas.ProductLogResponse])
def list_products_log(request):
    return models.ProductLog.objects.all()


@router.get("/search", response=list[schemas.ProductResponse])
def product_search(
    request,
    name: str | None = None,
    categoty: str | None = None,
): ...


@router.get("/{product_id}", response=schemas.ProductResponse)
def get_product(request, product_id: uuid.UUID):
    return get_object_or_404(models.Product, id=product_id)


@router.put("/{product_id}", response=schemas.ProductResponse)
def update_product(
    request,
    product_id: uuid.UUID,
    product: schemas.ProductCreate,
):
    product_model = get_object_or_404(models.Product, id=product_id)
    for attr, value in product.dict().items():
        setattr(product_model, attr, value)
    product_model.save()
    return product_model


@router.delete("/{product_id}")
def delete_product(request, product_id: uuid.UUID):
    product = get_object_or_404(models.Product, id=product_id)
    product.delete()
