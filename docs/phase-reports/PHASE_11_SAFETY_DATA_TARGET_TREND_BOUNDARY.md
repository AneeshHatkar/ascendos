# Phase 11 — Safety, Data Quality, Target Comparison, and Trend Boundary

## Purpose

This document locks Phase 11 hardening design for:

- medical/supplement/body-image safety
- data quality and duplicate-log protection
- goal target comparison strategy
- trend preview boundary with advanced analytics deferred to Phase 17

This is a design-only document. It does not add SQL, TypeScript, routes, dashboards, write behavior, Carnos execution, ML, medical logic, supplement recommendations, or analytics engines.

## Scope Position

This document covers Phase 11 steps:

- 11.11 Medical/supplement/body-image safety hardening
- 11.12 Data quality + duplicate-log protection
- 11.13 Goal target comparison strategy
- 11.14 Trend preview boundary; advanced analytics deferred to Phase 17

## Safety Principle

Phase 11 is a health/body tracking foundation, not a medical product.

It may track:

- workouts
- body logs
- nutrition logs
- supplement records
- sleep logs
- energy logs
- hair/skincare routines
- emotion logs
- journal entries
- basic trends
- source-backed targets

It must not provide:

- diagnosis
- prescriptions
- medical treatment advice
- supplement dosage recommendations
- supplement interaction claims
- therapy claims
- crisis automation
- guaranteed transformation claims
- unsafe calorie advice
- body-shaming language
- advanced prediction
- ML scoring
- clinical analysis

## Medical Safety Boundary

### Not allowed

Phase 11 must not include copy or behavior that says or implies:

- "diagnose"
- "treat"
- "cure"
- "prescribe"
- "clinical result"
- "medical advice"
- "you have a condition"
- "this symptom means..."
- "this supplement will fix..."
- "this routine will cure..."
- "this guarantees regrowth"
- "this guarantees fat loss"

### Allowed

Phase 11 may safely say:

- "You logged this record."
- "This is your latest entry."
- "No data has been logged yet."
- "This is a user-entered note."
- "This is a trend preview, not medical analysis."
- "Review medical questions with a qualified professional."

## Supplement Safety Boundary

Supplement tracking is recordkeeping only.

### Not allowed

Phase 11 must not:

- recommend dosage
- change dosage
- recommend new supplements
- claim safety
- claim interactions
- claim effectiveness
- imply treatment/cure
- imply medical supervision
- say the user must take something

### Allowed

Phase 11 may show:

- active supplements
- inactive supplements
- dosage text entered by the user
- frequency text entered by the user
- taken/missed/skipped logs
- latest supplement record
- adherence summary
- missing records
- reminder linkage as future/deferred unless existing calendar/task linkage is used

Safe wording:

- "User-entered dosage"
- "Marked active"
- "Latest logged status"
- "No supplement records yet"
- "This is recordkeeping only, not medical advice"

## Body-Image and Nutrition Safety Boundary

### Not allowed

Phase 11 must not use:

- shame language
- punishment language
- "bad body" framing
- "failure" framing
- extreme diet encouragement
- unsafe calorie pressure
- guaranteed physique language
- obsessive streak pressure
- moral judgment around food, weight, skin, hair, or emotions

### Allowed

Phase 11 may use:

- neutral tracking language
- consistency language
- recovery language
- progress language
- user-owned goals
- source-backed target comparison
- missing-data states
- "not enough data yet" states

Safe wording:

- "No nutrition records yet."
- "Latest body log."
- "Target comparison is unavailable because no target is set."
- "Consistency is informational, not a judgment."
- "Recovery matters."

## Emotion and Journal Safety Boundary

Emotion and journal records are sensitive.

### Not allowed

Phase 11 must not:

- diagnose emotional states
- claim therapy
- automate crisis handling
- expose private notes on broad dashboards
- show journal content outside explicit private surfaces
- create emergency workflows
- create public/private sharing behavior
- use mental-health notes in unrelated dashboards without privacy-safe summarization

### Allowed

Phase 11 may show:

- private emotion logs
- private journal entries
- privacy-safe summaries
- latest private record metadata
- empty states
- user-owned notes inside privacy-safe detail panels
- Carnos proposed self-care tasks only through safe-write confirmation when supported later

