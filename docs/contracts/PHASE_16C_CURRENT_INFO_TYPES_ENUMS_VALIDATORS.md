# Phase 16C — Current-Info Types, Enums, and Validators

Status: Complete.

## Purpose

Phase 16C adds the contract layer for Web Search / Current Information before any runtime provider exists.

It defines safe TypeScript contracts for:

- current-info query kinds
- source kinds
- citation contracts
- reliability labels
- freshness labels
- candidate statuses
- destination suggestion contracts
- blocked reasons
- high-stakes current-info safety checks
- review-required candidate validation

## Files Added

- `src/lib/current-info-contracts/current-info-enums.ts`
- `src/lib/current-info-contracts/current-info-contracts.ts`
- `src/lib/current-info-contracts/current-info-validators.ts`
- `src/lib/current-info-contracts/index.ts`

## Query Kinds Locked

- `job_search`
- `company_research`
- `lab_search`
- `professor_search`
- `paper_search`
- `documentation_lookup`
- `health_current_info`
- `legal_current_info`
- `financial_current_info`

## Source Kinds Locked

- `job_posting`
- `company_page`
- `lab_page`
- `professor_page`
- `paper`
- `documentation`
- `unknown`

## Reliability Labels Locked

- `official`
- `primary_source`
- `academic`
- `reputable_secondary`
- `community`
- `unknown`

## Freshness Labels Locked

- `live_or_recent`
- `possibly_stale`
- `unknown`

## Destination Suggestions Locked

- `save_web_source_to_knowledge_candidate`
- `create_job_application_from_web_source_candidate`
- `create_research_literature_item_from_web_source_candidate`
- `create_target_lab_from_web_source_candidate`
- `create_target_professor_from_web_source_candidate`

## Safety Rules

- Carnos may search, summarize, cite, classify, and suggest where internet content belongs.
- Carnos may not silently save, remember, apply, email, or modify records from internet content.
- Internet candidates must require user review.
- Internet candidates must not autosave.
- Internet candidates must not automatically become memory.
- Health, legal, and financial current-info queries require stronger source reliability.
- Private mode blocks query retention by default.
- Full-page raw content storage remains deferred.

## Protected Boundaries

Phase 16C does not add:

- SQL migrations
- runtime search provider
- network calls
- browser-side secrets
- search on page load
- background browsing
- direct writes from internet results
- automatic job applications
- automatic emails or outreach
- automatic paper/lab/professor saves
- automatic knowledge saves
- automatic memory conversion
- raw full-page storage
- hidden Carnos current-info retrieval
- hidden Carnos prompt injection
- provider activation outside boundary
- pgvector
- memory_embeddings

## Next Step

Phase 16D — Search Provider Boundary + Noop Provider.
