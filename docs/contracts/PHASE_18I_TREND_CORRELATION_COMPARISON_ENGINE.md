# Phase 18I — Trend / Correlation / Comparison Engine

Phase 18I codes the deterministic analytics engine for trends, comparisons, and correlations.

## Adds

- Trend / Correlation / Comparison Engine
- trend direction classification
- trend slope scoring
- volatility detection
- comparison window evaluation
- percent change calculation
- correlation coefficient calculation
- correlation strength classification
- minimum data gates
- confidence classification
- disclosure requirement generation
- correlation-not-causation guardrails
- Carnos explanation limits
- no causality claim boundary

## Required engine modes

- trend
- comparison
- correlation

## Required trend directions

- increasing
- decreasing
- stable
- volatile
- insufficient_data
- invalid

## Required comparison directions

- up
- down
- unchanged
- insufficient_data
- invalid

## Required correlation directions

- positive
- negative
- none
- insufficient_data
- invalid

## Required correlation strengths

- strong
- moderate
- weak
- none
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

- trend direction classification
- trend slope scoring
- volatility detection
- comparison window evaluation
- percent change calculation
- correlation coefficient calculation
- correlation strength classification
- minimum data gates
- confidence classification
- disclosure requirement generation
- correlation-not-causation guardrails
- Carnos explanation limits

## Validation rules

- Trend metric id is required
- Trend analysis must be user scoped
- Trend analysis must not allow causal claims
- Trend minimum data points must be at least 2
- Trend analysis has insufficient data
- Comparison metric id is required
- Comparison analysis must be user scoped
- Comparison analysis must not allow causal claims
- Comparison minimum data points per window must be at least 2
- Correlation primary metric id is required
- Correlation secondary metric id is required
- Correlation metrics must be different
- Correlation analysis must be user scoped
- Correlation analysis must not allow causal claims
- Correlation minimum matched data points must be at least 7
- Correlation analysis has insufficient matched data

## Phase 18F integration

The engine emits insight quality levels, confidence labels, disclosure requirements, and Carnos explanation limits.

## Phase 18G integration

The engine depends on repository boundary output supplied by future repository runtime code, but does not read repositories directly.

## Phase 18H integration

The engine can be reused by the future experiment evaluation engine, but it does not evaluate experiments or write experiment records.

## Phase 18A-B integration

The engine preserves cached/offline honesty:

- cached context disclosure
- unsynced context disclosure
- partial context disclosure
- deterministic preview disclosure
- confounder disclosure
- no causality claim boundary
- local Carnos runtime remains optional

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no Supabase client calls
- no fake analytics data
- no memory writes
- no action execution
- no local Carnos runtime requirement
