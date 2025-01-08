# FridgeFlow Backend

## Prerequisites

Ensure you have the following installed on your system:

- [Python](https://www.python.org/) (>=3.10,<3.12)
- [uv](https://docs.astral.sh/uv/)
- [Docker](https://www.docker.com/) (for containerized setup)

## Basic setup

### Installation

#### Clone the project

```bash
git clone https://github.com/FridgeFlowInc/platform.git
```

#### Go to the project directory

```bash
cd platform/backend
```

#### Customize enviroment

```bash
cp .env.template .env
```

And setup env vars according to your needs.

#### Install dependencies

##### For dev enviroment

```bash
uv sync --all-extras
```

##### For prod enviroment

```bash
uv sync --no-dev
```

#### Running

##### In dev mode

Apply migrations:

```bash
uv run python manage.py migrate
```

Start project:

```bash
uv run python manage.py runserver
```

##### In prod mode

Apply migrations:

```bash
uv run python manage.py migrate
```

Start project:

```bash
uv run gunicorn config.wsgi
```

## Containerized setup

### Clone the project

```bash
git clone https://github.com/FridgeFlowInc/platform.git
```

### Go to the project directory

```bash
cd platform/backend
```

### Build docker image

```bash
docker build -t fridgeflow-backend .
```

### Customize enviroment

Customize enviroment with `docker run` command (or bind .env file to container), for all enviroment vars and default values see [.env.template](/backend/.env.template).

### Run docker image

```bash
docker run -p 8080:8080 --name fridgeflow-backend fridgeflow-backend
```

Backend will be available on localhost:8080.

### Notes

You can use [image](https://github.com/FridgeFlowInc/platform/pkgs/container/platform%2Fbackend) from github registry.
