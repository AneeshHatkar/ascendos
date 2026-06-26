-- Phase 11 — Health / Body System SQL Foundation
-- Scope: 11.15 SQL migration
--
-- This migration creates the source-confirmed Phase 11 health/body tables.
--
-- Boundaries:
-- - Uses existing public.set_updated_at() from migration 0001.
-- - Enables RLS and owner-only policies.
-- - Does not create parent ownership triggers yet. That belongs to Chunk C.1.
-- - Does not create health_body_baselines.
-- - Does not create progress_photos.
-- - Does not create storage buckets or upload behavior.
-- - Does not add TypeScript, routes, dashboards, repositories, Python/ML, memory/RAG, or Carnos writes.

create table if not exists public.body_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  bodyweight numeric,
  bodyweight_unit text,
  waist numeric,
  waist_unit text,
  recovery_score integer,
  soreness_score integer,
  pain_score integer,
  pain_area text,
  notes text,
  photo_attachment_id uuid,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  daily_log_id uuid references public.daily_logs(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint body_logs_bodyweight_nonnegative check (bodyweight is null or bodyweight >= 0),
  constraint body_logs_waist_nonnegative check (waist is null or waist >= 0),
  constraint body_logs_recovery_score_range check (recovery_score is null or recovery_score between 0 and 10),
  constraint body_logs_soreness_score_range check (soreness_score is null or soreness_score between 0 and 10),
  constraint body_logs_pain_score_range check (pain_score is null or pain_score between 0 and 10)
);

create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_date date not null,
  title text not null,
  duration_minutes integer,
  focus text,
  intensity_score integer,
  recovery_notes text,
  notes text,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workouts_duration_minutes_nonnegative check (duration_minutes is null or duration_minutes >= 0),
  constraint workouts_intensity_score_range check (intensity_score is null or intensity_score between 0 and 10)
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  muscle_group text,
  equipment text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workout_sets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_id uuid not null references public.workouts(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete set null,
  set_number integer,
  reps integer,
  weight numeric,
  weight_unit text,
  rir numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workout_sets_set_number_nonnegative check (set_number is null or set_number >= 0),
  constraint workout_sets_reps_nonnegative check (reps is null or reps >= 0),
  constraint workout_sets_weight_nonnegative check (weight is null or weight >= 0),
  constraint workout_sets_rir_nonnegative check (rir is null or rir >= 0)
);

create table if not exists public.nutrition_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  calories integer,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  water_ml integer,
  mode text,
  notes text,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  daily_log_id uuid references public.daily_logs(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint nutrition_logs_calories_nonnegative check (calories is null or calories >= 0),
  constraint nutrition_logs_protein_nonnegative check (protein_g is null or protein_g >= 0),
  constraint nutrition_logs_carbs_nonnegative check (carbs_g is null or carbs_g >= 0),
  constraint nutrition_logs_fat_nonnegative check (fat_g is null or fat_g >= 0),
  constraint nutrition_logs_water_nonnegative check (water_ml is null or water_ml >= 0)
);

create table if not exists public.meal_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nutrition_log_id uuid not null references public.nutrition_logs(id) on delete cascade,
  meal_name text,
  food_name text not null,
  calories integer,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  quantity numeric,
  unit text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint meal_items_calories_nonnegative check (calories is null or calories >= 0),
  constraint meal_items_protein_nonnegative check (protein_g is null or protein_g >= 0),
  constraint meal_items_carbs_nonnegative check (carbs_g is null or carbs_g >= 0),
  constraint meal_items_fat_nonnegative check (fat_g is null or fat_g >= 0),
  constraint meal_items_quantity_nonnegative check (quantity is null or quantity >= 0)
);

create table if not exists public.supplements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  dosage text,
  frequency text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.supplement_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  supplement_id uuid not null references public.supplements(id) on delete cascade,
  taken_at timestamptz,
  status text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint supplement_logs_status_check check (status in ('taken', 'missed', 'skipped'))
);

create table if not exists public.sleep_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sleep_date date not null,
  bedtime timestamptz,
  wake_time timestamptz,
  sleep_hours numeric,
  quality_score integer,
  notes text,
  daily_log_id uuid references public.daily_logs(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sleep_logs_sleep_hours_nonnegative check (sleep_hours is null or sleep_hours >= 0),
  constraint sleep_logs_quality_score_range check (quality_score is null or quality_score between 0 and 10)
);

