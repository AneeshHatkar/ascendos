import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20W_SPOTIFY_UI_MEDIA_PERMISSION_CARDS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20w_spotify_ui_media_permissions_cards_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20W_SPOTIFY_UI_MEDIA_PERMISSION_CARDS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Spotify UI + Media Permissions + Connector Audit Cards",
  "Needs live database schema: false",
  "UI Surfaces",
  "spotify_connector_card",
  "spotify_media_permissions_card",
  "spotify_connector_audit_card",
  "spotify_action_review_card",
  "token hidden badge",
  "Private Mode conflict when active",
  "Emergency Lockdown conflict when active",
  "Card States",
  "developer_app_required",
  "configured_not_connected",
  "reauthorization_required",
  "premium_required",
  "no_active_device",
  "action_review_required",
  "Media Permission Groups",
  "playback_read",
  "playback_write",
  "playlist_read",
  "playlist_write",
  "listening_history",
  "High Sensitivity",
  "Card Actions",
  "show_setup_guidance",
  "start_connection",
  "review_scopes",
  "request_scope_change",
  "review_action_proposal",
  "disconnect_spotify",
  "Redaction Rules",
  "Token values are always hidden.",
  "Authorization codes are always hidden.",
  "Code verifier values are always hidden.",
  "OAuth raw payloads are always hidden.",
  "Carnos receives redacted card summaries only.",
  "Private Mode UI Rules",
  "Private Mode hides currently playing details.",
  "Private Mode blocks playback action cards by default.",
  "Emergency Lockdown UI Rules",
  "Emergency Lockdown shows Spotify connector as locked.",
  "Emergency Lockdown blocks start connection action.",
  "Connector Audit Card Rules",
  "Connector audit card must use append-only audit boundary.",
  "Connector audit card must never show token values.",
  "Connector audit card must link to review queue item when available.",
  "Carnos UI Rules",
  "Carnos can explain blocked Spotify cards.",
  "Carnos cannot reveal tokens.",
  "Carnos cannot approve card actions.",
  "Visual Badge Map",
  "Spotify Connected",
  "Developer App Required",
  "Token Hidden",
  "Action Review Required",
  "Audit Redacted",
  "Schema Required For Runtime",
  "Audit Events Required",
  "spotify_ui_card_viewed",
  "spotify_media_permissions_viewed",
  "spotify_connector_audit_card_viewed",
  "spotify_ui_token_redaction_enforced",
  "Blocked Reasons",
  "spotify_ui_schema_required_for_runtime",
  "spotify_connector_not_configured",
  "spotify_private_mode_active",
  "spotify_emergency_lockdown_active",
  "spotify_token_boundary",
  "spotify_audit_redacted",
  "Must Not Do",
  "do not create migrations in 20W",
  "do not invent Spotify UI persistence schema in 20W",
  "do not implement React components in 20W",
  "do not implement dashboard adapters in 20W",
  "do not implement database reads in 20W",
  "do not implement database writes in 20W",
  "do not implement audit writes in 20W",
  "do not implement Spotify provider calls in 20W",
  "do not expose token values",
  "do not show raw OAuth payloads",
  "do not let Carnos approve UI actions",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.ui_surfaces.length < 4) missing.push("UI surfaces incomplete");
if (fixture.card_states.length < 20) missing.push("card states incomplete");
if (fixture.media_permission_groups.length < 6) missing.push("media permission groups incomplete");
if (fixture.card_actions.length < 6) missing.push("card actions incomplete");
if (fixture.redaction_rules.length < 12) missing.push("redaction rules incomplete");
if (fixture.private_mode_ui_rules.length < 11) missing.push("private mode UI rules incomplete");
if (fixture.emergency_lockdown_ui_rules.length < 10) missing.push("emergency lockdown UI rules incomplete");
if (fixture.connector_audit_card_rules.length < 11) missing.push("connector audit card rules incomplete");
if (fixture.carnos_ui_rules.length < 10) missing.push("Carnos UI rules incomplete");
if (fixture.visual_badge_map.length < 23) missing.push("visual badge map incomplete");
if (fixture.audit_events_required.length < 17) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 22) missing.push("blocked reasons incomplete");
if (fixture.must_not_do.length < 16) missing.push("must-not-do rules incomplete");

if (missing.length > 0) {
  console.error("Phase 20W audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20W Spotify UI media permission cards audit passed.");
console.log("✓ Spotify connector cards, media permission cards, audit cards, redaction, privacy modes, Carnos UI rules, badges, and schema gates are locked.");
