# Phase 18J — Experiment Evaluation Engine

Phase 18J codes the deterministic self-experiment evaluation engine.

## Adds

- Experiment Evaluation Engine
- baseline vs active comparison
- measurement completeness scoring
- baseline completeness gate
- active-window completeness gate
- confounder penalty
- experiment validity states
- evaluation readiness states
- lesson candidate generation
- memory candidate boundary
- Carnos explanation limits
- no fake experiment data
- no memory writes
- no action execution

## Required evaluation statuses

- ready
- ready_with_warnings
- not_ready
- invalid

## Required validity states

- valid_result
- inconclusive
- insufficient_baseline
- insufficient_active_window
- too_many_confounders
- missing_measurements
- invalid

## Required outcome directions

- improved
- worsened
- unchanged
- inconclusive
- invalid

## Required lesson candidate types

- continue
- adjust
- stop
- repeat_with_better_measurement
- insufficient_data
- invalid

## Required confidence levels

- high
- medium
- low
- insufficient_data
- invalid

## Required source modes

- online_source_of_truth
- eligible_offline_cache
- mixed_online_offline
- unsynced_local
- deterministic_preview

## Required coded capabilities

- baseline vs active comparison
- measurement completeness scoring
- baseline completeness gate
- active-window completeness gate
- confounder penalty
- experiment validity states
- evaluation readiness states
- lesson candidate generation
- memory candidate boundary
- Carnos explanation limits
- no fake experiment data
- no memory writes
- no action execution

## Validation rules

- Experiment id is required
- Experiment template id is required
- Experiment metric id is required
- Experiment evaluation must be user scoped
- Experiment evaluation must not allow causal claims
- Experiment minimum baseline points must be at least 2
- Experiment minimum active points must be at least 2
- Expected baseline measurements must cover minimum baseline points
- Expected active measurements must cover minimum active points
- Experiment baseline window has insufficient data
- Experiment active window has insufficient data
- Experiment has missing expected measurements
- Experiment evaluation contains invalid or non-user-scoped measurement
- Experiment has confounder warnings
- Experiment has too many confounders for a clean result

## Phase 18E integration

The engine evaluates self-experiment baseline and active-window data while preserving invalid experiment states, confounder tracking, lesson summary boundaries, and memory candidate lesson boundaries.

## Phase 18F integration

The engine emits insight quality levels, disclosure requirements, no-proof/no-causality limits, and Carnos explanation limits.

## Phase 18I integration

The engine reuses deterministic comparison logic from the trend/correlation/comparison engine.

## Phase 18A-B integration

The engine preserves cached/offline honesty:

- cached context disclosure
- unsynced context disclosure
- partial context disclosure
- deterministic preview disclosure
- confounder disclosure
- no causality claim boundary
- sync queue remains future boundary
- local Carnos runtime remains optional

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no runtime data writes
- no Supabase client calls
- no fake experiment data
- no sync queue implementation
- no memory writes
- no action execution
- no local Carnos runtime requirement
