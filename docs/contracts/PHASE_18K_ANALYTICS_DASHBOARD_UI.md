# Phase 18K — Analytics Dashboard UI

Phase 18K codes the analytics dashboard UI surface and chart-ready view model.

## Adds

- analytics dashboard route
- analytics dashboard UI component
- chart-ready view model
- metric quality section
- snapshot section
- trend/comparison/correlation section
- experiment readiness section
- Carnos disclosure section
- privacy boundary section
- empty state
- loading state
- error state
- privacy restricted state
- no hardcoded analytics data

## Route

- /analytics

## Required sections

- snapshot
- metric_quality
- trend_comparison_correlation
- experiment_readiness
- carnos_disclosure
- privacy_boundary

## Required UI states

- ready
- empty
- loading
- error
- privacy_restricted

## Required source states

- fresh
- cached
- stale
- partial
- missing
- unsynced
- deterministic_preview

## Required chart kinds

- line
- bar
- scorecard
- comparison
- correlation
- experiment_status

## Phase 18C integration

The dashboard has a metric quality section and chart-ready cards that can receive future metric quality data.

## Phase 18D integration

The dashboard has a snapshot section and source-aware snapshot states.

## Phase 18I integration

The dashboard has trend, comparison, and correlation chart surfaces.

## Phase 18J integration

The dashboard has experiment readiness chart surfaces.

## Phase 18A-B integration

The dashboard preserves cached/offline honesty:

- cached context disclosure
- stale context disclosure
- partial context disclosure
- unsynced context disclosure
- deterministic preview disclosure
- insufficient data disclosure
- privacy restricted state
- no localStorage core-data path
- local Carnos runtime remains optional

## Boundary

- no schema writes
- no runtime SQL reads
- no Supabase client calls
- no hardcoded analytics values
- no fake analytics data
- no memory writes
- no action execution
- no local Carnos runtime requirement
