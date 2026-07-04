import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20I_PRIVACY_ACTION_REVIEW_QUEUE.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20i_privacy_action_review_queue_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20I_PRIVACY_ACTION_REVIEW_QUEUE_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Privacy Action Review Queue",
  "Needs live database schema: false",
  "Queue Item Model",
  "review_id",
  "action_type",
  "requested_by",
  "proposed_by",
  "target_domain",
  "target_scope",
  "risk_level",
  "priority",
  "status",
  "review_required_reason",
  "blocked_reason",
  "expires_at",
  "audit_event_id",
  "manifest_id",
  "Reviewable Action Types",
  "approve_memory",
  "reject_memory",
  "defer_memory",
  "forget_memory",
  "hide_memory",
  "archive_memory",
  "export_data",
  "request_destructive_action",
  "toggle_private_mode",
  "enable_emergency_lockdown",
  "disable_emergency_lockdown",
  "change_sensitive_lock",
  "change_domain_privacy_permission",
  "change_carnos_permission",
  "connect_external_api",
  "disconnect_external_api",
  "change_connector_scope",
  "approve_connector_action",
  "approve_spotify_action",
  "Status Model",
  "needs_review",
  "approved",
  "rejected",
  "deferred",
  "blocked",
  "cooldown_pending",
  "ready_to_execute",
  "completed",
  "failed",
  "expired",
  "Risk Levels",
  "low",
  "medium",
  "high",
  "critical",
  "Priority Levels",
  "urgent",
  "Actor Rules",
  "Carnos cannot approve review requests.",
  "Carnos cannot execute destructive action requests.",
  "Carnos cannot disable Private Mode.",
  "Carnos cannot disable Emergency Lockdown.",
  "Carnos cannot change connector scopes silently.",
  "Carnos cannot approve Spotify actions silently.",
  "Action Review Rules",
  "memory",
  "export",
  "destructive_action_boundary",
  "privacy_modes",
  "locks_and_permissions",
  "external_connectors",
  "spotify",
  "Export requires preview before approval.",
  "Destructive action requires two-step confirmation.",
  "Emergency Lockdown disable requires explicit confirmation.",
  "Connector scope change requires review.",
  "Spotify action approval requires scope display.",
  "Spotify token values are never shown to Carnos.",
  "Expiration Rules",
  "Expired requests cannot execute.",
  "Expired connector action requests cannot execute.",
  "Expired Spotify action requests cannot execute.",
  "Expired destructive action requests cannot execute.",
  "Blocked Reasons",
  "review_required",
  "approval_missing",
  "request_expired",
  "private_mode_active",
  "emergency_lockdown_active",
  "two_step_confirmation_required",
  "manifest_required",
  "connector_scope_missing",
  "spotify_scope_missing",
  "spotify_premium_required",
  "spotify_no_active_device",
  "Audit Events Required",
  "privacy_action_requested",
  "privacy_action_approved",
  "privacy_action_rejected",
  "privacy_action_deferred",
  "privacy_action_blocked",
  "privacy_action_expired",
  "connector_action_review_required",
  "spotify_action_review_required",
  "Badge Requirements",
  "Needs Review",
  "Approved",
  "Rejected",
  "Deferred",
  "Blocked",
  "Expired",
  "Cooldown Pending",
  "Two Step Required",
  "Manifest Required",
  "Connector Restricted",
  "Spotify Restricted",
  "Premium Required",
  "No Active Device",
  "Must Not Do",
  "do not create migrations in 20I",
  "do not invent privacy_action_requests schema in 20I",
  "do not implement queue persistence in 20I",
  "do not implement runtime approval execution in 20I",
  "do not let Carnos approve review requests",
  "do not let connector actions bypass review",
  "do not let Spotify actions bypass review",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.queue_item_model.required_fields.length < 20) missing.push("queue model fields incomplete");
if (fixture.reviewable_action_types.length < 18) missing.push("reviewable action types incomplete");
if (fixture.status_model.length < 10) missing.push("status model incomplete");
if (fixture.risk_levels.length < 4) missing.push("risk levels incomplete");
if (fixture.priority_levels.length < 4) missing.push("priority levels incomplete");
if (fixture.actor_rules.length < 10) missing.push("actor rules incomplete");
if (fixture.action_review_rules.length < 7) missing.push("action review groups incomplete");
if (fixture.expiration_rules.length < 7) missing.push("expiration rules incomplete");
if (fixture.blocked_reasons.length < 22) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 18) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20I audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20I privacy action review queue audit passed.");
console.log("✓ Queue model, actions, statuses, risk, actors, expiration, connector, Spotify, audit, and badges are locked.");
