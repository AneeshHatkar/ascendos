# Phase 17N — Memory/RAG UI

Phase 17N adds a preview-only Memory/RAG UI component.

The UI displays Carnos memory context-pack previews, retrieval audit trail previews, visible boundaries, disabled write actions, loading states, empty states, and error states.

## Added

- `src/components/memory-rag/MemoryRagPreviewPanel.tsx`
- `src/components/memory-rag/index.ts`
- `MemoryRagPreviewPanel`
- `MemoryRagPreviewPanelProps`
- `MemoryRagPreviewPanelMode`
- `PHASE_17N_MEMORY_RAG_UI_BOUNDARY`
- `getMemoryRagPreviewPanelBoundary`

## Required behavior

- memory rag preview panel
- context pack preview UI
- retrieval audit trail preview UI
- retrieval explanation preview UI
- visible memory boundaries
- visible retrieval reasons
- visible audit reasons
- visible no-runtime state
- disabled approve/reject/delete/forget actions
- loading state
- empty state
- error state

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
