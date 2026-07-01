# Phase 15Q — Cross-Domain Integration Preview Smoke Checklist

Manual checks:

- `/carnos` renders the Cross-Domain Integration Preview panel.
- Panel shows cross-domain memory visibility.
- Panel shows whole-project connectivity.
- Panel shows memory_used_in_context_pack.
- Panel shows memory_used_in_carnos_response.
- Panel shows visible memory usage ledger.
- Panel states hidden memory usage blocked.
- Panel states source-of-truth hierarchy visible.
- Panel states private mode can block.
- Panel states do-not-remember can block.
- Panel states no SQL reads or writes.
- Panel states no Supabase calls.
- Panel states no persistence.
- Panel states no embeddings.
- Panel states no vector search.
- Panel states no provider calls.
- Panel states no hidden Carnos prompt injection.
- Panel states no standalone /memory route.
- No `/memory` route exists.
- `npm run audit:phase15q` passes.
- `npm run build` passes.
- `npm run check` passes.

Next phase: Phase 15R — Final Audit, Smoke Checklist, Completion Report.
