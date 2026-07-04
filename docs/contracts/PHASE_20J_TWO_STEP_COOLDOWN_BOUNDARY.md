# Phase 20J — Two-Step Confirmation + Cooldown Boundary

## Purpose

Define one-step, two-step, cooldown, expiry, and execution readiness boundaries for high-risk privacy, memory, export, destructive action, unlock, connector, and Spotify actions.

## Schema Requirement

- Needs live database schema: false
- Reason: 20J defines confirmation and cooldown safety contracts only. It does not create persistence, confirmation rows, cooldown timestamp storage, migrations, repositories, RLS policies, audit row writes, or live action execution.
- Future schema gate: If a later chunk persists confirmation attempts, cooldown timestamps, action expiry, approval state, manifests, audit rows, connector action records, or Spotify action records, inspect exact schema before coding.

## Confirmation Levels

### none
- Meaning: No confirmation boundary is needed beyond normal UI interaction.
- Allowed for:
  - view_safe_preview
  - open_review_item
  - view_badge_details

### single_review
- Meaning: One explicit user review action is required.
- Allowed for:
  - approve_normal_memory
  - reject_memory
  - defer_memory
  - hide_normal_memory
  - archive_normal_memory
  - toggle_private_mode_on

### explicit_confirmation
- Meaning: A direct confirmation action is required after warnings are shown.
- Allowed for:
  - forget_single_memory
  - export_limited_scope
  - change_non_sensitive_carnos_permission
  - approve_low_risk_connector_action

### two_step_confirmation
- Meaning: Two separate user confirmations are required before the action can become executable.
- Allowed for:
  - destructive_action_boundary
  - bulk_forget
  - export_all
  - disable_emergency_lockdown
  - unlock_fully_locked_domain
  - high_risk_connector_scope_change
  - high_risk_spotify_action

### two_step_plus_cooldown
- Meaning: Two confirmations plus a waiting period are required before execution readiness.
- Allowed for:
  - critical_destructive_action
  - disable_emergency_lockdown_after_sensitive_changes
  - unlock_multiple_fully_locked_domains
  - critical_connector_permission_change

## One-Step Actions

- approve_normal_memory
- reject_memory
- defer_memory
- hide_normal_memory
- archive_normal_memory
- view_export_preview
- toggle_private_mode_on
- enable_emergency_lockdown
- mark_memory_sensitive
- block_carnos_for_memory
- view_connector_status
- view_spotify_connection_status

## Two-Step Actions

- destructive_action_boundary
- bulk_forget
- bulk_archive_sensitive_scope
- export_all
- export_sensitive_scope
- disable_emergency_lockdown
- unlock_fully_locked_domain
- disable_sensitive_lock
- expand_carnos_access_for_sensitive_domain
- connect_high_permission_external_api
- change_high_risk_connector_scope
- disconnect_connector_with_data_implications
- approve_high_risk_connector_action
- approve_spotify_device_transfer
- approve_spotify_volume_change
- approve_spotify_playback_automation

## Cooldown Required Actions

- critical_destructive_action
- bulk_forget_sensitive_scope
- disable_emergency_lockdown
- unlock_fully_locked_domain
- unlock_multiple_sensitive_domains
- export_all_sensitive_data
- high_risk_connector_permission_change
- disconnect_connector_with_retained_data_implications
- approve_high_risk_spotify_playback_automation

## Cooldown State Model

### not_required
- Meaning: Action does not require cooldown.

### required
- Meaning: Cooldown is required but not started.

### cooldown_pending
- Meaning: Cooldown started and execution is not yet allowed.

### cooldown_complete
- Meaning: Cooldown completed and execution readiness can be evaluated.

### cooldown_expired
- Meaning: Cooldown or action window expired before execution.

### blocked
- Meaning: Cooldown cannot proceed because another safety gate failed.

## Confirmation State Model

### not_started
- Meaning: No confirmation has occurred.

### first_confirmed
- Meaning: First confirmation is recorded but second confirmation is still required.

### second_confirmed
- Meaning: Two-step confirmation is complete.

### cooldown_pending
- Meaning: Confirmation is complete but cooldown still blocks execution readiness.

### ready_to_execute
- Meaning: Confirmation and cooldown gates passed, but actual execution is outside this chunk.

### rejected
- Meaning: User rejected the confirmation.

### expired
- Meaning: Confirmation expired before completion.

### blocked
- Meaning: Confirmation is blocked by a safety rule.

## Timestamp Fields For Future Persistence

- requested_at
- first_confirmed_at
- second_confirmed_at
- cooldown_started_at
- can_execute_after
- cannot_execute_after
- expires_at
- completed_at
- failed_at
- blocked_at

## Execution Readiness Rules

- Execution readiness is not execution.
- This chunk never executes actions.
- An action is ready only after required review is approved.
- An action is ready only after required confirmation level is satisfied.
- An action is ready only after cooldown is complete when cooldown is required.
- An action is not ready if expired.
- An action is not ready if blocked by Private Mode.
- An action is not ready if blocked by Emergency Lockdown.
- An action is not ready if blocked by sensitive lock rules.
- An action is not ready if required manifest is missing.
- An action is not ready if required audit boundary is missing.
- An action is not ready if connector scope is missing.
- An action is not ready if Spotify scope is missing.
- An action is not ready if Spotify provider state blocks it.
- Carnos cannot mark an action ready to execute.

## Action Group Rules

