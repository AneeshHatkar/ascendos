# Phase 16P — Privacy, Sensitive Search, Retention Rules Contract

Status: Complete pending verification.

## Purpose

Phase 16P adds preview-only privacy, sensitive-search, raw-content, private-mode, and retention-rule evaluation for current-info records.

## Implemented files

- `src/lib/current-info-capture/current-info-privacy-retention-rules.ts`
- `src/components/dashboard/current-info-privacy-retention-panel.tsx`
- current-info-capture barrel export
- dashboard component barrel export

## Schema alignment

This phase aligns with existing Phase 16 SQL values:

- query/source retention policies:
  - `standard`
  - `private_mode_ephemeral`
  - `do_not_retain`
  - `manual_save_only`
- query blocked/private values:
  - `blocked_by_private_mode`
  - `blocked_by_policy`
- candidate blocked values:
  - `blocked_by_private_mode`
  - `blocked_by_reliability`
  - `blocked_by_duplicate`
- audit preview values:
  - `web_source_blocked_by_private_mode`
  - `web_source_blocked_by_reliability`
  - `web_source_candidate_created`

## Safety boundary

Phase 16P cannot:

- browse or fetch
- activate private mode
- delete records
- redact persisted records
- update retention fields
- update candidate status
- insert audit events
- save sources
- approve or reject candidates
- create proposed actions
- call LLMs
- create embeddings
- add SQL migrations
- add API routes

## Next phase step

Next: `16Q — Web Source Audit Trail`.
