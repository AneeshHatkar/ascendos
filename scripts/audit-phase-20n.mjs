import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20N_AUDIT_VIEWER_APPEND_ONLY_BOUNDARY.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20n_audit_viewer_append_only_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20N_AUDIT_VIEWER_APPEND_ONLY_BOUNDARY_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Audit Viewer + Append-Only Audit Boundary",
  "Needs live database schema: false",
  "Audit Viewer Model",
  "Route: /privacy",
  "Card name: Audit Viewer",
  "append_only_boundary_visible",
  "Audit Event Display Model",
  "audit_event_id",
  "event_type",
  "actor_type",
  "target_type",
  "payload_visibility",
  "linked_review_id",
  "linked_manifest_id",
  "linked_connector_id",
  "linked_spotify_action_id",
  "Detail Panel Model",
  "append_only_notice",
  "carnos_access_notice",
  "export_relationship_notice",
  "Filter Dimensions",
  "event_type",
  "event_group",
  "actor_type",
  "connector_id",
  "spotify_action_type",
  "blocked_reason",
  "Event Groups",
  "memory",
  "privacy_action",
  "export",
  "forget_manifest",
  "destructive_manifest",
  "external_connector",
  "spotify",
  "system_boundary",
  "Actor Types",
  "user",
  "carnos",
  "system",
  "connector_boundary",
  "spotify_boundary",
  "Target Types",
  "export_manifest",
  "forget_manifest",
  "destructive_manifest",
  "connector_action_manifest",
  "spotify_action_manifest",
  "Payload Visibility Levels",
  "full_value",
  "summary_only",
  "metadata_only",
  "redacted",
  "hidden",
  "Append-Only Boundary Rules",
  "Audit events are append-only.",
  "Audit events are not edited by Carnos.",
  "Audit events are not removed by Carnos.",
  "Audit payload visibility can be redacted in viewer surfaces without changing the original event boundary.",
  "Audit export must preserve append-only semantics.",
  "Linked Object Rules",
  "review_request",
  "manifest",
  "source_evidence",
  "connector",
  "spotify",
  "Connector token values are never shown.",
  "Spotify token values are never shown.",
  "Carnos Audit Rules",
  "Carnos cannot edit audit events.",
  "Carnos cannot remove audit events.",
  "Carnos cannot clear audit history.",
  "Carnos cannot bypass append-only boundary.",
  "Carnos cannot access connector token values through audit records.",
  "Carnos cannot access Spotify token values through audit records.",
  "Carnos cannot use forgotten memory through audit payloads.",
  "Audit Export Relationship Rules",
  "Audit logs require explicit inclusion in export scope.",
  "Audit export must not expose connector token values.",
  "Audit export must not expose Spotify token values.",
  "Audit export must show append-only notice.",
  "Protected Audit Event Rules",
  "Private Mode enable and disable events are protected.",
  "Emergency Lockdown enable and disable events are protected.",
  "Destructive manifest events are protected.",
  "Token boundary events are protected.",
  "Display Columns",
  "created_at",
  "badges",
  "Warning Codes",
  "payload_redacted",
  "append_only_protected",
  "connector_token_hidden",
  "spotify_token_hidden",
  "export_requires_explicit_inclusion",
  "Blocked Reasons",
  "audit_visibility_blocked",
  "payload_visibility_blocked",
  "append_only_boundary",
  "audit_export_not_selected",
  "audit_payload_export_blocked",
  "Audit Events Required",
  "audit_viewer_opened",
  "audit_detail_panel_opened",
  "audit_append_only_notice_shown",
  "audit_carnos_summary_blocked",
  "audit_connector_token_boundary_enforced",
  "audit_spotify_token_boundary_enforced",
  "Badge Requirements",
  "Append Only",
  "Audit Protected",
  "Payload Redacted",
  "Connector Boundary",
  "Spotify Boundary",
  "Token Hidden",
  "Carnos Restricted",
  "Export Explicit Only",
  "Must Not Do",
  "do not create migrations in 20N",
  "do not invent audit persistence schema in 20N",
  "do not implement audit row writes in 20N",
  "do not implement audit row edits in 20N",
  "do not implement Audit Viewer UI in 20N",
  "do not expose connector token values",
  "do not expose Spotify token values",
  "do not let Carnos edit audit events",
  "do not let Carnos remove audit events",
  "do not let Carnos clear audit history",
  "do not bypass append-only boundary",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.audit_viewer_model.required_fields.length < 10) missing.push("audit viewer fields incomplete");
if (fixture.audit_event_display_model.required_fields.length < 24) missing.push("audit event display fields incomplete");
if (fixture.detail_panel_model.required_fields.length < 14) missing.push("detail panel fields incomplete");
if (fixture.filter_dimensions.length < 20) missing.push("filter dimensions incomplete");
if (fixture.event_groups.length < 18) missing.push("event groups incomplete");
if (fixture.actor_types.length < 8) missing.push("actor types incomplete");
if (fixture.target_types.length < 24) missing.push("target types incomplete");
if (fixture.payload_visibility_levels.length < 5) missing.push("payload visibility levels incomplete");
if (fixture.append_only_boundary_rules.length < 12) missing.push("append-only rules incomplete");
if (fixture.linked_object_rules.length < 5) missing.push("linked object rules incomplete");
if (fixture.carnos_audit_rules.length < 10) missing.push("Carnos audit rules incomplete");
if (fixture.audit_export_relationship_rules.length < 10) missing.push("audit export rules incomplete");
if (fixture.protected_audit_event_rules.length < 10) missing.push("protected audit rules incomplete");
if (fixture.warning_codes.length < 14) missing.push("warning codes incomplete");
if (fixture.blocked_reasons.length < 16) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 15) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 16) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20N audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20N audit viewer append-only boundary audit passed.");
console.log("✓ Audit viewer, filters, detail panel, append-only boundary, redaction, Carnos restrictions, connector, Spotify, export, and badges are locked.");
