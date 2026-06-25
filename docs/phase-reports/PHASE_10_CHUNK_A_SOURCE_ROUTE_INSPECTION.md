# Phase 10 Chunk A — Source and Route Inspection

## Scope

Chunk A covers:

- 10.1 Source-of-truth inspection
- 10.2 Phase 10 plan lock
- 10.3 Existing route/component inspection

No app code, SQL, database types, repositories, dashboard implementations, or old phase files are modified in Chunk A except logs and planning documents.

## Inspection Basis

Chunk A was based on terminal inspection of:

- repo state
- Phase 9 status references
- source-of-truth references
- existing phase plan/report files
- existing research-like routes
- route map and canonical routes
- dashboard registry and layout contracts
- reusable dashboard components
- action preview components
- proposed-action contracts
- read helpers
- database types
- migration sequence
- migration validator

## Confirmed Reusable Foundations

### Authenticated Dashboard Shell

The repo has AuthenticatedDashboardShell, which uses:

- getDashboardAuthState
- authenticated dashboard gating
- signed-out empty state
- unavailable read empty state
- SectionCard
- EmptyState

This is suitable for Phase 10 read-first dashboards.

### Cross-Dashboard Links

The repo has CrossDashboardLinks.

Existing link groups include:

- core dashboard links
- career dashboard links

Phase 10 can later add research/Stanford cross-link wrappers without changing existing Phase 7, Phase 8, or Phase 9 navigation.

### Proposed-Action Preview

The repo has ProposedActionReviewCard.

It supports:

- disabled state
- save/cancel/edit labels
- validation issues
- JSON payload preview
- optional callbacks

Phase 10 should use disabled previews inside dashboards unless a later safe-write chunk explicitly wires server-owned persistence.

## Confirmed Proposed-Action Contract State

Existing proposed action types:

- create_task
- create_goal
- create_daily_log
- create_proof_item

Existing proposed action domains include:

- career
- learning
- research
- projects
- general

Existing valid proof types:

- text
- link
- file
- image
- code
- metric
- note

Phase 10 previews must use only valid action types, domains, and proof types unless contracts are intentionally expanded later.

## Confirmed Existing Research-Adjacent Foundations

Existing database/types/read-helper inspection already shows these research-adjacent pieces:

- research_target
- research_relevance
- learning session type: research
- quiz type: research_review
- project type: research
- project type: experiment
- project link type: paper
- project link type: reference
- project link type: proof

Existing Phase 9 and earlier domains available for linkage:

- goals
- goal milestones
- proof items
- tasks
- resume versions
- resume bullets
- skill paths
- skills
- skill prerequisites
- learning sessions
- quizzes
- quiz attempts
- projects
- project milestones
- project bugs
- project tests
- project releases
- project links
- skill progress

## Confirmed Migration State

Existing migrations stop at:

- 0009_phase9_parent_ownership_guards.sql

Therefore Phase 10 SQL must begin with:

- 0010_phase10_research_stanford_foundation.sql

If ownership hardening is needed after the foundation migration, it should use:

- 0011_phase10_parent_ownership_guards.sql

Old migrations 0001 through 0009 must not be edited.

## Migration Validator Constraints

The migration validator enforces:

- canonical migration filenames
- sequential migration numbers
- non-empty migration files
- no corrupted copied math markers
- no referencespublic. whitespace mistakes
- no disabled row level security
- RLS enablement for migrations that create tables
- SELECT and INSERT policies for user-owned tables
- user ID indexes for user-owned tables
- no memory_items before the dedicated memory phase

Phase 10 SQL must obey these constraints.

## Phase 10 Risk Boundaries

Phase 10 must not break old phases by:

- renaming existing types
- editing old migrations
- removing exports from shared barrels
- changing existing dashboard shell behavior
- changing auth/session behavior
- changing shared component props
- adding hidden writes
- adding dashboard mutations
- adding OpenAI/web/Python execution inside dashboards
- creating memory_items
- adding autonomous emails
- adding uncontrolled background jobs

## Locked Phase 10 Plan

Phase 10 is locked as:

- 36 total steps
- 11 chunks

Chunk split:

- Chunk A: 10.1-10.3
- Chunk B: 10.4-10.6
- Chunk C: 10.7
- Chunk C.1: 10.8
- Chunk D: 10.9
- Chunk E: 10.10-10.12
- Chunk F: 10.13-10.15
- Chunk G: 10.16-10.17
- Chunk H: 10.18-10.19
- Chunk I: 10.20-10.27
- Chunk J: 10.28-10.33
- Chunk K: 10.34-10.36

## Chunk A Conclusion

Chunk A confirms that Phase 10 can proceed as a new isolated Research / Stanford layer.

The next chunk is Chunk B:

- 10.4 Research schema design
- 10.5 Stanford/PhD schema design
- 10.6 Source-to-scope traceability matrix
