# Phase 10 Manual Smoke Checklist — Research / Stanford System

Status: Final checklist added. Manual browser QA remains to be run against authenticated local/live data.

## Global route checks

- [ ] `/research-lab` loads for an authenticated user.
- [ ] `/research-stanford` loads for an authenticated user.
- [ ] Unauthenticated access remains protected.
- [ ] No dashboard action silently changes records.
- [ ] No non-canonical research routes were added.
- [ ] `/research-lab` and `/research-stanford` remain present in the canonical route registry.
- [ ] Research routes remain dynamic authenticated read surfaces.

## Research Lab checks

- [ ] Research summary panel renders.
- [ ] Research registry cards render.
- [ ] Research idea/question detail panel renders.
- [ ] Literature detail panel renders.
- [ ] Claim/citation detail panel renders.
- [ ] Experiment/result detail panel renders.
- [ ] Paper/version/venue/submission/feedback detail panel renders.
- [ ] Research proof/linkage visibility renders.
- [ ] Empty states clearly mean no records exist yet, not system failure.
- [ ] Read errors appear inline and do not trigger writes or jobs.

## Research Stanford checks

- [ ] Stanford summary panel renders.
- [ ] Stanford/PhD registry cards render.
- [ ] University/lab/professor detail panel renders.
- [ ] SOP/application/recommendation/readiness detail panel renders.
- [ ] Stanford target-fit linkage panel renders.
- [ ] Empty states clearly mean no records exist yet, not system failure.
- [ ] Read errors appear inline and do not trigger writes or jobs.

## Cross-dashboard link checks

- [ ] Research system links render on `/research-lab`.
- [ ] Research system links render on `/research-stanford`.
- [ ] Links include Research Lab, Research Stanford, Projects, Learning, Proof, Resume, Goals, and Carnos.
- [ ] Active route is visually marked.
- [ ] Links use canonical routes only.

## Proposed-action visibility checks

- [ ] Research proposal preview cards render.
- [ ] Preview cards are disabled.
- [ ] Save/Confirm is unavailable in Phase 10 preview mode.
- [ ] Cancel is unavailable in Phase 10 preview mode.
- [ ] Payload editing is unavailable in Phase 10 preview mode.
- [ ] No callback is wired from the research dashboard layer.
- [ ] No proposal is persisted from the research dashboard layer.

## Privacy and safety checks

- [ ] Research and PhD data is scoped to the authenticated user.
- [ ] No private research data is exported.
- [ ] No professor email/message is sent.
- [ ] No lab/professor scraping starts.
- [ ] No paper submission starts.
- [ ] No application submission starts.
- [ ] No Python/ML worker starts.
- [ ] No memory/RAG operation starts.
- [ ] No background job starts.
- [ ] No direct SQL write occurs from research dashboard components.
