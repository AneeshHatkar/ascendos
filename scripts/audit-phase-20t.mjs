import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20T_SPOTIFY_OAUTH_PKCE_CALLBACK_BOUNDARY.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20t_spotify_oauth_pkce_callback_boundary_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20T_SPOTIFY_OAUTH_PKCE_CALLBACK_BOUNDARY_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Spotify Account Connection + OAuth/PKCE Callback Boundary",
  "Needs live database schema: false",
  "Official Spotify Reference Boundary",
  "Spotify supports Authorization Code with PKCE for applications where a client secret cannot be safely stored.",
  "Spotify refresh tokens can expire and apps must handle reauthorization.",
  "Account Connection Flow Boundary",
  "user_clicks_connect_spotify",
  "system_generates_state",
  "system_generates_pkce_verifier",
  "system_derives_pkce_challenge",
  "callback_validates_state",
  "callback_exchanges_code_for_tokens",
  "system_stores_token_boundary_reference",
  "20T does not implement these steps.",
  "OAuth Start Boundary",
  "/api/connectors/spotify/start",
  "state",
  "code_verifier",
  "code_challenge",
  "State must be unique and unpredictable.",
  "Code verifier must not be logged.",
  "20T does not create the start route.",
  "OAuth Callback Boundary",
  "/api/connectors/spotify/callback",
  "Callback must validate state.",
  "Callback must validate provider.",
  "Callback must handle state mismatch safely.",
  "Callback must not expose token values.",
  "20T does not create the callback route.",
  "Redirect URI Rules",
  "http://127.0.0.1:3000/api/connectors/spotify/callback",
  "Production redirect URI must use HTTPS.",
  "Wildcard redirect URIs must not be used.",
  "Token Exchange Boundary",
  "authorization_code",
  "Access token must not be logged.",
  "Refresh token must not be logged.",
  "20T does not implement token exchange.",
  "Token Storage Boundary",
  "not_implemented_in_20T",
  "server_only_storage",
  "Token values must never be committed.",
  "Token values must never be shown in audit payloads.",
  "Token values must never be exported.",
  "Token values must never be sent to Carnos.",
  "20T does not create token storage.",
  "Refresh And Reauthorization Boundary",
  "refresh_token_expired",
  "reauthorization_required",
  "Expired refresh token must force reauthorization.",
  "Reauthorization must not happen silently through Carnos.",
  "20T does not implement refresh.",
  "Scope Grant Boundary",
  "spotify_scope_grant_id",
  "provider_scope_string_boundary",
  "Listening history scopes are sensitive by default.",
  "20T does not persist scope grants.",
  "Connection Status Transitions",
  "not_configured -> developer_app_required",
  "configured_not_connected -> connecting",
  "connecting -> connected",
  "connected -> reauthorization_required",
  "Account Profile Boundary",
  "spotify_connection_id",
  "provider_user_id_boundary",
  "email_boundary",
  "20T does not persist account profile.",
  "Error Handling Boundary",
  "state_mismatch",
  "token_exchange_failed",
  "Errors must not show authorization code.",
  "Errors must not show code verifier.",
  "Private Mode Rules",
  "Private Mode can block OAuth start.",
  "Carnos cannot disable Private Mode to connect Spotify.",
  "Emergency Lockdown Rules",
  "Emergency Lockdown blocks OAuth start by default.",
  "Carnos cannot disable Emergency Lockdown to connect Spotify.",
  "Carnos Rules",
  "Carnos cannot start OAuth silently.",
  "Carnos cannot complete callback silently.",
  "Carnos cannot approve scopes.",
  "Carnos cannot see authorization code.",
  "Carnos cannot see code verifier.",
  "Carnos cannot see access token.",
  "Carnos cannot see refresh token.",
  "Audit Events Required",
  "spotify_oauth_start_requested",
  "spotify_oauth_state_created",
  "spotify_oauth_callback_received",
  "spotify_oauth_token_exchange_succeeded_boundary",
  "spotify_token_boundary_stored",
  "spotify_reauthorization_required",
  "Blocked Reasons",
  "spotify_oauth_state_mismatch",
  "spotify_code_verifier_missing",
  "spotify_refresh_token_expired",
  "spotify_schema_required_for_runtime",
  "Badge Requirements",
  "OAuth Boundary",
  "PKCE Required",
  "State Required",
  "Token Hidden",
  "Reauthorization Required",
  "Schema Required For Runtime",
  "Must Not Do",
  "do not create migrations in 20T",
  "do not invent Spotify persistence schema in 20T",
  "do not implement OAuth start route in 20T",
  "do not implement callback route in 20T",
  "do not implement token exchange in 20T",
  "do not implement token refresh in 20T",
  "do not implement token storage in 20T",
  "do not connect a real Spotify account in 20T",
  "do not expose authorization code",
  "do not expose code verifier",
  "do not expose access token",
  "do not expose refresh token",
  "do not let Carnos start OAuth silently",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.account_connection_flow_boundary.steps_future.length < 15) missing.push("account connection steps incomplete");
if (fixture.oauth_start_boundary.generated_values_future.length < 6) missing.push("OAuth start generated values incomplete");
if (fixture.oauth_callback_boundary.validation_rules.length < 12) missing.push("callback rules incomplete");
if (fixture.redirect_uri_rules.length < 7) missing.push("redirect URI rules incomplete");
if (fixture.token_exchange_boundary.rules.length < 9) missing.push("token exchange rules incomplete");
if (fixture.token_storage_boundary.rules.length < 10) missing.push("token storage rules incomplete");
if (fixture.refresh_and_reauth_boundary.rules.length < 8) missing.push("refresh rules incomplete");
if (fixture.scope_grant_boundary.required_future_fields.length < 11) missing.push("scope grant fields incomplete");
if (fixture.connection_status_transitions.length < 9) missing.push("connection transitions incomplete");
if (fixture.account_profile_boundary.future_profile_fields.length < 14) missing.push("account profile fields incomplete");
if (fixture.error_handling_boundary.error_classes.length < 13) missing.push("error classes incomplete");
if (fixture.private_mode_rules.length < 6) missing.push("private mode rules incomplete");
if (fixture.emergency_lockdown_rules.length < 6) missing.push("emergency lockdown rules incomplete");
if (fixture.carnos_rules.length < 10) missing.push("Carnos rules incomplete");
if (fixture.audit_events_required.length < 22) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 22) missing.push("blocked reasons incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20T audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20T Spotify OAuth PKCE callback boundary audit passed.");
console.log("✓ OAuth start, callback, state, verifier, redirect URI, token exchange, storage, refresh, reauth, scopes, Carnos, audit, and schema gates are locked.");
