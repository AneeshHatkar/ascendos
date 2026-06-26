# Phase 11 — Health / Body System

## Purpose

Phase 11 builds the Health / Body System foundation for ascendOS + Carnos.

The core loop is:

Body Baseline -> Workout -> Set -> Nutrition -> Supplements -> Sleep -> Energy -> Skin/Hair -> Emotion -> Proof -> Timeline -> Carnos Proposal

Phase 11 turns health, physique, sleep, nutrition, supplement, hair/skincare, and emotion signals into user-owned, SQL-backed, read-first dashboard surfaces.

## Source-of-Truth Position

Phase 11 follows the existing source hierarchy:

1. FINAL_SYNCED DOCX
2. FINAL_SYNCED JSON
3. Repo docs, reports, audits, status, logs, migrations, scripts
4. Current codebase and terminal output
5. Explicit assumptions only

Phase 11 must preserve the project law:

Python/ML advises.
The app validates.
The user confirms.
The server writes.
SQL records.
Audit logs.
Python/ML must never directly mutate SQL.

## Safety Boundary

Phase 11 is initially a read-first foundation phase.

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
- medical diagnosis
- treatment claims
- supplement medical claims
- body-image shaming language
- unsafe diet encouragement
- mental-health therapy claims
- emergency/crisis handling automation
- photo upload/storage implementation unless explicitly scoped and schema-backed
- reminder/background job execution
- uncontrolled notifications
- RAG, embeddings, or memory_items
- OpenAI generation in dashboards
- Python/ML mutation paths
- uncontrolled background jobs

## Primary Phase 11 Routes

- /body
- /nutrition
- /supplements
- /sleep-energy
- /hair-skincare
- /emotion

## Supporting Linkage Routes

- /goals
- /tasks
- /calendar
- /timeline
- /proof
- /analytics
- /world-class
- /carnos

## Source-of-Truth Dashboard Scope

### /body

Purpose: gym and physique tracking for workouts, exercises, sets, bodyweight, photos, volume, and recovery.

Required cards:
- Workouts
- Exercises
- Sets
- Bodyweight
- Progress Photos
- Volume Trends
- Recovery Notes

Data sources:
- workouts
- exercises
- workout_sets
- body_logs
- progress_photos

Phase 11 note: `progress_photos` is referenced by dashboard source text, but no confirmed Phase 11 table block was found in the inspected health_body table slice. Phase 11 must not fake photo persistence. Photo fields remain attachment/reference visibility only unless a real attachment/photo table exists or is added in a later explicit schema step.

### /nutrition

Purpose: calories, macros, meals, water, bulk/cut mode, weekly averages, and consistency checks.

Required cards:
- Calories
- Protein
- Carbs
- Fat
- Water
- Meals
- Weekly Average
- Bulk/Cut Mode

Data sources:
- nutrition_logs
- meal_items
- body_goals

Phase 11 note: `body_goals` is referenced by dashboard source text, but no confirmed Phase 11 table block was found in the inspected health_body table slice. Link to existing goals first; do not invent `body_goals` unless schema design explicitly justifies it.

### /supplements

Purpose: supplement schedule/adherence with reminders and notes, without medical claims.

Required cards:
- Supplements
- Dosage
- Frequency
- Taken/Missed
- Notes
- Reminder Links

Data sources:
- supplements
- supplement_logs
- reminders

Phase 11 note: reminders are future calendar/task linkage only unless a reminder table already exists. Do not add notification/background execution.

### /sleep-energy

Purpose: sleep, wake time, quality, energy, focus, fatigue, brain fog, and correlations.

Required cards:
- Sleep Hours
- Sleep Quality
- Energy
- Focus
- Brain Fog
- Correlation Charts
- Recovery Suggestion

Data sources:
- sleep_logs
- energy_logs
- daily_logs
- analytics_snapshots

Phase 11 note: analytics snapshots are preview/correlation-read only unless an analytics table exists in the current phase scope.

### /hair-skincare

Purpose: routines, products, consistency, photos, irritation/shedding notes, without medical claims.

