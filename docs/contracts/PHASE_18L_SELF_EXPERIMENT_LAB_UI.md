# Phase 18L — Self-Experiment Lab UI

Phase 18L codes the self-experiment lab UI surface and safe view model.

## Adds

- self-experiment lab view model
- self-experiment lab UI component
- analytics route integration
- experiment template library section
- experiment draft review section
- baseline window section
- active window section
- measurement plan section
- confounder review section
- readiness review section
- lesson candidate section
- memory review boundary section
- privacy boundary section
- empty state
- loading state
- error state
- privacy restricted state
- review required state
- review-before-memory-write boundary
- no hardcoded experiment data

## Route integration

- /analytics

The self-experiment lab is integrated into the existing analytics route without breaking Phase 5 route requirements.

## Required sections

- template_library
- experiment_draft
- baseline_window
- active_window
- measurement_plan
- confounder_review
- readiness_review
- lesson_candidates
- memory_review_boundary
- privacy_boundary

## Required UI states

- ready
- empty
- loading
- error
- privacy_restricted
- review_required

## Required source states

- fresh
- cached
- stale
- partial
- missing
- unsynced
- deterministic_preview

## Required readiness states

- ready
- ready_with_warnings
- not_ready
- invalid
- review_required

## Required action boundaries

- preview_only
- review_required_before_write
- write_disabled
- execution_disabled

## Phase 18E integration

The lab exposes self-experiment template, baseline, active-window, confounder, readiness, and lesson candidate surfaces.

## Phase 18J integration

The lab exposes experiment readiness and lesson candidate review surfaces without executing writes.

## Phase 18A-B integration

The lab preserves companion persistence and offline honesty:

- cached context disclosure
- stale context disclosure
- partial context disclosure
- unsynced context disclosure
- deterministic preview disclosure
- insufficient data disclosure
- privacy restricted state
- review-before-memory-write boundary
- no localStorage core-data path
- local Carnos runtime remains optional

## Boundary

- no schema writes
- no runtime SQL reads
- no Supabase client calls
- no experiment writes
- no hardcoded experiment values
- no fake experiment data
- no memory writes
- no action execution
- no local Carnos runtime requirement
