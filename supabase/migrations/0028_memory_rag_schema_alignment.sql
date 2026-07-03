-- Migration 0028: Memory/RAG schema alignment foundation
--
-- Purpose:
-- - Align official Memory/RAG schema work with the existing SQL foundation from migration 0024.
-- - Do not duplicate memory_candidates.
-- - Do not duplicate approved memory as a new approved_memories table.
-- - Treat public.memory_items as the canonical approved-memory table.
-- - Add missing schema foundations for embeddings, retrieval events, and conflicts.
-- - Preserve no-silent-memory-write, no-fake-embedding, and no-runtime-retrieval boundaries.
--
-- This migration adds schema only.
-- It does not generate embeddings.
-- It does not run vector search.
-- It does not activate a provider.
-- It does not create a standalone /memory route.
-- It does not approve memory automatically.
-- It does not retrieve memory at runtime.

alter table public.memory_candidates
  add column if not exists reviewed_at timestamptz,
  add column if not exists approved_memory_item_id uuid references public.memory_items(id) on delete set null,
  add column if not exists rejection_reason text,
  add column if not exists evidence_strength text not null default 'medium',
  add column if not exists source_reliability text not null default 'unknown',
  add column if not exists conflict_group_key text,
  add column if not exists duplicate_of_memory_item_id uuid references public.memory_items(id) on delete set null;

alter table public.memory_items
  add column if not exists locked_at timestamptz,
  add column if not exists locked_reason text,
  add column if not exists forgotten_reason text,
  add column if not exists superseded_by_memory_item_id uuid references public.memory_items(id) on delete set null,
  add column if not exists conflict_group_key text,
  add column if not exists evidence_strength text not null default 'medium',
  add column if not exists source_reliability text not null default 'unknown',
  add column if not exists retrieval_enabled boolean not null default true,
  add column if not exists semantic_retrieval_allowed boolean not null default false;

