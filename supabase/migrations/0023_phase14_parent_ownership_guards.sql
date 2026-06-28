-- Phase 14B Voice Foundation Parent Ownership Guards
-- Protects voice session/transcript cross-table links from cross-user references.

create or replace function public.phase14_guard_voice_sessions_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.chat_session_id is not null and not exists (
    select 1 from public.chat_sessions
    where id = new.chat_session_id and user_id = new.user_id
  ) then
    raise exception 'voice_sessions.chat_session_id must belong to the same user';
  end if;

  if new.source_message_id is not null and not exists (
    select 1 from public.chat_messages
    where id = new.source_message_id and user_id = new.user_id
  ) then
    raise exception 'voice_sessions.source_message_id must belong to the same user';
  end if;

  if new.source_ai_action_id is not null and not exists (
    select 1 from public.ai_actions
    where id = new.source_ai_action_id and user_id = new.user_id
  ) then
    raise exception 'voice_sessions.source_ai_action_id must belong to the same user';
  end if;

  return new;
end;
$$;

create or replace function public.phase14_guard_voice_transcripts_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.voice_sessions
    where id = new.voice_session_id and user_id = new.user_id
  ) then
    raise exception 'voice_transcripts.voice_session_id must belong to the same user';
  end if;

  if new.source_message_id is not null and not exists (
    select 1 from public.chat_messages
    where id = new.source_message_id and user_id = new.user_id
  ) then
    raise exception 'voice_transcripts.source_message_id must belong to the same user';
  end if;

  if new.source_ai_action_id is not null and not exists (
    select 1 from public.ai_actions
    where id = new.source_ai_action_id and user_id = new.user_id
  ) then
    raise exception 'voice_transcripts.source_ai_action_id must belong to the same user';
  end if;

  return new;
end;
$$;

drop trigger if exists phase14_guard_voice_sessions_parent_ownership on public.voice_sessions;
create trigger phase14_guard_voice_sessions_parent_ownership
before insert or update on public.voice_sessions
for each row
execute function public.phase14_guard_voice_sessions_parent_ownership();

drop trigger if exists phase14_guard_voice_transcripts_parent_ownership on public.voice_transcripts;
create trigger phase14_guard_voice_transcripts_parent_ownership
before insert or update on public.voice_transcripts
for each row
execute function public.phase14_guard_voice_transcripts_parent_ownership();
