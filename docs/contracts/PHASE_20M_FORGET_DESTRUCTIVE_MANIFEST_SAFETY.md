# Phase 20M — Forget / Destructive Manifest + Destructive Safety

## Purpose

Define forget, hide, archive, destructive action manifest, affected and skipped record, derived record, confirmation, cooldown, review, export, audit, Carnos denial, connector, Spotify, and hard-removal-deferred safety rules before any real mutation or hard removal exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20M defines manifest and destructive safety contracts only. It does not create manifest persistence, mutations, hard removal, repositories, RLS policies, audit row writes, connector mutations, Spotify mutations, or runtime execution.
- Future schema gate: If a later chunk persists forget manifests, destructive action manifests, affected records, skipped records, audit rows, mutation state, hard-removal queues, connector removal records, or Spotify retained metadata state, inspect exact schema before coding.

## Forget Manifest Model

### Required Fields
- manifest_id
- action_type
- requested_by
- requested_at
- scope_id
- scope_summary
- review_id
- confirmation_level
- cooldown_state
- status
- affected_record_count
- skipped_record_count
- soft_forgotten_count
- hidden_count
- archived_count
- hard_removal_deferred_count
- derived_record_count
- audit_event_id
- expires_at
- completed_at

### Optional Fields
- memory_ids
- custom_tracker_ids
- document_ids
- evidence_ids
- analytics_snapshot_ids
- timeline_event_ids
- connector_ids
- spotify_connection_ids
- warning_codes
- blocked_reasons
- skip_reasons
- derived_record_summary
- redaction_summary
- review_notes

## Destructive Manifest Model

- manifest_id
- action_type
- requested_by
- requested_at
- scope_id
- scope_summary
- risk_level
- review_id
- confirmation_level
- cooldown_state
- status
- affected_record_count
- skipped_record_count
- hard_removal_deferred_count
- protected_record_count
- audit_protected_count
- locked_record_count
- connector_boundary_count
- spotify_boundary_count
- audit_event_id
- expires_at
- completed_at

Note: 20M never performs hard removal. It only defines manifest requirements and hard-removal-deferred safety accounting.

## Affected Record Model

### Required Fields
- record_type
- record_id_boundary
- domain
- source_type
- privacy_level
- sensitivity_level
- lock_state
- redaction_level
- planned_effect
- derived_effect
- audit_required
- review_required

### Planned Effects
- soft_forgotten
- hidden
- archived
- redacted
- metadata_only
- hard_removal_deferred
- no_runtime_effect_in_20M

## Skipped Record Model

- record_type
- record_id_boundary
- domain
- skip_reason
- privacy_level
- sensitivity_level
- lock_state
- audit_required
- notes

## Skip Reasons

- scope_excluded
- already_forgotten
- already_hidden
- already_archived
- fully_locked_domain
- private_mode_active
- emergency_lockdown_active
- audit_protected
- manifest_missing
- review_missing
- confirmation_missing
- cooldown_not_finished
- hard_removal_not_supported
- derived_record_protected
- source_evidence_protected
- connector_token_boundary
- connector_provider_boundary
- spotify_token_boundary
- spotify_provider_boundary
- record_not_owned_by_user
- record_not_found_boundary

## Status Model

### draft
- Meaning: Manifest is being prepared.

### preview_required
- Meaning: Affected and skipped records must be previewed before review.

### needs_review
- Meaning: User review is required.

### confirmation_required
- Meaning: Confirmation is required.

### cooldown_pending
- Meaning: Cooldown blocks readiness.

### ready_to_apply
- Meaning: Manifest passed safety gates but no mutation happens in this chunk.

### applied_soft_effects
- Meaning: Future execution boundary applied soft effects.

### hard_removal_deferred
- Meaning: Hard removal remains deferred to a future protected boundary.

### blocked
- Meaning: Manifest is blocked by safety rules.

### failed
- Meaning: Future execution boundary failed.

### expired
- Meaning: Manifest expired before completion.

## Action Types

- forget_memory
- forget_scope
- hide_scope
- archive_scope
- redact_scope
- metadata_only_scope
- request_destructive_action
- request_hard_removal_deferred
- forget_connector_metadata
- forget_spotify_metadata
- archive_connector_actions
- archive_spotify_actions

## Derived Record Rules

- Derived records must be identified in preview when available.
- Derived records can be soft-forgotten when supported by future execution.
- Derived records can be hidden from broad surfaces when supported by future execution.
- Derived records can be archived when supported by future execution.
- Derived records cannot be hard removed by 20M.
- Source evidence remains protected unless a future source-specific boundary allows a safe effect.
- Audit records remain protected and append-only.
- Analytics snapshots derived from forgotten memory must not reintroduce forgotten memory into Carnos context.
- Timeline entries derived from forgotten memory must not expose forgotten content on broad surfaces.
- Connector-derived records must preserve token boundaries.
- Spotify-derived records must preserve token boundaries and recently played sensitivity.

## Action Group Rules

### memory_forget
- Forget means Carnos cannot use the memory anymore.
- Forget does not mean hard removal by default.
- Forgotten memory must be excluded from Carnos context packs.
- Forgotten memory must be excluded from Carnos summaries.
- Forgotten memory can remain as metadata where audit and retention rules allow.
- Bulk forget requires two-step confirmation.
- Sensitive bulk forget can require cooldown.

### hide
- Hide removes selected data from broad dashboards.
- Hide removes selected data from broad timeline surfaces.
- Hide does not automatically hard remove data.
- Hidden data must be badged where visible in review or audit surfaces.
- Hidden-from-Carnos lock state also blocks Carnos use.

