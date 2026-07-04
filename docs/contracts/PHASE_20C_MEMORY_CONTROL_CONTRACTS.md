# Phase 20C — Memory Control Contracts

## Purpose

Define the Phase 20 memory control layer for Memory Inbox, Saved Memories, candidate review, Carnos memory access, privacy states, source/evidence links, duplicate/conflict warnings, and audit requirements.

## Schema Requirement

- Needs live database schema: false
- Reason: 20C is a contract and control layer. Existing memory SQL and repository contracts already exist, and this chunk maps Phase 20 rules onto those sources without adding migrations or table columns.
- Future schema gate: If later chunks add memory tables, privacy columns, review queue rows, or audit rows, inspect actual schema first before coding.

## Discovery Summary

- interesting_files: 563
- migrations: 16
- contracts: 77
- reports: 96
- fixtures: 26
- scripts: 93
- app: 3
- src: 96
- docs: 146

## Existing Schema And Source References

- supabase/migrations/0024_phase15_memory_sql_foundation.sql
- supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql
- supabase/migrations/0028_memory_rag_schema_alignment.sql
- docs/contracts/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES.md
- docs/contracts/PHASE_15D_MEMORY_CANDIDATE_ENGINE.md
- docs/contracts/PHASE_15E_MEMORY_INBOX_UI.md
- docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md
- docs/contracts/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES.md
- docs/contracts/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL.md
- docs/contracts/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS.md
- docs/contracts/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY.md
- docs/contracts/PHASE_17E_MEMORY_INBOX_REPOSITORY.md
- docs/contracts/PHASE_17F_APPROVED_MEMORY_REPOSITORY.md
- docs/contracts/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE.md

## Memory Surfaces

### Memory Inbox
- Purpose: Review proposed memories before they become usable by Carnos or saved memory surfaces.
- Allowed actions:
  - approve_memory
  - reject_memory
  - defer_memory
  - mark_sensitive
  - change_privacy_level
  - block_carnos_access
  - allow_carnos_access
  - view_source_evidence
  - view_duplicate_warning
  - view_conflict_warning
- Required states:
  - empty
  - loading
  - error
  - ready
  - review_required
  - private_mode_active
  - blocked
  - approved
  - rejected
  - deferred

### Saved Memories
- Purpose: Show approved memories and what Carnos may or may not use.
- Allowed actions:
  - view_memory
  - change_privacy_level
  - change_sensitivity_level
  - hide_memory
  - archive_memory
  - forget_memory
  - block_carnos_access
  - allow_carnos_access
  - view_audit_link
- Required states:
  - empty
  - loading
  - error
  - ready
  - hidden
  - archived
  - forgotten
  - locked
  - carnos_disabled
  - redacted

## Memory Candidate Model

Required fields:
- candidate_id
- proposed_summary
- proposed_memory_type
- source_type
- source_reference
- domain
- confidence
- privacy_level
- sensitivity_level
- lock_state
- redaction_level
- created_by
- proposed_at
- review_status
- duplicate_warning
- conflict_warning
- evidence_link
- audit_link

Review statuses:
- draft
- needs_review
- approved
- rejected
- deferred
- blocked
- expired

Created by values:
- user
- carnos
- system

## Saved Memory Model

Required fields:
- memory_id
- title
- summary
- domain
- source_type
- source_reference
- privacy_level
- sensitivity_level
- lock_state
- redaction_level
- carnos_read_allowed
- carnos_summarize_allowed
- carnos_context_allowed
- dashboard_allowed
- timeline_allowed
- analytics_allowed
- export_allowed
- status
- approved_at
- updated_at
- audit_link

Statuses:
- active
- hidden
- archived
- forgotten
- locked
- redacted

## Review Rules

