# Phase 10 — Source-to-Scope Traceability Matrix

## Purpose

This matrix maps the Phase 10 Research / Stanford System scope to source-approved project goals, existing foundations, and deferred future phases.

This is documentation only. It does not create SQL, app code, types, routes, or dashboard components.

## Traceability Matrix

| Scope Item | Phase 10 Coverage | Existing Foundation | Deferred Boundary |
|---|---|---|---|
| Research ideas | `research_ideas` design | projects, goals, proof | no AI idea generation writes |
| Research questions | `research_questions` design | projects, tasks | no autonomous hypothesis creation |
| Literature review | `research_literature_items` design | knowledge route, project links | no web scraping in Phase 10 |
| Citations | `research_citations` design | project link type `reference`, proof items | no automatic citation fetching |
| Research claims | `research_claims` design | proof items, project results, resume bullets | no unsupported generated claims |
| Experiments | `research_experiments` design | project type `experiment`, project tests | no Python/ML mutation |
| Results | `research_results` design | proof items, project releases | no fake metrics |
| Papers | `research_papers` design | project link type `paper`, proof items | no paper submission automation |
| Paper versions | `research_paper_versions` design | documents, proof, resume | no file processing automation yet |
| Venues | `research_venues` design | career/research planning docs | no live venue scraping |
| Submissions | `research_submissions` design | tasks, timeline | no automatic submission |
| Feedback | `research_feedback` design | tasks, proof, professor notes | no automatic email ingestion |
| Target universities | `target_universities` design | goals, career targets | no admissions prediction claims |
| Target labs | `target_labs` design | research ideas, papers, projects | no scraping |
| Target professors | `target_professors` design | literature, projects, papers | no automatic outreach |
| PhD readiness | `phd_readiness_assessments` design | proof, resume, projects, goals | no deterministic guarantee claims |
| Application assets | `phd_application_assets` design | resume, proof, tasks | no application submission |
| SOP versions | `sop_versions` design | documents, goals, professor fit | no AI submission without review |
| Recommendations | `recommendation_targets` design | networking, proof, projects | no automatic recommender contact |

## Existing Phase Links

Phase 10 should link to:

- Phase 4 SQL spine: profiles, goals, proof, tasks, events
- Phase 6 proposed-action flow: create_task, create_goal, create_proof_item
- Phase 7 operating dashboards: command, goals, timeline, proof, Carnos
- Phase 8 career system: resume, networking, interviews, career proof
- Phase 9 learning/project system: skills, sessions, quizzes, projects, releases, links, skill progress

## Safe-Link Strategy

Phase 10 should not require old records to change.

Use nullable references:

- goal_id
- task_id
- proof_item_id
- project_id
- skill_id
- resume_bullet_id
- daily_log_id
- timeline_event_id

Future SQL must harden ownership for cross-parent references.

## Deferred to Later Phases

### Phase 15 — Memory / RAG / Knowledge Vault

Deferred:

- memory_items
- embeddings
- vector search
- RAG over papers
- semantic retrieval

### Phase 16 — Internet / Web Tools

Deferred:

- live paper search
- live professor/lab scraping
- conference deadline fetching
- citation metadata lookup

### Phase 17 — Analytics / Experiments / Intelligence

Deferred:

- advanced scoring models
- publication probability analytics
- professor fit automation
- research velocity intelligence

### Later Safe-Write Expansions

Deferred:

- create research idea from Carnos
- create paper from proposal
- update readiness score through server action
- generate professor email draft and save as draft
- application submission workflow

## Chunk B Conclusion

Chunk B defines the Phase 10 design surface and confirms that implementation can proceed to Chunk C without modifying previous phases.
