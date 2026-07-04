# Phase 20L — Export Contracts + Manifest + Expiration

## Purpose

Define export request, preview, manifest, status, expiration, warning, redaction, connector, Spotify, audit, and safety rules before any real export generation exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20L defines export contracts only. It does not create data_exports persistence, export_manifests persistence, storage files, signed links, background jobs, repositories, RLS policies, or export execution.
- Future schema gate: If a later chunk persists export requests, export manifests, storage object metadata, expiration timestamps, signed links, checksums, export audit rows, connector export data, or Spotify export data, inspect exact schema before coding.

## Export Request Model

### Required Fields
- export_id
- requested_by
- requested_at
- requested_action
- scope_id
- scope_label
- scope_summary
- format
- status
- privacy_level
- sensitivity_level
- redaction_level
- include_audit_logs
- include_connector_metadata
- include_spotify_metadata
- requires_preview
- requires_review
- requires_manifest
- confirmation_level
- cooldown_state
- expires_at
- audit_event_id

### Optional Fields
- date_range
- domain_filters
- record_type_filters
- source_type_filters
- connector_ids
- spotify_connection_ids
- requested_filename_boundary
- storage_object_boundary
- checksum_boundary
- manifest_id
- review_id
- blocked_reasons
- warning_codes
- downloaded_at
- expired_at
- failed_at

## Export Preview Model

- preview_id
- export_id
- scope_id
- generated_at
- requested_action
- included_categories
- excluded_categories
- record_count_estimate
- sensitive_count_estimate
- locked_count_estimate
- redacted_count_estimate
- connector_count_estimate
- spotify_count_estimate
- audit_log_count_estimate
- warnings
- blocked_reasons
- requires_review
- requires_two_step_confirmation
- requires_cooldown
- manifest_required

## Export Manifest Model

- manifest_id
- export_id
- created_at
- created_by
- scope_id
- format
- status
- included_categories
- excluded_categories
- record_count
- sensitive_count
- locked_count
- redacted_count
- connector_metadata_count
- spotify_metadata_count
- audit_log_count
- warning_codes
- blocked_reasons
- redaction_summary
- expiration_policy
- expires_at
- checksum_boundary
- audit_event_id

Note: The checksum boundary is a contract marker only in 20L. This chunk does not compute hashes or create files.

## Export Status Model

### draft
- Meaning: Export request is being configured.

### preview_required
- Meaning: Export cannot proceed until preview exists.

### needs_review
- Meaning: Export requires explicit user review.

### confirmation_required
- Meaning: Export requires confirmation before it can become ready.

### cooldown_pending
- Meaning: Export was confirmed but cooldown still blocks readiness.

### ready_to_prepare
- Meaning: Export passed safety gates but no file generation happens in this chunk.

### preparing
- Meaning: Future export execution boundary is preparing output.

### ready
- Meaning: Future export execution boundary created an available export.

### downloaded
- Meaning: Future export was downloaded or accessed.

### expired
- Meaning: Export availability expired.

### failed
- Meaning: Export failed in a future execution boundary.

### blocked
- Meaning: Export is blocked by privacy, lock, review, manifest, scope, connector, Spotify, or audit rules.

## Export Formats

### json
- Rule: Allowed as structured export format once execution exists.

### csv
- Rule: Allowed only for tabular categories once execution exists.

### markdown
- Rule: Allowed for readable summaries once execution exists.

### zip_bundle
- Rule: Allowed for multi-file exports once execution exists.

### manifest_only
- Rule: Allowed for proof and audit preview without data file generation.

## Expiration Rules

- Every export request must have an expiration boundary.
- Every export manifest must include expires_at.
- Ready exports cannot remain available forever.
- Expired exports cannot be downloaded.
- Expired export metadata remains auditable where retention allows.
- Export all can require shorter expiration.
- Sensitive export can require shorter expiration.
- Connector export metadata can expire independently of provider data.
- Spotify export metadata can expire independently of provider data.
- Expiration does not remove audit proof.

## Scope Category Rules

### memory
- Included records:
  - memory_item
  - memory_candidate
- Rules:
  - Forgotten memory is excluded from Carnos context summaries.
  - Forgotten memory can appear only as metadata where allowed by manifest and audit rules.
  - Rejected and deferred memory candidates require clear status labels.
  - Sensitive memory requires warning and redaction review.

### privacy
- Included records:
  - privacy_setting
  - privacy_action_request
  - sensitive_lock
  - carnos_permission
  - redaction_rule
  - retention_rule
- Rules:
  - Privacy configuration export requires review.
  - Sensitive lock states must be marked.
  - Carnos permission rules must be marked.
  - Private Mode and Emergency Lockdown event metadata must be marked.

