-- Phase 15B — Carnos Persistent Memory + Continuity SQL Foundation
--
-- Scope:
-- - Adds SQL foundation tables for approved memory, candidates, privacy rules, Carnos continuity, knowledge vault metadata, retrieval logs, and usage logs.
-- - Adds RLS policies and indexes.
--
-- Boundaries:
-- - No pgvector.
-- - No vector column.
-- - No memory_embeddings table.
-- - No embedding generation.
-- - No retrieval runtime.
-- - No Carnos prompt/context injection.
-- - No automatic transcript-to-memory.
-- - No autonomous memory writes.
-- - No provider/API calls.
-- - No UI route implementation.

create table if not exists public.memory_candidates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  candidate_text text not null,
  candidate_summary text,
  memory_type text not null default 'conversation_continuity',
  candidate_source text not null default 'manual',
  status text not null default 'pending_review',
  sensitivity text not null default 'medium',
  confidence numeric(4,3) not null default 0.500,
  priority text not null default 'medium',

  source_route text,
  source_table text,
  source_record_id uuid,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_voice_transcript_id uuid references public.voice_transcripts(id) on delete set null,

  proposed_reason text,
  rejection_reason text,
  blocked_reason text,

  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  expires_at timestamptz,

  constraint memory_candidates_candidate_text_not_blank check (length(trim(candidate_text)) > 0),
  constraint memory_candidates_memory_type_check check (
    memory_type in (
      'preference',
      'goal',
      'project_fact',
      'project_decision',
      'routine',
      'system_state',
      'carnos_entity_state',
      'source_of_truth_note',
      'conversation_continuity',
      'user_profile_fact',
      'sensitive_note',
      'knowledge_item',
      'voice_transcript_candidate',
      'research_note',
      'career_context',
      'health_context',
      'grimoire_context',
      'privacy_rule',
      'do_not_remember_rule'
    )
  ),
  constraint memory_candidates_source_check check (
    candidate_source in (
      'manual_user_remember_this',
      'manual_user_do_not_remember_this',
      'chat_message',
      'voice_transcript_draft',
      'source_of_truth_change',
      'project_update',
      'system_event',
      'imported_note',
      'manual'
    )
  ),
  constraint memory_candidates_status_check check (
    status in (
      'candidate',
      'pending_review',
      'approved',
      'edited',
      'rejected',
      'archived',
      'forgotten',
      'blocked_by_private_mode',
      'blocked_by_do_not_remember'
    )
  ),
  constraint memory_candidates_sensitivity_check check (
    sensitivity in ('low', 'medium', 'high', 'restricted')
  ),
  constraint memory_candidates_priority_check check (
    priority in ('low', 'medium', 'high')
  ),
  constraint memory_candidates_confidence_check check (
    confidence >= 0 and confidence <= 1
  )
);

create table if not exists public.memory_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  candidate_id uuid references public.memory_candidates(id) on delete set null,

  memory_text text not null,
  memory_summary text,
  memory_type text not null,
  status text not null default 'approved',
  sensitivity text not null default 'medium',
  confidence numeric(4,3) not null default 0.500,
  priority text not null default 'medium',

  source_route text,
  source_table text,
  source_record_id uuid,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_voice_transcript_id uuid references public.voice_transcripts(id) on delete set null,

  provenance jsonb not null default '{}'::jsonb,
  conflict_group_key text,
  conflict_state text not null default 'none',
  stale_state text not null default 'fresh',
  review_state text not null default 'current',

  approved_at timestamptz not null default now(),
  last_used_at timestamptz,
  review_after timestamptz,
  forgotten_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint memory_items_text_not_blank check (length(trim(memory_text)) > 0),
  constraint memory_items_memory_type_check check (
    memory_type in (
      'preference',
      'goal',
      'project_fact',
      'project_decision',
      'routine',
      'system_state',
      'carnos_entity_state',
      'source_of_truth_note',
      'conversation_continuity',
      'user_profile_fact',
      'sensitive_note',
      'knowledge_item',
      'voice_transcript_candidate',
      'research_note',
      'career_context',
      'health_context',
      'grimoire_context',
      'privacy_rule',
      'do_not_remember_rule'
    )
  ),
  constraint memory_items_status_check check (
    status in (
      'approved',
      'edited',
      'archived',
      'forgotten',
      'stale',
      'needs_review'
    )
  ),
  constraint memory_items_sensitivity_check check (
    sensitivity in ('low', 'medium', 'high', 'restricted')
  ),
  constraint memory_items_priority_check check (
    priority in ('low', 'medium', 'high')
  ),
  constraint memory_items_confidence_check check (
    confidence >= 0 and confidence <= 1
  ),
  constraint memory_items_conflict_state_check check (
    conflict_state in ('none', 'possible_conflict', 'conflict_detected', 'resolved')
  ),
  constraint memory_items_stale_state_check check (
    stale_state in ('fresh', 'possibly_stale', 'stale', 'expired')
  ),
  constraint memory_items_review_state_check check (
    review_state in ('current', 'needs_review', 'reviewed', 'blocked')
  )
);

