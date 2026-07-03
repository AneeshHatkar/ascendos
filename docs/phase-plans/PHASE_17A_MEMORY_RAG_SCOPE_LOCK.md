# Phase 17A — Memory/RAG Scope Lock + Roadmap Reconciliation + Discovery

Status: LOCKED FOR IMPLEMENTATION
Phase: 17A
Official source-of-truth chunk: 17 Memory/RAG
Official goal: Memory inbox, approved memories, embeddings, knowledge vault retrieval.
Repo state before Phase 17A: Phase 16.5J complete and pushed at commit `e8e8ada`.

---

## 1. Purpose

Phase 17A locks the full Memory/RAG implementation plan before schema or feature work begins.

This phase prevents:

- roadmap numbering confusion,
- memory / knowledge / current-info mixing,
- silent AI memory writes,
- fake RAG,
- fake embeddings,
- hidden autonomous memory extraction,
- sensitive memory leakage,
- unbounded retrieval,
- stale or conflicting memory usage,
- implementation without schema discovery,
- Carnos pretending it remembers something that is not approved memory.

Phase 17A is a scope, reconciliation, discovery, and audit phase only.

Phase 17A must not add:

- SQL migrations,
- Memory/RAG database tables,
- repositories,
- API routes,
- UI components,
- embedding provider runtime,
- retrieval runtime,
- memory write runtime,
- autonomous memory behavior.

---

## 2. Source-of-truth reconciliation

The FINAL_SYNCED JSON source-of-truth defines the remaining official chunks as:

- Chunk 17 — Memory/RAG
- Chunk 18 — Analytics/Experiments
- Chunk 19 — Custom Trackers
- Chunk 20 — Privacy/Export
- Chunk 21 — v1 Polish

Important roadmap mismatch:

- Official JSON Chunk 16 = Voice Foundation.
- Repo Phase 16 = Current Information/Web foundation.
- Repo Phase 16.5 = Carnos Visual Identity.
- Official JSON Chunk 16 Voice Foundation must not be assumed complete just because voice-related routes exist.
- Existing voice routes must be treated as partial/existing infrastructure until a dedicated voice reconciliation step verifies them.
- The next official source-of-truth implementation chunk is Chunk 17 — Memory/RAG.

This reconciliation must be carried forward in Phase 17B, Phase 17Q, and v1 polish notes.

---

## 3. Official Phase 17 definition

Official source-of-truth:

- Phase / Chunk: 17 Memory/RAG
- Goal: Memory inbox, approved memories, embeddings, knowledge vault retrieval.

Expanded Phase 17 mission:

Build a safe Memory/RAG system where Carnos and ascendOS can:

- create memory candidates,
- keep proposed memories in a memory inbox,
- let the user edit candidates before approval,
- approve, reject, archive, forget, lock, or supersede memories,
- store approved memories separately from pending candidates,
- retrieve only eligible approved memories by default,
- retrieve approved knowledge vault items without mixing them with personal memory,
- prepare controlled Carnos memory context packs,
- explain what was retrieved and why,
- log retrieval usage,
- enforce sensitivity and locked-memory rules,
- avoid fake embeddings,
- avoid silent memory writes,
- avoid background autonomous memory extraction.

---

## 4. Non-negotiable Memory/RAG rules

### 4.1 No silent durable memory writes

Carnos may propose a memory candidate.
Carnos must not silently save important durable memory.
Important memory must follow:

candidate → user review/edit → approval → approved memory

### 4.2 Candidate is not approved memory

A memory candidate is pending.
A rejected candidate is never retrievable.
Only approved memory is durable Carnos memory context by default.

### 4.3 Knowledge is not personal memory

Knowledge vault items, documents, current-info sources, research notes, career notes, and project notes are not automatically personal memories.

They may become:

- retrievable knowledge,
- source-linked evidence,
- candidate memory suggestions,

but they must not silently become approved personal memory.

### 4.4 Current-info sources are not personal memories

Current-info review/save candidates from Phase 16 are source/knowledge material.
They are not automatically personal memory.

### 4.5 No fake RAG

If embeddings are not activated, the system must say provider/runtime is deferred or keyword/foundation-only.
It must not pretend semantic embedding retrieval is live.

### 4.6 No hidden background memory extraction

No background memory scanning.
No scheduled autonomous memory ingestion.
No emotion-based hidden memory saving.
No automatic personality rewriting from memory.

