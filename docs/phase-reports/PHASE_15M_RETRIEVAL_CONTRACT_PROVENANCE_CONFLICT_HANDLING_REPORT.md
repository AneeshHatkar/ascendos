# Phase 15M — Retrieval Contract + Provenance + Conflict Handling Report

Status: Complete.

## Completed

Phase 15M added a preview-only retrieval contract layer:

- `src/lib/carnos-continuity/retrieval-contract.ts`
- `src/components/dashboard/retrieval-contract-panel.tsx`
- `/knowledge` panel integration
- audit gate
- contract document
- QA checklist

## What the implementation shows

The implementation exposes:

- Retrieval Contract + Provenance + Conflict Handling
- retrieval contract
- provenance required
- conflict handling
- source authority
- visible source labels
- allowed retrieval surfaces
- blocked retrieval reasons
- memory retrieval remains preview-only
- knowledge retrieval remains preview-only

## Protected boundary

No runtime retrieval was implemented.

Phase 15M keeps these blocked:

- no SQL reads or writes
- no Supabase calls
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- no standalone `/memory` route

## Next

Phase 15N — Embedding Boundary / Noop Provider.

- standalone /memory route remains absent.
