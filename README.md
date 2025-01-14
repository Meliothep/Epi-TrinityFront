# Trinity Frontend 🚀

A modern SolidJS application built with Vite.

## Table of Contents 📑
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Quick Start](#quick-start)
  - [Local Development](#local-development)
  - [Docker Development](#docker-development)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## Prerequisites 📋

### Local Development
- Node.js 20.x or later
- pnpm (recommended) or npm
- Git

### Docker Development
- Docker
- Docker Compose

## Getting Started 🎯

First, clone the repository:
```bash
git clone <repository-url>
cd trinity-frontend
```

### Quick Start 🚀

#### Windows
```bash
.\dev.bat
```

#### Unix/MacOS
```bash
chmod +x dev.sh  # First time only
./dev.sh
```

### Local Development 💻

1. Install dependencies:
```bash
pnpm install
```

2. Copy the environment template:
```bash
cp .env.template .env
```

3. Start the development server:
```bash
pnpm dev
```

Your app will be available at `http://localhost:3000`

### Docker Development 🐳

1. Copy the environment template:
```bash
cp .env.template .env
```

2. Start the development container:
```bash
docker compose up app-dev
```

Your app will be available at `http://localhost:3000` with hot reload enabled.

## Production Deployment 🚀

### Local Build
```bash
pnpm build
pnpm serve  # To preview the production build
```

### Docker Production
```bash
docker compose up app-prod
```

The production build will be available at `http://localhost:80`

## Environment Variables 🔧

Copy `.env.template` to create your `.env` file:

| Variable      | Description      | Default     |
| ------------- | ---------------- | ----------- |
| VITE_APP_PORT | Application port | 3000        |
| VITE_APP_HOST | Application host | 0.0.0.0     |
| NODE_ENV      | Environment mode | development |

## Available Scripts 📜

| Command      | Description                     |
| ------------ | ------------------------------- |
| `pnpm dev`   | Start development server        |
| `pnpm build` | Build for production            |
| `pnpm serve` | Preview production build        |
| `pnpm test`  | Run tests                       |
| `dev.bat`    | Start dev environment (Windows) |
| `dev.sh`     | Start dev environment (Unix)    |

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
