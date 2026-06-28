# Phase 1–13 Full Source Scope Gap Audit

Status: Initial locked audit.
Repair phase: Phase 13.5.

## Purpose

This audit locks the source-vs-repo gaps found before Phase 14 Voice Foundation.

The goal is not to shame previous work. The goal is to prevent hidden scope loss before continuing.

## Evidence base

Primary evidence:

- FINAL_SYNCED Implementation Bible DOCX in `docs/source-of-truth/`
- FINAL_SYNCED Source-of-Truth JSON in `docs/source-of-truth/`
- latest `docs/audits/source_scope_snapshot_*`
- repository migrations
- repository routes
- repository API routes
- repository components
- repository phase reports
- repository audit scripts

## Status categories

- **Built**: source scope is implemented in SQL/types/routes/UI/API/docs/audit.
- **Partial**: some source scope exists but important parts are missing.
- **Missing**: no clear implementation evidence found.
- **Renamed/equivalent**: source concept exists under a different repo name.
- **Future phase**: belongs to Phase 14+.
- **Post-v1**: intentionally moved after v1.
- **Out of scope**: explicitly not part of current implementation.
- **Needs verification**: evidence is unclear and must be checked manually or by script.

## High-level result

Most foundations through Phase 13 are present, but earlier completed scope is not clean enough to start Phase 14 yet.

Phase 13.5 must repair or explicitly classify every gap below.

## Gap Matrix

