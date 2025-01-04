import logging
from http import HTTPStatus as status  # noqa: N813

import django.core.exceptions

logger = logging.getLogger("django")


def handle_django_validation_error(request, exc, api):
    return api.create_response(
        request,
        {"detail": str(exc)},  # TODO: properly output
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
