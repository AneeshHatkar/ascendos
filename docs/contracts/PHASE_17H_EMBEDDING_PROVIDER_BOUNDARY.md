# Phase 17H — Embedding Provider Boundary

## Purpose

Phase 17H adds the official Memory/RAG embedding provider boundary for ascendOS + Carnos.

This phase defines how approved memory and knowledge records may be evaluated for future embedding support without pretending that semantic retrieval is active.

## Contract markers

- Phase 17H
- Embedding Provider Boundary
- NoopMemoryEmbeddingProvider
- memory_embedding_records previews may describe deferred metadata only
- noop provider cannot return generated embeddings
- semantic retrieval remains deferred
- No runtime retrieval
- No embedding generation
- No fake vectors
- No provider calls
- No vector search
- No Supabase calls
- No SQL reads or writes
- No Carnos prompt/context injection
- No background queue execution

## What this phase adds

- A typed embedding provider boundary.
- A noop embedding provider result.
- Deterministic request evaluation.
- Deferred memory embedding record previews.
- Validation against the Phase 17D Memory/RAG schema contracts.
- Explicit blocked reasons for missing approval, sensitive records, invalid sources, deferred runtime, and forbidden fake vectors.

## What this phase does not add

- Runtime retrieval.
- Real embedding generation.
- Real provider activation.
- Vector search.
- SQL reads.
- SQL writes.
- Supabase calls.
- API routes.
- UI routes.
- Carnos context injection.
- Background queue execution.
- Fake semantic vectors.

## Safety rule

A deferred embedding metadata preview is not an embedding. Carnos must never claim semantic memory retrieval is active while this boundary remains noop/deferred.
