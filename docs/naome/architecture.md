# Architecture

Status: Initialized

## Observed Structure

- `frontend/` is the application package root.
- Source currently lives under `frontend/app/**` and reusable UI primitives are in
  `frontend/components/**`, starting with:
  - `frontend/app/layout.tsx`
  - `frontend/app/page.tsx`
  - `frontend/components/site/production-state-panel.tsx`
- NAOME and repository policy remain in `.naome/` and `docs/naome/`.
- Custom architecture policy exists in `naome.arch.yaml`, scoped to the frontend package and `frontend` config files.

## Known Boundaries

- `.naome` and `docs/naome` are NAOME harness/project-policy files.
- `frontend/.next` and `frontend/node_modules` are build/dependency artifacts and not committed.
- `.naome/archive/`, `.naome/cache/` and `.naome/tasks/` are ignored by `.naomeignore`.

## Assumed Boundaries

- Frontend module is currently single-package (`frontend`), no backend module detected yet.
- No additional bounded context (API/service layer, CMS, etc.) exists yet.

## Dependency Rules

- Frontend stack dependencies are in `frontend/package.json`.
- No cross-module dependency graph is inferred beyond one Next.js package.

## Generated Or External Code

- `.naome` tasks/checks and build artifacts are generated/runtime-local and should remain reproducible from durable state.

## Evidence

- `naome.arch.yaml`
- `frontend/next-env.d.ts`
- `frontend/package.json`
- `frontend/app/page.tsx`
- `.naome/manifest.json`
- `node .naome/bin/naome.js arch validate --changed-only --json` (pass, warnings: 0)

## Current Fitness Status

- `node .naome/bin/naome.js arch validate --changed-only --json`:
  - Status `pass`
  - `warnings: 0`, `errors: 0`

  Warning suppression note:
  - Added `frontend/package-lock.json` and `.naome/architecture-graph.json` to root `.gitignore`, so they are treated as generated local artifacts and no longer reported in validation.

## Evidence Requirements

- Claims about generated artifacts, harness files, skill directories, or automation policy require exact local evidence paths.

## Open Architecture Questions

- If a backend/API package is added later, do we want a top-level split (`/frontend`, `/api`) or a monorepo structure?
