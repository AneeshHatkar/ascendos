# Phase 18H — Experiment Repository Boundaries

Phase 18H defines experiment repository boundaries.

## Adds

- Experiment repository boundaries
- experiment template lookup boundary
- experiment read boundary
- experiment draft capture preview boundary
- experiment measurement read boundary
- experiment confounder read boundary
- lesson summary read boundary
- memory candidate lesson read boundary
- experiment evaluation preview boundary
- offline experiment capture boundary
- sync queue readiness boundary
- source routing boundary
- cached experiment context boundary
- unsynced local experiment context boundary
- deterministic experiment preview boundary
- user scope validation boundary
- no fake experiment repository data boundary
- schema source map requirement before runtime implementation
- Carnos experiment repository explanation limits

## Required read intents

- template_lookup
- experiment_read
- draft_capture_preview
- measurement_read
- confounder_read
- lesson_summary_read
- memory_candidate_lesson_read
- evaluation_preview_read

## Required repository sources

- supabase_postgres_source_of_truth
- encrypted_offline_cache
- mixed_source_router
- unsynced_local_queue
- deterministic_empty_state

## Required capture modes

- read_only
- offline_capture_preview
- sync_queue_required
- online_runtime_required

## Required freshness labels

- fresh
- cached
- stale
- partial
- missing
- unsynced
- deterministic_preview

## Required capabilities

- read_experiment_templates
- read_experiment_records
- read_experiment_measurements
- read_experiment_confounders
- read_lesson_summaries
- read_memory_candidate_lessons
- read_evaluation_previews
- capture_offline_experiment_preview
- route_sync_queue_candidate
- label_source_mode
- validate_user_scope

## Validation rules

- repository id required
- user scoped repository required
- read intents required
- capabilities required
- template plans required
- Supabase/Postgres online source of truth required
- encrypted IndexedDB offline continuity layer required
- Phase 18B source map required before runtime implementation
- registered template plans only
- user scope required per template plan
- runtime reads not implemented in this boundary chunk
- runtime writes not implemented in this boundary chunk
- offline capture preview requires sync queue before write
- offline capture preview uses mixed source router
- fresh experiment data requires source-of-truth provenance
- unsynced local experiment context disclosure
- deterministic experiment preview disclosure

## Phase 18A-B integration

Experiment repository boundaries preserve:

- Supabase/Postgres as online source of truth
- IndexedDB or equivalent encrypted local cache as offline layer
- browser localStorage core-data ban
- offline experiment capture readiness
- cached experiment context labels
- unsynced local experiment labels
- deterministic preview disclosure
- future sync queue boundary
- sync queue required before write
- Carnos cached/offline honesty
- local Carnos runtime remains optional

## Phase 18E integration

Experiment repository boundaries use self-experiment templates, lifecycle readiness, source modes, confounder boundaries, lesson summary boundaries, and memory candidate lesson boundaries.

## Phase 18F integration

Experiment repository boundaries preserve insight quality, provenance disclosure, no-proof/no-causal-claim limits, memory candidate boundary, and action readiness boundary without writing memory or executing actions.

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no runtime data writes
- no Supabase client calls
- no fake experiment data
- no experiment evaluation engine
- no Self-Experiment Lab UI
- no sync queue implementation
- no memory writes
- no action execution
- no local Carnos runtime requirement

## Schema rule

Runtime implementation must not begin until the Phase 18B schema source map is consulted and real experiment table/column mapping is confirmed.
