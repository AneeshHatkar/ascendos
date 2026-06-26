# Phase 11 — Baseline, Units, Sleep Tracking, and Photo Boundary

## Purpose

This document locks Phase 11 hardening design for:

- health/body baseline handling
- unit and measurement clarity
- daily sleep tracking
- sleep natural-language capture boundary
- progress photo/storage honesty

This is a design-only document. It does not add SQL, TypeScript, routes, dashboards, write behavior, uploads, storage, or Carnos execution.

## Scope Position

This document covers Phase 11 steps:

- 11.7 Health/body baseline + unit strategy
- 11.8 Daily sleep tracking design
- 11.9 Sleep natural-language capture boundary
- 11.10 Progress photo/storage honesty boundary

## Source-of-Truth Context

The Phase 11 source-confirmed tables are:

- `body_logs`
- `workouts`
- `exercises`
- `workout_sets`
- `nutrition_logs`
- `meal_items`
- `supplements`
- `supplement_logs`
- `sleep_logs`
- `energy_logs`
- `mental_health_logs`
- `emotion_logs`
- `journal_entries`
- `skincare_logs`
- `haircare_logs`
- `products`

The source-confirmed routes are:

- `/body`
- `/nutrition`
- `/supplements`
- `/sleep-energy`
- `/emotion`
- `/hair-skincare`

The source-referenced but not confirmed-as-table items are:

- `progress_photos`
- `body_goals`
- `reminders`
- `analytics_snapshots`

Phase 11 must not fake unsupported persistence for those items.

## Baseline Strategy

### Problem

Health/body dashboards become weak if they only show isolated logs. They need baseline context for:

- starting bodyweight
- current bodyweight
- goal bodyweight
- preferred bodyweight unit
- preferred lifting weight unit
- preferred measurement unit
- target calories
- target protein
- target water
- sleep target
- gym target
- bulk/cut/recomp mode
- routine baselines for hair/skincare/supplements

### Rule

Phase 11 must support baseline-aware display, but must not invent fake user targets.

### Allowed Baseline Sources

Phase 11 may derive baseline/targets from:

1. source-confirmed Phase 11 tables when fields exist
2. existing `goals`
3. existing `tasks`
4. existing `daily_logs`
5. future user-owned settings only if explicitly implemented later
6. a justified `health_body_baselines` candidate table only if schema design and SQL step approve it

### Not Allowed

Phase 11 must not:

- hardcode the user's real targets in dashboard code
- assume calorie/protein/bodyweight targets silently
- pretend a baseline exists when it does not
- write baseline records automatically
- create baseline records without the safe-write flow
- infer medical or treatment goals

## `health_body_baselines` Decision Boundary

`health_body_baselines` is useful but not source-confirmed as a required table.

### Candidate fields

If approved in SQL design, it may include:

- `id`
- `user_id`
- `starting_bodyweight`
- `goal_bodyweight`
- `bodyweight_unit`
- `lifting_weight_unit`
- `measurement_unit`
- `target_calories`
- `target_protein_g`
- `target_water_ml`
- `target_sleep_hours`
- `target_gym_days_per_week`
- `mode`
- `notes`
- `source_ai_action_id`
- `source_chat_message_id`
- `created_at`
- `updated_at`

### Candidate decision

For Phase 11 SQL, prefer one of two safe choices:

1. Add `health_body_baselines` only if we need a stable user-owned baseline table for dashboards.
2. Defer `health_body_baselines` and use existing goals plus latest logs for v1.

The SQL step must make this explicit.

## Unit Strategy

### Problem

Health/body data can become misleading if units are not clear.

Examples:

- 65 could mean kg or lb
- 100 could mean kg or lb on a lift
- 32 could mean inches or cm for waist
- 2.5 could mean liters or not if water is ambiguous

### Required unit clarity

Phase 11 must use explicit units for:

- bodyweight
- lifting weight
- waist/measurements
- water
- sleep duration
- macros
- calories

### Recommended defaults

Use explicit field labels and display labels:

| Data | Storage/display unit rule |
|---|---|
| bodyweight | numeric + `bodyweight_unit` |
| lifting weight | numeric + `weight_unit` |
| waist | numeric + `waist_unit` |
| water | `water_ml` |
| sleep | `sleep_hours` |
| protein/carbs/fat | grams |
| calories | kcal/calorie label in UI |

### Not Allowed

Phase 11 must not silently assume units in UI copy.

Safe UI copy:

- "Bodyweight: 62 kg" if unit exists.
- "Bodyweight: 62, unit not set" if unit is missing.
- "Water: 2500 ml."
- "Sleep: 7.5 hours."

