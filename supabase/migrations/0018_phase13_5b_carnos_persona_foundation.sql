-- Phase 13.5B: Carnos Persona + Chat Completion Repair
-- Adds the missing persona prompt/version foundation required before Phase 14 Voice.

create table if not exists public.persona_prompt_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  carnos_profile_id uuid references public.carnos_profiles(id) on delete set null,

  version_name text not null default 'Carnos v1',
  persona_name text not null default 'Carnos',
  persona_layer text not null default 'operator_friend_guardian',
  status text not null default 'draft'
    check (status in ('draft', 'active', 'archived')),

  system_prompt text not null,
  tone_rules jsonb not null default '[]'::jsonb,
  safety_rules jsonb not null default '[]'::jsonb,
  routing_rules jsonb not null default '{}'::jsonb,

  generation_boundary text not null default 'Assistant generation is disabled until a safe provider layer is explicitly implemented.',
  memory_boundary text not null default 'Memory/RAG is deferred to Phase 15.',
  voice_boundary text not null default 'Voice is deferred to Phase 14.',
  web_boundary text not null default 'Web search is deferred to Phase 16.',

  is_active boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint persona_prompt_versions_system_prompt_nonempty check (length(trim(system_prompt)) > 0)
);

alter table public.persona_prompt_versions enable row level security;

create policy persona_prompt_versions_select_own
  on public.persona_prompt_versions
  for select
  using (auth.uid() = user_id);

create index if not exists idx_persona_prompt_versions_user_active
  on public.persona_prompt_versions(user_id, is_active, created_at desc);

create index if not exists idx_persona_prompt_versions_profile
  on public.persona_prompt_versions(carnos_profile_id);

create or replace function public.phase13_5b_assert_carnos_profile_belongs_to_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.carnos_profile_id is not null and not exists (
    select 1
    from public.carnos_profiles cp
    where cp.id = new.carnos_profile_id
      and cp.user_id = new.user_id
  ) then
    raise exception 'persona_prompt_versions.carnos_profile_id must belong to the same user';
  end if;

  return new;
end;
$$;

drop trigger if exists phase13_5b_guard_persona_prompt_versions_profile on public.persona_prompt_versions;

create trigger phase13_5b_guard_persona_prompt_versions_profile
  before insert or update on public.persona_prompt_versions
  for each row
  execute function public.phase13_5b_assert_carnos_profile_belongs_to_user();
