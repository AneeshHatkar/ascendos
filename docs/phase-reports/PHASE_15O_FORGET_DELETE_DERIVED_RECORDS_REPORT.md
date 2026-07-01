# Phase 15O — Forget/Delete Derived Records Report

Status: Complete.

Implemented Phase 15O as a preview-only forget/delete-derived-records layer.

## Completed scope

- Added forget request contract.
- Added derived records inventory.
- Added delete derived records preview.
- Added `memory_forgotten audit event preview`.
- Added `derived_records_deleted audit event preview`.
- Added `embedding_removed audit event preview`.
- Added visible `/privacy` panel.
- Added audit gate.

## Protected boundary

- no destructive delete
- no SQL reads or writes
- no Supabase calls
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- no standalone /memory route

## Notes

Phase 15O does not delete records. It makes deletion consequences visible before future runtime deletion exists.

Source-of-truth records require manual reconciliation.

## Next phase

Phase 15P — Memory Audit Events + Memory Usage Transparency.
