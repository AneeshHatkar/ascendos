# Phase 16Q — Web Source Audit Trail Contract

Status: Complete pending verification.

## Purpose

Phase 16Q adds a read-only audit trail layer for current-info web source events.

It summarizes existing `web_source_audit_events` rows and links them to available source, candidate, and source-link rows for provenance visibility.

## Implemented files

- `src/lib/current-info-capture/current-info-web-source-audit-trail.ts`
- `src/components/dashboard/current-info-web-source-audit-trail-panel.tsx`
- current-info-capture barrel export
- dashboard component barrel export

## Schema alignment

This phase aligns with existing Phase 16 SQL values:

- `web_search_performed`
- `web_source_viewed`
- `web_source_candidate_created`
- `web_source_candidate_approved`
- `web_source_candidate_rejected`
- `web_source_saved`
- `web_source_linked_to_record`
- `web_source_marked_stale`
- `web_source_blocked_by_private_mode`
- `web_source_blocked_by_reliability`

Actor types:

- `user`
- `carnos`
- `system`

## Safety boundary

Phase 16Q cannot:

- insert audit events
- write generic audit logs
- update source links
- update candidates
- approve or reject candidates
- save sources
- browse or fetch
- call providers
- call LLMs
- create embeddings
- add SQL migrations
- add API routes

## Next phase step

Next: `16R — Final Phase 16 Audit + Smoke Checklist + Completion Report`.
