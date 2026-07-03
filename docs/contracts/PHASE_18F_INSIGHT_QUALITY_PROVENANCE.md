# Phase 18F — Insight Quality + Provenance Contracts

Phase 18F defines insight quality and provenance contracts.

## Adds

- Insight Quality Levels
- Analytics Provenance
- Evidence item contracts
- insight claim type contracts
- observation claim type
- trend claim type
- comparison claim type
- correlation claim type
- experiment_readiness claim type
- lesson_candidate claim type
- recommendation_candidate claim type
- provenance source contracts
- disclosure requirement contracts
- action readiness boundary
- memory candidate boundary
- Carnos insight explanation limits
- correlation-not-causation guardrails
- no fake insight claims
- no confident causal claims

## Required quality levels

- high_confidence
- medium_confidence
- low_confidence
- insufficient_data
- invalid

## Required claim types

- observation
- trend
- comparison
- correlation
- experiment_readiness
- lesson_candidate
- recommendation_candidate

## Required provenance sources

- metric_registry
- analytics_snapshot
- self_experiment
- manual_note
- memory_context
- deterministic_fallback

## Required freshness states

- fresh
- cached
- stale
- partial
- missing
- unsynced

## Required disclosure requirements

- none
- disclose_cached_context
- disclose_stale_context
- disclose_unsynced_context
- disclose_partial_context
- disclose_deterministic_preview
- disclose_insufficient_data
- disclose_confounders
- avoid_causal_claims

## Required action readiness states

- not_actionable
- preview_only
- candidate_requires_review
- safe_to_suggest_without_write

## Validation rules

- insight id required
- user scoped insight required
- claim text required
- at least one evidence item required
- invalid evidence blocks insight
- insufficient data blocks confident insight
- correlation insight requires at least 7 matched data points
- trend insight requires at least 4 logged data points
- causality claims forbidden
- cached context disclosure
- stale context disclosure
- unsynced context disclosure
- partial context disclosure
- deterministic preview disclosure
- confounder disclosure
- Carnos must avoid causal claims
- Carnos must say there is not enough data for insufficient_data
- Carnos must disclose provenance limits

## Phase 18A-B integration

Insight quality contracts preserve:

- Supabase/Postgres as online source of truth
- IndexedDB or equivalent encrypted local cache as offline layer
- browser localStorage core-data ban
- cached insight context labels
- stale insight context labels
- unsynced local context labels
- deterministic offline fallback
- future sync queue boundary
- sensitive/private evidence disclosure
- Carnos cached/offline honesty

## Phase 18C integration

Insight quality uses metric quality levels, source modes, completeness scores, minimum data gates, and no high-confidence rules from the metric registry.

## Phase 18D integration

Insight quality uses analytics snapshot freshness, provenance, completeness, and cached/stale/unsynced disclosure rules.

## Phase 18E integration

Insight quality uses self-experiment readiness, confounder rules, lesson candidate boundaries, and no-proof/no-causal-claim limits.

## Local runtime integration

Phase 18F does not implement local Carnos runtime.

It prepares insight context so future local Carnos runtime can explain insights safely without pretending cached/offline/stale evidence is fresh.

## Boundary

- no schema writes
- no migrations
- no runtime SQL reads
- no Supabase client calls
- no fake insight data
- no dashboard UI
- no insight repository
- no memory writes
- no action creation
- no action execution
- no local Carnos runtime requirement
