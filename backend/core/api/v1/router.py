from functools import partial

from ninja import NinjaAPI

from core.api.v1 import auth, handlers
from core.api.v1.health.views import router as health_router
from core.api.v1.product.views import router as product_router

router = NinjaAPI(
    title="FridgeFlow API",
    version="1",
    description="API docs for FridgeFlow",
    openapi_url="/docs/openapi.json",
    csrf=True,
)


# Register application's routers

router.add_router(
    "health",
    health_router,
)
router.add_router(
    "product",
    product_router,
    auth=auth.BearerAuth(),
)


# Register exception handlers

for exception, handler in handlers.exception_handlers:
    router.add_exception_handler(exception, partial(handler, router=router))