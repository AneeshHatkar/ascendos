import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20P_DATA_RETENTION_BOUNDARY.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20p_data_retention_boundary_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20P_DATA_RETENTION_BOUNDARY_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Data Retention Boundary",
  "Needs live database schema: false",
  "Retention Policy Taxonomy",
  "keep_forever",
  "review_after_n_days",
  "auto_archive_after_n_days",
  "forget_candidate_after_n_days",
  "expire_export_after_n_days",
  "expire_action_request_after_n_days",
  "expire_connector_action_after_n_days",
  "expire_spotify_action_after_n_days",
  "metadata_only_after_n_days",
  "redact_payload_after_n_days",
  "Retention Subjects",
  "memory_candidates",
  "saved_memories",
  "exports",
  "private_sessions",
  "privacy_review_requests",
  "audit_previews",
  "connector_action_proposals",
  "spotify_action_proposals",
  "source_evidence_references",
  "custom_tracker_privacy_proposals",
  "Unreviewed memory candidates must not remain pending forever.",
  "Retention cannot restore forgotten memory to context.",
  "Expired exports cannot be downloaded.",
  "Carnos cannot disable or expire Private Mode early.",
  "Expired connector actions cannot execute.",
  "Expired Spotify actions cannot execute.",
  "Retention State Model",
  "active",
  "review_due",
  "archived",
  "metadata_only",
  "redacted",
  "expired",
  "retention_deferred",
  "protected",
  "Timestamp Fields For Future Persistence",
  "review_after",
  "archive_after",
  "expires_at",
  "metadata_only_after",
  "redact_after",
  "retention_checked_at",
  "Retention Versus Privacy Rules",
  "Retention cannot override Private Mode.",
  "Retention cannot override Emergency Lockdown.",
  "Retention cannot override fully locked domains.",
  "Retention cannot override forgotten memory state.",
  "Retention cannot override connector token boundaries.",
  "Retention cannot override Spotify token boundaries.",
  "Retention cannot expand Carnos access.",
  "Retention Action Rules",
  "review_after",
  "auto_archive_after",
  "expire_after",
  "metadata_only_after",
  "redact_payload_after",
  "Review-after does not grant Carnos access.",
  "Auto-archive does not hard remove data.",
  "Expired export availability cannot be downloaded.",
  "Expired connector actions cannot execute.",
  "Expired Spotify actions cannot execute.",
  "Warning Codes",
  "retention_review_due",
  "retention_expired",
  "retention_metadata_only",
  "retention_redacted",
  "forgotten_memory_preserved",
  "connector_token_boundary_preserved",
  "spotify_token_boundary_preserved",
  "expired_action_not_executable",
  "expired_export_not_downloadable",
  "Blocked Reasons",
  "retention_policy_missing",
  "retention_timestamp_missing",
  "private_mode_active",
  "emergency_lockdown_active",
  "fully_locked_domain",
  "forgotten_memory",
  "connector_token_boundary",
  "spotify_token_boundary",
  "expired",
  "carnos_access_blocked",
  "Audit Events Required",
  "retention_policy_assigned",
  "retention_review_due",
  "retention_archived",
  "retention_metadata_only_applied",
  "retention_redaction_applied",
  "memory_candidate_expired",
  "export_expired",
  "privacy_review_request_expired",
  "connector_action_expired",
  "spotify_action_expired",
  "custom_tracker_privacy_proposal_expired",
  "Badge Requirements",
  "Retention Active",
  "Review Due",
  "Archive Due",
  "Archived",
  "Metadata Only",
  "Redacted",
  "Expired",
  "Protected",
  "Connector Boundary",
  "Spotify Boundary",
  "Expired Action Blocked",
  "Must Not Do",
  "do not create migrations in 20P",
  "do not invent retention persistence schema in 20P",
  "do not implement retention jobs in 20P",
  "do not implement cron workers in 20P",
  "do not implement archive mutations in 20P",
  "do not implement expiry mutations in 20P",
  "do not implement runtime enforcement in 20P",
  "do not let retention override Private Mode",
  "do not let retention restore forgotten memory",
  "do not let retention expand Carnos access",
  "do not let retention expose connector token values",
  "do not let retention expose Spotify token values",
  "do not let expired actions execute",
  "do not let expired exports download",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.retention_policy_taxonomy.length < 10) missing.push("retention policy taxonomy incomplete");
if (fixture.retention_subjects.length < 10) missing.push("retention subjects incomplete");
if (fixture.retention_state_model.length < 10) missing.push("retention state model incomplete");
if (fixture.timestamp_fields_for_future_persistence.length < 12) missing.push("timestamp fields incomplete");
if (fixture.retention_vs_privacy_rules.length < 12) missing.push("retention privacy rules incomplete");
if (fixture.retention_action_rules.length < 5) missing.push("retention action rules incomplete");
if (fixture.warning_codes.length < 16) missing.push("warning codes incomplete");
if (fixture.blocked_reasons.length < 19) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 17) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20P audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20P data retention boundary audit passed.");
console.log("✓ Retention policies, subjects, expiration, archive, metadata-only, redaction, connector, Spotify, audit, and badges are locked.");
