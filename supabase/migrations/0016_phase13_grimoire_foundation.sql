-- Phase 13 — Grimoire SQL Foundation
-- Scope: 13C / Source Chunk 15
--
-- Adds source-aligned Grimoire Engine tables:
-- - grimoire_modes
-- - grimoire_daily_logs
-- - grimoire_skills
-- - grimoire_corruption_checks
-- - grimoire_reversions
--
-- Boundaries:
-- - No autonomous Carnos writes.
-- - No memory embeddings.
-- - No voice logs.
-- - No analytics snapshots.
-- - No dynamic custom tracker implementation.
-- - Parent ownership guards are in 0017_phase13_parent_ownership_guards.sql.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.grimoire_modes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  mission_type text not null,
  description text,
  allowed_use text,
  forbidden_use text,
  proof_required text,
  risk_notes text,
  reversion_required boolean not null default false,
  intensity_level text not null default 'medium',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  privacy_level text not null default 'private',
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint grimoire_modes_name_not_blank check (length(trim(name)) > 0),
  constraint grimoire_modes_mission_type_allowed check (
    mission_type in (
      'war',
      'study',
      'charm',
      'money',
      'recovery',
      'rebirth',
      'leadership',
      'silence',
      'other'
    )
  ),
  constraint grimoire_modes_intensity_level_allowed check (
    intensity_level in ('low', 'medium', 'high')
  ),
  constraint grimoire_modes_sort_order_nonnegative check (sort_order >= 0),
  constraint grimoire_modes_privacy_level_allowed check (
    privacy_level in ('normal', 'private', 'sensitive', 'locked')
  )
);

create table if not exists public.grimoire_daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  mode_id uuid references public.grimoire_modes(id) on delete set null,
  active_mode text,
  mission_type text,
  mission_statement text,
  top_actions_json jsonb not null default '[]'::jsonb,
  corruption_risk text,
  reversion_required boolean not null default false,
  reversion_done boolean not null default false,
  night_review text,
  privacy_level text not null default 'private',
  related_task_id uuid references public.tasks(id) on delete set null,
  related_goal_id uuid references public.goals(id) on delete set null,
  related_proof_item_id uuid references public.proof_items(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint grimoire_daily_logs_mission_type_allowed check (
    mission_type is null
    or mission_type in (
      'war',
      'study',
      'charm',
      'money',
      'recovery',
      'rebirth',
      'leadership',
      'silence',
      'other'
    )
  ),
  constraint grimoire_daily_logs_top_actions_json_array check (
    jsonb_typeof(top_actions_json) = 'array'
  ),
  constraint grimoire_daily_logs_privacy_level_allowed check (
    privacy_level in ('normal', 'private', 'sensitive', 'locked')
  )
);

create table if not exists public.grimoire_skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  tier text not null default 'initiate',
  realm text not null default 'general',
  description text,
  proof_required text,
  status text not null default 'planned',
  related_goal_id uuid references public.goals(id) on delete set null,
  related_task_id uuid references public.tasks(id) on delete set null,
  related_proof_item_id uuid references public.proof_items(id) on delete set null,
  privacy_level text not null default 'private',
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint grimoire_skills_name_not_blank check (length(trim(name)) > 0),
  constraint grimoire_skills_tier_allowed check (
    tier in ('initiate', 'apprentice', 'adept', 'master', 'custom')
  ),
  constraint grimoire_skills_realm_allowed check (
    realm in (
      'career',
      'learning',
      'research',
      'body',
      'health',
      'life_admin',
      'creative',
      'social',
      'money',
      'recovery',
      'general',
      'custom'
    )
  ),
  constraint grimoire_skills_status_allowed check (
    status in ('planned', 'active', 'blocked', 'proved', 'archived')
  ),
  constraint grimoire_skills_privacy_level_allowed check (
    privacy_level in ('normal', 'private', 'sensitive', 'locked')
  )
);

