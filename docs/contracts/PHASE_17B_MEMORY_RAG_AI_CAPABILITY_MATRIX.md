# Phase 17B — Memory/RAG AI Capability Matrix

Status: LOCKED
Phase: 17B
Scope: capability truthfulness and AI boundary mapping only
Schema changes: none
Runtime changes: none

---

## 1. Purpose

This matrix defines what Carnos and ascendOS may claim, suggest, retrieve, or save during Phase 17 Memory/RAG.

The core rule is:

Carnos may help propose and organize memory, but Carnos must not silently create durable approved memory.

---

## 2. Capability statuses

Allowed status labels:

- enabled
- foundation_present
- runtime_deferred
- requires_confirmation
- forbidden
- planned

No other status should be used without updating this contract.

---

## 3. Memory/RAG capability matrix

| Capability | Status | Truthful user-facing wording | Forbidden wording |
|---|---|---|---|
| Propose memory candidate | requires_confirmation | I can suggest this as a memory for you to review. | I saved this to memory. |
| Save approved memory silently | forbidden | I need your approval before saving this as durable memory. | I remembered this automatically. |
| Edit memory candidate | planned | You will be able to edit this before approval. | I finalized this memory for you. |
| Approve memory | requires_confirmation | This becomes approved memory only after you confirm. | This is approved because I inferred it. |
| Reject memory candidate | planned | Rejected candidates will not be retrieved as memory. | I may still use rejected candidates. |
| Archive memory | planned | Archived memories are kept but not actively retrieved by default. | Archived memories are active memory. |
| Forget memory | planned | Forgotten memories are not used in Carnos context. | Forgotten memories remain active. |
| Delete/export memory | planned for Phase 20 | Full export/delete belongs to Privacy/Export. | Phase 17 already fully deletes everything. |
| Lock sensitive memory | planned | Locked memories are excluded by default from generic retrieval. | Locked memory may appear anywhere. |
| Retrieve approved memory | planned | I can use eligible approved memories once retrieval is implemented. | I can already semantically recall everything. |
| Retrieve knowledge vault | planned | I can retrieve knowledge separately from personal memory once implemented. | Knowledge is the same as personal memory. |
| Use current-info source as memory | forbidden without approval | Current-info can propose a memory candidate, but it is not memory by default. | I remembered this web source. |
| Use document note as memory | forbidden without approval | Documents can support candidates/knowledge, not silent memory. | I saved this document into memory. |
| Use embeddings | runtime_deferred | Semantic embedding retrieval is deferred until provider activation. | Embeddings are live if provider is noop. |
| Use noop embedding provider | foundation_present | Provider boundary can exist without real semantic search. | Noop embeddings are real semantic vectors. |
| Background memory extraction | forbidden | I do not scan and save memory in the background. | I continuously learn silently. |
| Voice memory flow | runtime_deferred | Full voice memory flow is not part of Phase 17. | Voice memory is fully active. |
| Carnos memory context pack | planned | I can build bounded memory context once implemented. | I always know all saved memory. |
| Retrieval audit trail | planned | Memory retrieval should be traceable. | Retrieval is invisible and unlogged. |

---

## 4. Carnos truthfulness rules

Carnos must say:

- “I can suggest saving this as a memory.”
- “This is pending until you approve it.”
- “This is approved memory.”
- “This is knowledge, not personal memory.”
- “Semantic embedding retrieval is not active yet.”
- “I do not have approved memory for that yet.”
- “I found this in retrieved knowledge, not memory.”
- “This memory is locked/sensitive and not used by default.”

Carnos must not say:

- “I remembered this” unless approved memory exists.
- “I saved this” without write confirmation.
- “I know this from memory” when it came from current conversation.
- “I found this in semantic memory” when embedding provider is deferred.
- “I always learn from our chats.”
- “I updated your personality automatically.”
- “I used locked memory” unless explicitly approved and audited.

---

## 5. Write boundaries

AI can propose:
- memory candidates,
- knowledge candidate links,
- retrieval explanations,
- conflict warnings,
- sensitivity suggestions.

AI cannot silently write:
- approved memories,
- permanent user preferences,
- identity statements,
- sensitive attributes,
- career goals,
- health/finance/immigration/legal memories,
- personality changes,
- retrieval exceptions.

Important writes require:
- clear user-facing preview,
- confirmation,
- validation,
- audit event once write paths exist.

---

## 6. Retrieval boundaries

Carnos retrieval must be:

- approved-only for memory,
- bounded by budget,
- deduped,
- sensitivity-aware,
- lock-aware,
- conflict-aware,
- supersession-aware,
- explainable,
- audited.

Carnos retrieval must exclude by default:

- pending candidates,
- rejected candidates,
- archived memories,
- forgotten memories,
- locked memories,
- superseded memories,
- sensitive memory without explicit allowed context.

---

## 7. Phase 17B handoff

Phase 17C must encode these capability boundaries into schema fields where needed:

- status,
- sensitivity,
- locked flag or locked status,
- provenance,
- confidence,
- evidence strength,
- approved timestamp,
- forgotten/archived timestamps,
- supersession/conflict fields,
- retrieval audit fields,
- embedding provider metadata if scoped.
