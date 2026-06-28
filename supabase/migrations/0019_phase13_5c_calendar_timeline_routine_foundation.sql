-- ascendOS + Carnos
-- Migration 0019: Phase 13.5C calendar, timeline, routine, and reminder repair
--
-- Scope:
-- - calendar_blocks
-- - routines
-- - routine_steps
-- - reminders
--
-- Important boundary:
-- - This migration does not create timeline_events.
-- - For v1, public.events remains the canonical SQL-backed timeline/event spine.
-- - The Phase 6 writeTimelineEvent helper intentionally remains skipped until
--   a later source-approved timeline_events migration changes that boundary.

create table if not exists public.calendar_blocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  domain text not null default 'general',
  block_type text not null default 'time_block'
    check (
      block_type in (
        'time_block',
        'focus',
        'class',
        'study',
        'work',
        'career',
        'health',
        'admin',
        'routine',
        'buffer',
        'recovery',
        'travel',
        'appointment',
        'deep_work',
        'other'
      )
    ),
  status text not null default 'planned'
    check (
      status in (
        'planned',
        'scheduled',
        'active',
        'completed',
        'missed',
        'cancelled',
        'archived'
      )
    ),
  start_at timestamptz not null,
  end_at timestamptz,
  timezone text,
  location text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_at is null or end_at >= start_at)
);

