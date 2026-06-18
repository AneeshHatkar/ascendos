-- ascendOS + Carnos
-- Migration 0005: daily_logs and proof_items foundation

create table if not exists public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  log_date date not null,
  mission text,
  top_actions jsonb not null default '[]'::jsonb,
  wins jsonb not null default '[]'::jsonb,
  blockers jsonb not null default '[]'::jsonb,
  mood_score integer check (mood_score is null or (mood_score >= 1 and mood_score <= 10)),
  energy_score integer check (energy_score is null or (energy_score >= 1 and energy_score <= 10)),
  sleep_hours numeric(4,2) check (sleep_hours is null or (sleep_hours >= 0 and sleep_hours <= 24)),
  stress_score integer check (stress_score is null or (stress_score >= 1 and stress_score <= 10)),
  proof_score integer check (proof_score is null or (proof_score >= 0 and proof_score <= 100)),
  reality_score integer check (reality_score is null or (reality_score >= 0 and reality_score <= 100)),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, log_date)
);

create table if not exists public.proof_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  daily_log_id uuid references public.daily_logs(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid,
  title text not null,
  description text,
  domain text not null default 'general',
  proof_type text not null default 'note'
    check (
      proof_type in (
        'note',
        'link',
        'file',
        'metric',
        'completion',
        'artifact',
        'reflection',
        'external_validation'
      )
    ),
  status text not null default 'captured'
    check (status in ('captured', 'verified', 'rejected', 'archived')),
  quantity numeric,
  unit text,
  url text,
  evidence jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  logged_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists daily_logs_user_id_idx
  on public.daily_logs(user_id);

create index if not exists daily_logs_log_date_idx
  on public.daily_logs(log_date desc);

create index if not exists daily_logs_user_log_date_idx
  on public.daily_logs(user_id, log_date desc);

create index if not exists daily_logs_proof_score_idx
  on public.daily_logs(proof_score);

create index if not exists daily_logs_reality_score_idx
  on public.daily_logs(reality_score);

create index if not exists daily_logs_source_ai_action_id_idx
  on public.daily_logs(source_ai_action_id);

create index if not exists daily_logs_source_chat_message_id_idx
  on public.daily_logs(source_chat_message_id);

create index if not exists proof_items_user_id_idx
  on public.proof_items(user_id);

create index if not exists proof_items_daily_log_id_idx
  on public.proof_items(daily_log_id);

create index if not exists proof_items_goal_id_idx
  on public.proof_items(goal_id);

create index if not exists proof_items_domain_idx
  on public.proof_items(domain);

create index if not exists proof_items_proof_type_idx
  on public.proof_items(proof_type);

create index if not exists proof_items_status_idx
  on public.proof_items(status);

create index if not exists proof_items_occurred_at_idx
  on public.proof_items(occurred_at desc);

create index if not exists proof_items_logged_at_idx
  on public.proof_items(logged_at desc);

create index if not exists proof_items_source_ai_action_id_idx
  on public.proof_items(source_ai_action_id);

create index if not exists proof_items_source_chat_message_id_idx
  on public.proof_items(source_chat_message_id);

drop trigger if exists set_daily_logs_updated_at on public.daily_logs;
create trigger set_daily_logs_updated_at
before update on public.daily_logs
for each row
execute function public.set_updated_at();

drop trigger if exists set_proof_items_updated_at on public.proof_items;
create trigger set_proof_items_updated_at
before update on public.proof_items
for each row
execute function public.set_updated_at();

alter table public.daily_logs enable row level security;
alter table public.proof_items enable row level security;

drop policy if exists "Users can view their own daily logs" on public.daily_logs;
create policy "Users can view their own daily logs"
on public.daily_logs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own daily logs" on public.daily_logs;
create policy "Users can insert their own daily logs"
on public.daily_logs
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own daily logs" on public.daily_logs;
create policy "Users can update their own daily logs"
on public.daily_logs
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own daily logs" on public.daily_logs;
create policy "Users can delete their own daily logs"
on public.daily_logs
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own proof items" on public.proof_items;
create policy "Users can view their own proof items"
on public.proof_items
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own proof items" on public.proof_items;
create policy "Users can insert their own proof items"
on public.proof_items
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    daily_log_id is null
    or exists (
      select 1
      from public.daily_logs
      where daily_logs.id = proof_items.daily_log_id
        and daily_logs.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = proof_items.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own proof items" on public.proof_items;
create policy "Users can update their own proof items"
on public.proof_items
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    daily_log_id is null
    or exists (
      select 1
      from public.daily_logs
      where daily_logs.id = proof_items.daily_log_id
        and daily_logs.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = proof_items.goal_id
        and goals.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own proof items" on public.proof_items;
create policy "Users can delete their own proof items"
on public.proof_items
for delete
to authenticated
using (auth.uid() = user_id);