create table if not exists public.energy_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  energy_score integer,
  focus_score integer,
  fatigue_score integer,
  brain_fog_score integer,
  notes text,
  daily_log_id uuid references public.daily_logs(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint energy_logs_energy_score_range check (energy_score is null or energy_score between 0 and 10),
  constraint energy_logs_focus_score_range check (focus_score is null or focus_score between 0 and 10),
  constraint energy_logs_fatigue_score_range check (fatigue_score is null or fatigue_score between 0 and 10),
  constraint energy_logs_brain_fog_score_range check (brain_fog_score is null or brain_fog_score between 0 and 10)
);

create table if not exists public.mental_health_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  mood_score integer,
  anxiety_score integer,
  stress_score integer,
  shame_score integer,
  anger_score integer,
  loneliness_score integer,
  notes text,
  sensitivity text not null default 'private',
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mental_health_logs_mood_score_range check (mood_score is null or mood_score between 0 and 10),
  constraint mental_health_logs_anxiety_score_range check (anxiety_score is null or anxiety_score between 0 and 10),
  constraint mental_health_logs_stress_score_range check (stress_score is null or stress_score between 0 and 10),
  constraint mental_health_logs_shame_score_range check (shame_score is null or shame_score between 0 and 10),
  constraint mental_health_logs_anger_score_range check (anger_score is null or anger_score between 0 and 10),
  constraint mental_health_logs_loneliness_score_range check (loneliness_score is null or loneliness_score between 0 and 10),
  constraint mental_health_logs_sensitivity_check check (sensitivity in ('private', 'sensitive'))
);

create table if not exists public.emotion_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  emotion text not null,
  intensity integer,
  trigger text,
  occurred_at timestamptz not null default now(),
  notes text,
  sensitivity text not null default 'private',
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint emotion_logs_intensity_range check (intensity is null or intensity between 0 and 10),
  constraint emotion_logs_sensitivity_check check (sensitivity in ('private', 'sensitive'))
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  title text,
  content text,
  mood_json jsonb,
  sensitivity text not null default 'private',
  private boolean not null default true,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint journal_entries_sensitivity_check check (sensitivity in ('private', 'sensitive'))
);

create table if not exists public.skincare_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  routine_type text,
  products_json jsonb,
  completed boolean,
  irritation_notes text,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.haircare_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  routine_json jsonb,
  completed boolean,
  shedding_notes text,
  photo_attachment_id uuid,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  brand text,
  usage_notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists body_logs_user_log_date_idx on public.body_logs(user_id, log_date desc);
create index if not exists workouts_user_workout_date_idx on public.workouts(user_id, workout_date desc);
create index if not exists exercises_user_name_idx on public.exercises(user_id, name);
create index if not exists workout_sets_user_workout_idx on public.workout_sets(user_id, workout_id);
create index if not exists workout_sets_user_exercise_idx on public.workout_sets(user_id, exercise_id);
create index if not exists nutrition_logs_user_log_date_idx on public.nutrition_logs(user_id, log_date desc);
create index if not exists meal_items_user_nutrition_log_idx on public.meal_items(user_id, nutrition_log_id);
create index if not exists supplements_user_active_idx on public.supplements(user_id, active);
create index if not exists supplement_logs_user_created_idx on public.supplement_logs(user_id, created_at desc);
create index if not exists supplement_logs_user_supplement_idx on public.supplement_logs(user_id, supplement_id);
create index if not exists sleep_logs_user_sleep_date_idx on public.sleep_logs(user_id, sleep_date desc);
create index if not exists energy_logs_user_log_date_idx on public.energy_logs(user_id, log_date desc);
create index if not exists mental_health_logs_user_log_date_idx on public.mental_health_logs(user_id, log_date desc);
create index if not exists emotion_logs_user_occurred_at_idx on public.emotion_logs(user_id, occurred_at desc);
create index if not exists journal_entries_user_entry_date_idx on public.journal_entries(user_id, entry_date desc);
create index if not exists skincare_logs_user_log_date_idx on public.skincare_logs(user_id, log_date desc);
create index if not exists haircare_logs_user_log_date_idx on public.haircare_logs(user_id, log_date desc);
create index if not exists products_user_category_idx on public.products(user_id, category);
create index if not exists products_user_active_idx on public.products(user_id, active);

