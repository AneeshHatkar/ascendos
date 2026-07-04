import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20S_SPOTIFY_CONNECTOR_FOUNDATION.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20s_spotify_connector_foundation_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20S_SPOTIFY_CONNECTOR_FOUNDATION_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Spotify Connector Foundation",
  "Needs live database schema: false",
  "Official Spotify Reference Boundary",
  "Spotify Web API uses OAuth 2.0 authorization for protected user data and features.",
  "Spotify scopes define user-granted permissions.",
  "Authorization Code with PKCE is recommended where a client secret cannot be safely stored.",
  "Redirect URI values must match the Spotify app allowlist exactly except documented loopback exceptions.",
  "Refresh tokens are security credentials and must not be exposed.",
  "Spotify Connector Identity",
  "connector_id: spotify",
  "provider_name: Spotify",
  "category: media_control",
  "Developer App Setup Boundary",
  "Spotify Developer account",
  "Spotify Developer App",
  "client id",
  "redirect URI allowlist entry",
  "client secret",
  "access token",
  "refresh token",
  "PKCE verifier",
  "20S does not connect a Spotify account.",
  "Redirect URI Boundary",
  "http://127.0.0.1:3000/api/connectors/spotify/callback",
  "Redirect URI must exactly match the Spotify Developer App allowlist.",
  "Production redirect URI must use HTTPS.",
  "Callback path must validate state and provider.",
  "OAuth PKCE Boundary",
  "authorization_code_with_pkce",
  "code_verifier",
  "code_challenge",
  "Access token must never be printed.",
  "Refresh token must never be printed.",
  "Token values must never be available to Carnos.",
  "Environment Variable Boundary",
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_REDIRECT_URI",
  "SPOTIFY_ALLOWED_SCOPES",
  "Environment variable values must not be committed.",
  "Secrets must not be logged.",
  "Scope Groups",
  "profile",
  "user-read-private",
  "user-read-email",
  "playback_read",
  "user-read-playback-state",
  "user-read-currently-playing",
  "playback_write",
  "user-modify-playback-state",
  "playlist_read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist_write",
  "playlist-modify-private",
  "playlist-modify-public",
  "listening_history",
  "user-read-recently-played",
  "user-top-read",
  "Connection Status Model",
  "developer_app_required",
  "redirect_uri_required",
  "env_required",
  "configured_not_connected",
  "premium_required",
  "no_active_device",
  "Provider Policy Boundary",
  "Spotify provider policies must be reviewed before runtime implementation.",
  "Spotify provider limitations must be shown as boundary status, not hidden errors.",
  "Token Boundary Rules",
  "Spotify access token values are never shown in UI.",
  "Spotify refresh token values are never shown in UI.",
  "Spotify token values are never included in exports.",
  "Spotify token values are never available to Carnos.",
  "Account Profile Boundary",
  "spotify_connection_id",
  "provider_user_id_boundary",
  "email_boundary",
  "product_boundary",
  "20S does not persist profile fields.",
  "Private Mode Rules",
  "Private Mode blocks automatic Spotify reads by default.",
  "Private Mode blocks Spotify data entering Carnos context by default.",
  "Carnos cannot disable Private Mode for Spotify.",
  "Emergency Lockdown Rules",
  "Emergency Lockdown blocks Spotify reads by default.",
  "Emergency Lockdown blocks Spotify actions by default.",
  "Carnos cannot disable Emergency Lockdown for Spotify.",
  "Carnos Spotify Access Rules",
  "Carnos cannot connect Spotify silently.",
  "Carnos cannot approve Spotify actions.",
  "Carnos cannot access Spotify token values.",
  "Carnos cannot use Spotify listening history as memory without explicit memory review.",
  "Spotify Data Classes",
  "recently_played",
  "token_boundary",
  "never_include_value",
  "never_access",
  "Audit Events Required",
  "spotify_foundation_loaded",
  "spotify_developer_setup_required",
  "spotify_token_boundary_enforced",
  "spotify_provider_policy_boundary_shown",
  "spotify_premium_required",
  "spotify_no_active_device",
  "Blocked Reasons",
  "spotify_developer_app_missing",
  "spotify_redirect_uri_mismatch",
  "spotify_missing_scope",
  "spotify_premium_required",
  "spotify_no_active_device",
  "spotify_token_boundary",
  "spotify_recently_played_sensitive",
  "Badge Requirements",
  "Spotify Foundation",
  "Developer App Required",
  "Redirect URI Required",
  "Env Required",
  "Premium Required",
  "No Active Device",
  "Token Hidden",
  "Recently Played Sensitive",
  "Must Not Do",
  "do not create migrations in 20S",
  "do not invent Spotify persistence schema in 20S",
  "do not implement OAuth routes in 20S",
  "do not implement callback routes in 20S",
  "do not implement token exchange in 20S",
  "do not implement token storage in 20S",
  "do not implement Spotify provider calls in 20S",
  "do not connect a real Spotify account in 20S",
  "do not expose Spotify token values",
  "do not let Carnos access Spotify token values",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.scope_groups.length < 6) missing.push("scope groups incomplete");
if (fixture.connection_status_model.length < 18) missing.push("connection statuses incomplete");
if (fixture.token_boundary_rules.length < 9) missing.push("token boundary incomplete");
if (fixture.private_mode_rules.length < 7) missing.push("private mode rules incomplete");
if (fixture.emergency_lockdown_rules.length < 7) missing.push("emergency lockdown rules incomplete");
if (fixture.carnos_spotify_access_rules.length < 11) missing.push("Carnos Spotify rules incomplete");
if (fixture.spotify_data_classes.length < 7) missing.push("Spotify data classes incomplete");
if (fixture.audit_events_required.length < 16) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 20) missing.push("blocked reasons incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20S audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20S Spotify connector foundation audit passed.");
console.log("✓ Spotify identity, developer setup, redirect URI, PKCE, env, scopes, statuses, token boundary, Carnos, provider policy, audit, and badges are locked.");
