-- ascendOS + Carnos
-- Migration 0020: Phase 13.5D career prep foundation repair
--
-- Scope:
-- - behavioral_stories
-- - question_bank
-- - mock_interviews
-- - resume_usage
--
-- Boundary:
-- - This migration does not auto-generate stories, answers, resumes, outreach, or interview feedback.
-- - This migration does not send emails, apply to jobs, scrape job posts, run AI calls, or schedule interviews.
-- - All dashboard surfaces remain read-only.

create table if not exists public.behavioral_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  story_type text not null default 'behavioral'
    check (
      story_type in (
        'behavioral',
        'leadership',
        'conflict',
        'failure',
        'teamwork',
        'ownership',
        'technical_depth',
        'impact',
        'research',
        'career_pivot',
        'custom'
      )
    ),
  target_role text,
  target_company text,
  situation text,
  task_context text,
  action_taken text,
  result_outcome text,
  reflection text,
  skill_tags text[] not null default '{}'::text[],
  proof_item_id uuid references public.proof_items(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  resume_bullet_id uuid references public.resume_bullets(id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft', 'ready', 'needs_proof', 'archived')),
  confidence_score integer check (confidence_score is null or (confidence_score >= 0 and confidence_score <= 100)),
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_bank (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question text not null,
  answer_notes text,
  category text not null default 'general'
    check (
      category in (
        'general',
        'behavioral',
        'technical',
        'coding',
        'system_design',
        'ml',
        'data_engineering',
        'research',
        'resume',
        'company',
        'role_specific',
        'custom'
      )
    ),
  difficulty text not null default 'medium'
    check (difficulty in ('easy', 'medium', 'hard', 'expert')),
  target_role text,
  target_company text,
  source text,
  tags text[] not null default '{}'::text[],
  behavioral_story_id uuid references public.behavioral_stories(id) on delete set null,
  resume_bullet_id uuid references public.resume_bullets(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  status text not null default 'active'
    check (status in ('active', 'needs_practice', 'mastered', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mock_interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  interview_id uuid references public.interviews(id) on delete set null,
  job_application_id uuid references public.job_applications(id) on delete set null,
  title text not null,
  interview_type text not null default 'behavioral'
    check (
      interview_type in (
        'behavioral',
        'technical',
        'coding',
        'system_design',
        'ml',
        'data_engineering',
        'research',
        'mixed',
        'custom'
      )
    ),
  status text not null default 'planned'
    check (status in ('planned', 'completed', 'reviewed', 'archived')),
  scheduled_at timestamptz,
  completed_at timestamptz,
  duration_minutes integer check (duration_minutes is null or duration_minutes >= 0),
  question_count integer check (question_count is null or question_count >= 0),
  score integer check (score is null or (score >= 0 and score <= 100)),
  strengths text,
  weaknesses text,
  next_steps text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resume_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  resume_version_id uuid not null references public.resume_versions(id) on delete cascade,
  job_application_id uuid references public.job_applications(id) on delete set null,
  interview_id uuid references public.interviews(id) on delete set null,
  usage_type text not null default 'application'
    check (
      usage_type in (
        'application',
        'referral',
        'interview',
        'networking',
        'career_fair',
        'research',
        'manual',
        'custom'
      )
    ),
  used_at timestamptz not null default now(),
  target_role text,
  target_company text,
  outcome text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists behavioral_stories_user_id_idx on public.behavioral_stories(user_id);
create index if not exists behavioral_stories_story_type_idx on public.behavioral_stories(story_type);
create index if not exists behavioral_stories_status_idx on public.behavioral_stories(status);
create index if not exists behavioral_stories_target_role_idx on public.behavioral_stories(target_role);
create index if not exists behavioral_stories_target_company_idx on public.behavioral_stories(target_company);
create index if not exists behavioral_stories_proof_item_id_idx on public.behavioral_stories(proof_item_id);
create index if not exists behavioral_stories_goal_id_idx on public.behavioral_stories(goal_id);
create index if not exists behavioral_stories_task_id_idx on public.behavioral_stories(task_id);
create index if not exists behavioral_stories_resume_bullet_id_idx on public.behavioral_stories(resume_bullet_id);
create index if not exists behavioral_stories_updated_at_idx on public.behavioral_stories(updated_at desc);

create index if not exists question_bank_user_id_idx on public.question_bank(user_id);
create index if not exists question_bank_category_idx on public.question_bank(category);
create index if not exists question_bank_difficulty_idx on public.question_bank(difficulty);
create index if not exists question_bank_status_idx on public.question_bank(status);
create index if not exists question_bank_target_role_idx on public.question_bank(target_role);
create index if not exists question_bank_target_company_idx on public.question_bank(target_company);
create index if not exists question_bank_behavioral_story_id_idx on public.question_bank(behavioral_story_id);
create index if not exists question_bank_resume_bullet_id_idx on public.question_bank(resume_bullet_id);
create index if not exists question_bank_proof_item_id_idx on public.question_bank(proof_item_id);
create index if not exists question_bank_updated_at_idx on public.question_bank(updated_at desc);

create index if not exists mock_interviews_user_id_idx on public.mock_interviews(user_id);
create index if not exists mock_interviews_interview_id_idx on public.mock_interviews(interview_id);
create index if not exists mock_interviews_job_application_id_idx on public.mock_interviews(job_application_id);
create index if not exists mock_interviews_interview_type_idx on public.mock_interviews(interview_type);
create index if not exists mock_interviews_status_idx on public.mock_interviews(status);
create index if not exists mock_interviews_scheduled_at_idx on public.mock_interviews(scheduled_at);
create index if not exists mock_interviews_completed_at_idx on public.mock_interviews(completed_at desc);
create index if not exists mock_interviews_updated_at_idx on public.mock_interviews(updated_at desc);

create index if not exists resume_usage_user_id_idx on public.resume_usage(user_id);
create index if not exists resume_usage_resume_version_id_idx on public.resume_usage(resume_version_id);
create index if not exists resume_usage_job_application_id_idx on public.resume_usage(job_application_id);
create index if not exists resume_usage_interview_id_idx on public.resume_usage(interview_id);
create index if not exists resume_usage_usage_type_idx on public.resume_usage(usage_type);
create index if not exists resume_usage_used_at_idx on public.resume_usage(used_at desc);

drop trigger if exists set_behavioral_stories_updated_at on public.behavioral_stories;
create trigger set_behavioral_stories_updated_at
before update on public.behavioral_stories
for each row
execute function public.set_updated_at();

drop trigger if exists set_question_bank_updated_at on public.question_bank;
create trigger set_question_bank_updated_at
before update on public.question_bank
for each row
execute function public.set_updated_at();

drop trigger if exists set_mock_interviews_updated_at on public.mock_interviews;
create trigger set_mock_interviews_updated_at
before update on public.mock_interviews
for each row
execute function public.set_updated_at();

alter table public.behavioral_stories enable row level security;
alter table public.question_bank enable row level security;
alter table public.mock_interviews enable row level security;
alter table public.resume_usage enable row level security;

drop policy if exists "Users can view their own behavioral stories" on public.behavioral_stories;
create policy "Users can view their own behavioral stories"
on public.behavioral_stories
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own behavioral stories" on public.behavioral_stories;
create policy "Users can insert their own behavioral stories"
on public.behavioral_stories
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = behavioral_stories.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = behavioral_stories.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = behavioral_stories.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = behavioral_stories.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own behavioral stories" on public.behavioral_stories;
create policy "Users can update their own behavioral stories"
on public.behavioral_stories
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = behavioral_stories.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = behavioral_stories.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = behavioral_stories.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = behavioral_stories.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own behavioral stories" on public.behavioral_stories;
create policy "Users can delete their own behavioral stories"
on public.behavioral_stories
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own question bank" on public.question_bank;
create policy "Users can view their own question bank"
on public.question_bank
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own question bank" on public.question_bank;
create policy "Users can insert their own question bank"
on public.question_bank
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    behavioral_story_id is null
    or exists (
      select 1 from public.behavioral_stories
      where behavioral_stories.id = question_bank.behavioral_story_id
        and behavioral_stories.user_id = auth.uid()
    )
  )
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = question_bank.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = question_bank.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own question bank" on public.question_bank;
create policy "Users can update their own question bank"
on public.question_bank
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    behavioral_story_id is null
    or exists (
      select 1 from public.behavioral_stories
      where behavioral_stories.id = question_bank.behavioral_story_id
        and behavioral_stories.user_id = auth.uid()
    )
  )
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = question_bank.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = question_bank.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own question bank" on public.question_bank;
create policy "Users can delete their own question bank"
on public.question_bank
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own mock interviews" on public.mock_interviews;
create policy "Users can view their own mock interviews"
on public.mock_interviews
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own mock interviews" on public.mock_interviews;
create policy "Users can insert their own mock interviews"
on public.mock_interviews
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    interview_id is null
    or exists (
      select 1 from public.interviews
      where interviews.id = mock_interviews.interview_id
        and interviews.user_id = auth.uid()
    )
  )
  and (
    job_application_id is null
    or exists (
      select 1 from public.job_applications
      where job_applications.id = mock_interviews.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own mock interviews" on public.mock_interviews;
create policy "Users can update their own mock interviews"
on public.mock_interviews
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    interview_id is null
    or exists (
      select 1 from public.interviews
      where interviews.id = mock_interviews.interview_id
        and interviews.user_id = auth.uid()
    )
  )
  and (
    job_application_id is null
    or exists (
      select 1 from public.job_applications
      where job_applications.id = mock_interviews.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own mock interviews" on public.mock_interviews;
create policy "Users can delete their own mock interviews"
on public.mock_interviews
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can view their own resume usage" on public.resume_usage;
create policy "Users can view their own resume usage"
on public.resume_usage
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own resume usage" on public.resume_usage;
create policy "Users can insert their own resume usage"
on public.resume_usage
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.resume_versions
    where resume_versions.id = resume_usage.resume_version_id
      and resume_versions.user_id = auth.uid()
  )
  and (
    job_application_id is null
    or exists (
      select 1 from public.job_applications
      where job_applications.id = resume_usage.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
  and (
    interview_id is null
    or exists (
      select 1 from public.interviews
      where interviews.id = resume_usage.interview_id
        and interviews.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own resume usage" on public.resume_usage;
create policy "Users can update their own resume usage"
on public.resume_usage
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.resume_versions
    where resume_versions.id = resume_usage.resume_version_id
      and resume_versions.user_id = auth.uid()
  )
  and (
    job_application_id is null
    or exists (
      select 1 from public.job_applications
      where job_applications.id = resume_usage.job_application_id
        and job_applications.user_id = auth.uid()
    )
  )
  and (
    interview_id is null
    or exists (
      select 1 from public.interviews
      where interviews.id = resume_usage.interview_id
        and interviews.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their own resume usage" on public.resume_usage;
create policy "Users can delete their own resume usage"
on public.resume_usage
for delete
to authenticated
using (auth.uid() = user_id);