- Carnos can propose memory candidates only when memory creation is allowed for the domain.
- Carnos cannot approve its own memory candidate.
- Sensitive memory candidates require user review.
- Private Mode blocks automatic memory candidate creation unless the user explicitly allows a narrow exception.
- Emergency Lockdown blocks memory candidate creation by default.
- Rejected memory candidates cannot be used by Carnos.
- Deferred memory candidates remain unavailable to Carnos until reviewed.
- Forgotten saved memories cannot be used by Carnos context, summaries, analytics, or dashboard personalization.
- Hidden saved memories must not appear on broad dashboards or timeline surfaces.
- Archived saved memories remain preserved for history/audit but are removed from active memory use.
- Locked memories require explicit review before broad display, export, analytics, or Carnos use.
- Duplicate warnings must be visible before approval.
- Conflict warnings must be visible before approval.
- Source and evidence references must be preserved where available.
- Every review action requires an audit event.

## Carnos Memory Access Rules

- Carnos can read active saved memories only when carnos_read_allowed is true.
- Carnos can summarize active saved memories only when carnos_summarize_allowed is true.
- Carnos can use a memory in context only when carnos_context_allowed is true.
- Carnos cannot read hidden_from_carnos memories.
- Carnos cannot use fully_locked memories.
- Carnos cannot use forgotten memories.
- Carnos cannot use rejected memory candidates.
- Carnos cannot use deferred memory candidates.
- Carnos cannot override Private Mode.
- Carnos cannot override Emergency Lockdown.
- Carnos cannot access raw source evidence when redaction_level blocks it.

## Privacy Mapping

### public
- Memory behavior: may appear in normal memory surfaces when approved
- Carnos default: allowed if domain permission allows

### internal
- Memory behavior: may appear inside ascendOS after approval
- Carnos default: allowed if sensitivity and lock state allow

### private
- Memory behavior: requires careful display and is blocked during Private Mode by default
- Carnos default: blocked unless explicitly allowed

### sensitive
- Memory behavior: requires review, badges, redaction handling, and audit
- Carnos default: blocked unless explicitly approved

### locked
- Memory behavior: hidden from broad surfaces and blocked from Carnos by default
- Carnos default: blocked

## Source And Evidence Rules

- Memory candidates should keep source_type when available.
- Memory candidates should keep source_reference when available.
- Memory candidates should expose evidence_link when safe.
- Saved memories should preserve source lineage.
- Evidence display must respect redaction_level.
- Source details must not bypass privacy_level.
- Source details must not bypass lock_state.
- Audit events should link to source/evidence when safe.

## Duplicate And Conflict Rules

- Duplicate candidates must show duplicate_warning.
- Conflict candidates must show conflict_warning.
- High-confidence conflict candidates still require user review.
- Carnos should not auto-merge conflicts.
- Carnos should not auto-overwrite approved memories.
- User review decides whether to approve, reject, defer, or revise.

## Audit Events Required

- memory_candidate_created
- memory_candidate_blocked
- memory_approved
- memory_rejected
- memory_deferred
- memory_hidden
- memory_archived
- memory_forgotten
- memory_privacy_changed
- memory_sensitivity_changed
- memory_carnos_access_changed
- memory_source_viewed
- memory_conflict_detected
- memory_duplicate_detected

## UI Card Requirements

### Memory Inbox
- candidate summary
- source type
- domain
- confidence
- privacy level
- sensitivity level
- review status
- duplicate warning
- conflict warning
- Carnos proposed badge
- review actions

### Saved Memories
- memory title
- summary
- domain
- source type
- privacy level
- sensitivity level
- lock state
- redaction level
- Carnos access status
- status
- audit link

## Blocked Behaviors

- no silent memory save
- no Carnos self-approval
- no sensitive memory auto-approval
- no rejected memory use
- no deferred memory use
- no forgotten memory use
- no hidden memory dashboard exposure
- no locked memory Carnos access
- no source/evidence privacy bypass
- no audit-free memory review action

## Acceptance

- Memory Inbox control contract exists.
- Saved Memories control contract exists.
- Memory candidate model is defined.
- Saved memory model is defined.
- Review rules are defined.
- Carnos memory access rules are defined.
- Privacy mapping is defined.
- Source/evidence rules are defined.
- Duplicate/conflict rules are defined.
- Audit event requirements are defined.
- Blocked behaviors are defined.
- Existing schema/source references are recorded.
- 20C audit passes.
- Full project check passes.
