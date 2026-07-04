import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20K_DATA_SCOPE_SELECTOR.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20k_data_scope_selector_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20K_DATA_SCOPE_SELECTOR_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Data Scope Selector",
  "Needs live database schema: false",
  "Selector Model",
  "scope_id",
  "requested_action",
  "target_domains",
  "target_record_types",
  "target_source_types",
  "date_range",
  "privacy_levels",
  "sensitivity_levels",
  "lock_states",
  "redaction_levels",
  "connector_filter",
  "spotify_filter",
  "requires_preview",
  "requires_review",
  "requires_manifest",
  "Requested Actions",
  "export_data",
  "forget_memory",
  "hide_data",
  "archive_data",
  "request_destructive_action",
  "review_connector_action",
  "review_spotify_action",
  "Domain Dimensions",
  "career",
  "health",
  "finance",
  "documents",
  "custom_trackers",
  "memory",
  "analytics",
  "timeline",
  "external_connectors",
  "spotify",
  "Record Type Dimensions",
  "memory_item",
  "memory_candidate",
  "audit_log",
  "privacy_action_request",
  "custom_tracker_entry",
  "document",
  "evidence_attachment",
  "current_info_source",
  "analytics_snapshot",
  "connector_account",
  "connector_action_manifest",
  "spotify_connection_status",
  "spotify_recently_played_snapshot",
  "spotify_action_manifest",
  "Source Type Dimensions",
  "user_created",
  "carnos_created",
  "connector_source",
  "spotify_source",
  "Selector Dimensions",
  "date_range",
  "privacy_level",
  "sensitivity_level",
  "lock_state",
  "redaction_level",
  "ownership_filter",
  "memory_state_filter",
  "connector_filter",
  "spotify_filter",
  "Action Specific Rules",
  "Scope selector must produce preview before export.",
  "Scope selector must distinguish memory candidates from saved memories.",
  "Scope selector must show affected records.",
  "Scope selector must not expose token values.",
  "Scope selector must show required Spotify scopes.",
  "Scope selector must show Premium-required state.",
  "Preview Requirements",
  "Preview must show requested action.",
  "Preview must show estimated sensitive count.",
  "Preview must show connector scope warnings.",
  "Preview must show Spotify scope warnings.",
  "Blocked Reasons",
  "scope_empty",
  "scope_too_broad",
  "date_range_invalid",
  "privacy_level_blocked",
  "fully_locked_domain",
  "connector_scope_missing",
  "connector_token_boundary",
  "spotify_scope_missing",
  "spotify_premium_required",
  "spotify_no_active_device",
  "spotify_token_boundary",
  "Audit Events Required",
  "data_scope_selector_opened",
  "data_scope_preview_generated",
  "data_scope_export_scope_selected",
  "data_scope_forget_scope_selected",
  "data_scope_connector_scope_selected",
  "data_scope_spotify_scope_selected",
  "data_scope_redaction_applied",
  "Badge Requirements",
  "Scope Selected",
  "Preview Required",
  "Manifest Required",
  "Connector Scope Missing",
  "Spotify Scope Missing",
  "Premium Required",
  "No Active Device",
  "Token Hidden",
  "Must Not Do",
  "do not create migrations in 20K",
  "do not invent selector persistence schema in 20K",
  "do not implement live data queries in 20K",
  "do not implement export generation in 20K",
  "do not expose connector token values",
  "do not expose Spotify token values",
  "do not let scope selector bypass Private Mode",
  "do not let scope selector include locked data without review",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.selector_model.required_fields.length < 24) missing.push("selector required fields incomplete");
if (fixture.selector_model.optional_fields.length < 18) missing.push("selector optional fields incomplete");
if (fixture.requested_actions.length < 10) missing.push("requested actions incomplete");
if (fixture.domain_dimensions.length < 28) missing.push("domain dimensions incomplete");
if (fixture.record_type_dimensions.length < 35) missing.push("record type dimensions incomplete");
if (fixture.source_type_dimensions.length < 12) missing.push("source type dimensions incomplete");
if (fixture.selector_dimensions.length < 9) missing.push("selector dimensions incomplete");
if (fixture.action_specific_rules.length < 7) missing.push("action-specific rules incomplete");
if (fixture.preview_requirements.length < 18) missing.push("preview requirements incomplete");
if (fixture.blocked_reasons.length < 24) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 14) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 16) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20K audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20K data scope selector audit passed.");
console.log("✓ Selector model, dimensions, action rules, previews, connector, Spotify, audit, and badges are locked.");