create table if not exists public.memory_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  memory_item_id uuid not null references public.memory_items(id) on delete cascade,

  linked_table text not null,
  linked_record_id uuid not null,
  link_type text not null default 'related_context',
  link_strength numeric(4,3) not null default 0.500,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint memory_links_table_not_blank check (length(trim(linked_table)) > 0),
  constraint memory_links_link_type_check check (
    link_type in (
      'source',
      'derived_from',
      'related_context',
      'supports',
      'contradicts',
      'supersedes',
      'belongs_to_project',
      'belongs_to_domain'
    )
  ),
  constraint memory_links_strength_check check (
    link_strength >= 0 and link_strength <= 1
  )
);

create table if not exists public.memory_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  memory_item_id uuid references public.memory_items(id) on delete set null,
  memory_candidate_id uuid references public.memory_candidates(id) on delete set null,

  event_type text not null,
  event_summary text not null,
  actor_type text not null default 'user',
  source_route text,
  source_table text,
  source_record_id uuid,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_voice_transcript_id uuid references public.voice_transcripts(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint memory_events_summary_not_blank check (length(trim(event_summary)) > 0),
  constraint memory_events_type_check check (
    event_type in (
      'candidate_created',
      'candidate_approved',
      'candidate_edited',
      'candidate_rejected',
      'memory_created',
      'memory_updated',
      'memory_archived',
      'memory_forgotten',
      'memory_used_in_context_pack',
      'memory_used_in_carnos_response',
      'private_mode_enabled',
      'private_mode_disabled',
      'do_not_remember_rule_created',
      'do_not_remember_rule_matched',
      'conflict_detected',
      'conflict_resolved',
      'stale_memory_detected',
      'review_requested',
      'derived_records_deleted'
    )
  ),
  constraint memory_events_actor_type_check check (
    actor_type in ('user', 'carnos', 'system')
  )
);

create table if not exists public.memory_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  preference_key text not null,
  preference_value jsonb not null default '{}'::jsonb,
  preference_scope text not null default 'global',
  status text not null default 'active',
  source_memory_item_id uuid references public.memory_items(id) on delete set null,
  source_candidate_id uuid references public.memory_candidates(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint memory_preferences_key_not_blank check (length(trim(preference_key)) > 0),
  constraint memory_preferences_scope_check check (
    preference_scope in ('global', 'carnos', 'voice', 'privacy', 'career', 'learning', 'research', 'health', 'grimoire', 'project')
  ),
  constraint memory_preferences_status_check check (
    status in ('active', 'inactive', 'archived', 'forgotten')
  ),
  constraint memory_preferences_user_key_scope_unique unique (user_id, preference_key, preference_scope)
);

