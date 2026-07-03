# Phase 18G — Analytics Repository Boundaries

Phase 18G defines analytics repository boundaries.

## Adds

- Analytics repository boundaries
- metric definition lookup boundary
- metric value read boundary
- snapshot read boundary
- insight read boundary
- dashboard summary read boundary
- export preview read boundary
- source routing boundary
- cached fallback boundary
- stale data labeling boundary
- unsynced local context boundary
- deterministic empty state boundary
- user scope validation boundary
- no fake analytics read boundary
- schema source map requirement before runtime implementation
- Carnos repository explanation limits

## Required read intents

- metric_definition_lookup
- metric_value_read
- snapshot_read
- insight_read
- dashboard_summary_read
- export_preview_read

## Required repository sources

- supabase_postgres_source_of_truth
- encrypted_offline_cache
- mixed_source_router
- deterministic_empty_state

## Required cache states

- live_only
- cache_allowed
- cache_allowed_with_sensitive_rules
- cache_allowed_with_privacy_rules
- not_cacheable

## Required freshness labels

- fresh
- cached
- stale
- partial
- missing
- unsynced

## Required capabilities

- read_metric_definitions
- read_metric_values
- read_snapshots
- read_insight_previews
- read_dashboard_summaries
- read_export_previews
- route_cached_fallback
- label_source_mode
- validate_user_scope

## Validation rules

- repository id required
- user scoped repository required
- read intents required
- capabilities required
- metric plans required
- Supabase/Postgres online source of truth required
- encrypted IndexedDB offline continuity layer required
- Phase 18B source map required before runtime implementation
- registered metric plans only
- user scope required per metric plan
- runtime reads not implemented in this boundary chunk
- not-cacheable metrics cannot allow cached fallback
- not-cacheable metrics cannot allow unsynced local context
- sensitive/restricted metrics cannot use unrestricted cache
- fresh data requires source-of-truth provenance
- deterministic empty-state repository context must be disclosed to Carnos

## Phase 18A-B integration

Analytics repository boundaries preserve:

- Supabase/Postgres as online source of truth
- IndexedDB or equivalent encrypted local cache as offline layer
- browser localStorage core-data ban
- offline cache labels
- stale cache labels
- unsynced local context labels
- mixed online/offline source labels
- deterministic fallback honesty
- future sync queue boundary
- Carnos cached/offline honesty
- local Carnos runtime remains optional

## Phase 18C integration

Analytics repository boundaries use metric registry definitions, metric sensitivity, cache eligibility, and registered metric ids.

## Phase 18D integration

Analytics repository boundaries prepare snapshot read boundaries and snapshot freshness/provenance labels.

## Phase 18F integration

Analytics repository boundaries prepare insight read boundaries, provenance disclosure, memory candidate boundary, and action readiness boundary without writing memory or executing actions.

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no Supabase client calls
- no fake analytics data
- no dashboard UI
- no analytics engine
- no memory writes
- no action execution
- no local Carnos runtime requirement

## Schema rule

Runtime implementation must not begin until the Phase 18B schema source map is consulted and real table/column mapping is confirmed.
