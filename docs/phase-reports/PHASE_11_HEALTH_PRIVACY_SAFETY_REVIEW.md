# Phase 11 — Health Privacy and Safety Review

## Purpose

Phase 11 introduces sensitive health/body data. This review locks the privacy and safety boundaries before schema or UI implementation.

## Sensitive Areas

Phase 11 includes:

- bodyweight and body measurements
- workouts and physical progress
- nutrition and calories
- supplements
- sleep
- energy and brain fog
- hair/skincare routines
- mental health logs
- emotion logs
- journal entries
- optional photo attachment references

## Privacy Classification

| Domain | Sensitivity |
|---|---|
| Workouts | private |
| Body logs | private |
| Nutrition logs | private |
| Supplements | private |
| Sleep logs | private |
| Energy logs | private |
| Hair/skincare logs | private |
| Mental health logs | sensitive/private |
| Emotion logs | sensitive/private |
| Journal entries | sensitive/private |
| Photo references | sensitive/private |

## Required Privacy Rules

- All Phase 11 records must be user-owned.
- All Phase 11 tables must have RLS.
- No Phase 11 table may be globally readable.
- Sensitive notes must not be exposed on broad dashboards.
- `/emotion` must be treated as privacy-sensitive by default.
- `journal_entries.private` should default to true.
- `mental_health_logs`, `emotion_logs`, and `journal_entries` should have private/sensitive defaults.
- Phase 11 must not add export/share behavior.
- Phase 11 must not add public profile visibility.

## Carnos Boundary

Carnos may:

- summarize visible user-owned health/body data
- explain missing data
- propose actions through the safe-write flow
- parse natural language into proposed sleep, energy, nutrition, workout, or supplement records
- show preview-only proposed actions

Carnos must not:

- save silently
- diagnose
- prescribe
- recommend supplement dosage
- claim treatment or cure
- shame the user
- encourage unsafe dieting
- expose sensitive notes outside privacy-safe surfaces
- create proof records automatically
- mutate SQL directly
- bypass validation/user confirmation

## Sleep Natural-Language Safety

Allowed preview:

User says:
"I slept from 2 AM to 9:30 AM and woke up tired."

Carnos may propose:
- `sleep_hours = 7.5`
- sleep note: "woke up tired"
- optional energy/fatigue note

Required boundary:

proposal -> validation -> Save/Edit/Cancel -> server-owned execution -> audit log

No silent saving.

## Supplement Safety

Supplement tracking is recordkeeping only.

Forbidden claims:
- "This dosage is correct."
- "You should take this."
- "This will cure..."
- "This treats..."
- "This prevents..."
- "This interaction is safe."

Safe framing:
- "You logged this supplement."
- "This supplement is marked active."
- "This record is missing today."
- "Review with a qualified professional for medical questions."

## Body Image and Nutrition Safety

Forbidden framing:
- shame language
- punishment language
- guaranteed transformation language
- extreme dieting
- unsafe calorie pressure
- obsessive streak pressure

Safe framing:
- consistency
- recovery
- progress
- user-owned goals
- target comparison only when source-backed
- no hardcoded body targets

## Mental Health / Emotion Safety

Phase 11 is not a therapy or crisis product.

Forbidden:
- diagnosis
- therapy claims
- emergency/crisis automation
- clinical interpretation
- dangerous escalation logic
- public display of sensitive notes

Allowed:
- private reflection logs
- mood/stress/emotion tracking
- privacy-safe summaries
- user-owned journaling
- proposed self-care tasks only through safe-write confirmation

## Photo Boundary

Phase 11 may include `photo_attachment_id` references only.

Forbidden:
- fake upload UI
- fake saved photo state
- implied storage when storage is not implemented
- public photo exposure
- automatic image analysis

Photo upload/storage must be separately schema-backed and policy-backed before implementation.

## Analytics Boundary

Phase 11 may show:
- latest value
- weekly average
- count
- missing data
- simple trend preview
- target vs actual if target is source-backed

Phase 11 must not add:
- ML prediction
- clinical analysis
- experiment engine
- deep correlations
- automated recommendations

Advanced analytics belong to Phase 17.

## Manual QA Requirements

Sensitive pages must be manually reviewed for:

- no diagnosis language
- no treatment language
- no supplement advice
- no body-shaming language
- no unsafe diet language
- no fake save/upload behavior
- no sensitive note leakage
- no silent Carnos writes
- no Python/ML mutation
- no memory/RAG behavior

## B3 Safety Hardening Addendum

Phase 11 Chunk B3 expands the safety boundary for medical, supplement, body-image, emotion, journal, data quality, target comparison, and trend preview behavior.

### Medical and supplement safety

Phase 11 must remain recordkeeping and dashboard visibility only.

It must not diagnose, prescribe, recommend supplement dosage, claim treatment, claim cure, or claim guaranteed outcomes.

### Body-image and nutrition safety

Phase 11 must avoid shame language, punishment framing, unsafe diet pressure, and guaranteed transformation claims.

### Emotion and journal safety

Sensitive emotion and journal details must remain privacy-safe. Phase 11 must not claim therapy, diagnose emotional states, automate crisis handling, or expose detailed notes on broad dashboards.

### Data quality

Phase 11 must distinguish missing values from zero values, show latest records clearly, avoid hiding duplicates, and avoid averages/trend claims when data is insufficient.

### Targets and trends

Phase 11 may compare logs to targets only when targets are source-backed.

Phase 11 may show simple trend previews only. Advanced analytics, experiments, predictions, and deep correlations are deferred to Phase 17.