## Data Quality and Duplicate-Log Protection

### Problem

Health/body data can be misleading when dashboards hide duplicate logs, treat missing values as zero, calculate averages from empty arrays, or display targets that were never set.

### Required rules

Dashboards and read helpers must:

- distinguish missing data from zero values
- show latest record clearly
- show record counts where useful
- show date ranges where useful
- avoid averages from empty data
- avoid trend claims from insufficient data
- avoid hiding duplicate same-day logs
- avoid silently collapsing duplicates into one truth
- avoid saying "completed" when data is only previewed
- avoid saying "saved" when no SQL write happened
- show source labels when multiple sources exist

### Duplicate same-day logs

Duplicate same-day logs are allowed unless SQL later adds a unique constraint.

If duplicates exist, dashboards should:

- show latest record
- optionally show count
- avoid claiming the latest record is the only truth
- avoid deleting or merging records automatically
- avoid pretending the day has one canonical value unless aggregation logic is explicit

### Missing vs zero

Missing means no data.

Zero means the user or system recorded a value of zero.

Examples:

- `calories = null` means not logged.
- `calories = 0` means a recorded zero value.
- `sleep_hours = null` means not logged.
- `sleep_hours = 0` means a recorded zero value, which should be treated carefully and not normalized away.

## Goal Target Comparison Strategy

### Purpose

Phase 11 dashboards should become more useful by comparing logs to user-owned targets, but only when targets are source-backed.

### Allowed target sources

Targets may come from:

- existing `goals`
- existing `tasks`
- existing `daily_logs`
- future `health_body_baselines` if approved in SQL
- future user-owned settings if explicitly implemented later
- user-confirmed proposed actions if safe-write support exists

### Not allowed

Phase 11 must not:

- hardcode personal targets
- infer targets without user confirmation
- claim the user has a target when no source exists
- calculate success/failure against fake targets
- create baseline/target records silently
- auto-create goals from health logs
- auto-create proof items from health logs

### Safe target display

Safe examples:

- "No sleep target set."
- "Target comparison unavailable."
- "Protein target source: active goal."
- "Sleep target source: health baseline."
- "Latest logged value: 7.5 hours."

Unsafe examples:

- "You failed your target."
- "Your goal is 8 hours" when no target exists.
- "You need 2800 calories" when not source-backed.
- "You should bulk now."
- "Saved a new target."

## Trend Preview Boundary

### Phase 11 may show

Phase 11 may show basic trend previews:

- latest value
- previous value
- weekly average
- simple counts
- missing days
- record count
- date range
- target vs actual when target exists
- simple direction words like "up", "down", "unchanged" when data is sufficient

### Phase 11 must not show

Phase 11 must not implement:

- ML predictions
- medical trend interpretation
- clinical risk scoring
- experiment engines
- causal claims
- advanced correlations
- recommendations generated from analytics
- health optimization engines
- wearable-derived insights
- internet/product/supplement lookups

Those belong to later phases, especially Phase 17 — Analytics / Experiments / Intelligence.

## Simple Trend Sufficiency Rules

Trend previews should require enough data.

Recommended minimums:

- latest value: at least 1 record
- previous comparison: at least 2 records
- weekly average: at least 2 records in the week, otherwise label as partial
- consistency count: at least a defined date range
- target comparison: at least 1 record and 1 source-backed target
- sleep-vs-energy preview: at least several paired sleep and energy records; otherwise show "not enough data yet"

If there is not enough data, show a safe empty/partial state.

## Audit Requirements

Phase 11 audit must eventually check for unsafe strings and unsafe behavior.

Suggested review markers:

- diagnosis language
- treatment language
- cure language
- prescribe language
- supplement recommendation language
- body-shaming language
- unsafe diet language
- fake save language
- fake upload language
- silent-write language
- public sensitive-note exposure
- Python/ML mutation paths
- dashboard direct mutation paths

## Completion Rules For B3

B3 is complete when:

- medical/supplement/body-image safety is documented
- emotion/journal safety is documented
- data quality and duplicate-log rules are documented
- goal target comparison rules are documented
- trend preview boundary is documented
- Phase 17 analytics boundary is explicit
- no SQL is added
- no TypeScript is changed
- no route/dashboard code is changed
- no Carnos write behavior is added
