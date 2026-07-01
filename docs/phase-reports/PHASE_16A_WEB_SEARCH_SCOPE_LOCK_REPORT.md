# Phase 16A — Web Search / Current Information Scope Lock Report

Status: Complete when audit passes.

## Completed Scope

Phase 16A locks the full Web Search / Current Information phase before runtime implementation.

The locked scope includes:

- Web search tools for jobs, companies, labs, papers, docs, and current resources.
- Citations and reliability notes.
- Source capture and review-to-save candidate pipeline.
- Web source SQL foundation preview.
- Query classification and safety gates.
- Citation, reliability, freshness, and staleness requirements.
- Destination routing.
- Duplicate detection.
- Carnos current-info integration.
- Career web source integration.
- Research / Stanford / paper / lab web source integration.
- Knowledge vault source bridge.
- Privacy, sensitive search, and retention rules.
- Web source audit trail.
- Final Phase 16 audit and smoke checklist.

## Locked Phase 16 Chunks

- 16A — Scope Lock + Source Traceability
- 16B — Web Source SQL Foundation
- 16C — Current-Info Types, Enums, and Validators
- 16D — Search Provider Boundary + Noop Provider
- 16E — Query Classifier + Current-Info Safety Gate
- 16F — Citation, Reliability, and Freshness Engine
- 16G — Source Capture + Extraction Candidates
- 16H — Destination Router + Duplicate Detection
- 16I — Web Current-Info Read Repository + Dashboard Helpers
- 16J — Current-Info UI Components
- 16K — Carnos Current-Info Integration
- 16L — Career Web Source Integration
- 16M — Research / Stanford / Paper / Lab Integration
- 16N — Knowledge Vault Source Bridge
- 16O — Review-to-Save Candidate Flow
- 16P — Privacy, Sensitive Search, and Retention Rules
- 16Q — Web Source Audit Trail
- 16R — Final Phase 16 Audit + Smoke Checklist + Completion Report

## Protected Boundaries

Phase 16A confirms that Phase 16 must not allow:

- silent browsing
- background browsing
- uncontrolled fetch calls
- browser-side secrets
- search on page load
- direct writes from internet results
- automatic job applications
- automatic emails or outreach
- automatic paper, lab, or professor saves
- automatic knowledge saves
- automatic memory conversion
- full raw page storage by default
- hidden Carnos current-info retrieval
- hidden Carnos prompt injection
- weak-source high-stakes answers
- private-mode query retention without explicit allow
- pgvector
- memory_embeddings
- provider activation outside boundary

## No Runtime Implementation in 16A

Phase 16A does not add:

- SQL migrations
- Supabase writes
- search provider calls
- fetch calls
- API keys
- browser-side search
- database write execution
- memory write execution
- proposed-action execution

## Phase 16B Schema Preview

Phase 16B must review and implement the schema for:

- web_search_queries
- web_sources
- web_source_candidates
- web_source_links
- web_source_audit_events



## Protected Boundary Markers

- Provider activation outside boundary.
- No provider activation occurs in Phase 16A.
- Search provider implementation is deferred to Phase 16D.
- Phase 16A only locks scope, source traceability, safety boundaries, and audit markers.
- No live web calls, API keys, browser-side secrets, uncontrolled fetch calls, background browsing, search on page load, SQL migrations, pgvector, or memory embeddings are added in Phase 16A.

## Verification Gates

Phase 16A is valid only if:

- the scope lock plan exists
- the report exists
- the smoke checklist exists
- the audit script exists
- package.json includes audit:phase16a
- npm run check includes audit:phase16a
- logs/status files include Phase 16A and Phase 16B
- no runtime web search or provider implementation is introduced

## Next Step

Proceed to Phase 16B — Web Source SQL Foundation after Phase 16A verification and commit.
