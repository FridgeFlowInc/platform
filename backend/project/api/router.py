from ninja import NinjaAPI

import project.api.auth
import project.api.health.views
import project.api.product.views

api = NinjaAPI(
    title="FridgeFlow API",
    version="1",
    description="API docs for FridgeFlow project",
    csrf=True,
    auth=project.api.auth.BearerAuth(),
)

api.add_router("/health/", project.api.health.views.router)
api.add_router("/product/", project.api.product.views.router)
