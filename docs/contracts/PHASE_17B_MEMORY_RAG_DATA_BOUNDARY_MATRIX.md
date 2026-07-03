# Phase 17B — Memory/RAG Data Boundary Matrix

Status: LOCKED
Phase: 17B
Depends on: Phase 17A commit `da45e0d`
Scope: boundary/design ownership only
Schema changes: none
Runtime changes: none
UI changes: none
Repository changes: none

---

## 1. Purpose

Phase 17B defines the data boundaries for official Chunk 17 Memory/RAG before schema work begins.

This document exists so Phase 17C does not accidentally mix:

- personal memory,
- memory candidates,
- approved memories,
- knowledge vault items,
- current-info sources,
- document notes,
- research notes,
- career notes,
- goal/project notes,
- Carnos conversation context,
- manual user entries,
- voice artifacts,
- audit logs,
- embeddings,
- retrieval events.

Phase 17B is a boundary-lock phase. It does not create schema, repositories, UI, API routes, providers, or runtime retrieval.

---

## 2. Roadmap reconciliation carried forward

Official source-of-truth:

- Chunk 17 — Memory/RAG
- Goal: Memory inbox, approved memories, embeddings, knowledge vault retrieval.

Repo reconciliation:

- Official JSON Chunk 16 = Voice Foundation.
- Repo Phase 16 = Current Information/Web foundation.
- Repo Phase 16.5 = Carnos Visual Identity.
- Repo Phase 17A = Memory/RAG scope lock.
- Repo Phase 17B = Memory/RAG boundary/capability/schema ownership lock.
- Voice Foundation mismatch remains unresolved and must not be hidden.
- Existing voice routes are not proof that official Voice Foundation is complete.
- Phase 17 must not implement full voice memory flow.

---

## 3. Core data categories

## 3.1 Memory Candidate

Definition:
A proposed memory that may become approved memory only after user review/edit/approval.

Examples:
- Carnos suggests: “User prefers ML Engineer/Data Engineer/SWE roles.”
- User manually adds: “Remember that I prefer concise implementation steps.”
- Current-info review suggests a career-related fact.
- Project source suggests a durable project preference.

May be created by:
- manual user entry,
- Carnos suggestion,
- current-info source bridge,
- knowledge vault bridge,
- document bridge,
- career bridge,
- research bridge,
- goals bridge,
- projects bridge.

May not:
- be used as approved memory by default,
- be silently promoted,
- be retrieved as durable Carnos memory,
- override approved memory without approval,
- bypass sensitivity rules.

Required metadata:
- candidate id,
- user ownership,
- proposed content,
- source type,
- source id,
- source route,
- confidence,
- evidence strength,
- sensitivity,
- status,
- created timestamp,
- review timestamp if applicable.

---

## 3.2 Approved Memory

Definition:
Durable user-approved personal memory that Carnos may retrieve if eligible.

May be created by:
- approving a memory candidate,
- user-approved manual memory creation if scoped later.

May be retrieved by:
- Carnos memory context pack builder,
- approved memory UI,
- retrieval audit tools,
- privacy/export controls in Phase 20.

May not:
- be created silently,
- be created directly by Carnos without user approval,
- include rejected candidates,
- include forgotten/archived/locked/superseded memory by default,
- be globally exposed if sensitive/locked.

Required metadata:
- approved memory id,
- candidate/source provenance,
- user ownership,
- approved content,
- sensitivity,
- status,
- confidence,
- evidence strength,
- source reliability if known,
- approved timestamp,
- last used timestamp,
- last confirmed timestamp,
- conflict/supersession metadata.

---

## 3.3 Knowledge Vault Item

Definition:
A saved knowledge item or source-backed note that may support reasoning but is not automatically personal memory.

May be retrieved as:
- knowledge context,
- supporting snippet,
- evidence source,
- possible memory candidate source.

May not:
- silently become personal memory,
- be labeled as user preference unless approved as memory,
- override approved memory,
- appear in Carnos memory pack without label as knowledge.

Required distinction:
Knowledge retrieval result must be labeled separately from approved personal memory.

---

## 3.4 Current-Info Source

Definition:
A current information source, citation, web candidate, review queue item, or saved source from Phase 16.

May:
- become a knowledge source,
- support a memory candidate suggestion,
- provide evidence metadata.

May not:
- become approved memory automatically,
- be treated as personal memory,
- bypass review queue,
- bypass source quality / freshness / citation rules.

---

## 3.5 Document Note

Definition:
Information extracted from or attached to a document/document-like source.

May:
- become a knowledge item,
- propose a memory candidate,
- support research/career/project workflows.

May not:
- become approved personal memory automatically,
- be ingested silently in background,
- bypass document ingestion scope,
- activate full document ingestion during Phase 17.

---

## 3.6 Research Note

Definition:
Research/paper/lab/project note owned by research workflows.

