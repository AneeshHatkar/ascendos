# Phase 18N — Anti-Demo-Data + Privacy/Sensitivity Audit

Phase 18N adds the anti-demo-data and privacy/sensitivity audit for Phase 18 analytics and experiments.

## Adds from Phase 18

- anti-demo-data audit
- anti-fake-analytics audit
- anti-fake-experiment audit
- analytics privacy/sensitivity audit
- self-experiment privacy/sensitivity audit
- Carnos explanation privacy/sensitivity audit
- local runtime privacy/sensitivity audit
- source-state disclosure audit
- cached context disclosure audit
- stale context disclosure audit
- partial context disclosure audit
- missing context disclosure audit
- unsynced context disclosure audit
- deterministic preview disclosure audit
- no-causality claim audit
- no-proof claim audit
- review-before-memory-write audit
- no action execution audit
- no model-call audit
- no network-call audit
- no Supabase-runtime-call audit
- no schema-write audit
- no embeddings/vector-search audit
- no local-runtime-required audit

## Adds from Phase 18A-B

- cached context must be disclosed
- stale context must be disclosed
- partial context must be disclosed
- missing context must be disclosed
- unsynced local context must be disclosed
- deterministic preview must be disclosed
- offline context is not live/current info
- local/offline context is not online source of truth
- unsynced context is not synced context
- privacy-restricted context must be blocked or explicitly represented
- review-before-memory-write remains required
- action execution remains disabled
- local runtime remains optional during CI/build/checks
- Option C local runtime boundary remains future-compatible

## Audited domains

- analytics_snapshot
- metric_quality
- trend_comparison_correlation
- self_experiment
- experiment_evaluation
- carnos_explanation
- local_runtime_adapter
- memory_candidate
- privacy_boundary

## Boundary

- no database read/write
- no new SQL migration
- no Supabase client
- no local model call
- no cloud model call
- no embedding call
- no vector search
- no memory write
- no action execution
