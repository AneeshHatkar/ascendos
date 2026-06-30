# Phase 15A — Carnos Persistent Memory + Continuity Scope Lock Smoke Checklist

Status: Ready.

## Source alignment

- [ ] Phase 14 is complete at commit `56c1c7f`.
- [ ] Phase 15 is aligned to JSON chunk 17 Memory/RAG.
- [ ] Phase 15 is interpreted as Carnos Persistent Memory + Continuity Foundation.
- [ ] Phase 15A does not implement runtime memory behavior.

## Carnos continuity checks

- [ ] Carnos Jarvis-like continuity goal is locked.
- [ ] Carnos persistent entity/persona state is locked.
- [ ] Carnos current project/current phase awareness is locked.
- [ ] Current context pack builder is locked.
- [ ] Project/system state memory is locked.
- [ ] Conversation continuity records are locked.
- [ ] Carnos memory visibility in `/carnos` is locked.

## Memory checks

- [ ] Memory candidates are locked.
- [ ] Memory Inbox is locked.
- [ ] Approved memories are locked.
- [ ] Rejected memories are locked.
- [ ] Forgotten memories are locked.
- [ ] Memory priority/ranking is locked.
- [ ] Memory confidence is locked.
- [ ] Memory staleness is locked.
- [ ] Memory review dates are locked.
- [ ] Memory conflict resolution is locked.
- [ ] Manual remember/forget/update controls are locked.
- [ ] Do-not-remember rules are locked.

## Privacy and safety checks

- [ ] No silent memory rule is locked.
- [ ] No automatic transcript-to-memory rule is locked.
- [ ] No direct autonomous memory writes rule is locked.
- [ ] Private mode memory block is locked.
- [ ] Sensitive memory locks are locked.
- [ ] Restricted memory behavior is locked.
- [ ] No hidden retrieval rule is locked.
- [ ] No unapproved embeddings rule is locked.
- [ ] Forget/delete derived records rule is locked.
- [ ] No ghost memory rule is locked.

## Knowledge and retrieval checks

- [ ] Knowledge vault separation is locked.
- [ ] `/knowledge` future vault surface is locked.
- [ ] Retrieval contract is locked.
- [ ] Retrieval provenance is locked.
- [ ] Retrieval conflict handling is locked.
- [ ] Retrieval sensitivity gating is locked.
- [ ] Embedding boundary/noop provider is locked.

## Whole-project connectivity checks

- [ ] `/command` connectivity is locked.
- [ ] `/carnos` connectivity is locked.
- [ ] `/calendar` connectivity is locked.
- [ ] `/timeline` connectivity is locked.
- [ ] `/goals` connectivity is locked.
- [ ] `/career` connectivity is locked.
- [ ] `/learning` connectivity is locked.
- [ ] `/research-stanford` connectivity is locked.
- [ ] `/body` connectivity is locked.
- [ ] `/nutrition` connectivity is locked.
- [ ] `/grimoire` connectivity is locked.
- [ ] `/analytics` connectivity is locked.
- [ ] `/privacy` connectivity is locked.
- [ ] `/custom-trackers` connectivity is locked.
- [ ] `/knowledge` connectivity is locked.

## Route boundary checks

- [ ] `/privacy` is locked as memory control surface.
- [ ] `/carnos` is locked as Carnos memory visibility surface.
- [ ] `/knowledge` is locked as future knowledge vault surface.
- [ ] No standalone `/memory` route is added in 15A.
- [ ] No standalone `/rag` route is added in 15A.
- [ ] No standalone `/vector-search` route is added in 15A.

## 15A runtime forbidden checks

- [ ] No SQL migration added.
- [ ] No memory table added.
- [ ] No vector table added.
- [ ] No pgvector added.
- [ ] No embedding implementation added.
- [ ] No provider call added.
- [ ] No OpenAI call added.
- [ ] No RAG runtime added.
- [ ] No automatic memory capture added.
- [ ] No voice transcript auto-memory added.
- [ ] No hidden Carnos prompt injection added.
- [ ] No background memory job added.
- [ ] No new memory route added.

## Verification

- [ ] `npm run audit:phase15a` passes.
- [ ] `npm run check` passes.