create table if not exists public.memory_do_not_remember_rules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  rule_text text not null,
  rule_scope text not null default 'global',
  rule_type text not null default 'block_memory_creation',
  status text not null default 'active',
  sensitivity text not null default 'high',

  source_candidate_id uuid references public.memory_candidates(id) on delete set null,
  source_memory_item_id uuid references public.memory_items(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint memory_do_not_remember_rule_text_not_blank check (length(trim(rule_text)) > 0),
  constraint memory_do_not_remember_scope_check check (
    rule_scope in ('global', 'voice', 'chat', 'health_body', 'career', 'research', 'grimoire', 'knowledge', 'project')
  ),
  constraint memory_do_not_remember_type_check check (
    rule_type in ('block_memory_creation', 'block_retrieval', 'block_embedding', 'block_context_pack', 'block_all')
  ),
  constraint memory_do_not_remember_status_check check (
    status in ('active', 'inactive', 'archived', 'forgotten')
  ),
  constraint memory_do_not_remember_sensitivity_check check (
    sensitivity in ('medium', 'high', 'restricted')
  )
);

create table if not exists public.carnos_entity_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  carnos_name text not null default 'Carnos',
  carnos_role text not null default 'AI companion inside ascendOS',
  carnos_mission text not null default 'Help the user turn life data into grounded action while preserving user control.',
  carnos_tone text not null default 'direct, strategic, supportive, honest',
  current_phase text,
  current_project text,
  latest_milestone text,
  next_objective text,

  memory_policy text not null default 'approved_memory_only',
  voice_policy text not null default 'no_background_recording',
  action_policy text not null default 'proposal_requires_confirmation',

  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint carnos_entity_state_name_not_blank check (length(trim(carnos_name)) > 0),
  constraint carnos_entity_state_memory_policy_check check (
    memory_policy in ('off', 'approval_required', 'approved_memory_only')
  ),
  constraint carnos_entity_state_voice_policy_check check (
    voice_policy in ('off', 'push_to_talk_only', 'no_background_recording')
  ),
  constraint carnos_entity_state_action_policy_check check (
    action_policy in ('no_actions', 'proposal_requires_confirmation', 'approved_actions_only')
  ),
  constraint carnos_entity_state_status_check check (
    status in ('active', 'paused', 'archived')
  ),
  constraint carnos_entity_state_user_unique unique (user_id)
);

create table if not exists public.carnos_context_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  snapshot_title text not null,
  snapshot_reason text not null,
  context_pack_preview jsonb not null default '{}'::jsonb,
  included_memory_ids uuid[] not null default '{}'::uuid[],
  excluded_memory_ids uuid[] not null default '{}'::uuid[],
  token_budget_estimate integer not null default 0,
  status text not null default 'preview_only',

  source_route text,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint carnos_context_snapshots_title_not_blank check (length(trim(snapshot_title)) > 0),
  constraint carnos_context_snapshots_reason_not_blank check (length(trim(snapshot_reason)) > 0),
  constraint carnos_context_snapshots_status_check check (
    status in ('preview_only', 'used', 'archived')
  ),
  constraint carnos_context_snapshots_token_budget_check check (
    token_budget_estimate >= 0
  )
);

create table if not exists public.project_memory_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  project_key text not null,
  project_name text not null,
  current_phase text,
  latest_commit text,
  latest_milestone text,
  next_step text,
  source_of_truth_ref text,
  state_summary text not null,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_memory_state_key_not_blank check (length(trim(project_key)) > 0),
  constraint project_memory_state_name_not_blank check (length(trim(project_name)) > 0),
  constraint project_memory_state_summary_not_blank check (length(trim(state_summary)) > 0),
  constraint project_memory_state_status_check check (
    status in ('active', 'paused', 'archived', 'forgotten')
  ),
  constraint project_memory_state_user_key_unique unique (user_id, project_key)
);

