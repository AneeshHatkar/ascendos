# Phase 8 Plan — Career System v2

Status: Locked.

## Phase purpose

Phase 8 builds the Career System as a real operating layer, not just a dashboard skin.

It extends the existing ascendOS + Carnos foundation with structured career execution for job applications, referrals, networking, resume versions, interview preparation, follow-ups, outcomes, analytics, and proof links.

Phase 8 must preserve all Phase 1–7 boundaries.

## Phase 1–7 dependencies preserved

Phase 8 must not break or rewrite:

- Phase 1 source-of-truth hierarchy.
- Phase 2 canonical route foundation.
- Phase 3 auth and Supabase foundation.
- Phase 4 SQL spine discipline.
- Phase 5 read-only dashboard shell patterns.
- Phase 6 confirmation-first proposed-action flow.
- Phase 7 operating dashboard contracts, cards, links, states, and audit boundaries.

## Canonical career routes

Phase 8 uses only existing canonical routes:

- `/career`
- `/networking`
- `/resume`
- `/interviews`

Phase 8 may connect career summaries into:

- `/command`
- `/timeline`
- `/calendar`
- `/goals`
- `/carnos`

No new non-canonical route may be introduced.

## Include in Phase 8

Career data foundation:

- job applications
- application events/status history
- networking contacts
- networking interactions
- referrals
- resume versions
- resume bullets / evidence-linked claims
- interview records
- interview prep tasks
- follow-ups
- career analytics summaries
- proof links to goals, tasks, proof_items, and daily_logs

Career UI foundation:

- Career dashboard
- Job applications pipeline
- Networking/referral dashboard
- Resume versioning dashboard
- Interview command center
- Career cross-links
- Career empty/loading/error/privacy states
- Career proposed-action visibility without direct execution

Career safety/audit foundation:

- Career audit gate
- Integration audit expansion
- Manual smoke checklist
- Phase 8 report and completion marker

## Exclude from Phase 8

Phase 8 must not add:

- autonomous job applications
- autonomous emails/messages
- scraping
- external internet job search tools
- memory/RAG
- Carnos autonomous career execution
- Python/ML worker execution
- voice execution
- background jobs or cron
- service-role client code
- direct dashboard mutation
- hidden resume rewriting
- non-canonical routes

## Safety law

The confirmation-first law remains:

`proposal -> validation -> Save/Edit/Cancel -> server-owned execution -> audit log -> timeline boundary -> dashboard refresh`

Career dashboards may read and display career data.

Career dashboards must not directly mutate SQL.

## Phase 8 substeps

8.1 Career system plan lock v2.
8.2 Inspect current career routes, SQL, repositories, dashboard contracts, and audits.
8.3 Career SQL schema plan / migration design.
8.4 Career SQL migration: applications, events, networking, resume versions, interviews.
8.5 Database types update / generated type alignment.
8.6 Career read repository helpers.
8.7 Career data aggregation helpers.
8.8 Career dashboard card registry extension.
8.9 Career shared UI primitives / status labels if needed.
8.10 Career dashboard v1.
8.11 Wire `/career`.
8.12 Job applications pipeline view.
8.13 Networking / referral dashboard v1.
8.14 Wire `/networking`.
8.15 Resume versioning dashboard v1.
8.16 Wire `/resume`.
8.17 Interview command center v1.
8.18 Wire `/interviews`.
8.19 Career cross-links across `/career`, `/networking`, `/resume`, `/interviews`.
8.20 Career proof/evidence linkage to goals, tasks, proof_items, and daily_logs.
8.21 Career proposed-action visibility, with no direct execution.
8.22 Career empty/loading/error/privacy states.
8.23 Career audit gate plus integration audit expansion.
8.24 Career manual smoke checklist plus Phase 8 report/completion marker.

## Completion criteria

Phase 8 is complete only when:

- `npm run check` passes.
- `/career`, `/networking`, `/resume`, and `/interviews` are canonical and build-safe.
- Career SQL/data/read foundations exist.
- Career dashboard components are exported and wired.
- Career routes render without breaking Phase 1–7.
- Career audit gate exists.
- Integration audit covers Phase 8 boundaries.
- No autonomous applications, scraping, emails, generation, memory/RAG, Python/ML execution, voice execution, internet tools, background jobs, or direct dashboard mutations are introduced.
