from ninja import NinjaAPI

import project.api.health.views

api = NinjaAPI(
    title="FridgeFlow API",
    version="1",
    description="API docs for FridgeFlow project",
    csrf=True,
)

api.add_router("/health/", project.api.health.views.router)
