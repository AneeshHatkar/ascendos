# Phase 18M-B — Local Carnos Runtime Boundary + Offline AI Adapter

Phase 18M-B codes the optional local Carnos runtime boundary and offline AI adapter contract.

## Adds from Phase 18

- local Carnos runtime boundary
- offline AI adapter contract
- optional local runtime mode
- runtime unavailable mode
- runtime disabled mode
- deterministic fallback mode
- analytics explanation adapter request contract
- analytics explanation adapter response contract
- safe local-runtime capability flags
- model-not-required CI boundary
- no model install requirement
- no runtime health call
- no network call
- no model generation call
- no streaming call
- no embedding call
- no vector search
- no memory writes
- no action execution
- no Supabase calls
- no schema writes
- no fake analytics data
- no fake experiment conclusions

## Adds from Phase 18A-B

- Option C local AI server/runtime boundary
- future localhost-compatible runtime path
- future MLX-compatible runtime path
- future llama.cpp-compatible runtime path
- future Tauri sidecar-compatible runtime path
- browser-only fallback is limited
- offline companion can use deterministic guidance when runtime unavailable
- cached context disclosure remains required
- unsynced context disclosure remains required
- deterministic preview disclosure remains required
- local/offline context is not online source of truth
- Carnos must not pretend offline output is live/current info
- Carnos must not claim sync completed from unsynced context
- local runtime remains optional during CI/build/checks
- review-before-memory-write remains preserved
- action execution remains disabled

## Runtime modes

- disabled
- unavailable
- deterministic_fallback
- local_runtime_ready
- future_sidecar_ready

## Adapter kinds

- none
- deterministic_adapter
- localhost_compatible_future
- mlx_compatible_future
- llama_cpp_compatible_future
- tauri_sidecar_future

## Readiness states

- not_required
- not_configured
- available_for_future_use
- blocked_by_policy
- disabled_for_ci

## Offline disclosures

- offline_runtime_not_required
- offline_runtime_unavailable
- deterministic_fallback_used
- cached_context_must_be_disclosed
- unsynced_context_must_be_disclosed
- local_context_is_not_online_source_of_truth
- current_info_unavailable_offline
- memory_write_disabled
- action_execution_disabled

## Phase 18M integration

The adapter consumes the Carnos analytics explanation plan and preserves its no-proof, no-causality, review-before-write, and privacy boundaries.

## Boundary

- no schema writes
- no runtime SQL reads
- no Supabase client calls
- no network calls
- no model calls
- no streaming
- no embedding calls
- no vector search
- no runtime install requirement
- no runtime health call
- no fake analytics data
- no fake experiment conclusions
- no memory writes
- no action execution
- no local Carnos runtime requirement during checks
