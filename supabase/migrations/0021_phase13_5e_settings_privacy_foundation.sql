-- ascendOS + Carnos
-- Migration 0021: Phase 13.5E settings and privacy foundation
--
-- Purpose:
-- - Repair completed-scope gap for app_settings and privacy_settings.
-- - Provide SQL-backed read foundations for /settings and /privacy.
-- - Keep export, delete, private mode, memory/RAG, voice, web, analytics, and final audit work deferred.

create table if not exists public.app_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  setting_key text not null,
  category text not null default 'general'
    check (
      category in (
        'general',
        'profile',
        'appearance',
        'carnos',
        'notifications',
        'dashboard',
        'calendar',
        'career',
        'health',
        'research',
        'grimoire',
        'system'
      )
    ),
  setting_value jsonb not null default '{}'::jsonb,
  visibility text not null default 'private'
    check (visibility in ('private', 'sensitive', 'locked', 'system')),
  status text not null default 'active'
    check (status in ('active', 'disabled', 'archived')),
  description text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_settings_user_key_unique unique (user_id, setting_key),
  constraint app_settings_key_not_blank check (length(trim(setting_key)) > 0)
);

create table if not exists public.privacy_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  privacy_key text not null,
  surface text not null default 'global'
    check (
      surface in (
        'global',
        'profile',
        'carnos',
        'memory',
        'calendar',
        'career',
        'learning',
        'research',
        'health',
        'admin_finance',
        'grimoire',
        'export_delete',
        'analytics',
        'system'
      )
    ),
  privacy_level text not null default 'private'
    check (privacy_level in ('normal', 'private', 'sensitive', 'locked')),
  consent_state text not null default 'not_requested'
    check (consent_state in ('not_requested', 'granted', 'denied', 'revoked', 'required')),
  data_scope text not null default 'metadata_only'
    check (data_scope in ('none', 'metadata_only', 'content', 'derived', 'full')),
  redaction_enabled boolean not null default true,
  retention_policy text not null default 'default'
    check (retention_policy in ('default', 'manual_review', 'session_only', 'retain_until_deleted', 'locked')),
  description text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint privacy_settings_user_key_unique unique (user_id, privacy_key),
  constraint privacy_settings_key_not_blank check (length(trim(privacy_key)) > 0)
);

create index if not exists app_settings_user_id_idx on public.app_settings(user_id);
create index if not exists app_settings_setting_key_idx on public.app_settings(setting_key);
create index if not exists app_settings_category_idx on public.app_settings(category);
create index if not exists app_settings_visibility_idx on public.app_settings(visibility);
create index if not exists app_settings_status_idx on public.app_settings(status);
create index if not exists app_settings_updated_at_idx on public.app_settings(updated_at desc);
create index if not exists app_settings_source_ai_action_id_idx on public.app_settings(source_ai_action_id);
create index if not exists app_settings_source_chat_message_id_idx on public.app_settings(source_chat_message_id);

create index if not exists privacy_settings_user_id_idx on public.privacy_settings(user_id);
create index if not exists privacy_settings_privacy_key_idx on public.privacy_settings(privacy_key);
create index if not exists privacy_settings_surface_idx on public.privacy_settings(surface);
create index if not exists privacy_settings_privacy_level_idx on public.privacy_settings(privacy_level);
create index if not exists privacy_settings_consent_state_idx on public.privacy_settings(consent_state);
create index if not exists privacy_settings_data_scope_idx on public.privacy_settings(data_scope);
create index if not exists privacy_settings_updated_at_idx on public.privacy_settings(updated_at desc);
create index if not exists privacy_settings_source_ai_action_id_idx on public.privacy_settings(source_ai_action_id);
create index if not exists privacy_settings_source_chat_message_id_idx on public.privacy_settings(source_chat_message_id);

drop trigger if exists set_app_settings_updated_at on public.app_settings;
create trigger set_app_settings_updated_at
before update on public.app_settings
for each row
execute function public.set_updated_at();

drop trigger if exists set_privacy_settings_updated_at on public.privacy_settings;
create trigger set_privacy_settings_updated_at
before update on public.privacy_settings
for each row
execute function public.set_updated_at();

alter table public.app_settings enable row level security;
alter table public.privacy_settings enable row level security;

drop policy if exists "Users can view their own app settings" on public.app_settings;
create policy "Users can view their own app settings"
on public.app_settings
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own app settings" on public.app_settings;
create policy "Users can insert their own app settings"
on public.app_settings
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own app settings" on public.app_settings;
create policy "Users can update their own app settings"
on public.app_settings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own app settings" on public.app_settings;
create policy "Users can delete their own app settings"
on public.app_settings
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own privacy settings" on public.privacy_settings;
create policy "Users can view their own privacy settings"
on public.privacy_settings
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own privacy settings" on public.privacy_settings;
create policy "Users can insert their own privacy settings"
on public.privacy_settings
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own privacy settings" on public.privacy_settings;
create policy "Users can update their own privacy settings"
on public.privacy_settings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own privacy settings" on public.privacy_settings;
create policy "Users can delete their own privacy settings"
on public.privacy_settings
for delete
to authenticated
using (auth.uid() = user_id);
