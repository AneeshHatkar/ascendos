# Phase 17M Retrieval Audit Trail + Retrieval Explanation Report

Phase 17M added deterministic preview-only retrieval audit trail and explanation builders.

## Implemented

- retrieval audit trail event types
- retrieval explanation summary types
- included candidate explanation
- excluded candidate explanation
- budget explanation
- dedupe explanation
- sensitive/conflict safety explanation
- context pack section explanation
- context pack item explanation
- memory_retrieval_events write deferral marker
- no persistence boundary

## Verification

Run `npm run audit:phase17m` and `npm run check`.

## Boundary

No memory_retrieval_events writes, no runtime retrieval, no embedding generation, no semantic retrieval activation, no provider calls, no vector search, no Supabase calls, no SQL reads/writes, no Carnos prompt/context injection, and no background scanning were added.
