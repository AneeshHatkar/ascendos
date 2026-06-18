-- ascendOS + Carnos
-- Migration 0006: tasks and events foundation

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  domain text not null default 'general',
  status text not null default 'todo'
    check (status in ('todo', 'in_progress', 'blocked', 'done', 'skipped', 'cancelled', 'archived')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  due_date date,
  scheduled_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  estimate_minutes integer check (estimate_minutes is null or estimate_minutes >= 0),
  actual_minutes integer check (actual_minutes is null or actual_minutes >= 0),
  recurrence_rule text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.proof_items
  drop constraint if exists proof_items_task_id_fkey;

alter table public.proof_items
  add constraint proof_items_task_id_fkey
  foreign key (task_id)
  references public.tasks(id)
  on delete set null;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  domain text not null default 'general',
  event_type text not null default 'general'
    check (
      event_type in (
        'general',
        'calendar',
        'deadline',
        'milestone',
        'proof',
        'reflection',
        'system',
        'carnos',
        'health',
        'career',
        'learning',
        'research'
      )
    ),
  status text not null default 'scheduled'
    check (status in ('scheduled', 'completed', 'cancelled', 'missed', 'archived')),
  start_at timestamptz,
  end_at timestamptz,
  occurred_at timestamptz not null default now(),
  logged_at timestamptz not null default now(),
  location text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_at is null or start_at is null or end_at >= start_at)
);

create index if not exists tasks_user_id_idx
  on public.tasks(user_id);

create index if not exists tasks_goal_id_idx
  on public.tasks(goal_id);

create index if not exists tasks_status_idx
  on public.tasks(status);

create index if not exists tasks_priority_idx
  on public.tasks(priority);

create index if not exists tasks_domain_idx
  on public.tasks(domain);

create index if not exists tasks_due_date_idx
  on public.tasks(due_date);

create index if not exists tasks_scheduled_at_idx
  on public.tasks(scheduled_at);

create index if not exists tasks_completed_at_idx
  on public.tasks(completed_at desc);

create index if not exists tasks_source_ai_action_id_idx
  on public.tasks(source_ai_action_id);

create index if not exists tasks_source_chat_message_id_idx
  on public.tasks(source_chat_message_id);

create index if not exists proof_items_task_id_idx
  on public.proof_items(task_id);

create index if not exists events_user_id_idx
  on public.events(user_id);

create index if not exists events_task_id_idx
  on public.events(task_id);

create index if not exists events_goal_id_idx
  on public.events(goal_id);

create index if not exists events_domain_idx
  on public.events(domain);

create index if not exists events_event_type_idx
  on public.events(event_type);

create index if not exists events_status_idx
  on public.events(status);

create index if not exists events_start_at_idx
  on public.events(start_at);

create index if not exists events_occurred_at_idx
  on public.events(occurred_at desc);

create index if not exists events_logged_at_idx
  on public.events(logged_at desc);

create index if not exists events_source_ai_action_id_idx
  on public.events(source_ai_action_id);

create index if not exists events_source_chat_message_id_idx
  on public.events(source_chat_message_id);

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row
execute function public.set_updated_at();

alter table public.tasks enable row level security;
alter table public.events enable row level security;

drop policy if exists "Users can view their own tasks" on public.tasks;
create policy "Users can view their own tasks"
on public.tasks
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own tasks" on public.tasks;
create policy "Users can insert their own tasks"
on public.tasks
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = tasks.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own tasks" on public.tasks;
create policy "Users can update their own tasks"
on public.tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = tasks.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own tasks" on public.tasks;
create policy "Users can delete their own tasks"
on public.tasks
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own events" on public.events;
create policy "Users can view their own events"
on public.events
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own events" on public.events;
create policy "Users can insert their own events"
on public.events
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    task_id is null
    or exists (
      select 1
      from public.tasks
      where tasks.id = events.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = events.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own events" on public.events;
create policy "Users can update their own events"
on public.events
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    task_id is null
    or exists (
      select 1
      from public.tasks
      where tasks.id = events.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = events.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own events" on public.events;
create policy "Users can delete their own events"
on public.events
for delete
to authenticated
using (auth.uid() = user_id);