drop trigger if exists set_body_logs_updated_at on public.body_logs;
create trigger set_body_logs_updated_at before update on public.body_logs for each row execute function public.set_updated_at();

drop trigger if exists set_workouts_updated_at on public.workouts;
create trigger set_workouts_updated_at before update on public.workouts for each row execute function public.set_updated_at();

drop trigger if exists set_exercises_updated_at on public.exercises;
create trigger set_exercises_updated_at before update on public.exercises for each row execute function public.set_updated_at();

drop trigger if exists set_workout_sets_updated_at on public.workout_sets;
create trigger set_workout_sets_updated_at before update on public.workout_sets for each row execute function public.set_updated_at();

drop trigger if exists set_nutrition_logs_updated_at on public.nutrition_logs;
create trigger set_nutrition_logs_updated_at before update on public.nutrition_logs for each row execute function public.set_updated_at();

drop trigger if exists set_meal_items_updated_at on public.meal_items;
create trigger set_meal_items_updated_at before update on public.meal_items for each row execute function public.set_updated_at();

drop trigger if exists set_supplements_updated_at on public.supplements;
create trigger set_supplements_updated_at before update on public.supplements for each row execute function public.set_updated_at();

drop trigger if exists set_supplement_logs_updated_at on public.supplement_logs;
create trigger set_supplement_logs_updated_at before update on public.supplement_logs for each row execute function public.set_updated_at();

drop trigger if exists set_sleep_logs_updated_at on public.sleep_logs;
create trigger set_sleep_logs_updated_at before update on public.sleep_logs for each row execute function public.set_updated_at();

drop trigger if exists set_energy_logs_updated_at on public.energy_logs;
create trigger set_energy_logs_updated_at before update on public.energy_logs for each row execute function public.set_updated_at();

drop trigger if exists set_mental_health_logs_updated_at on public.mental_health_logs;
create trigger set_mental_health_logs_updated_at before update on public.mental_health_logs for each row execute function public.set_updated_at();

drop trigger if exists set_emotion_logs_updated_at on public.emotion_logs;
create trigger set_emotion_logs_updated_at before update on public.emotion_logs for each row execute function public.set_updated_at();

drop trigger if exists set_journal_entries_updated_at on public.journal_entries;
create trigger set_journal_entries_updated_at before update on public.journal_entries for each row execute function public.set_updated_at();

drop trigger if exists set_skincare_logs_updated_at on public.skincare_logs;
create trigger set_skincare_logs_updated_at before update on public.skincare_logs for each row execute function public.set_updated_at();

drop trigger if exists set_haircare_logs_updated_at on public.haircare_logs;
create trigger set_haircare_logs_updated_at before update on public.haircare_logs for each row execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products for each row execute function public.set_updated_at();

alter table public.body_logs enable row level security;
alter table public.workouts enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_sets enable row level security;
alter table public.nutrition_logs enable row level security;
alter table public.meal_items enable row level security;
alter table public.supplements enable row level security;
alter table public.supplement_logs enable row level security;
alter table public.sleep_logs enable row level security;
alter table public.energy_logs enable row level security;
alter table public.mental_health_logs enable row level security;
alter table public.emotion_logs enable row level security;
alter table public.journal_entries enable row level security;
alter table public.skincare_logs enable row level security;
alter table public.haircare_logs enable row level security;
alter table public.products enable row level security;

drop policy if exists "body_logs_select_own" on public.body_logs;
create policy "body_logs_select_own" on public.body_logs
for select using (auth.uid() = user_id);

drop policy if exists "body_logs_insert_own" on public.body_logs;
create policy "body_logs_insert_own" on public.body_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "body_logs_update_own" on public.body_logs;
create policy "body_logs_update_own" on public.body_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "body_logs_delete_own" on public.body_logs;
create policy "body_logs_delete_own" on public.body_logs
for delete using (auth.uid() = user_id);

drop policy if exists "workouts_select_own" on public.workouts;
create policy "workouts_select_own" on public.workouts
for select using (auth.uid() = user_id);

drop policy if exists "workouts_insert_own" on public.workouts;
create policy "workouts_insert_own" on public.workouts
for insert with check (auth.uid() = user_id);

