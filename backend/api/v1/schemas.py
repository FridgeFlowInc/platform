from http import HTTPStatus as status

from ninja import Schema


class UnauthorizedError(Schema):
    detail: str = status.UNAUTHORIZED.phrase
