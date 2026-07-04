import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20H_CARNOS_ACCESS_MATRIX.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20h_carnos_access_matrix_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20H_CARNOS_ACCESS_MATRIX_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Carnos Access Matrix",
  "Needs live database schema: false",
  "Capability Matrix",
  "can_read",
  "can_summarize",
  "can_suggest",
  "can_create_memory_candidate",
  "can_use_in_context_pack",
  "can_use_in_analytics",
  "can_show_on_dashboard",
  "can_reference_in_chat",
  "can_include_in_export_summary",
  "can_trigger_action_proposal",
  "can_execute_approved_action",
  "Absolute Denials",
  "Carnos cannot approve its own memory candidates.",
  "Carnos cannot approve privacy actions.",
  "Carnos cannot execute destructive actions.",
  "Carnos cannot disable Private Mode.",
  "Carnos cannot disable Emergency Lockdown.",
  "Carnos cannot unlock fully locked domains.",
  "Carnos cannot access connector tokens.",
  "Carnos cannot access Spotify token values.",
  "Carnos cannot use forgotten memory.",
  "Carnos cannot bypass redaction rules.",
  "Domain Interaction Rules",
  "Domain permissions are the first gate for Carnos access.",
  "Sensitive lock levels override normal domain permissions.",
  "Private Mode overrides normal domain permissions.",
  "Emergency Lockdown overrides normal domain permissions.",
  "Fully locked domains deny Carnos read, summarize, suggest, memory candidate, context, analytics, dashboard, chat reference, export summary, and action proposal by default.",
  "Private Mode Rules",
  "Private Mode blocks Carnos memory writes.",
  "Private Mode blocks Carnos automatic memory candidates.",
  "Emergency Lockdown Rules",
  "Emergency Lockdown blocks Carnos memory writes.",
  "Emergency Lockdown blocks Carnos-triggered Spotify actions by default.",
  "Connector Rules",
  "Carnos cannot see access tokens.",
  "Carnos cannot see refresh tokens.",
  "Carnos cannot store token values as memory.",
  "Spotify Rules",
  "Carnos cannot see Spotify access tokens.",
  "Carnos cannot see Spotify refresh tokens.",
  "Carnos cannot store Spotify token values as memory.",
  "Carnos cannot use recently played data as memory without explicit approval.",
  "Access Decision Inputs",
  "domain_id",
  "privacy_level",
  "sensitivity_level",
  "lock_state",
  "redaction_level",
  "private_mode_state",
  "emergency_lockdown_state",
  "approval_status",
  "Blocked Reasons",
  "domain_permission_blocked",
  "carnos_permission_blocked",
  "hidden_from_carnos",
  "fully_locked",
  "private_mode_active",
  "emergency_lockdown_active",
  "token_access_denied",
  "destructive_action_denied",
  "privacy_unlock_denied",
  "permission_escalation_denied",
  "Audit Events Required",
  "carnos_access_allowed",
  "carnos_access_blocked",
  "carnos_memory_candidate_blocked",
  "carnos_connector_action_blocked",
  "carnos_spotify_action_blocked",
  "carnos_token_access_blocked",
  "carnos_destructive_action_blocked",
  "Badge Requirements",
  "Carnos Allowed",
  "Carnos Restricted",
  "Carnos Disabled",
  "Connector Restricted",
  "Spotify Restricted",
  "Token Hidden",
  "Must Not Do",
  "do not create migrations in 20H",
  "do not invent Carnos permission persistence schema in 20H",
  "do not implement runtime authorization in 20H",
  "do not let Carnos approve its own memory candidates",
  "do not let Carnos execute destructive actions",
  "do not let Carnos disable Private Mode",
  "do not let Carnos disable Emergency Lockdown",
  "do not let Carnos access connector tokens",
  "do not let Carnos access Spotify tokens",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.capability_matrix.length < 11) missing.push("capability matrix incomplete");
if (fixture.absolute_denials.length < 12) missing.push("absolute denials incomplete");
if (fixture.domain_interaction_rules.length < 8) missing.push("domain rules incomplete");
if (fixture.private_mode_rules.length < 8) missing.push("private mode rules incomplete");
if (fixture.emergency_lockdown_rules.length < 8) missing.push("emergency lockdown rules incomplete");
if (fixture.connector_rules.length < 8) missing.push("connector rules incomplete");
if (fixture.spotify_rules.length < 9) missing.push("Spotify rules incomplete");
if (fixture.access_decision_inputs.length < 16) missing.push("access decision inputs incomplete");
if (fixture.blocked_reasons.length < 20) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 18) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 16) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20H audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20H Carnos access matrix audit passed.");
console.log("✓ Carnos capabilities, denials, domain rules, modes, connector, Spotify, blocked reasons, audit, and badges are locked.");