### audit
- Included records:
  - audit_log
- Rules:
  - Audit export requires explicit inclusion.
  - Audit payloads can require redaction.
  - Append-only audit semantics must be preserved.
  - Audit event ids must link to manifests where allowed.

### custom_trackers
- Included records:
  - custom_tracker
  - custom_tracker_field
  - custom_tracker_entry
- Rules:
  - Custom tracker export must respect tracker privacy.
  - Sensitive tracker fields require redaction review.
  - Archived tracker entries must be marked.
  - Locked tracker data is excluded unless reviewed.

### documents_evidence
- Included records:
  - document
  - evidence_attachment
  - knowledge_item
  - current_info_source
- Rules:
  - Document references can export metadata without raw content when restricted.
  - Evidence attachments must preserve source and privacy labels.
  - Current-info sources must preserve review and retention metadata.
  - Locked documents are excluded unless reviewed.

### analytics_timeline
- Included records:
  - analytics_snapshot
  - self_experiment
  - timeline_event
  - goal
  - task
  - proof_item
- Rules:
  - Analytics export must respect source privacy.
  - Sensitive analytics snapshots require redaction.
  - Timeline events from locked domains are excluded unless reviewed.
  - Proof items preserve source and audit metadata.

### external_connectors
- Included records:
  - connector_account
  - connector_scope
  - connector_action_request
  - connector_action_manifest
- Rules:
  - Connector token values are never exported.
  - Connector account metadata requires scope and privacy review.
  - Connector action manifests can export without token exposure.
  - Disconnected connector data must show retention state.

### spotify
- Included records:
  - spotify_connection_status
  - spotify_scope_grant
  - spotify_playback_snapshot
  - spotify_device_snapshot
  - spotify_playlist_snapshot
  - spotify_recently_played_snapshot
  - spotify_action_proposal
  - spotify_action_manifest
- Rules:
  - Spotify token values are never exported.
  - Spotify recently played data is sensitive by default.
  - Spotify playback snapshots require privacy review when tied to personal context.
  - Spotify device metadata must avoid exposing unnecessary provider identifiers.
  - Spotify action manifests must show required scopes and blocked reasons.

## Warning Codes

- export_scope_empty
- export_scope_too_broad
- export_all_requested
- sensitive_data_included
- locked_data_excluded
- redaction_applied
- audit_logs_included
- audit_payload_redacted
- forgotten_memory_metadata_only
- archived_data_included
- connector_metadata_included
- connector_tokens_excluded
- spotify_metadata_included
- spotify_recently_played_sensitive
- spotify_tokens_excluded
- manifest_only_mode
- short_expiration_required
- two_step_confirmation_required
- cooldown_required

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
- sensitive_lock_active
- redaction_required
- audit_required
- expired
- format_not_allowed
- connector_permission_blocked
- connector_scope_missing
- connector_token_boundary
- spotify_permission_blocked
- spotify_scope_missing
- spotify_premium_required
- spotify_no_active_device
- spotify_token_boundary

## Audit Events Required

- export_request_created
- export_scope_selected
- export_preview_generated
- export_preview_blocked
- export_review_required
- export_confirmation_required
- export_cooldown_required
- export_manifest_created
- export_ready_to_prepare
- export_preparing
- export_ready
- export_downloaded
- export_expired
- export_failed
- export_blocked
- export_redaction_applied
- export_connector_metadata_included
- export_spotify_metadata_included
- export_token_boundary_enforced

## Badge Requirements

- Export Draft
- Preview Required
- Needs Review
- Confirmation Required
- Cooldown Pending
- Ready To Prepare
- Ready
- Downloaded
- Expired
- Failed
- Blocked
- Sensitive Included
- Locked Excluded
- Redacted
- Audit Included
- Manifest Required
- Connector Metadata Included
- Spotify Metadata Included
- Token Excluded
- Short Expiration

## Must Not Do

- do not create migrations in 20L
- do not invent export persistence schema in 20L
- do not implement export file generation in 20L
- do not implement storage buckets in 20L
- do not implement signed links in 20L
- do not implement background jobs in 20L
- do not compute checksums in 20L
- do not export connector token values
- do not export Spotify token values
- do not bypass preview requirements
- do not bypass review requirements
- do not bypass manifest requirements
- do not let expired exports download
- do not let Carnos create exports silently

## Acceptance

- Export request model is defined.
- Export preview model is defined.
- Export manifest model is defined.
- Export status model is defined.
- Export formats are defined.
- Expiration rules are defined.
- Scope category rules are defined.
- Warning codes are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Connector and Spotify export rules are included.
- Token exclusion is explicit.
- 20L audit passes.
- Full project check passes.
