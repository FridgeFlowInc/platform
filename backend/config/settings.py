"""Django settings for fridgeflow-backend."""

import logging
from pathlib import Path

import environ
from django.utils.translation import gettext_lazy as _

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")


# Common settings

SECRET_KEY = env("DJANGO_SECRET_KEY", default="very_insecure_key")

DEBUG = env("DJANGO_DEBUG", default=True)

ALLOWED_HOSTS = env(
    "DJANGO_ALLOWED_HOSTS",
    list,
    default=["localhost", "127.0.0.1"],
)

CSRF_TRUSTED_ORIGINS = env(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    list,
    default=["http://localhost", "http://127.0.0.1"],
)

INTERNAL_IPS = env(
    "DJANGO_INTERNAL_IPS",
    list,
    default=["localhost", "127.0.0.1"],
)

FRIDGE_PANEL_PASSWORD = env("DJANGO_FRIDGE_PANEL_PASSWORD", default="password")


INSTALLED_APPS = [
    # Build-in apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Healthcheck
    "health_check",
    "health_check.db",
    "health_check.cache",
    "health_check.storage",
    "health_check.contrib.migrations",
    # Third-party apps
    "ninja",
    # Internal apps
    "core.product",
    "core.product.log",
    # API v1 apps
    "core.api.v1.health",
    "core.api.v1.product",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "config.wsgi.application"


# Database

DB_URI = env.db_url("DJANGO_DB_URI", default="sqlite:///db.sqlite3")

DATABASES = {"default": DB_URI}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth."
            "password_validation.UserAttributeSimilarityValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation.MinimumLengthValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation.CommonPasswordValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation.NumericPasswordValidator"
        )
    },
]


# Internationalization

LANGUAGE_CODE = env("DJANGO_LANGUAGE_CODE", default="en-us")

LANGUAGES = [("en", _("English")), ("ru", _("Russian"))]

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

FIRST_DAY_OF_WEEK = 1


# Static files (CSS, JavaScript, Images)

STATIC_ROOT = BASE_DIR / "static"

STATIC_URL = env("DJANGO_STATIC_URL", default="static/")


# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Limits

DATA_UPLOAD_MAX_MEMORY_SIZE = None

DATA_UPLOAD_MAX_NUMBER_FIELDS = None

DATA_UPLOAD_MAX_NUMBER_FILES = None


# Notifiers settings

# Telegram

NOTIFIER_TELEGRAM_BOT_TOKEN = env(
    "DJANGO_NOTIFIER_TELEGRAM_BOT_TOKEN", default=None
)

NOTIFIER_TELEGRAM_CHAT_ID = env(
    "DJANGO_NOTIFIER_TELEGRAM_CHAT_ID", default=None
)

NOTIFIER_TELEGRAM_THREAD_ID = env(
    "DJANGO_NOTIFIER_TELEGRAM_THREAD_ID", default=None
)


# Logging settings

(BASE_DIR / "logs").mkdir(exist_ok=True)

LOGGER_NAME = "fridgeflow"

LOGGER = logging.getLogger(LOGGER_NAME)

LOGGING_FILTERS = {
    "require_debug_true": {
        "()": "django.utils.log.RequireDebugTrue",
    },
    "require_debug_false": {
        "()": "django.utils.log.RequireDebugFalse",
    },
}

LOGGING_FORMATTERS = {
    "json": {
        "()": "pythonjsonlogger.jsonlogger.JsonFormatter",
        "format": ("{levelname}{asctime}{name}{pathname}{lineno}{message}"),
        "style": "{",
    },
    "text": {
        "()": "colorlog.ColoredFormatter",
        "format": (
            "{log_color}[{levelname}]{reset} "
            "{light_black}{asctime} {name} | {pathname}:{lineno}{reset}\n"
            "{bold_black}{message}{reset}"
        ),
        "log_colors": {
            "DEBUG": "bold_green",
            "INFO": "bold_cyan",
            "WARNING": "bold_yellow",
            "ERROR": "bold_red",
            "CRITICAL": "bold_purple",
        },
        "style": "{",
    },
}

LOGGING_HANDLERS = {
    "console": {
        "class": "logging.StreamHandler",
        "level": "DEBUG",
        "filters": ["require_debug_true"],
        "formatter": "text",
    },
    "rotating_file": {
        "class": "logging.handlers.TimedRotatingFileHandler",
        "level": "INFO",
        "filters": ["require_debug_false"],
        "filename": BASE_DIR / "logs" / "app.log",
        "when": "midnight",
        "utc": True,
        "interval": 1,
        "backupCount": 30,
        "formatter": "json",
    },
}

LOGGING_LOGGERS = {
    "django": {
        "handlers": ["console", "rotating_file"],
        "level": "INFO" if DEBUG else "ERROR",
        "propagate": False,
    },
    "django.request": {
        "handlers": ["console", "rotating_file"],
        "level": "INFO" if DEBUG else "ERROR",
        "propagate": False,
    },
    "django.server": {
        "handlers": ["console"],
        "level": "INFO",
        "filters": ["require_debug_true"],
        "propagate": False,
    },
    "django.template": {"handlers": []},
    "django.db.backends.schema": {"handlers": []},
    "django.security": {"handlers": [], "propagate": True},
    "django.db.backends": {
        "handlers": ["console"],
        "filters": ["require_debug_true"],
        "level": "DEBUG",
        "propagate": False,
    },
    "health-check": {
        "handlers": ["console", "rotating_file"],
        "level": "INFO" if DEBUG else "ERROR",
        "propagate": False,
    },
    LOGGER_NAME: {
        "handlers": ["console", "rotating_file"],
        "level": "DEBUG" if DEBUG else "INFO",
        "propagate": False,
    },
    "root": {
        "handlers": ["console", "rotating_file"],
        "level": "INFO" if DEBUG else "ERROR",
        "propagate": False,
    },
}

if NOTIFIER_TELEGRAM_BOT_TOKEN and NOTIFIER_TELEGRAM_CHAT_ID:
    LOGGING_HANDLERS["telegram"] = {
        "class": "config.notifiers.telegram.LoggingHandler",
        "level": "INFO",
        "filters": ["require_debug_false"],
        "token": NOTIFIER_TELEGRAM_BOT_TOKEN,
        "chat_id": NOTIFIER_TELEGRAM_CHAT_ID,
        "thread_id": NOTIFIER_TELEGRAM_THREAD_ID,
        "retries": 5,
        "delay": 2,
        "timeout": 5,
    }
    LOGGING_LOGGERS["django.request"]["handlers"].append("telegram")
    LOGGING_LOGGERS["health-check"]["handlers"].append("telegram")
    LOGGING_LOGGERS[LOGGER_NAME]["handlers"].append("telegram")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": LOGGING_FILTERS,
    "formatters": LOGGING_FORMATTERS,
    "handlers": LOGGING_HANDLERS,
    "loggers": LOGGING_LOGGERS,
}


# Security

SECURE_REFERRER_POLICY = "unsafe-url"


# debug-toolbar settings

DEBUG_TOOLBAR_CONFIG = {"SHOW_COLLAPSED": True, "UPDATE_ON_FETCH": True}

if DEBUG:
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")
