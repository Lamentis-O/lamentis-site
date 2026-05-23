# Testing And Verification

Status: Ready

## Verification Map

| Change type | Required proof | Command | Notes |
|---|---|---|---|
| NAOME baseline | Built-in harness proof | `node .naome/bin/check-harness-health.js`; `node .naome/bin/check-task-state.js` | Project-level harness and task-state checks. |
| Frontend source changes | `npm run lint`, `npm run build` | `cd frontend && npm run lint`; `cd frontend && npm run build` | Includes `frontend/app/**`, `frontend/components/**`, `frontend/public/**`, and frontend config files. |
| Frontend source changes | `npm run test` | `cd frontend && npm run test` | Unit tests for key frontend behavior checks. |
| Frontend documentation/config | NAOME quality gates | `node .naome/bin/naome.js quality check --changed`; `node .naome/bin/naome.js semantic check --changed`; `node .naome/bin/naome.js arch validate --changed-only`; `git diff --check` | Architecture checks are driven by this repository's custom `naome.arch.yaml`. |
| SwiftUI checks | NAOME UI check | `node .naome/bin/naome.js ui check --changed --json` | Not applicable for this frontend. |

## Early Feedback

After writing or heavily editing a file, run:

- `cd frontend && npm run lint`
- `node .naome/bin/naome.js quality check --path <path>`

Both are useful before finalizing larger diffs.

## Known Checks

| Check id | Command | Cwd | Cost | Last verified |
|---|---|---|---|---|
| diff-check | `git diff --check` | `.` | fast | 2026-05-23 |
| naome-harness-health | `node .naome/bin/check-harness-health.js` | `.` | fast | 2026-05-23 |
| naome-task-state | `node .naome/bin/check-task-state.js` | `.` | fast | 2026-05-23 |
| repository-quality-check | `node .naome/bin/naome.js quality check --changed` | `.` | fast | 2026-05-23 |
| repository-semantic-check | `node .naome/bin/naome.js semantic check --changed` | `.` | fast | 2026-05-23 |
| repository-frontend-lint | `cd frontend && npm run lint` | `.` | medium | 2026-05-23 |
| repository-frontend-build | `cd frontend && npm run build` | `.` | medium | 2026-05-23 |
| repository-frontend-test-unit | `cd frontend && npm run test` | `.` | fast | 2026-05-23 |
| ui-style-check | `node .naome/bin/naome.js ui check --changed --json` | `.` | fast | 2026-05-23 |
| architecture-fitness-check | `node .naome/bin/naome.js arch validate --changed-only` | `.` | fast | 2026-05-23 |

## Verification Phases

Run checks in `.naome/verification.json` phase order:
`shape-health`, `quality`, `focused`, `diff-check`.

## Change Type Rules

| Change type | Paths | Required checks |
|---|---|---|
| architecture-policy | `naome.arch.yaml` | architecture-fitness-check, repository-quality-check, repository-semantic-check, diff-check |
| frontend-source | `frontend/app/**`, `frontend/public/**`, `frontend/package.json` | repository-frontend-lint, repository-frontend-build, repository-frontend-test-unit, repository-quality-check, repository-semantic-check, diff-check |
| docs | `docs/**`, `README.md` | repository-quality-check, repository-semantic-check, diff-check |

## Release Gates

| Check id | Required when |
|---|---|
| architecture-fitness-check | Before release for policy/structure changes. |
| repository-frontend-build | Before release for any front-end behavior change. |
| repository-frontend-lint | Before release for front-end changes. |
| repository-frontend-test-unit | Before release for front-end source or config changes. |

## Evidence

- `.naome/verification.json`
- `.naome/bin/check-harness-health.js`
- `.naome/bin/check-task-state.js`
- `.naome/bin/naome.js`
- `frontend/package.json`
- `.naome/repository-quality.json`
- `.naome/repository-quality-baseline.json`
- `.naome/repository-structure.json`
- `cd frontend && npm run build`
- `cd frontend && npm run lint`
- `cd frontend && npm run test`
- `node .naome/bin/naome.js arch validate --changed-only`

## Rules

- Keep `.naome/verification.json` as source of durable checks and change-type policy.
- Use only commands proven by repository evidence or user confirmation.
- Use command output date stamps (`YYYY-MM-DD`) where evidence is listed.
- Before completion, select proof from this map and include exact commands/results.
