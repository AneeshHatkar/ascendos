import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20R_FUTURE_API_CONNECTOR_FRAMEWORK.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20r_future_api_connector_framework_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20R_FUTURE_API_CONNECTOR_FRAMEWORK_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Future API Connector Framework",
  "Needs live database schema: false",
  "Connector Categories",
  "media_control",
  "calendar",
  "email",
  "documents",
  "developer_tools",
  "productivity",
  "health",
  "storage",
  "Connector Registry Model",
  "connector_id",
  "provider_name",
  "supported_auth_type",
  "token_boundary",
  "provider_boundary_notes",
  "Connector Account Model",
  "connector_account_id",
  "provider_user_id_boundary",
  "display_name_boundary",
  "profile_metadata_boundary",
  "Provider user id is a boundary value and must not be broadly exposed.",
  "Connector account metadata cannot expose token values.",
  "Permission Model",
  "can_connect",
  "can_disconnect",
  "can_read_profile",
  "can_read_data",
  "can_write_data",
  "can_trigger_action",
  "can_execute_approved_action",
  "can_store_token_boundary",
  "can_use_in_carnos_context",
  "Carnos cannot grant connector permissions.",
  "Carnos cannot expand connector permissions.",
  "Scope Model",
  "provider_scope_string_boundary",
  "risk_level",
  "missing",
  "revoked",
  "High-risk scope changes require review.",
  "Critical scope changes require two-step confirmation and can require cooldown.",
  "Auth Boundary Model",
  "oauth_pkce",
  "api_key_future",
  "Auth redirects must validate state.",
  "Carnos cannot initiate auth silently.",
  "Carnos cannot complete auth silently.",
  "Token Boundary Model",
  "access_token",
  "refresh_token",
  "api_key",
  "client_secret",
  "Token values are never shown in UI.",
  "Token values are never shown in audit payloads.",
  "Token values are never included in exports.",
  "Token values are never stored as memory.",
  "Token values are never available to Carnos.",
  "Connection Status Model",
  "not_configured",
  "connected",
  "missing_scope",
  "reauthorization_required",
  "provider_unavailable",
  "blocked_by_private_mode",
  "blocked_by_emergency_lockdown",
  "Action Request Model",
  "connector_action_request_id",
  "required_scope_ids",
  "expires_at",
  "Connector action request must show required scopes.",
  "Carnos cannot approve connector action requests.",
  "Action Manifest Model",
  "connector_action_manifest_id",
  "provider_state_boundary",
  "Action manifest must not include token values.",
  "Private Mode Rules",
  "Private Mode blocks automatic connector sync unless explicitly allowed.",
  "Carnos cannot disable Private Mode for connector actions.",
  "Emergency Lockdown Rules",
  "Emergency Lockdown blocks connector actions by default.",
  "Emergency Lockdown blocks connector permission expansion.",
  "Carnos cannot disable Emergency Lockdown for connector actions.",
  "Disconnect Rules",
  "Disconnect requires explicit user action.",
  "Disconnect must not expose token values.",
  "Carnos cannot disconnect a connector silently.",
  "Retention Rules",
  "Connector action proposals must expire.",
  "Connector token values are not visible retention subjects.",
  "Connector retention cannot expand Carnos access.",
  "Carnos Connector Access Rules",
  "Carnos can see connector connection status only when privacy rules allow.",
  "Carnos cannot connect a connector silently.",
  "Carnos cannot disconnect a connector silently.",
  "Carnos cannot access token values.",
  "Carnos cannot store connector token values as memory.",
  "Provider Boundary Rules",
  "Provider data can be outside ascendOS control.",
  "Provider errors must not leak token values.",
  "Audit Events Required",
  "connector_connected",
  "connector_disconnected",
  "connector_scope_changed",
  "connector_action_requested",
  "connector_action_blocked",
  "connector_token_boundary_refreshed",
  "connector_token_boundary_revoked",
  "connector_private_mode_blocked",
  "connector_emergency_lockdown_blocked",
  "Blocked Reasons",
  "connector_not_configured",
  "connector_not_connected",
  "missing_scope",
  "token_boundary",
  "provider_boundary",
  "Badge Requirements",
  "Connector Connected",
  "Missing Scope",
  "Provider Boundary",
  "Token Hidden",
  "Excluded Or Deferred Connectors",
  "Spotify",
  "Amazon Echo or Alexa",
  "Garmin",
  "Apple Health",
  "Must Not Do",
  "do not create migrations in 20R",
  "do not invent connector persistence schema in 20R",
  "do not implement OAuth routes in 20R",
  "do not implement token storage in 20R",
  "do not implement provider calls in 20R",
  "do not expose connector token values",
  "do not let Carnos access token values",
  "do not let Carnos connect providers silently",
  "do not let connector actions bypass review",
  "do not implement excluded or deferred connectors in 20R",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.connector_categories.length < 12) missing.push("connector categories incomplete");
if (fixture.connector_registry_model.required_fields.length < 18) missing.push("registry model incomplete");
if (fixture.connector_account_model.required_fields.length < 16) missing.push("account model incomplete");
if (fixture.permission_model.permissions.length < 12) missing.push("permission model incomplete");
if (fixture.scope_model.required_fields.length < 10) missing.push("scope model incomplete");
if (fixture.auth_boundary_model.supported_auth_types.length < 5) missing.push("auth boundary incomplete");
if (fixture.token_boundary_model.rules.length < 9) missing.push("token boundary incomplete");
if (fixture.connection_status_model.length < 12) missing.push("connection statuses incomplete");
if (fixture.action_request_model.required_fields.length < 14) missing.push("action request incomplete");
if (fixture.action_manifest_model.required_fields.length < 18) missing.push("action manifest incomplete");
if (fixture.private_mode_rules.length < 7) missing.push("private mode rules incomplete");
if (fixture.emergency_lockdown_rules.length < 7) missing.push("emergency lockdown rules incomplete");
if (fixture.disconnect_rules.length < 7) missing.push("disconnect rules incomplete");
if (fixture.retention_rules.length < 7) missing.push("retention rules incomplete");
if (fixture.carnos_connector_access_rules.length < 10) missing.push("Carnos connector rules incomplete");
if (fixture.provider_boundary_rules.length < 7) missing.push("provider boundary rules incomplete");
if (fixture.audit_events_required.length < 20) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 20) missing.push("blocked reasons incomplete");
if (fixture.badge_requirements.length < 20) missing.push("badge requirements incomplete");
if (fixture.excluded_or_deferred_connectors.length < 5) missing.push("excluded or deferred connectors incomplete");

if (missing.length > 0) {
  console.error("Phase 20R audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20R future API connector framework audit passed.");
console.log("✓ Connector registry, accounts, permissions, scopes, auth, token boundary, actions, manifests, Carnos, retention, audit, and deferred connectors are locked.");
