# FridgeFlow Backend

## Prerequisites

Ensure you have the following installed on your system:

- Python (>=3.10,<3.12)
- uv
- Docker (for containerized setup)

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

###### Apply migrations

```bash
uv run python manage.py migrate
```

###### Start project

```bash
uv run python manage.py runserver
```

##### In prod mode

###### Apply migrations

```bash
uv run python manage.py migrate
```

###### Start project

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

### Customize enviroment

```bash
cp .env.docker.template .env.docker
```

And setup env vars according to your needs.

### Build docker image

```bash
docker build -t fridgeflow-backend .
```

### Run docker image

```bash
docker run -p 8080:8080 --name fridgeflow-backend fridgeflow-backend
```

Backend will be available on localhost:8080