create table if not exists public.grimoire_corruption_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  daily_log_id uuid references public.grimoire_daily_logs(id) on delete set null,
  mode_id uuid references public.grimoire_modes(id) on delete set null,
  risk_type text not null,
  severity text not null default 'medium',
  evidence text,
  correction text,
  status text not null default 'open',
  privacy_level text not null default 'private',
  related_task_id uuid references public.tasks(id) on delete set null,
  related_proof_item_id uuid references public.proof_items(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint grimoire_corruption_checks_risk_type_allowed check (
    risk_type in (
      'fantasy_loop',
      'avoidance',
      'identity_inflation',
      'permanent_overdrive',
      'proof_avoidance',
      'burnout',
      'safety_override',
      'reversion_skipped',
      'other'
    )
  ),
  constraint grimoire_corruption_checks_severity_allowed check (
    severity in ('low', 'medium', 'high')
  ),
  constraint grimoire_corruption_checks_status_allowed check (
    status in ('open', 'correcting', 'resolved', 'ignored', 'archived')
  ),
  constraint grimoire_corruption_checks_privacy_level_allowed check (
    privacy_level in ('normal', 'private', 'sensitive', 'locked')
  )
);

create table if not exists public.grimoire_reversions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  daily_log_id uuid references public.grimoire_daily_logs(id) on delete set null,
  mode_id uuid references public.grimoire_modes(id) on delete set null,
  mode text,
  reversion_action text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  privacy_level text not null default 'private',
  related_task_id uuid references public.tasks(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint grimoire_reversions_action_not_blank check (length(trim(reversion_action)) > 0),
  constraint grimoire_reversions_completed_at_matches_completed check (
    completed = true or completed_at is null
  ),
  constraint grimoire_reversions_privacy_level_allowed check (
    privacy_level in ('normal', 'private', 'sensitive', 'locked')
  )
);

create index if not exists grimoire_modes_user_id_idx
  on public.grimoire_modes(user_id);

create index if not exists grimoire_modes_user_active_sort_idx
  on public.grimoire_modes(user_id, is_active, sort_order);

create index if not exists grimoire_modes_user_mission_type_idx
  on public.grimoire_modes(user_id, mission_type);

create index if not exists grimoire_modes_user_intensity_idx
  on public.grimoire_modes(user_id, intensity_level);

create index if not exists grimoire_daily_logs_user_id_idx
  on public.grimoire_daily_logs(user_id);

create unique index if not exists grimoire_daily_logs_user_log_date_key
  on public.grimoire_daily_logs(user_id, log_date);

create index if not exists grimoire_daily_logs_user_log_date_idx
  on public.grimoire_daily_logs(user_id, log_date desc);

create index if not exists grimoire_daily_logs_user_mission_log_date_idx
  on public.grimoire_daily_logs(user_id, mission_type, log_date desc);

create index if not exists grimoire_daily_logs_user_mode_log_date_idx
  on public.grimoire_daily_logs(user_id, mode_id, log_date desc);

create index if not exists grimoire_daily_logs_user_reversion_idx
  on public.grimoire_daily_logs(user_id, reversion_required, reversion_done);

create index if not exists grimoire_skills_user_id_idx
  on public.grimoire_skills(user_id);

create index if not exists grimoire_skills_user_status_realm_idx
  on public.grimoire_skills(user_id, status, realm);

create index if not exists grimoire_skills_user_tier_idx
  on public.grimoire_skills(user_id, tier);

create index if not exists grimoire_skills_user_goal_idx
  on public.grimoire_skills(user_id, related_goal_id);

create index if not exists grimoire_corruption_checks_user_id_idx
  on public.grimoire_corruption_checks(user_id);

create index if not exists grimoire_corruption_checks_user_log_date_idx
  on public.grimoire_corruption_checks(user_id, log_date desc);

create index if not exists grimoire_corruption_checks_user_risk_status_idx
  on public.grimoire_corruption_checks(user_id, risk_type, status);

create index if not exists grimoire_corruption_checks_user_severity_status_idx
  on public.grimoire_corruption_checks(user_id, severity, status);

create index if not exists grimoire_corruption_checks_user_daily_log_idx
  on public.grimoire_corruption_checks(user_id, daily_log_id);

