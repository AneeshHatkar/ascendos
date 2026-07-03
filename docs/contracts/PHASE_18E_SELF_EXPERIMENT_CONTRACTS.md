# Phase 18E — Self-Experiment Contracts + Validators

Phase 18E defines self-experiment contracts and validators.

## Adds

- Self-Experiment Lab foundation
- experiment templates
- before/during/after lifecycle states
- draft state
- planned state
- baseline state
- active state
- paused state
- completed state
- reviewed state
- archived state
- invalid state
- baseline tracking
- active-period tracking
- measurement requirements
- confounder tracking
- invalid experiment states
- lesson summary foundation
- lessons learned system foundation
- memory candidate lesson boundary
- experiment evaluation readiness
- Carnos experiment explanation limits
- no confident causal claims when confounders exist

## Required lifecycle states

- draft
- planned
- baseline
- active
- paused
- completed
- reviewed
- archived
- invalid

## Required evaluation readiness states

- ready
- ready_with_warnings
- not_ready
- invalid

## Required source modes

- online_source_of_truth
- eligible_offline_cache
- mixed_online_offline
- unsynced_local
- deterministic_preview

## Required templates

- sleep_reset_experiment
- career_sprint_experiment
- learning_consistency_experiment
- fitness_consistency_experiment

## Validation rules

- registered primary metric
- registered supporting metrics
- baseline range required before experiment evaluation
- active range required before experiment evaluation
- minimum baseline days
- minimum active days
- minimum measurements
- high severity confounder warning
- insufficient measurement data blocks readiness
- invalid measurement quality blocks readiness
- reviewed experiment requires lesson summary
- memory candidate requires lesson summary
- unsynced local context must be disclosed
- cached experiment context must be disclosed
- deterministic preview context must be disclosed
- Carnos must avoid proof/causal claims

## Phase 18A-B integration

Self-experiment contracts preserve:

- Supabase/Postgres as online source of truth
- IndexedDB or equivalent encrypted local cache as offline layer
- browser localStorage core-data ban
- offline experiment capture readiness
- unsynced local experiment labels
- cached experiment context labels
- sensitive/private experiment labels
- future sync queue boundary
- deterministic offline fallback

## Local runtime integration

Phase 18E does not implement local Carnos runtime.

It prepares experiment context so future local Carnos runtime can explain experiments safely without claiming proof or causation.

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no Supabase client calls
- no fake experiment data
- no experiment UI
- no experiment repository
- no memory writes
- no action creation
- no local Carnos runtime requirement
