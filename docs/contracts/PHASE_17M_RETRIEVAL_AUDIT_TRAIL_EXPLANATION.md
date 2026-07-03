# Phase 17M — Retrieval Audit Trail + Retrieval Explanation

Phase 17M adds a deterministic retrieval audit trail and retrieval explanation preview layer.

It explains Phase 17I retrieval-plan outputs and Phase 17L Carnos memory context-pack outputs. It does not persist audit events and does not write `memory_retrieval_events`.

## Added

- `src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts`
- `RetrievalAuditTrailEvent`
- `RetrievalExplanationSummary`
- `RetrievalAuditTrailPreviewResult`
- `buildRetrievalAuditTrailExplanation`
- `summarizeRetrievalAuditTrailExplanation`
- `getRetrievalAuditTrailExplanationSummary`

## Required behavior

- retrieval audit trail preview
- retrieval explanation preview
- visible retrieval explanations
- visible inclusion reasons
- visible exclusion reasons
- visible budget reasons
- visible dedupe reasons
- visible safety reasons
- uses Phase 17I retrieval planning outputs
- uses Phase 17L context pack outputs
- memory_retrieval_events persistence remains deferred

## Boundary markers

- No memory_retrieval_events writes
- No runtime retrieval
- No embedding generation
- No semantic retrieval activation
- No provider calls
- No vector search
- No Supabase calls
- No SQL reads or writes
- No Carnos prompt/context injection
- No background scanning
