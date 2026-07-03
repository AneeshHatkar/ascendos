# Phase 17B — Memory/RAG Boundary Smoke Checklist

Status: REQUIRED BEFORE COMPLETION

## Boundary documents

- [ ] Data Boundary Matrix exists.
- [ ] AI Capability Matrix exists.
- [ ] Schema Ownership Map exists.
- [ ] Completion report exists.
- [ ] Phase 17B audit script exists.

## Required boundary coverage

- [ ] Memory candidate boundary is documented.
- [ ] Approved memory boundary is documented.
- [ ] Knowledge vault boundary is documented.
- [ ] Current-info source boundary is documented.
- [ ] Document note boundary is documented.
- [ ] Research note boundary is documented.
- [ ] Career note boundary is documented.
- [ ] Goal/project note boundary is documented.
- [ ] Carnos conversation boundary is documented.
- [ ] Manual user entry boundary is documented.
- [ ] Embedding record boundary is documented.
- [ ] Retrieval event boundary is documented.

## AI capability coverage

- [ ] No silent durable memory write is documented.
- [ ] Carnos candidate suggestion requires confirmation.
- [ ] Approved memory retrieval is planned but bounded.
- [ ] Embedding provider is runtime-deferred unless explicitly activated.
- [ ] Background memory extraction is forbidden.
- [ ] Voice memory flow is runtime-deferred.
- [ ] Carnos truthfulness wording is documented.

## Schema ownership coverage

- [ ] memory_candidates ownership is documented.
- [ ] approved_memories ownership is documented.
- [ ] memory audit/events ownership is documented.
- [ ] retrieval event ownership is documented.
- [ ] embedding record ownership is documented.
- [ ] conflict/supersession ownership is documented.
- [ ] RLS/user ownership expectation is documented.
- [ ] 17C schema discovery command is documented.

## Repo safety

- [ ] Phase 17B adds no SQL migration.
- [ ] Phase 17B adds no API route.
- [ ] Phase 17B adds no UI component.
- [ ] Phase 17B adds no repository implementation.
- [ ] Phase 17B adds no provider runtime.
- [ ] `npm run audit:phase17b` passes.
- [ ] `npm run check` passes.
