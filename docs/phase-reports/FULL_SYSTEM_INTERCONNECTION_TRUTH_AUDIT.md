# Full System Interconnection Truth Audit

## Status

Generated-only audit. Do not treat this as a completion claim. This report is meant to reveal integration gaps before Phase 21.

## Executive Summary

- Total files scanned: 2447
- Source files scanned: 313
- App pages: 37
- API routes: 8
- Components: 110
- Dashboard components: 73
- Repository files: 14
- Dashboard helper files: 15
- Supabase migrations: 28
- Tables discovered: 118
- Package audit scripts: 167
- Phases/chunks detected from artifacts: 379

## Critical Findings

- Weak non-auth pages with no direct/delegated data wiring signal: 0
- Delegated pages that need component-level verification: 31
- Suspicious/static/deferred pages: 10
- Pages without clear empty/error/loading signals: 16
- Repository files without direct Supabase signal: 1
- Tables without any source reference: 1
- Tables without real repository Supabase usage: 18
- Tables without write/action/API write signal: 31
- Spotify runtime/token files: 0
- Phase-level suspicious mappings: 70


## Route/Page Runtime Classification

### src/app/analytics/page.tsx
- Route: /analytics
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: yes
- Table refs: none

### src/app/auth/login/page.tsx
- Route: /auth/login
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: no
- Dashboard component import signal: no
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: none

### src/app/auth/signup/page.tsx
- Route: /auth/signup
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: no
- Dashboard component import signal: no
- Write/action signal: no
- Carnos signal: yes
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: none

### src/app/body/page.tsx
- Route: /body
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: supplements

### src/app/calendar/page.tsx
- Route: /calendar
- Auth/user signal: yes
- Direct Supabase signal: yes
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: events, tasks

### src/app/career/page.tsx
- Route: /career
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: goals, interviews, tasks

### src/app/carnos/page.tsx
- Route: /carnos
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: yes
- Memory signal: yes
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: yes
- Table refs: documents

### src/app/command/page.tsx
- Route: /command
- Auth/user signal: yes
- Direct Supabase signal: yes
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: goals, tasks

### src/app/creativity/page.tsx
- Route: /creativity
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: no
- Table refs: none

### src/app/custom-trackers/page.tsx
- Route: /custom-trackers
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: no
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: none

### src/app/decisions/page.tsx
- Route: /decisions
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: no
- Table refs: none

### src/app/documents/page.tsx
- Route: /documents
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: none

### src/app/emotion/page.tsx
- Route: /emotion
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: none

### src/app/experiments/page.tsx
- Route: /experiments
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: no
- Table refs: none

### src/app/finance/page.tsx
- Route: /finance
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: subscriptions

### src/app/future-simulator/page.tsx
- Route: /future-simulator
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: no
- Table refs: none

### src/app/goals/page.tsx
- Route: /goals
- Auth/user signal: yes
- Direct Supabase signal: yes
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: goals

### src/app/grimoire/page.tsx
- Route: /grimoire
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: none

### src/app/hair-skincare/page.tsx
- Route: /hair-skincare
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: routines

### src/app/housing/page.tsx
- Route: /housing
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: documents

### src/app/interviews/page.tsx
- Route: /interviews
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: interviews

### src/app/knowledge/page.tsx
- Route: /knowledge
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: yes
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: yes
- Table refs: projects, skills

### src/app/learning/page.tsx
- Route: /learning
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: quizzes, skills

### src/app/life-admin/page.tsx
- Route: /life-admin
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: documents, reminders, subscriptions

### src/app/networking/page.tsx
- Route: /networking
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: none

### src/app/nutrition/page.tsx
- Route: /nutrition
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: none

### src/app/page.tsx
- Route:
- Auth/user signal: no
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: yes
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: goals

### src/app/privacy/page.tsx
- Route: /privacy
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: yes
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: yes
- Table refs: none

### src/app/projects/page.tsx
- Route: /projects
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: yes
- Table refs: projects

### src/app/research-lab/page.tsx
- Route: /research-lab
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: yes
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: none

### src/app/research-stanford/page.tsx
- Route: /research-stanford
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: yes
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: none

### src/app/resume/page.tsx
- Route: /resume
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: goals, tasks

### src/app/settings/page.tsx
- Route: /settings
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: yes
- Memory signal: yes
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: yes
- Empty/error/loading signal: yes
- Table refs: none

### src/app/sleep-energy/page.tsx
- Route: /sleep-energy
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: routines

### src/app/supplements/page.tsx
- Route: /supplements
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: no
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: no
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: no
- Table refs: products

### src/app/timeline/page.tsx
- Route: /timeline
- Auth/user signal: yes
- Direct Supabase signal: yes
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: events

### src/app/world-class/page.tsx
- Route: /world-class
- Auth/user signal: yes
- Direct Supabase signal: no
- Repository import signal: yes
- Dashboard helper import signal: yes
- Dashboard component import signal: yes
- Write/action signal: no
- Carnos signal: no
- Memory signal: no
- Metrics signal: yes
- Placeholder/deferred/mock/boundary signal: no
- Empty/error/loading signal: yes
- Table refs: proof_items


## Weak Non-Auth Pages

None detected.

## Delegated Pages Requiring Component-Level Verification

- src/app/analytics/page.tsx
- src/app/body/page.tsx
- src/app/career/page.tsx
- src/app/carnos/page.tsx
- src/app/creativity/page.tsx
- src/app/custom-trackers/page.tsx
- src/app/decisions/page.tsx
- src/app/documents/page.tsx
- src/app/emotion/page.tsx
- src/app/experiments/page.tsx
- src/app/finance/page.tsx
- src/app/future-simulator/page.tsx
- src/app/grimoire/page.tsx
- src/app/hair-skincare/page.tsx
- src/app/housing/page.tsx
- src/app/interviews/page.tsx
- src/app/knowledge/page.tsx
- src/app/learning/page.tsx
- src/app/life-admin/page.tsx
- src/app/networking/page.tsx
- src/app/nutrition/page.tsx
- src/app/page.tsx
- src/app/privacy/page.tsx
- src/app/projects/page.tsx
- src/app/research-lab/page.tsx
- src/app/research-stanford/page.tsx
- src/app/resume/page.tsx
- src/app/settings/page.tsx
- src/app/sleep-energy/page.tsx
- src/app/supplements/page.tsx
- src/app/world-class/page.tsx

## Suspicious Static / Deferred / Placeholder Pages

- src/app/analytics/page.tsx
- src/app/carnos/page.tsx
- src/app/creativity/page.tsx
- src/app/decisions/page.tsx
- src/app/experiments/page.tsx
- src/app/future-simulator/page.tsx
- src/app/knowledge/page.tsx
- src/app/privacy/page.tsx
- src/app/projects/page.tsx
- src/app/settings/page.tsx

## Pages Without Clear Empty/Error/Loading Signals

- src/app/command/page.tsx
- src/app/creativity/page.tsx
- src/app/custom-trackers/page.tsx
- src/app/decisions/page.tsx
- src/app/documents/page.tsx
- src/app/emotion/page.tsx
- src/app/experiments/page.tsx
- src/app/finance/page.tsx
- src/app/future-simulator/page.tsx
- src/app/hair-skincare/page.tsx
- src/app/housing/page.tsx
- src/app/life-admin/page.tsx
- src/app/nutrition/page.tsx
- src/app/page.tsx
- src/app/sleep-energy/page.tsx
- src/app/supplements/page.tsx

## Repository Runtime Classification

### src/lib/repositories/admin-finance-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: budget_categories, documents, financial_accounts, financial_logs, housing_contacts, housing_options, subscriptions

### src/lib/repositories/approved-memory-write.ts
- Direct Supabase signal: yes
- Write signal: yes
- Action/audit signal: no
- Table refs: carnos_entity_state, events, memory_candidates, memory_events, memory_items

### src/lib/repositories/calendar-routine-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: calendar_blocks, reminders, routine_steps, routines

### src/lib/repositories/career-prep-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: behavioral_stories, mock_interviews, question_bank, resume_usage

### src/lib/repositories/carnos-persona-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: chat_messages, chat_sessions, persona_prompt_versions

### src/lib/repositories/core-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: yes
- Table refs: ai_actions, audit_logs, chat_messages, chat_sessions, daily_logs, events, goal_milestones, goals, interviews, job_application_events, job_applications, job_referrals, learning_sessions, networking_contacts, networking_interactions, project_bugs, project_links, project_milestones, project_releases, project_tests, projects, proof_items, quiz_attempts, quizzes, resume_bullets, resume_versions, skill_paths, skill_prerequisites, skill_progress, skills, tasks

### src/lib/repositories/current-info-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: web_search_queries, web_source_audit_events, web_source_candidates, web_source_links, web_sources

### src/lib/repositories/grimoire-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: grimoire_corruption_checks, grimoire_daily_logs, grimoire_modes, grimoire_reversions, grimoire_skills

### src/lib/repositories/health-body-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: body_logs, emotion_logs, energy_logs, exercises, haircare_logs, journal_entries, meal_items, mental_health_logs, nutrition_logs, products, skincare_logs, sleep_logs, supplement_logs, supplements, workout_sets, workouts

### src/lib/repositories/index.ts
- Direct Supabase signal: no
- Write signal: no
- Action/audit signal: no
- Table refs: none

### src/lib/repositories/memory-inbox-write.ts
- Direct Supabase signal: yes
- Write signal: yes
- Action/audit signal: no
- Table refs: carnos_entity_state, memory_candidates, memory_items

### src/lib/repositories/research-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: phd_application_assets, phd_readiness_assessments, recommendation_targets, research_citations, research_claims, research_experiments, research_feedback, research_ideas, research_literature_items, research_paper_versions, research_papers, research_questions, research_results, research_submissions, research_venues, sop_versions, target_labs, target_professors, target_universities

### src/lib/repositories/settings-privacy-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: app_settings, privacy_settings

### src/lib/repositories/voice-read.ts
- Direct Supabase signal: yes
- Write signal: no
- Action/audit signal: no
- Table refs: voice_sessions, voice_transcripts


## Repository Files Without Direct Supabase Signal

- src/lib/repositories/index.ts

## Dashboard Helper Classification

### src/lib/dashboard/admin-finance-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: budget_categories, documents, financial_accounts, financial_logs, housing_contacts, housing_options, subscriptions

### src/lib/dashboard/auth.ts
- Direct Supabase signal: yes
- Repository import signal: no
- Table refs: none

### src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: calendar_blocks, events, reminders, routine_steps, routines

### src/lib/dashboard/career-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: interviews

### src/lib/dashboard/career-prep-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: behavioral_stories, mock_interviews, question_bank, resume_usage

### src/lib/dashboard/current-info-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: none

### src/lib/dashboard/dashboard-card-registry.ts
- Direct Supabase signal: no
- Repository import signal: no
- Table refs: ai_actions, audit_logs, chat_messages, chat_sessions, daily_logs, events, goals, grimoire_daily_logs, grimoire_modes, interviews, job_application_events, job_applications, job_referrals, learning_sessions, networking_contacts, networking_interactions, phd_application_assets, phd_readiness_assessments, project_bugs, project_links, project_milestones, project_releases, project_tests, projects, proof_items, quiz_attempts, quizzes, recommendation_targets, research_citations, research_claims, research_experiments, research_ideas, research_literature_items, research_papers, research_questions, research_results, resume_bullets, resume_versions, skill_paths, skill_progress, skills, sop_versions, target_labs, target_professors, target_universities, tasks

### src/lib/dashboard/dashboard-data-helpers.ts
- Direct Supabase signal: yes
- Repository import signal: no
- Table refs: ai_actions, events, goals, proof_items, tasks

### src/lib/dashboard/dashboard-layout-contract.ts
- Direct Supabase signal: no
- Repository import signal: no
- Table refs: goals, interviews, projects

### src/lib/dashboard/grimoire-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: daily_logs, grimoire_corruption_checks, grimoire_daily_logs, grimoire_modes, grimoire_reversions, grimoire_skills, skills, tasks

### src/lib/dashboard/health-body-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: body_logs, emotion_logs, energy_logs, exercises, haircare_logs, journal_entries, meal_items, mental_health_logs, nutrition_logs, products, skincare_logs, sleep_logs, supplement_logs, supplements, workout_sets, workouts

