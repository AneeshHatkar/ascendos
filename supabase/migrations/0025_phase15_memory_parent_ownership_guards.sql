-- Phase 15B — Memory SQL parent ownership guards
--
-- Scope:
-- - Guards optional source references so memory records cannot point to another user's chat messages, AI actions, voice transcripts, memory records, or knowledge records.
--
-- Boundaries:
-- - No embeddings.
-- - No retrieval runtime.
-- - No autonomous memory creation.

create or replace function public.phase15_assert_source_refs_belong_to_user(
  p_user_id uuid,
  p_source_chat_message_id uuid,
  p_source_ai_action_id uuid,
  p_source_voice_transcript_id uuid
)
returns void
language plpgsql
as $$
begin
  if p_source_chat_message_id is not null and not exists (
    select 1 from public.chat_messages
    where id = p_source_chat_message_id
      and user_id = p_user_id
  ) then
    raise exception 'Phase 15 source_chat_message_id must belong to the same user';
  end if;

  if p_source_ai_action_id is not null and not exists (
    select 1 from public.ai_actions
    where id = p_source_ai_action_id
      and user_id = p_user_id
  ) then
    raise exception 'Phase 15 source_ai_action_id must belong to the same user';
  end if;

  if p_source_voice_transcript_id is not null and not exists (
    select 1 from public.voice_transcripts
    where id = p_source_voice_transcript_id
      and user_id = p_user_id
  ) then
    raise exception 'Phase 15 source_voice_transcript_id must belong to the same user';
  end if;
end;
$$;

create or replace function public.phase15_guard_memory_candidates_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.phase15_assert_source_refs_belong_to_user(
    new.user_id,
    new.source_chat_message_id,
    new.source_ai_action_id,
    new.source_voice_transcript_id
  );

  return new;
end;
$$;

