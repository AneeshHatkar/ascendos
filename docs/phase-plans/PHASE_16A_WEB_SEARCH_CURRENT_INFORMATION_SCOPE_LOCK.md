# Phase 16A — Web Search / Current Information Scope Lock

Status: Locked for implementation.

## Official Phase Name

Phase 16 — Web Search / Current Information

## Practical Phase Meaning

Phase 16 is the Web Search, Current Information, Source Capture, Citation, Reliability, and Review-to-Save Foundation for ascendOS + Carnos.

This phase gives Carnos a safe current-information boundary for jobs, companies, labs, papers, documentation, and current resources while preserving confirmation-before-write, privacy, source grounding, and memory safety.

## Source Alignment

The FINAL_SYNCED DOCX identifies Phase 16 as:

- Web search tools for jobs, companies, labs, papers, docs, and current resources.
- Citations and reliability notes are required.
- Health/legal/financial/current information requires explicit source grounding.
- Carnos must remain constrained by confirmation-before-write, privacy, safety, and evidence-based correction.
- Every meaningful record must preserve chronology, source, auditability, and user control.
- Privacy, export/delete, memory controls, sensitive locks, crisis safety, and anti-dependency remain mandatory system constraints.

The repo state after Phase 15R identifies Phase 16 as the next implementation area.

## Phase 16 Core Rule

Carnos may search, summarize, cite, classify, and suggest where internet content belongs.

Carnos may not silently save, remember, apply, email, or modify records from internet content.

## Phase 16 Required Flow

The safe current-info flow is:

1. User asks or explicitly triggers current-info lookup.
2. Query is classified.
3. Safety gate determines whether current info, citations, reliability notes, and freshness checks are required.
4. Search provider boundary handles the lookup.
5. Sources are captured with citation, reliability, freshness, and provenance metadata.
6. Useful content is extracted into reviewable candidates.
7. Destination router suggests where the source belongs.
8. Duplicate and staleness warnings are shown.
9. User reviews, edits, rejects, archives, or approves the candidate.
10. Save execution only happens through an explicit confirmed flow.
11. Saved records link back to source provenance.
12. Audit events record what happened.

## Phase 16 Chunk Build List

The locked Phase 16 chunk structure is:

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

## Phase 16B SQL Scope Preview

Phase 16B must design and implement the database foundation for:

- web_search_queries
- web_sources
- web_source_candidates
- web_source_links
- web_source_audit_events

These tables must support RLS, user ownership, source provenance, private-mode retention rules, citation metadata, reliability labels, freshness/staleness labels, review status, source-to-record links, and source audit events.

Phase 16B must not be coded blindly. The schema must be reviewed before migration implementation.

## Current-Info Source Types

Phase 16 must support, at minimum:

- job_posting
- company_page
- lab_page
- professor_page
- paper
- documentation
- article
- resource
- official_policy
- community_discussion
- unknown

## Search / Query Intents

Phase 16 must classify, at minimum:

- job_search
- company_research
- lab_search
- professor_search
- paper_search
- documentation_lookup
- current_resource_lookup
- policy_or_rule_lookup
- health_current_info
- legal_current_info
- financial_current_info
- general_current_info
- static_knowledge

## Reliability Requirements

Phase 16 must support visible reliability notes, including:

- official
- primary_source
- academic
- reputable_secondary
- community
- unknown
- blocked

High-stakes current information, especially health, legal, financial, immigration, crisis, and safety topics, requires stronger source reliability and explicit grounding.

## Freshness / Staleness Requirements

Phase 16 must support freshness labels and stale-source warnings, including:

- live_or_recent
- recent
- possibly_stale
- historical
- unknown

Job postings stale quickly. Company pages, professor pages, and lab pages can become stale. Papers are slower-moving but still need provenance. Official docs and policies require retrieved dates and freshness warnings when appropriate.

## Citation Requirements

Current information must cite sources.

