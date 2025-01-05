import logging
from http import HTTPStatus as status  # noqa: N813

import django.core.exceptions

logger = logging.getLogger("django")


def handle_not_found_error(request, exc, api):
    return api.create_response(
        request,
        {"detail": status.NOT_FOUND.phrase},
        status=status.NOT_FOUND,
    )


def handle_django_validation_error(request, exc, api):
    detail = list(exc)

    if hasattr(exc, "error_dict"):
        detail = dict(exc)

    return api.create_response(
        request,
        {"detail": {"fields": detail}},
        status=status.UNPROCESSABLE_ENTITY,
    )


def handle_unknown_exception(request, exc, api):
    logger.exception(exc)

    return api.create_response(
        request,
        {"detail": status.INTERNAL_SERVER_ERROR.phrase},
        status=status.INTERNAL_SERVER_ERROR,
    )


exception_handlers = [
    (django.core.exceptions.ValidationError, handle_django_validation_error),
    (Exception, handle_unknown_exception),
]