### 4.7 Memory truthfulness

Carnos must distinguish:

- approved memory,
- pending memory candidate,
- current conversation context,
- retrieved knowledge,
- unavailable retrieval.

If retrieval fails, Carnos must not pretend it remembers.

### 4.8 Sensitive retrieval lock

Locked/sensitive memory is excluded by default from generic retrieval and global dashboard previews.

### 4.9 Retrieval must be bounded

Memory context packs must enforce:

- max item count,
- max token/context budget,
- sensitivity filters,
- recency logic,
- relevance logic,
- dedupe,
- superseded exclusion,
- rejected exclusion,
- locked exclusion.

---

# 5. Full Phase 17 build chunks and features

## 17A — Memory/RAG Scope Lock + Roadmap Reconciliation + Discovery

Features/gates:

- Source-of-truth reconciliation.
- Repo Phase 16 vs official Chunk 16 note.
- Voice Foundation mismatch note.
- Official Chunk 17 Memory/RAG lock.
- Full 17A–17Q feature map.
- Discovery of existing memory, RAG, knowledge, current-info, Carnos continuity, voice, schema, route, and audit files.
- Schema/discovery-first rule for future schema steps.
- No schema changes.
- No repository implementation.
- No UI implementation.
- No runtime provider implementation.
- No fake memory claims.
- No silent AI writes.
- Audit script for this scope lock.
- package.json check-chain wiring.
- log/status/changelog/code-ledger updates.

Outputs:

- Phase plan.
- Boundary contract.
- Discovery report.
- Smoke checklist.
- Audit script.
- package.json check wiring.
- logs/status/changelog updates.

---

## 17B — Data Boundary Matrix + AI Capability Matrix + Schema Ownership Map

Features/gates:

- Data boundary matrix.
- Memory vs knowledge vs current-info vs document vs Carnos chat separation.
- Schema ownership map.
- AI capability matrix update.
- Final acceptance gate alignment.
- Phase 17 ownership map.
- Voice Foundation mismatch carried forward.
- Memory/RAG non-negotiable rules formalized.
- Definition of which modules may propose memory candidates.
- Definition of which modules may retrieve approved memory.
- Definition of which modules may never auto-save memory.
- Data routing rules for personal memory, knowledge vault item, current-info source, document note, research note, career note, project note, Carnos conversation message, and manual user entry.
- No runtime provider activation.

Feature boundaries:

- A web source is not memory.
- A document note is not memory.
- A current-info candidate is not memory.
- A memory candidate is not approved memory.
- Approved memory is the only durable personal memory Carnos can use by default.

---

## 17C — Memory/RAG Database Schema

Features:

- `memory_candidates` table.
- `approved_memories` table.
- `memory_events` or `memory_audit_log` table.
- `memory_retrieval_events` table.
- `memory_embeddings` or `embedding_records` foundation if scoped.
- `memory_conflicts` foundation if scoped.
- Knowledge retrieval link table if current schema requires it.
- RLS-compatible user ownership fields.
- timestamps.
- source provenance fields.
- lifecycle status fields.
- sensitivity fields.
- confidence/evidence fields.
- conflict/supersession fields.
- retrieval metadata fields.
- future Phase 20 forget/delete readiness fields.

Lifecycle states:

- candidate
- approved
- rejected
- archived
- forgotten
- superseded
- locked

Sensitivity levels:

- normal
- personal
- private
- sensitive
- locked

Metadata:

- source_type
- source_id
- source_route
- confidence
- evidence_strength
- source_reliability
- last_confirmed_at
- supersedes_memory_id
- conflict_group_id
- conflict_reason
- resolution_status
- created_at
- approved_at
- archived_at
- forgotten_at
- last_used_at

Rules:

- Schema discovery must happen before writing migration.
- No memory table should allow silent approved memory creation without an approval path.
- RLS/user ownership must be considered.
- Migration validation must pass.

---

## 17D — TypeScript Contracts + Validators

Features:

- MemoryCandidate type.
- ApprovedMemory type.
- MemoryStatus enum.
- MemorySensitivity enum.
- MemorySourceType enum.
- MemoryConfidence type.
- EvidenceStrength type.
- RetrievalBudget type.
- MemoryContextPack type.
- MemoryRetrievalEvent type.
- MemoryConflict type.
- MemoryProvenance type.
- KnowledgeRetrievalResult type.
- CarnosMemoryContextPack type.
- Validation helpers.
- Status transition validators.
- Sensitivity validators.
- Candidate-to-approved conversion validator.
- Retrieval eligibility validator.
- No-silent-write constants.
- Carnos memory truthfulness constants.
- No fake embedding constants.
- No background extraction constants.
- Sensitive retrieval lock constants.