create table if not exists public.system_memory_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  system_key text not null,
  system_name text not null,
  source_of_truth_rank integer not null default 100,
  state_summary text not null,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint system_memory_state_key_not_blank check (length(trim(system_key)) > 0),
  constraint system_memory_state_name_not_blank check (length(trim(system_name)) > 0),
  constraint system_memory_state_summary_not_blank check (length(trim(state_summary)) > 0),
  constraint system_memory_state_rank_check check (source_of_truth_rank >= 0),
  constraint system_memory_state_status_check check (
    status in ('active', 'paused', 'archived', 'forgotten')
  ),
  constraint system_memory_state_user_key_unique unique (user_id, system_key)
);

create table if not exists public.knowledge_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  title text not null,
  content text not null,
  knowledge_type text not null default 'note',
  source_kind text not null default 'manual',
  source_uri text,
  source_table text,
  source_record_id uuid,
  status text not null default 'active',
  sensitivity text not null default 'medium',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint knowledge_items_title_not_blank check (length(trim(title)) > 0),
  constraint knowledge_items_content_not_blank check (length(trim(content)) > 0),
  constraint knowledge_items_type_check check (
    knowledge_type in ('note', 'document_summary', 'research_note', 'project_note', 'source_of_truth_note', 'reference')
  ),
  constraint knowledge_items_source_kind_check check (
    source_kind in ('manual', 'uploaded_document', 'source_of_truth', 'project_record', 'research_record', 'external_reference')
  ),
  constraint knowledge_items_status_check check (
    status in ('active', 'archived', 'forgotten', 'blocked')
  ),
  constraint knowledge_items_sensitivity_check check (
    sensitivity in ('low', 'medium', 'high', 'restricted')
  )
);

create table if not exists public.knowledge_tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  tag_name text not null,
  tag_scope text not null default 'knowledge',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint knowledge_tags_name_not_blank check (length(trim(tag_name)) > 0),
  constraint knowledge_tags_scope_check check (
    tag_scope in ('knowledge', 'memory', 'project', 'research', 'career', 'health', 'grimoire', 'system')
  ),
  constraint knowledge_tags_user_name_scope_unique unique (user_id, tag_name, tag_scope)
);

create table if not exists public.knowledge_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  knowledge_item_id uuid not null references public.knowledge_items(id) on delete cascade,
  knowledge_tag_id uuid references public.knowledge_tags(id) on delete set null,

  linked_table text,
  linked_record_id uuid,
  link_type text not null default 'related_context',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint knowledge_links_type_check check (
    link_type in ('tagged_as', 'source', 'derived_from', 'related_context', 'supports', 'contradicts')
  )
);

create table if not exists public.retrieval_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  retrieval_surface text not null,
  query_text text,
  retrieved_memory_ids uuid[] not null default '{}'::uuid[],
  retrieved_knowledge_ids uuid[] not null default '{}'::uuid[],
  blocked_memory_ids uuid[] not null default '{}'::uuid[],
  retrieval_reason text not null,
  retrieval_mode text not null default 'preview_only',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint retrieval_logs_surface_not_blank check (length(trim(retrieval_surface)) > 0),
  constraint retrieval_logs_reason_not_blank check (length(trim(retrieval_reason)) > 0),
  constraint retrieval_logs_mode_check check (
    retrieval_mode in ('preview_only', 'approved_memory_only', 'knowledge_only', 'disabled')
  )
);

create table if not exists public.memory_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  memory_item_id uuid references public.memory_items(id) on delete set null,
  knowledge_item_id uuid references public.knowledge_items(id) on delete set null,
  usage_surface text not null,
  usage_reason text not null,
  used_in_context_pack boolean not null default false,
  used_in_carnos_response boolean not null default false,
  retrieval_log_id uuid references public.retrieval_logs(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint memory_usage_logs_surface_not_blank check (length(trim(usage_surface)) > 0),
  constraint memory_usage_logs_reason_not_blank check (length(trim(usage_reason)) > 0)
);

create table if not exists public.memory_review_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,

  memory_candidate_id uuid references public.memory_candidates(id) on delete cascade,
  memory_item_id uuid references public.memory_items(id) on delete cascade,
  review_reason text not null,
  review_status text not null default 'pending_review',
  due_at timestamptz,
  reviewed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),

  constraint memory_review_queue_target_check check (
    memory_candidate_id is not null or memory_item_id is not null
  ),
  constraint memory_review_queue_reason_not_blank check (length(trim(review_reason)) > 0),
  constraint memory_review_queue_status_check check (
    review_status in ('pending_review', 'reviewed', 'snoozed', 'archived')
  )
);

