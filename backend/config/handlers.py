from http import HTTPStatus as status  # noqa: N813

from django.http import JsonResponse


def handler400(request, exception=None):
    return JsonResponse(
        status=status.BAD_REQUEST,
        data={"detail": status.BAD_REQUEST.phrase},
    )


def handler403(request, exception=None):
    return JsonResponse(
        status=status.FORBIDDEN,
        data={"detail": status.FORBIDDEN.phrase},
    )


def handler404(request, exception=None):
    return JsonResponse(
        status=status.NOT_FOUND,
        data={"detail": status.NOT_FOUND.phrase},
    )


def handler500(request, exception=None):
    return JsonResponse(
        status=status.INTERNAL_SERVER_ERROR,
        data={"detail": status.INTERNAL_SERVER_ERROR.phrase},
    )
