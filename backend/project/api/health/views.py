from ninja import Router

from project.api.health import schemas

router = Router(tags=["health"])


@router.get(
    "",
    response=schemas.HealthOut,
    summary="Get API health",
    description="Returns 200 if server is ok.",
)
def index(request):
    return {"status": "ok"}