create or replace function public.phase15_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_memory_items_updated_at on public.memory_items;
create trigger set_memory_items_updated_at
before update on public.memory_items
for each row
execute function public.phase15_set_updated_at();

drop trigger if exists set_memory_preferences_updated_at on public.memory_preferences;
create trigger set_memory_preferences_updated_at
before update on public.memory_preferences
for each row
execute function public.phase15_set_updated_at();

drop trigger if exists set_memory_do_not_remember_rules_updated_at on public.memory_do_not_remember_rules;
create trigger set_memory_do_not_remember_rules_updated_at
before update on public.memory_do_not_remember_rules
for each row
execute function public.phase15_set_updated_at();

drop trigger if exists set_carnos_entity_state_updated_at on public.carnos_entity_state;
create trigger set_carnos_entity_state_updated_at
before update on public.carnos_entity_state
for each row
execute function public.phase15_set_updated_at();

drop trigger if exists set_project_memory_state_updated_at on public.project_memory_state;
create trigger set_project_memory_state_updated_at
before update on public.project_memory_state
for each row
execute function public.phase15_set_updated_at();

drop trigger if exists set_system_memory_state_updated_at on public.system_memory_state;
create trigger set_system_memory_state_updated_at
before update on public.system_memory_state
for each row
execute function public.phase15_set_updated_at();

drop trigger if exists set_knowledge_items_updated_at on public.knowledge_items;
create trigger set_knowledge_items_updated_at
before update on public.knowledge_items
for each row
execute function public.phase15_set_updated_at();

alter table public.memory_candidates enable row level security;
alter table public.memory_items enable row level security;
alter table public.memory_links enable row level security;
alter table public.memory_events enable row level security;
alter table public.memory_preferences enable row level security;
alter table public.memory_do_not_remember_rules enable row level security;
alter table public.carnos_entity_state enable row level security;
alter table public.carnos_context_snapshots enable row level security;
alter table public.project_memory_state enable row level security;
alter table public.system_memory_state enable row level security;
alter table public.knowledge_items enable row level security;
alter table public.knowledge_tags enable row level security;
alter table public.knowledge_links enable row level security;
alter table public.retrieval_logs enable row level security;
alter table public.memory_usage_logs enable row level security;
alter table public.memory_review_queue enable row level security;

create index if not exists memory_candidates_user_status_idx on public.memory_candidates(user_id, status);
create index if not exists memory_candidates_user_type_idx on public.memory_candidates(user_id, memory_type);
create index if not exists memory_candidates_user_created_idx on public.memory_candidates(user_id, created_at desc);
create index if not exists memory_candidates_source_chat_message_idx on public.memory_candidates(source_chat_message_id);
create index if not exists memory_candidates_source_ai_action_idx on public.memory_candidates(source_ai_action_id);
create index if not exists memory_candidates_source_voice_transcript_idx on public.memory_candidates(source_voice_transcript_id);

create index if not exists memory_items_user_status_idx on public.memory_items(user_id, status);
create index if not exists memory_items_user_type_idx on public.memory_items(user_id, memory_type);
create index if not exists memory_items_user_priority_idx on public.memory_items(user_id, priority);
create index if not exists memory_items_user_review_after_idx on public.memory_items(user_id, review_after);
create index if not exists memory_items_user_last_used_idx on public.memory_items(user_id, last_used_at desc);
create index if not exists memory_items_candidate_idx on public.memory_items(candidate_id);
create index if not exists memory_items_source_chat_message_idx on public.memory_items(source_chat_message_id);
create index if not exists memory_items_source_ai_action_idx on public.memory_items(source_ai_action_id);
create index if not exists memory_items_source_voice_transcript_idx on public.memory_items(source_voice_transcript_id);

