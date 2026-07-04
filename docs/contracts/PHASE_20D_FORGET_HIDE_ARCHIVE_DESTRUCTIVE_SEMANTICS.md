# Phase 20D — Forget Hide Archive Destructive Action Semantics

## Purpose

Define exact privacy action semantics so forget, hide, archive, and destructive action boundaries cannot be confused or used unsafely by Carnos, dashboards, analytics, exports, connectors, or future UI actions.

## Schema Requirement

- Needs live database schema: false
- Reason: 20D defines action semantics and safety boundaries only. It references existing memory, audit, retention, and readiness sources without creating or modifying tables, policies, migrations, or live execution code.
- Future schema gate: If a later chunk creates privacy_action_requests, manifests, retention rows, audit rows, or hard-removal execution, inspect exact schema before coding.

## Discovery Summary

- interesting_files: 774
- migrations: 25
- contracts: 47
- reports: 64
- fixtures: 12
- scripts: 123
- app: 6
- src: 117
- docs: 117

## Existing Schema And Source References

- supabase/migrations/0024_phase15_memory_sql_foundation.sql
- supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql
- supabase/migrations/0028_memory_rag_schema_alignment.sql
- docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md
- docs/contracts/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS.md
- docs/contracts/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY.md
- docs/contracts/PHASE_16P_PRIVACY_RETENTION_RULES_CONTRACT.md
- docs/contracts/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS.md
- docs/contracts/PHASE_17Q_FINAL_MEMORY_RAG_AUDIT.md
- docs/contracts/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP.md
- docs/contracts/PHASE_20B_CORE_PRIVACY_DOMAIN_CONTRACTS.md
- docs/contracts/PHASE_20C_MEMORY_CONTROL_CONTRACTS.md
- docs/database/PHASE_13_5E_SETTINGS_PRIVACY_SCHEMA_DESIGN.md
- docs/database/PHASE_15B_MEMORY_SQL_SCHEMA_DESIGN.md

## Action Definitions

### Forget
- Id: forget
- Definition: Remove the item from Carnos use and active memory context. The item may remain in protected records, audit history, or source history depending on existing retention rules.
- User-visible meaning: Carnos cannot use this anymore.
- Carnos behavior: Carnos cannot read, summarize, retrieve, rank, cite, personalize from, or use the forgotten item in context.
- Dashboard behavior: Normal dashboards must not treat forgotten memory as active memory.
- Analytics behavior: Analytics must not use forgotten memory as active personalization input.
- Export behavior: Export preview must mark forgotten status and follow redaction/retention rules.
- Audit behavior: Forgetting must create an audit event.
- Confirmation level: review required for sensitive or bulk actions

### Hide
- Id: hide
- Definition: Remove the item from broad user-facing surfaces without necessarily removing it from storage or all internal references.
- User-visible meaning: Do not show this on normal dashboards, timelines, cards, summaries, or broad search surfaces.
- Carnos behavior: Carnos access depends on separate Carnos permission and lock state.
- Dashboard behavior: Broad dashboards and timelines must not show hidden items.
- Analytics behavior: Analytics may use hidden items only when privacy level, sensitivity level, and lock state allow.
- Export behavior: Export preview must mark hidden status.
- Audit behavior: Hiding must create an audit event.
- Confirmation level: single review for normal data, stronger review for sensitive data

### Archive
- Id: archive
- Definition: Remove the item from active use while preserving it for history, proof, audit, or long-term recordkeeping.
- User-visible meaning: Keep it for history, but stop treating it as active.
- Carnos behavior: Carnos cannot use archived memory for active personalization unless explicitly allowed by a future narrow rule.
- Dashboard behavior: Active dashboards should not show archived items unless an archive/history surface is selected.
- Analytics behavior: Analytics should exclude archived items from active trend calculations unless using an archive/history mode.
- Export behavior: Export preview must mark archived status.
- Audit behavior: Archiving must create an audit event.
- Confirmation level: single review for normal data

### Destructive Action
- Id: destructive_action
- Definition: A protected high-risk boundary for hard-removal or irreversible removal-style operations. It is not the default meaning of forget, hide, or archive.
- User-visible meaning: High-risk removal action that needs stronger confirmation and audit.
- Carnos behavior: Carnos cannot execute or approve destructive actions.
- Dashboard behavior: UI must show preview, affected records, skipped records, confirmation requirement, cooldown when applicable, and final status.
- Analytics behavior: Analytics must not assume destructive action completed until manifest status says completed.
- Export behavior: Export preview must show destructive action history where audit retention allows.
- Audit behavior: Every destructive action request, confirmation, block, completion, or failure must be audited.
- Confirmation level: two-step confirmation plus cooldown where required

## Behavior Matrix

### forget
- Active memory use: false
- Broad dashboard use: false
- Source lineage preserved: true
- Audit preserved: true
- Hard removal default: false
- Requires manifest: true

### hide
- Active memory use: true
- Broad dashboard use: false
- Source lineage preserved: true
- Audit preserved: true
- Hard removal default: false
- Requires manifest: false

