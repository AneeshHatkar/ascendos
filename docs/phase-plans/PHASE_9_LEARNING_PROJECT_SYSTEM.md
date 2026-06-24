# Phase 9 — Learning / Project System Plan

Status: Locked working plan after Chunk A inspection.

Phase: 9

System: Learning / Project System

Execution model:

- 28 requirement steps remain the official checklist.
- 12 execution chunks are used for safer commits.
- Every chunk must be verified before commit.
- Every chunk must preserve prior phases.
- No step is considered complete until implemented, verified, committed, pushed when required, and documented.

## Phase 9 purpose

Phase 9 builds the Learning / Project System foundation.

It connects learning, projects, proof, goals, tasks, timeline, career, resume evidence, research readiness, and later knowledge/memory systems.

Phase 9 turns learning into proof.

Phase 9 turns projects into structured evidence.

Phase 9 prepares Carnos to later reason about skill gaps, project progress, proof, and next actions without bypassing confirmation.

## Core Phase 9 promise

study -> skill -> project -> proof -> resume -> career -> research -> knowledge -> analytics -> Carnos next action

## Phase 9 source-of-truth scope

Phase 9 includes:

- Learning academy
- Skill trees
- Skill prerequisites
- Quizzes
- Learning sessions
- Project builder
- Bug logs
- Tests
- Releases
- README proof
- Portfolio proof
- Resume proof
- Goal linkage
- Task linkage
- Timeline linkage
- Proof linkage
- Knowledge alignment

## Canonical routes

Phase 9 touches:

- `/learning`
- `/projects`
- `/knowledge`

## Non-goals

Phase 9 must not implement:

- full memory/RAG
- embeddings
- semantic search
- internet/web tools
- voice
- autonomous Carnos execution
- direct SQL writes from dashboards
- background jobs
- full GitHub API sync
- full resume auto-generation
- full AI-generated course engine

## Safety boundaries

Phase 9 must preserve:

- SQL-backed durable state
- user-owned data
- RLS expectation
- authenticated/protected route boundaries
- no client-side direct SQL mutation
- no Python/ML SQL mutation
- no hidden writes
- no fake persistence
- proposed-action visibility without execution unless explicitly wired through safe write flow
- timeline/proof/audit compatibility
- loading/empty/error/privacy states

## 28 requirement steps

| Step | Name | Requirement |
|---:|---|---|
| 9.1 | Source-of-truth inspection | Re-check FINAL_SYNCED DOCX/JSON and repo so Phase 9 is grounded. |
| 9.2 | Phase 9 plan lock | Create official Phase 9 plan with scope, rules, risks, non-goals, and completion criteria. |
| 9.3 | Current route inspection | Inspect `/learning`, `/projects`, `/knowledge`, dashboards, SQL, helpers, and audits. |
| 9.4 | Learning/project schema design | Design SQL for learning tracks, skills, sessions, quizzes, projects, milestones, bugs, releases, and proof links. |
| 9.5 | Source-to-scope traceability matrix | Map Phase 9 DOCX/JSON requirements to implementation files so nothing important is missed. |
| 9.6 | SQL migration | Add Supabase migration for Phase 9 learning/project tables. |
| 9.7 | Database types update | Update `src/types/database.ts` for new Phase 9 tables. |
| 9.8 | Learning read helpers | Add read-only helpers for learning tracks, skills, progress, sessions, and quizzes. |
| 9.9 | Project read helpers | Add read-only helpers for projects, milestones, build logs, bugs, tests, and releases. |
| 9.10 | Aggregation helpers | Summarize learning progress, weak skills, active projects, next sessions, and proof readiness. |
| 9.11 | Dashboard registry extension | Add Learning and Project dashboard cards to the shared dashboard card registry. |
| 9.12 | Shared UI primitives | Build reusable UI for skill status, proof gates, project status, milestones, sessions, bugs, and releases. |
| 9.13 | Learning Academy dashboard v1 | Build the main Learning Academy dashboard. |
| 9.14 | Wire `/learning` | Replace `/learning` with the authenticated Learning dashboard. |
| 9.15 | Project Builder dashboard v1 | Build the main Project Builder dashboard. |
| 9.16 | Wire `/projects` | Replace `/projects` with the authenticated Projects dashboard. |
| 9.17 | Knowledge route alignment | Align `/knowledge` with Phase 9 without starting full RAG early. |
| 9.18 | Skill path/progress view | Show skill trees, prerequisites, progress, weak skills, and proof gates. |
| 9.19 | Quiz/session view | Show sessions, quizzes, study logs, and practice history. |
| 9.20 | Project build-log view | Show milestones, bugs, tests, releases, GitHub links, deployment links, and build history. |
| 9.21 | README/resume/proof linkage | Connect projects to README proof, portfolio proof, resume bullets, and skill evidence. |
| 9.22 | Goal/task/timeline linkage | Connect learning/project records to goals, tasks, proof items, and timeline entries. |
| 9.23 | Proposed-action visibility | Show what Carnos could propose without executing anything. |
| 9.24 | Empty/loading/error/privacy states | Add safe states for no data, loading, read errors, and private read-only boundaries. |
| 9.25 | Cross-links | Link Learning, Projects, Career, Research, and Knowledge cleanly. |
| 9.26 | Phase 9 no-write/privacy audit | Add audit checks proving Phase 9 dashboards do not directly mutate SQL or bypass confirmation. |
| 9.27 | Phase 9 audit gate + smoke checklist | Add `audit:phase9`, integration checks, and manual browser QA checklist. |
| 9.28 | Completion report + closeout | Add final report, run full checks, commit, push, and mark Phase 9 complete. |