create index if not exists memory_links_user_memory_idx on public.memory_links(user_id, memory_item_id);
create index if not exists memory_links_user_linked_idx on public.memory_links(user_id, linked_table, linked_record_id);

create index if not exists memory_events_user_created_idx on public.memory_events(user_id, created_at desc);
create index if not exists memory_events_user_type_idx on public.memory_events(user_id, event_type);
create index if not exists memory_events_memory_item_idx on public.memory_events(memory_item_id);
create index if not exists memory_events_candidate_idx on public.memory_events(memory_candidate_id);

create index if not exists memory_preferences_user_scope_idx on public.memory_preferences(user_id, preference_scope);
create index if not exists memory_preferences_user_status_idx on public.memory_preferences(user_id, status);

create index if not exists memory_do_not_remember_rules_user_scope_idx on public.memory_do_not_remember_rules(user_id, rule_scope);
create index if not exists memory_do_not_remember_rules_user_status_idx on public.memory_do_not_remember_rules(user_id, status);

create index if not exists carnos_context_snapshots_user_created_idx on public.carnos_context_snapshots(user_id, created_at desc);
create index if not exists project_memory_state_user_status_idx on public.project_memory_state(user_id, status);
create index if not exists system_memory_state_user_status_idx on public.system_memory_state(user_id, status);

create index if not exists knowledge_items_user_status_idx on public.knowledge_items(user_id, status);
create index if not exists knowledge_items_user_type_idx on public.knowledge_items(user_id, knowledge_type);
create index if not exists knowledge_items_user_created_idx on public.knowledge_items(user_id, created_at desc);
create index if not exists knowledge_tags_user_scope_idx on public.knowledge_tags(user_id, tag_scope);
create index if not exists knowledge_links_user_item_idx on public.knowledge_links(user_id, knowledge_item_id);
create index if not exists knowledge_links_user_linked_idx on public.knowledge_links(user_id, linked_table, linked_record_id);

create index if not exists retrieval_logs_user_created_idx on public.retrieval_logs(user_id, created_at desc);
create index if not exists retrieval_logs_user_surface_idx on public.retrieval_logs(user_id, retrieval_surface);
create index if not exists memory_usage_logs_user_created_idx on public.memory_usage_logs(user_id, created_at desc);
create index if not exists memory_usage_logs_memory_item_idx on public.memory_usage_logs(memory_item_id);
create index if not exists memory_usage_logs_knowledge_item_idx on public.memory_usage_logs(knowledge_item_id);
create index if not exists memory_review_queue_user_status_idx on public.memory_review_queue(user_id, review_status);
create index if not exists memory_review_queue_user_due_idx on public.memory_review_queue(user_id, due_at);

