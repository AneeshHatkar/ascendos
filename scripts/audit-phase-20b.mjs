import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20B_CORE_PRIVACY_DOMAIN_CONTRACTS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20b_core_privacy_domain_contracts_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20B_CORE_PRIVACY_DOMAIN_CONTRACTS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Core Privacy Domain Contracts",
  "Schema Requirement",
  "Needs live database schema: false",
  "Future schema gate",
  "Privacy Levels",
  "public",
  "internal",
  "private",
  "sensitive",
  "locked",
  "Sensitivity Levels",
  "normal",
  "personal",
  "highly_sensitive",
  "Lock States",
  "unlocked",
  "review_required",
  "hidden_from_dashboards",
  "hidden_from_carnos",
  "fully_locked",
  "Redaction Levels",
  "full_value",
  "summary_only",
  "metadata_only",
  "redacted",
  "hidden",
  "Action Statuses",
  "draft",
  "needs_review",
  "approved",
  "rejected",
  "expired",
  "completed",
  "failed",
  "blocked",
  "Actor Model",
  "user",
  "carnos",
  "system",
  "Privacy Surfaces",
  "/privacy dashboard",
  "Memory Inbox",
  "Saved Memories",
  "Private Mode",
  "Emergency Lockdown",
  "Sensitive Locks",
  "External API Connectors",
  "Spotify Connector",
  "Domain Privacy Primitives",
  "privacy_level",
  "sensitivity_level",
  "lock_state",
  "redaction_level",
  "carnos_read_allowed",
  "connector_allowed",
  "spotify_allowed",
  "Validation Rules",
  "Connector And Spotify Compatibility",
  "Spotify account connection must require user OAuth",
  "Spotify token access by Carnos is blocked",
  "Must Not Do",
  "do not create migrations in 20B",
  "do not invent live database schema in 20B",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.privacy_levels.length < 5) missing.push("privacy levels incomplete");
if (fixture.sensitivity_levels.length < 4) missing.push("sensitivity levels incomplete");
if (fixture.lock_states.length < 5) missing.push("lock states incomplete");
if (fixture.redaction_levels.length < 5) missing.push("redaction levels incomplete");
if (fixture.action_statuses.length < 8) missing.push("action statuses incomplete");
if (fixture.domain_primitives.length < 10) missing.push("domain primitives incomplete");
if (fixture.connector_and_spotify_compatibility.length < 5) missing.push("connector Spotify compatibility incomplete");

if (missing.length > 0) {
  console.error("Phase 20B audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20B core privacy domain contracts audit passed.");
console.log("✓ Privacy levels, sensitivity levels, lock states, redaction levels, statuses, actor model, and connector/Spotify compatibility are locked.");
