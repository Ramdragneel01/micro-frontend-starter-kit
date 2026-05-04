# micro-frontend-starter-kit

Production-ready Webpack 5 Module Federation starter kit with one shell and three AI widgets.

- Shell app: runtime composition host
- Remote 1: AI chat helper widget
- Remote 2: Observability status widget
- Remote 3: Cost estimation widget

[![CI](https://github.com/Ramdragneel01/micro-frontend-starter-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/Ramdragneel01/micro-frontend-starter-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Why

Most micro-frontend templates stop at federation wiring and skip production concerns. This starter kit includes:

- deterministic build for shell + all remotes
- shared runtime package for common widget logic
- frontend tests for each widget
- Docker + Compose setup
- CI with build/test/coverage/container smoke
- ops endpoints for the shell (`/health`, `/ready`)

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) and [docs/assets/architecture.mmd](docs/assets/architecture.mmd).

## Quick Start

```bash
npm install
npm run dev
```

Open:

- Shell: http://localhost:3000
- AI chat widget (standalone): http://localhost:3001
- Observability widget (standalone): http://localhost:3002
- Cost widget (standalone): http://localhost:3003

One-command demo from production build:

```bash
npm run build
npm run demo
```

## Project Structure

```text
apps/
  shell/
  ai-chat-widget/
  observability-widget/
  cost-widget/
packages/
  widget-core/
docs/
  assets/
tests/
```

## Scripts

- `npm run dev` start shell + all remotes in development
- `npm run build` build all applications into `dist/`
- `npm run demo` serve production artifacts for shell + remotes
- `npm run test` run Vitest suite
- `npm run test:coverage` run tests with coverage

## Docker

```bash
docker compose up --build
```

Services:
- shell: http://localhost:3000
- ai-chat-widget: http://localhost:3001
- observability-widget: http://localhost:3002
- cost-widget: http://localhost:3003

## Testing

```bash
npm run test
npm run test:coverage
```

Current baseline: 10 passing tests.

## Security

See [SECURITY.md](SECURITY.md).

## Operations

See [docs/RUNBOOK.md](docs/RUNBOOK.md).

## Roadmap

- Add runtime registry service for dynamic remote discovery
- Add design-token package shared across all remotes
- Add consumer contract tests for remote APIs
- Add canary deployment blueprint for independent remote releases

## License

MIT
