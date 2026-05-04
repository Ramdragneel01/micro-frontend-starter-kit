# Architecture

## Objective

Provide a production-first micro-frontend baseline using Webpack 5 Module Federation with clear local DX and deployment paths.

## Topology

- `shell` consumes three remotes at runtime:
  - `aiChatWidget`
  - `observabilityWidget`
  - `costWidget`
- Shared package `@mfe/widget-core` provides reusable business functions.

## Diagram

Mermaid source is in `docs/assets/architecture.mmd`.

## Build Strategy

- Each app has an isolated Webpack config and output folder under `dist/`.
- Root scripts orchestrate all app builds.
- Module Federation shares singleton instances of:
  - `react`
  - `react-dom`
  - `@mfe/widget-core`

## Runtime Strategy

- Development mode runs four dev servers concurrently.
- Production mode serves shell + each remote as independent static services.
- Shell exposes `/health` and `/ready` for ops integration.

## Testing Strategy

- Unit-level tests for `@mfe/widget-core`.
- Component-level tests for all three remotes.
- CI builds all apps and runs coverage.

## Design Decisions

- Keep remotes standalone-runnable for independent debugging.
- Keep shell resilient: if a remote is down, fallback UI is shown.
- Keep shared logic in package form to avoid copy/paste drift.