drop policy if exists "Users can view their own memory candidates" on public.memory_candidates;
create policy "Users can view their own memory candidates"
on public.memory_candidates for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory candidates" on public.memory_candidates;
create policy "Users can insert their own memory candidates"
on public.memory_candidates for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory candidates" on public.memory_candidates;
create policy "Users can update their own memory candidates"
on public.memory_candidates for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory candidates" on public.memory_candidates;
create policy "Users can delete their own memory candidates"
on public.memory_candidates for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory items" on public.memory_items;
create policy "Users can view their own memory items"
on public.memory_items for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory items" on public.memory_items;
create policy "Users can insert their own memory items"
on public.memory_items for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory items" on public.memory_items;
create policy "Users can update their own memory items"
on public.memory_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory items" on public.memory_items;
create policy "Users can delete their own memory items"
on public.memory_items for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory links" on public.memory_links;
create policy "Users can view their own memory links"
on public.memory_links for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory links" on public.memory_links;
create policy "Users can insert their own memory links"
on public.memory_links for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory links" on public.memory_links;
create policy "Users can update their own memory links"
on public.memory_links for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory links" on public.memory_links;
create policy "Users can delete their own memory links"
on public.memory_links for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory events" on public.memory_events;
create policy "Users can view their own memory events"
on public.memory_events for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory events" on public.memory_events;
create policy "Users can insert their own memory events"
on public.memory_events for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory events" on public.memory_events;
create policy "Users can update their own memory events"
on public.memory_events for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory events" on public.memory_events;
create policy "Users can delete their own memory events"
on public.memory_events for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory preferences" on public.memory_preferences;
create policy "Users can view their own memory preferences"
on public.memory_preferences for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory preferences" on public.memory_preferences;
create policy "Users can insert their own memory preferences"
on public.memory_preferences for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory preferences" on public.memory_preferences;
create policy "Users can update their own memory preferences"
on public.memory_preferences for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory preferences" on public.memory_preferences;
create policy "Users can delete their own memory preferences"
on public.memory_preferences for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own do not remember rules" on public.memory_do_not_remember_rules;
create policy "Users can view their own do not remember rules"
on public.memory_do_not_remember_rules for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own do not remember rules" on public.memory_do_not_remember_rules;
create policy "Users can insert their own do not remember rules"
on public.memory_do_not_remember_rules for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own do not remember rules" on public.memory_do_not_remember_rules;
create policy "Users can update their own do not remember rules"
on public.memory_do_not_remember_rules for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own do not remember rules" on public.memory_do_not_remember_rules;
create policy "Users can delete their own do not remember rules"
on public.memory_do_not_remember_rules for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own Carnos entity state" on public.carnos_entity_state;
create policy "Users can view their own Carnos entity state"
on public.carnos_entity_state for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own Carnos entity state" on public.carnos_entity_state;
create policy "Users can insert their own Carnos entity state"
on public.carnos_entity_state for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own Carnos entity state" on public.carnos_entity_state;
create policy "Users can update their own Carnos entity state"
on public.carnos_entity_state for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own Carnos entity state" on public.carnos_entity_state;
create policy "Users can delete their own Carnos entity state"
on public.carnos_entity_state for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own Carnos context snapshots" on public.carnos_context_snapshots;
create policy "Users can view their own Carnos context snapshots"
on public.carnos_context_snapshots for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own Carnos context snapshots" on public.carnos_context_snapshots;
create policy "Users can insert their own Carnos context snapshots"
on public.carnos_context_snapshots for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own Carnos context snapshots" on public.carnos_context_snapshots;
create policy "Users can update their own Carnos context snapshots"
on public.carnos_context_snapshots for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own Carnos context snapshots" on public.carnos_context_snapshots;
create policy "Users can delete their own Carnos context snapshots"
on public.carnos_context_snapshots for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own project memory state" on public.project_memory_state;
create policy "Users can view their own project memory state"
on public.project_memory_state for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own project memory state" on public.project_memory_state;
create policy "Users can insert their own project memory state"
on public.project_memory_state for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own project memory state" on public.project_memory_state;
create policy "Users can update their own project memory state"
on public.project_memory_state for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own project memory state" on public.project_memory_state;
create policy "Users can delete their own project memory state"
on public.project_memory_state for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own system memory state" on public.system_memory_state;
create policy "Users can view their own system memory state"
on public.system_memory_state for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own system memory state" on public.system_memory_state;
create policy "Users can insert their own system memory state"
on public.system_memory_state for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own system memory state" on public.system_memory_state;
create policy "Users can update their own system memory state"
on public.system_memory_state for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own system memory state" on public.system_memory_state;
create policy "Users can delete their own system memory state"
on public.system_memory_state for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own knowledge items" on public.knowledge_items;
create policy "Users can view their own knowledge items"
on public.knowledge_items for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own knowledge items" on public.knowledge_items;
create policy "Users can insert their own knowledge items"
on public.knowledge_items for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own knowledge items" on public.knowledge_items;
create policy "Users can update their own knowledge items"
on public.knowledge_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own knowledge items" on public.knowledge_items;
create policy "Users can delete their own knowledge items"
on public.knowledge_items for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own knowledge tags" on public.knowledge_tags;
create policy "Users can view their own knowledge tags"
on public.knowledge_tags for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own knowledge tags" on public.knowledge_tags;
create policy "Users can insert their own knowledge tags"
on public.knowledge_tags for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own knowledge tags" on public.knowledge_tags;
create policy "Users can update their own knowledge tags"
on public.knowledge_tags for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own knowledge tags" on public.knowledge_tags;
create policy "Users can delete their own knowledge tags"
on public.knowledge_tags for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own knowledge links" on public.knowledge_links;
create policy "Users can view their own knowledge links"
on public.knowledge_links for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own knowledge links" on public.knowledge_links;
create policy "Users can insert their own knowledge links"
on public.knowledge_links for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own knowledge links" on public.knowledge_links;
create policy "Users can update their own knowledge links"
on public.knowledge_links for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own knowledge links" on public.knowledge_links;
create policy "Users can delete their own knowledge links"
on public.knowledge_links for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own retrieval logs" on public.retrieval_logs;
create policy "Users can view their own retrieval logs"
on public.retrieval_logs for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own retrieval logs" on public.retrieval_logs;
create policy "Users can insert their own retrieval logs"
on public.retrieval_logs for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own retrieval logs" on public.retrieval_logs;
create policy "Users can update their own retrieval logs"
on public.retrieval_logs for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own retrieval logs" on public.retrieval_logs;
create policy "Users can delete their own retrieval logs"
on public.retrieval_logs for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory usage logs" on public.memory_usage_logs;
create policy "Users can view their own memory usage logs"
on public.memory_usage_logs for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory usage logs" on public.memory_usage_logs;
create policy "Users can insert their own memory usage logs"
on public.memory_usage_logs for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory usage logs" on public.memory_usage_logs;
create policy "Users can update their own memory usage logs"
on public.memory_usage_logs for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory usage logs" on public.memory_usage_logs;
create policy "Users can delete their own memory usage logs"
on public.memory_usage_logs for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own memory review queue" on public.memory_review_queue;
create policy "Users can view their own memory review queue"
on public.memory_review_queue for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own memory review queue" on public.memory_review_queue;
create policy "Users can insert their own memory review queue"
on public.memory_review_queue for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own memory review queue" on public.memory_review_queue;
create policy "Users can update their own memory review queue"
on public.memory_review_queue for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own memory review queue" on public.memory_review_queue;
create policy "Users can delete their own memory review queue"
on public.memory_review_queue for delete
using (auth.uid() = user_id);