May:
- propose a memory candidate,
- retrieve as knowledge,
- link to paper/lab/project surfaces.

May not:
- become personal memory unless approved,
- be confused with Carnos durable personal memory,
- auto-update user identity or goals without approval.

---

## 3.7 Career Note

Definition:
Career/job/application/referral/resume/interview note.

May:
- propose a memory candidate,
- feed career retrieval,
- support Carnos suggestions.

May not:
- silently overwrite career goals,
- become memory without approval,
- expose sensitive job/immigration data in global memory preview.

---

## 3.8 Goal / Project Note

Definition:
Goal, task, project, roadmap, or progress note.

May:
- propose candidate memories,
- support planning context,
- feed retrieval if approved/eligible.

May not:
- silently become durable personal memory,
- overwrite old goals without conflict/supersession rules.

---

## 3.9 Carnos Conversation Context

Definition:
Current conversation/session context used for immediate response.

May:
- inform response within active conversation,
- propose memory candidates,
- show pending memory suggestions.

May not:
- be automatically saved as approved memory,
- be treated as durable memory after session unless approved,
- hide memory candidate creation.

---

## 3.10 Manual User Entry

Definition:
User explicitly creates or edits memory/knowledge data.

May:
- create memory candidate,
- approve memory,
- edit candidate before approval,
- mark sensitivity,
- archive/forget/lock.

Must:
- remain user-controlled,
- create audit events when writes are implemented,
- validate status and sensitivity.

---

## 3.11 Embedding Record

Definition:
A vector/fingerprint/search representation of approved memory or knowledge, when provider is activated.

May:
- support retrieval ranking,
- store provider/model metadata,
- store dimension metadata,
- store embedding status/failure.

May not:
- exist as fake semantic embedding,
- imply provider is active if noop/deferred,
- be generated by unapproved external calls.

---

## 3.12 Retrieval Event

Definition:
An audit trace of what was retrieved and why.

May include:
- query/context reason,
- retrieved approved memory ids,
- retrieved knowledge ids,
- retrieval mode,
- provider/deferred status,
- sensitivity status,
- budget metadata,
- excluded item reason if safe.

May not:
- leak locked/sensitive content in unsafe places,
- hide Carnos retrieval use,
- omit provider deferred state.

---

## 4. Data boundary matrix

| Data type | Owner module | Can propose memory candidate | Can become approved memory | Can be retrieved by Carnos | Needs approval | Sensitive lock applies | Notes |
|---|---|---:|---:|---:|---:|---:|---|
| Memory candidate | Memory/RAG | yes | only after approval | no by default | yes | yes | Pending only |
| Approved memory | Memory/RAG | n/a | yes | yes if eligible | already approved | yes | Durable personal context |
| Knowledge vault item | Knowledge Vault | yes | only if candidate approved | as knowledge only | yes for memory conversion | yes if sensitive | Not personal memory |
| Current-info source | Current Information | yes | only if candidate approved | as source/knowledge only | yes for memory conversion | yes if sensitive | Citation/source first |
| Document note | Documents/Knowledge | yes | only if candidate approved | as knowledge only | yes for memory conversion | yes | Full doc ingestion deferred |
| Research note | Research | yes | only if candidate approved | if bridged/labeled | yes for memory conversion | yes | Research context not identity |
| Career note | Career | yes | only if candidate approved | if bridged/labeled | yes for memory conversion | yes | Job/immigration-sensitive |
| Goal/project note | Goals/Projects | yes | only if candidate approved | if bridged/labeled | yes for memory conversion | yes | Conflict rules required |
| Carnos conversation | Carnos | yes | only if user approves | current session only unless approved | yes | yes | No silent save |
| Manual user entry | Memory/RAG UI | yes | yes through explicit flow | yes if approved | explicit user action | yes | User-controlled |
| Embedding record | Embedding boundary | no | no | supports retrieval only | n/a | inherits source sensitivity | No fake embeddings |
| Retrieval event | Audit/RAG | no | no | audit only | n/a | redact sensitive content | Trace, not memory |

---

## 5. Allowed source-to-memory routing

Allowed route:
source data → memory candidate → user review/edit → approval → approved memory → eligible retrieval → retrieval audit

Forbidden route:
source data → approved memory

Forbidden route:
Carnos conversation → approved memory

Forbidden route:
current-info source → personal memory

Forbidden route:
document note → personal memory

Forbidden route:
embedding result → memory

---

## 6. Required Phase 17B handoff to 17C

Before Phase 17C schema work, schema discovery must be requested and reviewed.

17C must design schema around:

- memory candidates,
- approved memories,
- memory audit/events,
- retrieval events,
- embedding records if scoped,
- conflict/supersession metadata,
- sensitivity/locked fields,
- provenance fields,
- user ownership/RLS compatibility.

17C must not write schema until existing migrations and data ownership assumptions are checked.
