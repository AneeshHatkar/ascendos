-- ascendOS + Carnos
-- Migration 0003: chat_sessions and chat_messages foundation

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  status text not null default 'active'
    check (status in ('active', 'archived', 'deleted')),
  summary text,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null
    check (role in ('user', 'assistant', 'system', 'tool')),
  content text not null,
  content_format text not null default 'text'
    check (content_format in ('text', 'markdown', 'json')),
  metadata jsonb not null default '{}'::jsonb,
  token_count integer check (token_count is null or token_count >= 0),
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.ai_actions
  add column if not exists source_chat_session_id uuid references public.chat_sessions(id) on delete set null;

alter table public.ai_actions
  drop constraint if exists ai_actions_source_chat_message_id_fkey;

alter table public.ai_actions
  add constraint ai_actions_source_chat_message_id_fkey
  foreign key (source_chat_message_id)
  references public.chat_messages(id)
  on delete set null;

create index if not exists chat_sessions_user_id_idx
  on public.chat_sessions(user_id);

create index if not exists chat_sessions_status_idx
  on public.chat_sessions(status);

create index if not exists chat_sessions_started_at_idx
  on public.chat_sessions(started_at desc);

create index if not exists chat_sessions_updated_at_idx
  on public.chat_sessions(updated_at desc);

create index if not exists chat_messages_user_id_idx
  on public.chat_messages(user_id);

create index if not exists chat_messages_session_id_idx
  on public.chat_messages(session_id);

create index if not exists chat_messages_role_idx
  on public.chat_messages(role);

create index if not exists chat_messages_created_at_idx
  on public.chat_messages(created_at asc);

create index if not exists chat_messages_source_ai_action_id_idx
  on public.chat_messages(source_ai_action_id);

create index if not exists ai_actions_source_chat_session_id_idx
  on public.ai_actions(source_chat_session_id);

create index if not exists ai_actions_source_chat_message_id_idx
  on public.ai_actions(source_chat_message_id);

drop trigger if exists set_chat_sessions_updated_at on public.chat_sessions;
create trigger set_chat_sessions_updated_at
before update on public.chat_sessions
for each row
execute function public.set_updated_at();

alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

drop policy if exists "Users can view their own chat sessions" on public.chat_sessions;
create policy "Users can view their own chat sessions"
on public.chat_sessions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own chat sessions" on public.chat_sessions;
create policy "Users can insert their own chat sessions"
on public.chat_sessions
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own chat sessions" on public.chat_sessions;
create policy "Users can update their own chat sessions"
on public.chat_sessions
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own chat sessions" on public.chat_sessions;
create policy "Users can delete their own chat sessions"
on public.chat_sessions
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own chat messages" on public.chat_messages;
create policy "Users can view their own chat messages"
on public.chat_messages
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own chat messages" on public.chat_messages;
create policy "Users can insert their own chat messages"
on public.chat_messages
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.chat_sessions
    where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
  )
);

drop policy if exists "Users can update their own chat messages" on public.chat_messages;
create policy "Users can update their own chat messages"
on public.chat_messages
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.chat_sessions
    where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their own chat messages" on public.chat_messages;
create policy "Users can delete their own chat messages"
on public.chat_messages
for delete
to authenticated
using (auth.uid() = user_id);
