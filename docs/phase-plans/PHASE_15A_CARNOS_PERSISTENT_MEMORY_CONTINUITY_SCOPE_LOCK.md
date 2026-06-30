# Phase 15A — Carnos Persistent Memory + Continuity Scope Lock

Status: Locked for implementation.

## Source-of-truth alignment

Phase 15 begins after Phase 14 / JSON chunk 16 Voice Foundation.

Phase 14 was completed and pushed at commit:

- `56c1c7f Add Phase 14J final voice text hardening`

Phase 15 aligns to JSON chunk 17:

- `17 Memory/RAG`
- Goal: Memory inbox, approved memories, embeddings, knowledge vault retrieval.

This scope lock expands the practical implementation name to:

> Phase 15 — Carnos Persistent Memory + Continuity Foundation

This is not a scope change away from the source-of-truth. It is a safer and more explicit implementation interpretation of Memory/RAG for ascendOS and Carnos.

## Core Phase 15 purpose

Phase 15 makes Carnos feel like a persistent Jarvis-like AI companion inside ascendOS.

Carnos should not feel like a fresh chatbot every time. Carnos should know what is going on across the user's life OS, projects, goals, phases, source-of-truth documents, preferences, routines, open loops, and current execution state.

Carnos should have controlled continuity through:

- User-controlled long-term memory.
- Memory candidates.
- Memory Inbox.
- Approved memories.
- Rejected memories.
- Forgotten memories.
- Carnos entity state.
- Project memory.
- System state memory.
- Conversation continuity records.
- Knowledge vault separation.
- Current context pack builder.
- Retrieval with provenance.
- Privacy controls.
- Sensitive memory locks.
- Audit logs.
- Forget/delete controls.
- Whole-project connectivity.

## Core safety rule

Carnos should know what is going on every time the user returns, but it must never silently store, misuse, expose, distort, over-trust, or hide memory behavior.

## Phase 15 global rules

These rules apply to all Phase 15 chunks:

- No silent memory.
- No hidden memory retrieval.
- No automatic transcript-to-memory.
- No direct autonomous memory writes.
- No embeddings before approval.
- No unapproved memory in long-term context.
- No forgotten memory retrieval.
- No private-mode memory saving.
- No private-mode embedding generation.
- No sensitive memory injection unless relevant and allowed.
- No standalone `/memory` route unless the source-of-truth is explicitly updated.
- `/privacy` is the memory control surface.
- `/carnos` is the Carnos memory visibility surface.
- `/knowledge` is the future knowledge vault surface.
- Carnos must surface uncertainty when memory may be stale.
- Carnos must surface conflict instead of pretending certainty.
- Higher source-of-truth wins over weaker or older memory.
- User approval/review is required before candidate memory becomes approved memory.
- Forgotten memory must not survive through embeddings, links, summaries, or retrieval logs.

---

# Locked Phase 15 feature distribution

## 15A — Persistent Memory + Continuity Scope Lock

15A locks the full Phase 15 contract before implementation.

15A must lock:

- Carnos Jarvis-like continuity goal.
- Carnos as persistent AI persona/entity inside ascendOS.
- User-controlled long-term memory.
- Memory candidates.
- Memory Inbox.
- Approved Memories.
- Rejected Memories.
- Forgotten Memories.
- Conversation continuity records.
- Project continuity records.
- System state memory.
- Carnos entity state.
- Current context pack builder.
- Knowledge vault separation.
- Retrieval contract.
- Embedding boundary.
- Privacy controls.
- Private mode memory blocking.
- Do-not-remember rules.
- Sensitive memory locks.
- Memory provenance.
- Memory confidence.
- Memory staleness.
- Memory review dates.
- Memory priority/ranking.
- Memory conflict resolution.
- Source-of-truth hierarchy.
- Memory usage transparency.
- Memory audit logs.
- Forget/delete derived records.
- Whole-project connectivity.
- No silent memory.
- No automatic transcript-to-memory.
- No direct autonomous memory writes.
- No embeddings before approval.
- No hidden memory retrieval.
- No standalone `/memory` route yet.
- `/privacy` as memory control surface.
- `/carnos` as Carnos memory visibility surface.
- `/knowledge` as future knowledge vault surface.

