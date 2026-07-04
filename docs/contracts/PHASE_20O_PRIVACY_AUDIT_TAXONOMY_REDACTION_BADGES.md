# Phase 20O — Privacy Audit Taxonomy + Redaction + Badges

## Purpose

Define standardized privacy audit taxonomy, event groups, actors, statuses, redaction levels, redaction reasons, badge taxonomy, surface reuse rules, blocked reasons, audit requirements, connector badges, Spotify badges, and Carnos badge behavior across Phase 20 privacy surfaces before UI or runtime enforcement exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20O defines taxonomy and display contracts only. It does not create badge persistence, audit persistence, redaction persistence, migrations, repositories, RLS policies, UI components, or runtime enforcement.
- Future schema gate: If a later chunk persists badges, redaction rules, taxonomy rows, audit records, surface rendering state, connector badge state, Spotify badge state, or Carnos badge state, inspect exact schema before coding.

## Privacy Audit Event Taxonomy

- memory_candidate_created
- memory_approved
- memory_rejected
- memory_deferred
- memory_forgotten
- memory_hidden
- memory_archived
- memory_privacy_changed
- memory_carnos_access_changed
- private_mode_enabled
- private_mode_disabled
- private_mode_expired
- emergency_lockdown_enabled
- emergency_lockdown_disabled
- sensitive_lock_enabled
- sensitive_lock_disabled
- domain_privacy_permission_changed
- carnos_permission_changed
- data_scope_selector_opened
- data_scope_preview_generated
- data_export_requested
- data_export_previewed
- data_export_manifest_created
- data_export_ready
- data_export_downloaded
- data_export_expired
- data_export_failed
- destructive_action_requested
- destructive_action_confirmed
- destructive_action_cooldown_started
- destructive_action_hard_removal_deferred
- destructive_action_blocked
- privacy_review_required
- privacy_action_approved
- privacy_action_rejected
- privacy_action_deferred
- privacy_action_expired
- privacy_action_failed
- redaction_rule_changed
- retention_rule_changed
- audit_viewer_opened
- audit_payload_redacted_for_view
- audit_append_only_notice_shown
- connector_connected
- connector_disconnected
- connector_scope_changed
- connector_permission_changed
- connector_action_requested
- connector_action_approved
- connector_action_rejected
- connector_action_completed
- connector_action_failed
- connector_action_blocked
- connector_token_boundary_refreshed
- connector_token_boundary_revoked
- spotify_connected
- spotify_disconnected
- spotify_scope_changed
- spotify_playback_state_read
- spotify_device_snapshot_read
- spotify_playlist_snapshot_read
- spotify_recently_played_snapshot_read
- spotify_action_proposed
- spotify_action_approved
- spotify_action_rejected
- spotify_action_blocked
- spotify_action_completed
- spotify_action_failed
- spotify_token_boundary_refreshed
- spotify_token_boundary_revoked
- carnos_access_allowed
- carnos_access_blocked
- carnos_memory_candidate_blocked
- carnos_destructive_action_blocked
- carnos_connector_action_blocked
- carnos_spotify_action_blocked

## Event Group Taxonomy

- memory
- privacy_mode
- emergency_lockdown
- sensitive_lock
- domain_permission
- carnos_permission
- data_scope
- export
- forget
- hide
- archive
- destructive_action
- review_queue
- confirmation
- cooldown
- redaction
- retention
- audit_viewer
- custom_tracker
- document_evidence
- current_info
- analytics
- timeline
- connector
- spotify
- system_boundary

## Actor Taxonomy

- user
- carnos
- system
- review_queue
- export_boundary
- manifest_boundary
- confirmation_boundary
- cooldown_boundary
- audit_boundary
- redaction_boundary
- retention_boundary
- connector_boundary
- spotify_boundary
- future_runtime_boundary

## Status Taxonomy

- draft
- preview_required
- needs_review
- approved
- rejected
- deferred
- confirmation_required
- cooldown_pending
- ready_to_execute
- ready_to_prepare
- ready_to_apply
- completed
- applied_soft_effects
- downloaded
- expired
- failed
- blocked
- redacted
- hidden
- archived
- forgotten
- hard_removal_deferred

