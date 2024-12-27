from ninja import Router, Schema

router = Router(tags=["health"])


class HealthResponse(Schema):
    status: str = "ok"


@router.get(
    "/",
    response=HealthResponse,
    summary="Get API endpoint health",
    description="Returns 200 if server is ok.",
)
def index(request):
    return {"status": "ok"}
