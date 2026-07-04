# Phase 20P — Data Retention Boundary

## Purpose

Define retention policy taxonomy, expiration, archive, review-after, forget-candidate, export expiry, private session expiry, review request expiry, connector action proposal expiry, Spotify action proposal expiry, source/evidence retention, custom tracker privacy proposal retention, and privacy-safe retention behavior before jobs, schema, or runtime enforcement exist.

## Schema Requirement

- Needs live database schema: false
- Reason: 20P defines retention contracts only. It does not create retention persistence, retention jobs, cron workers, archive mutations, expiry mutations, repositories, RLS policies, or runtime enforcement.
- Future schema gate: If a later chunk persists retention policies, retention timestamps, archive state, expiry state, review-after state, retention jobs, source evidence retention, connector retention, Spotify retention, or custom tracker privacy proposal retention, inspect exact schema before coding.

## Retention Policy Taxonomy

### keep_forever
- Meaning: Keep until user changes policy or future protected boundary applies.
- Warning: Must not bypass privacy, sensitive locks, forgotten-memory rules, or Carnos access restrictions.

### review_after_n_days
- Meaning: Keep active but require review after configured age.
- Warning: Review-after is not automatic approval for continued Carnos use.

### auto_archive_after_n_days
- Meaning: Move out of active use after configured age where future execution supports it.
- Warning: Archive is not hard removal.

### forget_candidate_after_n_days
- Meaning: Memory candidate or proposal expires if not reviewed in time.
- Warning: Expired candidate cannot become memory without renewed review.

### expire_export_after_n_days
- Meaning: Export availability expires after configured age.
- Warning: Expiration does not remove audit proof.

### expire_action_request_after_n_days
- Meaning: Review request expires if not approved in time.
- Warning: Expired request cannot execute.

### expire_connector_action_after_n_days
- Meaning: Connector action proposal expires if not approved in time.
- Warning: Expired connector action cannot execute.

### expire_spotify_action_after_n_days
- Meaning: Spotify action proposal expires if not approved in time.
- Warning: Expired Spotify action cannot execute.

### metadata_only_after_n_days
- Meaning: Payload moves to metadata-only visibility after configured age where future execution supports it.
- Warning: Metadata-only must still respect sensitivity and privacy locks.

### redact_payload_after_n_days
- Meaning: Payload display becomes redacted after configured age where future execution supports it.
- Warning: Redaction is display and access control behavior, not proof removal.

## Retention Subjects

### memory_candidates
- Default policy: forget_candidate_after_n_days
- Rules:
  - Unreviewed memory candidates must not remain pending forever.
  - Expired memory candidates cannot be approved without renewed review.
  - Rejected memory candidates cannot return through retention.
  - Deferred memory candidates require review before use.
  - Carnos cannot use expired memory candidates.

### saved_memories
- Default policy: review_after_n_days
- Rules:
  - Saved memory retention must respect forgotten state.
  - Saved memory retention must respect hidden state.
  - Saved memory retention must respect archive state.
  - Saved memory retention must respect Carnos access restrictions.
  - Retention cannot restore forgotten memory to context.

### exports
- Default policy: expire_export_after_n_days
- Rules:
  - Ready exports must expire.
  - Expired exports cannot be downloaded.
  - Export metadata can remain for audit where allowed.
  - Sensitive exports can require shorter expiration.
  - Export all can require shorter expiration.

### private_sessions
- Default policy: review_after_n_days
- Rules:
  - Timed Private Mode must expire based on configured boundary.
  - Until-disabled Private Mode remains active until user action.
  - Private session metadata can remain for audit.
  - Private session retention cannot expose private payloads.
  - Carnos cannot disable or expire Private Mode early.

### privacy_review_requests
- Default policy: expire_action_request_after_n_days
- Rules:
  - Review requests must expire.
  - Expired review requests cannot execute.
  - Expired review requests leave existing privacy state unchanged.
  - High-risk review requests can have shorter expiration.
  - Review request metadata can remain for audit.

### audit_previews
- Default policy: metadata_only_after_n_days
- Rules:
  - Audit previews can become metadata-only.
  - Audit proof remains append-only.
  - Audit payload display can be redacted.
  - Audit retention cannot remove protected event proof.
  - Carnos cannot clear audit previews.

### connector_action_proposals
- Default policy: expire_connector_action_after_n_days
- Rules:
  - Connector action proposals must expire.
  - Expired connector actions cannot execute.
  - Connector token values are never retained in visible surfaces.
  - Connector provider boundaries must remain visible.
  - Disconnected connector metadata must show retention state.

### spotify_action_proposals
- Default policy: expire_spotify_action_after_n_days
- Rules:
  - Spotify action proposals must expire.
  - Expired Spotify actions cannot execute.
  - Spotify token values are never retained in visible surfaces.
  - Spotify recently played metadata is sensitive by default.
  - Spotify provider boundaries must remain visible.

### source_evidence_references
- Default policy: review_after_n_days
- Rules:
  - Source and evidence references must preserve provenance where allowed.
  - Restricted source payloads can become metadata-only.
  - Evidence privacy labels must remain visible where allowed.
  - Source evidence retention cannot bypass locks.
  - Source evidence retention cannot reintroduce forgotten memory.

### custom_tracker_privacy_proposals
- Default policy: expire_action_request_after_n_days
- Rules:
  - Custom tracker privacy proposals must expire if not reviewed.
  - Expired tracker privacy proposals cannot apply.
  - Tracker privacy retention must respect tracker sensitivity.
  - Tracker privacy retention must respect Carnos permissions.
  - Tracker entries from locked trackers cannot be surfaced by retention.

