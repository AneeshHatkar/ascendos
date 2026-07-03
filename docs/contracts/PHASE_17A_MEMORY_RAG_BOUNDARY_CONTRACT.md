# Phase 17A — Memory/RAG Boundary Contract

Status: LOCKED
Scope: Phase 17A only
Implementation type: scope lock, reconciliation, discovery, audit wiring

---

## 1. What Phase 17A may add

Phase 17A may add:

- documentation,
- discovery report,
- smoke checklist,
- audit script,
- package script wiring,
- execution log/status/changelog/code ledger entries.

Phase 17A may not add:

- SQL migrations,
- Memory/RAG tables,
- repositories,
- API routes,
- UI components,
- provider calls,
- embedding implementation,
- real retrieval implementation,
- memory write implementation.

---

## 2. Source-of-truth lock

Official source-of-truth chunk:

- Chunk 17 — Memory/RAG
- Goal: Memory inbox, approved memories, embeddings, knowledge vault retrieval.

Remaining official chunks:

- 17 — Memory/RAG
- 18 — Analytics/Experiments
- 19 — Custom Trackers
- 20 — Privacy/Export
- 21 — v1 Polish

Roadmap mismatch:

- Official Chunk 16 is Voice Foundation.
- Repo Phase 16 implemented Current Information/Web foundation.
- Repo Phase 16.5 implemented Carnos Visual Identity.
- Voice Foundation must not be assumed complete/final just because voice routes exist.
- Next official source-of-truth chunk is Chunk 17 Memory/RAG.

---

## 3. Memory/RAG core boundaries

### Memory candidate

A memory candidate is a proposed memory. It is not approved durable memory.

Allowed:

- create candidate,
- edit candidate,
- reject candidate,
- archive candidate,
- mark sensitive/locked,
- approve through explicit approval flow later.

Forbidden:

- using candidate as approved memory,
- silently promoting candidate,
- retrieving rejected candidate as Carnos memory.

### Approved memory

Approved memory is durable user-approved context.

Allowed:

- retrieval only after approval,
- filtering by sensitivity,
- audit logging,
- conflict/staleness handling.

Forbidden:

- silent creation of approved memory,
- unbounded retrieval,
- locked/sensitive generic retrieval by default,
- pretending unavailable memory exists.

### Knowledge item

Knowledge item is retrievable knowledge, not automatically personal memory.

Allowed:

- retrieval as knowledge,
- source metadata,
- candidate proposal.

Forbidden:

- automatic conversion into personal memory.

### Current-info source

Current-info source is evidence/source material.

Allowed:

- source bridge,
- knowledge candidate,
- memory candidate proposal with user approval.

Forbidden:

- automatic approved memory creation.

---

## 4. Required Phase 17 feature coverage

The Phase 17 implementation must cover:

- memory inbox,
- memory candidates,
- approved memories,
- edit-before-approve,
- approve/reject/archive/forget/lock,
- lifecycle states,
- sensitivity labels,
- sensitive retrieval lock,
- provenance/source tracking,
- confidence/evidence strength,
- staleness handling,
- conflict resolver,
- superseded memory handling,
- delete vs forget distinction,
- archive vs forget distinction,
- embedding provider boundary,
- noop/deferred embedding provider,
- no fake embeddings,
- retrieval ranking,
- retrieval budget,
- retrieval dedupe,
- approved-only retrieval,
- sensitive/locked exclusion,
- rejected/superseded exclusion,
- knowledge vault retrieval,
- source bridges,
- Carnos memory context pack,
- Carnos memory truthfulness,
- retrieval explanation,
- retrieval audit trail,
- Memory/RAG UI,
- Carnos memory integration panel,
- user-visible memory controls,
- no silent memory writes,
- no background memory extraction,
- roadmap reconciliation,
- voice mismatch note,
- data boundary matrix,
- schema ownership map,
- AI capability matrix update,
- test fixtures,
- final audit,
- smoke checklist,
- completion report.

---

## 5. Truthfulness contract

Carnos must never claim:

- it remembers something if retrieval failed,
- a pending candidate is approved memory,
- current conversation context is saved memory,
- semantic embeddings are live if provider is noop/deferred,
- locked/sensitive memory was used if it was excluded.

---

## 6. Future schema rule

Any Phase 17 step touching database/schema/migrations must begin with schema discovery and must show the existing schema before writing the migration.

This applies especially to:

- 17C database schema,
- 17E repositories,
- 17F approval flow,
- 17M retrieval audit trail,
- 17N UI write paths,
- 17P privacy/forget/delete readiness.

---

## 7. Phase 17A completion contract

Phase 17A is valid only if:

- no schema was added,
- no runtime provider was added,
- no Memory/RAG implementation was added,
- the full 17A–17Q feature map is documented,
- the roadmap mismatch is documented,
- every discussed loophole-prevention feature is listed,
- the audit is wired into `npm run check`,
- `npm run check` passes.
