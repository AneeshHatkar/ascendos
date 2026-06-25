# Phase 10 — Research Schema Design

## Purpose

This document designs the research-side data model for Phase 10 before SQL implementation.

Phase 10 must support the loop:

Skill -> Project -> Research Idea -> Literature -> Experiment -> Result -> Paper -> Proof -> Resume -> Professor/Lab -> PhD/Career

This schema design is documentation only. It does not create database tables yet.

## Design Rules

The Phase 10 research schema must:

- preserve all previous phases
- avoid editing old migrations
- start SQL implementation later at migration 0010
- keep all user-owned tables scoped by `user_id`
- use nullable links to earlier systems
- support read-first dashboards
- support safe proposed-action previews
- avoid memory/RAG tables
- avoid autonomous Carnos writes
- avoid direct dashboard mutations

## Research Data Model Overview

The research schema is organized around nine core concepts:

1. Research ideas
2. Research questions
3. Literature review items
4. Citations
5. Research claims
6. Experiments
7. Experiment results
8. Research papers
9. Paper versions, venues, submissions, and feedback

## Proposed Tables

### research_ideas

Purpose: Tracks possible research ideas before they become papers or projects.

Suggested fields:

- id
- user_id
- title
- summary
- research_area
- status
- priority
- novelty_score
- feasibility_score
- impact_score
- proof_strength_score
- project_id
- skill_id
- goal_id
- task_id
- proof_item_id
- source
- notes
- created_at
- updated_at

Suggested status values:

- captured
- exploring
- active
- blocked
- converted_to_paper
- paused
- archived

### research_questions

Purpose: Breaks a research idea into precise questions or hypotheses.

Suggested fields:

- id
- user_id
- research_idea_id
- question
- hypothesis
- variable_focus
- expected_outcome
- status
- notes
- created_at
- updated_at

Suggested status values:

- open
- investigating
- supported
- rejected
- revised
- archived

### research_literature_items

Purpose: Tracks papers, articles, books, technical reports, or references being read.

Suggested fields:

- id
- user_id
- title
- authors
- year
- venue
- source_url
- doi
- arxiv_id
- item_type
- reading_status
- relevance_score
- credibility_score
- summary
- key_methods
- key_results
- limitations
- notes
- related_research_idea_id
- related_project_id
- proof_item_id
- created_at
- updated_at

Suggested item_type values:

- paper
- article
- book
- thesis
- technical_report
- documentation
- dataset
- benchmark
- other

Suggested reading_status values:

- saved
- skimmed
- reading
- read
- summarized
- cited
- archived

### research_citations

Purpose: Connects literature items to research ideas, claims, papers, and paper versions.

Suggested fields:

- id
- user_id
- literature_item_id
- research_idea_id
- research_claim_id
- research_paper_id
- paper_version_id
- citation_purpose
- citation_note
- quote_or_excerpt
- page_or_section
- created_at
- updated_at

Suggested citation_purpose values:

- background
- related_work
- method_support
- result_comparison
- limitation
- future_work
- contradiction
- definition
- benchmark
- other

### research_claims

Purpose: Tracks claims that must be backed by literature, experiments, results, or proof.

Suggested fields:

- id
- user_id
- research_idea_id
- research_paper_id
- paper_version_id
- claim_text
- claim_type
- support_status
- evidence_strength
- literature_item_id
- experiment_result_id
- proof_item_id
- project_id
- resume_bullet_id
- notes
- created_at
- updated_at

Suggested claim_type values:

- novelty
- method
- result
- comparison
- limitation
- contribution
- application
- future_work

Suggested support_status values:

- unsupported
- partially_supported
- supported
- contradicted
- needs_review

### research_experiments

Purpose: Tracks experiments required to support research claims or papers.

Suggested fields:

- id
- user_id
- research_idea_id
- research_question_id
- project_id
- title
- objective
- method
- dataset
- baseline
- variables
- metrics
- reproducibility_status
- status
- started_at
- completed_at
- notes
- created_at
- updated_at

Suggested status values:

- planned
- running
- blocked
- completed
- failed
- archived

Suggested reproducibility_status values:

- not_started
- partial
- reproducible
- not_reproducible
- needs_cleanup

### research_results

Purpose: Stores experimental outcomes and links them to proof, papers, claims, and projects.

Suggested fields:

- id
- user_id
- research_experiment_id
- research_idea_id
- project_id
- title
- result_summary
- metric_name
- metric_value
- metric_unit
- comparison_baseline
- interpretation
- limitation
- figure_reference
- table_reference
- proof_item_id
- paper_version_id
- created_at
- updated_at

### research_papers

Purpose: Tracks paper-level research artifacts.

Suggested fields:

- id
- user_id
- title
- abstract
- research_area
- status
- target_venue_id
- primary_research_idea_id
- project_id
- proof_item_id
- resume_bullet_id
- notes
- created_at
- updated_at

Suggested status values:

- idea
- outline
- drafting
- internal_review
- professor_review
- revision
- submission_ready
- submitted
- accepted
- rejected
- archived

### research_paper_versions

Purpose: Tracks paper drafts and versions over time.

Suggested fields:

- id
- user_id
- research_paper_id
- version_label
- file_url
- doc_url
- abstract_snapshot
- status
- page_count
- readiness_score
- main_gap
- notes
- created_at
- updated_at

Suggested status values:

- draft
- reviewed
- revised
- submission_candidate
- archived

### research_venues

Purpose: Tracks possible conferences, journals, workshops, or internal targets.

Suggested fields:

- id
- user_id
- name
- venue_type
- field
- ranking_note
- deadline
- submission_url
- page_limit
- format_requirements
- fit_score
- notes
- created_at
- updated_at

Suggested venue_type values:

- conference
- journal
- workshop
- symposium
- preprint
- internal_review
- other

### research_submissions

Purpose: Tracks paper submissions and outcomes.

Suggested fields:

- id
- user_id
- research_paper_id
- research_venue_id
- submitted_at
- status
- decision
- decision_at
- reviewer_summary
- next_action
- notes
- created_at
- updated_at

Suggested status values:

- planned
- preparing
- submitted
- under_review
- accepted
- rejected
- withdrawn
- archived

### research_feedback

Purpose: Tracks feedback from professors, collaborators, reviewers, or self-review.

Suggested fields:

- id
- user_id
- research_paper_id
- paper_version_id
- research_idea_id
- feedback_source_type
- feedback_source_name
- feedback_date
- summary
- required_changes
- severity
- status
- task_id
- proof_item_id
- notes
- created_at
- updated_at

Suggested feedback_source_type values:

- professor
- advisor
- collaborator
- reviewer
- self_review
- peer
- other

Suggested status values:

- received
- triaged
- in_progress
- addressed
- rejected
- archived

## Cross-Phase Nullable Links

Phase 10 research records may link to existing records through nullable fields:

- goal_id
- task_id
- proof_item_id
- project_id
- skill_id
- resume_bullet_id

These links must remain nullable to avoid requiring existing Phase 1-9 records to change.

## RLS and Ownership Requirements

Every user-owned research table must include:

- user_id referencing public.profiles(id)
- RLS enabled
- SELECT policy scoped to auth.uid()
- INSERT policy scoped to auth.uid()
- user_id index

Cross-parent ownership must be hardened in a separate migration if needed.

## Deferred Features

Do not include in this research schema:

- memory_items
- embeddings
- vector search
- autonomous literature scraping
- automatic citation fetching
- automatic paper submission
- automatic professor emailing
- AI-generated claims without proof
- Python/ML direct writes

## Chunk B Result

This design is ready to be translated into SQL during Chunk C.
