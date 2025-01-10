import uuid
from http import HTTPStatus as status  # noqa: N813

from django.shortcuts import get_object_or_404
from ninja import Router

from core.api.v1.shopping_cart import schemas
from core.shopping_cart.models import ShoppingCartProduct

router = Router(tags=["shopping_cart"])


@router.get("", response=list[schemas.ShoppingCartProductOut])
def get_cart(request):
    return ShoppingCartProduct.objects.all()


@router.post("", response={status.CREATED: schemas.ShoppingCartProductOut})
def add_product(request, product: schemas.ShoppingCartProductIn):
    product = ShoppingCartProduct(**product.dict())
    product.full_clean()
    product.save()

    return status.CREATED, product


@router.get("/{product_id}", response=schemas.ShoppingCartProductOut)
def get_product(request, product_id: uuid.UUID):
    return get_object_or_404(ShoppingCartProduct, id=product_id)


@router.put(
    "/{product_id}",
    response={status.OK: schemas.ShoppingCartProductOut},
)
def update_product_in_cart(
    request,
    product_id: uuid.UUID,
    product: schemas.ShoppingCartProductIn,
):
    product_obj = get_object_or_404(ShoppingCartProduct, id=product_id)
    for attr, value in product.dict().items():
        setattr(product_obj, attr, value)
    product_obj.save()

    return product_obj


@router.delete("/{product_id}", response={status.OK: None})
def delete_product_from_cart(request, product_id: uuid.UUID):
    product = get_object_or_404(ShoppingCartProduct, id=product_id)
    product.delete()