## Redaction Levels

### full_value
- Meaning: The value can be shown in full when privacy rules allow.

### summary_only
- Meaning: Only a summary can be shown.

### metadata_only
- Meaning: Only metadata can be shown.

### redacted
- Meaning: Sensitive payload is replaced by a redacted marker.

### hidden
- Meaning: Payload is not shown on the surface.

## Redaction Reasons

- privacy_level_private
- sensitivity_level_sensitive
- highly_sensitive
- private_mode_active
- emergency_lockdown_active
- fully_locked_domain
- hidden_from_dashboards
- hidden_from_carnos
- forgotten_memory
- audit_payload_restricted
- source_evidence_restricted
- connector_token_boundary
- spotify_token_boundary
- spotify_recently_played_sensitive
- export_redaction_required
- carnos_access_blocked
- review_required
- manifest_required

## Badge Taxonomy

### privacy
- Private
- Sensitive
- Highly Sensitive
- Locked
- Fully Locked
- Review Required
- Redacted
- Metadata Only
- Hidden
- Forgotten
- Archived
- Exportable
- Not Exportable

### mode
- Private Mode Active
- Timed Private Mode
- Emergency Lockdown Active
- Emergency Lockdown Protected
- Mode Expired
- Mode Blocked

### status
- Draft
- Preview Required
- Needs Review
- Approved
- Rejected
- Deferred
- Confirmation Required
- Two Step Required
- Cooldown Pending
- Ready To Execute
- Ready To Prepare
- Ready To Apply
- Completed
- Failed
- Expired
- Blocked

### risk
- Low Risk
- Medium Risk
- High Risk
- Critical Risk
- Destructive Boundary
- Hard Removal Deferred
- Audit Protected
- Source Protected

### carnos
- Carnos Allowed
- Carnos Restricted
- Carnos Disabled
- Memory Disabled
- Context Blocked
- Summary Blocked
- Action Proposal Only
- Execution Blocked
- Carnos Cannot Approve
- Carnos Cannot Execute

### connector
- Connector Connected
- Connector Disconnected
- Connector Restricted
- Connector Scope Missing
- Connector Action Pending
- Connector Action Blocked
- Connector Boundary
- Token Hidden
- Provider Boundary

### spotify
- Spotify Connected
- Spotify Disconnected
- Spotify Restricted
- Spotify Scope Missing
- Spotify Action Pending
- Spotify Action Blocked
- Spotify Boundary
- Premium Required
- No Active Device
- Recently Played Sensitive
- Token Hidden

### audit
- Append Only
- Audit Protected
- Manifest Linked
- Review Linked
- Source Linked
- Evidence Linked
- Export Explicit Only
- Payload Redacted
- Payload Hidden

## Surface Reuse Rules

### /privacy
- Privacy badges must be reused on all privacy cards.
- Private Mode and Emergency Lockdown badges must appear when active.
- Carnos badges must appear where Carnos access is shown.
- Connector and Spotify badges must appear on connector cards.
- Audit badges must appear on Audit Viewer card.

### audit_viewer
- Audit Viewer must use event taxonomy for event type labels.
- Audit Viewer must use badge taxonomy for visible states.
- Audit Viewer must show redaction badges when payload is not full value.
- Audit Viewer must show append-only and audit-protected badges.
- Audit Viewer must show connector and Spotify token boundary badges.

### export_preview
- Export preview must show Sensitive Included when sensitive data is included.
- Export preview must show Locked Excluded when locked data is excluded.
- Export preview must show Redacted when redaction is applied.
- Export preview must show Token Hidden for connector or Spotify token boundaries.
- Export preview must show Export Explicit Only for audit logs.

### review_queue
- Review queue must show status badges.
- Review queue must show risk badges.
- Review queue must show two-step and cooldown badges.
- Review queue must show Carnos Cannot Approve when proposed by Carnos.
- Review queue must show connector and Spotify badges when action involves providers.

