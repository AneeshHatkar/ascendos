# Phase 17G — Provenance + Confidence + Conflict Engine

## Purpose

Phase 17G adds the deterministic trust layer for Memory/RAG.

It scores memory trust from:

- source authority,
- confidence,
- evidence strength,
- source reliability,
- freshness,
- sensitivity,
- conflict metadata,
- review metadata.

It also creates local conflict previews using conflict signals and produces user-review requirements when resolution is ambiguous.

## Contract

The engine lives in:

- `src/lib/carnos-continuity/memory-provenance-confidence-conflict-engine.ts`

It exports:

- `scoreMemoryTrust`
- `assessMemoryConflict`
- `buildConflictKey`
- `createMemoryConflictGroupPreview`
- `summarizeMemoryProvenanceConfidenceConflicts`
- `getMemoryProvenanceConfidenceConflictBoundarySummary`

## Boundary

Allowed:

- deterministic TypeScript scoring,
- local conflict assessment,
- local conflict group preview,
- explicit warnings for stale/conflicting/sensitive memory,
- suggested primary/superseded memory IDs only when not ambiguous.

Not allowed:

- Supabase calls,
- repository implementation,
- SQL reads or writes,
- runtime retrieval,
- embedding generation,
- provider calls,
- vector search,
- Carnos prompt/context injection,
- background scanning,
- silent conflict resolution.

## Required behavior

- Blocked memory statuses return `blocked`.
- Superseded memory returns `superseded`.
- Equal-authority or ambiguous conflict returns `needs_user_review`.
- Blocking conflict signals require user review.
- Suggested supersession is only a preview, not a mutation.
- The engine must remain side-effect-free.

## Explicit audit markers

- No runtime retrieval
- No embedding generation
- No Carnos prompt/context injection