## 12 execution chunks

| Chunk | Steps | Purpose | Commit Boundary |
|---|---|---|---|
| A | 9.1-9.3 | Source inspection, route inspection, plan lock | Yes |
| B | 9.4-9.5 | Schema design and source-to-scope traceability | Yes |
| C | 9.6 | SQL migration | Yes |
| D | 9.7 | Database types | Yes |
| E | 9.8-9.9 | Learning/project read helpers | Yes |
| F | 9.10-9.12 | Aggregation, registry, shared UI primitives | Yes |
| G | 9.13-9.14 | Learning dashboard and `/learning` route | Yes |
| H | 9.15-9.16 | Project dashboard and `/projects` route | Yes |
| I | 9.17 | `/knowledge` route alignment | Yes |
| J | 9.18-9.20 | Skill/session/project detail panels | Yes |
| K | 9.21-9.25 | Cross-domain linkage, proposed actions, state boundaries, cross-links | Yes |
| L | 9.26-9.28 | Audit, smoke checklist, completion report, closeout | Yes |

## Why some steps stay isolated

The following steps stay isolated because they can break broad system behavior:

- 9.6 SQL migration
- 9.7 database types
- 9.17 Knowledge route alignment

## Chunk A expected files

Chunk A creates or updates:

- `docs/phase-plans/PHASE_9_LEARNING_PROJECT_SYSTEM.md`
- `docs/phase-reports/PHASE_9_CHUNK_A_SOURCE_ROUTE_INSPECTION.md`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`

Chunk A must not modify app source files.

## Chunk A completion criteria

Chunk A is complete when:

- inspection report exists
- phase plan exists
- all 28 steps are listed
- all 12 chunks are listed
- canonical routes are documented
- non-goals are documented
- safety boundaries are documented
- project logs are updated
- `npm run check` passes
- `npx tsc --noEmit` passes
- `npm run lint` passes
- `git diff --check` passes
- expected files only are changed
- Chunk A is committed and pushed

## Phase 9 final completion criteria

Phase 9 is complete only when:

- all 28 steps are implemented or explicitly documented as deferred/non-goal
- all 12 chunks are complete
- SQL migration exists and passes validation
- database types align with migration
- read helpers exist
- dashboards are wired
- `/learning`, `/projects`, and `/knowledge` are aligned
- proof/timeline/goal/task/career links exist where required
- no-write/privacy audit passes
- integration audit passes
- manual smoke checklist exists
- completion report exists
- full checks pass
- closeout commit is pushed

