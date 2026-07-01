# Phase 15O — Forget/Delete Derived Records Contract

Status: Complete.

Phase 15O adds the **Forget/Delete Derived Records** contract for Carnos Persistent Memory + Continuity.

Required locked markers:
- Forget/Delete Derived Records
- forget request contract
- derived records inventory
- delete derived records preview
- memory_forgotten audit event preview
- derived_records_deleted audit event preview
- embedding_removed audit event preview
- no destructive delete
- no SQL reads or writes
- no Supabase calls
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- standalone /memory route remains absent
- Phase 15P — Memory Audit Events + Memory Usage Transparency

## Scope

This phase defines how ascendOS will later handle memory forgetting safely:

1. A forget request contract.
2. A derived records inventory.
3. A delete derived records preview.
4. Audit event previews for `memory_forgotten`, `derived_records_deleted`, and `embedding_removed`.
5. A visible `/privacy` panel.

## Protected boundary

Phase 15O does not execute deletion. It does not write SQL, call Supabase, create embeddings, remove real embeddings, run vector search, call providers, retrieve hidden memory, or inject hidden Carnos prompt context.

Source-of-truth memory requires manual reconciliation and cannot be silently deleted.

## Next phase

Phase 15P — Memory Audit Events + Memory Usage Transparency.
