import { existsSync, readFileSync } from "node:fs";

const lockPath = "docs/roadmap/PHASE_20_PRIVACY_EXPORT_CONNECTOR_SCOPE_LOCK.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20a_scope_lock_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20A_PRIVACY_EXPORT_CONNECTOR_SCOPE_LOCK_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const lock = read(lockPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Phase 20 — Privacy / Export / Memory Control / External Connector Trust Layer",
  "Chunk-by-Chunk Step Plan",
  "Source Coverage Carryover",
  "scanned_items: 6760",
  "likely_covered: 6739",
  "partial: 12",
  "weak: 1",
  "missing_by_keyword_scan: 8",
  "schema_version 1.1.1",
  "log bug",
  "add lab",
  "add set",
  "event_source system",
  "voice command log my day",
  "python ML worker current_patch Phase 5.15",
  "Spotify Connector",
  "Spotify OAuth/PKCE boundary",
  "Spotify account connection flow",
  "Spotify Developer App setup instructions",
  "Spotify redirect URI boundary",
  "Spotify environment variable boundary",
  "External API Connector Framework",
  "connector account model",
  "connector permission model",
  "connector scope model",
  "connector token boundary",
  "connector action request",
  "connector action manifest",
  "connector audit event",
  "Spotify device snapshot",
  "Spotify action proposal",
  "Amazon Echo excluded",
  "Garmin deferred",
  "Emergency Lockdown",
  "Memory Inbox",
  "Saved Memories",
  "forget memory",
  "hide memory and data",
  "archive memory and data",
  "Delete / Destructive Actions card",
  "destructive action boundary",
  "export data",
  "export manifest",
  "export expiration",
  "Private Mode",
  "Timed Private Mode",
  "Sensitive Locks",
  "domain privacy permissions",
  "Carnos access matrix",
  "privacy action review queue",
  "two-step confirmation",
  "cooldown boundary",
  "Audit Viewer",
  "append-only audit boundary",
  "privacy audit event taxonomy",
  "redaction rules",
  "privacy badges",
  "data retention boundary",
  "cross-phase privacy enforcement",
  "external connector registry",
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_REDIRECT_URI",
  "SPOTIFY_CLIENT_SECRET optional future boundary",
  "spotify_read_playback",
  "spotify_modify_playback",
  "spotify_read_currently_playing",
  "spotify_read_recently_played",
  "spotify_read_playlists",
  "spotify_start_playlist",
  "spotify_pause_resume",
  "spotify_skip_track",
  "spotify_set_volume",
  "spotify_transfer_device",
  "spotify_add_to_queue",
  "spotify_read_devices",
  "manual workout logging through Carnos chat",
  "manual workout logging through Carnos voice later",
  "structured workout proposal",
  "Apple Health full integration deferred",
  "Gmail connector deferred",
  "Google Calendar connector deferred",
  "Notion connector deferred",
  "GitHub connector deferred",
  "Slack connector deferred",
  "Discord connector deferred",
  "YouTube connector deferred",
  "LinkedIn connector deferred",
  "No Spotify account connection without user OAuth.",
  "No Spotify token access by Carnos.",
  "No Spotify listening history memory without approval.",
];

const missing = [];
for (const marker of required) {
  if (!lock.includes(marker)) missing.push(marker);
}

const expectedChunkIds = ["20A","20B","20C","20D","20E","20F","20G","20H","20I","20J","20K","20L","20M","20N","20O","20P","20Q","20R","20S","20T","20U","20V","20W","20X","20Y","20Z"];
const actualChunkIds = fixture.chunks.map(chunk => chunk.id);
for (const id of expectedChunkIds) {
  if (!actualChunkIds.includes(id)) missing.push("chunk id " + id);
}

for (const chunk of fixture.chunks) {
  const heading = "### " + chunk.id + " — " + chunk.name;
  if (!lock.includes(heading)) missing.push(heading);
  for (const section of ["Purpose:", "Builds:", "Does:", "Acceptance:", "Not Allowed:", "Feature Markers:"]) {
    const afterHeading = lock.slice(lock.indexOf(heading));
    const next = afterHeading.indexOf("### ", 4);
    const block = next === -1 ? afterHeading : afterHeading.slice(0, next);
    if (!block.includes(section)) missing.push(chunk.id + " missing section " + section);
  }
  for (const key of ["purpose", "builds", "does", "acceptance", "not_allowed", "feature_markers"]) {
    const value = chunk[key];
    if (Array.isArray(value) && value.length === 0) missing.push(chunk.id + " empty " + key);
    if (typeof value === "string" && value.length < 20) missing.push(chunk.id + " short " + key);
  }
}

if (fixture.full_feature_inventory.length < 120) missing.push("feature inventory too small");
if (fixture.total_steps.length < 55) missing.push("total step list too small");
if (fixture.spotify_account_connection_flow.length < 10) missing.push("Spotify account connection flow incomplete");
if (fixture.exclusions_and_deferrals.length < 15) missing.push("exclusion and deferral list incomplete");
if (fixture.safety_guarantees.length < 18) missing.push("safety guarantee list incomplete");

if (missing.length > 0) {
  console.error("Phase 20A lock failed. Missing or incomplete markers:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20A scope lock audit passed.");
console.log("✓ Every 20A-20Z chunk has Purpose, Builds, Does, Acceptance, Not Allowed, and Feature Markers.");
console.log("✓ Phase 20 feature inventory, Spotify connection flow, connector framework, exclusions, deferrals, and safety guarantees are locked.");
