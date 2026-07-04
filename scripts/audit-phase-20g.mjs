import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20G_SENSITIVE_LOCKS_DOMAIN_PERMISSIONS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20g_sensitive_locks_domain_permissions_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20G_SENSITIVE_LOCKS_DOMAIN_PERMISSIONS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Sensitive Locks + Domain Privacy Permissions",
  "Needs live database schema: false",
  "Sensitive Lock Levels",
  "unlocked",
  "review_required",
  "hidden_from_dashboards",
  "hidden_from_carnos",
  "fully_locked",
  "Domain Permission Fields",
  "domain_id",
  "default_privacy_level",
  "default_sensitivity_level",
  "default_lock_level",
  "dashboard_allowed",
  "timeline_allowed",
  "analytics_allowed",
  "export_allowed",
  "carnos_read_allowed",
  "carnos_summarize_allowed",
  "carnos_memory_candidate_allowed",
  "connector_allowed",
  "spotify_allowed",
  "redaction_default",
  "retention_default",
  "Domain Registry",
  "career",
  "learning",
  "research",
  "health",
  "body",
  "nutrition",
  "sleep_energy",
  "mental_health",
  "finance",
  "life_admin",
  "documents",
  "memory",
  "private_reflections",
  "custom_trackers",
  "analytics",
  "timeline",
  "external_connectors",
  "spotify",
  "Permission Rules",
  "Fully locked domains block Carnos read, summarize, memory candidate, context, analytics, export, connector, and Spotify use by default.",
  "Domain permissions cannot bypass Private Mode.",
  "Domain permissions cannot bypass Emergency Lockdown.",
  "Spotify permissions cannot bypass sensitive lock levels.",
  "Analytics cannot use sensitive or locked domains unless explicitly allowed.",
  "Export cannot include sensitive or locked domains without explicit preview and review.",
  "Carnos cannot change domain privacy permissions silently.",
  "Lock Transition Rules",
  "Redaction Defaults",
  "connector_tokens: hidden",
  "spotify_recently_played: metadata_only",
  "Retention Defaults",
  "expire_spotify_action_after_n_days",
  "Blocked Reasons",
  "sensitive_lock_active",
  "domain_review_required",
  "hidden_from_dashboards",
  "hidden_from_carnos",
  "fully_locked_domain",
  "connector_permission_blocked",
  "spotify_permission_blocked",
  "Audit Events Required",
  "sensitive_lock_enabled",
  "domain_privacy_permission_changed",
  "domain_carnos_permission_changed",
  "domain_connector_permission_changed",
  "domain_spotify_permission_changed",
  "Badge Requirements",
  "Sensitive",
  "Locked",
  "Review Required",
  "Carnos Disabled",
  "Connector Restricted",
  "Spotify Restricted",
  "Must Not Do",
  "do not create migrations in 20G",
  "do not invent sensitive_locks schema in 20G",
  "do not implement live domain privacy persistence in 20G",
  "do not let domain permissions bypass Private Mode",
  "do not let domain permissions bypass Emergency Lockdown",
  "do not allow Spotify permissions to bypass sensitive locks",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.sensitive_lock_levels.length < 5) missing.push("sensitive lock levels incomplete");
if (fixture.domain_permission_fields.length < 15) missing.push("domain permission fields incomplete");
if (fixture.domain_registry.length < 18) missing.push("domain registry incomplete");
if (fixture.permission_rules.length < 10) missing.push("permission rules incomplete");
if (fixture.lock_transition_rules.length < 5) missing.push("lock transition rules incomplete");
if (fixture.redaction_defaults.length < 5) missing.push("redaction defaults incomplete");
if (fixture.retention_defaults.length < 5) missing.push("retention defaults incomplete");
if (fixture.blocked_reasons.length < 12) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 10) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 10) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20G audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20G sensitive locks domain permissions audit passed.");
console.log("✓ Sensitive locks, domain registry, permissions, redaction, retention, audit, badges, connector, and Spotify restrictions are locked.");