Rules:

- No loosely typed memory objects.
- No approved memory without explicit approved status.
- Rejected/superseded/locked filters must be represented in contracts.

---

## 17E — Memory Inbox Repository

Features:

- createMemoryCandidate
- listMemoryCandidates
- getMemoryCandidate
- updateMemoryCandidate
- rejectMemoryCandidate
- archiveMemoryCandidate
- markCandidateSensitive
- markCandidateLocked if needed
- attach candidate provenance
- attach source route/source ID
- candidate confidence/evidence metadata
- candidate status transitions
- candidate audit event creation if writes occur
- candidate validation before write
- candidate source module attribution
- candidate empty/error handling
- candidate pagination/filtering if needed

Rules:

- Candidate creation does not equal approved memory.
- Carnos can propose candidates only through this controlled path.
- No candidate may be used as approved durable memory unless promoted through approval.

---

## 17F — Approved Memory Repository + Approval Flow

Features:

- approveMemoryCandidate
- editCandidateBeforeApproval
- createApprovedMemory only through allowed paths
- listApprovedMemories
- getApprovedMemory
- updateApprovedMemory
- archiveApprovedMemory
- forgetApprovedMemory
- lockApprovedMemory
- supersedeApprovedMemory
- update sensitivity
- update last_confirmed_at
- update confidence/evidence fields
- approval audit event creation
- approved memory validation before write
- approved memory listing filters
- approved memory detail retrieval
- approved memory source/provenance preservation
- rejected candidate exclusion

Rules:

- Approval is not blind.
- User can edit candidate text before approval.
- Approved memory must retain candidate/source provenance.
- Forget and delete are distinct.
- Full delete/export remains Phase 20 unless explicitly scoped.

---

## 17G — Provenance + Confidence + Conflict Engine

Features:

- source provenance tracking.
- source_type taxonomy.
- source_id linking.
- source_route linking.
- created_from_user_message.
- created_from_current_info_review.
- created_from_document.
- created_from_manual_entry.
- created_from_carnos_suggestion.
- created_from_knowledge_vault.
- created_from_career.
- created_from_research.
- created_from_goals.
- created_from_projects.
- confidence field.
- evidence_strength field.
- source_reliability field.
- last_confirmed_at.
- staleness handling.
- conflict_group_id.
- supersedes_memory_id.
- conflict_reason.
- resolution_status.
- superseded memory handling.
- conflict detection contract.
- conflict resolution repository/helper if scoped.
- active vs superseded retrieval behavior.

Rules:

- Old memories should not blindly override newer memories.
- New memories should not blindly override older memories without conflict metadata.
- Carnos must avoid using superseded memories by default.

---

## 17H — Embedding Provider Boundary

Features:

- EmbeddingProvider interface.
- NoopEmbeddingProvider.
- provider status/capability flags.
- EmbeddingRequest type.
- EmbeddingResult type.
- EmbeddingFailure type.
- model/provider metadata.
- embedding dimension metadata if needed.
- no fake embeddings rule.
- provider deferred state.
- keyword/foundation-only fallback marker if needed.
- provider audit/boundary doc.
- provider error handling.
- provider disabled state.
- provider capability matrix entry.

Rules:

- Do not hardwire OpenAI or any embedding provider randomly.
- Do not activate real provider unless explicitly scoped.
- Do not pretend semantic embeddings are active if provider is noop/deferred.
- No external calls unless provider activation is explicitly approved in a later scoped step.

---

## 17I — Retrieval Ranking + Budget + Dedupe Rules

Features:

- retrieval ranking contract.
- relevance scoring.
- recency weighting.
- confidence weighting.
- source reliability weighting.
- max memory count.
- max token/context budget.
- max sensitive memory count.
- dedupe rules.
- approved-only filter.
- sensitive memory filter.
- locked memory exclusion.
- superseded memory exclusion.
- rejected candidate exclusion.
- archived/forgotten exclusion by default.
- retrieval mode metadata.
- retrieval fallback behavior.
- empty retrieval state.
- retrieval budget failure state.
- retrieval result ordering.
- current conversation vs saved memory distinction.

