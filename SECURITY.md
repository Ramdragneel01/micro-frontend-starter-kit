# Security Policy

## Reporting

Please report security issues privately to:

- ramprakashdhulipudi@gmail.com

Do not open public issues for vulnerabilities.

## Threat Model (v0.1)

In scope:
- runtime remote unavailability and fallback behavior
- cross-origin remote loading in local/dev environments
- dependency-chain vulnerabilities in frontend build stack

Out of scope:
- authentication/authorization implementation
- tenant/session isolation
- CSP hardening beyond baseline examples

## Baseline Controls

- Shell has explicit fallback UI for unavailable remotes.
- Dev servers set CORS headers only for local federation.
- CI runs deterministic build and test suite on every PR.

## Hardening Recommendations

- Front shell with strict CSP and subresource integrity where possible.
- Pin remote URLs to trusted domains in production.
- Add dependency and container image scanning in CI.
- Consider remote signature validation for enterprise deployments.