### archive
- Archive removes selected data from active use.
- Archive preserves historical and audit context where allowed.
- Archived memory is not active Carnos context.
- Archived connector actions are not active pending actions.
- Archived Spotify actions are not active pending actions.

### destructive_action_boundary
- Destructive action requires manifest linkage.
- Destructive action requires review linkage.
- Destructive action requires two-step confirmation.
- Critical destructive action can require cooldown.
- Carnos cannot request silent destructive execution.
- Carnos cannot approve destructive action.
- Carnos cannot execute destructive action.
- Hard removal remains deferred unless a future protected execution boundary exists.

### audit
- Audit records are append-only.
- Audit records are not hard removed by 20M.
- Audit payloads can be redacted in future boundaries.
- Manifest must link to audit event ids.
- Skipped audit-protected records must be counted.

### connectors
- Connector token values are never affected by visible manifests except as token-boundary metadata.
- Connector provider data can require provider-specific removal outside ascendOS.
- Connector metadata can be forgotten, hidden, archived, or redacted by future execution boundaries.
- Connector action manifests must preserve scope and token boundaries.
- Carnos cannot trigger connector destructive action.

### spotify
- Spotify token values are never affected by visible manifests except as token-boundary metadata.
- Spotify provider data can require Spotify-side controls outside ascendOS.
- Spotify recently played metadata is sensitive by default.
- Spotify metadata can be forgotten, hidden, archived, or redacted by future execution boundaries.
- Spotify action manifests must preserve scope, provider-state, and token boundaries.
- Carnos cannot trigger Spotify destructive action.

## Count Rules

- affected_record_count must include all records planned for soft effect.
- skipped_record_count must include every record excluded by safety rule.
- soft_forgotten_count must count records planned to block future Carnos use.
- hidden_count must count records planned to leave broad surfaces.
- archived_count must count records planned to leave active use.
- hard_removal_deferred_count must count records where hard removal is requested but deferred.
- derived_record_count must count known derived records.
- protected_record_count must count records protected by lock, audit, ownership, provider, or source boundaries.
- connector_boundary_count must count connector records blocked or deferred by provider/token boundaries.
- spotify_boundary_count must count Spotify records blocked or deferred by provider/token boundaries.

## Warning Codes

- forget_does_not_hard_remove
- hard_removal_deferred
- audit_records_protected
- source_evidence_protected
- derived_records_detected
- derived_records_may_remain
- bulk_action_selected
- two_step_confirmation_required
- cooldown_required
- private_mode_active
- emergency_lockdown_active
- fully_locked_domain_in_scope
- connector_provider_boundary
- connector_tokens_protected
- spotify_provider_boundary
- spotify_tokens_protected
- spotify_recently_played_sensitive
- carnos_access_will_be_blocked
- manifest_only_no_runtime_effect

## Blocked Reasons

- preview_required
- review_required
- confirmation_required
- two_step_confirmation_required
- cooldown_required
- cooldown_not_finished
- manifest_required
- scope_empty
- scope_too_broad
- private_mode_active
- emergency_lockdown_active
- fully_locked_domain
- audit_protected
- source_evidence_protected
- hard_removal_not_supported
- hard_removal_deferred
- derived_record_protected
- record_not_owned_by_user
- carnos_cannot_approve
- carnos_cannot_execute
- connector_token_boundary
- connector_provider_boundary
- spotify_token_boundary
- spotify_provider_boundary
- spotify_recently_played_sensitive

## Audit Events Required

- forget_manifest_created
- forget_manifest_preview_generated
- forget_manifest_review_required
- forget_manifest_confirmation_required
- forget_manifest_cooldown_required
- forget_manifest_ready_to_apply
- forget_manifest_applied_soft_effects
- forget_manifest_blocked
- forget_manifest_expired
- destructive_manifest_created
- destructive_manifest_preview_generated
- destructive_manifest_review_required
- destructive_manifest_confirmation_required
- destructive_manifest_cooldown_required
- destructive_manifest_ready_to_apply
- destructive_manifest_hard_removal_deferred
- destructive_manifest_blocked
- destructive_manifest_expired
- carnos_destructive_action_blocked
- connector_destructive_boundary_enforced
- spotify_destructive_boundary_enforced

## Badge Requirements

- Manifest Required
- Preview Required
- Needs Review
- Two Step Required
- Cooldown Pending
- Ready To Apply
- Soft Forgotten
- Hidden
- Archived
- Hard Removal Deferred
- Audit Protected
- Source Protected
- Derived Records Detected
- Carnos Blocked
- Connector Boundary
- Spotify Boundary
- Token Protected
- Recently Played Sensitive
- Blocked
- Expired

## Must Not Do

- do not create migrations in 20M
- do not invent manifest persistence schema in 20M
- do not implement forget mutations in 20M
- do not implement hide mutations in 20M
- do not implement archive mutations in 20M
- do not implement hard removal in 20M
- do not implement repository writes in 20M
- do not implement audit row writes in 20M
- do not let Carnos approve destructive action
- do not let Carnos execute destructive action
- do not expose connector token values
- do not expose Spotify token values
- do not hard remove audit records
- do not bypass two-step confirmation
- do not bypass cooldown
- do not treat forget as hard removal by default

## Acceptance

- Forget manifest model is defined.
- Destructive manifest model is defined.
- Affected record model is defined.
- Skipped record model is defined.
- Skip reasons are defined.
- Status model is defined.
- Action types are defined.
- Derived record rules are defined.
- Action group rules are defined.
- Count rules are defined.
- Warning codes are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Connector and Spotify destructive boundaries are included.
- Carnos destructive denials are explicit.
- Hard removal deferred boundary is explicit.
- 20M audit passes.
- Full project check passes.
