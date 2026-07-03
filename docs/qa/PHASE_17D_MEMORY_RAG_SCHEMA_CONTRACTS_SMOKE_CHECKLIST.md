# Memory/RAG TypeScript Contracts + Validators Smoke Checklist

Status: REQUIRED BEFORE COMPLETION

## Files

- [ ] `memory-rag-schema-contracts.ts` exists.
- [ ] `memory-rag-schema-validators.ts` exists.
- [ ] Existing `index.ts` exports both new files.

## Contracts

- [ ] Candidate schema alignment contract exists.
- [ ] Approved-memory schema alignment contract exists.
- [ ] Embedding record contract exists.
- [ ] Retrieval event contract exists.
- [ ] Conflict group contract exists.
- [ ] Conflict member contract exists.

## Validators

- [ ] Candidate schema validator exists.
- [ ] Approved-memory schema validator exists.
- [ ] Embedding record validator exists.
- [ ] Retrieval event validator exists.
- [ ] Conflict group validator exists.
- [ ] Conflict member validator exists.
- [ ] Union validator exists.

## Boundary

- [ ] No repository is added.
- [ ] No Supabase call is added.
- [ ] No runtime retrieval is added.
- [ ] No generated embedding is added.
- [ ] No vector search is added.
- [ ] No provider call is added.
- [ ] No Carnos prompt injection is added.

## Verification

- [ ] `npm run audit:phase17d` passes.
- [ ] `npm run check` passes.
