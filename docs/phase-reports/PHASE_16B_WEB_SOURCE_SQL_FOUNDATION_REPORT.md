# Web Source SQL Foundation Report

Status: Complete.

## Completed

Created the database foundation for current information and internet source capture:

- `web_search_queries`
- `web_sources`
- `web_source_candidates`
- `web_source_links`
- `web_source_audit_events`

Added:

- RLS on every table.
- Own-row select/insert/update/delete policies where appropriate.
- Insert-only audit event policy.
- Parent ownership guards.
- Indexes for user-scoped read paths, source lookup, candidates, links, and audit events.
- Retention/private-mode fields.
- Reliability and freshness labels.
- Candidate review states.
- Provenance/citation link table.
- Audit event types for search/source/candidate/save/link/staleness/block events.

## Not added

- No runtime search provider.
- No UI search component.
- No Carnos search execution.
- No automatic save behavior.
- No automatic memory conversion.
- No embeddings.
- No vector search.
- No pgvector.
- No `memory_embeddings`.
- No raw full-page content storage.

## Next build target

Current-info type contracts, enums, validators, and safe schema helpers.
