# Phase 15Q — Cross-Domain Integration Preview

Status: Locked preview contract.

Phase 15Q adds a preview-only cross-domain memory integration map for ascendOS + Carnos.

## Scope

Phase 15Q documents and previews:

- cross-domain memory visibility
- whole-project connectivity
- memory_used_in_context_pack
- memory_used_in_carnos_response
- visible memory usage ledger
- hidden memory usage blocked
- source-of-truth hierarchy visible
- private mode can block
- do-not-remember can block
- Carnos / Command / Privacy / Knowledge integration
- Goals / Career / Body / Grimoire visibility previews

## Boundaries

Phase 15Q does not implement runtime memory behavior.

Protected boundaries:

- no SQL reads or writes
- no Supabase calls
- no persistence
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- no action execution
- no standalone /memory route

## Required surfaces

- `/carnos` shows the cross-domain integration preview.
- `/privacy` remains the memory control surface.
- `/knowledge` remains the knowledge-vault and retrieval-boundary surface.
- No standalone `/memory` route is added.

## Next phase

Phase 15R — Final Audit, Smoke Checklist, Completion Report.
