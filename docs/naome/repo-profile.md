# Repository Profile

Status: Initialized

## Purpose

- Frontend website for `lamentis.de` hosted as a Next.js app.
- Primary stack is set up in `/frontend` (Next.js app router with TypeScript and Tailwind).

## Stack

- Framework: Next.js (`frontend/package.json`)
- Language: TypeScript (`frontend/app`, `frontend/next.config.ts`)
- Style: Tailwind CSS + PostCSS config in `frontend`
- Package manager: npm
- Root package manager evidence only in `frontend/` (repository root remains the harness workspace).

## Project Layout

- `frontend/` (app source, config, scripts, lockfile)
- `.naome/` (NAOME harness/control files)
- `.naomeignore` (read boundary)
- `docs/naome/` (harness workflow and policies)
- `AGENTS.md` (root policy)

## Package And Tooling

- Package manager: npm
- Build command: `cd frontend && npm run build`
- Dev command: `cd frontend && npm run dev`
- Test command: none defined (feature-page tests not added yet)
- Lint command: `cd frontend && npm run lint`
- Typecheck command: implicit via `npm run build`
- Repo verification commands: `node .naome/bin/check-harness-health.js`, `node .naome/bin/check-task-state.js`,
  `node .naome/bin/naome.js quality check --changed`, `node .naome/bin/naome.js semantic check --changed`.

## CI And Deployment

- Deployment target: Vercel (manual setup pending: project link + domain assignment).
- Production domain target: `lamentis.de`

## Existing Instructions

- `AGENTS.md`
- `.naomeignore`
- `.naome/manifest.json`
- `docs/naome/index.md`
- `docs/naome/execution.md`
- `docs/naome/first-run.md`
- `.naome/repository-model.json`

## Nested Agent Instructions

- No nested `AGENTS.md` was kept after setup.

## Evidence

- `frontend/package.json`
- `frontend/next.config.ts`
- `frontend/app/page.tsx`
- `frontend/tailwind`
- `AGENTS.md`
- `.naomeignore`
- `.naome/manifest.json`
- `.naome/repository-model.json`
- `git remote -v`

## Evidence Requirements

- Claims about agent instructions, skill directories, generated artifacts, harness files, or automation policy require exact local evidence paths.

## Open Questions

- None blocking: `lamentis.de` deployment target and domain were confirmed by user.
