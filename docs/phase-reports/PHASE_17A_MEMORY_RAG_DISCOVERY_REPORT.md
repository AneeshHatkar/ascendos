# Phase 17A — Memory/RAG Discovery Report

Status: DISCOVERY LOCKED
Phase: 17A
Scope: discover current repo state before Memory/RAG implementation.

---

## 1. Discovery purpose

Phase 17A discovery confirms what exists before Phase 17 implementation.

This report must be updated if future discovery reveals additional existing memory/RAG/schema files.

---

## 2. Known pre-existing memory-adjacent foundations

Before Phase 17, the repo may contain memory-adjacent foundations such as:

- Carnos continuity contracts,
- approved-memory read layer,
- current context pack builder,
- retrieval contract,
- knowledge vault source bridge,
- current-info review/save candidate flow,
- Carnos current-info integration,
- Carnos visual reviewing_memory state.

These are not the full official Phase 17 Memory/RAG system.

---

## 3. Not yet complete before Phase 17

The official Phase 17 Memory/RAG system is not yet complete before this phase.

Missing/remaining official Phase 17 work includes:

- memory inbox,
- approved memory management flow,
- embeddings foundation,
- vector/retrieval storage if scoped,
- knowledge vault retrieval system,
- memory approval UI,
- Memory/RAG schema as dedicated phase,
- Carnos memory context retrieval as complete system,
- retrieval audit trail,
- retrieval explanation,
- conflict/staleness handling,
- sensitive retrieval lock,
- final Memory/RAG audit and smoke checklist.

---

## 4. Discovery command to run before schema work

Before Phase 17C or any schema-writing step, run this command and review the output before implementation:

    cd ~/Desktop/ascendos || exit 1

    grep -RInE 'memory|memories|embedding|embeddings|knowledge|vault|vector|rag|retrieval|carnos-continuity|current-context|approved-memory|source bridge|candidate' \
      supabase/migrations \
      src/lib \
      src/app \
      src/components \
      docs/contracts \
      docs/phase-reports \
      scripts \
      | head -300

    find supabase/migrations -type f | sort

    npm run validate:migrations
    npm run check
    git status --short

Any implementation step that touches schema must show this discovery output first.

---

## 5. Phase 17A discovery conclusion

Phase 17A adds no schema and no runtime implementation.

The next implementation step after Phase 17A should be 17B, not schema.
17B must complete the boundary/data ownership matrix before 17C schema work begins.