Rules:

- Retrieval must be bounded.
- Retrieval must never include rejected candidates.
- Retrieval must never include locked memories by default.
- Retrieval must explain when semantic provider is deferred.

---

## 17J — Knowledge Vault Retrieval Bridge

Features:

- knowledge vault retrieval adapter.
- approved knowledge item retrieval.
- knowledge result metadata.
- knowledge source ID/source route linking.
- knowledge-vs-memory distinction.
- knowledge retrieval eligibility.
- knowledge retrieval result type.
- knowledge retrieval audit handoff.
- source reliability/freshness metadata if available.
- current-info source compatibility.
- document note compatibility if available.
- knowledge snippet result formatting.
- knowledge result sensitivity/freshness markers.
- knowledge item candidate proposal compatibility.

Rules:

- Knowledge retrieval can support Carnos.
- Knowledge items do not automatically become personal memories.
- Knowledge snippets must be labeled separately from approved personal memory.

---

## 17K — Source Bridges from Current-Info/Documents/Career/Research/Goals/Projects

Features:

- current-info review source bridge.
- document source bridge.
- career source bridge.
- research source bridge.
- goals source bridge.
- projects source bridge.
- Carnos conversation source bridge.
- manual user entry source bridge.
- knowledge vault source bridge.
- candidate creation from source bridge.
- source-specific provenance.
- bridge eligibility rules.
- bridge rejection rules.
- no auto-approve rule.
- source-to-candidate audit events if writes occur.
- source bridge boundary tests.
- source module ownership preservation.

Rules:

- Bridges can propose candidates.
- Bridges cannot auto-approve durable memory.
- Source modules keep their own data boundaries.
- Current-info remains source/knowledge unless approved as memory.

---

## 17L — Carnos Memory Context Pack Builder

Features:

- buildCarnosMemoryContextPack.
- approved memory retrieval.
- knowledge snippet retrieval.
- source metadata.
- sensitivity metadata.
- provenance metadata.
- retrieval reason.
- confidence/relevance score.
- context budget enforcement.
- dedupe enforcement.
- sensitive/locked exclusion.
- superseded/rejected exclusion.
- empty context behavior.
- current conversation vs saved memory distinction.
- pending candidate distinction.
- Carnos truthfulness markers.
- context pack result type.
- context pack failure state.
- context pack provider deferred marker.
- context pack audit handoff.

Rules:

- Carnos can use only eligible approved context.
- If no approved context exists, Carnos must not pretend it remembers.
- Context pack must label memory vs knowledge vs current conversation.

---

## 17M — Retrieval Audit Trail + Explanation

Features:

- memory retrieval event logging.
- retrieved approved memory IDs.
- retrieved knowledge IDs.
- query/context reason.
- retrieval mode.
- sensitivity status.
- used_by_carnos flag.
- retrieval explanation.
- empty retrieval audit if useful.
- provider/deferred status in audit.
- timestamp/user ownership.
- retrieval trace display contract if needed.
- excluded item reason if safe.
- locked/sensitive exclusion audit without leaking content.
- retrieval count/budget metadata.
- context pack audit linkage.

Rules:

- Every Carnos memory retrieval should be traceable.
- Retrieval explanation should be understandable.
- Sensitive/locked exclusions should be auditable without leaking content.

---

## 17N — Memory/RAG UI

Features:

- memory inbox UI.
- approved memories UI.
- candidate detail view.
- edit-before-approve UI.
- approve action.
- reject action.
- archive action.
- forget action.
- lock/sensitive marking UI.
- source/provenance display.
- confidence/evidence display.
- lifecycle status display.
- last_used_at display.
- last_confirmed_at display.
- conflict/superseded indicators.
- loading state.
- empty state.
- error state.
- privacy-safe rendering.
- no hardcoded demo data as final state.
- filters by status/sensitivity/source if scoped.
- detail panel for source and audit metadata.
- mobile-safe layout if scoped.

Rules:

- User must control what becomes approved memory.
- Sensitive/locked memory must not be globally previewed casually.
- Pending memory must be clearly labeled pending.

---

## 17O — Carnos Memory Integration Panel

Features:

