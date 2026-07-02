# Phase 16G — Source Candidate Capture + Destination Router Smoke Checklist

## Required checks

- Source candidate file exists.
- Destination router file exists.
- Capture barrel export exists.
- Source candidate capture can produce candidate_captured.
- Source candidate capture can produce candidate_missing_url.
- Source candidate capture can produce candidate_missing_title.
- Source candidate capture keeps is_persisted false.
- Source candidate capture keeps autosave disabled.
- Destination router supports job_search_review.
- Destination router supports company_research_review.
- Destination router supports professor_lab_review.
- Destination router supports research_paper_review.
- Destination router supports documentation_review.
- Destination router supports current_resource_review.
- Destination router supports manual_review.
- Destination router keeps routes suggestion-only.
- No external retrieval is added.
- No SQL reads or writes are added.
- No source persistence is added.
- npm run audit:phase16g passes.
- npm run check passes.