create or replace function public.phase15_guard_memory_items_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if new.candidate_id is not null and not exists (
    select 1 from public.memory_candidates
    where id = new.candidate_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_items.candidate_id must belong to the same user';
  end if;

  perform public.phase15_assert_source_refs_belong_to_user(
    new.user_id,
    new.source_chat_message_id,
    new.source_ai_action_id,
    new.source_voice_transcript_id
  );

  return new;
end;
$$;

create or replace function public.phase15_guard_memory_links_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from public.memory_items
    where id = new.memory_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_links.memory_item_id must belong to the same user';
  end if;

  return new;
end;
$$;

create or replace function public.phase15_guard_memory_events_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if new.memory_item_id is not null and not exists (
    select 1 from public.memory_items
    where id = new.memory_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_events.memory_item_id must belong to the same user';
  end if;

  if new.memory_candidate_id is not null and not exists (
    select 1 from public.memory_candidates
    where id = new.memory_candidate_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_events.memory_candidate_id must belong to the same user';
  end if;

  perform public.phase15_assert_source_refs_belong_to_user(
    new.user_id,
    new.source_chat_message_id,
    new.source_ai_action_id,
    new.source_voice_transcript_id
  );

  return new;
end;
$$;

create or replace function public.phase15_guard_memory_preferences_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if new.source_memory_item_id is not null and not exists (
    select 1 from public.memory_items
    where id = new.source_memory_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_preferences.source_memory_item_id must belong to the same user';
  end if;

  if new.source_candidate_id is not null and not exists (
    select 1 from public.memory_candidates
    where id = new.source_candidate_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_preferences.source_candidate_id must belong to the same user';
  end if;

  return new;
end;
$$;

create or replace function public.phase15_guard_do_not_remember_rules_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if new.source_candidate_id is not null and not exists (
    select 1 from public.memory_candidates
    where id = new.source_candidate_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_do_not_remember_rules.source_candidate_id must belong to the same user';
  end if;

  if new.source_memory_item_id is not null and not exists (
    select 1 from public.memory_items
    where id = new.source_memory_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_do_not_remember_rules.source_memory_item_id must belong to the same user';
  end if;

  return new;
end;
$$;

create or replace function public.phase15_guard_carnos_context_snapshots_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  perform public.phase15_assert_source_refs_belong_to_user(
    new.user_id,
    new.source_chat_message_id,
    new.source_ai_action_id,
    null
  );

  return new;
end;
$$;

create or replace function public.phase15_guard_knowledge_links_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from public.knowledge_items
    where id = new.knowledge_item_id
      and user_id = new.user_id
  ) then
    raise exception 'knowledge_links.knowledge_item_id must belong to the same user';
  end if;

  if new.knowledge_tag_id is not null and not exists (
    select 1 from public.knowledge_tags
    where id = new.knowledge_tag_id
      and user_id = new.user_id
  ) then
    raise exception 'knowledge_links.knowledge_tag_id must belong to the same user';
  end if;

  return new;
end;
$$;

create or replace function public.phase15_guard_memory_usage_logs_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if new.memory_item_id is not null and not exists (
    select 1 from public.memory_items
    where id = new.memory_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_usage_logs.memory_item_id must belong to the same user';
  end if;

  if new.knowledge_item_id is not null and not exists (
    select 1 from public.knowledge_items
    where id = new.knowledge_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_usage_logs.knowledge_item_id must belong to the same user';
  end if;

  if new.retrieval_log_id is not null and not exists (
    select 1 from public.retrieval_logs
    where id = new.retrieval_log_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_usage_logs.retrieval_log_id must belong to the same user';
  end if;

  return new;
end;
$$;

create or replace function public.phase15_guard_memory_review_queue_parent_ownership()
returns trigger
language plpgsql
as $$
begin
  if new.memory_candidate_id is not null and not exists (
    select 1 from public.memory_candidates
    where id = new.memory_candidate_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_review_queue.memory_candidate_id must belong to the same user';
  end if;

  if new.memory_item_id is not null and not exists (
    select 1 from public.memory_items
    where id = new.memory_item_id
      and user_id = new.user_id
  ) then
    raise exception 'memory_review_queue.memory_item_id must belong to the same user';
  end if;

  return new;
end;
$$;

drop trigger if exists phase15_guard_memory_candidates_parent_ownership on public.memory_candidates;
create trigger phase15_guard_memory_candidates_parent_ownership
before insert or update on public.memory_candidates
for each row
execute function public.phase15_guard_memory_candidates_parent_ownership();

drop trigger if exists phase15_guard_memory_items_parent_ownership on public.memory_items;
create trigger phase15_guard_memory_items_parent_ownership
before insert or update on public.memory_items
for each row
execute function public.phase15_guard_memory_items_parent_ownership();

drop trigger if exists phase15_guard_memory_links_parent_ownership on public.memory_links;
create trigger phase15_guard_memory_links_parent_ownership
before insert or update on public.memory_links
for each row
execute function public.phase15_guard_memory_links_parent_ownership();

drop trigger if exists phase15_guard_memory_events_parent_ownership on public.memory_events;
create trigger phase15_guard_memory_events_parent_ownership
before insert or update on public.memory_events
for each row
execute function public.phase15_guard_memory_events_parent_ownership();

drop trigger if exists phase15_guard_memory_preferences_parent_ownership on public.memory_preferences;
create trigger phase15_guard_memory_preferences_parent_ownership
before insert or update on public.memory_preferences
for each row
execute function public.phase15_guard_memory_preferences_parent_ownership();

drop trigger if exists phase15_guard_do_not_remember_rules_parent_ownership on public.memory_do_not_remember_rules;
create trigger phase15_guard_do_not_remember_rules_parent_ownership
before insert or update on public.memory_do_not_remember_rules
for each row
execute function public.phase15_guard_do_not_remember_rules_parent_ownership();

drop trigger if exists phase15_guard_carnos_context_snapshots_parent_ownership on public.carnos_context_snapshots;
create trigger phase15_guard_carnos_context_snapshots_parent_ownership
before insert or update on public.carnos_context_snapshots
for each row
execute function public.phase15_guard_carnos_context_snapshots_parent_ownership();

drop trigger if exists phase15_guard_knowledge_links_parent_ownership on public.knowledge_links;
create trigger phase15_guard_knowledge_links_parent_ownership
before insert or update on public.knowledge_links
for each row
execute function public.phase15_guard_knowledge_links_parent_ownership();

drop trigger if exists phase15_guard_memory_usage_logs_parent_ownership on public.memory_usage_logs;
create trigger phase15_guard_memory_usage_logs_parent_ownership
before insert or update on public.memory_usage_logs
for each row
execute function public.phase15_guard_memory_usage_logs_parent_ownership();

drop trigger if exists phase15_guard_memory_review_queue_parent_ownership on public.memory_review_queue;
create trigger phase15_guard_memory_review_queue_parent_ownership
before insert or update on public.memory_review_queue
for each row
execute function public.phase15_guard_memory_review_queue_parent_ownership();
