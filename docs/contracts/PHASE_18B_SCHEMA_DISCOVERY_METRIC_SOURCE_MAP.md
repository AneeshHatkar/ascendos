# Phase 18B — Schema Discovery + Metric Source Map Contract

Phase 18B performs schema discovery for Analytics/Experiments.

## Purpose

Phase 18B maps existing persisted data sources before Phase 18 creates metric contracts, snapshot contracts, experiment contracts, repositories, engines, dashboards, or Carnos explanations.

## What Phase 18B adds

- schema discovery from local SQL migrations
- discovered table inventory
- analytics metric source map
- experiment source map
- Carnos/memory/context source awareness
- offline cache candidate list
- sensitive/restricted candidate list
- sync candidate list
- schema gap report
- audit coverage for discovery-only boundaries

## What Phase 18B does not do

- no new tables
- no migrations
- no runtime SQL reads
- no Supabase client calls
- no fake data
- no fake table claims
- no analytics engine implementation
- no experiment engine implementation
- no Carnos prompt injection
- no local AI runtime implementation

## Required source map

Phase 18B must produce:

- `docs/roadmap/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md`
- `docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json`

The source map must include:

- migration file count
- discovered table count
- discovered table classification
- candidate metric sources
- schema gaps
- offline cache candidates
- sensitive/restricted candidates
- sync candidate tables

## Required metrics covered

The Phase 18B source map must include:

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

## Phase 18A-B integration

Phase 18B must preserve:

- Supabase/Postgres as online source of truth
- IndexedDB or equivalent encrypted local cache as offline continuity layer
- browser localStorage core-data ban
- offline sync queue requirement
- conflict detection requirement
- duplicate prevention requirement
- cached approved memories
- cached analytics snapshots
- offline experiment/log capture
- Carnos cached-context honesty
- Level 4 Option C local AI readiness

## Next step dependency

If Phase 18B shows missing tables or unclear schema, later schema-dependent steps must ask for schema/migration output before creating contracts or repositories that depend on those tables.
