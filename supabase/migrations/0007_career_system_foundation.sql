-- ascendOS + Carnos
-- Migration 0007: career system foundation

create table if not exists public.resume_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  target_role text,
  target_company text,
  target_domain text,
  file_url text,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'submitted', 'archived')),
  keywords text[] not null default '{}'::text[],
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.networking_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  company text,
  role_title text,
  email text,
  linkedin_url text,
  relationship_type text not null default 'professional'
    check (
      relationship_type in (
        'professional',
        'recruiter',
        'alumni',
        'professor',
        'friend',
        'manager',
        'teammate',
        'mentor',
        'unknown'
      )
    ),
  relationship_strength text not null default 'weak'
    check (relationship_strength in ('weak', 'medium', 'strong', 'champion')),
  status text not null default 'active'
    check (status in ('active', 'follow_up_due', 'paused', 'archived')),
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  company text not null,
  role_title text not null,
  job_url text,
  location text,
  work_mode text not null default 'unknown'
    check (work_mode in ('unknown', 'remote', 'hybrid', 'onsite')),
  employment_type text not null default 'unknown'
    check (
      employment_type in (
        'unknown',
        'full_time',
        'part_time',
        'contract',
        'internship',
        'research',
        'assistantship'
      )
    ),
  sponsorship_status text not null default 'unknown'
    check (sponsorship_status in ('unknown', 'sponsors', 'does_not_sponsor', 'maybe', 'not_needed')),
  source text,
  status text not null default 'saved'
    check (
      status in (
        'saved',
        'preparing',
        'applied',
        'follow_up_due',
        'recruiter_contacted',
        'oa',
        'interviewing',
        'offer',
        'rejected',
        'ghosted',
        'withdrawn',
        'archived'
      )
    ),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  applied_at timestamptz,
  follow_up_at timestamptz,
  deadline_at timestamptz,
  resume_version_id uuid references public.resume_versions(id) on delete set null,
  networking_contact_id uuid references public.networking_contacts(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_application_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_application_id uuid not null references public.job_applications(id) on delete cascade,
  event_type text not null
    check (
      event_type in (
        'saved',
        'prepared',
        'applied',
        'followed_up',
        'recruiter_response',
        'oa_received',
        'oa_completed',
        'interview_scheduled',
        'interview_completed',
        'rejected',
        'offer',
        'ghosted',
        'withdrawn',
        'note'
      )
    ),
  title text not null,
  description text,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.networking_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  networking_contact_id uuid not null references public.networking_contacts(id) on delete cascade,
  job_application_id uuid references public.job_applications(id) on delete set null,
  interaction_type text not null default 'note'
    check (
      interaction_type in (
        'message',
        'email',
        'call',
        'meeting',
        'linkedin',
        'referral_ask',
        'follow_up',
        'thank_you',
        'note'
      )
    ),
  title text not null,
  description text,
  occurred_at timestamptz not null default now(),
  follow_up_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.job_referrals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  networking_contact_id uuid references public.networking_contacts(id) on delete set null,
  job_application_id uuid references public.job_applications(id) on delete cascade,
  status text not null default 'not_requested'
    check (status in ('not_requested', 'planned', 'requested', 'confirmed', 'declined', 'stale', 'archived')),
  requested_at timestamptz,
  confirmed_at timestamptz,
  follow_up_at timestamptz,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resume_bullets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  resume_version_id uuid not null references public.resume_versions(id) on delete cascade,
  bullet_text text not null,
  section text not null default 'experience',
  skill_tags text[] not null default '{}'::text[],
  metric_claim text,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_application_id uuid references public.job_applications(id) on delete set null,
  company text,
  role_title text,
  round_type text not null default 'unknown'
    check (
      round_type in (
        'unknown',
        'recruiter',
        'technical',
        'behavioral',
        'system_design',
        'hiring_manager',
        'onsite',
        'final',
        'oa_review'
      )
    ),
  status text not null default 'scheduled'
    check (status in ('scheduled', 'prep_needed', 'completed', 'cancelled', 'rescheduled', 'archived')),
  scheduled_at timestamptz,
  completed_at timestamptz,
  interviewer_names text[] not null default '{}'::text[],
  prep_notes text,
  performance_notes text,
  follow_up_at timestamptz,
  outcome text not null default 'pending'
    check (outcome in ('pending', 'passed', 'failed', 'offer', 'rejected', 'no_show', 'withdrawn')),
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resume_versions_user_id_idx on public.resume_versions(user_id);
create index if not exists resume_versions_status_idx on public.resume_versions(status);
create index if not exists resume_versions_target_domain_idx on public.resume_versions(target_domain);
create index if not exists resume_versions_created_at_idx on public.resume_versions(created_at desc);
create index if not exists resume_versions_updated_at_idx on public.resume_versions(updated_at desc);

create index if not exists networking_contacts_user_id_idx on public.networking_contacts(user_id);
create index if not exists networking_contacts_company_idx on public.networking_contacts(company);
create index if not exists networking_contacts_status_idx on public.networking_contacts(status);
create index if not exists networking_contacts_relationship_type_idx on public.networking_contacts(relationship_type);
create index if not exists networking_contacts_relationship_strength_idx on public.networking_contacts(relationship_strength);
create index if not exists networking_contacts_next_follow_up_at_idx on public.networking_contacts(next_follow_up_at);
create index if not exists networking_contacts_updated_at_idx on public.networking_contacts(updated_at desc);

create index if not exists job_applications_user_id_idx on public.job_applications(user_id);
create index if not exists job_applications_status_idx on public.job_applications(status);
create index if not exists job_applications_priority_idx on public.job_applications(priority);
create index if not exists job_applications_company_idx on public.job_applications(company);
create index if not exists job_applications_resume_version_id_idx on public.job_applications(resume_version_id);
create index if not exists job_applications_networking_contact_id_idx on public.job_applications(networking_contact_id);
create index if not exists job_applications_goal_id_idx on public.job_applications(goal_id);
create index if not exists job_applications_task_id_idx on public.job_applications(task_id);
create index if not exists job_applications_applied_at_idx on public.job_applications(applied_at desc);
create index if not exists job_applications_follow_up_at_idx on public.job_applications(follow_up_at);
create index if not exists job_applications_deadline_at_idx on public.job_applications(deadline_at);
create index if not exists job_applications_updated_at_idx on public.job_applications(updated_at desc);

create index if not exists job_application_events_user_id_idx on public.job_application_events(user_id);
create index if not exists job_application_events_job_application_id_idx on public.job_application_events(job_application_id);
create index if not exists job_application_events_event_type_idx on public.job_application_events(event_type);
create index if not exists job_application_events_occurred_at_idx on public.job_application_events(occurred_at desc);

create index if not exists networking_interactions_user_id_idx on public.networking_interactions(user_id);
create index if not exists networking_interactions_networking_contact_id_idx on public.networking_interactions(networking_contact_id);
create index if not exists networking_interactions_job_application_id_idx on public.networking_interactions(job_application_id);
create index if not exists networking_interactions_interaction_type_idx on public.networking_interactions(interaction_type);
create index if not exists networking_interactions_occurred_at_idx on public.networking_interactions(occurred_at desc);
create index if not exists networking_interactions_follow_up_at_idx on public.networking_interactions(follow_up_at);

create index if not exists job_referrals_user_id_idx on public.job_referrals(user_id);
create index if not exists job_referrals_networking_contact_id_idx on public.job_referrals(networking_contact_id);
create index if not exists job_referrals_job_application_id_idx on public.job_referrals(job_application_id);
create index if not exists job_referrals_status_idx on public.job_referrals(status);
create index if not exists job_referrals_follow_up_at_idx on public.job_referrals(follow_up_at);
create index if not exists job_referrals_updated_at_idx on public.job_referrals(updated_at desc);

create index if not exists resume_bullets_user_id_idx on public.resume_bullets(user_id);
create index if not exists resume_bullets_resume_version_id_idx on public.resume_bullets(resume_version_id);
create index if not exists resume_bullets_proof_item_id_idx on public.resume_bullets(proof_item_id);
create index if not exists resume_bullets_goal_id_idx on public.resume_bullets(goal_id);
create index if not exists resume_bullets_task_id_idx on public.resume_bullets(task_id);
create index if not exists resume_bullets_updated_at_idx on public.resume_bullets(updated_at desc);

create index if not exists interviews_user_id_idx on public.interviews(user_id);
create index if not exists interviews_job_application_id_idx on public.interviews(job_application_id);
create index if not exists interviews_status_idx on public.interviews(status);
create index if not exists interviews_round_type_idx on public.interviews(round_type);
create index if not exists interviews_outcome_idx on public.interviews(outcome);
create index if not exists interviews_scheduled_at_idx on public.interviews(scheduled_at);
create index if not exists interviews_follow_up_at_idx on public.interviews(follow_up_at);
create index if not exists interviews_updated_at_idx on public.interviews(updated_at desc);

drop trigger if exists set_resume_versions_updated_at on public.resume_versions;
create trigger set_resume_versions_updated_at
before update on public.resume_versions
for each row
execute function public.set_updated_at();

drop trigger if exists set_networking_contacts_updated_at on public.networking_contacts;
create trigger set_networking_contacts_updated_at
before update on public.networking_contacts
for each row
execute function public.set_updated_at();

drop trigger if exists set_job_applications_updated_at on public.job_applications;
create trigger set_job_applications_updated_at
before update on public.job_applications
for each row
execute function public.set_updated_at();

drop trigger if exists set_job_referrals_updated_at on public.job_referrals;
create trigger set_job_referrals_updated_at
before update on public.job_referrals
for each row
execute function public.set_updated_at();

drop trigger if exists set_resume_bullets_updated_at on public.resume_bullets;
create trigger set_resume_bullets_updated_at
before update on public.resume_bullets
for each row
execute function public.set_updated_at();

drop trigger if exists set_interviews_updated_at on public.interviews;
create trigger set_interviews_updated_at
before update on public.interviews
for each row
execute function public.set_updated_at();

alter table public.resume_versions enable row level security;
alter table public.networking_contacts enable row level security;
alter table public.job_applications enable row level security;
alter table public.job_application_events enable row level security;
alter table public.networking_interactions enable row level security;
alter table public.job_referrals enable row level security;
alter table public.resume_bullets enable row level security;
alter table public.interviews enable row level security;

drop policy if exists "Users can view their own resume versions" on public.resume_versions;
create policy "Users can view their own resume versions"
on public.resume_versions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own resume versions" on public.resume_versions;
create policy "Users can insert their own resume versions"
on public.resume_versions
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own resume versions" on public.resume_versions;
create policy "Users can update their own resume versions"
on public.resume_versions
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own resume versions" on public.resume_versions;
create policy "Users can delete their own resume versions"
on public.resume_versions
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own networking contacts" on public.networking_contacts;
create policy "Users can view their own networking contacts"
on public.networking_contacts
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own networking contacts" on public.networking_contacts;
create policy "Users can insert their own networking contacts"
on public.networking_contacts
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own networking contacts" on public.networking_contacts;
create policy "Users can update their own networking contacts"
on public.networking_contacts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own networking contacts" on public.networking_contacts;
create policy "Users can delete their own networking contacts"
on public.networking_contacts
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own job applications" on public.job_applications;
create policy "Users can view their own job applications"
on public.job_applications
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own job applications" on public.job_applications;
create policy "Users can insert their own job applications"
on public.job_applications
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    resume_version_id is null
    or exists (
      select 1
      from public.resume_versions
      where resume_versions.id = job_applications.resume_version_id
        and resume_versions.user_id = auth.uid()
    )
  )
  and (
    networking_contact_id is null
    or exists (
      select 1
      from public.networking_contacts
      where networking_contacts.id = job_applications.networking_contact_id
        and networking_contacts.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = job_applications.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1
      from public.tasks
      where tasks.id = job_applications.task_id
        and tasks.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own job applications" on public.job_applications;
create policy "Users can update their own job applications"
on public.job_applications
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    resume_version_id is null
    or exists (
      select 1
      from public.resume_versions
      where resume_versions.id = job_applications.resume_version_id
        and resume_versions.user_id = auth.uid()
    )
  )
  and (
    networking_contact_id is null
    or exists (
      select 1
      from public.networking_contacts
      where networking_contacts.id = job_applications.networking_contact_id
        and networking_contacts.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = job_applications.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1
      from public.tasks
      where tasks.id = job_applications.task_id
        and tasks.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own job applications" on public.job_applications;
create policy "Users can delete their own job applications"
on public.job_applications
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own job application events" on public.job_application_events;
create policy "Users can view their own job application events"
on public.job_application_events
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own job application events" on public.job_application_events;
create policy "Users can insert their own job application events"
on public.job_application_events
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.job_applications
    where job_applications.id = job_application_events.job_application_id
      and job_applications.user_id = auth.uid()
  )
);

drop policy if exists "Users can update their own job application events" on public.job_application_events;
create policy "Users can update their own job application events"
on public.job_application_events
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.job_applications
    where job_applications.id = job_application_events.job_application_id
      and job_applications.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their own job application events" on public.job_application_events;
create policy "Users can delete their own job application events"
on public.job_application_events
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own networking interactions" on public.networking_interactions;
create policy "Users can view their own networking interactions"
on public.networking_interactions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own networking interactions" on public.networking_interactions;
create policy "Users can insert their own networking interactions"
on public.networking_interactions
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.networking_contacts
    where networking_contacts.id = networking_interactions.networking_contact_id
      and networking_contacts.user_id = auth.uid()
  )
  and (
    job_application_id is null
    or exists (
      select 1
      from public.job_applications
      where job_applications.id = networking_interactions.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own networking interactions" on public.networking_interactions;
create policy "Users can update their own networking interactions"
on public.networking_interactions
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.networking_contacts
    where networking_contacts.id = networking_interactions.networking_contact_id
      and networking_contacts.user_id = auth.uid()
  )
  and (
    job_application_id is null
    or exists (
      select 1
      from public.job_applications
      where job_applications.id = networking_interactions.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own networking interactions" on public.networking_interactions;
create policy "Users can delete their own networking interactions"
on public.networking_interactions
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own job referrals" on public.job_referrals;
create policy "Users can view their own job referrals"
on public.job_referrals
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own job referrals" on public.job_referrals;
create policy "Users can insert their own job referrals"
on public.job_referrals
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    networking_contact_id is null
    or exists (
      select 1
      from public.networking_contacts
      where networking_contacts.id = job_referrals.networking_contact_id
        and networking_contacts.user_id = auth.uid()
    )
  )
  and (
    job_application_id is null
    or exists (
      select 1
      from public.job_applications
      where job_applications.id = job_referrals.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own job referrals" on public.job_referrals;
create policy "Users can update their own job referrals"
on public.job_referrals
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    networking_contact_id is null
    or exists (
      select 1
      from public.networking_contacts
      where networking_contacts.id = job_referrals.networking_contact_id
        and networking_contacts.user_id = auth.uid()
    )
  )
  and (
    job_application_id is null
    or exists (
      select 1
      from public.job_applications
      where job_applications.id = job_referrals.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own job referrals" on public.job_referrals;
create policy "Users can delete their own job referrals"
on public.job_referrals
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own resume bullets" on public.resume_bullets;
create policy "Users can view their own resume bullets"
on public.resume_bullets
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own resume bullets" on public.resume_bullets;
create policy "Users can insert their own resume bullets"
on public.resume_bullets
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.resume_versions
    where resume_versions.id = resume_bullets.resume_version_id
      and resume_versions.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1
      from public.proof_items
      where proof_items.id = resume_bullets.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = resume_bullets.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1
      from public.tasks
      where tasks.id = resume_bullets.task_id
        and tasks.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own resume bullets" on public.resume_bullets;
create policy "Users can update their own resume bullets"
on public.resume_bullets
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.resume_versions
    where resume_versions.id = resume_bullets.resume_version_id
      and resume_versions.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1
      from public.proof_items
      where proof_items.id = resume_bullets.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1
      from public.goals
      where goals.id = resume_bullets.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1
      from public.tasks
      where tasks.id = resume_bullets.task_id
        and tasks.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own resume bullets" on public.resume_bullets;
create policy "Users can delete their own resume bullets"
on public.resume_bullets
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own interviews" on public.interviews;
create policy "Users can view their own interviews"
on public.interviews
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own interviews" on public.interviews;
create policy "Users can insert their own interviews"
on public.interviews
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    job_application_id is null
    or exists (
      select 1
      from public.job_applications
      where job_applications.id = interviews.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own interviews" on public.interviews;
create policy "Users can update their own interviews"
on public.interviews
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    job_application_id is null
    or exists (
      select 1
      from public.job_applications
      where job_applications.id = interviews.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own interviews" on public.interviews;
create policy "Users can delete their own interviews"
on public.interviews
for delete
to authenticated
using (auth.uid() = user_id);
