# Phase 18M — Carnos Analytics Explanation Boundary

Phase 18M codes the deterministic Carnos analytics explanation boundary.

## Adds from Phase 18

- Carnos analytics explanation boundary
- allowed explanation modes
- blocked explanation modes
- trend explanation limits
- comparison explanation limits
- correlation explanation limits
- self-experiment explanation limits
- experiment lesson explanation limits
- metric quality explanation limits
- snapshot freshness explanation limits
- confidence and uncertainty wording rules
- evidence gap wording rules
- missing data wording rules
- no-proof boundary
- no-causality boundary
- no medical/financial/legal certainty boundary
- no automatic recommendation boundary
- no automatic memory-write boundary
- no action execution boundary
- review-before-memory-write boundary
- source-aware disclosure requirements
- safe Carnos response template contract
- no fake analytics data
- no fake experiment conclusions

## Adds from Phase 18A-B

- cached context disclosure
- stale context disclosure
- partial context disclosure
- missing context disclosure
- unsynced local context disclosure
- deterministic preview disclosure
- Carnos must not pretend offline context is live
- Carnos must not infer unavailable current info
- Carnos must not claim sync completed if data is unsynced
- Carnos must not treat local/offline context as online source of truth
- privacy restricted context is blocked
- future local runtime remains optional
- review-before-write is preserved

## Subjects

- metric_quality
- snapshot_freshness
- trend
- comparison
- correlation
- self_experiment
- experiment_lesson
- memory_candidate
- privacy_boundary

## Modes

- safe_summary
- uncertainty_summary
- evidence_gap_summary
- cached_context_summary
- unsynced_context_summary
- deterministic_preview_summary
- review_required_summary
- blocked

## Source states

- online_source_of_truth
- eligible_offline_cache
- mixed_online_offline
- unsynced_local
- deterministic_preview
- missing
- privacy_restricted

## Claim boundaries

- observation_only
- trend_not_proof
- correlation_not_causation
- experiment_not_causal_proof
- lesson_candidate_not_memory
- recommendation_requires_review
- action_requires_confirmation
- blocked_due_to_missing_data
- blocked_due_to_privacy

## Phase 18F integration

The boundary consumes quality levels and disclosure requirements from the insight quality/provenance contract.

## Phase 18I integration

Trend, comparison, and correlation explanations are allowed only as bounded observational summaries.

## Phase 18J integration

Experiment evaluation and lesson explanations are candidate summaries only, not proof and not memory writes.

## Phase 18K integration

Analytics dashboard explanations must disclose source state, freshness, missing data, and privacy limits.

## Phase 18L integration

Self-experiment lab explanations must preserve review-before-memory-write and disabled action boundaries.

## Boundary

- no schema writes
- no runtime SQL reads
- no Supabase client calls
- no model calls
- no fake analytics data
- no fake experiment conclusions
- no memory writes
- no action execution
- no local Carnos runtime requirement
- no causality claims
- no proof claims
