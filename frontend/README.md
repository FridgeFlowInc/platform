# FridgeFlow Frontend

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for containerized setup)

## Basic setup

### Installation

#### Clone the project

```bash
git clone https://github.com/FridgeFlowInc/platform.git
```

#### Go to the project directory

```bash
cd platform/frontend
```

#### Customize enviroment

```bash
cp .env.template .env
```

And setup env vars according to your needs.

#### Install dependencies

##### For dev enviroment

```bash
pnpm install
```

##### For prod enviroment

```bash
pnpm install --prod
```

#### Running

##### In dev mode

```bash
pnpm run dev
```

##### In prod mode

###### Build project first

```bash
pnpm run build
```

###### Start project

```bash
pnpm run start
```

## Containerized setup

### Clone the project

```bash
git clone https://github.com/FridgeFlowInc/platform.git
```

### Go to the project directory

```bash
cd platform/frontend
```

### Customize enviroment

Customize enviroment with `docker run` command (or bind .env file to container), for all enviroment vars see [.env.template](/frontend/.env.template)

### Build docker image

```bash
docker build -t fridgeflow-frontend .
```

### Run docker image

```bash
docker run -p 5000:80 --name fridgeflow-frontend fridgeflow-frontend
```

Frontend will be available on localhost:5000
