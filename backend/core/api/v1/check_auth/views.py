from ninja import Router

from core.api.v1.check_auth import schemas

router = Router(tags=["check_auth"])


@router.get(
    "",
    response=schemas.CheckAuthOut,
    summary="Check if user is authenticated",
    description="Returns 200 if user is authenticated.",
)
def check_auth_index(request):
    return {"status": "ok"}