### archive
- Active memory use: false
- Broad dashboard use: false
- Source lineage preserved: true
- Audit preserved: true
- Hard removal default: false
- Requires manifest: false

### destructive_action
- Active memory use: false
- Broad dashboard use: false
- Source lineage preserved: deferred_or_manifested
- Audit preserved: true
- Hard removal default: requires_two_step_boundary
- Requires manifest: true

## Affected Surfaces

- Memory Inbox
- Saved Memories
- Carnos context packs
- approved memory repository
- memory RAG read layer
- knowledge vault
- current context builder
- dashboard cards
- timeline
- analytics snapshots
- exports
- audit viewer
- source/evidence attachments
- custom trackers when memory-linked
- external connectors when memory-linked
- Spotify when memory-linked

## Derived Record Rules

- Derived records must not remain active if their source memory is forgotten.
- Derived records must be marked stale, blocked, redacted, or removed from active use according to existing readiness rules.
- Derived records should keep source lineage where audit and retention allow.
- Carnos cannot use derived records that depend on forgotten memories.
- Analytics cannot use derived records that depend on forgotten memories for active personalization.
- Export preview must identify affected derived record categories when available.
- Hard-removal of derived records is deferred to a protected boundary and cannot be silently executed.

## Forget Manifest Requirements

- action_id
- action_type
- requested_by
- target_scope
- affected_records
- skipped_records
- skip_reasons
- source_lineage_behavior
- derived_record_behavior
- carnos_blocked_after_action
- dashboard_blocked_after_action
- analytics_blocked_after_action
- audit_event_id
- status
- created_at

## Destructive Action Manifest Requirements

- action_id
- action_type
- requested_by
- target_scope
- risk_level
- affected_records
- skipped_records
- skip_reasons
- confirmation_level
- cooldown_status
- can_execute_after
- cannot_execute_after
- hard_removal_deferred
- audit_event_id
- status
- created_at

## Review And Confirmation Rules

- Normal hide can use single review unless the item is sensitive or locked.
- Normal archive can use single review unless the item is sensitive or locked.
- Forget requires review for memory, sensitive data, Carnos-visible data, or bulk scope.
- Bulk forget requires stronger confirmation.
- Destructive action always requires two-step confirmation.
- Destructive action may require cooldown depending on risk level.
- Fully locked data cannot be downgraded or acted on without explicit review.
- Carnos cannot approve any forget or destructive action.
- Carnos cannot execute destructive action.
- Expired action requests cannot execute.

## Status Model

- draft
- needs_review
- approved
- rejected
- blocked
- cooldown_pending
- ready_to_execute
- completed
- failed
- expired

## Blocked Reasons

- private_mode_active
- emergency_lockdown_active
- fully_locked
- sensitive_review_required
- bulk_scope_requires_confirmation
- cooldown_required
- cooldown_not_finished
- action_expired
- carnos_cannot_approve
- carnos_cannot_execute
- audit_required
- manifest_required
- schema_not_confirmed_for_live_execution
- source_lineage_protected
- retention_rule_blocks_hard_removal

## Audit Events Required

- memory_forgotten
- memory_hidden
- memory_archived
- privacy_action_requested
- privacy_action_approved
- privacy_action_rejected
- privacy_action_blocked
- privacy_action_expired
- destructive_action_requested
- destructive_action_confirmed
- destructive_action_blocked
- destructive_action_completed
- destructive_action_failed
- derived_record_blocked
- derived_record_marked_stale
- source_lineage_preserved

## Carnos Rules

- Carnos may explain the difference between forget, hide, archive, and destructive action.
- Carnos may propose a privacy action only when the domain allows proposals.
- Carnos cannot approve a privacy action.
- Carnos cannot execute a destructive action.
- Carnos cannot bypass review.
- Carnos cannot use forgotten memory.
- Carnos cannot use hidden_from_carnos memory.
- Carnos cannot use fully locked data.
- Carnos cannot treat archive as active memory.
- Carnos cannot silently create hard-removal requests.

## Must Not Do

- do not create migrations in 20D
- do not invent live privacy_action_requests schema in 20D
- do not implement hard-removal execution in 20D
- do not let forget mean hard removal by default
- do not let hide mean Carnos block by default unless Carnos permission says so
- do not let archive remain active memory by default
- do not let Carnos approve or execute destructive actions
- do not remove or weaken audit boundaries
- do not skip source lineage behavior
- do not skip derived record behavior

## Acceptance

- Forget definition is locked.
- Hide definition is locked.
- Archive definition is locked.
- Destructive action definition is locked.
- Behavior matrix is locked.
- Affected surfaces are listed.
- Derived record rules are listed.
- Forget manifest requirements are listed.
- Destructive action manifest requirements are listed.
- Review and confirmation rules are listed.
- Blocked reasons are listed.
- Audit events are listed.
- Carnos rules are listed.
- Existing schema/source references are recorded.
- 20D audit passes.
- Full project check passes.
