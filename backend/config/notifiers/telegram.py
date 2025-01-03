import datetime
import logging
import threading
import time
import traceback

import requests
from django.utils.timezone import get_current_timezone

LEVEL_EMOJIS = {
    "DEBUG": "🐞",
    "INFO": "ℹ️",  # noqa: RUF001
    "WARNING": "⚠️",
    "ERROR": "❌",
    "CRITICAL": "🚨",
}


class LoggingHandler(logging.Handler):
    def __init__(
        self, token, chat_id, thread_id=None, retries=3, delay=2, timeout=5
    ):
        super().__init__()

        self.token = token
        self.chat_id = chat_id
        self.thread_id = thread_id
        self.retries = retries
        self.delay = delay
        self.timeout = timeout
        self.api_url = f"https://api.telegram.org/bot{self.token}/sendMessage"

        self.template = (
            "<b>{levelname}</b>\n"
            "\t<b>Timestamp:</b> <code>{asctime}</code>\n"
            "\t<b>Logger:</b> <code>{name}</code>\n"
            "\t<b>File:</b> <code>{pathname}</code> "
            "(Line: <code>{lineno}</code>)\n\n"
            '<pre><code class="language-message">{message}</code></pre>\n'
        )

    def emit(self, record):
        threading.Thread(target=self._send_message, args=(record,)).start()

    def _send_message(self, record):
        log_entry = self.format(record)

        payload = {
            "chat_id": self.chat_id,
            "text": log_entry,
            "parse_mode": "HTML",
        }
        if self.thread_id:
            payload["reply_to_message_id"] = self.thread_id

        for attempt in range(1, self.retries + 1):
            try:
                response = requests.post(
                    self.api_url, data=payload, timeout=self.timeout
                )
                response.raise_for_status()
            except requests.exceptions.RequestException as e:  # noqa: PERF203
                if attempt == self.retries:
                    fallback_logger = logging.getLogger("telegram_fallback")
                    fallback_logger.exception(
                        (
                            "Failed to send message to Telegram after "
                            "%d attempts: %s"
                        ),
                        self.retries,
                        e,  # noqa: TRY401
                    )
                else:
                    time.sleep(self.delay)
            else:
                return

    def format(self, record):
        try:
            asctime = datetime.datetime.fromtimestamp(
                record.created, tz=get_current_timezone()
            ).strftime("%Y-%m-%d %H:%M:%S %Z")
            level_emoji = LEVEL_EMOJIS.get(record.levelname, "")

            formatted_string = self.template.format(
                levelname=f"{level_emoji} {record.levelname}",
                asctime=asctime,
                name=record.name,
                pathname=record.pathname,
                lineno=record.lineno,
                message=record.getMessage(),
            )

            if record.exc_info:
                exc_text = "".join(
                    traceback.format_exception(*record.exc_info)
                )
                formatted_string += (
                    "\n<pre><code class='language-traceback'>"
                    f"{exc_text}</code></pre>"
                )

            formatted_string += (
                f"\n#{record.levelname.lower()} "
                f"#{record.name.replace('.', '_')}"
            )
        except Exception as format_error:  # noqa: BLE001
            return f"Error formatting log record: {format_error}"
        else:
            return formatted_string