| Area | Source expectation | Repo evidence | Current status | Phase 13.5 action |
|---|---|---|---|---|
| Carnos text persistence | User can send typed Carnos messages and store sessions/messages | `chat_sessions`, `chat_messages`, `/api/carnos/messages`, `CarnosMessageComposer` | Built/minimal | Verify and keep |
| Carnos full chat experience | Text Chat card, message history, session summary, safe conversational surface | `/carnos` reads sessions/messages and has composer | Partial | Improve thread/read UI and explicit boundaries |
| Carnos persona prompt v1 | Persona prompt/version/personality contract | `carnos_profiles` exists; no clear `persona_prompt_versions` migration | Partial/Missing | Add persona prompt/version foundation |
| Carnos persona routing | Mode/persona labels and safe response rules | Copy and boundaries exist, routing unclear | Partial | Add contract and route-safe persona metadata |
| Carnos assistant replies | Carnos responds conversationally | Generation disabled intentionally | Partial/Future-limited | Add explicit disabled boundary; do not fake LLM |
| AI extraction | typed/voice input can become proposed action after validation | `/api/ai/extract`, Zod proposed-action validation | Built/shell | Verify no autonomous writes |
| Pending updates | proposed actions approval/rejection | approve/reject APIs and drawer | Built | Verify |
| Goals/proof | goals, milestones, daily logs, proof items, proposed-action writes | core tables and proposed-action flows exist | Built/partial CRUD | Keep safe-write; document edit/delete limits |
| Timeline events | timeline write/event boundary | `events` exists; `timeline_events` not clearly defined | Partial | Clarify schema/boundary and repair if source requires |
| Calendar blocks | calendar block/time-block scope | no clear table evidence | Missing/needs verification | Add if source-completed scope requires |
| Routines | routines and routine steps | no clear table evidence | Missing | Add routine foundation |
| Reminders | reminders/notifications foundation | no clear table evidence | Missing/needs verification | Add if source-completed scope requires |
| Career applications | job apps/events | implemented | Built | Verify |
| Career networking/referrals | contacts/interactions/referrals | implemented as `job_referrals` | Built/renamed | Verify equivalent |
| Career resumes | resume versions/bullets | implemented | Built | Verify |
| Career interviews | interviews route/table | implemented | Built/partial | Repair mock/question/story layer |
| Behavioral stories | STAR/story bank | no clear table evidence | Missing | Add |
| Question bank | interview questions/practice bank | no clear table evidence | Missing | Add |
| Mock interviews | mock interview practice records | no clear table evidence | Missing | Add if source requires |
| Resume usage | resume usage tracking | no clear table evidence | Missing/needs verification | Add if source requires |
| Learning | skills, paths, sessions, quizzes, progress | implemented | Built | Verify |
| Projects | projects, milestones, bugs, tests, releases, links | implemented | Built | Verify |
| Project proofs | project proof linkage | may be equivalent via proof_items/project links | Renamed/equivalent/needs verification | Document or patch |
| Research | ideas/questions/literature/claims/experiments/results/papers | implemented with rich schema | Built/renamed | Verify |
| Stanford/PhD | universities/labs/professors/SOP/recs/assets | implemented with renamed richer schema | Built/renamed | Verify |
| Research notes | research notes | no clear table evidence | Missing/needs verification | Add or classify |
| Health/body | body/workout/nutrition/supplement/sleep/energy/mental/emotion/journal/skin/hair/products | implemented | Built | Verify |
| Progress photos | body photo evidence/storage | intentionally deferred/no storage | Deferred | Keep documented; do not fake uploads |
| Life admin/finance | accounts/budgets/logs/subscriptions/docs/housing | implemented | Built | Verify |
| Grimoire | modes/logs/skills/corruption/reversions | implemented | Built | Verify |
| App settings | app settings table/foundation | settings route exists; no clear table | Missing/needs verification | Add foundation if source expects |
| Privacy settings | privacy setting table/foundation | privacy route exists; full Phase 19 future | Partial | Add basic table if source expects; keep export/delete future |
| Creativity | creative skills/sessions/outputs | route exists; table unclear | Placeholder/needs decision | Build foundation or post-v1 |
| Decisions | decision journal | route exists; table unclear | Placeholder/needs decision | Build foundation or post-v1 |
| Future simulator | future scenarios | route exists; table unclear | Placeholder/needs decision | Build foundation or post-v1 |
| World-class | world-class levels/evidence/reviews | route exists; table unclear | Placeholder/needs decision | Build foundation or post-v1 |
| Voice | voice sessions/transcripts/STT/TTS | not built | Future phase | Phase 14 |
| Memory/RAG | memory inbox/embeddings/knowledge retrieval | not built | Future phase | Phase 15 |
| Web search | jobs/labs/papers/current resources/citations | not built | Future phase | Phase 16 |
| Analytics/experiments | correlations/snapshots/experiments | not built | Future phase | Phase 17 |
| Custom trackers | dynamic tracker builder | not built | Future phase | Phase 18 |
| Export/delete/private mode | full data controls | not built | Future phase | Phase 19 |
| Final polish/website/deploy | responsive, demo, screenshots, deploy | not built | Future phase | Phase 20 |

## Phase 13.5 repair sequence

1. 13.5A — Formal Gap Lock.
2. 13.5B — Carnos Persona + Chat Completion Repair.
3. 13.5C — Calendar / Timeline / Routine Repair.
4. 13.5D — Career Story / Question Bank / Mock Interview Repair.
5. 13.5E — Settings / Privacy Foundation Repair.
6. 13.5F — Placeholder Route Scope Decision.
7. 13.5G — Final Source Coverage Audit.

## Locked next phase after repair

Only after 13.5G passes:

- Phase 14 — Voice Foundation.

## Machine-check source gap markers

These exact markers are intentionally present for the Phase 13.5 audit gate and must remain until repaired or explicitly classified:

- calendar_blocks
- routines
- routine_steps
- behavioral_stories
- question_bank
- mock_interviews
- app_settings
- privacy_settings
- persona_prompt_versions
- Phase 13.5G

## Phase 13.5G final audit requirement

Phase 13.5G must rerun a full source-vs-repo snapshot and prove every completed-scope gap through Phase 13 is Built, Repaired, Renamed/equivalent, Future phase, Post-v1, or explicitly Out of scope.