Required cards:
- Morning Routine
- Night Routine
- Products
- Photos
- Consistency
- Irritation/Shedding Notes

Data sources:
- skincare_logs
- haircare_logs
- products
- progress_photos

Phase 11 note: no medical diagnosis, treatment guarantee, or prescription guidance. Photos remain reference/attachment visibility only unless storage is explicitly implemented later.

### /emotion

Purpose: mood, emotional patterns, triggers, reflection, and regulation proof with strong privacy boundaries.

Data sources expected from health_body table scope:
- mental_health_logs
- emotion_logs
- journal_entries

Phase 11 note: `/emotion` is sensitive. It must be private, read-first, non-clinical, and must not imply therapy, diagnosis, crisis intervention, or medical advice.

## Expected Data Domains

Phase 11 should cover:

- body logs
- workouts
- exercises
- workout sets
- nutrition logs
- meal items
- supplements
- supplement logs
- sleep logs
- energy logs
- mental health logs
- emotion logs
- journal entries
- skincare logs
- haircare logs
- products

## Expected SQL Tables

Source-confirmed `health_body` tables:

- body_logs
- workouts
- exercises
- workout_sets
- nutrition_logs
- meal_items
- supplements
- supplement_logs
- sleep_logs
- energy_logs
- mental_health_logs
- emotion_logs
- journal_entries
- skincare_logs
- haircare_logs
- products

Schema-design candidates that must be justified before SQL:

- health_body_baselines
- progress_photos
- recovery_logs

These candidates must not be added blindly. They require source-to-scope justification, ownership design, RLS, type contracts, and audit coverage.

## Phase 11 Hardening Additions

Phase 11 must include these no-loophole hardening rules:

1. Health/body baseline handling.
2. Unit/measurement clarity.
3. Daily sleep tracking.
4. Sleep natural-language capture boundary.
5. Progress photo persistence honesty.
6. Supplement safety boundary.
7. Sensitive emotion/journal privacy.
8. No body-shaming or unsafe diet language.
9. Recovery/injury tracking is tracking-only, not diagnosis.
10. Adherence/streaks are informational, not punitive.
11. Health records become proof candidates only after user confirmation.
12. Medical/supplement/body-image audit checks.
13. Data quality and duplicate-log protection.
14. Goal target comparison.
15. Trend preview only; advanced analytics deferred to Phase 17.
16. Manual QA checklist for sensitive health pages.

## Sleep Natural-Language Capture Boundary

Carnos may parse user statements about sleep, calculate duration, and propose a `sleep_log`, `energy_log`, or `daily_log` update.

Example:

User says: "I slept from 2 AM to 9:30 AM and woke up tired."

Carnos may calculate:
- sleep duration: 7.5 hours
- tiredness/recovery note
- proposed sleep log
- proposed energy note

Carnos must not save silently.

Required flow:

proposal -> validation -> Save/Edit/Cancel -> server-owned execution -> audit log -> timeline boundary -> dashboard refresh

Phase 11 may design or preview this boundary, but actual writes must use the existing safe-write architecture and only when explicitly implemented.

## Supplement Safety Boundary

Supplement tracking is recordkeeping only.

Carnos and dashboards must not:
- recommend dosage
- make medical claims
- claim supplement interactions
- say the user must take a supplement
- imply treatment or cure
- replace professional care

Safe language examples:
- "You logged this supplement."
- "You missed this scheduled record."
- "Review your supplement plan if something feels off."
- "This is not medical advice."

## Body Image and Nutrition Safety Boundary

Dashboards must avoid:
- shame language
- punishment framing
- extreme diet encouragement
- unsafe calorie recommendations
- guaranteed transformation claims
- obsessive streak pressure

Adherence and streaks are informational signals only.

## Sensitive Emotion and Journal Privacy Boundary

`mental_health_logs`, `emotion_logs`, and `journal_entries` are sensitive by default.

Rules:
- Do not expose detailed sensitive notes on general dashboards unless explicitly designed as privacy-safe summaries.
- Do not diagnose.
- Do not claim therapy.
- Do not automate crisis handling.
- Do not export/share in Phase 11.
- Keep sensitive detail panels private and read-first.
- Make privacy state visible in UI copy.

