# Phase 16A — Web Search / Current Information Scope Lock Smoke Checklist

## Scope Lock

- [ ] Phase 16 official name is locked as Web Search / Current Information.
- [ ] Practical scope includes source capture, citation, reliability, freshness, and review-to-save foundation.
- [ ] Phase 16A–16R chunk structure is locked.
- [ ] Web search for jobs, companies, labs, papers, docs, and current resources is locked.
- [ ] Citations and reliability notes are locked.
- [ ] Current-info source capture is locked.
- [ ] Review-before-save is locked.
- [ ] Destination routing is locked.
- [ ] Duplicate detection is locked.
- [ ] Knowledge vault source bridge is locked.
- [ ] Privacy, sensitive search, and retention rules are locked.
- [ ] Web source audit trail is locked.

## Safety Boundaries

- [ ] No silent browsing.
- [ ] No background browsing.
- [ ] No uncontrolled fetch calls.
- [ ] No browser-side secrets.
- [ ] No search on page load.
- [ ] No direct writes from internet results.
- [ ] No automatic job applications.
- [ ] No automatic emails or outreach.
- [ ] No automatic paper/lab/professor saves.
- [ ] No automatic knowledge saves.
- [ ] No automatic memory conversion.
- [ ] No hidden Carnos current-info retrieval.
- [ ] No hidden Carnos prompt injection.
- [ ] No full raw page storage by default.
- [ ] No weak-source high-stakes answers.
- [ ] No private-mode query retention without explicit allow.
- [ ] No pgvector.
- [ ] No memory_embeddings.

## Phase 16A Non-Implementation Boundary

- [ ] No SQL migration added in Phase 16A.
- [ ] No search provider implementation activated in Phase 16A.
- [ ] No fetch calls added in Phase 16A.
- [ ] No Supabase write flow added in Phase 16A.
- [ ] No memory write flow added in Phase 16A.
- [ ] No proposed-action execution added in Phase 16A.

## Repo Checks

- [ ] `npm run audit:phase16a` passes.
- [ ] `npm run check` passes.
- [ ] Phase 16A docs are present.
- [ ] Phase 16A logs are present.
- [ ] Phase status points to Phase 16B.
