# Phase 18D — Analytics Snapshot Contracts + Validators

Phase 18D defines analytics snapshot contracts and validators.

## Adds

- Analytics Snapshot System foundation
- snapshot contract types
- snapshot metric value types
- snapshot range types
- snapshot freshness labels
- snapshot provenance modes
- snapshot export readiness states
- snapshot validation results
- snapshot completeness summary
- snapshot quality summary
- comparison eligibility rule
- Carnos snapshot explanation limits
- cached/stale/unsynced disclosure rules
- time range validation
- registered metric validation
- no high confidence with confounders
- no high confidence with unsynced records
- no high confidence with stale cached snapshots

## Required snapshot ranges

- daily
- weekly
- monthly
- rolling

## Required freshness states

- fresh
- cached
- stale
- partial
- missing

## Required provenance modes

- online_source_of_truth
- eligible_offline_cache
- mixed_online_offline
- deterministic_preview

## Required export readiness states

- export_ready
- export_ready_with_warnings
- not_export_ready

## Phase 18A-B integration

Snapshot contracts preserve:

- Supabase/Postgres as online source of truth
- IndexedDB or equivalent encrypted local cache as offline layer
- browser localStorage core-data ban
- cached data labels
- stale data labels
- unsynced local record labels
- stricter sensitive/restricted metric handling
- Carnos honesty about cached/stale/offline context
- deterministic offline fallback

## Local runtime integration

Phase 18D does not implement local Carnos runtime.

It prepares snapshot context so future local Carnos runtime can explain cached snapshots safely without claiming fresh live data.

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no Supabase client calls
- no fake snapshot data
- no dashboard UI
- no local Carnos runtime requirement
- no memory writes
- no action creation
