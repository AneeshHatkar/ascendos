# Phase 9 — Learning / Project System Schema Design

Status: Schema design for Phase 9 Chunk B.

Phase: 9 — Learning / Project System

Chunk: B

Covers:
- 9.4 Learning/project schema design
- 9.5 Source-to-scope traceability matrix

## Design Date

2026-06-24

## Source files inspected

- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`
- `docs/phase-plans/PHASE_9_LEARNING_PROJECT_SYSTEM.md`
- `docs/phase-reports/PHASE_9_CHUNK_A_SOURCE_ROUTE_INSPECTION.md`
- existing migrations `0001` through `0007`
- `src/types/database.ts`
- `src/lib/repositories/core-read.ts`

## Existing schema patterns to preserve

Phase 9 must follow the existing schema rules already used by the project:

- tables are in `public`
- user-owned tables include `user_id uuid not null references public.profiles(id) on delete cascade`
- user-owned tables get `user_id` indexes
- important entity tables use `created_at` and `updated_at`
- domain records may link to goals, tasks, proof items, daily logs, timeline/events, AI actions, and chat messages when relevant
- RLS must be enabled
- policies must use `auth.uid() = user_id`
- cross-table policies must check the related parent record belongs to the same user
- generated database types must align exactly with SQL
- read helpers must filter by `.eq("user_id", userId)`

## Next migration

The next migration should be:

`supabase/migrations/0008_learning_project_system_foundation.sql`

## Phase 9 schema goals

Phase 9 must create a SQL-backed foundation for:

- Learning Academy
- Skill paths
- Skills
- Skill prerequisites
- Skill progress
- Learning sessions
- Quizzes
- Quiz attempts
- Project Builder
- Project milestones
- Project tasks or task linkage
- Project bugs
- Project tests
- Project releases
- Project links
- README/portfolio/resume proof linkage
- Goal/task/proof/timeline linkage
- Knowledge alignment without full RAG

## Proposed tables

The Phase 9 migration should create these tables:

1. `skill_paths`
2. `skills`
3. `skill_prerequisites`
4. `skill_progress`
5. `learning_sessions`
6. `quizzes`
7. `quiz_attempts`
8. `projects`
9. `project_milestones`
10. `project_bugs`
11. `project_tests`
12. `project_releases`
13. `project_links`

This set is broad enough for Phase 9 while avoiding later-phase systems like memory/RAG, internet tools, voice, and autonomous Carnos execution.

## Table design

### `skill_paths`

Purpose:

Represents a learning path or curriculum lane.

Examples:

- Machine Learning Engineer path
- Data Engineering path
- Algorithms path
- System Design path
- Research path
- Interview prep path

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `title text not null`
- `slug text`
- `description text`
- `domain text`
- `status text not null default 'active'`
- `priority text not null default 'medium'`
- `target_level text`
- `current_level text`
- `started_at timestamptz`
- `target_date date`
- `completed_at timestamptz`
- `goal_id uuid references public.goals(id) on delete set null`
- `career_target text`
- `research_target text`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(user_id, status)`
- `(user_id, priority)`
- `(goal_id)`

Recommended uniqueness:

- optional unique `(user_id, slug)` if slug is present

### `skills`

Purpose:

Represents an individual skill inside a skill path.

Examples:

- SQL window functions
- PyTorch training loop
- Feature engineering
- RAG evaluation
- Data pipeline orchestration
- System design fundamentals

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `skill_path_id uuid references public.skill_paths(id) on delete cascade`
- `title text not null`
- `slug text`
- `description text`
- `category text`
- `status text not null default 'not_started'`
- `priority text not null default 'medium'`
- `difficulty text not null default 'medium'`
- `target_level text`
- `current_level text`
- `mastery_score numeric(5,2)`
- `confidence_score numeric(5,2)`
- `proof_required boolean not null default true`
- `interview_relevance text`
- `project_relevance text`
- `research_relevance text`
- `goal_id uuid references public.goals(id) on delete set null`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(skill_path_id)`
- `(user_id, status)`
- `(user_id, category)`
- `(goal_id)`
- `(proof_item_id)`

Recommended uniqueness:

- optional unique `(user_id, skill_path_id, slug)` if slug is present

### `skill_prerequisites`

Purpose:

Represents prerequisite relationships between skills.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `skill_id uuid not null references public.skills(id) on delete cascade`
- `prerequisite_skill_id uuid not null references public.skills(id) on delete cascade`
- `relationship_type text not null default 'requires'`
- `notes text`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(skill_id)`
- `(prerequisite_skill_id)`

Recommended uniqueness:

- unique `(skill_id, prerequisite_skill_id)`

Safety:

- policies must ensure both skills belong to the same user

### `skill_progress`

Purpose:

