-- Phase 10 — Parent Ownership / RLS Hardening
-- Scope: 10.8 ownership guards only.
-- This migration protects nullable parent links on Phase 10 records.
-- It does not create memory_items, embeddings, app code, read helpers, or dashboard writes.

create or replace function public.phase10_parent_belongs_to_user(
  parent_table_name text,
  parent_record_id uuid,
  expected_user_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_owner_id uuid;
begin
  if parent_record_id is null then
    return true;
  end if;

  if parent_table_name not in (
    'goals',
    'tasks',
    'proof_items',
    'projects',
    'skills',
    'resume_bullets',
    'research_ideas',
    'research_questions',
    'research_literature_items',
    'research_claims',
    'research_experiments',
    'research_results',
    'research_papers',
    'research_paper_versions',
    'research_venues',
    'research_submissions',
    'research_feedback',
    'target_universities',
    'target_labs',
    'target_professors',
    'phd_application_assets',
    'sop_versions',
    'recommendation_targets'
  ) then
    return false;
  end if;

  execute format('select user_id from public.%I where id = $1', parent_table_name)
    into parent_owner_id
    using parent_record_id;

  return parent_owner_id = expected_user_id;
end;
$$;

create or replace function public.phase10_assert_parent_belongs_to_user(
  parent_table_name text,
  parent_record_id uuid,
  expected_user_id uuid,
  parent_column_name text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.phase10_parent_belongs_to_user(parent_table_name, parent_record_id, expected_user_id) then
    raise exception 'Phase 10 ownership violation: %.% does not belong to user %',
      parent_table_name,
      parent_column_name,
      expected_user_id
      using errcode = '42501';
  end if;
end;
$$;

create or replace function public.phase10_validate_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id is null then
    raise exception 'Phase 10 ownership violation: user_id is required'
      using errcode = '23502';
  end if;

  if tg_table_name = 'research_ideas' then
    perform public.phase10_assert_parent_belongs_to_user('projects', new.project_id, new.user_id, 'project_id');
    perform public.phase10_assert_parent_belongs_to_user('skills', new.skill_id, new.user_id, 'skill_id');
    perform public.phase10_assert_parent_belongs_to_user('goals', new.goal_id, new.user_id, 'goal_id');
    perform public.phase10_assert_parent_belongs_to_user('tasks', new.task_id, new.user_id, 'task_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');

  elsif tg_table_name = 'research_questions' then
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.research_idea_id, new.user_id, 'research_idea_id');

  elsif tg_table_name = 'research_literature_items' then
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.related_research_idea_id, new.user_id, 'related_research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.related_project_id, new.user_id, 'related_project_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');

  elsif tg_table_name = 'research_papers' then
    perform public.phase10_assert_parent_belongs_to_user('research_venues', new.target_venue_id, new.user_id, 'target_venue_id');
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.primary_research_idea_id, new.user_id, 'primary_research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.project_id, new.user_id, 'project_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
    perform public.phase10_assert_parent_belongs_to_user('resume_bullets', new.resume_bullet_id, new.user_id, 'resume_bullet_id');

  elsif tg_table_name = 'research_paper_versions' then
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.research_paper_id, new.user_id, 'research_paper_id');

  elsif tg_table_name = 'research_claims' then
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.research_idea_id, new.user_id, 'research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.research_paper_id, new.user_id, 'research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('research_paper_versions', new.paper_version_id, new.user_id, 'paper_version_id');
    perform public.phase10_assert_parent_belongs_to_user('research_literature_items', new.literature_item_id, new.user_id, 'literature_item_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.project_id, new.user_id, 'project_id');
    perform public.phase10_assert_parent_belongs_to_user('resume_bullets', new.resume_bullet_id, new.user_id, 'resume_bullet_id');

  elsif tg_table_name = 'research_experiments' then
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.research_idea_id, new.user_id, 'research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('research_questions', new.research_question_id, new.user_id, 'research_question_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.project_id, new.user_id, 'project_id');

  elsif tg_table_name = 'research_results' then
    perform public.phase10_assert_parent_belongs_to_user('research_experiments', new.research_experiment_id, new.user_id, 'research_experiment_id');
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.research_idea_id, new.user_id, 'research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.project_id, new.user_id, 'project_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
    perform public.phase10_assert_parent_belongs_to_user('research_paper_versions', new.paper_version_id, new.user_id, 'paper_version_id');

  elsif tg_table_name = 'research_citations' then
    perform public.phase10_assert_parent_belongs_to_user('research_literature_items', new.literature_item_id, new.user_id, 'literature_item_id');
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.research_idea_id, new.user_id, 'research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('research_claims', new.research_claim_id, new.user_id, 'research_claim_id');
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.research_paper_id, new.user_id, 'research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('research_paper_versions', new.paper_version_id, new.user_id, 'paper_version_id');

  elsif tg_table_name = 'research_submissions' then
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.research_paper_id, new.user_id, 'research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('research_venues', new.research_venue_id, new.user_id, 'research_venue_id');

  elsif tg_table_name = 'research_feedback' then
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.research_paper_id, new.user_id, 'research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('research_paper_versions', new.paper_version_id, new.user_id, 'paper_version_id');
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.research_idea_id, new.user_id, 'research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('tasks', new.task_id, new.user_id, 'task_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');

  elsif tg_table_name = 'target_labs' then
    perform public.phase10_assert_parent_belongs_to_user('target_universities', new.target_university_id, new.user_id, 'target_university_id');
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.related_research_idea_id, new.user_id, 'related_research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.related_research_paper_id, new.user_id, 'related_research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.related_project_id, new.user_id, 'related_project_id');

  elsif tg_table_name = 'target_professors' then
    perform public.phase10_assert_parent_belongs_to_user('target_universities', new.target_university_id, new.user_id, 'target_university_id');
    perform public.phase10_assert_parent_belongs_to_user('target_labs', new.target_lab_id, new.user_id, 'target_lab_id');
    perform public.phase10_assert_parent_belongs_to_user('research_literature_items', new.related_literature_item_id, new.user_id, 'related_literature_item_id');
    perform public.phase10_assert_parent_belongs_to_user('research_ideas', new.related_research_idea_id, new.user_id, 'related_research_idea_id');
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.related_research_paper_id, new.user_id, 'related_research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.related_project_id, new.user_id, 'related_project_id');

  elsif tg_table_name = 'phd_application_assets' then
    perform public.phase10_assert_parent_belongs_to_user('target_universities', new.target_university_id, new.user_id, 'target_university_id');
    perform public.phase10_assert_parent_belongs_to_user('tasks', new.task_id, new.user_id, 'task_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');

  elsif tg_table_name = 'sop_versions' then
    perform public.phase10_assert_parent_belongs_to_user('target_universities', new.target_university_id, new.user_id, 'target_university_id');

  elsif tg_table_name = 'recommendation_targets' then
    perform public.phase10_assert_parent_belongs_to_user('target_universities', new.target_university_id, new.user_id, 'target_university_id');
    perform public.phase10_assert_parent_belongs_to_user('research_papers', new.related_research_paper_id, new.user_id, 'related_research_paper_id');
    perform public.phase10_assert_parent_belongs_to_user('projects', new.related_project_id, new.user_id, 'related_project_id');
    perform public.phase10_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
  end if;

  return new;