### manifests
- Export, forget, and destructive manifests must use the same status badges.
- Manifests must show Hard Removal Deferred where applicable.
- Manifests must show Audit Protected for protected records.
- Manifests must show Source Protected for protected evidence.
- Manifests must show Provider Boundary for connector or Spotify provider limits.

### carnos_surfaces
- Carnos surfaces must respect Carnos Restricted and Carnos Disabled badges.
- Carnos must not use hidden, forgotten, or fully locked data despite badge visibility.
- Carnos can explain badge meanings when metadata-only access is allowed.
- Carnos cannot remove badges.
- Carnos cannot downgrade badges.

## Badge Resolution Rules

- Most restrictive badge wins when multiple privacy badges apply.
- Emergency Lockdown Active overrides normal privacy display.
- Fully Locked overrides Sensitive when access is denied.
- Hidden overrides dashboard display even if data is not forgotten.
- Forgotten overrides Carnos access even if metadata remains.
- Token Hidden always applies to connector and Spotify token boundaries.
- Provider Boundary applies when provider-side data is outside ascendOS control.
- Hard Removal Deferred must be shown when hard removal is requested but not executed.
- Append Only must be shown for audit boundary records.
- Export Explicit Only must be shown for audit export inclusion.

## Taxonomy Mapping Requirements

- Every privacy audit event must map to one event group.
- Every privacy audit event must map to one actor type.
- Every privacy audit event must map to one status.
- Every redacted display must include redaction level.
- Every redacted display must include redaction reason where safe.
- Every connector event involving tokens must show Token Hidden.
- Every Spotify event involving tokens must show Token Hidden.
- Every Spotify recently played surface must show Recently Played Sensitive unless explicitly downgraded by user review.
- Every destructive action event must show Destructive Boundary or Hard Removal Deferred.
- Every audit record surface must show Append Only or Audit Protected where applicable.

## Blocked Reasons

- taxonomy_missing
- event_group_missing
- actor_type_missing
- status_missing
- redaction_level_missing
- redaction_reason_missing
- badge_missing
- privacy_badge_conflict
- surface_badge_conflict
- private_mode_badge_required
- emergency_lockdown_badge_required
- fully_locked_badge_required
- carnos_badge_required
- connector_badge_required
- spotify_badge_required
- token_hidden_badge_required
- append_only_badge_required
- export_explicit_badge_required

## Audit Events Required

- privacy_taxonomy_loaded
- privacy_taxonomy_missing_event_blocked
- redaction_level_applied
- redaction_reason_applied
- privacy_badge_applied
- status_badge_applied
- risk_badge_applied
- carnos_badge_applied
- connector_badge_applied
- spotify_badge_applied
- audit_badge_applied
- badge_conflict_detected
- badge_resolution_applied
- token_hidden_badge_applied
- append_only_badge_applied
- hard_removal_deferred_badge_applied
- recently_played_sensitive_badge_applied

## Must Not Do

- do not create migrations in 20O
- do not invent badge persistence schema in 20O
- do not invent redaction persistence schema in 20O
- do not implement UI components in 20O
- do not implement runtime enforcement in 20O
- do not let surfaces use inconsistent badge names
- do not let connector token surfaces omit Token Hidden
- do not let Spotify token surfaces omit Token Hidden
- do not let hard-removal-deferred surfaces omit Hard Removal Deferred
- do not let audit surfaces omit Append Only where applicable
- do not let Carnos downgrade or remove badges

## Acceptance

- Privacy audit event taxonomy is defined.
- Event group taxonomy is defined.
- Actor taxonomy is defined.
- Status taxonomy is defined.
- Redaction levels are defined.
- Redaction reasons are defined.
- Badge taxonomy is defined.
- Surface reuse rules are defined.
- Badge resolution rules are defined.
- Taxonomy mapping requirements are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Connector badges are included.
- Spotify badges are included.
- Carnos badges are included.
- 20O audit passes.
- Full project check passes.
