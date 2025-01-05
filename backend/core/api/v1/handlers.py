import logging
from http import HTTPStatus as status  # noqa: N813

import django.core.exceptions

logger = logging.getLogger("django")


def handle_not_found_error(request, exc, router):
    return router.create_response(
        request,
        {"detail": status.NOT_FOUND.phrase},
        status=status.NOT_FOUND,
    )


def handle_django_validation_error(request, exc, router):
    detail = list(exc)

    if hasattr(exc, "error_dict"):
        detail = dict(exc)

    return router.create_response(
        request,
        {"detail": detail},
        status=status.UNPROCESSABLE_ENTITY,
    )


def handle_unknown_exception(request, exc, router):
    logger.exception(exc)

    return router.create_response(
        request,
        {"detail": status.INTERNAL_SERVER_ERROR.phrase},
        status=status.INTERNAL_SERVER_ERROR,
    )


exception_handlers = [
    (django.core.exceptions.ValidationError, handle_django_validation_error),
    (Exception, handle_unknown_exception),
]
