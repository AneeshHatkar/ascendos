-- ascendOS + Carnos
-- Migration 0001: profiles and carnos_profiles foundation

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  timezone text not null default 'America/New_York',
  onboarding_status text not null default 'not_started'
    check (onboarding_status in ('not_started', 'in_progress', 'complete')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.carnos_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  companion_name text not null default 'Carnos',
  memory_mode text not null default 'confirmation_required'
    check (memory_mode in ('off', 'confirmation_required', 'approved_memory_only')),
  persona_mode text not null default 'proof_companion',
  voice_enabled boolean not null default false,
  safety_mode text not null default 'standard'
    check (safety_mode in ('standard', 'strict', 'private')),
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_email_idx
  on public.profiles(email);

create index if not exists carnos_profiles_user_id_idx
  on public.carnos_profiles(user_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_carnos_profiles_updated_at on public.carnos_profiles;
create trigger set_carnos_profiles_updated_at
before update on public.carnos_profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.carnos_profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view their own Carnos profile" on public.carnos_profiles;
create policy "Users can view their own Carnos profile"
on public.carnos_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own Carnos profile" on public.carnos_profiles;
create policy "Users can insert their own Carnos profile"
on public.carnos_profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own Carnos profile" on public.carnos_profiles;
create policy "Users can update their own Carnos profile"
on public.carnos_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
  set email = excluded.email;

  insert into public.carnos_profiles (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
