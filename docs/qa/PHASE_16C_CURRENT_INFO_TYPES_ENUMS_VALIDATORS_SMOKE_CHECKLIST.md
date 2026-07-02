# Phase 16C — Current-Info Types, Enums, and Validators Smoke Checklist

## Contract Files

- [ ] `current-info-enums.ts` exists.
- [ ] `current-info-contracts.ts` exists.
- [ ] `current-info-validators.ts` exists.
- [ ] `index.ts` exports all current-info contracts.

## Required Markers

- [ ] Query kinds include `job_search`, `company_research`, `lab_search`, `professor_search`, `paper_search`, `documentation_lookup`, `health_current_info`, `legal_current_info`, and `financial_current_info`.
- [ ] Source kinds include `job_posting`, `company_page`, `lab_page`, `professor_page`, `paper`, `documentation`, and `unknown`.
- [ ] Reliability labels include `official`, `primary_source`, `academic`, `reputable_secondary`, `community`, and `unknown`.
- [ ] Freshness labels include `live_or_recent`, `possibly_stale`, and `unknown`.
- [ ] Destination suggestions include `save_web_source_to_knowledge_candidate`.
- [ ] Candidate contract requires user review.
- [ ] Candidate contract blocks autosave.
- [ ] Candidate contract blocks automatic memory conversion.

## Safety Checks

- [ ] No SQL migration is added in Phase 16C.
- [ ] No runtime search provider is added.
- [ ] No network calls are added.
- [ ] No Supabase calls are added.
- [ ] No browser-side secrets are added.
- [ ] No direct writes from internet results are added.
- [ ] No automatic memory conversion is added.
- [ ] No pgvector is added.
- [ ] No memory_embeddings table is added.

## Automated Gate

- [ ] `npm run audit:phase16c` passes.
- [ ] `npm run check` passes.
