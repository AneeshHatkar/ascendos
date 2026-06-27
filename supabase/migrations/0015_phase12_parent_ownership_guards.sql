-- Phase 12 — Parent Ownership Guards
-- Scope: C05 / Step 12.18
--
-- Purpose:
-- Prevent Phase 12 rows from linking to parent records owned by another user.
--
-- This migration only adds SQL guard functions/triggers.
-- It does not add app code, TypeScript types, repositories, dashboards, or proposed-action execution.

create or replace function public.phase12_assert_parent_belongs_to_user(
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
    raise exception 'Phase 12 parent ownership guard failed: % references a missing parent record.', field_name;
  end if;

  if parent_owner <> expected_user_id then
    raise exception 'Phase 12 parent ownership guard failed: % references a parent record owned by another user.', field_name;
  end if;
end;
$$;

create or replace function public.phase12_guard_financial_logs_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase12_assert_parent_belongs_to_user('public.financial_accounts'::regclass, new.account_id, new.user_id, 'financial_logs.account_id');
  perform public.phase12_assert_parent_belongs_to_user('public.budget_categories'::regclass, new.budget_category_id, new.user_id, 'financial_logs.budget_category_id');
  perform public.phase12_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'financial_logs.related_task_id');
  perform public.phase12_assert_parent_belongs_to_user('public.events'::regclass, new.related_event_id, new.user_id, 'financial_logs.related_event_id');
  perform public.phase12_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'financial_logs.source_ai_action_id');
  perform public.phase12_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'financial_logs.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase12_financial_logs_parent_ownership_guard on public.financial_logs;
create trigger phase12_financial_logs_parent_ownership_guard
before insert or update on public.financial_logs
for each row execute function public.phase12_guard_financial_logs_parent_ownership();

create or replace function public.phase12_guard_subscriptions_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase12_assert_parent_belongs_to_user('public.budget_categories'::regclass, new.budget_category_id, new.user_id, 'subscriptions.budget_category_id');
  perform public.phase12_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'subscriptions.related_task_id');
  perform public.phase12_assert_parent_belongs_to_user('public.events'::regclass, new.related_event_id, new.user_id, 'subscriptions.related_event_id');
  perform public.phase12_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'subscriptions.source_ai_action_id');
  perform public.phase12_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'subscriptions.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase12_subscriptions_parent_ownership_guard on public.subscriptions;
create trigger phase12_subscriptions_parent_ownership_guard
before insert or update on public.subscriptions
for each row execute function public.phase12_guard_subscriptions_parent_ownership();

create or replace function public.phase12_guard_documents_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase12_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'documents.related_task_id');
  perform public.phase12_assert_parent_belongs_to_user('public.events'::regclass, new.related_event_id, new.user_id, 'documents.related_event_id');
  perform public.phase12_assert_parent_belongs_to_user('public.ai_actions'::regclass, new.source_ai_action_id, new.user_id, 'documents.source_ai_action_id');
  perform public.phase12_assert_parent_belongs_to_user('public.chat_messages'::regclass, new.source_chat_message_id, new.user_id, 'documents.source_chat_message_id');

  return new;
end;
$$;

drop trigger if exists phase12_documents_parent_ownership_guard on public.documents;
create trigger phase12_documents_parent_ownership_guard
before insert or update on public.documents
for each row execute function public.phase12_guard_documents_parent_ownership();

create or replace function public.phase12_guard_housing_options_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase12_assert_parent_belongs_to_user('public.documents'::regclass, new.related_document_id, new.user_id, 'housing_options.related_document_id');
  perform public.phase12_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'housing_options.related_task_id');
  perform public.phase12_assert_parent_belongs_to_user('public.events'::regclass, new.related_event_id, new.user_id, 'housing_options.related_event_id');

  return new;
end;
$$;

drop trigger if exists phase12_housing_options_parent_ownership_guard on public.housing_options;
create trigger phase12_housing_options_parent_ownership_guard
before insert or update on public.housing_options
for each row execute function public.phase12_guard_housing_options_parent_ownership();

create or replace function public.phase12_guard_housing_contacts_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase12_assert_parent_belongs_to_user('public.housing_options'::regclass, new.housing_option_id, new.user_id, 'housing_contacts.housing_option_id');
  perform public.phase12_assert_parent_belongs_to_user('public.tasks'::regclass, new.related_task_id, new.user_id, 'housing_contacts.related_task_id');

  return new;
end;
$$;

drop trigger if exists phase12_housing_contacts_parent_ownership_guard on public.housing_contacts;
create trigger phase12_housing_contacts_parent_ownership_guard
before insert or update on public.housing_contacts
for each row execute function public.phase12_guard_housing_contacts_parent_ownership();
