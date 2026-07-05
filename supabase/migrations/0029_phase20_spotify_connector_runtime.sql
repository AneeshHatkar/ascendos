-- Phase 20Z-S — Spotify real connector runtime foundation
--
-- Purpose:
-- - Allow the authenticated user to connect their Spotify account.
-- - Store account metadata and OAuth token lifecycle fields.
-- - Keep access scoped to the owning user through RLS.
--
-- Boundary:
-- - No background sync.
-- - No autonomous Carnos writes.
-- - No playlist mutation.
-- - No Spotify playback control.
-- - No provider calls outside explicit user-triggered connect/refresh/status/revoke routes.

create table if not exists public.spotify_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  spotify_user_id text not null,
  spotify_display_name text,
  spotify_email text,
  spotify_product text,
  spotify_country text,
  scope text not null default '',
  access_token text not null,
  refresh_token text,
  token_type text not null default 'Bearer',
  expires_at timestamptz not null,
  connected_at timestamptz not null default now(),
  last_refreshed_at timestamptz,
  revoked_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint spotify_connections_user_unique unique (user_id),
  constraint spotify_connections_spotify_user_id_not_blank check (length(trim(spotify_user_id)) > 0),
  constraint spotify_connections_access_token_not_blank check (length(trim(access_token)) > 0),
  constraint spotify_connections_token_type_not_blank check (length(trim(token_type)) > 0)
);

create table if not exists public.spotify_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  spotify_connection_id uuid references public.spotify_connections(id) on delete set null,
  event_type text not null,
  event_summary text not null,
  event_status text not null default 'recorded',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint spotify_events_type_not_blank check (length(trim(event_type)) > 0),
  constraint spotify_events_summary_not_blank check (length(trim(event_summary)) > 0),
  constraint spotify_events_status_check check (
    event_status in ('recorded', 'failed', 'revoked', 'refreshed', 'connected')
  )
);

alter table public.spotify_connections enable row level security;
alter table public.spotify_events enable row level security;

drop policy if exists "Users can view their own Spotify connections" on public.spotify_connections;
create policy "Users can view their own Spotify connections"
on public.spotify_connections for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own Spotify connections" on public.spotify_connections;
create policy "Users can insert their own Spotify connections"
on public.spotify_connections for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own Spotify connections" on public.spotify_connections;
create policy "Users can update their own Spotify connections"
on public.spotify_connections for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own Spotify connections" on public.spotify_connections;
create policy "Users can delete their own Spotify connections"
on public.spotify_connections for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own Spotify events" on public.spotify_events;
create policy "Users can view their own Spotify events"
on public.spotify_events for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own Spotify events" on public.spotify_events;
create policy "Users can insert their own Spotify events"
on public.spotify_events for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own Spotify events" on public.spotify_events;
create policy "Users can update their own Spotify events"
on public.spotify_events for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own Spotify events" on public.spotify_events;
create policy "Users can delete their own Spotify events"
on public.spotify_events for delete
using (auth.uid() = user_id);

create index if not exists spotify_connections_user_id_idx
  on public.spotify_connections(user_id);

create index if not exists spotify_connections_spotify_user_id_idx
  on public.spotify_connections(spotify_user_id);

create index if not exists spotify_connections_expires_at_idx
  on public.spotify_connections(expires_at);

create index if not exists spotify_events_user_created_idx
  on public.spotify_events(user_id, created_at desc);

create index if not exists spotify_events_connection_idx
  on public.spotify_events(spotify_connection_id);
