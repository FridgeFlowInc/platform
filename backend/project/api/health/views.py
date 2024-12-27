from ninja import Router, Schema

router = Router(tags=["health"])


class HealthResponse(Schema):
    status: str


@router.get("/", response=HealthResponse)
def add(request):
    return {"status": "ok"}
