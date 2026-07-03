# Phase 17A — Memory/RAG Scope Lock Smoke Checklist

Status: REQUIRED BEFORE COMPLETION

## Scope lock

- [ ] Phase 17A scope lock exists.
- [ ] Full 17A–17Q build map is documented.
- [ ] Every discussed feature is listed.
- [ ] Every loophole-prevention rule is listed.
- [ ] Deferred/not-allowed items are listed.
- [ ] Source-of-truth reconciliation is listed.
- [ ] Voice Foundation mismatch note is listed.

## Boundary rules

- [ ] No silent durable memory writes rule is present.
- [ ] Memory candidate vs approved memory distinction is present.
- [ ] Memory vs knowledge distinction is present.
- [ ] Memory vs current-info distinction is present.
- [ ] No fake embeddings rule is present.
- [ ] No background memory extraction rule is present.
- [ ] Carnos memory truthfulness rule is present.
- [ ] Sensitive retrieval lock rule is present.
- [ ] Retrieval budget/dedupe rule is present.

## Discovery

- [ ] Existing memory-adjacent foundations are acknowledged.
- [ ] Official Memory/RAG is marked not complete yet.
- [ ] Schema discovery command is included.
- [ ] Future schema steps must ask for discovery/schema first.

## Repo safety

- [ ] Phase 17A adds no SQL migration.
- [ ] Phase 17A adds no API route.
- [ ] Phase 17A adds no UI component.
- [ ] Phase 17A adds no repository implementation.
- [ ] Phase 17A adds no embedding provider runtime.
- [ ] `audit:phase17a` is wired into `npm run check`.
- [ ] `npm run audit:phase17a` passes.
- [ ] `npm run check` passes.
