-- Web Source SQL Foundation
-- Adds current-information source capture tables only.
-- No provider calls.
-- No browser-side secrets.
-- No automatic saves from internet results.
-- No automatic memory conversion.
-- No pgvector.
-- No memory_embeddings.

create table if not exists public.web_search_queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  query_text text not null,
  query_hash text,
  query_kind text not null default 'general_current_info',
  search_surface text not null default 'carnos',
  provider_kind text not null default 'noop',
  provider_query_id text,

  status text not null default 'draft',
  private_mode boolean not null default false,
  retention_policy text not null default 'standard',
  retention_expires_at timestamptz,

  sensitive_category text,
  blocked_reason text,
  result_count integer not null default 0,

  executed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint web_search_queries_status_check check (
    status in (
      'draft',
      'queued',
      'executed',
      'failed',
      'blocked_by_private_mode',
      'blocked_by_policy',
      'deleted'
    )
  ),
  constraint web_search_queries_query_kind_check check (
    query_kind in (
      'job_search',
      'company_research',
      'lab_search',
      'professor_search',
      'paper_search',
      'documentation_lookup',
      'learning_resource_search',
      'health_current_info',
      'legal_current_info',
      'financial_current_info',
      'general_current_info'
    )
  ),
  constraint web_search_queries_provider_kind_check check (
    provider_kind in ('noop', 'manual', 'external_search_provider')
  ),
  constraint web_search_queries_retention_policy_check check (
    retention_policy in ('standard', 'private_mode_ephemeral', 'do_not_retain', 'manual_save_only')
  )
);

create table if not exists public.web_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  search_query_id uuid references public.web_search_queries(id) on delete set null,

  source_url text not null,
  canonical_url text,
  url_hash text,
  domain text,
  title text,
  description text,
  excerpt text,
  summary text,

  source_kind text not null default 'general_resource',
  reliability_label text not null default 'unknown',
  freshness_label text not null default 'unknown',

  published_at timestamptz,
  retrieved_at timestamptz,
  citation_accessed_at timestamptz,
  citation_label text,
  citation_url text,

  raw_content_stored boolean not null default false,
  content_hash text,

  private_mode boolean not null default false,
  sensitive_category text,
  retention_policy text not null default 'standard',
  retention_expires_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint web_sources_source_kind_check check (
    source_kind in (
      'job_posting',
      'company_page',
      'lab_page',
      'professor_page',
      'paper',
      'documentation',
      'learning_resource',
      'news_article',
      'official_resource',
      'general_resource'
    )
  ),
  constraint web_sources_reliability_label_check check (
    reliability_label in (
      'official',
      'primary_source',
      'academic',
      'reputable_secondary',
      'community',
      'unknown',
      'blocked'
    )
  ),
  constraint web_sources_freshness_label_check check (
    freshness_label in (
      'live_or_recent',
      'recent',
      'possibly_stale',
      'historical',
      'unknown'
    )
  ),
  constraint web_sources_retention_policy_check check (
    retention_policy in ('standard', 'private_mode_ephemeral', 'do_not_retain', 'manual_save_only')
  )
);

create table if not exists public.web_source_candidates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  search_query_id uuid references public.web_search_queries(id) on delete set null,
  source_id uuid references public.web_sources(id) on delete cascade,

  candidate_type text not null default 'save_web_source_to_knowledge_candidate',
  candidate_status text not null default 'pending_review',

  suggested_destination_table text,
  suggested_action_type text,
  extracted_payload jsonb not null default '{}'::jsonb,

  missing_fields text[] not null default array[]::text[],
  duplicate_hints jsonb not null default '[]'::jsonb,
  reliability_warnings text[] not null default array[]::text[],
  freshness_warnings text[] not null default array[]::text[],
  privacy_warnings text[] not null default array[]::text[],

  review_notes text,
  reviewed_at timestamptz,
  approved_at timestamptz,
  rejected_at timestamptz,
  archived_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint web_source_candidates_type_check check (
    candidate_type in (
      'save_web_source_to_knowledge_candidate',
      'create_task_from_web_source_candidate',
      'create_goal_from_web_source_candidate',
      'create_job_application_from_web_source_candidate',
      'create_research_literature_item_from_web_source_candidate',
      'create_research_citation_from_web_source_candidate',
      'create_target_lab_from_web_source_candidate',
      'create_target_professor_from_web_source_candidate'
    )
  ),
  constraint web_source_candidates_status_check check (
    candidate_status in (
      'pending_review',
      'edited',
      'approved',
      'rejected',
      'archived',
      'blocked_by_private_mode',
      'blocked_by_reliability',
      'blocked_by_duplicate'
    )
  )
);

create table if not exists public.web_source_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_id uuid not null references public.web_sources(id) on delete cascade,
  candidate_id uuid references public.web_source_candidates(id) on delete set null,

  linked_table text not null,
  linked_record_id uuid,
  link_kind text not null default 'citation',
  link_status text not null default 'preview',

  citation_label text,
  citation_url text,
  evidence_note text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint web_source_links_kind_check check (
    link_kind in (
      'citation',
      'source',
      'evidence',
      'provenance',
      'duplicate_reference',
      'staleness_reference'
    )
  ),
  constraint web_source_links_status_check check (
    link_status in ('preview', 'active', 'archived', 'deleted')
  )
);

