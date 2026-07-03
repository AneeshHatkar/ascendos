# Phase 18C — Metric Registry + Data Quality Contracts

Phase 18C defines the canonical analytics/experiment metric registry and data quality rules.

## Adds

- metric registry
- metric ids
- metric domains
- metric sensitivity labels
- offline cache eligibility labels
- source requirements
- minimum logged-day rules
- minimum matched-point rules
- baseline and measurement rules
- data completeness scoring
- data quality levels
- cached/stale/unsynced explanation limits
- Carnos explanation eligibility
- experiment evaluation eligibility
- local Carnos runtime compatibility markers

## Required metrics

- daily_checkin_count
- goal_progress_signal
- job_application_velocity
- networking_touchpoints
- learning_consistency
- research_output_count
- sleep_consistency
- workout_consistency
- calorie_logging_consistency
- experiment_measurement_completeness
- analytics_snapshot_freshness
- carnos_memory_context_availability

## Required quality levels

- high_confidence
- medium_confidence
- low_confidence
- insufficient_data
- invalid

## Required source modes

- online_live
- cached_offline
- mixed_online_cached
- unsynced_local
- missing

## Guardrails

- no correlation with fewer than 7 matched data points
- no weekly trend with fewer than 4 logged days
- no before-after result without baseline
- no high confidence if confounders exist
- no high confidence if unsynced records are included
- no high confidence if stale cached snapshots are used
- no month-over-month claim if current month is incomplete unless marked partial
- no fake metrics
- no fake data
- no runtime SQL reads
- no Supabase client calls
- no schema writes
- no localStorage core data
- no local Carnos runtime requirement during checks

## Phase 18A-B integration

Every metric must define:

- cache eligibility
- sensitivity
- source mode handling
- offline explanation limits
- sync/unsynced handling
- cached/stale labels
- local Carnos runtime compatibility

## Local runtime lock integration

Phase 18C does not implement the local runtime.

It prepares metric definitions so future 18M-B local Carnos runtime can safely explain cached metrics, stale snapshots, unsynced records, and deterministic fallback states.