create table if not exists public.routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  domain text not null default 'general',
  routine_type text not null default 'daily'
    check (
      routine_type in (
        'morning',
        'night',
        'daily',
        'weekly',
        'workout',
        'study',
        'career',
        'health',
        'admin',
        'creative',
        'reset',
        'custom'
      )
    ),
  status text not null default 'active'
    check (status in ('draft', 'active', 'paused', 'archived')),
  cadence_rule text,
  anchor_time time,
  start_date date,
  end_date date,
  timezone text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.routine_steps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  routine_id uuid not null references public.routines(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  title text not null,
  description text,
  step_order integer not null default 0 check (step_order >= 0),
  duration_minutes integer check (duration_minutes is null or duration_minutes >= 0),
  status text not null default 'active'
    check (status in ('active', 'paused', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  routine_id uuid references public.routines(id) on delete set null,
  title text not null,
  message text,
  reminder_type text not null default 'manual'
    check (
      reminder_type in (
        'manual',
        'calendar',
        'task',
        'goal',
        'routine',
        'deadline',
        'admin',
        'health',
        'career',
        'system'
      )
    ),
  status text not null default 'pending'
    check (
      status in (
        'pending',
        'scheduled',
        'delivered',
        'dismissed',
        'snoozed',
        'cancelled',
        'archived'
      )
    ),
  remind_at timestamptz not null,
  delivered_at timestamptz,
  dismissed_at timestamptz,
  snoozed_until timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (snoozed_until is null or snoozed_until >= remind_at)
);

create index if not exists calendar_blocks_user_id_idx
  on public.calendar_blocks(user_id);

create index if not exists calendar_blocks_event_id_idx
  on public.calendar_blocks(event_id);

create index if not exists calendar_blocks_task_id_idx
  on public.calendar_blocks(task_id);

create index if not exists calendar_blocks_goal_id_idx
  on public.calendar_blocks(goal_id);

create index if not exists calendar_blocks_domain_idx
  on public.calendar_blocks(domain);

create index if not exists calendar_blocks_block_type_idx
  on public.calendar_blocks(block_type);

create index if not exists calendar_blocks_status_idx
  on public.calendar_blocks(status);

create index if not exists calendar_blocks_start_at_idx
  on public.calendar_blocks(start_at);

create index if not exists routines_user_id_idx
  on public.routines(user_id);

create index if not exists routines_goal_id_idx
  on public.routines(goal_id);

create index if not exists routines_domain_idx
  on public.routines(domain);

create index if not exists routines_routine_type_idx
  on public.routines(routine_type);

create index if not exists routines_status_idx
  on public.routines(status);

create index if not exists routines_anchor_time_idx
  on public.routines(anchor_time);

create index if not exists routine_steps_user_id_idx
  on public.routine_steps(user_id);

create index if not exists routine_steps_routine_id_idx
  on public.routine_steps(routine_id);

create index if not exists routine_steps_task_id_idx
  on public.routine_steps(task_id);

create index if not exists routine_steps_step_order_idx
  on public.routine_steps(routine_id, step_order);

create index if not exists reminders_user_id_idx
  on public.reminders(user_id);

create index if not exists reminders_event_id_idx
  on public.reminders(event_id);

create index if not exists reminders_task_id_idx
  on public.reminders(task_id);

create index if not exists reminders_goal_id_idx
  on public.reminders(goal_id);

create index if not exists reminders_routine_id_idx
  on public.reminders(routine_id);

create index if not exists reminders_status_idx
  on public.reminders(status);

create index if not exists reminders_remind_at_idx
  on public.reminders(remind_at);

drop trigger if exists set_calendar_blocks_updated_at on public.calendar_blocks;
create trigger set_calendar_blocks_updated_at
before update on public.calendar_blocks
for each row
execute function public.set_updated_at();

drop trigger if exists set_routines_updated_at on public.routines;
create trigger set_routines_updated_at
before update on public.routines
for each row
execute function public.set_updated_at();

drop trigger if exists set_routine_steps_updated_at on public.routine_steps;
create trigger set_routine_steps_updated_at
before update on public.routine_steps
for each row
execute function public.set_updated_at();

drop trigger if exists set_reminders_updated_at on public.reminders;
create trigger set_reminders_updated_at
before update on public.reminders
for each row
execute function public.set_updated_at();

alter table public.calendar_blocks enable row level security;
alter table public.routines enable row level security;
alter table public.routine_steps enable row level security;
alter table public.reminders enable row level security;

drop policy if exists "Users can view their own calendar blocks" on public.calendar_blocks;
create policy "Users can view their own calendar blocks"
on public.calendar_blocks
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own calendar blocks" on public.calendar_blocks;
create policy "Users can insert their own calendar blocks"
on public.calendar_blocks
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    event_id is null
    or exists (
      select 1 from public.events
      where events.id = calendar_blocks.event_id
        and events.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = calendar_blocks.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = calendar_blocks.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own calendar blocks" on public.calendar_blocks;
create policy "Users can update their own calendar blocks"
on public.calendar_blocks
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    event_id is null
    or exists (
      select 1 from public.events
      where events.id = calendar_blocks.event_id
        and events.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = calendar_blocks.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = calendar_blocks.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own calendar blocks" on public.calendar_blocks;
create policy "Users can delete their own calendar blocks"
on public.calendar_blocks
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own routines" on public.routines;
create policy "Users can view their own routines"
on public.routines
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own routines" on public.routines;
create policy "Users can insert their own routines"
on public.routines
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = routines.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own routines" on public.routines;
create policy "Users can update their own routines"
on public.routines
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = routines.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own routines" on public.routines;
create policy "Users can delete their own routines"
on public.routines
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own routine steps" on public.routine_steps;
create policy "Users can view their own routine steps"
on public.routine_steps
for select
to authenticated
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.routines
    where routines.id = routine_steps.routine_id
      and routines.user_id = auth.uid()
  )
);

drop policy if exists "Users can insert their own routine steps" on public.routine_steps;
create policy "Users can insert their own routine steps"
on public.routine_steps
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.routines
    where routines.id = routine_steps.routine_id
      and routines.user_id = auth.uid()
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = routine_steps.task_id
        and tasks.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own routine steps" on public.routine_steps;
create policy "Users can update their own routine steps"
on public.routine_steps
for update
to authenticated
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.routines
    where routines.id = routine_steps.routine_id
      and routines.user_id = auth.uid()
  )
)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.routines
    where routines.id = routine_steps.routine_id
      and routines.user_id = auth.uid()
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = routine_steps.task_id
        and tasks.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own routine steps" on public.routine_steps;
create policy "Users can delete their own routine steps"
on public.routine_steps
for delete
to authenticated
using (
  auth.uid() = user_id
  and exists (
    select 1 from public.routines
    where routines.id = routine_steps.routine_id
      and routines.user_id = auth.uid()
  )
);

drop policy if exists "Users can view their own reminders" on public.reminders;
create policy "Users can view their own reminders"
on public.reminders
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own reminders" on public.reminders;
create policy "Users can insert their own reminders"
on public.reminders
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    event_id is null
    or exists (
      select 1 from public.events
      where events.id = reminders.event_id
        and events.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = reminders.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = reminders.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    routine_id is null
    or exists (
      select 1 from public.routines
      where routines.id = reminders.routine_id
        and routines.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own reminders" on public.reminders;
create policy "Users can update their own reminders"
on public.reminders
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    event_id is null
    or exists (
      select 1 from public.events
      where events.id = reminders.event_id
        and events.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = reminders.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = reminders.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    routine_id is null
    or exists (
      select 1 from public.routines
      where routines.id = reminders.routine_id
        and routines.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own reminders" on public.reminders;
create policy "Users can delete their own reminders"
on public.reminders
for delete
to authenticated
using (auth.uid() = user_id);
