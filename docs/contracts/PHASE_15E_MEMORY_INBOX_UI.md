# Phase 15E — Memory Inbox UI Contract

Status: Complete.

Phase 15E adds the Memory Inbox UI preview surface for Carnos Persistent Memory + Continuity.

## Purpose

The Memory Inbox UI renders reviewable memory candidate previews created by the Phase 15D Memory Candidate Engine.

It displays:

- candidate title and content
- memory type
- domain scope
- sensitivity
- status
- source/provenance preview
- confidence
- priority
- private mode blocks
- do-not-remember blocks
- duplicate hints
- conflict hints
- disabled review controls

## Required controls

The UI must visibly include disabled controls for:

- approve disabled
- edit disabled
- reject disabled
- archive disabled
- forget disabled
- mark sensitive disabled
- merge disabled
- resolve conflict disabled

## Protected boundary

Phase 15E does not approve, save, retrieve, embed, inject, or execute memory.

It does not call Supabase.
It does not call OpenAI/providers.
It does not create a standalone `/memory` route.
It does not add SQL migrations.
It does not create memory_items.
It does not create memory_embeddings.
It does not use pgvector.
It does not perform automatic transcript-to-memory.
It does not perform hidden Carnos prompt injection.
It does not mutate do-not-remember rules.

## Next phase

Phase 15F — Privacy, Private Mode, Do-Not-Remember Rules.

## Exact Phase 15E protected markers

- no approval
- no persistence
- no retrieval
- no embeddings
- no provider calls
- no Supabase
- Phase 15F
