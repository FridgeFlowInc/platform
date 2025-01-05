# Stage 1: Install dependencies
FROM python:3.11-alpine3.20 AS builder

# Install uv
COPY --from=ghcr.io/astral-sh/uv:0.4.30 /uv /uvx /bin/

# Set the working directory
WORKDIR /app

# Setup env vars
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONOPTIMIZE=2 \
    UV_COMPILE_BYTECODE=1 \
    UV_PROJECT_ENVIRONMENT=/opt/venv

# Copy project files
COPY pyproject.toml .

# Install dependencies
RUN uv sync --no-dev --no-install-project --no-cache


# Stage 2: Serve the application
FROM python:3.11-alpine3.20

# Set the working directory
WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

# Copy application code
COPY . .

# Copy docker env file
COPY ./.env.docker ./.env

# Create app user
RUN adduser -D -g '' app

# Create logs directory and set permissions
RUN mkdir -p ./logs && chown -R app:app ./logs

# Run as non-root user
USER app

# Setup env vars
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONOPTIMIZE=2 \
    PATH="/opt/venv/bin:$PATH"

# Expose port
EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/api/health/ || exit 1

# Start gunicorn
CMD ["gunicorn", "config.wsgi", "-b", "0.0.0.0:8080"]