Unsafe UI copy:

- "You weigh 62 kg" if only `62` exists and unit is missing.
- "You hit your target" if no target source exists.

## Daily Sleep Tracking Design

### Purpose

Phase 11 must support daily sleep visibility.

### Existing foundation

The existing core system already has `daily_logs.sleep_hours`.

Phase 11 adds or uses the source-confirmed `sleep_logs` table for more detailed sleep records:

- `sleep_date`
- `bedtime`
- `wake_time`
- `sleep_hours`
- `quality_score`
- `notes`

Phase 11 also uses `energy_logs` for:

- `energy_score`
- `focus_score`
- `fatigue_score`
- `brain_fog_score`
- `notes`

### Display behavior

The `/sleep-energy` dashboard should eventually show:

- latest sleep log
- latest energy log
- sleep hours by day
- weekly average sleep
- sleep quality
- bedtime/wake time
- energy/focus/fatigue/brain-fog values
- missing sleep days
- basic sleep consistency
- simple sleep-vs-energy preview only when enough records exist

### Duplicate behavior

Duplicate same-day sleep logs must not be hidden.

Dashboard rules:

- show latest sleep record
- show record count for date range where useful
- avoid treating duplicates as one clean truth unless aggregation rules are explicit
- distinguish missing data from zero values
- do not calculate averages from empty records

### `daily_logs.sleep_hours` compatibility

Phase 11 must not break the existing `daily_logs.sleep_hours` field.

Safe behavior:

- `/sleep-energy` may show `sleep_logs` as detailed source.
- `daily_logs.sleep_hours` may be shown as existing daily summary source.
- If both exist, UI must make source distinction clear.
- No migration should remove or rename `daily_logs.sleep_hours`.

## Sleep Natural-Language Capture Boundary

### Goal

The user should eventually be able to tell Carnos:

> I slept from 2 AM to 9:30 AM and woke up tired.

Carnos may calculate:

- sleep duration: 7.5 hours
- sleep note: woke up tired
- optional energy/fatigue note

### Required safe flow

Carnos may only produce a proposal.

Required flow:

User message
-> Carnos parses sleep details
-> Carnos calculates duration
-> Carnos creates a proposed action preview
-> app validates proposal
-> user chooses Save/Edit/Cancel
-> server executes write only after confirmation
-> SQL records
-> audit log records
-> dashboard refreshes

### Not Allowed

Carnos must not:

- save sleep logs silently
- directly insert into SQL
- bypass validation
- bypass user confirmation
- create energy logs automatically without user confirmation
- claim medical meaning from sleep data
- create proof items automatically
- use Python/ML to mutate SQL

### Safe proposed-action examples

Safe:

- "You said you slept from 2:00 AM to 9:30 AM. That is 7.5 hours. Save this as a sleep log?"
- "You mentioned waking up tired. Add this as a sleep note?"
- "You mentioned brain fog today. Add this as an energy log note?"

Unsafe:

- "Saved your sleep."
- "I recorded your sleep automatically."
- "Your sleep proves you have a condition."
- "You must sleep at this time."
- "I updated your health record."

## Progress Photo / Storage Honesty Boundary

### Problem

The source references `progress_photos` in `/body` and `/hair-skincare`, but no confirmed Phase 11 table block was found for `progress_photos`.

### Rule

Phase 11 must not fake progress photo persistence.

### Allowed in Phase 11

Phase 11 may include:

- `photo_attachment_id` reference fields if schema-backed
- empty-state copy saying photo storage is not enabled yet
- dashboard copy saying "photo references" instead of "uploaded photos"
- future-proof detail panels that do not pretend uploads exist

### Not Allowed in Phase 11

Phase 11 must not add:

- fake upload buttons
- fake saved photo messages
- storage bucket assumptions
- automatic image analysis
- public photo exposure
- photo timeline creation unless schema-backed
- progress-photo table unless explicitly justified

### Safe UI copy

Safe:

- "Photo references are not configured yet."
- "No photo attachment is linked to this record."
- "Progress photo storage is deferred until storage is explicitly implemented."

Unsafe:

- "Upload complete."
- "Photo saved."
- "Your progress photo was stored."
- "AI analyzed your photo."

## Completion Rules For B2

B2 is complete when:

- baseline strategy is documented
- unit strategy is documented
- daily sleep tracking is documented
- natural-language sleep capture boundary is documented
- progress photo/storage honesty boundary is documented
- no SQL is added
- no TypeScript is changed
- no route/dashboard code is changed
- no fake persistence is introduced
