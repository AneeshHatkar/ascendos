# Phase 15P — Memory Audit Events + Memory Usage Transparency

Status: Implemented as preview-only contract.

Phase 15P adds a visible memory audit and memory usage transparency layer for Carnos continuity.

Required markers:

- Phase 15P
- Memory Audit Events + Memory Usage Transparency
- memory audit event contract
- memory usage transparency
- memory_events preview
- memory_usage_logs preview
- candidate_created
- memory_forgotten
- memory_used_in_context_pack
- memory_used_in_carnos_response
- private_mode_enabled
- conflict_detected
- stale_memory_detected
- visible memory usage ledger
- hidden memory usage blocked
- no SQL reads or writes
- no Supabase calls
- no persistence
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- standalone `/memory` route
- Phase 15Q — Cross-Domain Integration Preview

## Contract

Phase 15P defines preview records for:

1. Audit events that would later write to `memory_events`.
2. Usage transparency rows that would later write to `memory_usage_logs`.
3. Visible explanations for context-pack memory usage.
4. Visible explanations for Carnos-response memory usage.
5. Redacted/private-mode event summaries.
6. Hidden memory usage blocking.

## Boundary

Phase 15P does not persist audit rows or usage rows. It does not read or write SQL, call Supabase, generate embeddings, run vector search, call providers, or inject hidden Carnos prompt context.

The only UI surface wired in this phase is `/privacy`.

Next: Phase 15Q — Cross-Domain Integration Preview.
- standalone /memory route remains forbidden in Phase 15P.
