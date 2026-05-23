# Security And Risk

Status: Initialized

## Sensitive Areas

- Production routing and domain connection (`lamentis.de`) are high-impact surfaces.
- Frontend runtime config in environment variables is not yet present.

## Secrets And Credentials

- No checked-in secrets were detected in the scaffold files.
- Do not commit `.env*` files or API keys.

## High-Risk Changes

- Adding deployment secrets, analytics keys, forms, or auth flows requires review.
- Domain/dns changes in Vercel should be validated before any live release.

## Human Review Required

- Human review required before:
  - attaching custom domain records,
  - exposing credentials (tokens, payment keys, auth clients),
  - changing route/proxy behavior for user data.

## Evidence

- `AGENTS.md`
- `.naomeignore`
- `.naome/manifest.json`
- `frontend/package.json`
- `node .naome/bin/check-harness-health.js`

## Evidence Requirements

- Claims about credentialed automation, agent instruction files, generated artifacts, or harness files require exact local evidence paths.
- Claims must not cite paths matching `.naomeignore`.

## NAOME Ignore Boundary

`.naomeignore` defines repository paths excluded from active context:
`/.naome/archive/`, `/.naome/cache/`, `/.naome/tasks/`.

## Harness Integrity Boundary

Machine-owned files in `.naome/manifest.json` are active harness controls.
Before feature work, run `node .naome/bin/check-harness-health.js` and keep it passing.

## Agent Rules

- Do not expose secrets.
- Do not inspect ignored paths.
- Do not weaken auth, authorization, billing, retention, or encryption without explicit user direction.
