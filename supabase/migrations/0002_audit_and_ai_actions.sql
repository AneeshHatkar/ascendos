-- ascendOS + Carnos
-- Migration 0002: audit_logs and ai_actions foundation

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_type text not null default 'user'
    check (actor_type in ('user', 'carnos', 'system')),
  action_type text not null,
  entity_table text not null,
  entity_id uuid,
  before_state jsonb,
  after_state jsonb,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  logged_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.ai_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft'
    check (
      status in (
        'draft',
        'pending_confirmation',
        'approved',
        'rejected',
        'executed',
        'failed',
        'cancelled'
      )
    ),
  action_type text not null,
  target_table text,
  target_id uuid,
  title text,
  description text,
  payload jsonb not null default '{}'::jsonb,
  validation_result jsonb not null default '{}'::jsonb,
  source_chat_message_id uuid,
  source_context jsonb not null default '{}'::jsonb,
  approved_at timestamptz,
  rejected_at timestamptz,
  executed_at timestamptz,
  failed_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists audit_logs_user_id_idx
  on public.audit_logs(user_id);

create index if not exists audit_logs_entity_idx
  on public.audit_logs(entity_table, entity_id);

create index if not exists audit_logs_occurred_at_idx
  on public.audit_logs(occurred_at desc);

create index if not exists audit_logs_logged_at_idx
  on public.audit_logs(logged_at desc);

create index if not exists audit_logs_actor_type_idx
  on public.audit_logs(actor_type);

create index if not exists audit_logs_action_type_idx
  on public.audit_logs(action_type);

create index if not exists ai_actions_user_id_idx
  on public.ai_actions(user_id);

create index if not exists ai_actions_status_idx
  on public.ai_actions(status);

create index if not exists ai_actions_action_type_idx
  on public.ai_actions(action_type);

create index if not exists ai_actions_target_idx
  on public.ai_actions(target_table, target_id);

create index if not exists ai_actions_created_at_idx
  on public.ai_actions(created_at desc);

drop trigger if exists set_ai_actions_updated_at on public.ai_actions;
create trigger set_ai_actions_updated_at
before update on public.ai_actions
for each row
execute function public.set_updated_at();

alter table public.audit_logs enable row level security;
alter table public.ai_actions enable row level security;

drop policy if exists "Users can view their own audit logs" on public.audit_logs;
create policy "Users can view their own audit logs"
on public.audit_logs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own audit logs" on public.audit_logs;
create policy "Users can insert their own audit logs"
on public.audit_logs
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can view their own AI actions" on public.ai_actions;
create policy "Users can view their own AI actions"
on public.ai_actions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own AI actions" on public.ai_actions;
create policy "Users can insert their own AI actions"
on public.ai_actions
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own AI actions" on public.ai_actions;
create policy "Users can update their own AI actions"
on public.ai_actions
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own draft AI actions" on public.ai_actions;
create policy "Users can delete their own draft AI actions"
on public.ai_actions
for delete
to authenticated
using (auth.uid() = user_id and status in ('draft', 'cancelled'));
