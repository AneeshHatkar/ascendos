# Phase 11 — Health / Body Schema Design

## Purpose

This document designs the Phase 11 Health / Body SQL foundation before any migration is written.

Phase 11 must create a user-owned, SQL-backed, read-first health/body layer for:

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

This design intentionally avoids medical claims, autonomous writes, direct dashboard persistence, fake photo storage, background jobs, voice execution, memory/RAG, and advanced analytics.

## Source-of-Truth Tables

The FINAL_SYNCED JSON confirms these Phase 11 `health_body` tables:

| Table | Role |
|---|---|
| `body_logs` | Bodyweight, measurements, physical notes, optional photo attachment reference |
| `workouts` | Workout sessions |
| `exercises` | User-owned exercise catalog |
| `workout_sets` | Per-set workout performance records |
| `nutrition_logs` | Daily calories, macros, water, nutrition notes |
| `meal_items` | Food/meal item records linked to nutrition logs |
| `supplements` | User-owned supplement list and schedule metadata |
| `supplement_logs` | Taken/missed/skipped supplement records |
| `sleep_logs` | Daily sleep record with bedtime, wake time, duration, quality |
| `energy_logs` | Daily energy, focus, fatigue, and brain-fog record |
| `mental_health_logs` | Sensitive mood/stress/anxiety-style check-ins |
| `emotion_logs` | Sensitive emotion/intensity/trigger records |
| `journal_entries` | Sensitive private journal/reflection records |
| `skincare_logs` | Morning/night skincare routine logs |
| `haircare_logs` | Haircare routine, shedding notes, optional photo attachment reference |
| `products` | User-owned product list for skincare/haircare/supplements/general health-body routines |

## Required Ownership Pattern

Every Phase 11 table must include:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Every Phase 11 table must enable RLS.

Every Phase 11 table must restrict select/insert/update/delete to the authenticated owner.

No table may be globally readable.

## Candidate Shared Columns

Use consistent nullable linkage columns where needed:

