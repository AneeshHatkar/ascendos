-- ascendOS + Carnos
-- Migration 0008: learning project system foundation

create table if not exists public.skill_paths (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text,
  description text,
  domain text,
  status text not null default 'active'
    check (status in ('planned', 'active', 'paused', 'completed', 'archived')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  target_level text,
  current_level text,
  started_at timestamptz,
  target_date date,
  completed_at timestamptz,
  goal_id uuid references public.goals(id) on delete set null,
  career_target text,
  research_target text,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_path_id uuid references public.skill_paths(id) on delete cascade,
  title text not null,
  slug text,
  description text,
  category text,
  status text not null default 'not_started'
    check (status in ('not_started', 'learning', 'practicing', 'proving', 'mastered', 'stale', 'archived')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  difficulty text not null default 'medium'
    check (difficulty in ('low', 'medium', 'high', 'expert')),
  target_level text,
  current_level text,
  mastery_score numeric(5,2),
  confidence_score numeric(5,2),
  proof_required boolean not null default true,
  interview_relevance text,
  project_relevance text,
  research_relevance text,
  goal_id uuid references public.goals(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, skill_path_id, slug)
);

create table if not exists public.skill_prerequisites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete cascade,
  prerequisite_skill_id uuid not null references public.skills(id) on delete cascade,
  relationship_type text not null default 'requires'
    check (relationship_type in ('requires', 'recommended', 'blocks', 'supports')),
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (skill_id, prerequisite_skill_id),
  check (skill_id <> prerequisite_skill_id)
);

create table if not exists public.learning_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_path_id uuid references public.skill_paths(id) on delete set null,
  skill_id uuid references public.skills(id) on delete set null,
  title text not null,
  session_type text not null default 'study'
    check (session_type in ('study', 'practice', 'build', 'review', 'quiz', 'interview_prep', 'research')),
  status text not null default 'planned'
    check (status in ('planned', 'active', 'completed', 'cancelled', 'archived')),
  started_at timestamptz,
  ended_at timestamptz,
  duration_minutes integer,
  focus_score numeric(5,2),
  difficulty text
    check (difficulty is null or difficulty in ('low', 'medium', 'high', 'expert')),
  notes text,
  summary text,
  next_step text,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  daily_log_id uuid references public.daily_logs(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_path_id uuid references public.skill_paths(id) on delete set null,
  skill_id uuid references public.skills(id) on delete set null,
  title text not null,
  description text,
  quiz_type text not null default 'concept_check'
    check (quiz_type in ('concept_check', 'coding', 'interview', 'project_review', 'research_review', 'mixed')),
  status text not null default 'active'
    check (status in ('draft', 'active', 'paused', 'archived')),
  difficulty text not null default 'medium'
    check (difficulty in ('low', 'medium', 'high', 'expert')),
  question_count integer,
  passing_score numeric(5,2),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text,
  description text,
  project_type text not null default 'portfolio'
    check (project_type in ('portfolio', 'learning', 'research', 'career', 'personal_system', 'coursework', 'experiment')),
  status text not null default 'planned'
    check (status in ('planned', 'active', 'blocked', 'shipping', 'shipped', 'paused', 'archived')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  stage text,
  problem_statement text,
  target_user text,
  tech_stack text[] not null default '{}'::text[],
  github_url text,
  demo_url text,
  readme_url text,
  portfolio_url text,
  resume_bullet_id uuid references public.resume_bullets(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  started_at timestamptz,
  target_date date,
  completed_at timestamptz,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  learning_session_id uuid references public.learning_sessions(id) on delete set null,
  skill_id uuid references public.skills(id) on delete set null,
  status text not null default 'completed'
    check (status in ('completed', 'abandoned', 'needs_review', 'archived')),
  score numeric(5,2),
  max_score numeric(5,2),
  passed boolean,
  attempted_at timestamptz not null default now(),
  duration_minutes integer,
  mistake_summary text,
  strength_summary text,
  next_review_at timestamptz,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'planned'
    check (status in ('planned', 'active', 'blocked', 'completed', 'cancelled', 'archived')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'critical')),
  due_date date,
  completed_at timestamptz,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_bugs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'open'
    check (status in ('open', 'investigating', 'fixed', 'wont_fix', 'closed', 'archived')),
  severity text not null default 'medium'
    check (severity in ('low', 'medium', 'high', 'critical')),
  source text,
  reproduction_steps text,
  root_cause text,
  fix_summary text,
  opened_at timestamptz not null default now(),
  resolved_at timestamptz,
  task_id uuid references public.tasks(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  test_type text not null default 'manual'
    check (test_type in ('manual', 'unit', 'integration', 'e2e', 'lint', 'typecheck', 'build', 'audit', 'smoke')),
  status text not null default 'pending'
    check (status in ('pending', 'passed', 'failed', 'skipped', 'archived')),
  command text,
  expected_result text,
  actual_result text,
  passed boolean,
  run_at timestamptz,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_releases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  version text,
  title text not null,
  description text,
  status text not null default 'planned'
    check (status in ('planned', 'draft', 'released', 'archived')),
  released_at timestamptz,
  github_tag_url text,
  demo_url text,
  release_notes_url text,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  resume_bullet_id uuid references public.resume_bullets(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  url text not null,
  link_type text not null default 'reference'
    check (link_type in ('github', 'demo', 'readme', 'portfolio', 'paper', 'video', 'documentation', 'reference', 'proof')),
  description text,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skill_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete cascade,
  status text not null
    check (status in ('not_started', 'learning', 'practicing', 'proving', 'mastered', 'stale', 'archived')),
  previous_status text
    check (previous_status is null or previous_status in ('not_started', 'learning', 'practicing', 'proving', 'mastered', 'stale', 'archived')),
  mastery_score numeric(5,2),
  confidence_score numeric(5,2),
  delta_summary text,
  evidence_summary text,
  learning_session_id uuid references public.learning_sessions(id) on delete set null,
  quiz_attempt_id uuid references public.quiz_attempts(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  proof_item_id uuid references public.proof_items(id) on delete set null,
  task_id uuid references public.tasks(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  recorded_at timestamptz not null default now(),
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists skill_paths_user_id_idx on public.skill_paths(user_id);
create index if not exists skill_paths_status_idx on public.skill_paths(status);
create index if not exists skill_paths_priority_idx on public.skill_paths(priority);
create index if not exists skill_paths_goal_id_idx on public.skill_paths(goal_id);
create index if not exists skill_paths_created_at_idx on public.skill_paths(created_at desc);
create index if not exists skill_paths_updated_at_idx on public.skill_paths(updated_at desc);

create index if not exists skills_user_id_idx on public.skills(user_id);
create index if not exists skills_skill_path_id_idx on public.skills(skill_path_id);
create index if not exists skills_status_idx on public.skills(status);
create index if not exists skills_category_idx on public.skills(category);
create index if not exists skills_goal_id_idx on public.skills(goal_id);
create index if not exists skills_proof_item_id_idx on public.skills(proof_item_id);
create index if not exists skills_updated_at_idx on public.skills(updated_at desc);

create index if not exists skill_prerequisites_user_id_idx on public.skill_prerequisites(user_id);
create index if not exists skill_prerequisites_skill_id_idx on public.skill_prerequisites(skill_id);
create index if not exists skill_prerequisites_prerequisite_skill_id_idx on public.skill_prerequisites(prerequisite_skill_id);

create index if not exists learning_sessions_user_id_idx on public.learning_sessions(user_id);
create index if not exists learning_sessions_status_idx on public.learning_sessions(status);
create index if not exists learning_sessions_skill_path_id_idx on public.learning_sessions(skill_path_id);
create index if not exists learning_sessions_skill_id_idx on public.learning_sessions(skill_id);
create index if not exists learning_sessions_started_at_idx on public.learning_sessions(started_at desc);
create index if not exists learning_sessions_goal_id_idx on public.learning_sessions(goal_id);
create index if not exists learning_sessions_task_id_idx on public.learning_sessions(task_id);
create index if not exists learning_sessions_proof_item_id_idx on public.learning_sessions(proof_item_id);

create index if not exists quizzes_user_id_idx on public.quizzes(user_id);
create index if not exists quizzes_skill_path_id_idx on public.quizzes(skill_path_id);
create index if not exists quizzes_skill_id_idx on public.quizzes(skill_id);
create index if not exists quizzes_status_idx on public.quizzes(status);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_status_idx on public.projects(status);
create index if not exists projects_priority_idx on public.projects(priority);
create index if not exists projects_goal_id_idx on public.projects(goal_id);
create index if not exists projects_task_id_idx on public.projects(task_id);
create index if not exists projects_proof_item_id_idx on public.projects(proof_item_id);
create index if not exists projects_resume_bullet_id_idx on public.projects(resume_bullet_id);
create index if not exists projects_updated_at_idx on public.projects(updated_at desc);

create index if not exists quiz_attempts_user_id_idx on public.quiz_attempts(user_id);
create index if not exists quiz_attempts_quiz_id_idx on public.quiz_attempts(quiz_id);
create index if not exists quiz_attempts_skill_id_idx on public.quiz_attempts(skill_id);
create index if not exists quiz_attempts_attempted_at_idx on public.quiz_attempts(attempted_at desc);
create index if not exists quiz_attempts_proof_item_id_idx on public.quiz_attempts(proof_item_id);

create index if not exists project_milestones_user_id_idx on public.project_milestones(user_id);
create index if not exists project_milestones_project_id_idx on public.project_milestones(project_id);
create index if not exists project_milestones_status_idx on public.project_milestones(status);
create index if not exists project_milestones_due_date_idx on public.project_milestones(due_date);
create index if not exists project_milestones_task_id_idx on public.project_milestones(task_id);
create index if not exists project_milestones_proof_item_id_idx on public.project_milestones(proof_item_id);

create index if not exists project_bugs_user_id_idx on public.project_bugs(user_id);
create index if not exists project_bugs_project_id_idx on public.project_bugs(project_id);
create index if not exists project_bugs_status_idx on public.project_bugs(status);
create index if not exists project_bugs_severity_idx on public.project_bugs(severity);
create index if not exists project_bugs_task_id_idx on public.project_bugs(task_id);
create index if not exists project_bugs_proof_item_id_idx on public.project_bugs(proof_item_id);

create index if not exists project_tests_user_id_idx on public.project_tests(user_id);
create index if not exists project_tests_project_id_idx on public.project_tests(project_id);
create index if not exists project_tests_status_idx on public.project_tests(status);
create index if not exists project_tests_run_at_idx on public.project_tests(run_at desc);
create index if not exists project_tests_proof_item_id_idx on public.project_tests(proof_item_id);

create index if not exists project_releases_user_id_idx on public.project_releases(user_id);
create index if not exists project_releases_project_id_idx on public.project_releases(project_id);
create index if not exists project_releases_status_idx on public.project_releases(status);
create index if not exists project_releases_released_at_idx on public.project_releases(released_at desc);
create index if not exists project_releases_proof_item_id_idx on public.project_releases(proof_item_id);
create index if not exists project_releases_resume_bullet_id_idx on public.project_releases(resume_bullet_id);

create index if not exists project_links_user_id_idx on public.project_links(user_id);
create index if not exists project_links_project_id_idx on public.project_links(project_id);
create index if not exists project_links_link_type_idx on public.project_links(link_type);
create index if not exists project_links_proof_item_id_idx on public.project_links(proof_item_id);

create index if not exists skill_progress_user_id_idx on public.skill_progress(user_id);
create index if not exists skill_progress_skill_id_idx on public.skill_progress(skill_id);
create index if not exists skill_progress_recorded_at_idx on public.skill_progress(recorded_at desc);
create index if not exists skill_progress_learning_session_id_idx on public.skill_progress(learning_session_id);
create index if not exists skill_progress_quiz_attempt_id_idx on public.skill_progress(quiz_attempt_id);
create index if not exists skill_progress_project_id_idx on public.skill_progress(project_id);
create index if not exists skill_progress_proof_item_id_idx on public.skill_progress(proof_item_id);
create index if not exists skill_progress_task_id_idx on public.skill_progress(task_id);
create index if not exists skill_progress_goal_id_idx on public.skill_progress(goal_id);

alter table public.skill_paths enable row level security;
alter table public.skills enable row level security;
alter table public.skill_prerequisites enable row level security;
alter table public.learning_sessions enable row level security;
alter table public.quizzes enable row level security;
alter table public.projects enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.project_milestones enable row level security;
alter table public.project_bugs enable row level security;
alter table public.project_tests enable row level security;
alter table public.project_releases enable row level security;
alter table public.project_links enable row level security;
alter table public.skill_progress enable row level security;

drop policy if exists "Users can view their own skill paths" on public.skill_paths;
create policy "Users can view their own skill paths"
on public.skill_paths for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own skill paths" on public.skill_paths;
create policy "Users can insert their own skill paths"
on public.skill_paths for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own skill paths" on public.skill_paths;
create policy "Users can update their own skill paths"
on public.skill_paths for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own skill paths" on public.skill_paths;
create policy "Users can delete their own skill paths"
on public.skill_paths for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own skills" on public.skills;
create policy "Users can view their own skills"
on public.skills for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own skills" on public.skills;
create policy "Users can insert their own skills"
on public.skills for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own skills" on public.skills;
create policy "Users can update their own skills"
on public.skills for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own skills" on public.skills;
create policy "Users can delete their own skills"
on public.skills for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own skill prerequisites" on public.skill_prerequisites;
create policy "Users can view their own skill prerequisites"
on public.skill_prerequisites for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own skill prerequisites" on public.skill_prerequisites;
create policy "Users can insert their own skill prerequisites"
on public.skill_prerequisites for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.skills
    where skills.id = skill_prerequisites.skill_id
      and skills.user_id = auth.uid()
  )
  and exists (
    select 1
    from public.skills
    where skills.id = skill_prerequisites.prerequisite_skill_id
      and skills.user_id = auth.uid()
  )
);

drop policy if exists "Users can update their own skill prerequisites" on public.skill_prerequisites;
create policy "Users can update their own skill prerequisites"
on public.skill_prerequisites for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.skills
    where skills.id = skill_prerequisites.skill_id
      and skills.user_id = auth.uid()
  )
  and exists (
    select 1
    from public.skills
    where skills.id = skill_prerequisites.prerequisite_skill_id
      and skills.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their own skill prerequisites" on public.skill_prerequisites;
create policy "Users can delete their own skill prerequisites"
on public.skill_prerequisites for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own learning sessions" on public.learning_sessions;
create policy "Users can view their own learning sessions"
on public.learning_sessions for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own learning sessions" on public.learning_sessions;
create policy "Users can insert their own learning sessions"
on public.learning_sessions for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own learning sessions" on public.learning_sessions;
create policy "Users can update their own learning sessions"
on public.learning_sessions for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own learning sessions" on public.learning_sessions;
create policy "Users can delete their own learning sessions"
on public.learning_sessions for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own quizzes" on public.quizzes;
create policy "Users can view their own quizzes"
on public.quizzes for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own quizzes" on public.quizzes;
create policy "Users can insert their own quizzes"
on public.quizzes for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own quizzes" on public.quizzes;
create policy "Users can update their own quizzes"
on public.quizzes for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own quizzes" on public.quizzes;
create policy "Users can delete their own quizzes"
on public.quizzes for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own projects" on public.projects;
create policy "Users can view their own projects"
on public.projects for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own projects" on public.projects;
create policy "Users can insert their own projects"
on public.projects for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own projects" on public.projects;
create policy "Users can update their own projects"
on public.projects for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own projects" on public.projects;
create policy "Users can delete their own projects"
on public.projects for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own quiz attempts" on public.quiz_attempts;
create policy "Users can view their own quiz attempts"
on public.quiz_attempts for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own quiz attempts" on public.quiz_attempts;
create policy "Users can insert their own quiz attempts"
on public.quiz_attempts for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own quiz attempts" on public.quiz_attempts;
create policy "Users can update their own quiz attempts"
on public.quiz_attempts for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own quiz attempts" on public.quiz_attempts;
create policy "Users can delete their own quiz attempts"
on public.quiz_attempts for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own project milestones" on public.project_milestones;
create policy "Users can view their own project milestones"
on public.project_milestones for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own project milestones" on public.project_milestones;
create policy "Users can insert their own project milestones"
on public.project_milestones for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own project milestones" on public.project_milestones;
create policy "Users can update their own project milestones"
on public.project_milestones for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own project milestones" on public.project_milestones;
create policy "Users can delete their own project milestones"
on public.project_milestones for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own project bugs" on public.project_bugs;
create policy "Users can view their own project bugs"
on public.project_bugs for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own project bugs" on public.project_bugs;
create policy "Users can insert their own project bugs"
on public.project_bugs for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own project bugs" on public.project_bugs;
create policy "Users can update their own project bugs"
on public.project_bugs for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own project bugs" on public.project_bugs;
create policy "Users can delete their own project bugs"
on public.project_bugs for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own project tests" on public.project_tests;
create policy "Users can view their own project tests"
on public.project_tests for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own project tests" on public.project_tests;
create policy "Users can insert their own project tests"
on public.project_tests for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own project tests" on public.project_tests;
create policy "Users can update their own project tests"
on public.project_tests for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own project tests" on public.project_tests;
create policy "Users can delete their own project tests"
on public.project_tests for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own project releases" on public.project_releases;
create policy "Users can view their own project releases"
on public.project_releases for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own project releases" on public.project_releases;
create policy "Users can insert their own project releases"
on public.project_releases for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own project releases" on public.project_releases;
create policy "Users can update their own project releases"
on public.project_releases for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own project releases" on public.project_releases;
create policy "Users can delete their own project releases"
on public.project_releases for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own project links" on public.project_links;
create policy "Users can view their own project links"
on public.project_links for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own project links" on public.project_links;
create policy "Users can insert their own project links"
on public.project_links for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own project links" on public.project_links;
create policy "Users can update their own project links"
on public.project_links for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own project links" on public.project_links;
create policy "Users can delete their own project links"
on public.project_links for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view their own skill progress" on public.skill_progress;
create policy "Users can view their own skill progress"
on public.skill_progress for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own skill progress" on public.skill_progress;
create policy "Users can insert their own skill progress"
on public.skill_progress for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own skill progress" on public.skill_progress;
create policy "Users can update their own skill progress"
on public.skill_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own skill progress" on public.skill_progress;
create policy "Users can delete their own skill progress"
on public.skill_progress for delete
using (auth.uid() = user_id);