### memory
- Approve normal memory can use single review.
- Forget single memory requires explicit confirmation.
- Bulk forget requires two-step confirmation.
- Bulk forget sensitive scope requires cooldown.
- Carnos cannot confirm memory forget actions.
- Forgotten memory cannot return to context through confirmation bypass.

### export
- Export preview can be one-step.
- Limited export requires explicit confirmation.
- Export all requires two-step confirmation.
- Export all sensitive data requires cooldown.
- Export cannot proceed without manifest linkage.
- Carnos cannot confirm export actions.

### destructive_action_boundary
- Destructive action always requires two-step confirmation.
- Critical destructive action requires cooldown.
- Destructive action cannot proceed without manifest linkage.
- Destructive action cannot proceed if audit boundary is missing.
- Carnos cannot confirm destructive action.
- Carnos cannot execute destructive action.

### private_mode
- Turning Private Mode on can use single review.
- Turning Private Mode off must be user-driven.
- Carnos cannot disable Private Mode.
- Private Mode cannot be bypassed by a confirmation shortcut.

### emergency_lockdown
- Enabling Emergency Lockdown can use single review.
- Disabling Emergency Lockdown requires two-step confirmation.
- Disabling Emergency Lockdown can require cooldown after sensitive changes.
- Carnos cannot disable Emergency Lockdown.
- Emergency Lockdown remains active until confirmation completes.

### sensitive_locks
- Enabling a stricter lock can use single review.
- Disabling a sensitive lock requires two-step confirmation when sensitive data is affected.
- Unlocking a fully locked domain requires two-step confirmation.
- Unlocking multiple fully locked domains requires cooldown.
- Carnos cannot unlock domains.

### carnos_permissions
- Reducing Carnos access can use single review.
- Expanding Carnos access for sensitive domains requires two-step confirmation.
- Expanding Carnos access cannot bypass Private Mode.
- Expanding Carnos access cannot bypass Emergency Lockdown.
- Carnos cannot approve its own access expansion.

### connectors
- Connecting low-risk external APIs requires explicit confirmation.
- Connecting high-permission external APIs requires two-step confirmation.
- Changing high-risk connector scopes requires two-step confirmation.
- Critical connector permission changes require cooldown.
- Connector actions cannot proceed without required scopes.
- Carnos cannot confirm connector actions.

### spotify
- Reading Spotify connection status can be one-step.
- Approving Spotify playback action requires explicit confirmation.
- Spotify device transfer requires two-step confirmation.
- Spotify volume change requires two-step confirmation.
- Spotify playback automation requires two-step confirmation.
- High-risk Spotify playback automation can require cooldown.
- Spotify actions cannot proceed without required scopes.
- Spotify actions cannot proceed when Premium is required but unavailable.
- Spotify actions cannot proceed when no active device exists.
- Carnos cannot confirm Spotify actions.

## Blocked Reasons

- confirmation_required
- two_step_confirmation_required
- first_confirmation_missing
- second_confirmation_missing
- cooldown_required
- cooldown_not_started
- cooldown_not_finished
- cooldown_expired
- action_expired
- review_required
- approval_missing
- manifest_required
- audit_required
- private_mode_active
- emergency_lockdown_active
- sensitive_lock_active
- fully_locked_domain
- carnos_cannot_confirm
- carnos_cannot_execute
- destructive_action_denied
- privacy_unlock_denied
- permission_escalation_denied
- connector_scope_missing
- connector_permission_blocked
- spotify_scope_missing
- spotify_permission_blocked
- spotify_premium_required
- spotify_no_active_device

## Audit Events Required

- confirmation_requested
- first_confirmation_recorded
- second_confirmation_recorded
- confirmation_rejected
- confirmation_expired
- confirmation_blocked
- cooldown_required
- cooldown_started
- cooldown_completed
- cooldown_expired
- action_ready_to_execute
- action_execution_blocked
- memory_confirmation_required
- export_confirmation_required
- destructive_action_confirmation_required
- private_mode_confirmation_required
- emergency_lockdown_confirmation_required
- sensitive_lock_confirmation_required
- carnos_permission_confirmation_required
- connector_confirmation_required
- spotify_confirmation_required

## Badge Requirements

- Confirmation Required
- Two Step Required
- First Step Complete
- Second Step Required
- Cooldown Required
- Cooldown Pending
- Cooldown Complete
- Ready To Execute
- Expired
- Blocked
- Manifest Required
- Audit Required
- Private Mode Active
- Emergency Lockdown Active
- Sensitive Lock Active
- Connector Scope Missing
- Spotify Scope Missing
- Premium Required
- No Active Device

## Must Not Do

- do not create migrations in 20J
- do not invent confirmation persistence schema in 20J
- do not implement cooldown persistence in 20J
- do not implement runtime action execution in 20J
- do not mark execution as completed in 20J
- do not let Carnos confirm actions
- do not let Carnos execute destructive actions
- do not let Carnos disable Private Mode
- do not let Carnos disable Emergency Lockdown
- do not let actions bypass cooldown
- do not let expired actions execute
- do not let connector actions bypass scope checks
- do not let Spotify actions bypass scope or provider-state checks

## Acceptance

- Confirmation levels are defined.
- One-step actions are defined.
- Two-step actions are defined.
- Cooldown-required actions are defined.
- Cooldown state model is defined.
- Confirmation state model is defined.
- Future timestamp fields are listed.
- Execution readiness rules are defined.
- Action group rules are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Connector and Spotify confirmation rules are included.
- 20J audit passes.
- Full project check passes.
