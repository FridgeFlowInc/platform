from ninja import NinjaAPI, Schema

api = NinjaAPI()


class HealthResponse(Schema):
    status: str


@api.get("/", response=HealthResponse)
def add(request):
    return {"status": "ok"}
