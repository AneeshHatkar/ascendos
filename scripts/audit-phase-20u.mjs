import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20U_SPOTIFY_MEDIA_BOUNDARIES.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20u_spotify_media_boundaries_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20U_SPOTIFY_MEDIA_BOUNDARIES_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Spotify Playback / Device / Playlist / Recently Played Boundaries",
  "Needs live database schema: false",
  "Official Spotify Reference Boundary",
  "Spotify playback state can include current playback, progress, and active device context.",
  "Spotify available devices endpoint exposes Spotify Connect devices and some device models may not be listed.",
  "Spotify recently played data is OAuth-protected and can reveal listening history.",
  "Spotify playlist item access can depend on owner or collaborator permission.",
  "Spotify playback control endpoints can require Spotify Premium.",
  "Provider Surfaces",
  "currently_playing",
  "playback_state",
  "available_devices",
  "queue",
  "playlists",
  "recently_played",
  "top_items",
  "Playback Control Boundaries",
  "Playback control is not implemented in 20U.",
  "Playback control may require Spotify Premium.",
  "Playback control may require an active device.",
  "Playback control must not be executed by Carnos silently.",
  "Multiple playback actions must not assume guaranteed ordering.",
  "Playlist Boundaries",
  "Private playlist metadata is private by default.",
  "Collaborative playlist metadata is private by default.",
  "Playlist local file markers must be treated as sensitive metadata.",
  "Public playlist write requires high-visibility warning.",
  "Carnos cannot modify playlists silently.",
  "Listening History Boundaries",
  "Listening history is high sensitivity by default.",
  "Listening history is blocked from Carnos context by default.",
  "Listening history is excluded from default export.",
  "Listening history must not infer protected traits.",
  "Device Boundaries",
  "spotify_device_id_boundary",
  "device_name_boundary",
  "Device id is boundary metadata and must not be shown raw by default.",
  "Carnos cannot choose a device silently.",
  "20U does not persist device data.",
  "Export Boundaries",
  "Currently playing is excluded from default export.",
  "Recently played is excluded from default export.",
  "Token values are never exportable.",
  "Analytics Boundaries",
  "Spotify data does not enter analytics by default.",
  "Any future Spotify analytics must avoid protected-trait inference.",
  "Memory Boundaries",
  "Spotify data does not become memory automatically.",
  "Spotify token values can never become memory.",
  "Private Mode Rules",
  "Private Mode blocks automatic playback reads.",
  "Private Mode blocks Spotify data entering Carnos context.",
  "Emergency Lockdown Rules",
  "Emergency Lockdown blocks playback reads.",
  "Emergency Lockdown blocks playback actions.",
  "Carnos Rules",
  "Carnos cannot modify playback silently.",
  "Carnos cannot modify playlists silently.",
  "Carnos cannot infer protected traits from listening history.",
  "Carnos cannot access token values.",
  "Provider Limitations",
  "premium_required",
  "no_active_device",
  "device_restricted",
  "playlist_forbidden",
  "playlist_not_owner_or_collaborator",
  "policy_download_blocked",
  "policy_broadcast_blocked",
  "policy_commercial_streaming_blocked",
  "policy_content_alteration_blocked",
  "policy_visual_sync_blocked",
  "Audit Events Required",
  "spotify_playback_read_requested",
  "spotify_device_read_requested",
  "spotify_playlist_read_requested",
  "spotify_recently_played_read_requested",
  "spotify_playback_action_proposed",
  "spotify_provider_limitation_detected",
  "spotify_memory_candidate_media_blocked",
  "Blocked Reasons",
  "spotify_recently_played_sensitive",
  "spotify_playlist_private",
  "spotify_premium_required",
  "spotify_no_active_device",
  "spotify_action_review_required",
  "spotify_schema_required_for_runtime",
  "Badge Requirements",
  "Playback Boundary",
  "Device Boundary",
  "Playlist Boundary",
  "Listening History Sensitive",
  "Recently Played High Sensitivity",
  "Premium Required",
  "No Active Device",
  "Action Review Required",
  "Schema Required For Runtime",
  "Must Not Do",
  "do not create migrations in 20U",
  "do not invent Spotify persistence schema in 20U",
  "do not implement Spotify API client in 20U",
  "do not implement playback reads in 20U",
  "do not implement device reads in 20U",
  "do not implement playlist reads in 20U",
  "do not implement recently played reads in 20U",
  "do not implement playback actions in 20U",
  "do not store Spotify listening history in 20U",
  "do not expose token values",
  "do not let Carnos control playback silently",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.provider_surfaces.length < 7) missing.push("provider surfaces incomplete");
if (fixture.playback_control_boundaries.future_actions.length < 10) missing.push("playback actions incomplete");
if (fixture.playback_control_boundaries.rules.length < 14) missing.push("playback control rules incomplete");
if (fixture.playlist_boundaries.read_rules.length < 8) missing.push("playlist read rules incomplete");
if (fixture.playlist_boundaries.write_rules.length < 8) missing.push("playlist write rules incomplete");
if (fixture.listening_history_boundaries.rules.length < 11) missing.push("listening history rules incomplete");
if (fixture.device_boundaries.future_device_fields.length < 9) missing.push("device fields incomplete");
if (fixture.device_boundaries.rules.length < 9) missing.push("device rules incomplete");
if (fixture.export_boundaries.length < 11) missing.push("export boundaries incomplete");
if (fixture.analytics_boundaries.length < 9) missing.push("analytics boundaries incomplete");
if (fixture.memory_boundaries.length < 9) missing.push("memory boundaries incomplete");
if (fixture.private_mode_rules.length < 9) missing.push("private mode rules incomplete");
if (fixture.emergency_lockdown_rules.length < 9) missing.push("emergency lockdown rules incomplete");
if (fixture.carnos_rules.length < 14) missing.push("Carnos rules incomplete");
if (fixture.provider_limitations.length < 18) missing.push("provider limitations incomplete");
if (fixture.audit_events_required.length < 24) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 24) missing.push("blocked reasons incomplete");
if (fixture.badge_requirements.length < 23) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20U audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20U Spotify media boundary audit passed.");
console.log("✓ Playback, devices, playlists, listening history, provider limitations, exports, analytics, memory, Carnos, and safety boundaries are locked.");
