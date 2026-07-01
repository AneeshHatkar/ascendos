# Phase 15R — Carnos Persistent Memory + Continuity Final Smoke Checklist

Status: Complete pending final manual review.

## Required command checks

- [ ] `npm run audit:phase15r` passes.
- [ ] `npm run build` passes.
- [ ] `npm run check` passes.
- [ ] Production build still lists `/carnos`, `/privacy`, and `/knowledge`.
- [ ] Existing lint warnings remain warnings only, with no errors.

## Required route checks

Visit:

- [ ] `/carnos`
- [ ] `/privacy`
- [ ] `/knowledge`

Expected:

- [ ] `/carnos` loads Carnos memory visibility surfaces.
- [ ] `/carnos` loads cross-domain memory integration preview.
- [ ] `/privacy` loads forget/delete derived records preview.
- [ ] `/privacy` loads memory audit usage transparency preview.
- [ ] `/knowledge` loads knowledge vault foundation preview.
- [ ] `/knowledge` loads retrieval contract preview.
- [ ] `/knowledge` loads embedding boundary / noop provider preview.

## Required boundary checks

- [ ] No standalone /memory route exists.
- [ ] No standalone RAG route exists.
- [ ] No vector-search route exists.
- [ ] No SQL reads or writes in preview runtime files.
- [ ] No Supabase calls in preview runtime files.
- [ ] No persistence from preview panels.
- [ ] No embeddings generated.
- [ ] No vector search.
- [ ] No pgvector.
- [ ] No `memory_embeddings` table.
- [ ] No provider calls.
- [ ] No hidden Carnos prompt injection.
- [ ] No automatic transcript-to-memory.
- [ ] No silent memory.
- [ ] No destructive forget/delete operation is wired.
- [ ] No direct proposed-action execution is wired from memory preview files.

## Phase 15 completed scope check

- [ ] Phase 15A scope lock exists.
- [ ] Phase 15B SQL foundation exists.
- [ ] Phase 15C type/schema/conflict contracts exist.
- [ ] Phase 15D memory candidate engine exists.
- [ ] Phase 15E Memory Inbox UI exists.
- [ ] Phase 15F privacy/private-mode/do-not-remember rules exist.
- [ ] Phase 15G approved-memory read layer exists.
- [ ] Phase 15H Carnos entity state exists.
- [ ] Phase 15I project/system state memory exists.
- [ ] Phase 15J current context pack builder exists.
- [ ] Phase 15K Carnos memory visibility panel exists.
- [ ] Phase 15L knowledge vault foundation exists.
- [ ] Phase 15M retrieval contract exists.
- [ ] Phase 15N embedding boundary/noop provider exists.
- [ ] Phase 15O forget/delete derived records preview exists.
- [ ] Phase 15P memory audit events + usage transparency exists.
- [ ] Phase 15Q cross-domain integration preview exists.
- [ ] Phase 15R final audit, smoke checklist, and completion report exist.

## Final status

Phase 15R closes the Carnos Persistent Memory + Continuity Foundation and prepares the repo for Phase 16.
