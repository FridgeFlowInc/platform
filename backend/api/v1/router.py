from functools import partial

from ninja import NinjaAPI

from api.v1 import auth, handlers
from api.v1.check_auth.views import router as check_auth_router
from api.v1.product.views import router as product_router
from api.v1.shopping_cart.views import router as cart_router

router = NinjaAPI(
    title="FridgeFlow API",
    version="1",
    description="API docs for FridgeFlow",
    openapi_url="/docs/openapi.json",
    # csrf=True, noqa: ERA001
)


# Register application's routers

router.add_router(
    "check_auth",
    check_auth_router,
    auth=auth.BearerAuth(),
)
router.add_router(
    "product",
    product_router,
    auth=auth.BearerAuth(),
)
router.add_router(
    "shopping_cart",
    cart_router,
    auth=auth.BearerAuth(),
)


# Register exception handlers

for exception, handler in handlers.exception_handlers:
    router.add_exception_handler(exception, partial(handler, router=router))
