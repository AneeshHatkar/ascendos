import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20E_PRIVATE_MODE_TIMED_CONTRACTS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20e_private_mode_timed_contracts_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20E_PRIVATE_MODE_TIMED_CONTRACTS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Private Mode + Timed Private Mode Contracts",
  "Needs live database schema: false",
  "Private Mode States",
  "off",
  "on",
  "timed_session",
  "until_reenabled",
  "Timed Private Mode Options",
  "Current session",
  "30 minutes",
  "1 hour",
  "3 hours",
  "Until tomorrow",
  "Until manually disabled",
  "Enforcement Rules",
  "Private Mode blocks automatic memory candidate creation.",
  "Private Mode blocks Carnos memory writes.",
  "Private Mode blocks sensitive summaries by default.",
  "Private Mode blocks broad dashboard exposure of private and sensitive data.",
  "Private Mode blocks analytics use of private and sensitive data unless a narrow approved rule exists.",
  "Private Mode blocks automatic export preparation.",
  "Private Mode blocks destructive action automation.",
  "Private Mode restricts external connector actions.",
  "Private Mode restricts Spotify actions.",
  "Surface Behavior",
  "Memory Inbox",
  "Saved Memories",
  "Carnos Chat",
  "Dashboard Cards",
  "Timeline",
  "Analytics",
  "Export",
  "Destructive Actions",
  "External API Connectors",
  "Spotify",
  "State Transition Rules",
  "Blocked Reasons",
  "private_mode_active",
  "timed_private_mode_active",
  "private_mode_blocks_memory_candidate",
  "private_mode_blocks_carnos_memory_write",
  "private_mode_blocks_sensitive_summary",
  "private_mode_blocks_export_automation",
  "private_mode_blocks_connector_action",
  "private_mode_blocks_spotify_action",
  "private_mode_blocks_spotify_history_memory",
  "Audit Events Required",
  "private_mode_enabled",
  "private_mode_disabled",
  "private_mode_expired",
  "timed_private_mode_enabled",
  "timed_private_mode_expired",
  "private_mode_blocked_spotify_action",
  "Badge Requirements",
  "Private Mode Active",
  "Timed Private Mode Active",
  "Carnos Restricted",
  "Connector Restricted",
  "Spotify Restricted",
  "Carnos Rules",
  "Carnos cannot disable Private Mode.",
  "Carnos cannot bypass Private Mode with older memories.",
  "Carnos cannot create memory candidates from Private Mode content without approval.",
  "Connector Rules",
  "External connector actions must check Private Mode before proposal or execution.",
  "Spotify Rules",
  "Spotify actions must check Private Mode before proposal or execution.",
  "Spotify listening history must not become memory during Private Mode without explicit approval.",
  "Spotify token values remain inaccessible to Carnos.",
  "Must Not Do",
  "do not create migrations in 20E",
  "do not invent privacy_settings schema in 20E",
  "do not implement live Private Mode toggle persistence in 20E",
  "do not let Carnos disable Private Mode",
  "do not let Carnos bypass Private Mode",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.private_mode_states.length < 4) missing.push("private mode states incomplete");
if (fixture.timed_private_mode_options.length < 6) missing.push("timed private mode options incomplete");
if (fixture.enforcement_rules.length < 12) missing.push("enforcement rules incomplete");
if (fixture.surface_behavior.length < 10) missing.push("surface behavior incomplete");
if (fixture.blocked_reasons.length < 12) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 10) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 8) missing.push("badge requirements incomplete");
if (fixture.carnos_rules.length < 8) missing.push("Carnos rules incomplete");
if (fixture.connector_rules.length < 5) missing.push("connector rules incomplete");
if (fixture.spotify_rules.length < 5) missing.push("Spotify rules incomplete");

if (missing.length > 0) {
  console.error("Phase 20E audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20E Private Mode timed contracts audit passed.");
console.log("✓ Private Mode states, timed options, enforcement, surfaces, audit, badges, Carnos, connector, and Spotify rules are locked.");