-- Phase 15B validator-required direct user_id indexes.
create index if not exists memory_candidates_user_id_idx on public.memory_candidates(user_id);
create index if not exists memory_items_user_id_idx on public.memory_items(user_id);
create index if not exists memory_links_user_id_idx on public.memory_links(user_id);
create index if not exists memory_events_user_id_idx on public.memory_events(user_id);
create index if not exists memory_preferences_user_id_idx on public.memory_preferences(user_id);
create index if not exists memory_do_not_remember_rules_user_id_idx on public.memory_do_not_remember_rules(user_id);
create index if not exists carnos_entity_state_user_id_idx on public.carnos_entity_state(user_id);
create index if not exists carnos_context_snapshots_user_id_idx on public.carnos_context_snapshots(user_id);
create index if not exists project_memory_state_user_id_idx on public.project_memory_state(user_id);
create index if not exists system_memory_state_user_id_idx on public.system_memory_state(user_id);
create index if not exists knowledge_items_user_id_idx on public.knowledge_items(user_id);
create index if not exists knowledge_tags_user_id_idx on public.knowledge_tags(user_id);
create index if not exists knowledge_links_user_id_idx on public.knowledge_links(user_id);
create index if not exists retrieval_logs_user_id_idx on public.retrieval_logs(user_id);
create index if not exists memory_usage_logs_user_id_idx on public.memory_usage_logs(user_id);
create index if not exists memory_review_queue_user_id_idx on public.memory_review_queue(user_id);
