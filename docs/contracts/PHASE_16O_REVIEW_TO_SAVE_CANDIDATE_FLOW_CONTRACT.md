# Phase 16O — Review-to-Save Candidate Flow Contract

Status: Complete pending verification.

## Purpose

Phase 16O creates a confirmation-first review-to-save preview layer for current-info candidates.

It uses the exact Phase 16 and Phase 15 schemas:

- `web_source_candidates`
- `web_source_links`
- `web_source_audit_events`
- `knowledge_items`
- `ai_actions`

## Implemented files

- `src/lib/current-info-capture/current-info-review-to-save-flow.ts`
- `src/components/dashboard/current-info-review-to-save-panel.tsx`
- current-info-capture barrel export
- dashboard component barrel export

## Supported preview outputs

The flow can produce preview payloads for:

- candidate review decisions
- Knowledge Vault save previews
- citation/link previews
- audit event previews
- proposed-action previews for existing supported contracts:
  - `create_task`
  - `create_goal`
  - `create_proof_item`

## Explicit limitation

The current proposed-action contract does not support direct `knowledge_items`, research literature, research citation, target lab, or target professor saves. Those remain preview-only until a later writer/confirmation contract is added.

## Safety boundary

Phase 16O cannot:

- update `candidate_status`
- insert `knowledge_items`
- insert `web_source_links`
- insert `web_source_audit_events`
- insert `ai_actions`
- execute proposed actions
- approve candidates
- reject candidates
- archive candidates
- browse/fetch
- call LLMs
- create embeddings
- add SQL migrations
- add API routes

## Next phase step

Next: `16P — Privacy, Sensitive Search, Retention Rules`.