### src/lib/dashboard/index.ts
- Direct Supabase signal: no
- Repository import signal: no
- Table refs: none

### src/lib/dashboard/learning-project-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: projects, quizzes, skills

### src/lib/dashboard/research-stanford-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: none

### src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts
- Direct Supabase signal: no
- Repository import signal: yes
- Table refs: app_settings, privacy_settings


## API Route Classification

### src/app/api/actions/[actionId]/approve/route.ts
- Direct Supabase signal: yes
- Write/action signal: no
- Carnos signal: no
- Table refs: none

### src/app/api/actions/[actionId]/reject/route.ts
- Direct Supabase signal: yes
- Write/action signal: no
- Carnos signal: no
- Table refs: none

### src/app/api/ai/extract/route.ts
- Direct Supabase signal: no
- Write/action signal: yes
- Carnos signal: no
- Table refs: none

### src/app/api/calendar/proposals/route.ts
- Direct Supabase signal: yes
- Write/action signal: yes
- Carnos signal: no
- Table refs: projects, tasks

### src/app/api/carnos/messages/route.ts
- Direct Supabase signal: yes
- Write/action signal: yes
- Carnos signal: yes
- Table refs: chat_messages, chat_sessions

### src/app/api/goals/proposals/route.ts
- Direct Supabase signal: yes
- Write/action signal: yes
- Carnos signal: no
- Table refs: goals, projects

### src/app/api/voice/speak/route.ts
- Direct Supabase signal: no
- Write/action signal: no
- Carnos signal: no
- Table refs: none

### src/app/api/voice/transcribe/route.ts
- Direct Supabase signal: no
- Write/action signal: no
- Carnos signal: no
- Table refs: none


## Schema / Table Coverage

### ai_actions
- Migration files: supabase/migrations/0002_audit_and_ai_actions.sql, supabase/migrations/0003_chat_foundation.sql
- Any source refs: src/components/actions/pending-updates-drawer.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/action-lifecycle.ts, src/lib/actions/create-proposed-action.ts, src/lib/actions/execution-dispatcher.ts, src/lib/actions/flows/create-daily-log-flow.ts, src/lib/actions/flows/create-goal-flow.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/actions/flows/create-task-flow.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/components/actions/pending-updates-drawer.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/action-lifecycle.ts, src/lib/actions/create-proposed-action.ts, src/lib/actions/execution-dispatcher.ts, src/lib/actions/flows/create-daily-log-flow.ts, src/lib/actions/flows/create-goal-flow.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/actions/flows/create-task-flow.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### app_settings
- Migration files: supabase/migrations/0021_phase13_5e_settings_privacy_foundation.sql
- Any source refs: src/components/dashboard/settings-privacy-foundation-panel.tsx, src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts, src/lib/repositories/settings-privacy-read.ts
- Real repository refs: src/lib/repositories/settings-privacy-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### audit_logs
- Migration files: supabase/migrations/0002_audit_and_ai_actions.sql
- Any source refs: src/lib/audit/write-audit-log.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/audit/write-audit-log.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### behavioral_stories
- Migration files: supabase/migrations/0020_phase13_5d_career_prep_foundation.sql
- Any source refs: src/components/dashboard/career-prep-foundation-panel.tsx, src/lib/dashboard/career-prep-dashboard-data-helpers.ts, src/lib/repositories/career-prep-read.ts
- Real repository refs: src/lib/repositories/career-prep-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### body_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### budget_categories
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/components/dashboard/command-dashboard-v1.tsx, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/repositories/admin-finance-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### calendar_blocks
- Migration files: supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql
- Any source refs: src/components/dashboard/calendar-dashboard-v1.tsx, src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts, src/lib/repositories/calendar-routine-read.ts
- Real repository refs: src/lib/repositories/calendar-routine-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### carnos_context_snapshots
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/lib/carnos-continuity/cross-domain-integration-preview.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### carnos_entity_state
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/lib/carnos-continuity/carnos-entity-state.ts, src/lib/carnos-continuity/carnos-memory-visibility.ts, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/current-context-pack-builder.ts, src/lib/carnos-continuity/memory-conflict-rules.ts, src/lib/carnos-continuity/memory-contracts.ts, src/lib/carnos-continuity/memory-enums.ts, src/lib/carnos-continuity/retrieval-contract.ts, src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts
- Real repository refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts

### carnos_profiles
- Migration files: supabase/migrations/0001_profiles_and_carnos_profiles.sql
- Any source refs: src/lib/profile/queries.ts, src/types/database.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### chat_messages
- Migration files: supabase/migrations/0003_chat_foundation.sql
- Any source refs: src/app/api/carnos/messages/route.ts, src/components/carnos/carnos-message-composer.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/carnos-persona-read.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/carnos-persona-read.ts, src/lib/repositories/core-read.ts
- API route refs: src/app/api/carnos/messages/route.ts
- Page refs: none
- Write/action refs: src/app/api/carnos/messages/route.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### chat_sessions
- Migration files: supabase/migrations/0003_chat_foundation.sql
- Any source refs: src/app/api/carnos/messages/route.ts, src/components/carnos/carnos-message-composer.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/carnos-persona-read.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/carnos-persona-read.ts, src/lib/repositories/core-read.ts
- API route refs: src/app/api/carnos/messages/route.ts
- Page refs: none
- Write/action refs: src/app/api/carnos/messages/route.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### daily_logs
- Migration files: supabase/migrations/0005_daily_logs_and_proof_items.sql
- Any source refs: src/components/dashboard/career-evidence-linkage-panel.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-daily-log-flow.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-daily-log-flow.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### documents
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/app/carnos/page.tsx, src/app/housing/page.tsx, src/app/life-admin/page.tsx, src/components/carnos/carnos-companion-widget.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/carnos-visual-identity-panel.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/components/dashboard/knowledge-vault-alignment-v1.tsx, src/components/dashboard/retrieval-contract-panel.tsx, src/lib/carnos-continuity/embedding-boundary.ts, src/lib/carnos-continuity/memory-enums.ts, src/lib/carnos-identity/carnos-visual-identity.ts, src/lib/custom-trackers/core-tracker-domain-contracts.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/privacy/privacy-dashboard-view-model.ts, src/lib/repositories/admin-finance-read.ts, src/lib/routes.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: src/app/carnos/page.tsx, src/app/housing/page.tsx, src/app/life-admin/page.tsx
- Write/action refs: src/types/database.ts

### emotion_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### energy_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### events
- Migration files: supabase/migrations/0006_tasks_and_events.sql
- Any source refs: src/app/calendar/page.tsx, src/app/timeline/page.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/carnos/carnos-companion-dock.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/career-dashboard-v1.tsx, src/components/dashboard/carnos-current-info-integration-panel.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/cross-domain-memory-integration-panel.tsx, src/components/dashboard/current-info-privacy-retention-panel.tsx, src/components/dashboard/current-info-ui-components.tsx, src/components/dashboard/current-info-web-source-audit-trail-panel.tsx, src/components/dashboard/domain-read-page.tsx, src/components/dashboard/forget-delete-derived-records-panel.tsx, src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-linkage-panels.tsx, src/components/dashboard/memory-audit-usage-transparency-panel.tsx, src/components/dashboard/timeline-dashboard-v1.tsx, src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx, src/components/memory-rag/MemoryRagPreviewPanel.tsx, src/lib/carnos-continuity/carnos-memory-visibility.ts, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/memory-audit-usage-transparency.ts, src/lib/carnos-continuity/memory-enums.ts, src/lib/carnos-continuity/memory-rag-schema-contracts.ts, src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/current-info-capture/current-info-web-source-audit-trail.ts, src/lib/custom-trackers/phase19-completion-proof.ts, src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/approved-memory-write.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: src/app/calendar/page.tsx, src/app/timeline/page.tsx
- Write/action refs: src/components/calendar/calendar-timeline-proposal-composer.tsx, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/approved-memory-write.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### exercises
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### financial_accounts
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/components/dashboard/command-dashboard-v1.tsx, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/repositories/admin-finance-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### financial_logs
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/repositories/admin-finance-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### goal_milestones
- Migration files: supabase/migrations/0004_goals_foundation.sql
- Any source refs: src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/repositories/core-read.ts, src/types/database.ts

### goals
- Migration files: supabase/migrations/0004_goals_foundation.sql
- Any source refs: src/app/api/goals/proposals/route.ts, src/app/career/page.tsx, src/app/command/page.tsx, src/app/goals/page.tsx, src/app/page.tsx, src/app/resume/page.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/career-dashboard-v1.tsx, src/components/dashboard/career-evidence-linkage-panel.tsx, src/components/dashboard/career-prep-foundation-panel.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/current-info-review-to-save-panel.tsx, src/components/dashboard/domain-read-page.tsx, src/components/dashboard/goals-dashboard-v1.tsx, src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-linkage-panels.tsx, src/components/dashboard/index.ts, src/components/dashboard/learning-academy-dashboard-v1.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/components/dashboard/proof-dashboard-v1.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/components/dashboard/resume-dashboard-v1.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-goal-flow.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/analytics-experiments/metric-registry.ts, src/lib/carnos-continuity/carnos-entity-state.ts, src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/memory-audit-usage-transparency.ts, src/lib/carnos-continuity/memory-enums.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/current-info-capture/knowledge-vault-source-bridge.ts, src/lib/custom-trackers/core-tracker-domain-contracts.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/dashboard/dashboard-layout-contract.ts, src/lib/repositories/core-read.ts, src/lib/routes.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: src/app/api/goals/proposals/route.ts
- Page refs: src/app/career/page.tsx, src/app/command/page.tsx, src/app/goals/page.tsx, src/app/page.tsx, src/app/resume/page.tsx
- Write/action refs: src/app/api/goals/proposals/route.ts, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-goal-flow.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### grimoire_corruption_checks
- Migration files: supabase/migrations/0016_phase13_grimoire_foundation.sql
- Any source refs: src/components/dashboard/grimoire-dashboard-v1.tsx, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/grimoire-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/grimoire-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### grimoire_daily_logs
- Migration files: supabase/migrations/0016_phase13_grimoire_foundation.sql
- Any source refs: src/components/dashboard/grimoire-dashboard-v1.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/grimoire-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/grimoire-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### grimoire_modes
- Migration files: supabase/migrations/0016_phase13_grimoire_foundation.sql
- Any source refs: src/components/dashboard/grimoire-dashboard-v1.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/grimoire-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/grimoire-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### grimoire_reversions
- Migration files: supabase/migrations/0016_phase13_grimoire_foundation.sql
- Any source refs: src/components/dashboard/grimoire-dashboard-v1.tsx, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/grimoire-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/grimoire-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### grimoire_skills
- Migration files: supabase/migrations/0016_phase13_grimoire_foundation.sql
- Any source refs: src/components/dashboard/grimoire-dashboard-v1.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/grimoire-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/grimoire-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### haircare_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### housing_contacts
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/repositories/admin-finance-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### housing_options
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/repositories/admin-finance-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### interviews
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/app/career/page.tsx, src/app/interviews/page.tsx, src/components/dashboard/career-dashboard-v1.tsx, src/components/dashboard/career-prep-foundation-panel.tsx, src/components/dashboard/career-proposed-action-visibility-panel.tsx, src/components/dashboard/career-state-boundary-panel.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/index.ts, src/components/dashboard/interviews-dashboard-v1.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/memory-privacy-rules.ts, src/lib/carnos/persona-contract.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/career-dashboard-data-helpers.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-layout-contract.ts, src/lib/repositories/core-read.ts, src/lib/routes.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: src/app/career/page.tsx, src/app/interviews/page.tsx
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### job_application_events
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/career-dashboard-v1.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### job_applications
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/career-proposed-action-visibility-panel.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### job_referrals
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/networking-dashboard-v1.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### journal_entries
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### knowledge_items
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/knowledge-vault-foundation-panel.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/knowledge-vault-foundation.ts, src/lib/carnos-continuity/memory-rag-schema-contracts.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/current-info-capture/knowledge-vault-source-bridge.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts

### knowledge_links
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/knowledge-vault-foundation-panel.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/knowledge-vault-foundation.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### knowledge_tags
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/knowledge-vault-foundation-panel.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/knowledge-vault-foundation.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### learning_sessions
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### meal_items
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### memory_candidates
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql, supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/lib/carnos-continuity/memory-rag-schema-contracts.ts, src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts
- Real repository refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts

