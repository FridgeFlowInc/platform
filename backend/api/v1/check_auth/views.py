from http import HTTPStatus as status
from typing import Literal

from django.http import HttpRequest
from ninja import Router

from api.v1 import schemas as global_schemas

router = Router(tags=["check_auth"])


@router.get(
    "",
    response={
        status.NO_CONTENT: None,
        status.UNAUTHORIZED: global_schemas.UnauthorizedError,
    },
    summary="Check if user is authenticated",
)
def check_auth_index(
    request: HttpRequest,
) -> tuple[Literal[status.NO_CONTENT], None]:
    return status.NO_CONTENT, None