## Data Quality and Duplicate Protection

Dashboards must:
- not calculate averages from empty arrays
- not hide duplicate same-day logs
- show latest log date clearly
- show record count/date range clearly where useful
- avoid fake trend claims when data is insufficient
- distinguish missing data from zero values

## Goal Target Comparison

Phase 11 may compare logs against user targets only when targets are source-backed.

Possible target sources:
- health/body baseline
- existing goals
- existing tasks
- user-owned settings if later added

No target should be hardcoded as if it is the user's real target.

## Trend Preview Boundary

Phase 11 may show:
- latest values
- weekly averages
- simple counts
- basic directionality
- simple target vs actual comparison

Phase 11 must not add:
- advanced prediction
- ML scoring
- medical analysis
- deep cross-domain correlation engines
- experiment intelligence

Those belong to Phase 17 — Analytics / Experiments / Intelligence.

## Integration With Existing Phases

Phase 11 should connect to earlier phases through nullable references only when needed:

- goal_id
- task_id
- proof_item_id
- daily_log_id
- event_id
- timeline_event_id

This prevents old data from breaking and allows records to remain unlinked until supporting evidence exists.

## Existing Foundations Confirmed From Startup Inspection

The current repo already has:

- Phase 10 complete at commit `d5e300d Complete research system`
- `main` aligned with `origin/main`
- clean repo before pre-phase snapshot
- `CODE_SNAPSHOT.md` regenerated as the Phase 11 pre-phase snapshot
- authenticated dashboard shell
- read-only dashboard empty states
- cross-dashboard link component
- proposed-action review card
- canonical routes for /body, /nutrition, /supplements, /sleep-energy, /emotion, and /hair-skincare
- `/body` using the Phase 5 DomainReadPage shell
- `/nutrition`, `/supplements`, `/sleep-energy`, and `/hair-skincare` using placeholder dashboard pages
- no health/body migrations
- no health/body database types
- no health/body read helpers
- no health/body dashboard aggregation helpers

## Phase 11 Step Plan

### Inspection and Plan

- 11.1 Source-of-truth inspection
- 11.2 Phase 11 plan lock
- 11.3 Existing route/component inspection

### Schema, Traceability, and Hardening Design

- 11.4 Health/body schema design
- 11.5 Sensitive health/privacy schema review
- 11.6 Source-to-scope traceability matrix
- 11.7 Health/body baseline + unit strategy
- 11.8 Daily sleep tracking design
- 11.9 Sleep natural-language capture boundary
- 11.10 Progress photo/storage honesty boundary
- 11.11 Medical/supplement/body-image safety hardening
- 11.12 Data quality + duplicate-log protection
- 11.13 Goal target comparison strategy
- 11.14 Trend preview boundary; advanced analytics deferred to Phase 17

### SQL and Ownership

- 11.15 SQL migration
- 11.16 Ownership/RLS hardening

### Types and Read Layer

- 11.17 Database types
- 11.18 Body/workout read helpers
- 11.19 Nutrition/supplement read helpers
- 11.20 Sleep/energy/emotion/hair-skincare read helpers

### Dashboard Foundation

- 11.21 Health/body aggregation helpers
- 11.22 Dashboard registry/card layout extension
- 11.23 Shared health UI primitives

### Route Wiring

- 11.24 Body dashboard v1 and /body
- 11.25 Nutrition dashboard v1 and /nutrition
- 11.26 Supplements dashboard v1 and /supplements
- 11.27 Sleep/Energy dashboard v1 and /sleep-energy
- 11.28 Hair/Skincare dashboard v1 and /hair-skincare
- 11.29 Emotion dashboard v1 and /emotion

### Detail Panels

- 11.30 Workout/exercise/set detail panels
- 11.31 Body log/progress detail panels
- 11.32 Nutrition/meal detail panels
- 11.33 Supplement/adherence detail panels
- 11.34 Sleep/energy detail panels
- 11.35 Hair/skincare/product detail panels
- 11.36 Emotion/journal privacy-safe detail panels

