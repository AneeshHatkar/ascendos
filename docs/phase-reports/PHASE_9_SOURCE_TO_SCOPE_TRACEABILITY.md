# Phase 9 — Source-to-Scope Traceability Matrix

Status: Traceability matrix for Phase 9 Chunk B.

Phase: 9 — Learning / Project System

Chunk: B

Covers:
- 9.4 Learning/project schema design
- 9.5 Source-to-scope traceability matrix

## Purpose

This document maps Phase 9 source-of-truth requirements to implementation scope so no required Phase 9 feature disappears during grouped execution.

## Source files inspected

- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`
- `docs/phase-plans/PHASE_9_LEARNING_PROJECT_SYSTEM.md`
- `docs/phase-reports/PHASE_9_CHUNK_A_SOURCE_ROUTE_INSPECTION.md`
- `docs/database/PHASE_9_LEARNING_PROJECT_SCHEMA_DESIGN.md`

## Traceability table

| Source Requirement | Phase 9 Scope | Planned Implementation | Chunk |
|---|---|---|---|
| Learning Academy | Learning dashboard and SQL-backed learning records | `/learning`, `skill_paths`, `skills`, `learning_sessions`, quizzes, progress helpers | C, D, E, F, G, J |
| Skill trees | Skill hierarchy and prerequisites | `skill_paths`, `skills`, `skill_prerequisites`, skill progress panels | C, D, E, J |
| Prerequisites | Skill dependency graph | `skill_prerequisites` table and skill path/progress UI | C, D, E, J |
| Explanations | Learning context and notes | `skills.description`, `learning_sessions.notes`, dashboard explanatory panels | C, E, G, J |
| Practice | Sessions and quiz attempts | `learning_sessions`, `quizzes`, `quiz_attempts` | C, D, E, J |
| Build tasks | Project-linked tasks and milestones | existing `tasks` link, `projects`, `project_milestones` | C, E, H, J, K |
| Proof gates | Evidence that learning/project work is real | `proof_item_id` links across skills, sessions, quiz attempts, projects, tests, releases | C, E, J, K |
| Quizzes | Skill checks and assessment | `quizzes`, `quiz_attempts` | C, D, E, J |
| Confidence | Confidence/mastery scores | `skills.confidence_score`, `skill_progress.confidence_score`, attempts and dashboard summaries | C, E, F, J |
| Mastery state | Skill readiness | `skills.status`, `mastery_score`, `skill_progress` | C, E, F, J |
| Project Builder | Structured project system | `/projects`, `projects`, milestones, bugs, tests, releases, links | C, D, E, H, J |
| Bugs | Project issue tracking | `project_bugs` | C, D, E, J |
| Tests | Project QA/proof checks | `project_tests` | C, D, E, J |
| Releases | Shipped project checkpoints | `project_releases` | C, D, E, J |
| README proof | External project evidence | `project_links`, `readme_url`, `proof_item_id` | C, H, K |
| Portfolio proof | Public/demo project evidence | `portfolio_url`, `demo_url`, `project_links`, `proof_item_id` | C, H, K |
| Resume proof | Project-to-resume linkage | `resume_bullet_id`, `proof_item_id` | C, H, K |
| Career connection | Projects/skills support job readiness | links to resume bullets, career dashboard cross-links, proof summaries | K |
| Interview connection | Skills/quiz/project proof supports prep | skill relevance fields, quiz attempts, project evidence | F, G, J, K |
| Research connection | Skills/projects support research readiness | research relevance fields and later research phase links | F, K |
| Goal connection | Learning/project work supports goals | `goal_id` links | C, E, K |
| Task connection | Learning/project work creates actionable work | existing `tasks` via `task_id` links | C, E, K |
| Timeline connection | Progress should be visible historically | use existing timeline/event linkage patterns in later safe write steps | K |
| Knowledge alignment | Learning/projects feed future knowledge vault | `/knowledge` alignment without full RAG | I |
| Safe write rule | No direct mutation from dashboards | proposed-action visibility only, no-write audit | K, L |
| Privacy/read boundary | Protected user data | RLS, protected routes, read-only dashboards, privacy states | C, G, H, I, K, L |

## Deferred or explicitly out of scope for Phase 9

| Item | Reason Deferred |
|---|---|
| Full RAG | Belongs to Memory / RAG / Knowledge Vault phase |
| Embeddings/vector search | Belongs to Memory / RAG / Knowledge Vault phase |
| Internet research tools | Belongs to Internet / Web Tools phase |
| Voice logging | Belongs to Voice phase |
| Autonomous Carnos execution | Violates safe-write boundary unless later confirmed flow exists |
| GitHub API sync | External integration; not needed for Phase 9 foundation |
| Automatic resume generation | Belongs to career/AI later expansion, not Phase 9 foundation |
| Background workers | Later infrastructure concern |
| Python/ML SQL mutation | Always forbidden |

## Implementation file map

| Implementation Area | Expected Files |
|---|---|
| Schema design | `docs/database/PHASE_9_LEARNING_PROJECT_SCHEMA_DESIGN.md` |
| SQL migration | `supabase/migrations/0008_learning_project_system_foundation.sql` |
| Database types | `src/types/database.ts` |
| Read helpers | `src/lib/repositories/core-read.ts` or a source-aligned repository module |
| Dashboard aggregation | `src/lib/dashboard/learning-project-dashboard-data-helpers.ts` |
| Learning dashboard | `src/components/dashboard/learning-dashboard-v1.tsx` |
| Projects dashboard | `src/components/dashboard/projects-dashboard-v1.tsx` |
| Knowledge alignment | `src/app/knowledge/page.tsx` and possibly a lightweight dashboard component |
| Shared UI primitives | `src/components/dashboard/*learning*`, `src/components/dashboard/*project*` |
| Cross-links | `src/components/dashboard/cross-dashboard-links.tsx` |
| Exports | `src/components/dashboard/index.ts` |
| Audit | `scripts/audit-phase-9.mjs` |
| Package script | `package.json` |
| Smoke checklist | `docs/qa/PHASE_9_LEARNING_PROJECT_MANUAL_SMOKE_CHECKLIST.md` |
| Completion report | `docs/phase-reports/PHASE_9_LEARNING_PROJECT_SYSTEM_COMPLETION_REPORT.md` |

## Chunk coverage map

| Chunk | Covered Steps | Traceability Purpose |
|---|---|---|
| A | 9.1-9.3 | Established source/route/plan baseline |
| B | 9.4-9.5 | Locks schema design and requirement traceability |
| C | 9.6 | Creates SQL foundation |
| D | 9.7 | Aligns generated/manual types to SQL |
| E | 9.8-9.9 | Adds read helpers |
| F | 9.10-9.12 | Adds data aggregation, registry, shared UI |
| G | 9.13-9.14 | Wires Learning dashboard |
| H | 9.15-9.16 | Wires Projects dashboard |
| I | 9.17 | Aligns Knowledge route without RAG |
| J | 9.18-9.20 | Adds skill/session/project detail panels |
| K | 9.21-9.25 | Adds proof, goal, task, timeline, proposed-action, state, cross-link layers |
| L | 9.26-9.28 | Adds audit, smoke checklist, completion report, closeout |

## Guardrail

Every later Phase 9 chunk must point back to this traceability matrix.

If a later implementation omits one of the source requirements listed here, it must explicitly mark it as deferred/non-goal with justification.

