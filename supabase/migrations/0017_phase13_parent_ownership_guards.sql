-- Phase 13 — Grimoire Parent Ownership Guards
-- Scope: 13C / Source Chunk 15
--
-- Purpose:
-- Prevent Grimoire rows from linking to parent records owned by another user.
--
-- This migration only adds SQL guard functions/triggers.
-- It does not add app code, TypeScript types, repositories, dashboards, or proposed-action execution.

create or replace function public.phase13_assert_parent_belongs_to_user(
  parent_table regclass,
  parent_id uuid,
  expected_user_id uuid,
  field_name text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_owner uuid;
begin
  if parent_id is null then
    return;
  end if;

  execute format('select user_id from %s where id = $1', parent_table)
  into parent_owner
  using parent_id;

  if parent_owner is null then
    raise exception 'Phase 13 parent ownership guard failed: % references a missing parent record.', field_name;
  end if;

  if parent_owner <> expected_user_id then
    raise exception 'Phase 13 parent ownership guard failed: % references a parent record owned by another user.', field_name;
  end if;
end;
$$;

create or replace function public.phase13_guard_grimoire_modes_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase13_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'grimoire_modes.source_ai_action_id');
  perform public.phase13_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'grimoire_modes.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase13_grimoire_modes_parent_ownership_guard on public.grimoire_modes;
create trigger phase13_grimoire_modes_parent_ownership_guard
before insert or update on public.grimoire_modes
for each row execute function public.phase13_guard_grimoire_modes_parent_ownership();

create or replace function public.phase13_guard_grimoire_daily_logs_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase13_assert_parent_belongs_to_user('public.grimoire_modes'::regclass, new.mode_id, new.user_id, 'grimoire_daily_logs.mode_id');
  perform public.phase13_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'grimoire_daily_logs.related_task_id');
  perform public.phase13_assert_parent_belongs_to_user('public.goals'::regclass, new.related_goal_id, new.user_id, 'grimoire_daily_logs.related_goal_id');
  perform public.phase13_assert_parent_belongs_to_user('public.proof_items'::regclass, new.related_proof_item_id, new.user_id, 'grimoire_daily_logs.related_proof_item_id');
  perform public.phase13_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'grimoire_daily_logs.source_ai_action_id');
  perform public.phase13_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'grimoire_daily_logs.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase13_grimoire_daily_logs_parent_ownership_guard on public.grimoire_daily_logs;
create trigger phase13_grimoire_daily_logs_parent_ownership_guard
before insert or update on public.grimoire_daily_logs
for each row execute function public.phase13_guard_grimoire_daily_logs_parent_ownership();

create or replace function public.phase13_guard_grimoire_skills_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase13_assert_parent_belongs_to_user('public.goals'::regclass, new.related_goal_id, new.user_id, 'grimoire_skills.related_goal_id');
  perform public.phase13_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'grimoire_skills.related_task_id');
  perform public.phase13_assert_parent_belongs_to_user('public.proof_items'::regclass, new.related_proof_item_id, new.user_id, 'grimoire_skills.related_proof_item_id');
  perform public.phase13_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'grimoire_skills.source_ai_action_id');
  perform public.phase13_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'grimoire_skills.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase13_grimoire_skills_parent_ownership_guard on public.grimoire_skills;
create trigger phase13_grimoire_skills_parent_ownership_guard
before insert or update on public.grimoire_skills
for each row execute function public.phase13_guard_grimoire_skills_parent_ownership();

create or replace function public.phase13_guard_grimoire_corruption_checks_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase13_assert_parent_belongs_to_user('public.grimoire_daily_logs'::regclass, new.daily_log_id, new.user_id, 'grimoire_corruption_checks.daily_log_id');
  perform public.phase13_assert_parent_belongs_to_user('public.grimoire_modes'::regclass, new.mode_id, new.user_id, 'grimoire_corruption_checks.mode_id');
  perform public.phase13_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'grimoire_corruption_checks.related_task_id');
  perform public.phase13_assert_parent_belongs_to_user('public.proof_items'::regclass, new.related_proof_item_id, new.user_id, 'grimoire_corruption_checks.related_proof_item_id');
  perform public.phase13_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'grimoire_corruption_checks.source_ai_action_id');
  perform public.phase13_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'grimoire_corruption_checks.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase13_grimoire_corruption_checks_parent_ownership_guard on public.grimoire_corruption_checks;
create trigger phase13_grimoire_corruption_checks_parent_ownership_guard
before insert or update on public.grimoire_corruption_checks
for each row execute function public.phase13_guard_grimoire_corruption_checks_parent_ownership();

create or replace function public.phase13_guard_grimoire_reversions_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase13_assert_parent_belongs_to_user('public.grimoire_daily_logs'::regclass, new.daily_log_id, new.user_id, 'grimoire_reversions.daily_log_id');
  perform public.phase13_assert_parent_belongs_to_user('public.grimoire_modes'::regclass, new.mode_id, new.user_id, 'grimoire_reversions.mode_id');
  perform public.phase13_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'grimoire_reversions.related_task_id');
  perform public.phase13_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'grimoire_reversions.source_ai_action_id');
  perform public.phase13_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'grimoire_reversions.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase13_grimoire_reversions_parent_ownership_guard on public.grimoire_reversions;
create trigger phase13_grimoire_reversions_parent_ownership_guard
before insert or update on public.grimoire_reversions
for each row execute function public.phase13_guard_grimoire_reversions_parent_ownership();