### Linkage and State

- 11.37 Health-to-goals/tasks/proof linkage
- 11.38 Health-to-calendar/timeline linkage
- 11.39 Proposed-action visibility
- 11.40 Empty/loading/error/privacy states
- 11.41 Cross-dashboard links

### Closeout

- 11.42 No-write/privacy/medical-claims audit
- 11.43 Audit gate + manual smoke checklist
- 11.44 Completion report + closeout

## Build Chunk Plan

| Chunk | Steps | Purpose |
|---|---:|---|
| A | 11.1-11.3 | Source inspection, plan lock, route/component inspection |
| B1 | 11.4-11.6 | Schema design, sensitive privacy review, traceability |
| B2 | 11.7-11.10 | Baseline, units, sleep tracking, sleep capture, photo honesty |
| B3 | 11.11-11.14 | Medical/supplement/body-image safety, data quality, targets, trend boundary |
| C | 11.15 | SQL foundation only |
| C.1 | 11.16 | Ownership/RLS hardening only |
| D | 11.17 | Database types only |
| E1 | 11.18 | Body/workout read helpers |
| E2 | 11.19 | Nutrition/supplement read helpers |
| E3 | 11.20 | Sleep/energy/emotion/hair-skincare read helpers |
| F1 | 11.21 | Aggregation helpers |
| F2 | 11.22-11.23 | Registry/card layout and shared health UI |
| G1 | 11.24 | Body dashboard route |
| G2 | 11.25 | Nutrition dashboard route |
| G3 | 11.26 | Supplements dashboard route |
| G4 | 11.27 | Sleep/Energy dashboard route |
| G5 | 11.28 | Hair/Skincare dashboard route |
| G6 | 11.29 | Emotion dashboard route |
| H1 | 11.30-11.31 | Workout/body detail panels |
| H2 | 11.32-11.33 | Nutrition/supplement detail panels |
| H3 | 11.34-11.36 | Sleep/hair/emotion detail panels |
| I1 | 11.37-11.38 | Health linkage panels |
| I2 | 11.39-11.40 | Proposed-action and state boundaries |
| I3 | 11.41 | Cross-dashboard links |
| J1 | 11.42-11.43 | Audit gate and smoke checklist |
| J2 | 11.44 | Completion report and closeout |

## Deferred Scope

The following are not part of Phase 11:

- memory/RAG activation
- embeddings
- automatic web search
- automatic product, supplement, or medical lookup
- medical diagnosis or treatment recommendations
- supplement medical claims
- clinical mental-health guidance
- emergency/crisis automation
- photo upload/storage unless explicitly schema-backed
- reminder/background job execution
- autonomous Carnos mutation
- direct Python/ML writes
- uncontrolled background jobs
- wearable integrations
- Apple Health / Google Fit integrations
- nutrition barcode scanning
- external health APIs
- advanced analytics and experiments beyond simple trend previews

## Completion Criteria

Phase 11 is complete when:

- /body is wired to real read helpers.
- /nutrition is wired to real read helpers.
- /supplements is wired to real read helpers.
- /sleep-energy is wired to real read helpers.
- /hair-skincare is wired to real read helpers.
- /emotion is wired to privacy-safe read helpers or explicitly deferred with source-trace justification.
- health/body schema exists with RLS.
- database types are updated.
- read helpers are implemented.
- dashboards display meaningful health/body state.
- daily sleep visibility exists.
- sleep natural-language capture boundary is documented and/or previewed without silent writes.
- baseline/unit handling is documented and implemented where schema-backed.
- data quality and duplicate-log behavior is explicit.
- linkage panels connect health/body records to goals/tasks/proof/calendar/timeline where applicable.
- proposed-action previews are disabled and read-first unless later safe-write flow is explicitly added.
- privacy/state boundaries exist.
- medical/supplement/body-image safety boundaries exist.
- cross-links exist.
- no-write/privacy/medical-claims audit passes.
- manual sensitive-page smoke checklist exists.
- full verification passes.
