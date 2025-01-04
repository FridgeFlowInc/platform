from functools import partial

from ninja import NinjaAPI

import project.api.auth
import project.api.handlers
import project.api.health.views
import project.api.product.views

api = NinjaAPI(
    title="FridgeFlow API",
    version="1",
    description="API docs for FridgeFlow project",
    csrf=True,
)


# Register application's routers

api.add_router("/health", project.api.health.views.router)
api.add_router(
    "/product",
    project.api.product.views.router,
    auth=project.api.auth.BearerAuth(),
)


# Register exception handlers

for exception, handler in project.api.handlers.exception_handlers:
    api.add_exception_handler(exception, partial(handler, api=api))
