# Phase 17J — Knowledge Vault Retrieval Bridge

Phase 17J adds a deterministic Knowledge Vault Retrieval Bridge.

The bridge converts eligible Knowledge Vault records into Phase 17I retrieval-planning candidates. It is preview-only and does not perform runtime retrieval.

## Added

- `src/lib/carnos-continuity/knowledge-vault-retrieval-bridge.ts`
- `KnowledgeVaultBridgeItem`
- `KnowledgeVaultBridgedCandidate`
- `KnowledgeVaultRetrievalBridgeResult`
- `bridgeKnowledgeVaultItemToRetrievalCandidate`
- `bridgeKnowledgeVaultItemsToRetrievalCandidates`
- `buildKnowledgeVaultRetrievalBridge`
- `summarizeKnowledgeVaultRetrievalBridge`
- `getKnowledgeVaultRetrievalBridgeSummary`

## Required behavior

- knowledge vault to retrieval candidate bridge
- knowledge item bridge preview
- non-personal knowledge retrieval bridge
- uses Phase 17I retrieval planning
- bridged knowledge candidates remain preview-only
- visible bridge reasons
- inactive knowledge items excluded by default
- private knowledge items excluded by default
- missing-text knowledge items excluded by default
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