Tracks progress updates against a skill over time.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `skill_id uuid not null references public.skills(id) on delete cascade`
- `status text not null`
- `previous_status text`
- `mastery_score numeric(5,2)`
- `confidence_score numeric(5,2)`
- `delta_summary text`
- `evidence_summary text`
- `learning_session_id uuid`
- `quiz_attempt_id uuid`
- `project_id uuid`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `task_id uuid references public.tasks(id) on delete set null`
- `goal_id uuid references public.goals(id) on delete set null`
- `recorded_at timestamptz not null default now()`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`

Note:

The `learning_session_id`, `quiz_attempt_id`, and `project_id` foreign keys should be added directly if migration ordering supports the tables being created earlier or by placing `skill_progress` after dependent tables. If ordering becomes complicated, keep nullable IDs and add FK constraints after all tables are created.

Recommended indexes:

- `(user_id)`
- `(skill_id)`
- `(recorded_at desc)`
- `(proof_item_id)`
- `(task_id)`
- `(goal_id)`

### `learning_sessions`

Purpose:

Represents a focused study/practice session.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `skill_path_id uuid references public.skill_paths(id) on delete set null`
- `skill_id uuid references public.skills(id) on delete set null`
- `title text not null`
- `session_type text not null default 'study'`
- `status text not null default 'planned'`
- `started_at timestamptz`
- `ended_at timestamptz`
- `duration_minutes integer`
- `focus_score numeric(5,2)`
- `difficulty text`
- `notes text`
- `summary text`
- `next_step text`
- `goal_id uuid references public.goals(id) on delete set null`
- `task_id uuid references public.tasks(id) on delete set null`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `daily_log_id uuid references public.daily_logs(id) on delete set null`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(user_id, status)`
- `(skill_path_id)`
- `(skill_id)`
- `(started_at desc)`
- `(goal_id)`
- `(task_id)`
- `(proof_item_id)`

### `quizzes`

Purpose:

Represents a quiz/checkpoint for one or more skills.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `skill_path_id uuid references public.skill_paths(id) on delete set null`
- `skill_id uuid references public.skills(id) on delete set null`
- `title text not null`
- `description text`
- `quiz_type text not null default 'concept_check'`
- `status text not null default 'active'`
- `difficulty text not null default 'medium'`
- `question_count integer`
- `passing_score numeric(5,2)`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(skill_path_id)`
- `(skill_id)`
- `(user_id, status)`

Question storage decision:

For Phase 9 foundation, quiz questions may be stored in `metadata` as JSON to avoid overbuilding a full quiz engine too early. A future phase can normalize quiz questions if needed.

### `quiz_attempts`

Purpose:

Represents an attempt at a quiz.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `quiz_id uuid not null references public.quizzes(id) on delete cascade`
- `learning_session_id uuid references public.learning_sessions(id) on delete set null`
- `skill_id uuid references public.skills(id) on delete set null`
- `status text not null default 'completed'`
- `score numeric(5,2)`
- `max_score numeric(5,2)`
- `passed boolean`
- `attempted_at timestamptz not null default now()`
- `duration_minutes integer`
- `mistake_summary text`
- `strength_summary text`
- `next_review_at timestamptz`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(quiz_id)`
- `(skill_id)`
- `(attempted_at desc)`
- `(proof_item_id)`

### `projects`

Purpose:

Represents a buildable project used as proof of skill, career readiness, portfolio evidence, research readiness, or personal system development.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `title text not null`
- `slug text`
- `description text`
- `project_type text not null default 'portfolio'`
- `status text not null default 'planned'`
- `priority text not null default 'medium'`
- `stage text`
- `problem_statement text`
- `target_user text`
- `tech_stack text[] not null default '{}'::text[]`
- `github_url text`
- `demo_url text`
- `readme_url text`
- `portfolio_url text`
- `resume_bullet_id uuid references public.resume_bullets(id) on delete set null`
- `goal_id uuid references public.goals(id) on delete set null`
- `task_id uuid references public.tasks(id) on delete set null`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `started_at timestamptz`
- `target_date date`
- `completed_at timestamptz`
- `source_ai_action_id uuid references public.ai_actions(id) on delete set null`
- `source_chat_message_id uuid references public.chat_messages(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(user_id, status)`
- `(user_id, priority)`
- `(goal_id)`
- `(task_id)`
- `(proof_item_id)`
- `(resume_bullet_id)`

Recommended uniqueness:

- optional unique `(user_id, slug)` if slug is present

### `project_milestones`

Purpose:

Represents meaningful delivery checkpoints for a project.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `project_id uuid not null references public.projects(id) on delete cascade`
- `title text not null`
- `description text`
- `status text not null default 'planned'`
- `priority text not null default 'medium'`
- `due_date date`
- `completed_at timestamptz`
- `task_id uuid references public.tasks(id) on delete set null`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(project_id)`
- `(user_id, status)`
- `(due_date)`
- `(task_id)`
- `(proof_item_id)`

### `project_bugs`

Purpose:

Tracks project bugs, blockers, and unresolved issues.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `project_id uuid not null references public.projects(id) on delete cascade`
- `title text not null`
- `description text`
- `status text not null default 'open'`
- `severity text not null default 'medium'`
- `source text`
- `reproduction_steps text`
- `root_cause text`
- `fix_summary text`
- `opened_at timestamptz not null default now()`
- `resolved_at timestamptz`
- `task_id uuid references public.tasks(id) on delete set null`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(project_id)`
- `(user_id, status)`
- `(severity)`
- `(task_id)`
- `(proof_item_id)`