end;
$$;

drop trigger if exists research_ideas_parent_ownership_guard on public.research_ideas;
create trigger research_ideas_parent_ownership_guard before insert or update on public.research_ideas for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_questions_parent_ownership_guard on public.research_questions;
create trigger research_questions_parent_ownership_guard before insert or update on public.research_questions for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_literature_items_parent_ownership_guard on public.research_literature_items;
create trigger research_literature_items_parent_ownership_guard before insert or update on public.research_literature_items for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_papers_parent_ownership_guard on public.research_papers;
create trigger research_papers_parent_ownership_guard before insert or update on public.research_papers for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_paper_versions_parent_ownership_guard on public.research_paper_versions;
create trigger research_paper_versions_parent_ownership_guard before insert or update on public.research_paper_versions for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_claims_parent_ownership_guard on public.research_claims;
create trigger research_claims_parent_ownership_guard before insert or update on public.research_claims for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_experiments_parent_ownership_guard on public.research_experiments;
create trigger research_experiments_parent_ownership_guard before insert or update on public.research_experiments for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_results_parent_ownership_guard on public.research_results;
create trigger research_results_parent_ownership_guard before insert or update on public.research_results for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_citations_parent_ownership_guard on public.research_citations;
create trigger research_citations_parent_ownership_guard before insert or update on public.research_citations for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_submissions_parent_ownership_guard on public.research_submissions;
create trigger research_submissions_parent_ownership_guard before insert or update on public.research_submissions for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists research_feedback_parent_ownership_guard on public.research_feedback;
create trigger research_feedback_parent_ownership_guard before insert or update on public.research_feedback for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists target_labs_parent_ownership_guard on public.target_labs;
create trigger target_labs_parent_ownership_guard before insert or update on public.target_labs for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists target_professors_parent_ownership_guard on public.target_professors;
create trigger target_professors_parent_ownership_guard before insert or update on public.target_professors for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists phd_application_assets_parent_ownership_guard on public.phd_application_assets;
create trigger phd_application_assets_parent_ownership_guard before insert or update on public.phd_application_assets for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists sop_versions_parent_ownership_guard on public.sop_versions;
create trigger sop_versions_parent_ownership_guard before insert or update on public.sop_versions for each row execute function public.phase10_validate_parent_ownership();

drop trigger if exists recommendation_targets_parent_ownership_guard on public.recommendation_targets;
create trigger recommendation_targets_parent_ownership_guard before insert or update on public.recommendation_targets for each row execute function public.phase10_validate_parent_ownership();
