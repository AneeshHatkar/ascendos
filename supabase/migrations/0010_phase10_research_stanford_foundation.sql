-- Phase 10 — Research / Stanford System SQL Foundation
-- Scope: 10.7 SQL migration only.
-- This migration adds Phase 10 user-owned research and Stanford/PhD tables.
-- It does not add memory_items, embeddings, autonomous writes, or dashboard code.

create table if not exists public.research_ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  summary text,
  research_area text,
  status text not null default 'captured' check (status in ('captured', 'exploring', 'active', 'blocked', 'converted_to_paper', 'paused', 'archived')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  novelty_score integer check (novelty_score between 0 and 100),
  feasibility_score integer check (feasibility_score between 0 and 100),
  impact_score integer check (impact_score between 0 and 100),
  proof_strength_score integer check (proof_strength_score between 0 and 100),
  project_id uuid references public.projects(id) on delete set null,
  skill_id uuid references public.skills(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  source text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_idea_id uuid references public.research_ideas(id) on delete cascade,
  question text not null,
  hypothesis text,
  variable_focus text,
  expected_outcome text,
  status text not null default 'open' check (status in ('open', 'investigating', 'supported', 'rejected', 'revised', 'archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_literature_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  authors text[] not null default '{}'::text[],
  publication_year integer,
  venue text,
  source_url text,
  doi text,
  arxiv_id text,
  item_type text not null default 'paper' check (item_type in ('paper', 'article', 'book', 'thesis', 'technical_report', 'documentation', 'dataset', 'benchmark', 'other')),
  reading_status text not null default 'saved' check (reading_status in ('saved', 'skimmed', 'reading', 'read', 'summarized', 'cited', 'archived')),
  relevance_score integer check (relevance_score between 0 and 100),
  credibility_score integer check (credibility_score between 0 and 100),
  summary text,
  key_methods text,
  key_results text,
  limitations text,
  notes text,
  related_research_idea_id uuid references public.research_ideas(id) on delete set null,
  related_project_id uuid references public.projects(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_papers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  abstract text,
  research_area text,
  status text not null default 'idea' check (status in ('idea', 'outline', 'drafting', 'internal_review', 'professor_review', 'revision', 'submission_ready', 'submitted', 'accepted', 'rejected', 'archived')),
  primary_research_idea_id uuid references public.research_ideas(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  resume_bullet_id uuid references public.resume_bullets(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_paper_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_paper_id uuid not null references public.research_papers(id) on delete cascade,
  version_label text not null,
  file_url text,
  doc_url text,
  abstract_snapshot text,
  status text not null default 'draft' check (status in ('draft', 'reviewed', 'revised', 'submission_candidate', 'archived')),
  page_count integer check (page_count >= 0),
  readiness_score integer check (readiness_score between 0 and 100),
  main_gap text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_idea_id uuid references public.research_ideas(id) on delete set null,
  research_paper_id uuid references public.research_papers(id) on delete set null,
  paper_version_id uuid references public.research_paper_versions(id) on delete set null,
  claim_text text not null,
  claim_type text not null default 'contribution' check (claim_type in ('novelty', 'method', 'result', 'comparison', 'limitation', 'contribution', 'application', 'future_work')),
  support_status text not null default 'unsupported' check (support_status in ('unsupported', 'partially_supported', 'supported', 'contradicted', 'needs_review')),
  evidence_strength integer check (evidence_strength between 0 and 100),
  literature_item_id uuid references public.research_literature_items(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  resume_bullet_id uuid references public.resume_bullets(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_experiments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_idea_id uuid references public.research_ideas(id) on delete set null,
  research_question_id uuid references public.research_questions(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  objective text,
  method text,
  dataset text,
  baseline text,
  variables jsonb not null default '{}'::jsonb,
  metrics jsonb not null default '{}'::jsonb,
  reproducibility_status text not null default 'not_started' check (reproducibility_status in ('not_started', 'partial', 'reproducible', 'not_reproducible', 'needs_cleanup')),
  status text not null default 'planned' check (status in ('planned', 'running', 'blocked', 'completed', 'failed', 'archived')),
  started_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_experiment_id uuid references public.research_experiments(id) on delete cascade,
  research_idea_id uuid references public.research_ideas(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  result_summary text,
  metric_name text,
  metric_value numeric,
  metric_unit text,
  comparison_baseline text,
  interpretation text,
  limitation text,
  figure_reference text,
  table_reference text,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  paper_version_id uuid references public.research_paper_versions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_citations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  literature_item_id uuid not null references public.research_literature_items(id) on delete cascade,
  research_idea_id uuid references public.research_ideas(id) on delete set null,
  research_claim_id uuid references public.research_claims(id) on delete set null,
  research_paper_id uuid references public.research_papers(id) on delete set null,
  paper_version_id uuid references public.research_paper_versions(id) on delete set null,
  citation_purpose text not null default 'background' check (citation_purpose in ('background', 'related_work', 'method_support', 'result_comparison', 'limitation', 'future_work', 'contradiction', 'definition', 'benchmark', 'other')),
  citation_note text,
  quote_or_excerpt text,
  page_or_section text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_venues (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  venue_type text not null default 'conference' check (venue_type in ('conference', 'journal', 'workshop', 'symposium', 'preprint', 'internal_review', 'other')),
  field text,
  ranking_note text,
  deadline date,
  submission_url text,
  page_limit integer check (page_limit >= 0),
  format_requirements text,
  fit_score integer check (fit_score between 0 and 100),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.research_papers
  add column if not exists target_venue_id uuid references public.research_venues(id) on delete set null;

create table if not exists public.research_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_paper_id uuid not null references public.research_papers(id) on delete cascade,
  research_venue_id uuid references public.research_venues(id) on delete set null,
  submitted_at timestamptz,
  status text not null default 'planned' check (status in ('planned', 'preparing', 'submitted', 'under_review', 'accepted', 'rejected', 'withdrawn', 'archived')),
  decision text,
  decision_at timestamptz,
  reviewer_summary text,
  next_action text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  research_paper_id uuid references public.research_papers(id) on delete set null,
  paper_version_id uuid references public.research_paper_versions(id) on delete set null,
  research_idea_id uuid references public.research_ideas(id) on delete set null,
  feedback_source_type text not null default 'self_review' check (feedback_source_type in ('professor', 'advisor', 'collaborator', 'reviewer', 'self_review', 'peer', 'other')),
  feedback_source_name text,
  feedback_date date,
  summary text not null,
  required_changes text,
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  status text not null default 'received' check (status in ('received', 'triaged', 'in_progress', 'addressed', 'rejected', 'archived')),
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.target_universities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  program_name text,
  department text,
  country text,
  location text,
  target_level text not null default 'exploratory' check (target_level in ('dream', 'reach', 'target', 'safety', 'exploratory')),
  fit_score integer check (fit_score between 0 and 100),
  competitiveness text,
  application_deadline date,
  requirements_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.target_labs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_university_id uuid references public.target_universities(id) on delete cascade,
  name text not null,
  research_area text,
  lab_url text,
  fit_score integer check (fit_score between 0 and 100),
  fit_reason text,
  related_research_idea_id uuid references public.research_ideas(id) on delete set null,
  related_research_paper_id uuid references public.research_papers(id) on delete set null,
  related_project_id uuid references public.projects(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.target_professors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_university_id uuid references public.target_universities(id) on delete set null,
  target_lab_id uuid references public.target_labs(id) on delete set null,
  name text not null,
  title text,
  email text,
  profile_url text,
  research_area text,
  fit_score integer check (fit_score between 0 and 100),
  fit_reason text,
  outreach_status text not null default 'not_started' check (outreach_status in ('not_started', 'researching', 'draft_needed', 'ready_to_contact', 'contacted', 'replied', 'follow_up_needed', 'not_fit', 'archived')),
  last_contacted_at timestamptz,
  related_literature_item_id uuid references public.research_literature_items(id) on delete set null,
  related_research_idea_id uuid references public.research_ideas(id) on delete set null,
  related_research_paper_id uuid references public.research_papers(id) on delete set null,
  related_project_id uuid references public.projects(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.phd_readiness_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  assessment_date date not null default current_date,
  overall_score integer check (overall_score between 0 and 100),
  research_score integer check (research_score between 0 and 100),
  publication_score integer check (publication_score between 0 and 100),
  project_score integer check (project_score between 0 and 100),
  proof_score integer check (proof_score between 0 and 100),
  recommendation_score integer check (recommendation_score between 0 and 100),
  sop_score integer check (sop_score between 0 and 100),
  professor_fit_score integer check (professor_fit_score between 0 and 100),
  academic_context_score integer check (academic_context_score between 0 and 100),
  main_gap text,
  next_action text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.phd_application_assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_university_id uuid references public.target_universities(id) on delete set null,
  asset_type text not null check (asset_type in ('sop', 'cv', 'resume', 'transcript', 'recommendation', 'writing_sample', 'research_statement', 'portfolio', 'paper', 'test_score', 'other')),
  title text not null,
  status text not null default 'missing' check (status in ('missing', 'planned', 'drafting', 'needs_review', 'ready', 'submitted', 'archived')),
  file_url text,
  doc_url text,
  quality_score integer check (quality_score between 0 and 100),
  due_date date,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sop_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_university_id uuid references public.target_universities(id) on delete set null,
  version_label text not null,
  doc_url text,
  thesis text,
  research_fit_summary text,
  professor_fit_summary text,
  weakness_notes text,
  readiness_score integer check (readiness_score between 0 and 100),
  status text not null default 'outline' check (status in ('outline', 'draft', 'reviewed', 'revised', 'ready', 'submitted', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.recommendation_targets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recommender_name text not null,
  recommender_role text,
  institution_or_company text,
  relationship_context text,
  strength_score integer check (strength_score between 0 and 100),
  request_status text not null default 'potential' check (request_status in ('potential', 'preparing', 'requested', 'agreed', 'submitted', 'unavailable', 'archived')),
  requested_at timestamptz,
  due_date date,
  target_university_id uuid references public.target_universities(id) on delete set null,
  related_research_paper_id uuid references public.research_papers(id) on delete set null,
  related_project_id uuid references public.projects(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.research_ideas enable row level security;
alter table public.research_questions enable row level security;
alter table public.research_literature_items enable row level security;
alter table public.research_citations enable row level security;
alter table public.research_claims enable row level security;
alter table public.research_experiments enable row level security;
alter table public.research_results enable row level security;
alter table public.research_papers enable row level security;
alter table public.research_paper_versions enable row level security;
alter table public.research_venues enable row level security;
alter table public.research_submissions enable row level security;
alter table public.research_feedback enable row level security;
alter table public.target_universities enable row level security;
alter table public.target_labs enable row level security;
alter table public.target_professors enable row level security;
alter table public.phd_readiness_assessments enable row level security;
alter table public.phd_application_assets enable row level security;
alter table public.sop_versions enable row level security;
alter table public.recommendation_targets enable row level security;

create policy "research_ideas_select_own" on public.research_ideas for select using (auth.uid() = user_id);
create policy "research_ideas_insert_own" on public.research_ideas for insert with check (auth.uid() = user_id);

create policy "research_questions_select_own" on public.research_questions for select using (auth.uid() = user_id);
create policy "research_questions_insert_own" on public.research_questions for insert with check (auth.uid() = user_id);

create policy "research_literature_items_select_own" on public.research_literature_items for select using (auth.uid() = user_id);
create policy "research_literature_items_insert_own" on public.research_literature_items for insert with check (auth.uid() = user_id);

create policy "research_citations_select_own" on public.research_citations for select using (auth.uid() = user_id);
create policy "research_citations_insert_own" on public.research_citations for insert with check (auth.uid() = user_id);

create policy "research_claims_select_own" on public.research_claims for select using (auth.uid() = user_id);
create policy "research_claims_insert_own" on public.research_claims for insert with check (auth.uid() = user_id);

create policy "research_experiments_select_own" on public.research_experiments for select using (auth.uid() = user_id);
create policy "research_experiments_insert_own" on public.research_experiments for insert with check (auth.uid() = user_id);

create policy "research_results_select_own" on public.research_results for select using (auth.uid() = user_id);
create policy "research_results_insert_own" on public.research_results for insert with check (auth.uid() = user_id);

create policy "research_papers_select_own" on public.research_papers for select using (auth.uid() = user_id);
create policy "research_papers_insert_own" on public.research_papers for insert with check (auth.uid() = user_id);

create policy "research_paper_versions_select_own" on public.research_paper_versions for select using (auth.uid() = user_id);
create policy "research_paper_versions_insert_own" on public.research_paper_versions for insert with check (auth.uid() = user_id);

create policy "research_venues_select_own" on public.research_venues for select using (auth.uid() = user_id);
create policy "research_venues_insert_own" on public.research_venues for insert with check (auth.uid() = user_id);

create policy "research_submissions_select_own" on public.research_submissions for select using (auth.uid() = user_id);
create policy "research_submissions_insert_own" on public.research_submissions for insert with check (auth.uid() = user_id);

create policy "research_feedback_select_own" on public.research_feedback for select using (auth.uid() = user_id);
create policy "research_feedback_insert_own" on public.research_feedback for insert with check (auth.uid() = user_id);

create policy "target_universities_select_own" on public.target_universities for select using (auth.uid() = user_id);
create policy "target_universities_insert_own" on public.target_universities for insert with check (auth.uid() = user_id);

create policy "target_labs_select_own" on public.target_labs for select using (auth.uid() = user_id);
create policy "target_labs_insert_own" on public.target_labs for insert with check (auth.uid() = user_id);

create policy "target_professors_select_own" on public.target_professors for select using (auth.uid() = user_id);
create policy "target_professors_insert_own" on public.target_professors for insert with check (auth.uid() = user_id);

create policy "phd_readiness_assessments_select_own" on public.phd_readiness_assessments for select using (auth.uid() = user_id);
create policy "phd_readiness_assessments_insert_own" on public.phd_readiness_assessments for insert with check (auth.uid() = user_id);

create policy "phd_application_assets_select_own" on public.phd_application_assets for select using (auth.uid() = user_id);
create policy "phd_application_assets_insert_own" on public.phd_application_assets for insert with check (auth.uid() = user_id);

create policy "sop_versions_select_own" on public.sop_versions for select using (auth.uid() = user_id);
create policy "sop_versions_insert_own" on public.sop_versions for insert with check (auth.uid() = user_id);

create policy "recommendation_targets_select_own" on public.recommendation_targets for select using (auth.uid() = user_id);
create policy "recommendation_targets_insert_own" on public.recommendation_targets for insert with check (auth.uid() = user_id);

create index if not exists research_ideas_user_id_idx on public.research_ideas(user_id);
create index if not exists research_questions_user_id_idx on public.research_questions(user_id);
create index if not exists research_literature_items_user_id_idx on public.research_literature_items(user_id);
create index if not exists research_citations_user_id_idx on public.research_citations(user_id);
create index if not exists research_claims_user_id_idx on public.research_claims(user_id);
create index if not exists research_experiments_user_id_idx on public.research_experiments(user_id);
create index if not exists research_results_user_id_idx on public.research_results(user_id);
create index if not exists research_papers_user_id_idx on public.research_papers(user_id);
create index if not exists research_paper_versions_user_id_idx on public.research_paper_versions(user_id);
create index if not exists research_venues_user_id_idx on public.research_venues(user_id);
create index if not exists research_submissions_user_id_idx on public.research_submissions(user_id);
create index if not exists research_feedback_user_id_idx on public.research_feedback(user_id);
create index if not exists target_universities_user_id_idx on public.target_universities(user_id);
create index if not exists target_labs_user_id_idx on public.target_labs(user_id);
create index if not exists target_professors_user_id_idx on public.target_professors(user_id);
create index if not exists phd_readiness_assessments_user_id_idx on public.phd_readiness_assessments(user_id);
create index if not exists phd_application_assets_user_id_idx on public.phd_application_assets(user_id);
create index if not exists sop_versions_user_id_idx on public.sop_versions(user_id);
create index if not exists recommendation_targets_user_id_idx on public.recommendation_targets(user_id);

create index if not exists research_questions_research_idea_id_idx on public.research_questions(research_idea_id);
create index if not exists research_literature_items_related_research_idea_id_idx on public.research_literature_items(related_research_idea_id);
create index if not exists research_claims_research_idea_id_idx on public.research_claims(research_idea_id);
create index if not exists research_claims_research_paper_id_idx on public.research_claims(research_paper_id);
create index if not exists research_experiments_research_idea_id_idx on public.research_experiments(research_idea_id);
create index if not exists research_results_research_experiment_id_idx on public.research_results(research_experiment_id);
create index if not exists research_paper_versions_research_paper_id_idx on public.research_paper_versions(research_paper_id);
create index if not exists research_submissions_research_paper_id_idx on public.research_submissions(research_paper_id);
create index if not exists research_feedback_research_paper_id_idx on public.research_feedback(research_paper_id);
create index if not exists target_labs_target_university_id_idx on public.target_labs(target_university_id);
create index if not exists target_professors_target_university_id_idx on public.target_professors(target_university_id);
create index if not exists target_professors_target_lab_id_idx on public.target_professors(target_lab_id);
