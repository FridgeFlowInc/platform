from ninja import Router

from core.api.v1.health import schemas

router = Router(tags=["health"])


@router.get(
    "",
    response=schemas.HealthOut,
    summary="Get API health",
    description="Returns 200 if server is ok.",
)
def health_index(request):
    return {"status": "ok"}