create index if not exists grimoire_reversions_user_id_idx
  on public.grimoire_reversions(user_id);

create index if not exists grimoire_reversions_user_log_date_idx
  on public.grimoire_reversions(user_id, log_date desc);

create index if not exists grimoire_reversions_user_completed_log_date_idx
  on public.grimoire_reversions(user_id, completed, log_date desc);

create index if not exists grimoire_reversions_user_daily_log_idx
  on public.grimoire_reversions(user_id, daily_log_id);

create index if not exists grimoire_reversions_user_mode_idx
  on public.grimoire_reversions(user_id, mode_id);

drop trigger if exists set_grimoire_modes_updated_at on public.grimoire_modes;
create trigger set_grimoire_modes_updated_at
before update on public.grimoire_modes
for each row execute function public.set_updated_at();

drop trigger if exists set_grimoire_daily_logs_updated_at on public.grimoire_daily_logs;
create trigger set_grimoire_daily_logs_updated_at
before update on public.grimoire_daily_logs
for each row execute function public.set_updated_at();

drop trigger if exists set_grimoire_skills_updated_at on public.grimoire_skills;
create trigger set_grimoire_skills_updated_at
before update on public.grimoire_skills
for each row execute function public.set_updated_at();

drop trigger if exists set_grimoire_corruption_checks_updated_at on public.grimoire_corruption_checks;
create trigger set_grimoire_corruption_checks_updated_at
before update on public.grimoire_corruption_checks
for each row execute function public.set_updated_at();

drop trigger if exists set_grimoire_reversions_updated_at on public.grimoire_reversions;
create trigger set_grimoire_reversions_updated_at
before update on public.grimoire_reversions
for each row execute function public.set_updated_at();

alter table public.grimoire_modes enable row level security;
alter table public.grimoire_daily_logs enable row level security;
alter table public.grimoire_skills enable row level security;
alter table public.grimoire_corruption_checks enable row level security;
alter table public.grimoire_reversions enable row level security;

create policy "grimoire_modes_select_own" on public.grimoire_modes
for select using (auth.uid() = user_id);

create policy "grimoire_modes_insert_own" on public.grimoire_modes
for insert with check (auth.uid() = user_id);

create policy "grimoire_modes_update_own" on public.grimoire_modes
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "grimoire_modes_delete_own" on public.grimoire_modes
for delete using (auth.uid() = user_id);

create policy "grimoire_daily_logs_select_own" on public.grimoire_daily_logs
for select using (auth.uid() = user_id);

create policy "grimoire_daily_logs_insert_own" on public.grimoire_daily_logs
for insert with check (auth.uid() = user_id);

create policy "grimoire_daily_logs_update_own" on public.grimoire_daily_logs
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "grimoire_daily_logs_delete_own" on public.grimoire_daily_logs
for delete using (auth.uid() = user_id);

create policy "grimoire_skills_select_own" on public.grimoire_skills
for select using (auth.uid() = user_id);

create policy "grimoire_skills_insert_own" on public.grimoire_skills
for insert with check (auth.uid() = user_id);

create policy "grimoire_skills_update_own" on public.grimoire_skills
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "grimoire_skills_delete_own" on public.grimoire_skills
for delete using (auth.uid() = user_id);

create policy "grimoire_corruption_checks_select_own" on public.grimoire_corruption_checks
for select using (auth.uid() = user_id);

create policy "grimoire_corruption_checks_insert_own" on public.grimoire_corruption_checks
for insert with check (auth.uid() = user_id);

create policy "grimoire_corruption_checks_update_own" on public.grimoire_corruption_checks
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "grimoire_corruption_checks_delete_own" on public.grimoire_corruption_checks
for delete using (auth.uid() = user_id);

create policy "grimoire_reversions_select_own" on public.grimoire_reversions
for select using (auth.uid() = user_id);

create policy "grimoire_reversions_insert_own" on public.grimoire_reversions
for insert with check (auth.uid() = user_id);

create policy "grimoire_reversions_update_own" on public.grimoire_reversions
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "grimoire_reversions_delete_own" on public.grimoire_reversions
for delete using (auth.uid() = user_id);