## Retention State Model

- active
- review_due
- review_required
- archive_due
- archived
- metadata_only
- redacted
- expired
- blocked
- retention_deferred
- protected

## Timestamp Fields For Future Persistence

- created_at
- updated_at
- last_reviewed_at
- review_after
- archive_after
- expire_after
- expires_at
- archived_at
- metadata_only_after
- redact_after
- redacted_at
- blocked_at
- retention_checked_at

## Retention Versus Privacy Rules

- Retention cannot override Private Mode.
- Retention cannot override Emergency Lockdown.
- Retention cannot override fully locked domains.
- Retention cannot override hidden-from-Carnos state.
- Retention cannot override forgotten memory state.
- Retention cannot override connector token boundaries.
- Retention cannot override Spotify token boundaries.
- Retention cannot downgrade sensitivity without review.
- Retention cannot expand Carnos access.
- Retention cannot make audit payloads visible when redaction is required.
- Retention cannot make expired action requests executable.
- Retention cannot make expired connector actions executable.
- Retention cannot make expired Spotify actions executable.

## Retention Action Rules

### review_after
- Review-after creates review requirement only.
- Review-after does not approve continued use.
- Review-after does not grant Carnos access.
- Review-after must preserve current privacy state.
- Review-after must be audited where future execution exists.

### auto_archive_after
- Auto-archive moves data out of active use where future execution supports it.
- Auto-archive does not hard remove data.
- Auto-archive must preserve audit boundaries.
- Auto-archive must preserve source/evidence references where allowed.
- Auto-archive must not expose hidden or locked data.

### expire_after
- Expire-after makes requests or availability unusable after time boundary.
- Expired export availability cannot be downloaded.
- Expired review requests cannot execute.
- Expired connector actions cannot execute.
- Expired Spotify actions cannot execute.

### metadata_only_after
- Metadata-only reduces visible payload detail.
- Metadata-only still preserves proof and source metadata where allowed.
- Metadata-only must not expose sensitive payload.
- Metadata-only must show badge.
- Metadata-only must be compatible with export manifests.

### redact_payload_after
- Redaction reduces visible payload detail.
- Redaction does not erase event proof.
- Redaction reason must be tracked where safe.
- Redaction badges must be shown.
- Redaction must be compatible with Carnos restrictions.

## Warning Codes

- retention_review_due
- retention_review_required
- retention_archive_due
- retention_expiry_due
- retention_expired
- retention_metadata_only
- retention_redacted
- retention_protected
- retention_deferred
- privacy_state_preserved
- forgotten_memory_preserved
- audit_proof_preserved
- connector_token_boundary_preserved
- spotify_token_boundary_preserved
- spotify_recently_played_sensitive
- carnos_access_not_expanded
- expired_action_not_executable
- expired_export_not_downloadable

## Blocked Reasons

- retention_policy_missing
- retention_timestamp_missing
- retention_subject_missing
- retention_action_not_supported
- private_mode_active
- emergency_lockdown_active
- fully_locked_domain
- hidden_from_carnos
- forgotten_memory
- audit_protected
- source_evidence_protected
- connector_token_boundary
- connector_provider_boundary
- spotify_token_boundary
- spotify_provider_boundary
- review_required
- expired
- archive_not_supported
- metadata_only_not_supported
- redaction_required
- carnos_access_blocked

## Audit Events Required

- retention_policy_assigned
- retention_policy_changed
- retention_review_due
- retention_review_required
- retention_archive_due
- retention_archived
- retention_metadata_only_applied
- retention_redaction_applied
- retention_expiry_due
- retention_expired
- retention_blocked
- retention_deferred
- memory_candidate_expired
- export_expired
- privacy_review_request_expired
- connector_action_expired
- spotify_action_expired
- source_evidence_retention_review_required
- custom_tracker_privacy_proposal_expired

## Badge Requirements

- Retention Active
- Review Due
- Review Required
- Archive Due
- Archived
- Metadata Only
- Redacted
- Expired
- Protected
- Retention Deferred
- Private Mode Active
- Emergency Lockdown Active
- Forgotten Preserved
- Audit Proof Preserved
- Connector Boundary
- Spotify Boundary
- Token Hidden
- Recently Played Sensitive
- Carnos Not Expanded
- Expired Action Blocked

## Must Not Do

- do not create migrations in 20P
- do not invent retention persistence schema in 20P
- do not implement retention jobs in 20P
- do not implement cron workers in 20P
- do not implement archive mutations in 20P
- do not implement expiry mutations in 20P
- do not implement runtime enforcement in 20P
- do not let retention override Private Mode
- do not let retention override Emergency Lockdown
- do not let retention restore forgotten memory
- do not let retention expand Carnos access
- do not let retention expose connector token values
- do not let retention expose Spotify token values
- do not let expired actions execute
- do not let expired exports download

## Acceptance

- Retention policy taxonomy is defined.
- Retention subjects are defined.
- Retention state model is defined.
- Future timestamp fields are listed.
- Retention versus privacy rules are defined.
- Retention action rules are defined.
- Warning codes are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Memory candidate retention is included.
- Saved memory retention is included.
- Export retention is included.
- Private session retention is included.
- Privacy review request retention is included.
- Audit preview retention is included.
- Connector action retention is included.
- Spotify action retention is included.
- Source/evidence retention is included.
- Custom tracker privacy proposal retention is included.
- 20P audit passes.
- Full project check passes.
