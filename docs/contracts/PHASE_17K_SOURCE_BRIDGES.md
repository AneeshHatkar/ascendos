# Phase 17K — Current-Info / Document / Career / Research Source Bridges

Phase 17K adds deterministic source bridges for Current Info, Documents, Career, and Research.

The bridges convert eligible source records into Phase 17I retrieval-planning candidates. They are preview-only and do not perform runtime retrieval.

## Added

- `src/lib/carnos-continuity/source-bridge-retrieval-preview.ts`
- `SourceBridgeRecord`
- `SourceBridgeCandidatePreview`
- `SourceBridgeRetrievalPreviewResult`
- `bridgeSourceRecordToRetrievalCandidate`
- `bridgeSourceRecordsToRetrievalCandidates`
- `buildSourceBridgeRetrievalPreview`
- `buildCurrentInfoSourceBridgePreview`
- `buildDocumentSourceBridgePreview`
- `buildCareerSourceBridgePreview`
- `buildResearchSourceBridgePreview`
- `summarizeSourceBridgeRetrievalPreview`
- `getSourceBridgeRetrievalPreviewSummary`

## Required behavior

- current-info source bridge
- document source bridge
- career source bridge
- research source bridge
- source records to retrieval candidates
- uses Phase 17I retrieval planning
- bridged source candidates remain preview-only
- visible bridge reasons
- inactive source records excluded by default
- private source records excluded by default
- missing-text source records excluded by default
- low-confidence source records excluded when configured
- semantic retrieval remains deferred

## Boundary markers

- No runtime retrieval
- No memory_retrieval_events writes
- No embedding generation
- No semantic retrieval activation
- No provider calls
- No vector search
- No Supabase calls
- No SQL reads or writes
- No Carnos prompt/context injection
- No background scanning
