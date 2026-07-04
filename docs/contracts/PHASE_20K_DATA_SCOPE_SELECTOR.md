# Phase 20K — Data Scope Selector

## Purpose

Define the shared data scope selector used by export, forget, hide, archive, destructive action previews, privacy review queue items, connector data previews, Spotify data previews, memory controls, custom trackers, documents, current-info sources, analytics, timeline, and audit surfaces.

## Schema Requirement

- Needs live database schema: false
- Reason: 20K defines selector dimensions and preview rules only. It does not create selector persistence, query builders, repositories, migrations, RLS policies, export execution, forget execution, connector queries, or Spotify queries.
- Future schema gate: If a later chunk implements live selector queries, data export generation, forget/hide/archive mutations, destructive previews, connector reads, Spotify reads, or persisted selector presets, inspect exact schema before coding.

## Selector Model

### Required Fields
- scope_id
- scope_label
- scope_purpose
- requested_action
- requested_by
- target_domains
- target_record_types
- target_source_types
- date_range
- privacy_levels
- sensitivity_levels
- lock_states
- redaction_levels
- ownership_filter
- creation_source_filter
- memory_state_filter
- connector_filter
- spotify_filter
- include_hidden
- include_archived
- include_forgotten
- include_locked
- requires_preview
- requires_review
- requires_manifest
- audit_required

### Optional Fields
- custom_tracker_ids
- custom_tracker_field_ids
- document_ids
- evidence_ids
- current_info_source_ids
- analytics_snapshot_ids
- timeline_event_ids
- memory_ids
- connector_ids
- connector_account_ids
- spotify_connection_ids
- spotify_playlist_id_boundary
- spotify_device_id_boundary
- export_format
- preview_warnings
- blocked_reasons
- estimated_record_count
- estimated_sensitive_count
- estimated_locked_count
- estimated_redacted_count

## Requested Actions

- export_data
- forget_memory
- hide_data
- archive_data
- request_destructive_action
- preview_privacy_action
- review_memory_action
- review_connector_action
- review_spotify_action
- review_carnos_permission_change
- review_sensitive_lock_change

## Domain Dimensions

- career
- learning
- research
- health
- body
- nutrition
- supplements
- sleep_energy
- emotion
- hair_skincare
- finance
- housing
- life_admin
- documents
- grimoire
- creativity
- decisions
- future_simulator
- world_class
- custom_trackers
- memory
- knowledge
- analytics
- experiments
- timeline
- calendar
- goals
- proof
- settings
- privacy
- external_connectors
- spotify

## Record Type Dimensions

- memory_item
- memory_candidate
- audit_log
- privacy_setting
- data_export
- export_manifest
- privacy_action_request
- sensitive_lock
- carnos_permission
- redaction_rule
- retention_rule
- forget_manifest
- destructive_action_manifest
- custom_tracker
- custom_tracker_field
- custom_tracker_entry
- dashboard_card
- document
- evidence_attachment
- knowledge_item
- current_info_source
- analytics_snapshot
- self_experiment
- timeline_event
- calendar_event
- goal
- task
- proof_item
- connector_account
- connector_scope
- connector_action_request
- connector_action_manifest
- spotify_connection_status
- spotify_scope_grant
- spotify_playback_snapshot
- spotify_device_snapshot
- spotify_playlist_snapshot
- spotify_recently_played_snapshot
- spotify_action_proposal
- spotify_action_manifest

## Source Type Dimensions

- user_created
- carnos_created
- system_created
- imported
- document_source
- web_source
- current_info_source
- custom_tracker_source
- analytics_source
- timeline_source
- connector_source
- spotify_source
- manual_entry
- voice_future
- api_future

## Selector Dimensions

### date_range
- Rule: Must support all time, today, this week, this month, this year, custom start/end, before, after, and source-created timestamp boundaries.

### privacy_level
- Rule: Must support public, internal, private, sensitive, locked, and unknown privacy levels.

### sensitivity_level
- Rule: Must support normal, personal, sensitive, highly_sensitive, and unknown sensitivity levels.

### lock_state
- Rule: Must support unlocked, review_required, hidden_from_dashboards, hidden_from_carnos, fully_locked, and unknown lock states.

### redaction_level
- Rule: Must support full_value, summary_only, metadata_only, redacted, hidden, and unknown redaction levels.

### ownership_filter
- Rule: Must preserve user-owned boundaries and never select another users data.

### creation_source_filter
- Rule: Must distinguish user-created, Carnos-created, system-created, imported, connector-created, and Spotify-created boundaries.

### memory_state_filter
- Rule: Must distinguish candidate, approved, rejected, deferred, hidden, archived, forgotten, locked, and redacted memory states.

### connector_filter
- Rule: Must distinguish connector id, account id, provider, scope, action type, action status, and token-boundary metadata without exposing tokens.

### spotify_filter
- Rule: Must distinguish connection status, scope grants, playback snapshots, device snapshots, playlist snapshots, recently played snapshots, action proposals, manifests, premium-required, and no-active-device states.

## Action Specific Rules

