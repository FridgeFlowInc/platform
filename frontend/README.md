# FridgeFlow Frontend

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or higher)
- npm
- Docker (for containerized setup)

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

### Build docker image

```bash
docker build -t fridgeflow-frontend .
```

### Run docker image

```bash
docker run -p 5000:80 fridgeflow-frontend
```

Frontend will be available on localhost:5000
