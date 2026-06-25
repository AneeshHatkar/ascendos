# Phase 10 — Research / Stanford System

## Purpose

Phase 10 builds the Research / Stanford System foundation for ascendOS + Carnos.

The core loop is:

Skill -> Project -> Research Idea -> Literature -> Experiment -> Result -> Paper -> Proof -> Resume -> Professor/Lab -> PhD/Career

Phase 10 turns learning and project progress into research credibility, paper readiness, professor/lab targeting, Stanford/PhD readiness, and proof-backed career leverage.

## Source-of-Truth Position

Phase 10 follows the existing source hierarchy:

1. FINAL_SYNCED DOCX
2. FINAL_SYNCED JSON
3. Repo docs, reports, audits, status, logs, migrations, scripts
4. Current codebase and terminal output
5. Explicit assumptions only

Phase 10 must preserve the project law:

Python/ML advises.
The app validates.
The user confirms.
The server writes.
SQL records.
Audit logs.
Python/ML must never directly mutate SQL.

## Safety Boundary

Phase 10 is initially a read-first foundation phase.

It may add:

- SQL schema
- RLS and ownership policies
- database types
- read helpers
- dashboard aggregation helpers
- dashboard components
- route wiring
- proposed-action previews
- linkage panels
- privacy/state boundaries
- audit reports

It must not add:

- autonomous Carnos writes
- hidden database mutation
- direct dashboard persistence
- automatic professor emails
- paper submission automation
- web scraping
- RAG, embeddings, or memory_items
- OpenAI generation in dashboards
- Python/ML mutation paths
- uncontrolled background jobs

## Primary Phase 10 Routes

- /research-lab
- /research-stanford

## Supporting Linkage Routes

- /projects
- /learning
- /proof
- /resume
- /goals
- /timeline
- /career
- /knowledge
- /carnos

## Phase 10 Step Plan

### Inspection and Plan

- 10.1 Source-of-truth inspection
- 10.2 Phase 10 plan lock
- 10.3 Existing route/component inspection

### Schema and Traceability

- 10.4 Research schema design
- 10.5 Stanford/PhD schema design
- 10.6 Source-to-scope traceability matrix

### SQL and Ownership

- 10.7 SQL migration
- 10.8 Ownership/RLS hardening

### Types and Read Layer

- 10.9 Database types
- 10.10 Research read helpers
- 10.11 Stanford/PhD read helpers
- 10.12 Literature/citation read helpers

### Dashboard Foundation

- 10.13 Research aggregation helpers
- 10.14 Dashboard registry extension
- 10.15 Shared research UI primitives

### Route Wiring

- 10.16 Research Lab dashboard v1
- 10.17 Wire /research-lab
- 10.18 Stanford/PhD dashboard v1
- 10.19 Wire /research-stanford

### Detail Panels

- 10.20 Research idea detail panels
- 10.21 Literature review/citation panels
- 10.22 Experiment/result panels
- 10.23 Paper/draft/publication panels
- 10.24 Research claim/proof panels
- 10.25 Professor/lab fit panels
- 10.26 PhD readiness/gap panels
- 10.27 SOP/recommendation/application panels

### Linkage and State

- 10.28 Research-to-project linkage
- 10.29 Research-to-proof/resume linkage
- 10.30 Goal/task/timeline linkage
- 10.31 Proposed-action visibility
- 10.32 Empty/loading/error/privacy states
- 10.33 Cross-dashboard links

### Closeout

- 10.34 No-write/privacy audit
- 10.35 Audit gate + smoke checklist
- 10.36 Completion report + closeout

## Chunk Plan

| Chunk | Steps | Purpose |
|---|---:|---|
| A | 10.1-10.3 | Source inspection, plan lock, route/component inspection |
| B | 10.4-10.6 | Schema design and source-to-scope traceability |
| C | 10.7 | SQL foundation only |
| C.1 | 10.8 | Ownership/RLS hardening only |
| D | 10.9 | Database types only |
| E | 10.10-10.12 | Research, Stanford/PhD, literature/citation read helpers |
| F | 10.13-10.15 | Aggregation helpers, registry, shared UI |
| G | 10.16-10.17 | Research Lab dashboard and /research-lab |
| H | 10.18-10.19 | Stanford/PhD dashboard and /research-stanford |
| I | 10.20-10.27 | Detail panels |
| J | 10.28-10.33 | Linkage, proposed-action visibility, state/privacy, cross-links |
| K | 10.34-10.36 | Audit, smoke checklist, completion report, closeout |

## Expected Data Domains

Phase 10 should cover:

- research ideas
- research questions
- literature review items
- citations
- research claims
- experiments
- experiment results
- papers
- paper versions
- feedback
- venues
- submissions
- target universities
- target labs
- target professors
- PhD readiness assessments
- PhD application assets
- SOP versions
- recommendation targets

## Integration With Existing Phases

Phase 10 should connect to earlier phases through nullable references only:

- goal_id
- task_id
- proof_item_id
- project_id
- skill_id
- resume_bullet_id
- daily_log_id
- timeline_event_id

This prevents old data from breaking and allows records to remain unlinked until supporting evidence exists.

## Existing Foundations Confirmed From Chunk A Inspection

The current repo already has:

- authenticated dashboard shell
- read-only dashboard empty states
- cross-dashboard link component
- proposed-action review card
- proposed-action domains including research
- proof item creation action type
- task and goal creation action types
- project type support for research and experiment
- learning session type support for research
- quiz type support for research_review
- project link support for paper, reference, and proof
- existing project, learning, proof, resume, goal, task, and timeline foundations

## Deferred Scope

The following are not part of Phase 10:

- memory/RAG activation
- embeddings
- automatic web search
- automatic professor/lab scraping
- automatic emailing
- paper submission automation
- autonomous Carnos mutation
- direct Python/ML writes
- uncontrolled background jobs

## Completion Criteria

Phase 10 is complete when:

- /research-lab is wired to real read helpers.
- /research-stanford is wired to real read helpers.
- research/Stanford schema exists with RLS.
- database types are updated.
- read helpers are implemented.
- dashboards display meaningful research/PhD state.
- linkage panels connect research to projects/proof/resume/goals/tasks/timeline.
- proposed-action previews are disabled and read-first unless later safe-write flow is explicitly added.
- privacy/state boundaries exist.
- cross-links exist.
- no-write/privacy audit passes.
- full verification passes.