A current-info answer or saved source candidate is not considered grounded unless it has visible source metadata and citation/provenance information.

## Source Capture Requirements

Phase 16 must support source capture as a reviewable pipeline.

Source capture may extract:

- title
- URL
- domain
- source type
- summary
- selected excerpt
- citation text
- reliability level
- freshness label
- published date if known
- retrieved date
- stale-after rule
- content hash or duplicate hint
- destination suggestion
- missing fields
- duplicate warnings
- reliability warnings
- staleness warnings

## Destination Routing Requirements

Phase 16 must suggest where a source belongs. The router only suggests; it does not write.

Required routing examples:

- job posting → job_applications
- company page → career context or knowledge_items
- paper → research_literature_items or research_citations
- lab page → target_labs
- professor page → target_professors
- documentation → knowledge_items
- learning resource → knowledge_items or tasks
- general current resource → knowledge_items

## Knowledge Boundary

Internet sources may become knowledge after review.

Internet sources must not automatically become personal memory.

Knowledge vault records remain separate from memory_items unless the user explicitly creates a memory candidate and approves it.

## Review-to-Save Boundary

Internet-derived content must go through review-before-save.

Potential save candidates may include:

- save_web_source_to_knowledge_candidate
- create_task_from_web_source_candidate
- create_goal_from_web_source_candidate
- create_job_application_from_web_source_candidate
- create_research_literature_item_from_web_source_candidate
- create_research_citation_from_web_source_candidate
- create_target_lab_from_web_source_candidate
- create_target_professor_from_web_source_candidate

Phase 16 may define and preview these candidates. It must not silently execute them.

## Privacy and Retention Requirements

Private mode blocks query retention by default.

Sensitive searches require explicit save approval.

Sensitive areas include:

- health
- mental health
- legal
- finance
- immigration or visa
- crisis or safety
- identity-sensitive topics

Search query logs and web source candidates must respect privacy and retention policies.

## Raw Content / Copyright Policy

Phase 16 must not store full raw pages by default.

Allowed by default:

- URL
- title
- domain
- metadata
- summary
- selected excerpt
- citation
- reliability label
- freshness label
- retrieved date

Full-page raw content storage is deferred unless explicitly designed, justified, and controlled.

## Provider and API Key Safety

Phase 16 must create a provider boundary before any real provider activation.

Forbidden:

- browser-side secrets
- uncontrolled fetch calls
- random provider calls outside the provider boundary
- background browsing
- scheduled polling
- search on page load
- hidden retrieval inside Carnos prompts

## Rate Limit / Quota Boundary

Phase 16 must acknowledge future provider rate limits and quota protection.

Provider activation must later support:

- explicit user-triggered calls
- bounded result count
- timeout handling
- provider-disabled fallback
- failed-search fallback
- audit visibility

## Duplicate and Merge Requirements

Phase 16 must detect duplicate hints using:

- same URL
- normalized title
- domain plus title
- company plus job title
- DOI, arXiv, or paper title
- professor plus university
- content hash

Merge behavior must remain review-driven.

## Export/Delete Compatibility

Web sources, source candidates, query logs, source links, and source audit events must be compatible with future export/delete/privacy phases.

Source deletion and unlinking must not orphan unclear provenance.

## Failed Search / No Source Fallback

If current info is required but no reliable source is available, Carnos must say that the information could not be grounded instead of pretending certainty.

## Forbidden Phase 16 Behaviors

Phase 16 must forbid:

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

## Phase 16A Implementation Boundary

Phase 16A only creates the scope lock, report, smoke checklist, audit gate, and repo logs.

Phase 16A does not add SQL migrations, provider calls, runtime web search, UI search execution, Supabase writes, database writes, memory writes, or action execution.

## Next Step

After Phase 16A passes, proceed to Phase 16B — Web Source SQL Foundation.

Before coding Phase 16B, review and lock the schema for:

- web_search_queries
- web_sources
- web_source_candidates
- web_source_links
- web_source_audit_events
