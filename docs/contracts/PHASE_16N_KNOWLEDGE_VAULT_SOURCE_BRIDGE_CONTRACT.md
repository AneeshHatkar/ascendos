# Phase 16N — Knowledge Vault Source Bridge Contract

Status: Complete pending verification.

## Purpose

Phase 16N creates a read-only bridge from current-info web sources and candidates into Knowledge Vault review previews.

## Implemented files

- `src/lib/current-info-capture/knowledge-vault-source-bridge.ts`
- `src/components/dashboard/knowledge-vault-source-bridge-panel.tsx`
- current-info-capture barrel export
- dashboard component barrel export

## Scope

The bridge may produce:

- Knowledge Vault bridge records
- source title/domain/kind
- reliability/freshness labels
- candidate destination/action hints
- bridge status
- warnings
- missing field counts
- citation labels and citation URLs
- summary counts for ready/needs-evidence/blocked/archived states

## Safety boundary

Phase 16N cannot:

- browse the web
- fetch external data
- write records
- save Knowledge Vault items
- approve candidates
- reject candidates
- create embeddings
- call LLM summarization
- execute actions
- create SQL migrations
- create API routes

## Next phase step

Next: `16O — Review-to-Save Candidate Flow`.
