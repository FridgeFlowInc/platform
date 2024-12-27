import uuid

from django.shortcuts import get_object_or_404
from ninja import Router

from project.api.product import models, shemas

router = Router(tags=["product"])


@router.get("/", response=list[shemas.ProductResponse])
def list_products(request):
    return models.Product.objects.all()


@router.get("/{product_id}", response=shemas.ProductResponse)
def get_product(request, product_id: uuid.UUID):
    return get_object_or_404(models.Product, id=product_id)


@router.post("/", response=shemas.ProductResponse)
def create_product(request, product: shemas.ProductCreate):
    product = models.Product.objects.create(**product.dict())
    models.ProductLog.objects.create(
        product=product,
        action_type="create",
    )
    return product


@router.put("/{product_id}", response=shemas.ProductResponse)
def update_product(
    request,
    product_id: uuid.UUID,
    product: shemas.ProductCreate,
):
    product = get_object_or_404(models.Product, id=product_id)
    models.ProductLog.objects.create(
        product=product,
        action_type="update",
    )
    for attr, value in product.dict().items():
        setattr(product, attr, value)
    product.save()
    return product


@router.delete("/{product_id}")
def delete_product(request, product_id: uuid.UUID):
    product = get_object_or_404(models.Product, id=product_id)
    product.delete()


@router.get("/log", response=list[shemas.ProductLogResponse])
def list_products_log(request):
    return models.ProductLog.objects.all()


@router.get("/search", response=list[shemas.ProductResponse])
def product_search(
    request,
    name: str | None = None,
    categoty: str | None = None,
): ...
