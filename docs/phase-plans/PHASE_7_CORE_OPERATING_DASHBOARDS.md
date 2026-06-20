# Phase 7 Plan Lock - Core Operating Dashboards

## Status

Locked plan. No feature implementation should begin until this plan is committed and pushed.

## Source of Truth

Primary source files:

- docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx
- docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json

Source hierarchy:

1. FINAL_SYNCED DOCX
2. FINAL_SYNCED JSON
3. repo phase plans, phase reports, status files, logs
4. code, migrations, scripts, audits
5. conversation memory

## Roadmap Reconciliation Lock

The older 15-phase roadmap memory is outdated and must not be used as the current implementation structure.

The FINAL_SYNCED DOCX and FINAL_SYNCED JSON override older memory.

The safe implementation structure going forward is 21 chunks unless the source-of-truth files are explicitly updated.

Reason:

- The DOCX contains the high-level product roadmap.
- The JSON/source structure contains the safer implementation chunk breakdown.
- The extra final implementation chunk is treated as v1 polish/final QA, not a restart or contradiction.

This project must not be restarted, renamed, or considered broken because of the roadmap-count reconciliation.

## Current Completed Foundation

Known completed and pushed foundation before Phase 7:

- Phase 1 source-of-truth foundation
- Phase 2 app shell and route foundation
- Phase 3 auth and Supabase foundation
- Phase 4 core SQL spine
- Phase 5 core read UI foundation
- Phase 5.15 Python/ML intelligence boundary patch
- Phase 6 safe write / proposed action flow

Latest known Phase 6 completion commit:

- b0b5a2b Complete Phase 6 safe write flow

## Phase 7 Goal

Phase 7 builds the core operating dashboard layer.

It turns the existing SQL/auth/read/write foundation into a connected operating view across Command, Timeline, Calendar, Goals, Proof, and Carnos panel surfaces.

Phase 7 is not a new AI brain phase. It is the dashboard integration layer.

## Phase 7 Scope

Phase 7 includes:

- Command dashboard v1
- Timeline dashboard v1
- Calendar dashboard v1
- Goals dashboard v1
- Proof dashboard/card system
- Carnos dashboard panel v1
- modular dashboard layout contract
- dashboard card registry
- shared dashboard card primitives
- server-side dashboard aggregation helpers
- cross-dashboard links
- pending proposed-action visibility
- loading states
- empty states
- error states
- privacy-aware/redacted states where relevant
- no-hardcoded-demo-data cleanup
- Phase 7 audit gate
- manual smoke checklist
- Phase 7 completion report

## Phase 7 Explicit Exclusions

Phase 7 must not implement:

- Career CRM
- Learning Academy
- Research / Stanford system
- Health / body system
- Life admin / survival system
- Grimoire / mode system
- Voice
- Memory / RAG / Knowledge Vault
- Internet / web tools
- Analytics / correlation engine
- Custom trackers / plugin system
- Privacy export/delete system
- Deployment/final release polish
- full Carnos chat generation
- autonomous AI actions
- Python/ML worker execution
- background jobs
- cron jobs
- service-role client code
- silent writes

Those belong to later phases/chunks.

## Required Phase 7 Steps

7.1 Phase 7 plan lock
7.2 Dashboard layout contract
7.3 Dashboard card registry
7.4 Shared dashboard card primitives
7.5 Dashboard data aggregation helpers
7.6 Command dashboard v1
7.7 Timeline dashboard v1
7.8 Calendar dashboard v1
7.9 Goals dashboard v1
7.10 Proof dashboard/card system
7.11 Pending updates / confirmation drawer integration
7.12 Carnos panel v1
7.13 Cross-dashboard links
7.14 Empty/loading/error/privacy states
7.15 No-hardcoded-demo-data cleanup
7.16 Phase 7 audit gate
7.17 Manual smoke checklist
7.18 Phase 7 report and completion marker

## Required Operating Loop

Phase 7 should make this loop visible:

goals -> tasks/events -> calendar -> proof -> timeline -> pending Carnos updates -> command dashboard

## Safety Rules

- Python/ML advises.
- The app validates.
- The user confirms.
- The server writes.
- SQL records.
- Audit logs.
- Python/ML must never directly mutate SQL.
- No silent AI writes.
- No unconfirmed important writes.
- No localStorage as final data storage.
- No hardcoded demo data as final state.
- No service-role key in client code.
- No future phase scope drift.

## Acceptance Criteria

Phase 7 is complete only when:

- Command dashboard displays real SQL-backed operating data or honest empty states.
- Timeline dashboard displays chronological user-owned records or honest empty states.
- Calendar dashboard displays dated tasks/events/logs or honest empty states.
- Goals dashboard displays goals, proof requirements, linked tasks/proof, or honest empty states.
- Proof cards/surfaces appear across the core dashboard loop.
- Carnos panel shows safe dashboard-side context and pending updates without autonomous execution.
- Dashboard cards are typed and reusable.
- Dashboard aggregation helpers are server-side and typed.
- Cross-links between goals, tasks, proof, timeline, calendar, and pending actions exist where available.
- Loading, empty, and error states exist.
- Privacy-aware/redacted states are respected where relevant.
- No hardcoded demo data is treated as final real data.
- Phase 7 audit is added to npm run check.
- npm run check passes.
- git diff --check passes.
- Phase 7 report exists.
- changes are committed and pushed.

## Completion Rule

Do not mark Phase 7 complete until all Phase 7 steps are implemented, checked, audited, reported, committed, and pushed.

