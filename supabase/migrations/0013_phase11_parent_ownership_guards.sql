-- Phase 11 — Parent Ownership / RLS Hardening
-- Scope: 11.16 parent ownership guards only.
--
-- This migration protects Phase 11 child-row parent links.
-- It ensures parent records referenced by Phase 11 rows belong to the same user_id.
--
-- Boundaries:
-- - Does not create new tables.
-- - Does not alter Phase 11 table shape.
-- - Does not create health_body_baselines.
-- - Does not create progress_photos.
-- - Does not create storage buckets or upload behavior.
-- - Does not add TypeScript, routes, dashboards, repositories, Python/ML, memory/RAG, or Carnos writes.

create or replace function public.phase11_parent_belongs_to_user(
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
    'daily_logs',
    'events',
    'ai_actions',
    'chat_messages',
    'workouts',
    'exercises',
    'nutrition_logs',
    'supplements'
  ) then
    return false;
  end if;

  execute format('select user_id from public.%I where id = $1', parent_table_name)
    into parent_owner_id
    using parent_record_id;

  return parent_owner_id = expected_user_id;
end;
$$;

create or replace function public.phase11_assert_parent_belongs_to_user(
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
  if not public.phase11_parent_belongs_to_user(parent_table_name, parent_record_id, expected_user_id) then
    raise exception 'Phase 11 ownership violation: %.% does not belong to user %',
      parent_table_name,
      parent_column_name,
      expected_user_id
      using errcode = '42501';
  end if;
end;
$$;

create or replace function public.phase11_validate_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id is null then
    raise exception 'Phase 11 ownership violation: user_id is required'
      using errcode = '23502';
  end if;

  if tg_table_name = 'body_logs' then
    perform public.phase11_assert_parent_belongs_to_user('goals', new.goal_id, new.user_id, 'goal_id');
    perform public.phase11_assert_parent_belongs_to_user('tasks', new.task_id, new.user_id, 'task_id');
    perform public.phase11_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
    perform public.phase11_assert_parent_belongs_to_user('daily_logs', new.daily_log_id, new.user_id, 'daily_log_id');
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'workouts' then
    perform public.phase11_assert_parent_belongs_to_user('goals', new.goal_id, new.user_id, 'goal_id');
    perform public.phase11_assert_parent_belongs_to_user('tasks', new.task_id, new.user_id, 'task_id');
    perform public.phase11_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
    perform public.phase11_assert_parent_belongs_to_user('events', new.event_id, new.user_id, 'event_id');
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'workout_sets' then
    perform public.phase11_assert_parent_belongs_to_user('workouts', new.workout_id, new.user_id, 'workout_id');
    perform public.phase11_assert_parent_belongs_to_user('exercises', new.exercise_id, new.user_id, 'exercise_id');

  elsif tg_table_name = 'nutrition_logs' then
    perform public.phase11_assert_parent_belongs_to_user('goals', new.goal_id, new.user_id, 'goal_id');
    perform public.phase11_assert_parent_belongs_to_user('tasks', new.task_id, new.user_id, 'task_id');
    perform public.phase11_assert_parent_belongs_to_user('proof_items', new.proof_item_id, new.user_id, 'proof_item_id');
    perform public.phase11_assert_parent_belongs_to_user('daily_logs', new.daily_log_id, new.user_id, 'daily_log_id');
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'meal_items' then
    perform public.phase11_assert_parent_belongs_to_user('nutrition_logs', new.nutrition_log_id, new.user_id, 'nutrition_log_id');

  elsif tg_table_name = 'supplement_logs' then
    perform public.phase11_assert_parent_belongs_to_user('supplements', new.supplement_id, new.user_id, 'supplement_id');

  elsif tg_table_name = 'sleep_logs' then
    perform public.phase11_assert_parent_belongs_to_user('daily_logs', new.daily_log_id, new.user_id, 'daily_log_id');
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'energy_logs' then
    perform public.phase11_assert_parent_belongs_to_user('daily_logs', new.daily_log_id, new.user_id, 'daily_log_id');
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'mental_health_logs' then
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'emotion_logs' then
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'journal_entries' then
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'skincare_logs' then
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');

  elsif tg_table_name = 'haircare_logs' then
    perform public.phase11_assert_parent_belongs_to_user('ai_actions', new.source_ai_action_id, new.user_id, 'source_ai_action_id');
    perform public.phase11_assert_parent_belongs_to_user('chat_messages', new.source_chat_message_id, new.user_id, 'source_chat_message_id');
  end if;

  return new;
end;
$$;

drop trigger if exists body_logs_parent_ownership_guard on public.body_logs;
create trigger body_logs_parent_ownership_guard before insert or update on public.body_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists workouts_parent_ownership_guard on public.workouts;
create trigger workouts_parent_ownership_guard before insert or update on public.workouts for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists workout_sets_parent_ownership_guard on public.workout_sets;
create trigger workout_sets_parent_ownership_guard before insert or update on public.workout_sets for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists nutrition_logs_parent_ownership_guard on public.nutrition_logs;
create trigger nutrition_logs_parent_ownership_guard before insert or update on public.nutrition_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists meal_items_parent_ownership_guard on public.meal_items;
create trigger meal_items_parent_ownership_guard before insert or update on public.meal_items for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists supplement_logs_parent_ownership_guard on public.supplement_logs;
create trigger supplement_logs_parent_ownership_guard before insert or update on public.supplement_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists sleep_logs_parent_ownership_guard on public.sleep_logs;
create trigger sleep_logs_parent_ownership_guard before insert or update on public.sleep_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists energy_logs_parent_ownership_guard on public.energy_logs;
create trigger energy_logs_parent_ownership_guard before insert or update on public.energy_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists mental_health_logs_parent_ownership_guard on public.mental_health_logs;
create trigger mental_health_logs_parent_ownership_guard before insert or update on public.mental_health_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists emotion_logs_parent_ownership_guard on public.emotion_logs;
create trigger emotion_logs_parent_ownership_guard before insert or update on public.emotion_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists journal_entries_parent_ownership_guard on public.journal_entries;
create trigger journal_entries_parent_ownership_guard before insert or update on public.journal_entries for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists skincare_logs_parent_ownership_guard on public.skincare_logs;
create trigger skincare_logs_parent_ownership_guard before insert or update on public.skincare_logs for each row execute function public.phase11_validate_parent_ownership();

drop trigger if exists haircare_logs_parent_ownership_guard on public.haircare_logs;
create trigger haircare_logs_parent_ownership_guard before insert or update on public.haircare_logs for each row execute function public.phase11_validate_parent_ownership();