### memory_conflict_groups
- Migration files: supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/lib/carnos-continuity/memory-rag-schema-contracts.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_conflict_members
- Migration files: supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/lib/carnos-continuity/memory-rag-schema-contracts.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_do_not_remember_rules
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/memory-privacy-rules-panel.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_embedding_records
- Migration files: supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/lib/carnos-continuity/memory-embedding-provider-boundary.ts, src/lib/carnos-continuity/memory-rag-schema-contracts.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_events
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/memory-audit-usage-transparency-panel.tsx, src/lib/carnos-continuity/memory-audit-usage-transparency.ts, src/lib/repositories/approved-memory-write.ts
- Real repository refs: src/lib/repositories/approved-memory-write.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/repositories/approved-memory-write.ts

### memory_items
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql, supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/lib/carnos-continuity/memory-rag-schema-contracts.ts, src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts
- Real repository refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/repositories/approved-memory-write.ts, src/lib/repositories/memory-inbox-write.ts

### memory_links
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/lib/carnos-continuity/forget-delete-derived-records.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_preferences
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/lib/carnos-continuity/cross-domain-integration-preview.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_retrieval_events
- Migration files: supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx, src/components/memory-rag/MemoryRagPreviewPanel.tsx, src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts, src/lib/carnos-continuity/knowledge-vault-retrieval-bridge.ts, src/lib/carnos-continuity/memory-rag-schema-contracts.ts, src/lib/carnos-continuity/memory-retrieval-ranking-budget-dedupe.ts, src/lib/carnos-continuity/privacy-sensitive-forget-readiness.ts, src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts, src/lib/carnos-continuity/source-bridge-retrieval-preview.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_review_queue
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/memory-inbox-preview-panel.tsx, src/lib/carnos-continuity/forget-delete-derived-records.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### memory_usage_logs
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/components/dashboard/memory-audit-usage-transparency-panel.tsx, src/lib/carnos-continuity/forget-delete-derived-records.ts, src/lib/carnos-continuity/memory-audit-usage-transparency.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### mental_health_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### mock_interviews
- Migration files: supabase/migrations/0020_phase13_5d_career_prep_foundation.sql
- Any source refs: src/components/dashboard/career-prep-foundation-panel.tsx, src/lib/dashboard/career-prep-dashboard-data-helpers.ts, src/lib/repositories/career-prep-read.ts
- Real repository refs: src/lib/repositories/career-prep-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### networking_contacts
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/career-proposed-action-visibility-panel.tsx, src/components/dashboard/networking-dashboard-v1.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### networking_interactions
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/networking-dashboard-v1.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### nutrition_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### persona_prompt_versions
- Migration files: supabase/migrations/0018_phase13_5b_carnos_persona_foundation.sql
- Any source refs: src/components/carnos/carnos-persona-boundary-panel.tsx, src/lib/repositories/carnos-persona-read.ts
- Real repository refs: src/lib/repositories/carnos-persona-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### phd_application_assets
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### phd_readiness_assessments
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### privacy_settings
- Migration files: supabase/migrations/0021_phase13_5e_settings_privacy_foundation.sql
- Any source refs: src/components/dashboard/settings-privacy-foundation-panel.tsx, src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts, src/lib/repositories/settings-privacy-read.ts
- Real repository refs: src/lib/repositories/settings-privacy-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### products
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/app/supplements/page.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: src/app/supplements/page.tsx
- Write/action refs: src/types/database.ts

### profiles
- Migration files: supabase/migrations/0001_profiles_and_carnos_profiles.sql
- Any source refs: src/components/dashboard/networking-dashboard-v1.tsx, src/lib/profile/queries.ts, src/types/database.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### project_bugs
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### project_links
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/knowledge-vault-alignment-v1.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### project_memory_state
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/carnos-continuity/knowledge-vault-foundation.ts, src/lib/carnos-continuity/memory-contracts.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### project_milestones
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### project_releases
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### project_tests
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### projects
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/app/api/calendar/proposals/route.ts, src/app/api/goals/proposals/route.ts, src/app/knowledge/page.tsx, src/app/projects/page.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/knowledge-vault-alignment-v1.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx, src/components/dashboard/learning-project-detail-panels.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/components/dashboard/project-builder-dashboard-v1.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/proposed-action-contracts.ts, src/lib/actions/validate-proposed-action.ts, src/lib/carnos-continuity/carnos-entity-state.ts, src/lib/carnos-continuity/memory-privacy-rules.ts, src/lib/carnos-continuity/retrieval-contract.ts, src/lib/carnos/persona-contract.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-layout-contract.ts, src/lib/dashboard/learning-project-dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/lib/routes.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: src/app/api/calendar/proposals/route.ts, src/app/api/goals/proposals/route.ts
- Page refs: src/app/knowledge/page.tsx, src/app/projects/page.tsx
- Write/action refs: src/app/api/calendar/proposals/route.ts, src/app/api/goals/proposals/route.ts, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/validate-proposed-action.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### proof_items
- Migration files: supabase/migrations/0005_daily_logs_and_proof_items.sql, supabase/migrations/0006_tasks_and_events.sql
- Any source refs: src/app/world-class/page.tsx, src/components/dashboard/career-evidence-linkage-panel.tsx, src/components/dashboard/career-proposed-action-visibility-panel.tsx, src/components/dashboard/domain-read-page.tsx, src/components/dashboard/grimoire-dashboard-v1.tsx, src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: src/app/world-class/page.tsx
- Write/action refs: src/components/goals/goal-proof-proposal-composer.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### question_bank
- Migration files: supabase/migrations/0020_phase13_5d_career_prep_foundation.sql
- Any source refs: src/components/dashboard/career-prep-foundation-panel.tsx, src/lib/dashboard/career-prep-dashboard-data-helpers.ts, src/lib/repositories/career-prep-read.ts
- Real repository refs: src/lib/repositories/career-prep-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### quiz_attempts
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### quizzes
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/app/learning/page.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx, src/components/dashboard/learning-project-detail-panels.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard-registry.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/learning-project-dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: src/app/learning/page.tsx
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### recommendation_targets
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### reminders
- Migration files: supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql
- Any source refs: src/app/life-admin/page.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/lib/custom-trackers/template-frequency-semantics.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts, src/lib/repositories/calendar-routine-read.ts
- Real repository refs: src/lib/repositories/calendar-routine-read.ts
- API route refs: none
- Page refs: src/app/life-admin/page.tsx
- Write/action refs: src/components/calendar/calendar-timeline-proposal-composer.tsx

### research_citations
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/current-info-capture/knowledge-vault-source-bridge.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_claims
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_experiments
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_feedback
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### research_ideas
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/carnos-continuity/knowledge-vault-foundation.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_literature_items
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/current-info-capture/knowledge-vault-source-bridge.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_paper_versions
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### research_papers
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_questions
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_results
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### research_submissions
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### research_venues
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### resume_bullets
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/career-proposed-action-visibility-panel.tsx, src/components/dashboard/resume-dashboard-v1.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### resume_usage
- Migration files: supabase/migrations/0020_phase13_5d_career_prep_foundation.sql
- Any source refs: src/components/dashboard/career-prep-foundation-panel.tsx, src/lib/dashboard/career-prep-dashboard-data-helpers.ts, src/lib/repositories/career-prep-read.ts
- Real repository refs: src/lib/repositories/career-prep-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### resume_versions
- Migration files: supabase/migrations/0007_career_system_foundation.sql
- Any source refs: src/components/dashboard/resume-dashboard-v1.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### retrieval_logs
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql, supabase/migrations/0028_memory_rag_schema_alignment.sql
- Any source refs: src/lib/carnos-continuity/forget-delete-derived-records.ts
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### routine_steps
- Migration files: supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql
- Any source refs: src/components/dashboard/calendar-dashboard-v1.tsx, src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts, src/lib/repositories/calendar-routine-read.ts
- Real repository refs: src/lib/repositories/calendar-routine-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### routines
- Migration files: supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql
- Any source refs: src/app/hair-skincare/page.tsx, src/app/sleep-energy/page.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/carnos-continuity/carnos-entity-state.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts, src/lib/repositories/calendar-routine-read.ts
- Real repository refs: src/lib/repositories/calendar-routine-read.ts
- API route refs: none
- Page refs: src/app/hair-skincare/page.tsx, src/app/sleep-energy/page.tsx
- Write/action refs: none

### skill_paths
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/knowledge-vault-alignment-v1.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### skill_prerequisites
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/repositories/core-read.ts, src/types/database.ts

### skill_progress
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### skills
- Migration files: supabase/migrations/0008_learning_project_system_foundation.sql
- Any source refs: src/app/knowledge/page.tsx, src/app/learning/page.tsx, src/components/dashboard/grimoire-dashboard-v1.tsx, src/components/dashboard/knowledge-vault-alignment-v1.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx, src/components/dashboard/learning-project-detail-panels.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/dashboard/learning-project-dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: none
- Page refs: src/app/knowledge/page.tsx, src/app/learning/page.tsx
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### skincare_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### sleep_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### sop_versions
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### subscriptions
- Migration files: supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
- Any source refs: src/app/finance/page.tsx, src/app/life-admin/page.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/lib/dashboard-registry.ts, src/lib/dashboard/admin-finance-dashboard-data-helpers.ts, src/lib/repositories/admin-finance-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/admin-finance-read.ts
- API route refs: none
- Page refs: src/app/finance/page.tsx, src/app/life-admin/page.tsx
- Write/action refs: src/types/database.ts

### supplement_logs
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### supplements
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/app/body/page.tsx, src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/components/dashboard/index.ts, src/lib/carnos-continuity/memory-enums.ts, src/lib/carnos-continuity/memory-privacy-rules.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/lib/routes.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: src/app/body/page.tsx
- Write/action refs: src/types/database.ts

### system_memory_state
- Migration files: supabase/migrations/0024_phase15_memory_sql_foundation.sql
- Any source refs: none
- Real repository refs: none
- API route refs: none
- Page refs: none
- Write/action refs: none

### target_labs
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### target_professors
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### target_universities
- Migration files: supabase/migrations/0010_phase10_research_stanford_foundation.sql
- Any source refs: src/lib/dashboard/dashboard-card-registry.ts, src/lib/repositories/research-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/research-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/dashboard/dashboard-card-registry.ts, src/types/database.ts

### tasks
- Migration files: supabase/migrations/0006_tasks_and_events.sql
- Any source refs: src/app/api/calendar/proposals/route.ts, src/app/calendar/page.tsx, src/app/career/page.tsx, src/app/command/page.tsx, src/app/resume/page.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/career-dashboard-v1.tsx, src/components/dashboard/career-evidence-linkage-panel.tsx, src/components/dashboard/career-prep-foundation-panel.tsx, src/components/dashboard/command-dashboard-v1.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/current-info-review-to-save-panel.tsx, src/components/dashboard/domain-read-page.tsx, src/components/dashboard/goals-dashboard-v1.tsx, src/components/dashboard/grimoire-dashboard-v1.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-linkage-panels.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx, src/components/dashboard/learning-project-linkage-panels.tsx, src/components/dashboard/proof-dashboard-v1.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/components/dashboard/resume-dashboard-v1.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/actions/flows/create-task-flow.ts, src/lib/analytics-experiments/metric-registry.ts, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/current-info-capture/knowledge-vault-source-bridge.ts, src/lib/dashboard-registry.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/dashboard/grimoire-dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/core-read.ts
- API route refs: src/app/api/calendar/proposals/route.ts
- Page refs: src/app/calendar/page.tsx, src/app/career/page.tsx, src/app/command/page.tsx, src/app/resume/page.tsx
- Write/action refs: src/app/api/calendar/proposals/route.ts, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/lib/actions/create-proposed-action.ts, src/lib/actions/flows/create-proof-item-flow.ts, src/lib/actions/flows/create-task-flow.ts, src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/dashboard/dashboard-card-registry.ts, src/lib/dashboard/dashboard-data-helpers.ts, src/lib/repositories/core-read.ts, src/types/database.ts

