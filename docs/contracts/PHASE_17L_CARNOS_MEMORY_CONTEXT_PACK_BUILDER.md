# Phase 17L — Carnos Memory Context Pack Builder

Phase 17L adds a deterministic Carnos Memory Context Pack Builder.

The builder converts Phase 17I retrieval-plan outputs, Phase 17J Knowledge Vault bridge outputs, and Phase 17K source bridge outputs into a preview-only context pack. It does not inject anything into Carnos prompts.

## Added

- `src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts`
- `CarnosMemoryContextPackInput`
- `CarnosMemoryContextPackItem`
- `CarnosMemoryContextPackSection`
- `CarnosMemoryContextPackBuilderResult`
- `buildCarnosMemoryContextPack`
- `summarizeCarnosMemoryContextPack`
- `getCarnosMemoryContextPackBuilderSummary`

## Required behavior

- carnos memory context pack
- context pack planning only
- preview-only context pack
- uses Phase 17I retrieval planning outputs
- uses Phase 17J knowledge bridge outputs
- uses Phase 17K source bridge outputs
- preserves visible retrieval reasons
- preserves visible bridge reasons
- budget-bounded context pack
- grouped context-pack sections
- item trimming by character budget
- section/item/token budget enforcement

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
