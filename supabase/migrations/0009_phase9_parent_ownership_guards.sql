-- ascendOS + Carnos
-- Migration 0009: phase 9 parent ownership guards

-- This migration hardens Phase 9 child-row write policies.
-- It ensures nullable parent links either remain null or point to records owned by auth.uid().
-- It does not add new tables.

drop policy if exists "Users can insert their own skill paths" on public.skill_paths;
create policy "Users can insert their own skill paths"
on public.skill_paths for insert
with check (
  auth.uid() = user_id
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = skill_paths.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = skill_paths.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = skill_paths.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own skill paths" on public.skill_paths;
create policy "Users can update their own skill paths"
on public.skill_paths for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = skill_paths.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = skill_paths.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = skill_paths.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own skills" on public.skills;
create policy "Users can insert their own skills"
on public.skills for insert
with check (
  auth.uid() = user_id
  and (
    skill_path_id is null
    or exists (
      select 1 from public.skill_paths
      where skill_paths.id = skills.skill_path_id
        and skill_paths.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = skills.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = skills.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = skills.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = skills.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own skills" on public.skills;
create policy "Users can update their own skills"
on public.skills for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    skill_path_id is null
    or exists (
      select 1 from public.skill_paths
      where skill_paths.id = skills.skill_path_id
        and skill_paths.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = skills.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = skills.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = skills.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = skills.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own skill prerequisites" on public.skill_prerequisites;
create policy "Users can insert their own skill prerequisites"
on public.skill_prerequisites for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.skills
    where skills.id = skill_prerequisites.skill_id
      and skills.user_id = auth.uid()
  )
  and exists (
    select 1 from public.skills
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
    select 1 from public.skills
    where skills.id = skill_prerequisites.skill_id
      and skills.user_id = auth.uid()
  )
  and exists (
    select 1 from public.skills
    where skills.id = skill_prerequisites.prerequisite_skill_id
      and skills.user_id = auth.uid()
  )
);

drop policy if exists "Users can insert their own learning sessions" on public.learning_sessions;
create policy "Users can insert their own learning sessions"
on public.learning_sessions for insert
with check (
  auth.uid() = user_id
  and (
    skill_path_id is null
    or exists (
      select 1 from public.skill_paths
      where skill_paths.id = learning_sessions.skill_path_id
        and skill_paths.user_id = auth.uid()
    )
  )
  and (
    skill_id is null
    or exists (
      select 1 from public.skills
      where skills.id = learning_sessions.skill_id
        and skills.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = learning_sessions.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = learning_sessions.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = learning_sessions.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    daily_log_id is null
    or exists (
      select 1 from public.daily_logs
      where daily_logs.id = learning_sessions.daily_log_id
        and daily_logs.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = learning_sessions.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = learning_sessions.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own learning sessions" on public.learning_sessions;
create policy "Users can update their own learning sessions"
on public.learning_sessions for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    skill_path_id is null
    or exists (
      select 1 from public.skill_paths
      where skill_paths.id = learning_sessions.skill_path_id
        and skill_paths.user_id = auth.uid()
    )
  )
  and (
    skill_id is null
    or exists (
      select 1 from public.skills
      where skills.id = learning_sessions.skill_id
        and skills.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = learning_sessions.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = learning_sessions.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = learning_sessions.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    daily_log_id is null
    or exists (
      select 1 from public.daily_logs
      where daily_logs.id = learning_sessions.daily_log_id
        and daily_logs.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = learning_sessions.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = learning_sessions.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own quizzes" on public.quizzes;
create policy "Users can insert their own quizzes"
on public.quizzes for insert
with check (
  auth.uid() = user_id
  and (
    skill_path_id is null
    or exists (
      select 1 from public.skill_paths
      where skill_paths.id = quizzes.skill_path_id
        and skill_paths.user_id = auth.uid()
    )
  )
  and (
    skill_id is null
    or exists (
      select 1 from public.skills
      where skills.id = quizzes.skill_id
        and skills.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own quizzes" on public.quizzes;
create policy "Users can update their own quizzes"
on public.quizzes for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    skill_path_id is null
    or exists (
      select 1 from public.skill_paths
      where skill_paths.id = quizzes.skill_path_id
        and skill_paths.user_id = auth.uid()
    )
  )
  and (
    skill_id is null
    or exists (
      select 1 from public.skills
      where skills.id = quizzes.skill_id
        and skills.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own projects" on public.projects;
create policy "Users can insert their own projects"
on public.projects for insert
with check (
  auth.uid() = user_id
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = projects.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = projects.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = projects.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = projects.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = projects.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = projects.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own projects" on public.projects;
create policy "Users can update their own projects"
on public.projects for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = projects.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = projects.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = projects.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = projects.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = projects.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = projects.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own quiz attempts" on public.quiz_attempts;
create policy "Users can insert their own quiz attempts"
on public.quiz_attempts for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.quizzes
    where quizzes.id = quiz_attempts.quiz_id
      and quizzes.user_id = auth.uid()
  )
  and (
    learning_session_id is null
    or exists (
      select 1 from public.learning_sessions
      where learning_sessions.id = quiz_attempts.learning_session_id
        and learning_sessions.user_id = auth.uid()
    )
  )
  and (
    skill_id is null
    or exists (
      select 1 from public.skills
      where skills.id = quiz_attempts.skill_id
        and skills.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = quiz_attempts.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = quiz_attempts.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = quiz_attempts.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own quiz attempts" on public.quiz_attempts;
create policy "Users can update their own quiz attempts"
on public.quiz_attempts for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.quizzes
    where quizzes.id = quiz_attempts.quiz_id
      and quizzes.user_id = auth.uid()
  )
  and (
    learning_session_id is null
    or exists (
      select 1 from public.learning_sessions
      where learning_sessions.id = quiz_attempts.learning_session_id
        and learning_sessions.user_id = auth.uid()
    )
  )
  and (
    skill_id is null
    or exists (
      select 1 from public.skills
      where skills.id = quiz_attempts.skill_id
        and skills.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = quiz_attempts.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = quiz_attempts.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = quiz_attempts.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own project milestones" on public.project_milestones;
create policy "Users can insert their own project milestones"
on public.project_milestones for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = project_milestones.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_milestones.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own project milestones" on public.project_milestones;
create policy "Users can update their own project milestones"
on public.project_milestones for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = project_milestones.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_milestones.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own project bugs" on public.project_bugs;
create policy "Users can insert their own project bugs"
on public.project_bugs for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_bugs.project_id
      and projects.user_id = auth.uid()
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = project_bugs.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_bugs.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own project bugs" on public.project_bugs;
create policy "Users can update their own project bugs"
on public.project_bugs for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_bugs.project_id
      and projects.user_id = auth.uid()
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = project_bugs.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_bugs.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own project tests" on public.project_tests;
create policy "Users can insert their own project tests"
on public.project_tests for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_tests.project_id
      and projects.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_tests.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own project tests" on public.project_tests;
create policy "Users can update their own project tests"
on public.project_tests for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_tests.project_id
      and projects.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_tests.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own project releases" on public.project_releases;
create policy "Users can insert their own project releases"
on public.project_releases for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_releases.project_id
      and projects.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_releases.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = project_releases.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own project releases" on public.project_releases;
create policy "Users can update their own project releases"
on public.project_releases for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_releases.project_id
      and projects.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_releases.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    resume_bullet_id is null
    or exists (
      select 1 from public.resume_bullets
      where resume_bullets.id = project_releases.resume_bullet_id
        and resume_bullets.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own project links" on public.project_links;
create policy "Users can insert their own project links"
on public.project_links for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_links.project_id
      and projects.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_links.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own project links" on public.project_links;
create policy "Users can update their own project links"
on public.project_links for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.projects
    where projects.id = project_links.project_id
      and projects.user_id = auth.uid()
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = project_links.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can insert their own skill progress" on public.skill_progress;
create policy "Users can insert their own skill progress"
on public.skill_progress for insert
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.skills
    where skills.id = skill_progress.skill_id
      and skills.user_id = auth.uid()
  )
  and (
    learning_session_id is null
    or exists (
      select 1 from public.learning_sessions
      where learning_sessions.id = skill_progress.learning_session_id
        and learning_sessions.user_id = auth.uid()
    )
  )
  and (
    quiz_attempt_id is null
    or exists (
      select 1 from public.quiz_attempts
      where quiz_attempts.id = skill_progress.quiz_attempt_id
        and quiz_attempts.user_id = auth.uid()
    )
  )
  and (
    project_id is null
    or exists (
      select 1 from public.projects
      where projects.id = skill_progress.project_id
        and projects.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = skill_progress.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = skill_progress.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = skill_progress.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = skill_progress.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = skill_progress.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their own skill progress" on public.skill_progress;
create policy "Users can update their own skill progress"
on public.skill_progress for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.skills
    where skills.id = skill_progress.skill_id
      and skills.user_id = auth.uid()
  )
  and (
    learning_session_id is null
    or exists (
      select 1 from public.learning_sessions
      where learning_sessions.id = skill_progress.learning_session_id
        and learning_sessions.user_id = auth.uid()
    )
  )
  and (
    quiz_attempt_id is null
    or exists (
      select 1 from public.quiz_attempts
      where quiz_attempts.id = skill_progress.quiz_attempt_id
        and quiz_attempts.user_id = auth.uid()
    )
  )
  and (
    project_id is null
    or exists (
      select 1 from public.projects
      where projects.id = skill_progress.project_id
        and projects.user_id = auth.uid()
    )
  )
  and (
    proof_item_id is null
    or exists (
      select 1 from public.proof_items
      where proof_items.id = skill_progress.proof_item_id
        and proof_items.user_id = auth.uid()
    )
  )
  and (
    task_id is null
    or exists (
      select 1 from public.tasks
      where tasks.id = skill_progress.task_id
        and tasks.user_id = auth.uid()
    )
  )
  and (
    goal_id is null
    or exists (
      select 1 from public.goals
      where goals.id = skill_progress.goal_id
        and goals.user_id = auth.uid()
    )
  )
  and (
    source_ai_action_id is null
    or exists (
      select 1 from public.ai_actions
      where ai_actions.id = skill_progress.source_ai_action_id
        and ai_actions.user_id = auth.uid()
    )
  )
  and (
    source_chat_message_id is null
    or exists (
      select 1 from public.chat_messages
      where chat_messages.id = skill_progress.source_chat_message_id
        and chat_messages.user_id = auth.uid()
    )
  )
);