### voice_sessions
- Migration files: supabase/migrations/0022_phase14_voice_foundation.sql
- Any source refs: src/lib/repositories/voice-read.ts
- Real repository refs: src/lib/repositories/voice-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### voice_transcripts
- Migration files: supabase/migrations/0022_phase14_voice_foundation.sql
- Any source refs: src/lib/repositories/voice-read.ts
- Real repository refs: src/lib/repositories/voice-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### web_search_queries
- Migration files: supabase/migrations/0026_phase16_web_source_sql_foundation.sql
- Any source refs: src/lib/repositories/current-info-read.ts
- Real repository refs: src/lib/repositories/current-info-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### web_source_audit_events
- Migration files: supabase/migrations/0026_phase16_web_source_sql_foundation.sql
- Any source refs: src/lib/repositories/current-info-read.ts
- Real repository refs: src/lib/repositories/current-info-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### web_source_candidates
- Migration files: supabase/migrations/0026_phase16_web_source_sql_foundation.sql
- Any source refs: src/lib/repositories/current-info-read.ts
- Real repository refs: src/lib/repositories/current-info-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### web_source_links
- Migration files: supabase/migrations/0026_phase16_web_source_sql_foundation.sql
- Any source refs: src/lib/repositories/current-info-read.ts
- Real repository refs: src/lib/repositories/current-info-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: none

### web_sources
- Migration files: supabase/migrations/0026_phase16_web_source_sql_foundation.sql
- Any source refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts, src/lib/repositories/current-info-read.ts
- Real repository refs: src/lib/repositories/current-info-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/lib/current-info-capture/current-info-review-to-save-flow.ts

### workout_sets
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-dashboard-v1.tsx, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts

### workouts
- Migration files: supabase/migrations/0012_phase11_health_body_foundation.sql
- Any source refs: src/components/dashboard/health-body-action-boundary-panels.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/health-body-detail-panels.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx, src/components/dashboard/health-body-linkage-panels.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx, src/lib/carnos-continuity/cross-domain-integration-preview.ts, src/lib/dashboard/health-body-dashboard-data-helpers.ts, src/lib/repositories/health-body-read.ts, src/types/database.ts
- Real repository refs: src/lib/repositories/health-body-read.ts
- API route refs: none
- Page refs: none
- Write/action refs: src/types/database.ts


## Tables Without Any Source Reference

- system_memory_state

## Tables Without Real Repository Supabase Usage

- carnos_context_snapshots
- carnos_profiles
- knowledge_items
- knowledge_links
- knowledge_tags
- memory_conflict_groups
- memory_conflict_members
- memory_do_not_remember_rules
- memory_embedding_records
- memory_links
- memory_preferences
- memory_retrieval_events
- memory_review_queue
- memory_usage_logs
- profiles
- project_memory_state
- retrieval_logs
- system_memory_state

## Tables Without Write/Action Signal

- app_settings
- behavioral_stories
- calendar_blocks
- carnos_context_snapshots
- knowledge_links
- knowledge_tags
- memory_conflict_groups
- memory_conflict_members
- memory_do_not_remember_rules
- memory_embedding_records
- memory_links
- memory_preferences
- memory_retrieval_events
- memory_review_queue
- memory_usage_logs
- mock_interviews
- persona_prompt_versions
- privacy_settings
- project_memory_state
- question_bank
- resume_usage
- retrieval_logs
- routine_steps
- routines
- system_memory_state
- voice_sessions
- voice_transcripts
- web_search_queries
- web_source_audit_events
- web_source_candidates
- web_source_links

## Carnos Interconnection

- Carnos source files/signals: 148
  - src/app/api/carnos/messages/route.ts
  - src/app/auth/signup/page.tsx
  - src/app/carnos/page.tsx
  - src/app/page.tsx
  - src/app/research-lab/page.tsx
  - src/app/research-stanford/page.tsx
  - src/app/settings/page.tsx
  - src/components/actions/pending-updates-drawer.tsx
  - src/components/analytics-experiments/analytics-dashboard-ui.tsx
  - src/components/analytics-experiments/self-experiment-lab-ui.tsx
  - src/components/carnos/carnos-boundary-badges.tsx
  - src/components/carnos/carnos-capability-matrix-panel.tsx
  - src/components/carnos/carnos-companion-dock.tsx
  - src/components/carnos/carnos-companion-widget.tsx
  - src/components/carnos/carnos-message-composer.tsx
  - src/components/carnos/carnos-orb.tsx
  - src/components/carnos/carnos-persona-boundary-panel.tsx
  - src/components/carnos/index.ts
  - src/components/dashboard/admin-finance-dashboard-v1.tsx
  - src/components/dashboard/approved-memory-read-layer-panel.tsx
  - src/components/dashboard/calendar-dashboard-v1.tsx
  - src/components/dashboard/career-dashboard-v1.tsx
  - src/components/dashboard/career-prep-foundation-panel.tsx
  - src/components/dashboard/career-proposed-action-visibility-panel.tsx
  - src/components/dashboard/carnos-current-info-integration-panel.tsx
  - src/components/dashboard/carnos-entity-state-panel.tsx
  - src/components/dashboard/carnos-lightweight-companion-panel.tsx
  - src/components/dashboard/carnos-memory-visibility-panel.tsx
  - src/components/dashboard/carnos-panel-v1.tsx
  - src/components/dashboard/carnos-visual-identity-panel.tsx
  - src/components/dashboard/command-dashboard-v1.tsx
  - src/components/dashboard/cross-dashboard-links.tsx
  - src/components/dashboard/cross-domain-memory-integration-panel.tsx
  - src/components/dashboard/current-context-pack-builder-panel.tsx
  - src/components/dashboard/current-info-ui-components.tsx
  - src/components/dashboard/current-info-web-source-audit-trail-panel.tsx
  - src/components/dashboard/embedding-boundary-panel.tsx
  - src/components/dashboard/forget-delete-derived-records-panel.tsx
  - src/components/dashboard/grimoire-dashboard-v1.tsx
  - src/components/dashboard/health-body-action-boundary-panels.tsx
  - src/components/dashboard/health-body-emotion-dashboard-v1.tsx
  - src/components/dashboard/health-body-linkage-panels.tsx
  - src/components/dashboard/health-body-nutrition-dashboard-v1.tsx
  - src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx
  - src/components/dashboard/health-body-supplements-dashboard-v1.tsx
  - src/components/dashboard/index.ts
  - src/components/dashboard/knowledge-vault-foundation-panel.tsx
  - src/components/dashboard/learning-project-linkage-panels.tsx
  - src/components/dashboard/memory-audit-usage-transparency-panel.tsx
  - src/components/dashboard/memory-inbox-preview-panel.tsx
  - src/components/dashboard/memory-privacy-rules-panel.tsx
  - src/components/dashboard/project-system-state-memory-panel.tsx
  - src/components/dashboard/research-proposed-action-visibility-panel.tsx
  - src/components/dashboard/retrieval-contract-panel.tsx
  - src/components/dashboard/settings-privacy-foundation-panel.tsx
  - src/components/layout/app-sidebar.tsx
  - src/components/layout/app-topbar.tsx
  - src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx
  - src/components/memory-rag/MemoryRagPreviewPanel.tsx
  - src/components/memory-rag/index.ts
  - src/components/privacy/privacy-dashboard-ui.tsx
  - src/components/profile/profile-summary-card.tsx
  - src/components/voice/carnos-voice-panel-integration.tsx
  - src/components/voice/index.ts
  - src/components/voice/voice-boundary-panel.tsx
  - src/components/voice/voice-manual-simulator-preview.tsx
  - src/components/voice/voice-transcript-preview.tsx
  - src/lib/actions/proposed-action-contracts.ts
  - src/lib/actions/validate-proposed-action.ts
  - src/lib/analytics-experiments/analytics-dashboard-view-model.ts
  - src/lib/analytics-experiments/analytics-repository-boundary.ts
  - src/lib/analytics-experiments/analytics-snapshot-contracts.ts
  - src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts
  - src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts
  - src/lib/analytics-experiments/experiment-evaluation-engine.ts
  - src/lib/analytics-experiments/experiment-repository-boundary.ts
  - src/lib/analytics-experiments/index.ts
  - src/lib/analytics-experiments/insight-quality-provenance.ts
  - src/lib/analytics-experiments/local-carnos-runtime-boundary.ts
  - src/lib/analytics-experiments/metric-registry.ts
  - src/lib/analytics-experiments/phase18-completion-proof.ts
  - src/lib/analytics-experiments/self-experiment-contracts.ts
  - src/lib/analytics-experiments/self-experiment-lab-view-model.ts
  - src/lib/analytics-experiments/trend-correlation-comparison-engine.ts
  - src/lib/audit/write-audit-log.ts
  - src/lib/carnos-continuity/approved-memory-read-layer.ts
  - src/lib/carnos-continuity/carnos-entity-state.ts
  - src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts
  - src/lib/carnos-continuity/carnos-memory-visibility.ts
  - src/lib/carnos-continuity/cross-domain-integration-preview.ts
  - src/lib/carnos-continuity/current-context-pack-builder.ts
  - src/lib/carnos-continuity/embedding-boundary.ts
  - src/lib/carnos-continuity/forget-delete-derived-records.ts
  - src/lib/carnos-continuity/index.ts
  - src/lib/carnos-continuity/knowledge-vault-foundation.ts
  - src/lib/carnos-continuity/knowledge-vault-retrieval-bridge.ts
  - src/lib/carnos-continuity/memory-audit-usage-transparency.ts
  - src/lib/carnos-continuity/memory-candidate-engine.ts
  - src/lib/carnos-continuity/memory-conflict-rules.ts
  - src/lib/carnos-continuity/memory-contracts.ts
  - src/lib/carnos-continuity/memory-embedding-provider-boundary.ts
  - src/lib/carnos-continuity/memory-enums.ts
  - src/lib/carnos-continuity/memory-privacy-rules.ts
  - src/lib/carnos-continuity/memory-provenance-confidence-conflict-engine.ts
  - src/lib/carnos-continuity/memory-rag-schema-contracts.ts
  - src/lib/carnos-continuity/memory-rag-schema-validators.ts
  - src/lib/carnos-continuity/memory-retrieval-ranking-budget-dedupe.ts
  - src/lib/carnos-continuity/memory-validators.ts
  - src/lib/carnos-continuity/privacy-sensitive-forget-readiness.ts
  - src/lib/carnos-continuity/project-system-state-memory.ts
  - src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts
  - src/lib/carnos-continuity/retrieval-contract.ts
  - src/lib/carnos-continuity/source-bridge-retrieval-preview.ts
  - src/lib/carnos-identity/carnos-accessibility.ts
  - src/lib/carnos-identity/carnos-visual-identity.ts
  - src/lib/carnos-identity/carnos-visual-tokens.ts
  - src/lib/carnos-identity/index.ts
  - src/lib/carnos/persona-contract.ts
  - src/lib/current-info-capture/current-info-web-source-audit-trail.ts
  - src/lib/current-info-contracts/current-info-enums.ts
  - src/lib/custom-trackers/carnos-proposals-review-queue.ts
  - src/lib/custom-trackers/core-tracker-domain-contracts.ts
  - src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts
  - src/lib/custom-trackers/dashboard-placement-rules.ts
  - src/lib/custom-trackers/evidence-attachment-boundaries.ts
  - src/lib/custom-trackers/index.ts
  - src/lib/custom-trackers/phase19-completion-proof.ts
  - src/lib/custom-trackers/privacy-carnos-permissions.ts
  - src/lib/custom-trackers/template-frequency-semantics.ts
  - src/lib/dashboard-registry.ts
  - src/lib/dashboard/dashboard-card-registry.ts
  - src/lib/dashboard/dashboard-data-helpers.ts
  - src/lib/dashboard/dashboard-layout-contract.ts
  - src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts
  - src/lib/privacy/privacy-dashboard-view-model.ts
  - src/lib/profile/index.ts
  - src/lib/profile/queries.ts
  - src/lib/repositories/approved-memory-write.ts
  - src/lib/repositories/carnos-persona-read.ts
  - src/lib/repositories/index.ts
  - src/lib/repositories/memory-inbox-write.ts
  - src/lib/routes.ts
  - src/lib/timeline/write-timeline-event.ts
  - src/lib/voice/voice-action-bridge.ts
  - src/lib/voice/voice-session-helpers.ts
  - src/lib/voice/voice-session-state.ts
  - src/types/database.ts
  - src/types/voice.ts
