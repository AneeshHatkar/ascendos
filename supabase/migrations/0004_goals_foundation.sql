-- ascendOS + Carnos
-- Migration 0004: goals and goal_milestones foundation

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  domain text not null default 'general',
  status text not null default 'active'
    check (status in ('draft', 'active', 'paused', 'completed', 'archived', 'cancelled')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  horizon text not null default 'medium_term'
    check (horizon in ('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'medium_term', 'long_term')),
  target_date date,
  completed_at timestamptz,
  proof_requirement text,
  reality_snapshot jsonb not null default '{}'::jsonb,
  target_snapshot jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goal_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid not null references public.goals(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'completed', 'skipped', 'cancelled')),
  sort_order integer not null default 0,
  due_date date,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists goals_user_id_idx
  on public.goals(user_id);

create index if not exists goals_status_idx
  on public.goals(status);

create index if not exists goals_domain_idx
  on public.goals(domain);

create index if not exists goals_priority_idx
  on public.goals(priority);

create index if not exists goals_target_date_idx
  on public.goals(target_date);

create index if not exists goals_created_at_idx
  on public.goals(created_at desc);

create index if not exists goals_source_ai_action_id_idx
  on public.goals(source_ai_action_id);

create index if not exists goals_source_chat_message_id_idx
  on public.goals(source_chat_message_id);

create index if not exists goal_milestones_user_id_idx
  on public.goal_milestones(user_id);

create index if not exists goal_milestones_goal_id_idx
  on public.goal_milestones(goal_id);

create index if not exists goal_milestones_status_idx
  on public.goal_milestones(status);

create index if not exists goal_milestones_due_date_idx
  on public.goal_milestones(due_date);

create index if not exists goal_milestones_sort_order_idx
  on public.goal_milestones(goal_id, sort_order);

create index if not exists goal_milestones_source_ai_action_id_idx
  on public.goal_milestones(source_ai_action_id);

create index if not exists goal_milestones_source_chat_message_id_idx
  on public.goal_milestones(source_chat_message_id);

drop trigger if exists set_goals_updated_at on public.goals;
create trigger set_goals_updated_at
before update on public.goals
for each row
execute function public.set_updated_at();

drop trigger if exists set_goal_milestones_updated_at on public.goal_milestones;
create trigger set_goal_milestones_updated_at
before update on public.goal_milestones
for each row
execute function public.set_updated_at();

alter table public.goals enable row level security;
alter table public.goal_milestones enable row level security;

drop policy if exists "Users can view their own goals" on public.goals;
create policy "Users can view their own goals"
on public.goals
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own goals" on public.goals;
create policy "Users can insert their own goals"
on public.goals
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own goals" on public.goals;
create policy "Users can update their own goals"
on public.goals
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own goals" on public.goals;
create policy "Users can delete their own goals"
on public.goals
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own goal milestones" on public.goal_milestones;
create policy "Users can view their own goal milestones"
on public.goal_milestones
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own goal milestones" on public.goal_milestones;
create policy "Users can insert their own goal milestones"
on public.goal_milestones
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.goals
    where goals.id = goal_milestones.goal_id
      and goals.user_id = auth.uid()
  )
);

drop policy if exists "Users can update their own goal milestones" on public.goal_milestones;
create policy "Users can update their own goal milestones"
on public.goal_milestones
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.goals
    where goals.id = goal_milestones.goal_id
      and goals.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their own goal milestones" on public.goal_milestones;
create policy "Users can delete their own goal milestones"
on public.goal_milestones
for delete
to authenticated
using (auth.uid() = user_id);