create table if not exists public.web_source_audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  search_query_id uuid references public.web_search_queries(id) on delete set null,
  source_id uuid references public.web_sources(id) on delete set null,
  candidate_id uuid references public.web_source_candidates(id) on delete set null,
  source_link_id uuid references public.web_source_links(id) on delete set null,

  event_type text not null,
  actor_type text not null default 'system',
  event_summary text not null,
  event_payload jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),

  constraint web_source_audit_events_type_check check (
    event_type in (
      'web_search_performed',
      'web_source_viewed',
      'web_source_candidate_created',
      'web_source_candidate_approved',
      'web_source_candidate_rejected',
      'web_source_saved',
      'web_source_linked_to_record',
      'web_source_marked_stale',
      'web_source_blocked_by_private_mode',
      'web_source_blocked_by_reliability'
    )
  ),
  constraint web_source_audit_events_actor_check check (
    actor_type in ('user', 'carnos', 'system')
  )
);

alter table public.web_search_queries enable row level security;
alter table public.web_sources enable row level security;
alter table public.web_source_candidates enable row level security;
alter table public.web_source_links enable row level security;
alter table public.web_source_audit_events enable row level security;

drop policy if exists web_search_queries_select_own on public.web_search_queries;
create policy web_search_queries_select_own
on public.web_search_queries for select
using (auth.uid() = user_id);

drop policy if exists web_search_queries_insert_own on public.web_search_queries;
create policy web_search_queries_insert_own
on public.web_search_queries for insert
with check (auth.uid() = user_id);

drop policy if exists web_search_queries_update_own on public.web_search_queries;
create policy web_search_queries_update_own
on public.web_search_queries for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists web_search_queries_delete_own on public.web_search_queries;
create policy web_search_queries_delete_own
on public.web_search_queries for delete
using (auth.uid() = user_id);

drop policy if exists web_sources_select_own on public.web_sources;
create policy web_sources_select_own
on public.web_sources for select
using (auth.uid() = user_id);

drop policy if exists web_sources_insert_own on public.web_sources;
create policy web_sources_insert_own
on public.web_sources for insert
with check (auth.uid() = user_id);

drop policy if exists web_sources_update_own on public.web_sources;
create policy web_sources_update_own
on public.web_sources for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists web_sources_delete_own on public.web_sources;
create policy web_sources_delete_own
on public.web_sources for delete
using (auth.uid() = user_id);

drop policy if exists web_source_candidates_select_own on public.web_source_candidates;
create policy web_source_candidates_select_own
on public.web_source_candidates for select
using (auth.uid() = user_id);

drop policy if exists web_source_candidates_insert_own on public.web_source_candidates;
create policy web_source_candidates_insert_own
on public.web_source_candidates for insert
with check (auth.uid() = user_id);

drop policy if exists web_source_candidates_update_own on public.web_source_candidates;
create policy web_source_candidates_update_own
on public.web_source_candidates for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists web_source_candidates_delete_own on public.web_source_candidates;
create policy web_source_candidates_delete_own
on public.web_source_candidates for delete
using (auth.uid() = user_id);

drop policy if exists web_source_links_select_own on public.web_source_links;
create policy web_source_links_select_own
on public.web_source_links for select
using (auth.uid() = user_id);

drop policy if exists web_source_links_insert_own on public.web_source_links;
create policy web_source_links_insert_own
on public.web_source_links for insert
with check (auth.uid() = user_id);

drop policy if exists web_source_links_update_own on public.web_source_links;
create policy web_source_links_update_own
on public.web_source_links for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists web_source_links_delete_own on public.web_source_links;
create policy web_source_links_delete_own
on public.web_source_links for delete
using (auth.uid() = user_id);

drop policy if exists web_source_audit_events_select_own on public.web_source_audit_events;
create policy web_source_audit_events_select_own
on public.web_source_audit_events for select
using (auth.uid() = user_id);

drop policy if exists web_source_audit_events_insert_own on public.web_source_audit_events;
create policy web_source_audit_events_insert_own
on public.web_source_audit_events for insert
with check (auth.uid() = user_id);

create index if not exists web_search_queries_user_created_idx
on public.web_search_queries(user_id, created_at desc);

create index if not exists web_search_queries_user_kind_idx
on public.web_search_queries(user_id, query_kind);

create index if not exists web_sources_user_created_idx
on public.web_sources(user_id, created_at desc);

create index if not exists web_sources_user_domain_idx
on public.web_sources(user_id, domain);

create index if not exists web_sources_user_kind_idx
on public.web_sources(user_id, source_kind);

create index if not exists web_sources_user_url_hash_idx
on public.web_sources(user_id, url_hash);

create index if not exists web_source_candidates_user_status_idx
on public.web_source_candidates(user_id, candidate_status, created_at desc);

create index if not exists web_source_candidates_user_type_idx
on public.web_source_candidates(user_id, candidate_type);

create index if not exists web_source_links_user_source_idx
on public.web_source_links(user_id, source_id);

create index if not exists web_source_links_user_linked_record_idx
on public.web_source_links(user_id, linked_table, linked_record_id);

create index if not exists web_source_audit_events_user_created_idx
on public.web_source_audit_events(user_id, created_at desc);

create index if not exists web_source_audit_events_user_type_idx
on public.web_source_audit_events(user_id, event_type);