- Carnos pages: 6
  - src/app/auth/signup/page.tsx
  - src/app/carnos/page.tsx
  - src/app/page.tsx
  - src/app/research-lab/page.tsx
  - src/app/research-stanford/page.tsx
  - src/app/settings/page.tsx
- Carnos API routes: 1
  - src/app/api/carnos/messages/route.ts
- Carnos write/action/audit signal files: 4
  - src/app/api/carnos/messages/route.ts
  - src/lib/audit/write-audit-log.ts
  - src/lib/repositories/approved-memory-write.ts
  - src/lib/repositories/memory-inbox-write.ts

## Metrics / Analytics / Experiments Interconnection

- Metric/analytics/experiment source files/signals: 96
  - src/app/analytics/page.tsx
  - src/app/api/goals/proposals/route.ts
  - src/app/calendar/page.tsx
  - src/app/experiments/page.tsx
  - src/app/goals/page.tsx
  - src/app/page.tsx
  - src/app/research-lab/page.tsx
  - src/app/research-stanford/page.tsx
  - src/app/timeline/page.tsx
  - src/app/world-class/page.tsx
  - src/components/analytics-experiments/analytics-dashboard-ui.tsx
  - src/components/analytics-experiments/self-experiment-lab-ui.tsx
  - src/components/dashboard/admin-finance-dashboard-v1.tsx
  - src/components/dashboard/approved-memory-read-layer-panel.tsx
  - src/components/dashboard/calendar-dashboard-v1.tsx
  - src/components/dashboard/career-dashboard-v1.tsx
  - src/components/dashboard/career-evidence-linkage-panel.tsx
  - src/components/dashboard/career-prep-foundation-panel.tsx
  - src/components/dashboard/career-proposed-action-visibility-panel.tsx
  - src/components/dashboard/command-dashboard-v1.tsx
  - src/components/dashboard/cross-dashboard-links.tsx
  - src/components/dashboard/cross-domain-memory-integration-panel.tsx
  - src/components/dashboard/current-info-ui-components.tsx
  - src/components/dashboard/domain-read-page.tsx
  - src/components/dashboard/embedding-boundary-panel.tsx
  - src/components/dashboard/forget-delete-derived-records-panel.tsx
  - src/components/dashboard/grimoire-dashboard-v1.tsx
  - src/components/dashboard/health-body-action-boundary-panels.tsx
  - src/components/dashboard/health-body-dashboard-v1.tsx
  - src/components/dashboard/health-body-emotion-dashboard-v1.tsx
  - src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx
  - src/components/dashboard/health-body-linkage-panels.tsx
  - src/components/dashboard/health-body-nutrition-dashboard-v1.tsx
  - src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx
  - src/components/dashboard/health-body-supplements-dashboard-v1.tsx
  - src/components/dashboard/index.ts
  - src/components/dashboard/interviews-dashboard-v1.tsx
  - src/components/dashboard/knowledge-vault-alignment-v1.tsx
  - src/components/dashboard/knowledge-vault-foundation-panel.tsx
  - src/components/dashboard/learning-academy-dashboard-v1.tsx
  - src/components/dashboard/learning-project-linkage-panels.tsx
  - src/components/dashboard/learning-project-summary-panel.tsx
  - src/components/dashboard/memory-audit-usage-transparency-panel.tsx
  - src/components/dashboard/memory-inbox-preview-panel.tsx
  - src/components/dashboard/memory-privacy-rules-panel.tsx
  - src/components/dashboard/metric-tile.tsx
  - src/components/dashboard/networking-dashboard-v1.tsx
  - src/components/dashboard/project-builder-dashboard-v1.tsx
  - src/components/dashboard/research-detail-panels.tsx
  - src/components/dashboard/research-linkage-boundary-panels.tsx
  - src/components/dashboard/research-proposed-action-visibility-panel.tsx
  - src/components/dashboard/research-summary-panel.tsx
  - src/components/dashboard/resume-dashboard-v1.tsx
  - src/components/dashboard/retrieval-contract-panel.tsx
  - src/components/dashboard/settings-privacy-foundation-panel.tsx
  - src/components/goals/goal-proof-proposal-composer.tsx
  - src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx
  - src/components/memory-rag/MemoryRagPreviewPanel.tsx
  - src/lib/actions/flows/create-goal-flow.ts
  - src/lib/actions/flows/create-proof-item-flow.ts
  - src/lib/actions/proposed-action-contracts.ts
  - src/lib/actions/validate-proposed-action.ts
  - src/lib/analytics-experiments/analytics-dashboard-view-model.ts
  - src/lib/analytics-experiments/analytics-repository-boundary.ts
  - src/lib/analytics-experiments/analytics-snapshot-contracts.ts
  - src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts
  - src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts
  - src/lib/analytics-experiments/experiment-evaluation-engine.ts
  - src/lib/analytics-experiments/experiment-repository-boundary.ts
  - src/lib/analytics-experiments/index.ts
  - src/lib/analytics-experiments/insight-quality-provenance.ts
  - src/lib/analytics-experiments/local-carnos-runtime-boundary.ts
  - src/lib/analytics-experiments/metric-registry.ts
  - src/lib/analytics-experiments/phase18-completion-proof.ts
  - src/lib/analytics-experiments/self-experiment-contracts.ts
  - src/lib/analytics-experiments/self-experiment-lab-view-model.ts
  - src/lib/analytics-experiments/trend-correlation-comparison-engine.ts
  - src/lib/carnos-continuity/cross-domain-integration-preview.ts
  - src/lib/carnos-continuity/forget-delete-derived-records.ts
  - src/lib/carnos-continuity/memory-candidate-engine.ts
  - src/lib/carnos-continuity/memory-enums.ts
  - src/lib/carnos/persona-contract.ts
  - src/lib/custom-trackers/core-tracker-domain-contracts.ts
  - src/lib/custom-trackers/index.ts
  - src/lib/custom-trackers/phase19-completion-proof.ts
  - src/lib/custom-trackers/privacy-carnos-permissions.ts
  - src/lib/custom-trackers/template-frequency-semantics.ts
  - src/lib/custom-trackers/timeline-analytics-compatibility.ts
  - src/lib/dashboard-registry.ts
  - src/lib/dashboard/dashboard-card-registry.ts
  - src/lib/dashboard/research-stanford-dashboard-data-helpers.ts
  - src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts
  - src/lib/placeholder-route-decisions.ts
  - src/lib/repositories/research-read.ts
  - src/lib/routes.ts
  - src/types/database.ts
- Metric/analytics/experiment pages: 9
  - src/app/analytics/page.tsx
  - src/app/calendar/page.tsx
  - src/app/experiments/page.tsx
  - src/app/goals/page.tsx
  - src/app/page.tsx
  - src/app/research-lab/page.tsx
  - src/app/research-stanford/page.tsx
  - src/app/timeline/page.tsx
  - src/app/world-class/page.tsx

## Connector / Spotify Reality

- Connector/provider source signal files: 31
  - src/app/privacy/page.tsx
  - src/components/carnos/carnos-companion-widget.tsx
  - src/components/carnos/carnos-orb.tsx
  - src/components/dashboard/carnos-memory-visibility-panel.tsx
  - src/components/dashboard/current-context-pack-builder-panel.tsx
  - src/components/dashboard/knowledge-vault-alignment-v1.tsx
  - src/components/dashboard/memory-inbox-preview-panel.tsx
  - src/components/memory-rag/MemoryRagPreviewPanel.tsx
  - src/components/privacy/privacy-dashboard-ui.tsx
  - src/lib/actions/flows/create-proof-item-flow.ts
  - src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts
  - src/lib/carnos-continuity/carnos-memory-visibility.ts
  - src/lib/carnos-continuity/current-context-pack-builder.ts
  - src/lib/carnos-continuity/embedding-boundary.ts
  - src/lib/carnos-continuity/memory-embedding-provider-boundary.ts
  - src/lib/carnos-continuity/memory-provenance-confidence-conflict-engine.ts
  - src/lib/carnos-continuity/memory-rag-schema-contracts.ts
  - src/lib/carnos-continuity/memory-retrieval-ranking-budget-dedupe.ts
  - src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts
  - src/lib/carnos-identity/carnos-visual-tokens.ts
  - src/lib/carnos-identity/index.ts
  - src/lib/current-info-capture/current-info-destination-router.ts
  - src/lib/current-info-capture/current-info-duplicate-detector.ts
  - src/lib/current-info-capture/current-info-review-to-save-flow.ts
  - src/lib/current-info-capture/current-info-source-candidate.ts
  - src/lib/current-info-review/current-info-review-decision.ts
  - src/lib/current-info-review/current-info-review-queue-item.ts
  - src/lib/custom-trackers/evidence-attachment-boundaries.ts
  - src/lib/custom-trackers/timeline-analytics-compatibility.ts
  - src/lib/privacy/privacy-dashboard-view-model.ts
  - src/types/database.ts
- Spotify runtime/token integration files: 0
- Conclusion: Spotify is not connected. Current Spotify work is boundary/planning/UI truth only.

## Phase / Chunk Artifact Classification

### Phase 1.8.R
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_1_8_RETROSPECTIVE_GAP_AUDIT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 10
- Migrations: 2
  - supabase/migrations/0010_phase10_research_stanford_foundation.sql
  - supabase/migrations/0011_phase10_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase10
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 10_RESEARCH_STANFORD_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-10.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 10.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_10_CHUNK_A_SOURCE_ROUTE_INSPECTION.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: yes
- Connector signal: no

### Phase 10.R
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_10_RESEARCH_STANFORD_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 10.S
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_10_SOURCE_TO_SCOPE_TRACEABILITY.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 11
- Migrations: 2
  - supabase/migrations/0012_phase11_health_body_foundation.sql
  - supabase/migrations/0013_phase11_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase11
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 11_HEALTH_BODY_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-11.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 11.B
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_11_BASELINE_UNITS_SLEEP_PHOTO_BOUNDARY.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 11.H
- Migrations: 0
- Contracts: 0
- Reports: 4
  - docs/phase-reports/PHASE_11_HEALTH_BODY_AUDIT_GATE.md
  - docs/phase-reports/PHASE_11_HEALTH_BODY_COMPLETION_REPORT.md
  - docs/phase-reports/PHASE_11_HEALTH_BODY_DETAIL_PANEL_PATTERN_REPORT.md
  - docs/phase-reports/PHASE_11_HEALTH_PRIVACY_SAFETY_REVIEW.md
- QA docs: 1
  - docs/qa/PHASE_11_HEALTH_BODY_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 11.R
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_11_READ_HELPER_SCHEMA_BOUNDARY_AUDIT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 11.S
- Migrations: 0
- Contracts: 0
- Reports: 2
  - docs/phase-reports/PHASE_11_SAFETY_DATA_TARGET_TREND_BOUNDARY.md
  - docs/phase-reports/PHASE_11_SOURCE_TO_SCOPE_TRACEABILITY.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 12
- Migrations: 2
  - supabase/migrations/0014_phase12_life_admin_finance_foundation.sql
  - supabase/migrations/0015_phase12_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase12
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 12_LIFE_ADMIN_FINANCE_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-12.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 12.9.P
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9_PRE_GRIMOIRE_GAP_AUDIT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 12.9B.A
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9B_AI_EXTRACTION_ZOD_ROUTE.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 12.9C.P
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9C_PENDING_UPDATE_CONFIRMATION_WIRING.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 12.9D.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9D_CARNOS_CHAT_PERSISTENCE.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 12.9E.G
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9E_GOALS_PROOF_PROPOSAL_CREATION.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 12.9F.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9F_CALENDAR_TIMELINE_PROPOSAL_CREATION.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 12.9G.F
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_9G_FINAL_PRE_GRIMOIRE_LOCK.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 12.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_12_C01_SOURCE_ROUTE_INSPECTION.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 12.L
- Migrations: 0
- Contracts: 0
- Reports: 2
  - docs/phase-reports/PHASE_12_LIFE_ADMIN_FINANCE_COMPLETION_REPORT.md
  - docs/phase-reports/PHASE_12_LIFE_ADMIN_PRIVACY_SAFETY_REVIEW.md
