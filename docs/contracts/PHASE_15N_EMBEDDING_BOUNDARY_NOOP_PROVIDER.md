# Phase 15N — Embedding Boundary / Noop Provider

Status: Implemented as a disabled-by-design preview boundary.

## Scope

Phase 15N adds the Embedding Boundary / Noop Provider layer.

It defines:

- embedding boundary
- noop provider
- disabled by design
- no embeddings generated
- no provider calls
- no vector search
- no pgvector
- no SQL reads or writes
- no Supabase calls
- no hidden Carnos prompt injection
- standalone /memory route remains absent

## What exists

- Local TypeScript boundary contract
- NoopEmbeddingProvider result shape
- Future candidate preview refs
- Visible `/knowledge` boundary panel
- Audit gate

## What does not exist

- Real embedding generation
- Runtime retrieval
- Provider-backed embedding calls
- SQL runtime reads or writes
- Vector search
- pgvector setup
- Hidden Carnos memory injection
- Standalone `/memory` route

## Next phase

Phase 15O — Forget/Delete Derived Records.
