import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20O_PRIVACY_AUDIT_TAXONOMY_REDACTION_BADGES.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20o_privacy_audit_taxonomy_redaction_badges_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20O_PRIVACY_AUDIT_TAXONOMY_REDACTION_BADGES_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Privacy Audit Taxonomy + Redaction + Badges",
  "Needs live database schema: false",
  "Privacy Audit Event Taxonomy",
  "memory_candidate_created",
  "memory_forgotten",
  "private_mode_enabled",
  "emergency_lockdown_enabled",
  "data_export_manifest_created",
  "destructive_action_hard_removal_deferred",
  "connector_token_boundary_refreshed",
  "spotify_recently_played_snapshot_read",
  "spotify_token_boundary_refreshed",
  "carnos_access_blocked",
  "Event Group Taxonomy",
  "memory",
  "privacy_mode",
  "destructive_action",
  "review_queue",
  "connector",
  "spotify",
  "system_boundary",
  "Actor Taxonomy",
  "user",
  "carnos",
  "connector_boundary",
  "spotify_boundary",
  "Status Taxonomy",
  "needs_review",
  "cooldown_pending",
  "ready_to_execute",
  "hard_removal_deferred",
  "Redaction Levels",
  "full_value",
  "summary_only",
  "metadata_only",
  "redacted",
  "hidden",
  "Redaction Reasons",
  "private_mode_active",
  "emergency_lockdown_active",
  "fully_locked_domain",
  "connector_token_boundary",
  "spotify_token_boundary",
  "spotify_recently_played_sensitive",
  "Badge Taxonomy",
  "privacy",
  "Private",
  "Sensitive",
  "Fully Locked",
  "Review Required",
  "Redacted",
  "mode",
  "Private Mode Active",
  "Emergency Lockdown Active",
  "status",
  "Two Step Required",
  "Cooldown Pending",
  "risk",
  "Critical Risk",
  "Hard Removal Deferred",
  "carnos",
  "Carnos Restricted",
  "Carnos Cannot Execute",
  "connector",
  "Connector Scope Missing",
  "Token Hidden",
  "spotify",
  "Spotify Scope Missing",
  "Premium Required",
  "No Active Device",
  "Recently Played Sensitive",
  "audit",
  "Append Only",
  "Audit Protected",
  "Surface Reuse Rules",
  "/privacy",
  "audit_viewer",
  "export_preview",
  "review_queue",
  "manifests",
  "carnos_surfaces",
  "Badge Resolution Rules",
  "Most restrictive badge wins when multiple privacy badges apply.",
  "Emergency Lockdown Active overrides normal privacy display.",
  "Token Hidden always applies to connector and Spotify token boundaries.",
  "Hard Removal Deferred must be shown when hard removal is requested but not executed.",
  "Taxonomy Mapping Requirements",
  "Every privacy audit event must map to one event group.",
  "Every redacted display must include redaction level.",
  "Every connector event involving tokens must show Token Hidden.",
  "Every Spotify event involving tokens must show Token Hidden.",
  "Every Spotify recently played surface must show Recently Played Sensitive unless explicitly downgraded by user review.",
  "Blocked Reasons",
  "taxonomy_missing",
  "badge_missing",
  "connector_badge_required",
  "spotify_badge_required",
  "token_hidden_badge_required",
  "append_only_badge_required",
  "Audit Events Required",
  "privacy_taxonomy_loaded",
  "redaction_level_applied",
  "privacy_badge_applied",
  "connector_badge_applied",
  "spotify_badge_applied",
  "token_hidden_badge_applied",
  "append_only_badge_applied",
  "recently_played_sensitive_badge_applied",
  "Must Not Do",
  "do not create migrations in 20O",
  "do not invent badge persistence schema in 20O",
  "do not invent redaction persistence schema in 20O",
  "do not implement UI components in 20O",
  "do not implement runtime enforcement in 20O",
  "do not let surfaces use inconsistent badge names",
  "do not let connector token surfaces omit Token Hidden",
  "do not let Spotify token surfaces omit Token Hidden",
  "do not let Carnos downgrade or remove badges",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.privacy_audit_event_taxonomy.length < 65) missing.push("privacy audit taxonomy incomplete");
if (fixture.event_group_taxonomy.length < 24) missing.push("event group taxonomy incomplete");
if (fixture.actor_taxonomy.length < 12) missing.push("actor taxonomy incomplete");
if (fixture.status_taxonomy.length < 20) missing.push("status taxonomy incomplete");
if (fixture.redaction_levels.length < 5) missing.push("redaction levels incomplete");
if (fixture.redaction_reasons.length < 16) missing.push("redaction reasons incomplete");
if (fixture.badge_taxonomy.length < 7) missing.push("badge taxonomy groups incomplete");
if (fixture.surface_reuse_rules.length < 6) missing.push("surface reuse rules incomplete");
if (fixture.badge_resolution_rules.length < 9) missing.push("badge resolution rules incomplete");
if (fixture.taxonomy_mapping_requirements.length < 9) missing.push("taxonomy mapping requirements incomplete");
if (fixture.blocked_reasons.length < 16) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 15) missing.push("audit events incomplete");

if (missing.length > 0) {
  console.error("Phase 20O audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20O privacy taxonomy redaction badges audit passed.");
console.log("✓ Taxonomy, redaction levels, badges, surface reuse, connector, Spotify, Carnos, audit, and badge resolution rules are locked.");
