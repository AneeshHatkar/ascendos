# Phase 8.3 — Career SQL Schema Design

Status: Complete.

## Purpose

Design the additive Career System SQL foundation before creating the Phase 8.4 migration.

This is a design-only step. It does not create or modify database tables.

## Phase 8 SQL principles

Career SQL must be:

- additive only
- user-owned
- RLS-protected
- indexed for dashboard reads
- source-linked where possible
- compatible with Phase 6 proposed actions
- compatible with Phase 7 dashboard summaries
- non-destructive to Phases 1–7

Do not modify old migrations unless a validation issue requires a compatibility patch.

## Tables to add in Phase 8.4

The Phase 8.4 migration should add these tables:

1. `job_applications`
2. `job_application_events`
3. `networking_contacts`
4. `networking_interactions`
5. `job_referrals`
6. `resume_versions`
7. `resume_bullets`
8. `interviews`

## Table: job_applications

Purpose:
Tracks each job/application target.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `company text not null`
- `role_title text not null`
- `job_url text`
- `location text`
- `work_mode text not null default 'unknown'`
- `employment_type text not null default 'unknown'`
- `sponsorship_status text not null default 'unknown'`
- `source text`
- `status text not null default 'saved'`
- `priority text not null default 'medium'`
- `applied_at timestamptz`
- `follow_up_at timestamptz`
- `deadline_at timestamptz`
- `resume_version_id uuid`
- `networking_contact_id uuid`
- `referral_id uuid`
- `goal_id uuid references public.goals(id) on delete set null`
- `task_id uuid references public.tasks(id) on delete set null`
- `notes text`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended status values:

- `saved`
- `preparing`
- `applied`
- `follow_up_due`
- `recruiter_contacted`
- `oa`
- `interviewing`
- `offer`
- `rejected`
- `ghosted`
- `withdrawn`
- `archived`

Recommended work mode values:

- `unknown`
- `remote`
- `hybrid`
- `onsite`

Recommended employment type values:

- `unknown`
- `full_time`
- `part_time`
- `contract`
- `internship`
- `research`
- `assistantship`

Recommended sponsorship status values:

- `unknown`
- `sponsors`
- `does_not_sponsor`
- `maybe`
- `not_needed`

Recommended priority values:

- `low`
- `medium`
- `high`
- `critical`

## Table: job_application_events

Purpose:
Stores lifecycle history for each application.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `job_application_id uuid not null references public.job_applications(id) on delete cascade`
- `event_type text not null`
- `title text not null`
- `description text`
- `occurred_at timestamptz not null default now()`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`

Recommended event types:

- `saved`
- `prepared`
- `applied`
- `followed_up`
- `recruiter_response`
- `oa_received`
- `oa_completed`
- `interview_scheduled`
- `interview_completed`
- `rejected`
- `offer`
- `ghosted`
- `withdrawn`
- `note`

## Table: networking_contacts

Purpose:
Stores people and professional relationships.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `full_name text not null`
- `company text`
- `role_title text`
- `email text`
- `linkedin_url text`
- `relationship_type text not null default 'professional'`
- `relationship_strength text not null default 'weak'`
- `status text not null default 'active'`
- `last_contacted_at timestamptz`
- `next_follow_up_at timestamptz`
- `notes text`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended relationship types:

- `professional`
- `recruiter`
- `alumni`
- `professor`
- `friend`
- `manager`
- `teammate`
- `mentor`
- `unknown`

Recommended relationship strength values:

- `weak`
- `medium`
- `strong`
- `champion`

Recommended status values:

- `active`
- `follow_up_due`
- `paused`
- `archived`

## Table: networking_interactions

Purpose:
Stores every conversation, message, referral ask, follow-up, or networking event.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `networking_contact_id uuid not null references public.networking_contacts(id) on delete cascade`
- `job_application_id uuid references public.job_applications(id) on delete set null`
- `interaction_type text not null default 'note'`
- `title text not null`
- `description text`
- `occurred_at timestamptz not null default now()`
- `follow_up_at timestamptz`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`

Recommended interaction types:

- `message`
- `email`
- `call`
- `meeting`
- `linkedin`
- `referral_ask`
- `follow_up`
- `thank_you`
- `note`

## Table: job_referrals

Purpose:
Tracks referral asks and referral status.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `networking_contact_id uuid references public.networking_contacts(id) on delete set null`
- `job_application_id uuid references public.job_applications(id) on delete cascade`
- `status text not null default 'not_requested'`
- `requested_at timestamptz`
- `confirmed_at timestamptz`
- `follow_up_at timestamptz`
- `notes text`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended status values:

