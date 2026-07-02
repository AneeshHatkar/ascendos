# Web Source SQL Schema Design

Status: Complete.

This database foundation creates the current-information source capture spine.

## Tables

- `web_search_queries`
- `web_sources`
- `web_source_candidates`
- `web_source_links`
- `web_source_audit_events`

## Locked boundaries

- No provider calls.
- No browser-side secrets.
- No uncontrolled fetch calls.
- No search on page load.
- No automatic save from internet results.
- No automatic memory conversion.
- No pgvector.
- No `memory_embeddings`.
- Full-page raw content storage is deferred.

## Purpose

The schema supports the future flow:

Search request
→ source result capture
→ citation/reliability/freshness metadata
→ extraction candidate
→ duplicate/privacy/staleness warnings
→ review-to-save candidate
→ later confirmed save
→ provenance link
→ audit event

This chunk only creates the storage foundation and ownership protections. It does not activate search.
