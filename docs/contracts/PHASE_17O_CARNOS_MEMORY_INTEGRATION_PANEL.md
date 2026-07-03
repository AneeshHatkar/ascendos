# Phase 17O — Carnos Memory Integration Panel

Phase 17O adds a preview-only Carnos Memory Integration Panel.

The panel shows what Carnos would be allowed to see from the visible memory context pack and retrieval audit trail. It also shows blocked/deferred actions and truthfulness boundaries.

## Added

- `src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx`
- `CarnosMemoryIntegrationPanel`
- `CarnosMemoryIntegrationPanelProps`
- `CarnosMemoryIntegrationMode`
- `PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_BOUNDARY`
- `getCarnosMemoryIntegrationPanelBoundary`

## Required behavior

- carnos memory integration panel
- carnos allowed memory preview
- carnos blocked memory actions
- carnos memory boundary visibility
- carnos memory audit visibility
- carnos truthfulness guard visible
- memory context pack visible to user
- no hidden memory use
- no prompt injection
- no autonomous memory use

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
- No approve/reject/delete/forget mutations
- No autonomous memory use
