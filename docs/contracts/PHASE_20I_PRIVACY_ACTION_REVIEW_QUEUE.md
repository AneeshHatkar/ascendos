# Phase 20I — Privacy Action Review Queue

## Purpose

Define the review-before-action queue for privacy-sensitive requests across memory, forget, hide, archive, export, destructive action boundaries, Private Mode, Emergency Lockdown, sensitive locks, Carnos permissions, connectors, Spotify, audit, badges, blocked reasons, expiration, and status transitions.

## Schema Requirement

- Needs live database schema: false
- Reason: 20I defines review queue behavior and action safety contracts only. It does not create privacy_action_requests persistence, queue tables, migrations, repositories, RLS policies, audit row writes, or live execution.
- Future schema gate: If a later chunk persists review queue items, action manifests, approvals, audit rows, queue expiration, connector action requests, or Spotify action requests, inspect exact schema before coding.

## Queue Item Model

### Required Fields
- review_id
- action_type
- title
- summary
- requested_by
- proposed_by
- target_domain
- target_scope
- risk_level
- priority
- status
- review_required_reason
- blocked_reason
- expires_at
- created_at
- reviewed_at
- completed_at
- audit_event_id
- manifest_id
- source_reference
- privacy_level
- sensitivity_level
- lock_state
- redaction_level

### Optional Fields
- connector_id
- connector_account_id
- required_scopes
- spotify_action_type
- spotify_device_id_boundary
- spotify_playlist_id_boundary
- affected_record_count
- skipped_record_count
- cooldown_until
- confirmation_level
- review_notes

## Reviewable Action Types

- approve_memory
- reject_memory
- defer_memory
- forget_memory
- hide_memory
- archive_memory
- export_data
- request_destructive_action
- toggle_private_mode
- enable_emergency_lockdown
- disable_emergency_lockdown
- change_sensitive_lock
- change_domain_privacy_permission
- change_carnos_permission
- connect_external_api
- disconnect_external_api
- change_connector_scope
- approve_connector_action
- reject_connector_action
- approve_spotify_action
- reject_spotify_action

## Status Model

### draft
- Meaning: Request is being prepared and is not yet reviewable.

### needs_review
- Meaning: Request needs user review before it can proceed.

### approved
- Meaning: User approved the request, but execution may still require cooldown, scope checks, or provider checks.

### rejected
- Meaning: User rejected the request and it cannot proceed.

### deferred
- Meaning: User postponed the request and it cannot proceed until reviewed again.

### blocked
- Meaning: Request is blocked by privacy, lock, mode, permission, scope, audit, or provider rules.

### cooldown_pending
- Meaning: Request was approved but must wait before execution.

### ready_to_execute
- Meaning: Request passed review and cooldown checks but is not executed by this contract chunk.

### completed
- Meaning: Request completed through a later execution boundary.

### failed
- Meaning: Request failed through a later execution boundary.

### expired
- Meaning: Request expired before completion.

## Risk Levels

### low
- Examples:
  - approve_normal_memory
  - hide_normal_memory
  - view_export_preview
- Review rule: single review is enough

### medium
- Examples:
  - forget_single_memory
  - change_non_sensitive_carnos_permission
  - approve_low_risk_connector_read
- Review rule: single review plus audit

### high
- Examples:
  - bulk_forget
  - export_sensitive_scope
  - change_sensitive_domain_permission
  - approve_spotify_playback_action
- Review rule: explicit review plus stronger warning

### critical
- Examples:
  - destructive_action_boundary
  - disable_emergency_lockdown
  - unlock_fully_locked_domain
  - change_high_risk_connector_scope
- Review rule: two-step confirmation and cooldown where applicable

## Priority Levels

- low
- normal
- high
- urgent

## Actor Rules

- User can create review requests.
- Carnos can propose review requests only when proposal permission allows.
- System can create blocked-state review records for transparency.
- Carnos cannot approve review requests.
- Carnos cannot reject review requests on behalf of the user.
- Carnos cannot defer review requests on behalf of the user.
- Carnos cannot execute destructive action requests.
- Carnos cannot disable Private Mode.
- Carnos cannot disable Emergency Lockdown.
- Carnos cannot unlock fully locked domains.
- Carnos cannot change connector scopes silently.
- Carnos cannot approve Spotify actions silently.

## Action Review Rules

### memory
- Actions:
  - approve_memory
  - reject_memory
  - defer_memory
  - forget_memory
  - hide_memory
  - archive_memory
- Rules:
  - Sensitive memory requires review.
  - Carnos-proposed memory cannot be self-approved by Carnos.
  - Forgotten memory cannot return to Carnos context through review bypass.
  - Deferred memory remains unavailable until reviewed again.
  - Memory actions require audit events.

### export
- Actions:
  - export_data
- Rules:
  - Export requires preview before approval.
  - Sensitive export scopes require explicit warning.
  - Locked domains are excluded unless reviewed.
  - Export all is high risk.
  - Export requests require manifest linkage.

