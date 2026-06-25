# Phase 10 — Stanford / PhD Schema Design

## Purpose

This document designs the Stanford / PhD readiness data model for Phase 10 before SQL implementation.

The Stanford / PhD side of Phase 10 should answer:

- Which universities, labs, and professors match the user's research direction?
- What evidence supports that fit?
- What gaps remain before a strong PhD or top-lab application?
- Which application assets are missing or weak?
- What next action should be proposed, without writing automatically?

This schema design is documentation only. It does not create database tables yet.

## Design Rules

The Stanford / PhD schema must:

- preserve all previous phases
- avoid editing old migrations
- link to research records through nullable references
- avoid automatic outreach
- avoid scraping
- avoid hidden writes
- support read-first dashboards
- support later safe proposed actions

## Proposed Tables

### target_universities

Purpose: Tracks universities/programs the user may target.

Suggested fields:

- id
- user_id
- name
- program_name
- department
- country
- location
- target_level
- fit_score
- competitiveness
- application_deadline
- requirements_url
- notes
- created_at
- updated_at

Suggested target_level values:

- dream
- reach
- target
- safety
- exploratory

### target_labs

Purpose: Tracks labs, research groups, institutes, or centers.

Suggested fields:

- id
- user_id
- target_university_id
- name
- research_area
- lab_url
- fit_score
- fit_reason
- related_research_idea_id
- related_research_paper_id
- related_project_id
- notes
- created_at
- updated_at

### target_professors

Purpose: Tracks professors/advisors and research fit.

Suggested fields:

- id
- user_id
- target_university_id
- target_lab_id
- name
- title
- email
- profile_url
- research_area
- fit_score
- fit_reason
- outreach_status
- last_contacted_at
- related_literature_item_id
- related_research_idea_id
- related_research_paper_id
- related_project_id
- notes
- created_at
- updated_at

Suggested outreach_status values:

- not_started
- researching
- draft_needed
- ready_to_contact
- contacted
- replied
- follow_up_needed
- not_fit
- archived

### phd_readiness_assessments

Purpose: Tracks readiness across research, GPA/context, publications, recommendations, SOP, projects, and proof.

Suggested fields:

- id
- user_id
- assessment_date
- overall_score
- research_score
- publication_score
- project_score
- proof_score
- recommendation_score
- sop_score
- professor_fit_score
- academic_context_score
- main_gap
- next_action
- notes
- created_at
- updated_at

### phd_application_assets

Purpose: Tracks assets required for PhD/top-lab applications.

Suggested fields:

- id
- user_id
- target_university_id
- asset_type
- title
- status
- file_url
- doc_url
- quality_score
- due_date
- task_id
- proof_item_id
- notes
- created_at
- updated_at

Suggested asset_type values:

- sop
- cv
- resume
- transcript
- recommendation
- writing_sample
- research_statement
- portfolio
- paper
- test_score
- other

Suggested status values:

- missing
- planned
- drafting
- needs_review
- ready
- submitted
- archived

### sop_versions

Purpose: Tracks statement-of-purpose versions and alignment.

Suggested fields:

- id
- user_id
- target_university_id
- version_label
- doc_url
- thesis
- research_fit_summary
- professor_fit_summary
- weakness_notes
- readiness_score
- status
- created_at
- updated_at

Suggested status values:

- outline
- draft
- reviewed
- revised
- ready
- submitted
- archived

### recommendation_targets

Purpose: Tracks recommendation-letter strategy.

Suggested fields:

- id
- user_id
- recommender_name
- recommender_role
- institution_or_company
- relationship_context
- strength_score
- request_status
- requested_at
- due_date
- target_university_id
- related_research_paper_id
- related_project_id
- proof_item_id
- notes
- created_at
- updated_at

Suggested request_status values:

- potential
- preparing
- requested
- agreed
- submitted
- unavailable
- archived

## Cross-Phase Nullable Links

Stanford / PhD records may link to:

- research_idea_id
- research_paper_id
- literature_item_id
- project_id
- proof_item_id
- task_id
- goal_id
- resume_bullet_id

These links should be nullable.

## Privacy and Safety Requirements

Phase 10 must not:

- email professors automatically
- imply admission chances as fact
- create fake publications
- fabricate professor fit
- fabricate citations
- submit applications
- mutate records without confirmation
- expose private application strategy publicly

## Dashboard Use

The Stanford / PhD dashboard should show:

- target universities
- target labs
- target professors
- readiness scores
- application assets
- SOP versions
- recommendation targets
- gaps
- proposed next actions

## Chunk B Result

This design is ready to be translated into SQL during Chunk C.