- `goal_id uuid references public.goals(id) on delete set null`
- `task_id uuid references public.tasks(id) on delete set null`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `daily_log_id uuid references public.daily_logs(id) on delete set null`
- `event_id uuid references public.events(id) on delete set null`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`

These references must be nullable. Health records must remain valid even when they are not connected to goals, tasks, proof, events, or Carnos actions.

Parent ownership guards must be added in Chunk C.1 before cross-table writes are trusted.

## Table Design

### `body_logs`

Purpose: Stores bodyweight, measurements, body notes, and optional attachment references.

Suggested fields:

- `id`
- `user_id`
- `log_date date not null`
- `bodyweight numeric`
- `bodyweight_unit text`
- `waist numeric`
- `waist_unit text`
- `recovery_score integer`
- `soreness_score integer`
- `pain_score integer`
- `pain_area text`
- `notes text`
- `photo_attachment_id uuid`
- `goal_id uuid`
- `task_id uuid`
- `proof_item_id uuid`
- `daily_log_id uuid`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- No diagnosis.
- Pain/recovery fields are tracking-only.
- Photo references must not imply upload/storage exists.
- Duplicate same-day records are allowed unless later explicitly constrained; dashboards must show counts and latest record clearly.

### `workouts`

Purpose: Stores workout sessions.

Suggested fields:

- `id`
- `user_id`
- `workout_date date not null`
- `title text not null`
- `duration_minutes integer`
- `focus text`
- `intensity_score integer`
- `recovery_notes text`
- `notes text`
- `goal_id uuid`
- `task_id uuid`
- `proof_item_id uuid`
- `event_id uuid`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Workout records are user-owned.
- Workout records may link to calendar/events and proof only through nullable references.
- No automatic proof creation.

### `exercises`

Purpose: Stores user-owned exercise catalog entries.

Suggested fields:

- `id`
- `user_id`
- `name text not null`
- `muscle_group text`
- `equipment text`
- `notes text`
- `created_at`
- `updated_at`

Rules:

- Exercise names are user-owned.
- Do not require a global exercise library in Phase 11.

### `workout_sets`

Purpose: Stores set-level performance.

Suggested fields:

- `id`
- `user_id`
- `workout_id uuid not null references public.workouts(id) on delete cascade`
- `exercise_id uuid references public.exercises(id) on delete set null`
- `set_number integer`
- `reps integer`
- `weight numeric`
- `weight_unit text`
- `rir numeric`
- `notes text`
- `created_at`
- `updated_at`

Rules:

- `workout_id` parent ownership must be guarded.
- `exercise_id` parent ownership must be guarded when present.
- Weight unit must be explicit or display-safe.

### `nutrition_logs`

Purpose: Stores daily nutrition summary.

Suggested fields:

- `id`
- `user_id`
- `log_date date not null`
- `calories integer`
- `protein_g numeric`
- `carbs_g numeric`
- `fat_g numeric`
- `water_ml integer`
- `mode text`
- `notes text`
- `goal_id uuid`
- `task_id uuid`
- `proof_item_id uuid`
- `daily_log_id uuid`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- No unsafe calorie recommendation.
- Targets must come from baseline/goals/settings, not hardcoded fake values.
- Duplicate same-day logs must not be hidden.

### `meal_items`

Purpose: Stores meal/food entries attached to nutrition logs.

Suggested fields:

- `id`
- `user_id`
- `nutrition_log_id uuid not null references public.nutrition_logs(id) on delete cascade`
- `meal_name text`
- `food_name text not null`
- `calories integer`
- `protein_g numeric`
- `carbs_g numeric`
- `fat_g numeric`
- `quantity numeric`
- `unit text`
- `created_at`
- `updated_at`

Rules:

- `nutrition_log_id` parent ownership must be guarded.
- No barcode scanning or external food database in Phase 11.

### `supplements`

Purpose: Stores user-owned supplement records.

Suggested fields:

- `id`
- `user_id`
- `name text not null`
- `dosage text`
- `frequency text`
- `notes text`
- `active boolean not null default true`
- `created_at`
- `updated_at`

Rules:

- Supplement tracking is recordkeeping only.
- No dosage recommendation.
- No treatment/cure claims.
- No interaction claims.

### `supplement_logs`

Purpose: Stores taken/missed/skipped supplement records.

Suggested fields:

- `id`
- `user_id`
- `supplement_id uuid not null references public.supplements(id) on delete cascade`
- `taken_at timestamptz`
- `status text not null`
- `notes text`
- `created_at`
- `updated_at`

Rules:

- Valid statuses should be constrained in SQL, likely: `taken`, `missed`, `skipped`.
- `supplement_id` parent ownership must be guarded.
- No reminders/background jobs in Phase 11.

### `sleep_logs`

Purpose: Stores daily sleep records.

Suggested fields:

- `id`
- `user_id`
- `sleep_date date not null`
- `bedtime timestamptz`
- `wake_time timestamptz`
- `sleep_hours numeric`
- `quality_score integer`
- `notes text`
- `daily_log_id uuid`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Daily sleep tracking must be supported.
- Carnos may calculate duration and propose a sleep log.
- Carnos must not save silently.
- `sleep_hours` may also appear in `daily_logs`; dashboards must handle both sources clearly.

### `energy_logs`

Purpose: Stores daily energy/focus/fatigue/brain-fog signals.

Suggested fields:

- `id`
- `user_id`
- `log_date date not null`
- `energy_score integer`
- `focus_score integer`
- `fatigue_score integer`
- `brain_fog_score integer`
- `notes text`
- `daily_log_id uuid`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Scores are user-reported.
- No diagnosis.
- Trend previews only.

### `mental_health_logs`

Purpose: Stores sensitive emotional/mental state check-ins.

Suggested fields:

- `id`
- `user_id`
- `log_date date not null`
- `mood_score integer`
- `anxiety_score integer`
- `stress_score integer`
- `shame_score integer`
- `anger_score integer`
- `loneliness_score integer`
- `notes text`
- `sensitivity text not null default 'private'`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Sensitive by default.
- No diagnosis.
- No therapy claim.
- No emergency/crisis automation.
- Detailed notes must not be exposed on broad dashboards.

### `emotion_logs`

Purpose: Stores specific emotion events.

Suggested fields:

- `id`
- `user_id`
- `emotion text not null`
- `intensity integer`
- `trigger text`
- `occurred_at timestamptz not null default now()`
- `notes text`
- `sensitivity text not null default 'private'`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Sensitive by default.
- Trigger and notes must remain private.
- No clinical claims.

### `journal_entries`

Purpose: Stores private reflection/journal entries.

Suggested fields:

- `id`
- `user_id`
- `entry_date date not null`
- `title text`
- `content text`
- `mood_json jsonb`
- `sensitivity text not null default 'private'`
- `private boolean not null default true`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Private by default.
- Must not be shown in general dashboard summaries unless explicitly privacy-safe.
- No export/share behavior in Phase 11.

### `skincare_logs`

Purpose: Stores skincare routine logs.

Suggested fields:

- `id`
- `user_id`
- `log_date date not null`
- `routine_type text`
- `products_json jsonb`
- `completed boolean`
- `irritation_notes text`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Routine tracking only.
- No treatment guarantee.
- No prescription guidance.

### `haircare_logs`

Purpose: Stores haircare routine logs.

Suggested fields:

- `id`
- `user_id`
- `log_date date not null`
- `routine_json jsonb`
- `completed boolean`
- `shedding_notes text`
- `photo_attachment_id uuid`
- `source_ai_action_id uuid`
- `source_chat_message_id uuid`
- `created_at`
- `updated_at`

Rules:

- Haircare tracking only.
- No guaranteed hair regrowth claim.
- Photo references must not imply storage exists.

### `products`

Purpose: Stores user-owned product list for health/body routines.

Suggested fields:

- `id`
- `user_id`
- `name text not null`
- `category text`
- `brand text`
- `usage_notes text`
- `active boolean not null default true`
- `created_at`
- `updated_at`

Rules:

- Product recordkeeping only.
- No product recommendation engine in Phase 11.
- No external lookup.

## Candidate Tables Requiring Explicit Justification

### `health_body_baselines`

This table is useful but not source-confirmed as a named Phase 11 table.

Possible role:
- user height
- starting bodyweight
- goal bodyweight
- preferred units
- target calories
- target protein
- target water
- sleep target
- gym target
- bulk/cut/recomp mode

Decision:
- Include in schema only if Chunk B2 justifies it.
- Otherwise use existing goals/settings until a later phase.

### `progress_photos`

This table is mentioned by route scope but not found as a confirmed Phase 11 table block.

Decision:
- Do not add fake persistence.
- Do not implement upload/storage.
- Keep `photo_attachment_id` references only unless explicitly justified.

### `recovery_logs`

This table is useful but not source-confirmed.

Decision:
- Prefer simple recovery fields in `body_logs` and `workouts`.
- Do not add a separate table unless complexity requires it.

## Index Strategy

Recommended indexes:

- `(user_id, created_at desc)` on all Phase 11 tables
- `(user_id, log_date desc)` on date-log tables
- `(user_id, workout_date desc)` on `workouts`
- `(user_id, sleep_date desc)` on `sleep_logs`
- `(user_id, occurred_at desc)` on `emotion_logs`
- `(workout_id)` on `workout_sets`
- `(nutrition_log_id)` on `meal_items`
- `(supplement_id)` on `supplement_logs`

## Constraint Strategy

Recommended constraints:

- score fields should be nullable integers constrained to safe ranges where appropriate
- status fields should be constrained to known safe values
- unit fields should be nullable text but display-safe
- boolean fields should use explicit defaults where source-backed
- no hardcoded personal targets in SQL

## RLS Strategy

Every table:

- enable row level security
- select own rows only
- insert own rows only
- update own rows only
- delete own rows only

Parent ownership hardening must be handled in a separate guard migration.

## Read-First Boundary

This schema does not authorize direct writes from dashboards.

Allowed later:
- server-side write through the existing safe proposed-action flow
- user confirmation
- audit logging

Not allowed:
- client direct SQL mutation
- Carnos silent writes
- Python/ML mutation
- dashboard fake saves
