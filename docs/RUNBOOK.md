# Runbook

## Services

- Shell app: port 3000
- AI chat widget remote: port 3001
- Observability widget remote: port 3002
- Cost widget remote: port 3003

## Health Checks

Shell endpoints:
- GET /health
- GET /ready

## Local Startup

```bash
npm install
npm run build
npm run demo
```

## Container Startup

```bash
docker compose up --build
```

## Verification

```bash
curl http://localhost:3000/health
curl http://localhost:3000/ready
curl http://localhost:3001/remoteEntry.js
curl http://localhost:3002/remoteEntry.js
curl http://localhost:3003/remoteEntry.js
```

## Incident Playbook

### Symptom: widget area shows remote unavailable

1. Verify remoteEntry endpoints for 3001/3002/3003.
2. Confirm shell is loading expected remote URLs.
3. Restart affected remote service.

### Symptom: shell healthy but remotes fail after deploy

1. Check network policy/CORS between shell domain and remote domains.
2. Verify version compatibility of shared singleton deps (`react`, `react-dom`, `@mfe/widget-core`).

## Release Checklist

- Build and tests green
- Container smoke green
- Tag release (`vX.Y.Z`)
- Push tag to trigger publish workflow