15A forbids:

- No SQL migrations.
- No memory tables.
- No vector tables.
- No pgvector.
- No embeddings.
- No provider calls.
- No OpenAI calls.
- No RAG runtime.
- No automatic memory capture.
- No voice transcript auto-memory.
- No hidden Carnos prompt injection.
- No background memory jobs.
- No new memory routes.

## 15B — Memory SQL Foundation

15B creates the safe database foundation.

15B must include tables or clearly scoped table foundations for:

- `memory_candidates`
- `memory_items`
- `memory_links`
- `memory_events`
- `memory_preferences`
- `memory_do_not_remember_rules`
- `carnos_entity_state`
- `carnos_context_snapshots`
- `project_memory_state`
- `system_memory_state`
- `knowledge_items`
- `knowledge_tags`
- `knowledge_links`
- `retrieval_logs`
- `memory_usage_logs`
- `memory_review_queue`

15B must include database concepts:

- `user_id` ownership.
- RLS policies.
- `created_at`.
- `updated_at`.
- `archived_at`.
- `forgotten_at`.
- `source_type`.
- `source_table`.
- `source_id`.
- `source_route`.
- `source_phase`.
- `source_commit`.
- `memory_type`.
- `memory_status`.
- `sensitivity_level`.
- `confidence`.
- `priority`.
- `staleness_status`.
- `review_after`.
- `last_confirmed_at`.
- `private_mode_created` flag if needed.

15B must not include:

- Real embeddings provider.
- Automatic memory writes.
- Background ingestion.
- Hidden Carnos retrieval.

## 15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules

15C defines TypeScript contracts and validation.

15C must include memory types:

- `preference`
- `goal`
- `project_fact`
- `project_decision`
- `routine`
- `system_state`
- `carnos_entity_state`
- `source_of_truth_note`
- `conversation_continuity`
- `user_profile_fact`
- `sensitive_note`
- `knowledge_item`
- `voice_transcript_candidate`
- `research_note`
- `career_context`
- `health_context`
- `grimoire_context`
- `privacy_rule`
- `do_not_remember_rule`

15C must include statuses:

- `candidate`
- `pending_review`
- `approved`
- `edited`
- `rejected`
- `archived`
- `forgotten`
- `stale`
- `needs_review`
- `blocked_by_private_mode`
- `blocked_by_do_not_remember`

15C must include sensitivity levels:

- `low`
- `medium`
- `high`
- `restricted`

15C must include conflict handling rules:

- Newer source can override older memory.
- Source-of-truth docs beat conversation memory.
- Repo logs beat stale chat assumptions.
- Approved memory beats candidate memory.
- Forgotten memory must never be retrieved.
- Restricted memory must not be casually injected.
- Stale memory must require caution.
- Conflicting memories must surface conflict instead of pretending certainty.

15C must include validation for:

- Memory candidate payload.
- Approved memory payload.
- Forget memory payload.
- Edit memory payload.
- Retrieval result payload.
- Context pack payload.
- Carnos entity state payload.
- Project memory state payload.
- Knowledge item payload.

## 15D — Memory Candidate Engine

15D creates the candidate/proposal layer.

15D candidate sources must include:

- Manual user “remember this”.
- Manual user “do not remember this”.
- Chat message.
- Voice transcript draft.
- Project state update.
- Phase completion.
- Goal update.
- Career update.
- Learning update.
- Research update.
- Health/body update.
- Grimoire update.
- Source-of-truth change.
- System decision.

15D must support candidate actions:

- Create candidate.
- Preview candidate.
- Classify candidate type.
- Assign sensitivity.
- Assign confidence.
- Assign source/provenance.
- Assign priority.
- Detect possible duplicate.
- Detect possible conflict.
- Block candidate if private mode is on.
- Block candidate if do-not-remember rule applies.

15D must not:

- Save directly to approved memory.
- Create embeddings.
- Inject into Carnos silently.
- Write without review.

## 15E — Memory Inbox UI

15E creates the user review surface.

15E must show:

- Pending memory candidates.
- Candidate type.
- Candidate content.
- Source/provenance.
- Sensitivity level.
- Confidence.
- Priority.
- Created time.
- Possible duplicate warning.
- Possible conflict warning.
- Private mode warning.
- Do-not-remember warning.

15E must include user actions:

- Approve.
- Edit.
- Reject.
- Archive.
- Forget.
- Mark sensitive.
- Lower sensitivity.
- Raise sensitivity.
- Merge duplicate.
- Resolve conflict.
- Save as project memory.
- Save as user memory.
- Save as Carnos entity state.
- Save as knowledge item.
- Create do-not-remember rule.

15E must enforce:

- No candidate becomes approved memory without user action.
- Sensitive/restricted candidates require clear review.
- Forgotten/rejected candidates do not appear as usable memory.

## 15F — Privacy, Private Mode, Do-Not-Remember Rules

15F connects memory to `/privacy`.

15F must include privacy controls:

- Memory on/off.
- Private mode.
- Auto-candidate mode.
- Ask-every-time mode.
- Approved-categories-only mode.
- Blocked memory categories.
- Sensitive memory categories.
- Restricted memory categories.
- Do-not-remember rules.
- Forget memory controls.
- Forget all from source.
- Forget all by category.
- Export memory placeholder.
- Delete memory placeholder.

15F private mode rules:

- Private mode blocks new memory candidates.
- Private mode blocks memory saves.
- Private mode blocks embeddings.
- Private mode blocks voice transcript memory.
- Private mode blocks background memory behavior.
- Private mode should visibly explain what was blocked.

15F do-not-remember rules:

- Do not remember this.
- Do not remember this conversation.
- Do not remember this category.
- Do not remember from this source.
- Do not remember health/body.
- Do not remember emotions.
- Do not remember career applications.
- Do not remember voice transcripts.
- Do not remember grimoire entries.

## 15G — Approved Memory Read Layer + Ranking/Staleness Rules

15G creates safe read helpers.

15G must filter by:

- `user_id`.
- Approved status only.
- Not forgotten.
- Not blocked.
- Not archived unless requested.
- Sensitivity.
- Private mode.
- Do-not-remember rules.
- Source.
- Memory type.
- Priority.
- Staleness.
- Relevance.

15G must include ranking rules:

- Source-of-truth memory highest.
- Active project state high.
- Current phase state high.
- User explicit preferences high.
- Safety/privacy rules highest.
- Recent confirmed memories higher than stale memories.
- Old conversation memories lower.
- Sensitive memory retrieved only when relevant and allowed.

15G must include staleness rules:

- Current weight can become stale.
- Current job search state can become stale.
- Current repo phase can become stale.
- Current routine can become stale.
- Goals can become stale.
- Source-of-truth decisions remain strong until superseded.

15G read outputs must include:

- Memory content.
- Memory type.
- Source/provenance.
- Confidence.
- Priority.
- Sensitivity.
- Staleness status.
- `last_confirmed_at`.
- Why included.

## 15H — Carnos Entity State

15H creates Carnos’s persistent persona/entity layer.

15H must include:

- Carnos name.
- Carnos role.
- Carnos mission.
- Carnos tone.
- Carnos behavior rules.
- Carnos safety rules.
- Carnos current operating mode.
- Carnos current active project.
- Carnos current phase.
- Carnos latest milestone.
- Carnos next objective.
- Carnos forbidden behaviors.
- Carnos response preferences.
- Carnos memory policy.
- Carnos voice policy.
- Carnos action policy.

15H must store rules like:

