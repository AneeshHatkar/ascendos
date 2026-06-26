# Phase 11 — Health/Body Detail Panel Pattern Report

## Status

Step 11.30 complete pending verification.

This report locks the read-only detail-panel pattern for the next Phase 11 health/body chunks before any new detail panels are created.

## Schema Needed?

No.

Step 11.30 is documentation and inspection only. It does not add SQL migrations, database columns, RLS policies, database types, storage buckets, write helpers, proposed-action contracts, Python/ML execution, or Carnos mutation behavior.

## Current Route State

The following Phase 11 health/body routes are wired to authenticated read-only dashboard surfaces:

- `/body`
- `/nutrition`
- `/supplements`
- `/sleep-energy`
- `/emotion`
- `/hair-skincare`

The `/body` route still preserves Phase 5 audit compatibility markers through a non-rendered `DomainReadPage.name` marker while rendering `HealthBodyDashboardV1`.

The other health/body routes use `AuthenticatedDashboardShell` and route-specific read-only dashboard components.

## Existing Health/Body Dashboard Components

Current route-level dashboards:

- `HealthBodyDashboardV1`
- `HealthBodyNutritionDashboardV1`
- `HealthBodySupplementsDashboardV1`
- `HealthBodySleepEnergyDashboardV1`
- `HealthBodyEmotionDashboardV1`
- `HealthBodyHairSkincareDashboardV1`

Shared state components:

- `HealthBodyEmptyState`
- `HealthBodyBoundaryNotice`
- `HealthBodyPrivacyNotice`
- `HealthBodyWarningPanel`

The current dashboards summarize record counts and boundary language only. They do not show focused row-level detail yet.

## Comparable Detail Panel Pattern

The inspected existing patterns are:

- `learning-project-detail-panels.tsx`
- `research-detail-panels.tsx`
- `career-evidence-linkage-panel.tsx`
- `career-state-boundary-panel.tsx`
- `research-linkage-boundary-panels.tsx`

The health/body detail panels should follow the established read-only panel style:

1. Use `SectionCard` for each focused detail panel.
2. Use `EmptyState` when no matching records exist.
3. Use small reusable row helpers for label/value display.
4. Render only the first or most recent available record for focused detail.
5. Keep all panels server-render-compatible.
6. Avoid client hooks.
7. Avoid direct Supabase usage inside UI components.
8. Avoid write functions and mutation flows.
9. Avoid automatic action creation.
10. Avoid medical, supplement, diagnosis, treatment, body-shaming, or appearance-shaming claims.

## Planned Health/Body Detail Panels

The next implementation chunk should create read-only panels for existing confirmed tables only.

Recommended panel groups:

### Body and Training Detail

Reads from:

- `body_logs`
- `workouts`
- `exercises`
- `workout_sets`

Purpose:

- Show the latest body log.
- Show the latest workout.
- Show the first available exercise and workout set context.
- Keep pain/soreness/recovery notes descriptive only.
- Avoid medical interpretation.

### Nutrition and Meal Detail

Reads from:

- `nutrition_logs`
- `meal_items`

Purpose:

- Show the latest nutrition log.
- Show the latest meal item.
- Display calories/macros only when already present in SQL.
- Avoid diet advice, diagnosis, eating-disorder language, or nutrition prescription.

### Supplement Detail

Reads from:

- `supplements`
- `supplement_logs`
- `products`

Purpose:

- Show the first active supplement.
- Show the latest supplement log.
- Show active product context when available.
- Avoid dosage recommendations, supplement efficacy claims, treatment claims, or medical advice.

### Sleep and Energy Detail

Reads from:

- `sleep_logs`
- `energy_logs`
- `mental_health_logs`

Purpose:

- Show the latest sleep log.
- Show the latest energy log.
- Show mental-state context only as user-recorded data.
- Avoid diagnosis, crisis handling, treatment claims, or medication claims.

### Emotion and Reflection Detail

Reads from:

- `emotion_logs`
- `mental_health_logs`
- `journal_entries`

Purpose:

- Show the latest emotion log.
- Show the latest journal/reflection record.
- Treat emotional labels as user-recorded records, not objective truth.
- Avoid emotional diagnosis or crisis handling.

### Haircare and Skincare Detail

Reads from:

- `skincare_logs`
- `haircare_logs`
- `products`

Purpose:

- Show the latest skincare log.
- Show the latest haircare log.
- Show active product context.
- Keep progress photos and visual evidence deferred until an explicit safe storage/privacy flow exists.
- Avoid appearance-shaming, product efficacy claims, treatment claims, or diagnosis.

## Read Helper Boundary

The inspected repository helper is:

- `src/lib/repositories/health-body-read.ts`

It already exports read helpers for the confirmed health/body tables, including:

- `listBodyLogs`
- `listWorkouts`
- `listExercises`
- `listWorkoutSets`
- `listNutritionLogs`
- `listMealItems`
- `listSupplements`
- `listSupplementLogs`
- `listSleepLogs`
- `listEnergyLogs`
- `listMentalHealthLogs`
- `listEmotionLogs`
- `listJournalEntries`
- `listSkincareLogs`
- `listHaircareLogs`
- `listProducts`

The UI detail panels must consume data passed from dashboards or helper composition layers. They must not call Supabase directly.

## Forbidden Scope for H2/H3

The next detail-panel chunks must not add:

- SQL migrations
- RLS policies
- database type changes
- write helpers
- server actions
- client-side mutation hooks
- Carnos autonomous writes
- Python/ML execution
- storage buckets
- progress photo upload
- visual evidence storage
- analytics snapshots
- `health_body_baselines`
- `progress_photos`
- `analytics_snapshots`

## Safety Language Required

All detail panels must preserve the Phase 11 safety boundary:

- Existing records only.
- Read-only display only.
- No diagnosis.
- No treatment claims.
- No supplement efficacy claims.
- No dosage recommendations.
- No body-shaming.
- No appearance-shaming.
- No mental health diagnosis.
- No crisis handling automation.
- No autonomous changes.
- No direct SQL mutation from UI, Python/ML, or Carnos.

## Implementation Recommendation for H2

Create:

- `src/components/dashboard/health-body-detail-panels.tsx`

Export it from:

- `src/components/dashboard/index.ts`

Use imported row types from:

- `src/types/database`

Use panel props with arrays of existing row types, for example:

- `bodyLogs`
- `workouts`
- `exercises`
- `workoutSets`
- `nutritionLogs`
- `mealItems`
- `supplements`
- `supplementLogs`
- `sleepLogs`
- `energyLogs`
- `mentalHealthLogs`
- `emotionLogs`
- `journalEntries`
- `skincareLogs`
- `haircareLogs`
- `products`

H2 should only create panels and exports. H3 should attach them to dashboards/routes after verification.

## Completion Criteria

Step 11.30 is complete when:

- This report exists.
- It documents the detail-panel pattern.
- It records that no schema change is needed.
- It lists the confirmed read helpers.
- It locks the forbidden scope for H2/H3.
- Verification passes.
- The report is committed and pushed.