drop policy if exists "workouts_update_own" on public.workouts;
create policy "workouts_update_own" on public.workouts
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "workouts_delete_own" on public.workouts;
create policy "workouts_delete_own" on public.workouts
for delete using (auth.uid() = user_id);

drop policy if exists "exercises_select_own" on public.exercises;
create policy "exercises_select_own" on public.exercises
for select using (auth.uid() = user_id);

drop policy if exists "exercises_insert_own" on public.exercises;
create policy "exercises_insert_own" on public.exercises
for insert with check (auth.uid() = user_id);

drop policy if exists "exercises_update_own" on public.exercises;
create policy "exercises_update_own" on public.exercises
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "exercises_delete_own" on public.exercises;
create policy "exercises_delete_own" on public.exercises
for delete using (auth.uid() = user_id);

drop policy if exists "workout_sets_select_own" on public.workout_sets;
create policy "workout_sets_select_own" on public.workout_sets
for select using (auth.uid() = user_id);

drop policy if exists "workout_sets_insert_own" on public.workout_sets;
create policy "workout_sets_insert_own" on public.workout_sets
for insert with check (auth.uid() = user_id);

drop policy if exists "workout_sets_update_own" on public.workout_sets;
create policy "workout_sets_update_own" on public.workout_sets
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "workout_sets_delete_own" on public.workout_sets;
create policy "workout_sets_delete_own" on public.workout_sets
for delete using (auth.uid() = user_id);

drop policy if exists "nutrition_logs_select_own" on public.nutrition_logs;
create policy "nutrition_logs_select_own" on public.nutrition_logs
for select using (auth.uid() = user_id);

drop policy if exists "nutrition_logs_insert_own" on public.nutrition_logs;
create policy "nutrition_logs_insert_own" on public.nutrition_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "nutrition_logs_update_own" on public.nutrition_logs;
create policy "nutrition_logs_update_own" on public.nutrition_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "nutrition_logs_delete_own" on public.nutrition_logs;
create policy "nutrition_logs_delete_own" on public.nutrition_logs
for delete using (auth.uid() = user_id);

drop policy if exists "meal_items_select_own" on public.meal_items;
create policy "meal_items_select_own" on public.meal_items
for select using (auth.uid() = user_id);

drop policy if exists "meal_items_insert_own" on public.meal_items;
create policy "meal_items_insert_own" on public.meal_items
for insert with check (auth.uid() = user_id);

drop policy if exists "meal_items_update_own" on public.meal_items;
create policy "meal_items_update_own" on public.meal_items
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "meal_items_delete_own" on public.meal_items;
create policy "meal_items_delete_own" on public.meal_items
for delete using (auth.uid() = user_id);

drop policy if exists "supplements_select_own" on public.supplements;
create policy "supplements_select_own" on public.supplements
for select using (auth.uid() = user_id);

drop policy if exists "supplements_insert_own" on public.supplements;
create policy "supplements_insert_own" on public.supplements
for insert with check (auth.uid() = user_id);

drop policy if exists "supplements_update_own" on public.supplements;
create policy "supplements_update_own" on public.supplements
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "supplements_delete_own" on public.supplements;
create policy "supplements_delete_own" on public.supplements
for delete using (auth.uid() = user_id);

drop policy if exists "supplement_logs_select_own" on public.supplement_logs;
create policy "supplement_logs_select_own" on public.supplement_logs
for select using (auth.uid() = user_id);

drop policy if exists "supplement_logs_insert_own" on public.supplement_logs;
create policy "supplement_logs_insert_own" on public.supplement_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "supplement_logs_update_own" on public.supplement_logs;
create policy "supplement_logs_update_own" on public.supplement_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "supplement_logs_delete_own" on public.supplement_logs;
create policy "supplement_logs_delete_own" on public.supplement_logs
for delete using (auth.uid() = user_id);

drop policy if exists "sleep_logs_select_own" on public.sleep_logs;
create policy "sleep_logs_select_own" on public.sleep_logs
for select using (auth.uid() = user_id);

drop policy if exists "sleep_logs_insert_own" on public.sleep_logs;
create policy "sleep_logs_insert_own" on public.sleep_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "sleep_logs_update_own" on public.sleep_logs;
create policy "sleep_logs_update_own" on public.sleep_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "sleep_logs_delete_own" on public.sleep_logs;
create policy "sleep_logs_delete_own" on public.sleep_logs
for delete using (auth.uid() = user_id);

