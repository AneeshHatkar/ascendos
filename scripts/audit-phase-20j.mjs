import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20J_TWO_STEP_COOLDOWN_BOUNDARY.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20j_two_step_cooldown_boundary_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20J_TWO_STEP_COOLDOWN_BOUNDARY_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Two-Step Confirmation + Cooldown Boundary",
  "Needs live database schema: false",
  "Confirmation Levels",
  "none",
  "single_review",
  "explicit_confirmation",
  "two_step_confirmation",
  "two_step_plus_cooldown",
  "One-Step Actions",
  "approve_normal_memory",
  "toggle_private_mode_on",
  "enable_emergency_lockdown",
  "Two-Step Actions",
  "destructive_action_boundary",
  "bulk_forget",
  "export_all",
  "disable_emergency_lockdown",
  "unlock_fully_locked_domain",
  "change_high_risk_connector_scope",
  "approve_spotify_device_transfer",
  "approve_spotify_volume_change",
  "approve_spotify_playback_automation",
  "Cooldown Required Actions",
  "critical_destructive_action",
  "bulk_forget_sensitive_scope",
  "disable_emergency_lockdown",
  "unlock_fully_locked_domain",
  "high_risk_connector_permission_change",
  "approve_high_risk_spotify_playback_automation",
  "Cooldown State Model",
  "cooldown_pending",
  "cooldown_complete",
  "cooldown_expired",
  "Confirmation State Model",
  "first_confirmed",
  "second_confirmed",
  "ready_to_execute",
  "Timestamp Fields For Future Persistence",
  "requested_at",
  "first_confirmed_at",
  "second_confirmed_at",
  "can_execute_after",
  "cannot_execute_after",
  "expires_at",
  "Execution Readiness Rules",
  "Execution readiness is not execution.",
  "This chunk never executes actions.",
  "An action is not ready if expired.",
  "An action is not ready if connector scope is missing.",
  "An action is not ready if Spotify provider state blocks it.",
  "Carnos cannot mark an action ready to execute.",
  "Action Group Rules",
  "memory",
  "export",
  "destructive_action_boundary",
  "private_mode",
  "emergency_lockdown",
  "sensitive_locks",
  "carnos_permissions",
  "connectors",
  "spotify",
  "Destructive action always requires two-step confirmation.",
  "Critical destructive action requires cooldown.",
  "Disabling Emergency Lockdown requires two-step confirmation.",
  "Expanding Carnos access for sensitive domains requires two-step confirmation.",
  "Changing high-risk connector scopes requires two-step confirmation.",
  "Spotify device transfer requires two-step confirmation.",
  "Spotify volume change requires two-step confirmation.",
  "Spotify playback automation requires two-step confirmation.",
  "Blocked Reasons",
  "confirmation_required",
  "two_step_confirmation_required",
  "cooldown_required",
  "cooldown_not_finished",
  "action_expired",
  "manifest_required",
  "audit_required",
  "connector_scope_missing",
  "spotify_scope_missing",
  "spotify_premium_required",
  "spotify_no_active_device",
  "Audit Events Required",
  "confirmation_requested",
  "first_confirmation_recorded",
  "second_confirmation_recorded",
  "cooldown_started",
  "cooldown_completed",
  "action_ready_to_execute",
  "connector_confirmation_required",
  "spotify_confirmation_required",
  "Badge Requirements",
  "Confirmation Required",
  "Two Step Required",
  "Cooldown Pending",
  "Ready To Execute",
  "Premium Required",
  "No Active Device",
  "Must Not Do",
  "do not create migrations in 20J",
  "do not invent confirmation persistence schema in 20J",
  "do not implement cooldown persistence in 20J",
  "do not implement runtime action execution in 20J",
  "do not mark execution as completed in 20J",
  "do not let Carnos confirm actions",
  "do not let actions bypass cooldown",
  "do not let expired actions execute",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.confirmation_levels.length < 5) missing.push("confirmation levels incomplete");
if (fixture.one_step_actions.length < 10) missing.push("one-step actions incomplete");
if (fixture.two_step_actions.length < 12) missing.push("two-step actions incomplete");
if (fixture.cooldown_required_actions.length < 8) missing.push("cooldown actions incomplete");
if (fixture.cooldown_state_model.length < 6) missing.push("cooldown state model incomplete");
if (fixture.confirmation_state_model.length < 8) missing.push("confirmation state model incomplete");
if (fixture.timestamp_fields_for_future_persistence.length < 8) missing.push("timestamp fields incomplete");
if (fixture.execution_readiness_rules.length < 12) missing.push("readiness rules incomplete");
if (fixture.action_group_rules.length < 9) missing.push("action group rules incomplete");
if (fixture.blocked_reasons.length < 24) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 18) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 16) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20J audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20J two-step confirmation cooldown audit passed.");
console.log("✓ Confirmation levels, cooldowns, expiry, readiness, memory, export, destructive, connector, Spotify, audit, and badges are locked.");
