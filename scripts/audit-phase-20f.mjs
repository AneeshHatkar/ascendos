import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20F_EMERGENCY_LOCKDOWN_CONTRACTS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20f_emergency_lockdown_contracts_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20F_EMERGENCY_LOCKDOWN_CONTRACTS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Emergency Lockdown Contracts",
  "Needs live database schema: false",
  "Lockdown States",
  "inactive",
  "active",
  "disable_requested",
  "disable_confirmed",
  "blocked",
  "Activation Effects",
  "turn on Private Mode behavior",
  "block automatic memory candidate creation",
  "block Carnos memory writes",
  "block Carnos sensitive summaries",
  "block broad sensitive dashboard exposure",
  "block analytics use of sensitive data",
  "block automatic export preparation",
  "block destructive action automation",
  "restrict external connector reads and actions",
  "restrict Spotify reads and actions",
  "Affected Surfaces",
  "Memory Inbox",
  "Saved Memories",
  "Carnos Chat",
  "Dashboard Cards",
  "Timeline",
  "Analytics",
  "Export",
  "Destructive Actions",
  "Sensitive Locks",
  "External API Connectors",
  "Spotify",
  "Sensitive Domain Defaults",
  "health",
  "mental_health",
  "finance",
  "documents",
  "memory",
  "private_reflections",
  "custom_trackers",
  "external_connectors",
  "spotify",
  "Lockdown Rules",
  "Emergency Lockdown enables Private Mode behavior.",
  "Emergency Lockdown blocks automatic memory candidate creation.",
  "Emergency Lockdown blocks Carnos memory writes.",
  "Emergency Lockdown restricts connector actions.",
  "Emergency Lockdown restricts Spotify actions.",
  "Emergency Lockdown requires explicit user confirmation to disable.",
  "Carnos cannot disable Emergency Lockdown.",
  "Carnos cannot bypass Emergency Lockdown.",
  "Unlock Rules",
  "Only the user can request disabling Emergency Lockdown.",
  "Emergency Lockdown cannot be silently disabled by system automation.",
  "Blocked Reasons",
  "emergency_lockdown_active",
  "lockdown_blocks_memory_candidate",
  "lockdown_blocks_carnos_memory_write",
  "lockdown_blocks_export_automation",
  "lockdown_blocks_destructive_automation",
  "lockdown_blocks_connector_action",
  "lockdown_blocks_spotify_action",
  "lockdown_disable_confirmation_required",
  "carnos_cannot_disable_lockdown",
  "carnos_cannot_bypass_lockdown",
  "Audit Events Required",
  "emergency_lockdown_enabled",
  "emergency_lockdown_disable_requested",
  "emergency_lockdown_disabled",
  "emergency_lockdown_blocked_connector_action",
  "emergency_lockdown_blocked_spotify_action",
  "Badge Requirements",
  "Emergency Lockdown Active",
  "Sensitive Domain Locked",
  "Carnos Restricted",
  "Connector Restricted",
  "Spotify Restricted",
  "Carnos Rules",
  "Carnos cannot disable Emergency Lockdown.",
  "Carnos cannot bypass Emergency Lockdown with older memories.",
  "Carnos cannot write memory during Emergency Lockdown.",
  "Connector Rules",
  "External connector actions must check Emergency Lockdown before proposal or execution.",
  "High-risk connector actions are blocked during Emergency Lockdown.",
  "Spotify Rules",
  "Spotify actions must check Emergency Lockdown before proposal or execution.",
  "Spotify playback control is blocked during Emergency Lockdown by default.",
  "Spotify listening history must not become memory during Emergency Lockdown.",
  "Spotify token values remain inaccessible to Carnos.",
  "Must Not Do",
  "do not create migrations in 20F",
  "do not invent lockdown persistence schema in 20F",
  "do not implement live Emergency Lockdown toggle persistence in 20F",
  "do not let Carnos disable Emergency Lockdown",
  "do not let Carnos bypass Emergency Lockdown",
  "do not allow automatic memory writes during Emergency Lockdown",
  "do not allow destructive action automation during Emergency Lockdown",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.lockdown_states.length < 5) missing.push("lockdown states incomplete");
if (fixture.activation_effects.length < 12) missing.push("activation effects incomplete");
if (fixture.affected_surfaces.length < 10) missing.push("affected surfaces incomplete");
if (fixture.sensitive_domain_defaults.length < 10) missing.push("sensitive domain defaults incomplete");
if (fixture.lockdown_rules.length < 16) missing.push("lockdown rules incomplete");
if (fixture.unlock_rules.length < 8) missing.push("unlock rules incomplete");
if (fixture.blocked_reasons.length < 15) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 12) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 10) missing.push("badge requirements incomplete");
if (fixture.carnos_rules.length < 10) missing.push("Carnos rules incomplete");
if (fixture.connector_rules.length < 5) missing.push("connector rules incomplete");
if (fixture.spotify_rules.length < 5) missing.push("Spotify rules incomplete");

if (missing.length > 0) {
  console.error("Phase 20F audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20F Emergency Lockdown contracts audit passed.");
console.log("✓ Lockdown states, activation effects, surfaces, sensitive domains, audit, badges, Carnos, connector, and Spotify rules are locked.");