- QA docs: 1
  - docs/qa/PHASE_12_LIFE_ADMIN_FINANCE_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 12.S
- Migrations: 0
- Contracts: 0
- Reports: 3
  - docs/phase-reports/PHASE_12_SOURCE_TO_SCOPE_CLOSEOUT.md
  - docs/phase-reports/PHASE_12_SOURCE_TO_SCOPE_TRACEABILITY.md
  - docs/phase-reports/PHASE_12_SQL_FOUNDATION_VALIDATION_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 13
- Migrations: 6
  - supabase/migrations/0016_phase13_grimoire_foundation.sql
  - supabase/migrations/0017_phase13_parent_ownership_guards.sql
  - supabase/migrations/0018_phase13_5b_carnos_persona_foundation.sql
  - supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql
  - supabase/migrations/0020_phase13_5d_career_prep_foundation.sql
  - supabase/migrations/0021_phase13_5e_settings_privacy_foundation.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 13_5
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5B_CARNOS_PERSONA_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13-5b.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5c
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5C_CALENDAR_TIMELINE_ROUTINE_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13-5c.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5d
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5D_CAREER_PREP_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13-5d.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5e
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5E_SETTINGS_PRIVACY_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13-5e.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5f
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5FMIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13-5f.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_5G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase13_5g
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13_GRIMOIRE_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 13.5A.F
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5A_FORMAL_GAP_LOCK_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.5B.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5B_CARNOS_PERSONA_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_13_5B_CARNOS_PERSONA_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.5C.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.5D.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5D_CAREER_PREP_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_13_5D_CAREER_PREP_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.5E.S
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5E_SETTINGS_PRIVACY_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_13_5E_SETTINGS_PRIVACY_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.5F.P
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.5G.F
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_5G_FINAL_SOURCE_COVERAGE_AUDIT.md
- QA docs: 1
  - docs/qa/PHASE_13_5G_FINAL_SOURCE_COVERAGE_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.A
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_A_GRIMOIRE_SOURCE_SCOPE_LOCK.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 13.G
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_13_GRIMOIRE_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_13_GRIMOIRE_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 14
- Migrations: 2
  - supabase/migrations/0022_phase14_voice_foundation.sql
  - supabase/migrations/0023_phase14_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 14_ACTIVE_VOICE_SESSIONS_SQL_ALLOWED__
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-13-5g.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14_VOICE_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14b.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14a.mjs
- Package scripts: audit:phase14a
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14A.V
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 14B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase14b
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 14B.V
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14B_VOICE_SQL_FOUNDATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14B_VOICE_SQL_FOUNDATION_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 14C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase14c
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14C.V
- Migrations: 0
- Contracts: 0
- Reports: 2
  - docs/phase-reports/PHASE_14C_VOICE_SOURCE_TO_SCOPE_TRACEABILITY.md
  - docs/phase-reports/PHASE_14C_VOICE_TYPES_STATE_MACHINE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14C_VOICE_TYPES_STATE_MACHINE_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase14d
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14D_ALLOWED_API_VOICE_TRANSCRIBE_ROUTE__
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14c.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14D.S
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14e.mjs
- Package scripts: audit:phase14e
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14E_UI_DIRECTORY_PARENT_ALLOWED_UNTIL_REAL_UI_FILES__
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14d.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14E.V
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14E_VOICE_UI_COMPONENTS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14E_VOICE_UI_COMPONENTS_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14f.mjs
- Package scripts: audit:phase14f
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14F.T
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14FILES
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14j.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14g.mjs
- Package scripts: audit:phase14g
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14G.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14h.mjs
- Package scripts: audit:phase14h
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14H.T
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 14I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-14i.mjs
- Package scripts: audit:phase14i
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14I.V
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14I_VOICE_FOUNDATION_AUDIT_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14I_VOICE_FOUNDATION_AUDIT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 14J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase14j
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 14J.F
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_14J_FINAL_VOICE_TEXT_INTEGRATION_HARDENING_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_14J_FINAL_VOICE_TEXT_INTEGRATION_HARDENING_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15
- Migrations: 2
  - supabase/migrations/0024_phase15_memory_sql_foundation.sql
  - supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 6
  - scripts/audit-phase-15c.mjs
  - scripts/audit-phase-15d.mjs
  - scripts/audit-phase-15e.mjs
  - scripts/audit-phase-15f.mjs
  - scripts/audit-phase-15k.mjs
  - scripts/audit-phase-15l.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 15_MEMORY_SQL_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 3
  - scripts/audit-phase-15b.mjs
  - scripts/audit-phase-15m.mjs
  - scripts/audit-phase-15q.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 15A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15a
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15A.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_15A_CARNOS_PERSISTENT_MEMORY_CONTINUITY_SCOPE_LOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15A_CARNOS_PERSISTENT_MEMORY_CONTINUITY_SCOPE_LOCK_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15AAUDITPATH
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 2
  - scripts/audit-phase-17e.mjs
  - scripts/audit-phase-17f.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 15B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 15B.M
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_15B_MEMORY_SQL_FOUNDATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15B_MEMORY_SQL_FOUNDATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15c
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15C.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES.md
- Reports: 1
  - docs/phase-reports/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15d
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15D.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15D_MEMORY_CANDIDATE_ENGINE.md
- Reports: 1
  - docs/phase-reports/PHASE_15D_MEMORY_CANDIDATE_ENGINE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15D_MEMORY_CANDIDATE_ENGINE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15e
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15E.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15E_MEMORY_INBOX_UI.md
- Reports: 1
  - docs/phase-reports/PHASE_15E_MEMORY_INBOX_UI_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15E_MEMORY_INBOX_UI_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15f
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15F.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md
- Reports: 1
  - docs/phase-reports/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-15g.mjs
- Package scripts: audit:phase15g
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15G.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES.md
- Reports: 1
  - docs/phase-reports/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-15h.mjs
- Package scripts: audit:phase15h
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15H.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15H_CARNOS_ENTITY_STATE.md
- Reports: 1
  - docs/phase-reports/PHASE_15H_CARNOS_ENTITY_STATE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15H_CARNOS_ENTITY_STATE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15i
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15I.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY.md
- Reports: 1
  - docs/phase-reports/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15j
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15J.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES.md
- Reports: 1
  - docs/phase-reports/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15K
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15k
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15K.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL.md
- Reports: 1
  - docs/phase-reports/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15L
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15l
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15L.K
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION.md
- Reports: 1
  - docs/phase-reports/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15m
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15M.R
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING.md
- Reports: 1
  - docs/phase-reports/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15MIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 5
  - scripts/audit-phase-15i.mjs
  - scripts/audit-phase-15j.mjs
  - scripts/audit-phase-15n.mjs
  - scripts/audit-phase-15o.mjs
  - scripts/audit-phase-15p.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 15N
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15n
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15N.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER.md
- Reports: 1
  - docs/phase-reports/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15O
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15o
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 15O.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS.md
- Reports: 1
  - docs/phase-reports/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15P
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15p
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 15P.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY.md
- Reports: 1
  - docs/phase-reports/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15Q
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15q
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15Q.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW.md
- Reports: 1
  - docs/phase-reports/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15R
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase15r
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 15R.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_15R_CARNOS_PERSISTENT_MEMORY_CONTINUITY_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_15R_CARNOS_PERSISTENT_MEMORY_CONTINUITY_FINAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 15REQUIREDFILES
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-15r.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16
- Migrations: 2
  - supabase/migrations/0026_phase16_web_source_sql_foundation.sql
  - supabase/migrations/0027_phase16_web_source_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 16_5_CARNOS_VISUAL_IDENTITY
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 7
  - scripts/audit-phase-16-5b.mjs
  - scripts/audit-phase-16-5c.mjs
  - scripts/audit-phase-16-5d.mjs
  - scripts/audit-phase-16-5e.mjs
  - scripts/audit-phase-16-5f.mjs
  - scripts/audit-phase-16-5g.mjs
  - scripts/audit-phase-16-5h.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16-5a.mjs
- Package scripts: audit:phase16_5a
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5c
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5d
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5e
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5f
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5g
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5h
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16_5i
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5I_CARNOS_COMMAND_COMPANION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16-5i.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_5J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16-5j.mjs
- Package scripts: audit:phase16_5j
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16_WEB_SOURCE_SQL_FOUNDATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 2
  - scripts/audit-phase-16b.mjs
  - scripts/audit-phase-16r.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16.5A.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5B.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5C.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5D.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5D_CARNOS_ORB_COMPONENT_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5D_CARNOS_ORB_COMPONENT_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5D_CARNOS_ORB_COMPONENT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5E.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5F.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5G.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5H.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5I.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16.5J.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_AUDIT_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16a.mjs
- Package scripts: audit:phase16a
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16A.W
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_16A_WEB_SEARCH_SCOPE_LOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16A_WEB_SEARCH_SCOPE_LOCK_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16B.W
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16c.mjs
- Package scripts: audit:phase16c
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16C.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS.md
- Reports: 1
  - docs/phase-reports/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16d.mjs
- Package scripts: audit:phase16d
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16D.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER.md
- Reports: 1
  - docs/phase-reports/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16e
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16E.Q
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE.md
- Reports: 1
  - docs/phase-reports/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16EMIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16e.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16f
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16F.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE.md
- Reports: 1
  - docs/phase-reports/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16FMIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16f.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16g
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16G_B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16g-b.mjs
- Package scripts: audit:phase16g_b
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16G.B
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16G.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER.md
- Reports: 1
  - docs/phase-reports/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16GMIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16g.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16h
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16H_B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16h_b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16H.B
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16H.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16HBMIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16h-b.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16HMIGRATIONS
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16h.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16i.mjs
- Package scripts: audit:phase16i
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16I.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16j.mjs
- Package scripts: audit:phase16j
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 16J.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 16K
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16k.mjs
- Package scripts: audit:phase16k
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16K.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16L
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16l.mjs
- Package scripts: audit:phase16l
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16L.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16m.mjs
- Package scripts: audit:phase16m
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16M.R
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16N
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16n.mjs
- Package scripts: audit:phase16n
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16N.K
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16O
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16o.mjs
- Package scripts: audit:phase16o
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16O.R
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16P
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16p.mjs
- Package scripts: audit:phase16p
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16P.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16P_PRIVACY_RETENTION_RULES_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16P_PRIVACY_RETENTION_RULES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16P_PRIVACY_RETENTION_RULES_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16Q
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-16q.mjs
- Package scripts: audit:phase16q
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16Q.W
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 16R
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase16r
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 16R.F
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_16R_FINAL_PHASE_16_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_16R_FINAL_PHASE_16_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17q.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17a.mjs
- Package scripts: audit:phase17a
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 17A.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17A_MEMORY_RAG_BOUNDARY_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_17A_MEMORY_RAG_DISCOVERY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17A_MEMORY_RAG_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17b.mjs
- Package scripts: audit:phase17b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 17B.M
- Migrations: 0
- Contracts: 3
  - docs/contracts/PHASE_17B_MEMORY_RAG_AI_CAPABILITY_MATRIX.md
  - docs/contracts/PHASE_17B_MEMORY_RAG_DATA_BOUNDARY_MATRIX.md
  - docs/contracts/PHASE_17B_MEMORY_RAG_SCHEMA_OWNERSHIP_MAP.md
- Reports: 1
  - docs/phase-reports/PHASE_17B_MEMORY_RAG_BOUNDARY_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17B_MEMORY_RAG_BOUNDARY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17c.mjs
- Package scripts: audit:phase17c
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 17C.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17C_MEMORY_RAG_SCHEMA_ALIGNMENT_CONTRACT.md
- Reports: 1
  - docs/phase-reports/PHASE_17C_MEMORY_RAG_SCHEMA_FOUNDATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17C_MEMORY_RAG_SCHEMA_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 2
  - scripts/audit-phase-15a.mjs
  - scripts/audit-phase-17d.mjs