- Give exact terminal commands for repo work.
- Do not silently write.
- Do not silently remember.
- Do not pretend certainty.
- Do not ignore source-of-truth hierarchy.
- Do not use outdated roadmap memory.
- Ask/preview before important writes.
- Protect sensitive memories.
- Surface conflicts instead of hiding them.

15H is what makes Carnos feel like the same assistant/entity every time.

## 15I — Project/System State Memory + Source-of-Truth Hierarchy

15I makes Carnos aware of active projects and operational state.

15I must include project state fields:

- `project_name`.
- `repo_path`.
- `remote_url`.
- `current_branch`.
- `latest_commit`.
- `last_pushed_commit`.
- `current_phase`.
- `completed_phases`.
- `next_phase`.
- `source_of_truth_files`.
- `implementation_boundaries`.
- `deferred_items`.
- `known_errors`.
- `audit_status`.
- `build_status`.
- `last_check_status`.

15I must include ascendOS-specific state:

- App name: ascendOS.
- AI persona: Carnos.
- Source of truth: FINAL_SYNCED DOCX/JSON.
- Old 15-phase roadmap is outdated.
- JSON chunks 0–21 are active.
- Phase 14 complete at commit `56c1c7f`.
- Current next phase: Phase 15A.

15I must include source hierarchy:

- FINAL_SYNCED JSON/DOCX.
- Repo files.
- Phase reports.
- `PHASE_STATUS.md`.
- `PROJECT_EXECUTION_LOG.md`.
- `CODE_LEDGER.md`.
- Git commits.
- Current conversation.
- Older memory.
- Outdated roadmap memory.

15I rule:

- Higher source-of-truth beats lower source when conflicts exist.

## 15J — Current Context Pack Builder + Context Budget Rules

15J creates the Jarvis-like “knows what is going on” pack.

15J context pack must include:

- Carnos entity state.
- User profile memory.
- Active project state.
- Current phase state.
- Latest milestone.
- Next objective.
- Active goals.
- Open loops.
- Recent decisions.
- Relevant approved memories.
- Relevant knowledge items.
- Privacy settings.
- Sensitive memory restrictions.
- Do-not-remember rules.
- Source-of-truth hierarchy.
- Conflict warnings.
- Staleness warnings.

15J context budget rules:

- Do not load every memory.
- Load only relevant memories.
- Prefer current active project.
- Prefer latest source-of-truth state.
- Prefer explicit user preferences.
- Prefer safety/privacy rules.
- Avoid unrelated sensitive memory.
- Avoid stale memory unless needed.
- Show uncertainty when memory may be outdated.

15J is the core “Carnos knows exactly what is happening” system.

## 15K — Carnos Memory Visibility Panel

15K adds transparency inside `/carnos`.

15K must show:

- What Carnos currently knows.
- What Carnos is using right now.
- Current project.
- Current phase.
- Latest milestone.
- Next objective.
- Active memory mode.
- Private mode status.
- Pending memory candidates.
- Recently approved memories.
- Recently forgotten memories.
- Sensitive memory lock status.
- Source-of-truth status.
- Context pack preview.
- Memory safety boundaries.

15K must include user controls:

- Review pending memory.
- Open privacy memory controls.
- Forget selected memory.
- Mark selected memory sensitive.
- Turn private mode on/off if available.
- View why Carnos used a memory.

15K prevents hidden AI behavior.

## 15L — Knowledge Vault Foundation

15L separates knowledge from personal memory.

15L knowledge vault must support:

- Source docs.
- Project docs.
- Implementation bibles.
- Research notes.
- Uploaded file metadata.
- Phase reports.
- Audit reports.
- Technical notes.
- Saved references.
- Knowledge tags.
- Knowledge links.
- Source-of-truth references.

15L must separate:

- Personal/user memory.
- Carnos entity state.
- Project/system state.
- Knowledge items.
- Voice transcripts.
- Analytics records.

15L rules:

