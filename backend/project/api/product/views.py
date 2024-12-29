import uuid

from django.shortcuts import get_object_or_404
from ninja import Router

from project.api.product import models, schemas

router = Router(tags=["product"])


@router.get("/", response=list[schemas.ProductResponse])
def list_products(request):
    return models.Product.objects.all()


@router.get("/{product_id}", response=schemas.ProductResponse)
def get_product(request, product_id: uuid.UUID):
    return get_object_or_404(models.Product, id=product_id)


@router.post("/", response=schemas.ProductResponse)
def create_product(request, product: schemas.ProductCreate):
    product = models.Product.objects.create(**product.dict())
    models.ProductLog.objects.create(product=product, action_type="create")

    return product


@router.put("/{product_id}", response=schemas.ProductResponse)
def update_product(
    request, product_id: uuid.UUID, product: schemas.ProductCreate
):
    product = get_object_or_404(models.Product, id=product_id)

    models.ProductLog.objects.create(product=product, action_type="update")
    for attr, value in product.dict().items():
        setattr(product, attr, value)
    product.save()

    return product


@router.delete("/{product_id}")
def delete_product(request, product_id: uuid.UUID):
    product = get_object_or_404(models.Product, id=product_id)
    product.delete()

    return {"success": True}


@router.get("/log", response=list[schemas.ProductLogResponse])
def list_product_logs(request):
    return models.ProductLog.objects.all()


@router.get("/search", response=list[schemas.ProductResponse])
def product_search(
    request, name: str | None = None, category: str | None = None
): ...