- Package scripts: audit:phase17d
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 17D.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase17e
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17E.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17E_MEMORY_INBOX_REPOSITORY.md
- Reports: 1
  - docs/phase-reports/PHASE_17E_MEMORY_INBOX_REPOSITORY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17E_MEMORY_INBOX_REPOSITORY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase17f
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17F.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17F_APPROVED_MEMORY_REPOSITORY.md
- Reports: 1
  - docs/phase-reports/PHASE_17F_APPROVED_MEMORY_REPOSITORY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17F_APPROVED_MEMORY_REPOSITORY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17g.mjs
- Package scripts: audit:phase17g
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17G.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE.md
- Reports: 1
  - docs/phase-reports/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17h.mjs
- Package scripts: audit:phase17h
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17H.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17i.mjs
- Package scripts: audit:phase17i
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17I.R
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE.md
- Reports: 1
  - docs/phase-reports/PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17j.mjs
- Package scripts: audit:phase17j
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17J.K
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE.md
- Reports: 1
  - docs/phase-reports/PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17K
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17k.mjs
- Package scripts: audit:phase17k
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17K.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17K_SOURCE_BRIDGES.md
- Reports: 1
  - docs/phase-reports/PHASE_17K_SOURCE_BRIDGES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17K_SOURCE_BRIDGES_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17L
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17l.mjs
- Package scripts: audit:phase17l
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17L.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER.md
- Reports: 1
  - docs/phase-reports/PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17m.mjs
- Package scripts: audit:phase17m
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17M.R
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION.md
- Reports: 1
  - docs/phase-reports/PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17N
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17n.mjs
- Package scripts: audit:phase17n
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17N.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17N_MEMORY_RAG_UI.md
- Reports: 1
  - docs/phase-reports/PHASE_17N_MEMORY_RAG_UI_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17N_MEMORY_RAG_UI_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17O
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17o.mjs
- Package scripts: audit:phase17o
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17O.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL.md
- Reports: 1
  - docs/phase-reports/PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17P
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-17p.mjs
- Package scripts: audit:phase17p
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 17P.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS.md
- Reports: 1
  - docs/phase-reports/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17Q
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase17q
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 17Q-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase17q-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 17Q.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_17Q_FINAL_MEMORY_RAG_AUDIT.md
- Reports: 1
  - docs/phase-reports/PHASE_17Q_FINAL_MEMORY_RAG_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_17Q_FINAL_MEMORY_RAG_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 18
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 15
  - scripts/audit-phase-18b.mjs
  - scripts/audit-phase-18c.mjs
  - scripts/audit-phase-18d.mjs
  - scripts/audit-phase-18e.mjs
  - scripts/audit-phase-18f.mjs
  - scripts/audit-phase-18g.mjs
  - scripts/audit-phase-18h.mjs
  - scripts/audit-phase-18i.mjs
  - scripts/audit-phase-18j.mjs
  - scripts/audit-phase-18k.mjs
  - scripts/audit-phase-18l.mjs
  - scripts/audit-phase-18m-b.mjs
  - scripts/audit-phase-18m.mjs
  - scripts/audit-phase-18n.mjs
  - scripts/audit-phase-18o.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-18a.mjs
- Package scripts: audit:phase18a
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18A_B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-18a-b.mjs
- Package scripts: audit:phase18a_b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18A_B-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18a_b-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18A-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18a-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18A.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18A_ANALYTICS_EXPERIMENTS_SCOPE_LOCK.md
- Reports: 1
  - docs/phase-reports/PHASE_18A_ANALYTICS_EXPERIMENTS_SCOPE_LOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18A_ANALYTICS_EXPERIMENTS_SCOPE_LOCK_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18A.B
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18A_B_COMPANION_PERSISTENCE_OFFLINE_AI_READINESS.md
- Reports: 1
  - docs/phase-reports/PHASE_18A_B_COMPANION_PERSISTENCE_OFFLINE_AI_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18A_B_COMPANION_PERSISTENCE_OFFLINE_AI_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18b
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18B_B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-local-carnos-runtime-lock.mjs
- Package scripts: audit:phase18b_b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18B_B-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18b_b-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18B-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18b-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18B.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md
- Reports: 1
  - docs/phase-reports/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18c
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18C-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18c-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18C.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY.md
- Reports: 1
  - docs/phase-reports/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18d
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18D-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18d-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18D.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18D_ANALYTICS_SNAPSHOT_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_18D_ANALYTICS_SNAPSHOT_CONTRACTS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18D_ANALYTICS_SNAPSHOT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18e
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18E-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18e-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18E.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18E_SELF_EXPERIMENT_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_18E_SELF_EXPERIMENT_CONTRACTS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18E_SELF_EXPERIMENT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18f
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18F-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18f-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18F.I
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18F_INSIGHT_QUALITY_PROVENANCE.md
- Reports: 1
  - docs/phase-reports/PHASE_18F_INSIGHT_QUALITY_PROVENANCE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18F_INSIGHT_QUALITY_PROVENANCE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18g
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18G-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18g-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18G.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARIES.md
- Reports: 1
  - docs/phase-reports/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARIES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18h
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18H-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18h-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18H.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARIES.md
- Reports: 1
  - docs/phase-reports/PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARIES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18i
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18I-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18i-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18I.T
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18I_TREND_CORRELATION_COMPARISON_ENGINE.md
- Reports: 1
  - docs/phase-reports/PHASE_18I_TREND_CORRELATION_COMPARISON_ENGINE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18I_TREND_CORRELATION_COMPARISON_ENGINE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18j
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18J-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18j-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18J.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18J_EXPERIMENT_EVALUATION_ENGINE.md
- Reports: 1
  - docs/phase-reports/PHASE_18J_EXPERIMENT_EVALUATION_ENGINE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18J_EXPERIMENT_EVALUATION_ENGINE_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18K
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18k
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18K-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18k-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18K.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18K_ANALYTICS_DASHBOARD_UI.md
- Reports: 1
  - docs/phase-reports/PHASE_18K_ANALYTICS_DASHBOARD_UI_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18K_ANALYTICS_DASHBOARD_UI_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18L
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18l
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18L-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18l-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18L.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18L_SELF_EXPERIMENT_LAB_UI.md
- Reports: 1
  - docs/phase-reports/PHASE_18L_SELF_EXPERIMENT_LAB_UI_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18L_SELF_EXPERIMENT_LAB_UI_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18m
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18M_B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18m_b
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18M_B-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18m_b-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18M-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18m-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18M.B
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18M.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18N
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18n
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18N-BUILD-MARKER
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18n-build-marker
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 18N.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT.md
- Reports: 1
  - docs/phase-reports/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18O
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase18o
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 18O.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_18O_FINAL_COMPLETION.md
- Reports: 1
  - docs/phase-reports/PHASE_18O_FINAL_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_18O_FINAL_COMPLETION_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 13
  - scripts/audit-phase-19b.mjs
  - scripts/audit-phase-19c.mjs
  - scripts/audit-phase-19d.mjs
  - scripts/audit-phase-19e.mjs
  - scripts/audit-phase-19f.mjs
  - scripts/audit-phase-19g.mjs
  - scripts/audit-phase-19h.mjs
  - scripts/audit-phase-19i.mjs
  - scripts/audit-phase-19j.mjs
  - scripts/audit-phase-19k.mjs
  - scripts/audit-phase-19l.mjs
  - scripts/audit-phase-19m.mjs
  - scripts/audit-phase-19n.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-19a.mjs
- Package scripts: audit:phase19a
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19A.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19A_CUSTOM_TRACKERS_SCOPE_LOCK.md
- Reports: 1
  - docs/phase-reports/PHASE_19A_CUSTOM_TRACKERS_SCOPE_LOCK_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19A_CUSTOM_TRACKERS_SCOPE_LOCK_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19b
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19B.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19B_CORE_TRACKER_DOMAIN_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_19B_CORE_TRACKER_DOMAIN_CONTRACTS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19B_CORE_TRACKER_DOMAIN_CONTRACTS_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19c
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19C.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19C_FIELD_TYPE_REGISTRY_VALIDATION.md
- Reports: 1
  - docs/phase-reports/PHASE_19C_FIELD_TYPE_REGISTRY_VALIDATION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19C_FIELD_TYPE_REGISTRY_VALIDATION_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19d
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19D.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19D_ENTRY_VALIDATION_VALUES_JSON_SAFETY.md
- Reports: 1
  - docs/phase-reports/PHASE_19D_ENTRY_VALIDATION_VALUES_JSON_SAFETY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19D_ENTRY_VALIDATION_VALUES_JSON_SAFETY_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19e
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 19E.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARIES.md
- Reports: 1
  - docs/phase-reports/PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARIES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARIES_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19f
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19F.T
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19F_TEMPLATES_FREQUENCY_SEMANTICS.md
- Reports: 1
  - docs/phase-reports/PHASE_19F_TEMPLATES_FREQUENCY_SEMANTICS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19F_TEMPLATES_FREQUENCY_SEMANTICS_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19g
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19G.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19G_PRIVACY_CARNOS_PERMISSIONS.md
- Reports: 1
  - docs/phase-reports/PHASE_19G_PRIVACY_CARNOS_PERMISSIONS_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19G_PRIVACY_CARNOS_PERMISSIONS_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19h
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19H.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19H_CARNOS_PROPOSALS_REVIEW_QUEUE.md
- Reports: 1
  - docs/phase-reports/PHASE_19H_CARNOS_PROPOSALS_REVIEW_QUEUE_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19H_CARNOS_PROPOSALS_REVIEW_QUEUE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19i
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19I.D
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19I_DASHBOARD_PLACEMENT_RULES.md
- Reports: 1
  - docs/phase-reports/PHASE_19I_DASHBOARD_PLACEMENT_RULES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19I_DASHBOARD_PLACEMENT_RULES_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19j
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: yes
- Connector signal: no

### Phase 19J.T
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19J_TIMELINE_ANALYTICS_COMPATIBILITY.md
- Reports: 1
  - docs/phase-reports/PHASE_19J_TIMELINE_ANALYTICS_COMPATIBILITY_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19J_TIMELINE_ANALYTICS_COMPATIBILITY_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: yes
- Connector signal: no

### Phase 19K
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19k
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19K.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARIES.md
- Reports: 1
  - docs/phase-reports/PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARIES_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARIES_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19L
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19l
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19L.R
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP.md
- Reports: 1
  - docs/phase-reports/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 19M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19m
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19M.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19M_CUSTOM_TRACKER_DASHBOARD_UI.md
- Reports: 1
  - docs/phase-reports/PHASE_19M_CUSTOM_TRACKER_DASHBOARD_UI_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19M_CUSTOM_TRACKER_DASHBOARD_UI_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 19N
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase19n
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 19N.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_19N_FINAL_COMPLETION.md
- Reports: 1
  - docs/phase-reports/PHASE_19N_FINAL_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_19N_FINAL_COMPLETION_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 20
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 25
  - scripts/audit-phase-20a.mjs
  - scripts/audit-phase-20b.mjs
  - scripts/audit-phase-20c.mjs
  - scripts/audit-phase-20d.mjs
  - scripts/audit-phase-20e.mjs
  - scripts/audit-phase-20f.mjs
  - scripts/audit-phase-20g.mjs
  - scripts/audit-phase-20h.mjs
  - scripts/audit-phase-20i.mjs
  - scripts/audit-phase-20j.mjs
  - scripts/audit-phase-20k.mjs
  - scripts/audit-phase-20l.mjs
  - scripts/audit-phase-20m.mjs
  - scripts/audit-phase-20n.mjs
  - scripts/audit-phase-20o.mjs
  - scripts/audit-phase-20p.mjs
  - scripts/audit-phase-20q.mjs
  - scripts/audit-phase-20r.mjs
  - scripts/audit-phase-20s.mjs
  - scripts/audit-phase-20t.mjs
  - scripts/audit-phase-20u.mjs
  - scripts/audit-phase-20v.mjs
  - scripts/audit-phase-20w.mjs
  - scripts/audit-phase-20x.mjs
  - scripts/audit-phase-20y.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20A
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20a
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20A.P
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_20A_PRIVACY_EXPORT_CONNECTOR_SCOPE_LOCK_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: yes

