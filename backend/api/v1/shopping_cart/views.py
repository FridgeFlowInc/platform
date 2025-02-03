import uuid
from http import HTTPStatus as status

from django.db.models import F
from django.db.models.manager import BaseManager
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from ninja import Router

from api.v1.shopping_cart import schemas
from apps.shopping_cart.models import ShoppingCartProduct

router = Router(tags=["shopping_cart"])


@router.get("", response={status.OK: list[schemas.ShoppingCartProductOut]})
def get_cart(
    request: HttpRequest,
) -> tuple[int, BaseManager[ShoppingCartProduct]]:
    return status.OK, ShoppingCartProduct.objects.order_by(
        F("timestamp").desc()
    )


@router.post("", response={status.CREATED: schemas.ShoppingCartProductOut})
def add_product(
    request: HttpRequest, product: schemas.ShoppingCartProductIn
) -> tuple[int, ShoppingCartProduct]:
    product = ShoppingCartProduct(**product.dict())
    product.full_clean()
    product.save()

    return status.CREATED, product


@router.put(
    "/{product_id}",
    response={status.OK: schemas.ShoppingCartProductOut},
)
def update_product_in_cart(
    request: HttpRequest,
    product_id: uuid.UUID,
    product: schemas.ShoppingCartProductIn,
) -> tuple[int, ShoppingCartProduct]:
    product_obj = get_object_or_404(ShoppingCartProduct, id=product_id)

    for attr, value in product.dict().items():
        setattr(product_obj, attr, value)

    product_obj.full_clean()
    product_obj.save()

    return status.OK, product_obj


@router.delete("/{product_id}", response={status.NO_CONTENT: None})
def delete_product_from_cart(
    request: HttpRequest, product_id: uuid.UUID
) -> tuple[int, None]:
    product = get_object_or_404(ShoppingCartProduct, id=product_id)
    product.delete()

    return status.NO_CONTENT, None