### destructive_action_boundary
- Actions:
  - request_destructive_action
- Rules:
  - Destructive action requires two-step confirmation.
  - Destructive action can require cooldown.
  - Carnos cannot approve destructive action.
  - Carnos cannot execute destructive action.
  - Destructive action requires manifest linkage.

### privacy_modes
- Actions:
  - toggle_private_mode
  - enable_emergency_lockdown
  - disable_emergency_lockdown
- Rules:
  - Private Mode disable must be user driven.
  - Emergency Lockdown disable requires explicit confirmation.
  - Carnos cannot disable Private Mode.
  - Carnos cannot disable Emergency Lockdown.
  - Mode changes require audit events.

### locks_and_permissions
- Actions:
  - change_sensitive_lock
  - change_domain_privacy_permission
  - change_carnos_permission
- Rules:
  - Fully locked domain downgrade requires review.
  - Sensitive Carnos permission expansion requires review.
  - Domain permission changes cannot bypass Private Mode.
  - Domain permission changes cannot bypass Emergency Lockdown.
  - Permission changes require audit events.

### external_connectors
- Actions:
  - connect_external_api
  - disconnect_external_api
  - change_connector_scope
  - approve_connector_action
  - reject_connector_action
- Rules:
  - Connector connection requires explicit user action.
  - Connector scope change requires review.
  - Connector action approval requires scope and risk display.
  - Connector tokens are never shown to Carnos.
  - Connector actions require audit events.

### spotify
- Actions:
  - approve_spotify_action
  - reject_spotify_action
- Rules:
  - Spotify action approval requires scope display.
  - Spotify action approval requires risk display.
  - Spotify playback action approval requires device and provider-state awareness.
  - Spotify recently played data cannot become memory without explicit approval.
  - Spotify token values are never shown to Carnos.
  - Spotify actions require audit events.

## Expiration Rules

- Review requests must have an expiration boundary.
- Expired requests cannot execute.
- Expired connector action requests cannot execute.
- Expired Spotify action requests cannot execute.
- Expired destructive action requests cannot execute.
- Expired disable-lockdown requests keep lockdown active.
- Expired permission change requests leave current permissions unchanged.
- Expired requests must remain auditable as metadata where retention allows.

## Blocked Reasons

- review_required
- approval_missing
- request_expired
- private_mode_active
- emergency_lockdown_active
- sensitive_lock_active
- fully_locked_domain
- carnos_cannot_approve
- carnos_cannot_execute
- two_step_confirmation_required
- cooldown_required
- cooldown_not_finished
- manifest_required
- audit_required
- export_preview_required
- connector_permission_blocked
- connector_scope_missing
- connector_token_boundary
- spotify_permission_blocked
- spotify_scope_missing
- spotify_premium_required
- spotify_no_active_device
- spotify_token_boundary
- destructive_action_denied
- privacy_unlock_denied
- permission_escalation_denied

## Audit Events Required

- privacy_action_requested
- privacy_action_review_required
- privacy_action_approved
- privacy_action_rejected
- privacy_action_deferred
- privacy_action_blocked
- privacy_action_expired
- privacy_action_ready_to_execute
- privacy_action_completed
- privacy_action_failed
- memory_review_action_requested
- export_review_action_requested
- destructive_action_review_requested
- private_mode_review_action_requested
- emergency_lockdown_review_action_requested
- sensitive_lock_review_action_requested
- carnos_permission_review_action_requested
- connector_review_action_requested
- connector_action_review_required
- spotify_review_action_requested
- spotify_action_review_required

## Badge Requirements

- Needs Review
- Approved
- Rejected
- Deferred
- Blocked
- Expired
- Cooldown Pending
- Ready To Execute
- High Risk
- Critical Risk
- Two Step Required
- Manifest Required
- Audit Required
- Private Mode Active
- Emergency Lockdown Active
- Sensitive Lock Active
- Connector Restricted
- Spotify Restricted
- Premium Required
- No Active Device

## Must Not Do

- do not create migrations in 20I
- do not invent privacy_action_requests schema in 20I
- do not implement queue persistence in 20I
- do not implement repository writes in 20I
- do not implement runtime approval execution in 20I
- do not let Carnos approve review requests
- do not let Carnos execute destructive actions
- do not let Carnos disable Private Mode
- do not let Carnos disable Emergency Lockdown
- do not let connector actions bypass review
- do not let Spotify actions bypass review
- do not skip audit requirements
- do not skip expiration rules

## Acceptance

- Queue item model is defined.
- Reviewable action types are defined.
- Status model is defined.
- Risk levels are defined.
- Priority levels are defined.
- Actor rules are defined.
- Action review rules are defined.
- Expiration rules are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Connector and Spotify review rules are included.
- 20I audit passes.
- Full project check passes.