### Phase 20B
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20b
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20B.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20B_CORE_PRIVACY_DOMAIN_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_20B_CORE_PRIVACY_DOMAIN_CONTRACTS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20C
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20c
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20C.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20C_MEMORY_CONTROL_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_20C_MEMORY_CONTROL_CONTRACTS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 20D
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20d
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20D.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20D_FORGET_HIDE_ARCHIVE_DESTRUCTIVE_SEMANTICS.md
- Reports: 1
  - docs/phase-reports/PHASE_20D_FORGET_HIDE_ARCHIVE_DESTRUCTIVE_SEMANTICS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20E
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20e
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20E.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20E_PRIVATE_MODE_TIMED_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_20E_PRIVATE_MODE_TIMED_CONTRACTS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20F
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20f
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20F.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20F_EMERGENCY_LOCKDOWN_CONTRACTS.md
- Reports: 1
  - docs/phase-reports/PHASE_20F_EMERGENCY_LOCKDOWN_CONTRACTS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20G
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20g
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20G.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20G_SENSITIVE_LOCKS_DOMAIN_PERMISSIONS.md
- Reports: 1
  - docs/phase-reports/PHASE_20G_SENSITIVE_LOCKS_DOMAIN_PERMISSIONS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20H
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20h
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20H.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20H_CARNOS_ACCESS_MATRIX.md
- Reports: 1
  - docs/phase-reports/PHASE_20H_CARNOS_ACCESS_MATRIX_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20I
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20i
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20I.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20I_PRIVACY_ACTION_REVIEW_QUEUE.md
- Reports: 1
  - docs/phase-reports/PHASE_20I_PRIVACY_ACTION_REVIEW_QUEUE_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20J
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20j
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20J.T
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20J_TWO_STEP_COOLDOWN_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_20J_TWO_STEP_COOLDOWN_BOUNDARY_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20K
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20k
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20K.D
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20K_DATA_SCOPE_SELECTOR.md
- Reports: 1
  - docs/phase-reports/PHASE_20K_DATA_SCOPE_SELECTOR_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20L
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20l
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20L.E
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20L_EXPORT_MANIFEST_EXPIRATION.md
- Reports: 1
  - docs/phase-reports/PHASE_20L_EXPORT_MANIFEST_EXPIRATION_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20m
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20M.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20M_FORGET_DESTRUCTIVE_MANIFEST_SAFETY.md
- Reports: 1
  - docs/phase-reports/PHASE_20M_FORGET_DESTRUCTIVE_MANIFEST_SAFETY_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20N
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20n
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20N.A
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20N_AUDIT_VIEWER_APPEND_ONLY_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_20N_AUDIT_VIEWER_APPEND_ONLY_BOUNDARY_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20O
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20o
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20O.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20O_PRIVACY_AUDIT_TAXONOMY_REDACTION_BADGES.md
- Reports: 1
  - docs/phase-reports/PHASE_20O_PRIVACY_AUDIT_TAXONOMY_REDACTION_BADGES_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20P
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20p
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20P.D
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20P_DATA_RETENTION_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_20P_DATA_RETENTION_BOUNDARY_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20Q
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20q
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20Q.C
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20Q_CROSS_PHASE_PRIVACY_ENFORCEMENT_MAP.md
- Reports: 1
  - docs/phase-reports/PHASE_20Q_CROSS_PHASE_PRIVACY_ENFORCEMENT_MAP_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20R
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20r
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20R.F
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20R_FUTURE_API_CONNECTOR_FRAMEWORK.md
- Reports: 1
  - docs/phase-reports/PHASE_20R_FUTURE_API_CONNECTOR_FRAMEWORK_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20S
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20s
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20S.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20S_SPOTIFY_CONNECTOR_FOUNDATION.md
- Reports: 1
  - docs/phase-reports/PHASE_20S_SPOTIFY_CONNECTOR_FOUNDATION_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20T
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20t
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20T.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20T_SPOTIFY_OAUTH_PKCE_CALLBACK_BOUNDARY.md
- Reports: 1
  - docs/phase-reports/PHASE_20T_SPOTIFY_OAUTH_PKCE_CALLBACK_BOUNDARY_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20U
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20u
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20U.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20U_SPOTIFY_MEDIA_BOUNDARIES.md
- Reports: 1
  - docs/phase-reports/PHASE_20U_SPOTIFY_MEDIA_BOUNDARIES_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20V
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20v
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20V.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20V_SPOTIFY_CARNOS_ACTION_SAFETY.md
- Reports: 1
  - docs/phase-reports/PHASE_20V_SPOTIFY_CARNOS_ACTION_SAFETY_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20W
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20w
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20W.S
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20W_SPOTIFY_UI_MEDIA_PERMISSION_CARDS.md
- Reports: 1
  - docs/phase-reports/PHASE_20W_SPOTIFY_UI_MEDIA_PERMISSION_CARDS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20X
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20x
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20X.M
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20X_MANUAL_WORKOUT_DEFERRED_CONNECTORS.md
- Reports: 1
  - docs/phase-reports/PHASE_20X_MANUAL_WORKOUT_DEFERRED_CONNECTORS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20Y
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20y
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20Y.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI.md
- Reports: 1
  - docs/phase-reports/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20Z
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase20z
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 20Z.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_20Z_C_WHOLE_PROJECT_INTERCONNECTION_REALITY_AUDIT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20Z.D
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_20Z_D_INTEGRATION_GAP_CLOSURE_PLAN.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: yes

### Phase 20Z.P
- Migrations: 0
- Contracts: 1
  - docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md
- Reports: 1
  - docs/phase-reports/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: no
- Connector signal: yes

### Phase 20ZMIGRATION
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-20z.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 3
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 2
  - scripts/audit-project-integrity-proof.mjs
  - scripts/audit-source-alignment.mjs
- Package scripts: audit:phase3
- Check integrated: yes
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 4
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase4
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: yes
- Connector signal: no

### Phase 4.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_4_CORE_SQL_SPINE_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 4SQL
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-4.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 5
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase5
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: yes
- Connector signal: no

### Phase 5.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_5_CORE_READ_UI_INTEGRATION_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 5FILES
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-phase-5.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 6
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase6
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 6.S
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_6_SAFE_WRITE_PROPOSED_ACTION_FLOW_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 7.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_7_CORE_OPERATING_DASHBOARDS_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 7.M
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 1
  - docs/qa/PHASE_7_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 8
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: audit:phase8
- Check integrated: yes
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 8.2.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_8_2_CAREER_INSPECTION_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 8.C
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_8_CAREER_SYSTEM_COMPLETION_REPORT.md
- QA docs: 1
  - docs/qa/PHASE_8_CAREER_MANUAL_SMOKE_CHECKLIST.md
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 8DASHBOARDINDEX
- Migrations: 0
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 1
  - scripts/audit-integration-sanity.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: no
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: no
- Metrics signal: no
- Connector signal: no

### Phase 9
- Migrations: 1
  - supabase/migrations/0009_phase9_parent_ownership_guards.sql
- Contracts: 0
- Reports: 0
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 9.A
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_9_AUDIT_GATE.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 9.C
- Migrations: 0
- Contracts: 0
- Reports: 2
  - docs/phase-reports/PHASE_9_CHUNK_A_SOURCE_ROUTE_INSPECTION.md
  - docs/phase-reports/PHASE_9_COMPLETION_REPORT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no

### Phase 9.M
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_9_MANUAL_SMOKE_CHECKLIST.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 9.N
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_9_NO_WRITE_PRIVACY_AUDIT.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase 9.S
- Migrations: 0
- Contracts: 0
- Reports: 1
  - docs/phase-reports/PHASE_9_SOURCE_TO_SCOPE_TRACEABILITY.md
- QA docs: 0
- Audit scripts: 0
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: yes
- UI signal: yes
- Schema signal: no
- Contract-heavy signal: no
- Carnos signal: yes
- Metrics signal: no
- Connector signal: no

### Phase unknown
- Migrations: 9
  - supabase/migrations/0001_profiles_and_carnos_profiles.sql
  - supabase/migrations/0002_audit_and_ai_actions.sql
  - supabase/migrations/0003_chat_foundation.sql
  - supabase/migrations/0004_goals_foundation.sql
  - supabase/migrations/0005_daily_logs_and_proof_items.sql
  - supabase/migrations/0006_tasks_and_events.sql
  - supabase/migrations/0007_career_system_foundation.sql
  - supabase/migrations/0008_learning_project_system_foundation.sql
  - supabase/migrations/0028_memory_rag_schema_alignment.sql
- Contracts: 1
  - docs/contracts/LOCAL_CARNOS_RUNTIME_CHUNK_LOCK.md
- Reports: 1
  - docs/phase-reports/LOCAL_CARNOS_RUNTIME_CHUNK_LOCK_REPORT.md
- QA docs: 2
  - docs/qa/LOCAL_CARNOS_RUNTIME_CHUNK_LOCK_SMOKE_CHECKLIST.md
  - docs/qa/QUIET_VERIFICATION_SYSTEM.md
- Audit scripts: 10
  - scripts/audit-full-system-interconnection-truth.mjs
  - scripts/audit-integration-schema-reality.mjs
  - scripts/audit-phase-1-7-crosswalk.mjs
  - scripts/audit-phase-13-5.mjs
  - scripts/audit-phase-3.mjs
  - scripts/audit-phase-6.mjs
  - scripts/audit-phase-8.mjs
  - scripts/audit-pre-grimoire-core-gaps.mjs
  - scripts/audit-python-ml-boundary.mjs
  - scripts/audit-whole-project-interconnection-reality.mjs
- Package scripts: none
- Check integrated: no
- Runtime/source mapping signal: no
- UI signal: yes
- Schema signal: yes
- Contract-heavy signal: yes
- Carnos signal: yes
- Metrics signal: yes
- Connector signal: no


## Suspicious Phase-Level Mappings

### Phase 15C.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5B.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5C.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5D.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5E.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5F.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5G.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5H.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5I.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16.5J.C
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16E.Q
- contract/report-heavy with no direct source/migration mapping detected
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16F.C
- contract/report-heavy with no direct source/migration mapping detected
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16G.S
- contract/report-heavy with no direct source/migration mapping detected
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16H.B
- contract/report-heavy with no direct source/migration mapping detected
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 16H.C
- contract/report-heavy with no direct source/migration mapping detected
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17A.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17B.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 3
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17C.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17D.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17E.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17F.A
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17Q-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 17Q.F
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18A_B-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18A-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18A.A
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18A.B
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18B_B-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18B-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18C-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18D-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18E-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18F-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18G-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18H-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18I-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18I.T
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18J-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18K-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18L-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18M_B-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18M-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 18N-BUILD-MARKER
- has package audit script but is not check-integrated
- Contracts: 0
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 19C.F
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20B.C
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20C.M
- contract/report-heavy with no direct source/migration mapping detected
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20D.F
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20E.P
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20F.E
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20G.S
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20H.C
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20I.P
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20J.T
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20K.D
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20L.E
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20M.F
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20N.A
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20O.P
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20P.D
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20Q.C
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20R.F
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20S.S
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20T.S
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20U.S
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20V.S
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20W.S
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20X.M
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20Y.P
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase 20Z.P
- contract/report-heavy with no direct source/migration mapping detected
- connector phase appears boundary-only
- Carnos phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 0
- Source mappings: 0
- Check integrated: no

### Phase unknown
- Carnos phase appears contract-heavy without direct runtime mapping
- metrics/analytics phase appears contract-heavy without direct runtime mapping
- Contracts: 1
- Migrations: 9
- Source mappings: 0
- Check integrated: no


## Required Human Review Questions

- Which weak pages are intentional post-v1 pages?
- Which delegated pages actually call repository/helper data after component-level inspection?
- Which contract-heavy phases must become runtime before v1?
- Which tables need write flows versus read-only dashboards?
- Should Spotify be implemented before v1 or explicitly marked post-v1?
- Does Carnos have enough real read/write/audit capability for v1?
- Do metrics/analytics use real user data or mostly summaries/contracts?
- Are all primary navigation items honest about whether they are operational?


## Recommended Fix Order

1. Verify delegated dashboards with targeted audits, not shallow page-only scans.
2. Fix or defer weak pages.
3. Add repository coverage for tables with no real repository usage.
4. Add end-to-end smoke tests for core flows: goals, tasks, calendar, Carnos chat, proof, health, finance, memory, privacy.
5. Decide Spotify: real connector before v1 or post-v1.
6. Only then proceed to Phase 21 final polish.