- Knowledge vault is not personal memory.
- Knowledge items need source/provenance.
- Uploaded docs are not automatically embedded.
- Uploaded docs are not automatically turned into personal memory.
- Source-of-truth docs can be marked high authority.

## 15M — Retrieval Contract + Provenance + Conflict Handling

15M defines retrieval before full production RAG.

15M retrieval result must include:

- `id`.
- `content`.
- `memory_type`.
- `source_type`.
- `source_id`.
- `source_route`.
- `created_at`.
- `updated_at`.
- `last_confirmed_at`.
- `confidence`.
- `priority`.
- `sensitivity`.
- `staleness_status`.
- `retrieval_score`.
- `why_matched`.
- `conflict_status`.
- `allowed_for_context`.

15M retrieval must handle:

- Approved memory only.
- Knowledge items separately.
- Project state separately.
- Carnos entity state separately.
- Source-of-truth ranking.
- Stale memory warnings.
- Conflicting memory warnings.
- Sensitive memory gating.
- Private mode restrictions.
- Do-not-remember restrictions.
- Forgotten memory exclusion.

15M must not do:

- Hidden retrieval.
- Unexplained memory injection.
- Retrieval from forgotten memories.
- Retrieval from unapproved candidates.
- Retrieval that bypasses privacy.

## 15N — Embedding Boundary / Noop Provider

15N prepares embeddings safely.

15N must include:

- Embedding provider interface.
- Noop embedding provider.
- Provider disabled by default.
- Env validation placeholder.
- Approved-memory-only embedding rule.
- Knowledge-item embedding rule.
- No candidate embedding by default.
- No sensitive embedding without explicit allowance.
- Embedding metadata.
- Embedding source link.
- Embedding created audit event.
- Embedding removed audit event.

15N must block:

- OpenAI embedding calls by default.
- Embedding unapproved memory.
- Embedding private-mode memory.
- Embedding forgotten memory.
- Embedding blocked categories.
- Automatic background embedding.

15N forget rule:

- Forgetting memory must remove or disable related embeddings.

## 15O — Forget/Delete Derived Records

15O makes forgetting real.

15O must handle:

- Forget memory item.
- Reject candidate.
- Archive memory.
- Delete derived embedding.
- Delete memory links.
- Delete retrieval references where required.
- Delete or detach knowledge links.
- Delete source attachment links if required.
- Mark memory as forgotten.
- Prevent future retrieval.
- Record forget event.

15O must support future controls:

- Forget one memory.
- Forget all from source.
- Forget all by category.
- Forget all voice-derived candidates.
- Forget all sensitive memories.
- Forget project memory.
- Forget Carnos entity override.

15O no ghost memory rule:

- Forgotten memory must not survive through embeddings, links, summaries, or retrieval logs.

## 15P — Memory Audit Events + Memory Usage Transparency

15P logs memory behavior.

15P must audit:

- `candidate_created`
- `candidate_blocked_private_mode`
- `candidate_blocked_do_not_remember`
- `candidate_approved`
- `candidate_edited`
- `candidate_rejected`
- `candidate_archived`
- `memory_created`
- `memory_updated`
- `memory_marked_sensitive`
- `memory_forgotten`
- `memory_retrieved`
- `memory_used_in_context_pack`
- `memory_used_in_carnos_response`
- `embedding_created`
- `embedding_removed`
- `retrieval_blocked`
- `private_mode_enabled`
- `private_mode_disabled`
- `do_not_remember_rule_created`
- `do_not_remember_rule_removed`
- `conflict_detected`
- `stale_memory_detected`

15P transparency features:

- Show what memory was used.
- Show why memory was used.
- Show source/provenance.
- Show sensitivity.
- Show if memory was stale.
- Show if conflict existed.
- Show if private mode blocked memory.

## 15Q — Cross-Domain Integration Preview

15Q connects the whole project to memory safely.

15Q must represent these domains:

