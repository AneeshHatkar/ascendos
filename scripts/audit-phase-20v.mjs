import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20V_SPOTIFY_CARNOS_ACTION_SAFETY.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20v_spotify_carnos_action_safety_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20V_SPOTIFY_CARNOS_ACTION_SAFETY_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Spotify Carnos Actions + Action Safety",
  "Needs live database schema: false",
  "Action Classes",
  "status_explain",
  "connection_guidance",
  "scope_request_proposal",
  "playback_read_summary",
  "listening_history_summary",
  "playback_control",
  "playlist_mutation",
  "disconnect_or_revoke",
  "Action Safety Levels",
  "informational",
  "sensitive_read",
  "external_state_change",
  "connector_account_change",
  "Proposal Manifest Fields Future",
  "spotify_action_request_id",
  "proposed_by_carnos_session_id",
  "expected_external_change",
  "Approval Rules",
  "Carnos can propose but cannot approve Spotify actions.",
  "User approval is required for every external state change.",
  "Approval prompt must not show token values.",
  "Approval must expire.",
  "Review Queue Rules",
  "Spotify external state changes must enter privacy action review queue.",
  "High-sensitivity Spotify reads must enter privacy action review queue.",
  "Review queue must not expose tokens.",
  "Cooldown Rules",
  "Playlist public visibility changes require cooldown.",
  "Cooldown cannot be bypassed by Carnos.",
  "Scope And Provider Requirement Rules",
  "Playback control requires playback write scope when provider requires it.",
  "Premium required blocks playback write action until provider eligibility is satisfied.",
  "No active device blocks device-dependent playback action.",
  "Private Mode Rules",
  "Private Mode blocks Carnos Spotify action proposals by default.",
  "Carnos cannot disable Private Mode.",
  "Emergency Lockdown Rules",
  "Emergency Lockdown blocks all Carnos Spotify external actions.",
  "Carnos cannot disable Emergency Lockdown.",
  "Playlist Action Rules",
  "Carnos cannot create playlists silently.",
  "Public playlist actions require high-visibility warning.",
  "Playback Action Rules",
  "Carnos cannot start playback silently.",
  "Playback action must check active device boundary.",
  "Playback action must check Premium requirement boundary.",
  "Listening History Action Rules",
  "Carnos cannot access recently played by default.",
  "Carnos cannot use listening history for protected-trait inference.",
  "Carnos Allowed Phrases Boundary",
  "I cannot perform this Spotify action without your approval.",
  "I cannot see or use Spotify token values.",
  "Carnos Forbidden Behaviors",
  "silently starting OAuth",
  "silently approving playback control",
  "using listening history for protected-trait inference",
  "treating connection as blanket consent",
  "Audit Events Required",
  "spotify_carnos_action_proposed",
  "spotify_carnos_action_blocked",
  "spotify_carnos_action_review_required",
  "spotify_carnos_action_approved_by_user",
  "spotify_carnos_playback_action_proposed",
  "spotify_carnos_playlist_action_proposed",
  "spotify_carnos_listening_history_access_blocked",
  "spotify_carnos_schema_required_for_runtime",
  "Blocked Reasons",
  "spotify_user_approval_required",
  "spotify_review_queue_required",
  "spotify_premium_required",
  "spotify_no_active_device",
  "spotify_private_mode_active",
  "spotify_emergency_lockdown_active",
  "spotify_schema_required_for_runtime",
  "spotify_action_manifest_required",
  "Badge Requirements",
  "Carnos Proposal",
  "User Approval Required",
  "Review Required",
  "Cooldown Required",
  "Premium Required",
  "No Active Device",
  "Private Mode Blocked",
  "Emergency Lockdown Blocked",
  "Schema Required For Runtime",
  "Must Not Do",
  "do not create migrations in 20V",
  "do not invent Spotify action persistence schema in 20V",
  "do not implement Carnos Spotify runtime tools in 20V",
  "do not implement Spotify API client in 20V",
  "do not implement playback actions in 20V",
  "do not implement playlist actions in 20V",
  "do not expose token values",
  "do not let Carnos approve Spotify actions",
  "do not let Carnos perform Spotify actions silently",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.action_classes.length < 8) missing.push("action classes incomplete");
if (fixture.action_safety_levels.length < 4) missing.push("action safety levels incomplete");
if (fixture.proposal_manifest_fields_future.length < 25) missing.push("proposal manifest fields incomplete");
if (fixture.approval_rules.length < 14) missing.push("approval rules incomplete");
if (fixture.review_queue_rules.length < 9) missing.push("review queue rules incomplete");
if (fixture.cooldown_rules.length < 8) missing.push("cooldown rules incomplete");
if (fixture.scope_and_provider_requirement_rules.length < 12) missing.push("scope/provider rules incomplete");
if (fixture.private_mode_rules.length < 9) missing.push("private mode rules incomplete");
if (fixture.emergency_lockdown_rules.length < 9) missing.push("emergency lockdown rules incomplete");
if (fixture.playlist_action_rules.length < 10) missing.push("playlist action rules incomplete");
if (fixture.playback_action_rules.length < 12) missing.push("playback action rules incomplete");
if (fixture.listening_history_action_rules.length < 9) missing.push("listening history rules incomplete");
if (fixture.carnos_allowed_phrases_boundary.length < 8) missing.push("allowed Carnos phrases incomplete");
if (fixture.carnos_forbidden_behaviors.length < 13) missing.push("forbidden Carnos behaviors incomplete");
if (fixture.audit_events_required.length < 24) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 23) missing.push("blocked reasons incomplete");
if (fixture.badge_requirements.length < 22) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20V audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20V Spotify Carnos action safety audit passed.");
console.log("✓ Carnos proposals, approvals, review, cooldowns, scope checks, provider limits, privacy modes, audit, blocked reasons, badges, and schema gates are locked.");
