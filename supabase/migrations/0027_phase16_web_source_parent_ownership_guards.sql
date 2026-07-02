-- Web Source parent ownership guards.
-- Ensures related web-source rows cannot point across users.

create or replace function public.phase16_assert_web_source_ref_belongs_to_user(
  target_user_id uuid,
  target_table text,
  target_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
begin
  if target_id is null then
    return;
  end if;

  if target_table = 'web_search_queries' then
    select user_id into owner_id from public.web_search_queries where id = target_id;
  elsif target_table = 'web_sources' then
    select user_id into owner_id from public.web_sources where id = target_id;
  elsif target_table = 'web_source_candidates' then
    select user_id into owner_id from public.web_source_candidates where id = target_id;
  elsif target_table = 'web_source_links' then
    select user_id into owner_id from public.web_source_links where id = target_id;
  else
    raise exception 'Unsupported web source ownership table: %', target_table;
  end if;

  if owner_id is null or owner_id <> target_user_id then
    raise exception 'Web source parent ownership violation for table % and id %', target_table, target_id;
  end if;
end;
$$;

create or replace function public.phase16_guard_web_sources_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_search_queries', new.search_query_id);
  return new;
end;
$$;

drop trigger if exists phase16_web_sources_parent_ownership on public.web_sources;
create trigger phase16_web_sources_parent_ownership
before insert or update on public.web_sources
for each row execute function public.phase16_guard_web_sources_parent_ownership();

create or replace function public.phase16_guard_web_source_candidates_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_search_queries', new.search_query_id);
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_sources', new.source_id);
  return new;
end;
$$;

drop trigger if exists phase16_web_source_candidates_parent_ownership on public.web_source_candidates;
create trigger phase16_web_source_candidates_parent_ownership
before insert or update on public.web_source_candidates
for each row execute function public.phase16_guard_web_source_candidates_parent_ownership();

create or replace function public.phase16_guard_web_source_links_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_sources', new.source_id);
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_source_candidates', new.candidate_id);
  return new;
end;
$$;

drop trigger if exists phase16_web_source_links_parent_ownership on public.web_source_links;
create trigger phase16_web_source_links_parent_ownership
before insert or update on public.web_source_links
for each row execute function public.phase16_guard_web_source_links_parent_ownership();

create or replace function public.phase16_guard_web_source_audit_events_parent_ownership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_search_queries', new.search_query_id);
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_sources', new.source_id);
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_source_candidates', new.candidate_id);
  perform public.phase16_assert_web_source_ref_belongs_to_user(new.user_id, 'web_source_links', new.source_link_id);
  return new;
end;
$$;

drop trigger if exists phase16_web_source_audit_events_parent_ownership on public.web_source_audit_events;
create trigger phase16_web_source_audit_events_parent_ownership
before insert or update on public.web_source_audit_events
for each row execute function public.phase16_guard_web_source_audit_events_parent_ownership();