- `not_requested`
- `planned`
- `requested`
- `confirmed`
- `declined`
- `stale`
- `archived`

## Table: resume_versions

Purpose:
Stores resume versions and role/company targeting.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `name text not null`
- `target_role text`
- `target_company text`
- `target_domain text`
- `file_url text`
- `status text not null default 'draft'`
- `keywords text[] not null default '{}'::text[]`
- `notes text`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended status values:

- `draft`
- `active`
- `submitted`
- `archived`

## Table: resume_bullets

Purpose:
Stores resume bullets, claims, metrics, and evidence links.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `resume_version_id uuid not null references public.resume_versions(id) on delete cascade`
- `bullet_text text not null`
- `section text not null default 'experience'`
- `skill_tags text[] not null default '{}'::text[]`
- `metric_claim text`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `goal_id uuid references public.goals(id) on delete set null`
- `task_id uuid references public.tasks(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended section values are flexible text initially, because resume structures vary.

## Table: interviews

Purpose:
Tracks interview rounds, prep, performance notes, and outcomes.

Recommended columns:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `job_application_id uuid references public.job_applications(id) on delete set null`
- `company text`
- `role_title text`
- `round_type text not null default 'unknown'`
- `status text not null default 'scheduled'`
- `scheduled_at timestamptz`
- `completed_at timestamptz`
- `interviewer_names text[] not null default '{}'::text[]`
- `prep_notes text`
- `performance_notes text`
- `follow_up_at timestamptz`
- `outcome text not null default 'pending'`
- `metadata jsonb not null default '{}'::jsonb`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended round types:

- `unknown`
- `recruiter`
- `technical`
- `behavioral`
- `system_design`
- `hiring_manager`
- `onsite`
- `final`
- `oa_review`

Recommended status values:

- `scheduled`
- `prep_needed`
- `completed`
- `cancelled`
- `rescheduled`
- `archived`

Recommended outcome values:

- `pending`
- `passed`
- `failed`
- `offer`
- `rejected`
- `no_show`
- `withdrawn`

## Relationships and deferred foreign keys

Because `job_applications` references `resume_versions`, `networking_contacts`, and `job_referrals`, Phase 8.4 should either:

1. create the main tables first, then add circular foreign-key constraints with `alter table`; or
2. avoid circular FK from `job_applications.referral_id` and rely on `job_referrals.job_application_id`.

Recommended safer approach:
- `job_referrals.job_application_id` references `job_applications(id)`.
- `job_applications` may reference `resume_versions` and `networking_contacts`.
- Avoid `job_applications.referral_id` initially to prevent circular dependency.

## RLS policy pattern

Every career table must enable RLS.

Every career table should include:

- select own rows
- insert own rows
- update own rows
- delete own rows

Every policy should enforce:

`auth.uid() = user_id`

For child tables, policies should also ensure related parent rows belong to the same user where needed.

## Index plan

Add indexes for:

- every `user_id`
- every foreign key
- every `status`
- every priority field
- every follow-up/deadline/scheduled timestamp
- key dashboard ordering timestamps:
  - `created_at desc`
  - `updated_at desc`
  - `applied_at desc`
  - `occurred_at desc`
  - `scheduled_at`
  - `next_follow_up_at`
  - `follow_up_at`

## Updated-at triggers

Tables with `updated_at` should use the existing `public.set_updated_at()` trigger.

Recommended trigger tables:

- `job_applications`
- `networking_contacts`
- `job_referrals`
- `resume_versions`
- `resume_bullets`
- `interviews`

`job_application_events` and `networking_interactions` do not need `updated_at` initially unless editing history becomes required.

## Phase 8.4 migration name

Recommended migration file:

`supabase/migrations/0007_career_system_foundation.sql`

## Phase 8.4 validation requirements

The migration must pass:

- `npm run validate:migrations`
- `npm run audit:phase4`
- `npm run check`
- `node scripts/audit-phase-1-7-crosswalk.mjs`

## Explicit exclusions

Do not add in Phase 8.4:

- direct dashboard writes
- Carnos autonomous application execution
- job scraping
- email automation
- memory/RAG
- Python/ML worker execution
- internet tools
- voice
- background jobs
- service-role client code

## Verdict

The Career SQL schema design is ready.

Next step: Phase 8.4 additive career SQL migration.