alter table public.retrieval_logs
  add column if not exists provider_status text not null default 'runtime_deferred',
  add column if not exists context_budget integer,
  add column if not exists result_count integer not null default 0,
  add column if not exists excluded_reason_summary text,
  add column if not exists retrieval_explanation text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'memory_candidates_evidence_strength_check'
  ) then
    alter table public.memory_candidates
      add constraint memory_candidates_evidence_strength_check
      check (evidence_strength in ('weak', 'medium', 'strong', 'source_backed', 'user_confirmed'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'memory_candidates_source_reliability_check'
  ) then
    alter table public.memory_candidates
      add constraint memory_candidates_source_reliability_check
      check (source_reliability in ('unknown', 'low', 'medium', 'high', 'source_of_truth'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'memory_items_evidence_strength_check'
  ) then
    alter table public.memory_items
      add constraint memory_items_evidence_strength_check
      check (evidence_strength in ('weak', 'medium', 'strong', 'source_backed', 'user_confirmed'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'memory_items_source_reliability_check'
  ) then
    alter table public.memory_items
      add constraint memory_items_source_reliability_check
      check (source_reliability in ('unknown', 'low', 'medium', 'high', 'source_of_truth'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'retrieval_logs_provider_status_check'
  ) then
    alter table public.retrieval_logs
      add constraint retrieval_logs_provider_status_check
      check (provider_status in ('disabled', 'noop', 'runtime_deferred', 'keyword_only', 'embedding_ready', 'embedding_failed'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'retrieval_logs_context_budget_check'
  ) then
    alter table public.retrieval_logs
      add constraint retrieval_logs_context_budget_check
      check (context_budget is null or context_budget >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'retrieval_logs_result_count_check'
  ) then
    alter table public.retrieval_logs
      add constraint retrieval_logs_result_count_check
      check (result_count >= 0);
  end if;
end $$;

create table if not exists public.memory_embedding_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_kind text not null,
  memory_item_id uuid references public.memory_items(id) on delete cascade,
  knowledge_item_id uuid references public.knowledge_items(id) on delete cascade,
  source_table text,
  source_record_id uuid,
  provider text not null default 'noop',
  model text,
  dimensions integer,
  embedding_status text not null default 'deferred',
  embedding_hash text,
  generated_at timestamptz,
  failed_at timestamptz,
  failure_reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint memory_embedding_records_source_kind_check check (
    source_kind in ('memory_item', 'knowledge_item', 'retrieval_contract', 'external_source')
  ),
  constraint memory_embedding_records_status_check check (
    embedding_status in ('deferred', 'queued', 'generated', 'failed', 'removed')
  ),
  constraint memory_embedding_records_provider_check check (
    provider in ('noop', 'manual', 'openai', 'local', 'other')
  ),
  constraint memory_embedding_records_dimensions_check check (
    dimensions is null or dimensions > 0
  ),
  constraint memory_embedding_records_one_known_source_check check (
    memory_item_id is not null
    or knowledge_item_id is not null
    or (source_table is not null and source_record_id is not null)
  )
);

create table if not exists public.memory_retrieval_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  retrieval_log_id uuid references public.retrieval_logs(id) on delete set null,
  retrieval_surface text not null,
  retrieval_reason text not null,
  retrieval_mode text not null default 'approved_memory_only',
  provider_status text not null default 'runtime_deferred',
  used_by_carnos boolean not null default false,
  retrieved_memory_ids uuid[] not null default '{}'::uuid[],
  retrieved_knowledge_ids uuid[] not null default '{}'::uuid[],
  blocked_memory_ids uuid[] not null default '{}'::uuid[],
  excluded_reason_summary text,
  sensitivity_summary text,
  context_budget integer,
  result_count integer not null default 0,
  retrieval_explanation text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint memory_retrieval_events_surface_not_blank check (length(trim(retrieval_surface)) > 0),
  constraint memory_retrieval_events_reason_not_blank check (length(trim(retrieval_reason)) > 0),
  constraint memory_retrieval_events_explanation_not_blank check (length(trim(retrieval_explanation)) > 0),
  constraint memory_retrieval_events_mode_check check (
    retrieval_mode in ('disabled', 'preview_only', 'approved_memory_only', 'knowledge_only', 'keyword_only', 'semantic_deferred')
  ),
  constraint memory_retrieval_events_provider_status_check check (
    provider_status in ('disabled', 'noop', 'runtime_deferred', 'keyword_only', 'embedding_ready', 'embedding_failed')
  ),
  constraint memory_retrieval_events_context_budget_check check (
    context_budget is null or context_budget >= 0
  ),
  constraint memory_retrieval_events_result_count_check check (result_count >= 0)
);

create table if not exists public.memory_conflict_groups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  conflict_key text not null,
  conflict_summary text not null,
  resolution_status text not null default 'unresolved',
  resolved_memory_item_id uuid references public.memory_items(id) on delete set null,
  resolved_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint memory_conflict_groups_key_not_blank check (length(trim(conflict_key)) > 0),
  constraint memory_conflict_groups_summary_not_blank check (length(trim(conflict_summary)) > 0),
  constraint memory_conflict_groups_status_check check (
    resolution_status in ('unresolved', 'needs_user_review', 'resolved', 'superseded', 'ignored')
  ),
  constraint memory_conflict_groups_user_key_unique unique (user_id, conflict_key)
);

create table if not exists public.memory_conflict_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  conflict_group_id uuid not null references public.memory_conflict_groups(id) on delete cascade,
  memory_item_id uuid references public.memory_items(id) on delete cascade,
  memory_candidate_id uuid references public.memory_candidates(id) on delete cascade,
  conflict_role text not null default 'competing',
  conflict_reason text not null,
  source_authority_score numeric not null default 0,
  confidence_score numeric not null default 0,
  created_at timestamptz not null default now(),
  constraint memory_conflict_members_target_check check (
    memory_item_id is not null or memory_candidate_id is not null
  ),
  constraint memory_conflict_members_role_check check (
    conflict_role in ('primary', 'competing', 'superseding', 'superseded', 'supporting')
  ),
  constraint memory_conflict_members_reason_not_blank check (length(trim(conflict_reason)) > 0),
  constraint memory_conflict_members_source_authority_score_check check (
    source_authority_score >= 0 and source_authority_score <= 1
  ),
  constraint memory_conflict_members_confidence_score_check check (
    confidence_score >= 0 and confidence_score <= 1
  )
);

drop trigger if exists set_memory_embedding_records_updated_at on public.memory_embedding_records;
create trigger set_memory_embedding_records_updated_at
before update on public.memory_embedding_records
for each row execute function public.set_updated_at();

drop trigger if exists set_memory_conflict_groups_updated_at on public.memory_conflict_groups;
create trigger set_memory_conflict_groups_updated_at
before update on public.memory_conflict_groups
for each row execute function public.set_updated_at();

alter table public.memory_embedding_records enable row level security;
alter table public.memory_retrieval_events enable row level security;
alter table public.memory_conflict_groups enable row level security;
alter table public.memory_conflict_members enable row level security;

create index if not exists memory_candidates_approved_memory_item_idx
  on public.memory_candidates(approved_memory_item_id);

create index if not exists memory_candidates_duplicate_memory_item_idx
  on public.memory_candidates(duplicate_of_memory_item_id);

create index if not exists memory_candidates_user_conflict_group_idx
  on public.memory_candidates(user_id, conflict_group_key);

create index if not exists memory_items_superseded_by_idx
  on public.memory_items(superseded_by_memory_item_id);

create index if not exists memory_items_user_conflict_group_idx
  on public.memory_items(user_id, conflict_group_key);

create index if not exists memory_items_user_retrieval_enabled_idx
  on public.memory_items(user_id, retrieval_enabled);

create index if not exists memory_embedding_records_user_id_idx
  on public.memory_embedding_records(user_id);

create index if not exists memory_retrieval_events_user_id_idx
  on public.memory_retrieval_events(user_id);

create index if not exists memory_conflict_groups_user_id_idx
  on public.memory_conflict_groups(user_id);

create index if not exists memory_conflict_members_user_id_idx
  on public.memory_conflict_members(user_id);

create index if not exists memory_embedding_records_user_status_idx
  on public.memory_embedding_records(user_id, embedding_status);

create index if not exists memory_embedding_records_memory_item_idx
  on public.memory_embedding_records(memory_item_id);

create index if not exists memory_embedding_records_knowledge_item_idx
  on public.memory_embedding_records(knowledge_item_id);

create index if not exists memory_retrieval_events_user_created_idx
  on public.memory_retrieval_events(user_id, created_at desc);

create index if not exists memory_retrieval_events_user_surface_idx
  on public.memory_retrieval_events(user_id, retrieval_surface);

create index if not exists memory_retrieval_events_retrieval_log_idx
  on public.memory_retrieval_events(retrieval_log_id);

create index if not exists memory_conflict_groups_user_status_idx
  on public.memory_conflict_groups(user_id, resolution_status);

create index if not exists memory_conflict_members_user_group_idx
  on public.memory_conflict_members(user_id, conflict_group_id);

create index if not exists memory_conflict_members_memory_item_idx
  on public.memory_conflict_members(memory_item_id);

create index if not exists memory_conflict_members_candidate_idx
  on public.memory_conflict_members(memory_candidate_id);

drop policy if exists "Users can view their own memory embedding records" on public.memory_embedding_records;
create policy "Users can view their own memory embedding records"
on public.memory_embedding_records for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory embedding records" on public.memory_embedding_records;
create policy "Users can insert their own memory embedding records"
on public.memory_embedding_records for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory embedding records" on public.memory_embedding_records;
create policy "Users can update their own memory embedding records"
on public.memory_embedding_records for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory embedding records" on public.memory_embedding_records;
create policy "Users can delete their own memory embedding records"
on public.memory_embedding_records for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory retrieval events" on public.memory_retrieval_events;
create policy "Users can view their own memory retrieval events"
on public.memory_retrieval_events for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory retrieval events" on public.memory_retrieval_events;
create policy "Users can insert their own memory retrieval events"
on public.memory_retrieval_events for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory retrieval events" on public.memory_retrieval_events;
create policy "Users can update their own memory retrieval events"
on public.memory_retrieval_events for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory retrieval events" on public.memory_retrieval_events;
create policy "Users can delete their own memory retrieval events"
on public.memory_retrieval_events for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory conflict groups" on public.memory_conflict_groups;
create policy "Users can view their own memory conflict groups"
on public.memory_conflict_groups for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory conflict groups" on public.memory_conflict_groups;
create policy "Users can insert their own memory conflict groups"
on public.memory_conflict_groups for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory conflict groups" on public.memory_conflict_groups;
create policy "Users can update their own memory conflict groups"
on public.memory_conflict_groups for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory conflict groups" on public.memory_conflict_groups;
create policy "Users can delete their own memory conflict groups"
on public.memory_conflict_groups for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory conflict members" on public.memory_conflict_members;
create policy "Users can view their own memory conflict members"
on public.memory_conflict_members for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory conflict members" on public.memory_conflict_members;
create policy "Users can insert their own memory conflict members"
on public.memory_conflict_members for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory conflict members" on public.memory_conflict_members;
create policy "Users can update their own memory conflict members"
on public.memory_conflict_members for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory conflict members" on public.memory_conflict_members;
create policy "Users can delete their own memory conflict members"
on public.memory_conflict_members for delete
using (auth.uid() = user_id);

create or replace function public.memory_rag_assert_parent_belongs_to_user(
  parent_table regclass,
  parent_id uuid,
  expected_user_id uuid,
  field_name text
)
returns void
language plpgsql
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
    raise exception 'Memory/RAG parent ownership guard failed: % references a missing parent record.', field_name;
  end if;

  if parent_owner <> expected_user_id then
    raise exception 'Memory/RAG parent ownership guard failed: % references a parent record owned by another user.', field_name;
  end if;
end;
$$;

create or replace function public.memory_rag_guard_memory_candidates_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_items'::regclass, new.approved_memory_item_id, new.user_id, 'memory_candidates.approved_memory_item_id');
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_items'::regclass, new.duplicate_of_memory_item_id, new.user_id, 'memory_candidates.duplicate_of_memory_item_id');
  return new;
end;
$$;

drop trigger if exists memory_rag_memory_candidates_parent_ownership_guard on public.memory_candidates;
create trigger memory_rag_memory_candidates_parent_ownership_guard
before insert or update on public.memory_candidates
for each row execute function public.memory_rag_guard_memory_candidates_parent_ownership();

create or replace function public.memory_rag_guard_memory_items_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_candidates'::regclass, new.candidate_id, new.user_id, 'memory_items.candidate_id');
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_items'::regclass, new.superseded_by_memory_item_id, new.user_id, 'memory_items.superseded_by_memory_item_id');
  return new;
end;
$$;

drop trigger if exists memory_rag_memory_items_parent_ownership_guard on public.memory_items;
create trigger memory_rag_memory_items_parent_ownership_guard
before insert or update on public.memory_items
for each row execute function public.memory_rag_guard_memory_items_parent_ownership();

create or replace function public.memory_rag_guard_embedding_records_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_items'::regclass, new.memory_item_id, new.user_id, 'memory_embedding_records.memory_item_id');
  perform public.memory_rag_assert_parent_belongs_to_user('public.knowledge_items'::regclass, new.knowledge_item_id, new.user_id, 'memory_embedding_records.knowledge_item_id');
  return new;
end;
$$;

drop trigger if exists memory_rag_embedding_records_parent_ownership_guard on public.memory_embedding_records;
create trigger memory_rag_embedding_records_parent_ownership_guard
before insert or update on public.memory_embedding_records
for each row execute function public.memory_rag_guard_embedding_records_parent_ownership();

create or replace function public.memory_rag_guard_retrieval_events_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.memory_rag_assert_parent_belongs_to_user('public.retrieval_logs'::regclass, new.retrieval_log_id, new.user_id, 'memory_retrieval_events.retrieval_log_id');
  return new;
end;
$$;

drop trigger if exists memory_rag_retrieval_events_parent_ownership_guard on public.memory_retrieval_events;
create trigger memory_rag_retrieval_events_parent_ownership_guard
before insert or update on public.memory_retrieval_events
for each row execute function public.memory_rag_guard_retrieval_events_parent_ownership();

create or replace function public.memory_rag_guard_conflict_groups_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_items'::regclass, new.resolved_memory_item_id, new.user_id, 'memory_conflict_groups.resolved_memory_item_id');
  return new;
end;
$$;

drop trigger if exists memory_rag_conflict_groups_parent_ownership_guard on public.memory_conflict_groups;
create trigger memory_rag_conflict_groups_parent_ownership_guard
before insert or update on public.memory_conflict_groups
for each row execute function public.memory_rag_guard_conflict_groups_parent_ownership();

create or replace function public.memory_rag_guard_conflict_members_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_conflict_groups'::regclass, new.conflict_group_id, new.user_id, 'memory_conflict_members.conflict_group_id');
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_items'::regclass, new.memory_item_id, new.user_id, 'memory_conflict_members.memory_item_id');
  perform public.memory_rag_assert_parent_belongs_to_user('public.memory_candidates'::regclass, new.memory_candidate_id, new.user_id, 'memory_conflict_members.memory_candidate_id');
  return new;
end;
$$;

drop trigger if exists memory_rag_conflict_members_parent_ownership_guard on public.memory_conflict_members;
create trigger memory_rag_conflict_members_parent_ownership_guard
before insert or update on public.memory_conflict_members
for each row execute function public.memory_rag_guard_conflict_members_parent_ownership();
