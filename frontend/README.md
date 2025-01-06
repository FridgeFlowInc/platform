# FridgeFlow Frontend

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
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
npm install --only=dev
```

##### For prod enviroment

```bash
npm install
```

#### Running

##### In dev mode

```bash
npm run dev
```

##### In prod mode

###### Build project first

```bash
npm run build
```

###### Start project

```bash
npm run start
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

```bash
cp .env.docker.template .env.docker
```

And setup env vars according to your needs.

### Build docker image

```bash
docker build -t fridgeflow-frontend .
```

### Run docker image

```bash
docker run -p 5000:80 --name fridgeflow-frontend fridgeflow-frontend
```

Frontend will be available on localhost:5000

### Notes

Image from public registry uses [.env.docker.template](/frontend/.env.docker.template) as default env vars, if you want to provide custom just override them when using `docker run` command.