### `project_tests`

Purpose:

Tracks tests, QA checks, validations, and evidence that a project works.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `project_id uuid not null references public.projects(id) on delete cascade`
- `title text not null`
- `test_type text not null default 'manual'`
- `status text not null default 'pending'`
- `command text`
- `expected_result text`
- `actual_result text`
- `passed boolean`
- `run_at timestamptz`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(project_id)`
- `(user_id, status)`
- `(run_at desc)`
- `(proof_item_id)`

### `project_releases`

Purpose:

Tracks project releases, shipped versions, demos, deploys, or portfolio-ready checkpoints.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `project_id uuid not null references public.projects(id) on delete cascade`
- `version text`
- `title text not null`
- `description text`
- `status text not null default 'planned'`
- `released_at timestamptz`
- `github_tag_url text`
- `demo_url text`
- `release_notes_url text`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `resume_bullet_id uuid references public.resume_bullets(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(project_id)`
- `(user_id, status)`
- `(released_at desc)`
- `(proof_item_id)`
- `(resume_bullet_id)`

### `project_links`

Purpose:

Tracks useful project URLs and proof references.

Expected fields:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references public.profiles(id) on delete cascade`
- `project_id uuid not null references public.projects(id) on delete cascade`
- `label text not null`
- `url text not null`
- `link_type text not null default 'reference'`
- `description text`
- `proof_item_id uuid references public.proof_items(id) on delete set null`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes:

- `(user_id)`
- `(project_id)`
- `(link_type)`
- `(proof_item_id)`

## Cross-domain links

Phase 9 tables should connect to existing core systems:

### Goals

Learning paths, skills, sessions, and projects may link to `goals`.

### Tasks

Learning sessions, project records, milestones, and bugs may link to `tasks`.

### Proof items

Skills, sessions, quiz attempts, projects, milestones, tests, releases, and links may link to `proof_items`.

### Daily logs

Learning sessions may link to `daily_logs`.

### Resume bullets

Projects and releases may link to `resume_bullets`.

### AI actions

Records may link to `ai_actions` as source proposals.

### Chat messages

Records may link to `chat_messages` as origin context.

## Knowledge alignment

Phase 9 should not implement full RAG.

For Phase 9, `/knowledge` alignment should be limited to:

- showing how learning/project records will later feed Knowledge Vault
- linking project lessons and learning notes conceptually
- avoiding embeddings/semantic search until the correct phase

No `knowledge_items` table is required in Phase 9 unless source inspection later proves it is required before memory/RAG.

## RLS policy pattern

Each new user-owned table should use:

- enable row level security
- select policy using `auth.uid() = user_id`
- insert policy with check `auth.uid() = user_id`
- update policy using and with check `auth.uid() = user_id`
- delete policy using `auth.uid() = user_id`

For child tables referencing parent rows, policies should additionally ensure the parent row belongs to the authenticated user when appropriate.

## Status values

Use text fields for flexible v1 status values rather than strict database enums.

Recommended statuses:

### Learning

- `planned`
- `active`
- `paused`
- `completed`
- `archived`

### Skill

- `not_started`
- `learning`
- `practicing`
- `proving`
- `mastered`
- `stale`

### Session

- `planned`
- `active`
- `completed`
- `cancelled`

### Quiz attempt

- `completed`
- `abandoned`
- `needs_review`

### Project

- `planned`
- `active`
- `blocked`
- `shipping`
- `shipped`
- `archived`

### Bugs

- `open`
- `investigating`
- `fixed`
- `wont_fix`
- `closed`

### Tests

- `pending`
- `passed`
- `failed`
- `skipped`

### Releases

- `planned`
- `draft`
- `released`
- `archived`

## Phase 9 non-goals

Do not add:

- embeddings
- vector tables
- semantic search
- internet search
- voice
- autonomous AI execution
- GitHub API sync
- automatic resume rewriting
- background workers
- Python/ML SQL writes

## Migration validation expectations

The migration should be considered valid only if:

- file number is `0008`
- table names are consistent
- all user-owned tables include `user_id`
- RLS is enabled on all new tables
- policies exist for select/insert/update/delete where appropriate
- indexes exist for `user_id` and common dashboard filters
- foreign keys match existing table names
- no service-role assumption is introduced
- migration validation passes
- generated TypeScript types can represent every new table

## Open design decisions for Chunk C

Chunk C must decide:

1. Whether quiz questions remain JSON in `quizzes.metadata` for v1.
2. Whether `skill_progress` directly references later-created tables using post-create constraints.
3. Whether project tasks are separate records or linked to existing `tasks`.
4. Whether `project_links` is enough for README/portfolio proof in Phase 9.
5. Whether `/knowledge` remains route-alignment only until the memory/RAG phase.

Recommended decisions:

1. Keep quiz questions in `metadata` for Phase 9.
2. Create all tables first, then add constraints if needed.
3. Reuse existing `tasks` via nullable `task_id`; do not create duplicate project task table yet.
4. Use `project_links`, `proof_items`, and `resume_bullet_id` for proof.
5. Keep `/knowledge` alignment lightweight; do not implement full RAG.

