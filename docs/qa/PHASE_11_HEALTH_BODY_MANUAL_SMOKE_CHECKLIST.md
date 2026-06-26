# Phase 11 Health Body Manual Smoke Checklist

Status: Drafted for J1 verification.

## Scope

This checklist verifies the Phase 11 Health / Body System read-only dashboard surfaces.

Routes:

- `/body`
- `/nutrition`
- `/supplements`
- `/sleep-energy`
- `/emotion`
- `/hair-skincare`

## Pre-checks

- Run `npm run audit:phase11`.
- Run `npm run check`.
- Confirm no uncommitted SQL migration was added.
- Confirm no uncommitted storage/upload implementation was added.
- Confirm no new write helper or Carnos execution path was added.

## Route smoke checks

### `/body`

Expected:

- Authenticated dashboard shell renders.
- Health Body Overview renders.
- Metric cards render.
- Body/training detail panel renders.
- Proof and operating linkage panel renders.
- Proposed-action visibility panel renders with disabled controls.
- State/privacy boundary panel renders.
- Health/body cross-route links render.

### `/nutrition`

Expected:

- Nutrition Dashboard renders.
- Nutrition and meal detail panel renders.
- Linkage panel renders.
- Proposed-action visibility panel renders with disabled controls.
- State/privacy boundary panel renders.
- Cross-route links render.

### `/supplements`

Expected:

- Supplements Dashboard renders.
- Supplement detail panel renders.
- Supplement safety language is visible.
- Proposed-action visibility panel renders with disabled controls.
- No dosage recommendation behavior exists.
- Cross-route links render.

### `/sleep-energy`

Expected:

- Sleep Energy Dashboard renders.
- Sleep and energy detail panel renders.
- Mental-state records are described as user-recorded data only.
- Proposed-action visibility panel renders with disabled controls.
- No diagnosis, medication, or treatment behavior exists.
- Cross-route links render.

### `/emotion`

Expected:

- Emotion Dashboard renders.
- Emotion and reflection detail panel renders.
- Emotion labels are shown as user-recorded data only.
- Proposed-action visibility panel renders with disabled controls.
- No diagnosis or crisis-handling automation exists.
- Cross-route links render.

### `/hair-skincare`

Expected:

- Hair Skincare Dashboard renders.
- Haircare and skincare detail panel renders.
- Product context displays without efficacy claims.
- Progress photos and visual evidence remain deferred.
- Proposed-action visibility panel renders with disabled controls.
- Cross-route links render.

## Empty-state checks

Expected:

- Empty panels explain that no matching records exist yet.
- Empty panels do not imply system failure.
- Empty states do not trigger automatic creation of records.
- No dashboard writes to SQL from empty states.

## Error-state checks

Expected:

- Read warnings show inline.
- Errors do not trigger automatic retries.
- Errors do not trigger writes, uploads, emails, scraping, Python/ML execution, or Carnos execution.

## Proposed-action visibility

Expected:

- ProposedActionReviewCard appears only as disabled preview UI.
- Save / Confirm is unavailable.
- Cancel is unavailable.
- Edit payload is unavailable.
- No callback is wired for persistence.
- No proposal is saved from the dashboard.

## Privacy and safety checks

Expected:

- Health/body, sleep, nutrition, supplements, emotion, mental-state, haircare, skincare, and product data are described as private.
- No medical diagnosis is shown.
- No treatment claim is shown.
- No supplement efficacy claim is shown.
- No dosage recommendation is shown.
- No body-shaming or appearance-shaming language is shown.
- No progress photo upload or visual evidence storage is present.
- No health/body baseline table is referenced.
- No analytics snapshot table is referenced.

## No write behavior

Forbidden:

- direct SQL writes
- autonomous Carnos writes
- Python/ML execution
- storage/upload behavior
- visual evidence storage
- progress photo table
- baseline table
- analytics snapshot table
- background jobs
- medical or mental-health automation