- Carnos memory panel.
- memory status indicators.
- retrieval available/deferred state.
- reviewing_memory visual state integration.
- approved context count.
- pending memory count.
- locked/sensitive count if safe.
- truthfulness copy.
- no fake active controls.
- clear current capability vs deferred capability.
- connection to Phase 16.5 Carnos visual identity.
- Carnos memory boundary explanation.
- Carnos memory context status.
- Carnos current conversation vs saved memory distinction.
- Carnos retrieval explanation display if scoped.

Rules:

- Carnos panel must not imply unavailable embedding/provider capabilities are active.
- Carnos must distinguish approved memory from pending candidates.

---

## 17P — Privacy, Sensitive Lock, Forget/Delete Readiness

Features:

- sensitive retrieval lock.
- locked memory exclusion.
- forget vs delete distinction.
- archive vs forget distinction.
- privacy-safe memory controls.
- no global dashboard preview for sensitive locked memory.
- user-owned memory control markers.
- Phase 20 export/delete handoff.
- sensitive category notes for health, finance, immigration, legal, mental health, private personal data.
- retrieval restrictions for sensitive memory.
- audit requirements for sensitive memory use.
- forget state.
- archive state.
- locked state.
- delete-ready metadata.
- privacy handoff to Phase 20.

Rules:

- forget = stop using in Carnos context / inactive.
- archive = keep but do not actively retrieve.
- delete = actual data removal, finalized in Phase 20 unless explicitly scoped.
- locked = never retrieved by default.

---

## 17Q — Final Phase 17 Audit + Fixtures + Completion Report

Features:

- final Memory/RAG audit.
- retrieval test fixtures.
- approved memory retrievable test.
- rejected candidate not retrievable test.
- superseded memory excluded test.
- locked/sensitive memory excluded test.
- knowledge item retrieved separately from personal memory test.
- no silent memory write audit.
- no fake embedding audit.
- no background extraction audit.
- no schema drift audit.
- UI loading/empty/error checks.
- source boundary checks.
- Carnos truthfulness checks.
- retrieval audit trail checks.
- context pack budget checks.
- provider deferred checks.
- full npm run check.
- completion report.
- smoke checklist.
- final commit/push.

Rules:

- Phase 17 is not complete unless all audits and full check pass.
- Completion report must list what is implemented, deferred, forbidden, and handed off to Phase 20.

---

## 6. Real product features in Phase 17

User-visible features:

- Memory inbox.
- Approved memory list.
- Candidate detail.
- Edit-before-approve.
- Approve/reject/archive/forget/lock.
- Sensitivity labels.
- Source/provenance display.
- Confidence/evidence display.
- Knowledge vault retrieval visibility.
- Carnos memory panel.
- Retrieval explanations.
- Pending/approved/rejected/superseded/locked status visibility.

Backend/intelligence features:

- Memory repositories.
- Approved-memory retrieval.
- Embedding provider boundary.
- Retrieval ranking.
- Retrieval budget.
- Dedupe.
- Conflict resolver.
- conflict resolver
- Superseded memory handling.
- Confidence/evidence strength.
- Context pack builder.
- Knowledge bridge.
- Source bridges.
- Retrieval audit trail.

Guardrails/proof gates:

- Roadmap reconciliation.
- Data boundary matrix.
- Schema ownership map.
- AI capability matrix.
- No silent write rule.
- No fake embedding rule.
- No background extraction rule.
- Memory truthfulness rule.
- Voice mismatch note.
- Final acceptance gates.
- Smoke checklists.
- Audit scripts.

---

## 7. Deferred / not allowed in Phase 17

Phase 17 must not add:

- full autonomous memory agent,
- background memory scanning,
- full document ingestion engine,
- full voice memory flow,
- real embedding provider activation before boundary and explicit scope,
- cross-user/shared memory,
- unbounded vector search,
- automatic personality rewriting,
- hidden emotion-based memory saving,
- full export/delete implementation,
- unrelated analytics/custom tracker/privacy polish features from Phases 18–21.

---

## 8. Phase 17A acceptance criteria

Phase 17A is complete only when:

- this scope lock exists,
- the boundary contract exists,
- the discovery report exists,
- the smoke checklist exists,
- the audit script exists,
- `package.json` wires `audit:phase17a` into `npm run check`,
- no schema/migration was added by 17A,
- no runtime provider was added by 17A,
- no Memory/RAG feature implementation was added by 17A,
- `npm run audit:phase17a` passes,
- `npm run check` passes,
- changes are committed and pushed.