### export_data
- Scope selector must produce preview before export.
- Scope selector must show included categories.
- Scope selector must show excluded categories.
- Scope selector must show sensitive counts.
- Scope selector must show locked counts.
- Scope selector must show redacted counts.
- Scope selector must show connector data inclusion or exclusion.
- Scope selector must show Spotify data inclusion or exclusion.
- Export all requires two-step confirmation.
- Sensitive exports require review.

### forget_memory
- Scope selector must distinguish memory candidates from saved memories.
- Scope selector must distinguish approved, rejected, deferred, hidden, archived, and forgotten memory.
- Scope selector must show affected derived record categories when available.
- Scope selector must not treat forget as hard removal by default.
- Bulk forget requires stronger confirmation.
- Forgotten memory must be blocked from Carnos use.

### hide_data
- Scope selector must show which dashboards, timeline surfaces, and broad search surfaces will be affected.
- Hidden data must not show on broad dashboards or timeline surfaces.
- Hidden data must still preserve audit behavior.
- Hide does not automatically block Carnos unless Carnos permission or lock state requires it.

### archive_data
- Scope selector must show active versus archived state.
- Archived data is removed from active use.
- Archived data remains available for history or audit where allowed.
- Archived memory is excluded from active context unless a future narrow history mode allows it.

### request_destructive_action
- Scope selector must show affected records.
- Scope selector must show skipped records.
- Scope selector must show skip reasons.
- Scope selector must require manifest linkage.
- Scope selector must require two-step confirmation.
- Hard-removal remains protected and deferred unless a future execution boundary exists.

### review_connector_action
- Scope selector must show connector id and provider.
- Scope selector must show required scopes.
- Scope selector must show missing scopes.
- Scope selector must show risk level.
- Scope selector must not expose token values.
- Scope selector must respect Private Mode and Emergency Lockdown.

### review_spotify_action
- Scope selector must show required Spotify scopes.
- Scope selector must show missing Spotify scopes.
- Scope selector must show Premium-required state.
- Scope selector must show no-active-device state.
- Scope selector must not expose Spotify token values.
- Scope selector must block recently played memory creation without explicit approval.

## Preview Requirements

- Preview must show requested action.
- Preview must show selected domains.
- Preview must show selected record types.
- Preview must show selected source types.
- Preview must show date range.
- Preview must show privacy levels.
- Preview must show sensitivity levels.
- Preview must show lock states.
- Preview must show estimated record count.
- Preview must show estimated sensitive count.
- Preview must show estimated locked count.
- Preview must show estimated redacted count.
- Preview must show included categories.
- Preview must show excluded categories.
- Preview must show blocked reasons.
- Preview must show review requirements.
- Preview must show manifest requirements.
- Preview must show connector scope warnings.
- Preview must show Spotify scope warnings.
- Preview must show Premium-required and no-active-device warnings when Spotify actions are selected.

## Blocked Reasons

- scope_empty
- scope_too_broad
- domain_not_allowed
- record_type_not_allowed
- source_type_not_allowed
- date_range_invalid
- privacy_level_blocked
- sensitivity_level_blocked
- lock_state_blocked
- redaction_required
- review_required
- manifest_required
- private_mode_active
- emergency_lockdown_active
- fully_locked_domain
- hidden_from_carnos
- hidden_from_dashboards
- forgotten_memory_blocked
- archived_data_excluded
- audit_required
- connector_permission_blocked
- connector_scope_missing
- connector_token_boundary
- spotify_permission_blocked
- spotify_scope_missing
- spotify_premium_required
- spotify_no_active_device
- spotify_token_boundary

## Audit Events Required

- data_scope_selector_opened
- data_scope_selector_changed
- data_scope_preview_generated
- data_scope_preview_blocked
- data_scope_export_scope_selected
- data_scope_forget_scope_selected
- data_scope_hide_scope_selected
- data_scope_archive_scope_selected
- data_scope_destructive_scope_selected
- data_scope_connector_scope_selected
- data_scope_spotify_scope_selected
- data_scope_review_required
- data_scope_manifest_required
- data_scope_sensitive_data_included
- data_scope_locked_data_excluded
- data_scope_redaction_applied

## Badge Requirements

- Scope Selected
- Scope Empty
- Scope Too Broad
- Preview Required
- Review Required
- Manifest Required
- Sensitive Included
- Locked Excluded
- Redacted
- Private Mode Active
- Emergency Lockdown Active
- Connector Restricted
- Connector Scope Missing
- Spotify Restricted
- Spotify Scope Missing
- Premium Required
- No Active Device
- Token Hidden

## Must Not Do

- do not create migrations in 20K
- do not invent selector persistence schema in 20K
- do not implement live data queries in 20K
- do not implement export generation in 20K
- do not implement forget/hide/archive mutations in 20K
- do not implement destructive action execution in 20K
- do not expose connector token values
- do not expose Spotify token values
- do not let scope selector bypass Private Mode
- do not let scope selector bypass Emergency Lockdown
- do not let scope selector include locked data without review
- do not let scope selector create Spotify memory without approval

## Acceptance

- Selector model is defined.
- Requested actions are defined.
- Domain dimensions are defined.
- Record type dimensions are defined.
- Source type dimensions are defined.
- Selector dimensions are defined.
- Action-specific rules are defined.
- Preview requirements are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Connector and Spotify selector rules are included.
- 20K audit passes.
- Full project check passes.
