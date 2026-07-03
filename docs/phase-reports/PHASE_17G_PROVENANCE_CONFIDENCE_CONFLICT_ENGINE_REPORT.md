# Phase 17G — Provenance + Confidence + Conflict Engine Report

## Summary

Phase 17G added a deterministic provenance, confidence, and conflict engine for Memory/RAG.

## Added

- `memory-provenance-confidence-conflict-engine.ts`
- trust scoring from source authority, confidence, evidence strength, source reliability, freshness, sensitivity, conflict state, and review state
- pairwise conflict assessment
- conflict group preview generation
- blocked, needs-review, and superseded summaries
- boundary summary export
- Phase 17G contract, report, smoke checklist, and audit

## Preserved boundaries

This phase does not:

- call Supabase,
- implement repositories,
- read or write SQL,
- retrieve memories at runtime,
- generate embeddings,
- call providers,
- run vector search,
- inject Carnos context,
- scan in the background,
- silently resolve conflicts.

## Verification

Required verification:

- `npm run audit:phase17g`
- `npm run check`