- `/command`
- `/carnos`
- `/calendar`
- `/timeline`
- `/goals`
- `/career`
- `/learning`
- `/research-stanford`
- `/body`
- `/nutrition`
- `/grimoire`
- `/analytics`
- `/privacy`
- `/custom-trackers`
- `/knowledge`

15Q domain examples:

- Command → current priorities, open loops, daily operating state.
- Carnos → conversation continuity, proposed memories, entity state.
- Timeline → memory audit events and continuity events.
- Goals → stable goals, completed goals, stale goals.
- Career → target roles, resume decisions, job search context.
- Learning → skill focus, weak areas, study preferences.
- Research → paper ideas, professor feedback, PhD plans.
- Body/Nutrition → sensitive routines and preferences only with controls.
- Grimoire → symbolic-to-practical operating modes and corruption checks.
- Analytics → pattern summaries later, not silent memory.
- Privacy → memory controls and private mode.
- Custom Trackers → tracker definitions and user-approved patterns.
- Knowledge → docs, notes, source references.

15Q rules:

- Domains propose memory candidates.
- Memory system approves/rejects/forgets.
- Carnos reads approved memory through context pack.
- Timeline/audit records memory events.
- Privacy controls override all domains.

## 15R — Final Audit, Smoke Checklist, Completion Report

15R closes Phase 15.

15R must verify:

- 15A–15R files exist.
- Memory SQL foundation exists.
- RLS exists for memory tables.
- Types/schemas exist.
- Candidate engine exists.
- Memory Inbox exists or is clearly previewed.
- Privacy/private mode rules exist.
- Do-not-remember rules exist.
- Approved memory read layer exists.
- Carnos entity state exists.
- Project/system state exists.
- Context pack builder exists.
- Carnos memory visibility exists.
- Knowledge vault foundation exists.
- Retrieval contract exists.
- Embedding boundary/noop provider exists.
- Forget/delete derived records rule exists.
- Memory audit events exist.
- Cross-domain integration preview exists.
- No silent memory exists.
- No automatic transcript-to-memory exists.
- No hidden retrieval exists.
- No unapproved embeddings exist.
- No standalone `/memory` route exists unless source-of-truth updated.
- `/privacy` is memory control surface.
- `/carnos` is memory visibility surface.
- `/knowledge` is knowledge vault surface.
- `npm run check` passes.
- Build passes.
- Phase report exists.
- Smoke checklist exists.
- Completion report exists.

---

# Final locked simplified list

The locked Phase 15 implementation map is:

1. 15A — Persistent Memory + Continuity Scope Lock.
2. 15B — Memory SQL Foundation.
3. 15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules.
4. 15D — Memory Candidate Engine.
5. 15E — Memory Inbox UI.
6. 15F — Privacy, Private Mode, Do-Not-Remember Rules.
7. 15G — Approved Memory Read Layer + Ranking/Staleness Rules.
8. 15H — Carnos Entity State.
9. 15I — Project/System State Memory + Source-of-Truth Hierarchy.
10. 15J — Current Context Pack Builder + Context Budget Rules.
11. 15K — Carnos Memory Visibility Panel.
12. 15L — Knowledge Vault Foundation.
13. 15M — Retrieval Contract + Provenance + Conflict Handling.
14. 15N — Embedding Boundary / Noop Provider.
15. 15O — Forget/Delete Derived Records.
16. 15P — Memory Audit Events + Memory Usage Transparency.
17. 15Q — Cross-Domain Integration Preview.
18. 15R — Final Audit, Smoke Checklist, Completion Report.


## Explicit no ghost memory rule

No ghost memory rule:

- Forgotten memory must not survive through embeddings, links, summaries, retrieval logs, knowledge links, derived records, context packs, Carnos entity state, or hidden prompt context.
- If a memory is forgotten, all derived records must be removed, disabled, detached, or made unretrievable according to the final 15O implementation.
- Carnos must never retrieve or use forgotten memory through indirect derived artifacts.