drop policy if exists "energy_logs_select_own" on public.energy_logs;
create policy "energy_logs_select_own" on public.energy_logs
for select using (auth.uid() = user_id);

drop policy if exists "energy_logs_insert_own" on public.energy_logs;
create policy "energy_logs_insert_own" on public.energy_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "energy_logs_update_own" on public.energy_logs;
create policy "energy_logs_update_own" on public.energy_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "energy_logs_delete_own" on public.energy_logs;
create policy "energy_logs_delete_own" on public.energy_logs
for delete using (auth.uid() = user_id);

drop policy if exists "mental_health_logs_select_own" on public.mental_health_logs;
create policy "mental_health_logs_select_own" on public.mental_health_logs
for select using (auth.uid() = user_id);

drop policy if exists "mental_health_logs_insert_own" on public.mental_health_logs;
create policy "mental_health_logs_insert_own" on public.mental_health_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "mental_health_logs_update_own" on public.mental_health_logs;
create policy "mental_health_logs_update_own" on public.mental_health_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "mental_health_logs_delete_own" on public.mental_health_logs;
create policy "mental_health_logs_delete_own" on public.mental_health_logs
for delete using (auth.uid() = user_id);

drop policy if exists "emotion_logs_select_own" on public.emotion_logs;
create policy "emotion_logs_select_own" on public.emotion_logs
for select using (auth.uid() = user_id);

drop policy if exists "emotion_logs_insert_own" on public.emotion_logs;
create policy "emotion_logs_insert_own" on public.emotion_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "emotion_logs_update_own" on public.emotion_logs;
create policy "emotion_logs_update_own" on public.emotion_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "emotion_logs_delete_own" on public.emotion_logs;
create policy "emotion_logs_delete_own" on public.emotion_logs
for delete using (auth.uid() = user_id);

drop policy if exists "journal_entries_select_own" on public.journal_entries;
create policy "journal_entries_select_own" on public.journal_entries
for select using (auth.uid() = user_id);

drop policy if exists "journal_entries_insert_own" on public.journal_entries;
create policy "journal_entries_insert_own" on public.journal_entries
for insert with check (auth.uid() = user_id);

drop policy if exists "journal_entries_update_own" on public.journal_entries;
create policy "journal_entries_update_own" on public.journal_entries
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "journal_entries_delete_own" on public.journal_entries;
create policy "journal_entries_delete_own" on public.journal_entries
for delete using (auth.uid() = user_id);

drop policy if exists "skincare_logs_select_own" on public.skincare_logs;
create policy "skincare_logs_select_own" on public.skincare_logs
for select using (auth.uid() = user_id);

drop policy if exists "skincare_logs_insert_own" on public.skincare_logs;
create policy "skincare_logs_insert_own" on public.skincare_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "skincare_logs_update_own" on public.skincare_logs;
create policy "skincare_logs_update_own" on public.skincare_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "skincare_logs_delete_own" on public.skincare_logs;
create policy "skincare_logs_delete_own" on public.skincare_logs
for delete using (auth.uid() = user_id);

drop policy if exists "haircare_logs_select_own" on public.haircare_logs;
create policy "haircare_logs_select_own" on public.haircare_logs
for select using (auth.uid() = user_id);

drop policy if exists "haircare_logs_insert_own" on public.haircare_logs;
create policy "haircare_logs_insert_own" on public.haircare_logs
for insert with check (auth.uid() = user_id);

drop policy if exists "haircare_logs_update_own" on public.haircare_logs;
create policy "haircare_logs_update_own" on public.haircare_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "haircare_logs_delete_own" on public.haircare_logs;
create policy "haircare_logs_delete_own" on public.haircare_logs
for delete using (auth.uid() = user_id);

drop policy if exists "products_select_own" on public.products;
create policy "products_select_own" on public.products
for select using (auth.uid() = user_id);

drop policy if exists "products_insert_own" on public.products;
create policy "products_insert_own" on public.products
for insert with check (auth.uid() = user_id);

drop policy if exists "products_update_own" on public.products;
create policy "products_update_own" on public.products
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "products_delete_own" on public.products;
create policy "products_delete_own" on public.products
for delete using (auth.uid() = user_id);
