import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20L_EXPORT_MANIFEST_EXPIRATION.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20l_export_manifest_expiration_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20L_EXPORT_MANIFEST_EXPIRATION_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Export Contracts + Manifest + Expiration",
  "Needs live database schema: false",
  "Export Request Model",
  "export_id",
  "requested_by",
  "scope_id",
  "format",
  "status",
  "expires_at",
  "audit_event_id",
  "Export Preview Model",
  "included_categories",
  "excluded_categories",
  "record_count_estimate",
  "sensitive_count_estimate",
  "locked_count_estimate",
  "redacted_count_estimate",
  "connector_count_estimate",
  "spotify_count_estimate",
  "Export Manifest Model",
  "manifest_id",
  "record_count",
  "sensitive_count",
  "locked_count",
  "redacted_count",
  "connector_metadata_count",
  "spotify_metadata_count",
  "checksum_boundary",
  "The checksum boundary is a contract marker only in 20L.",
  "Export Status Model",
  "preview_required",
  "needs_review",
  "confirmation_required",
  "cooldown_pending",
  "ready_to_prepare",
  "preparing",
  "ready",
  "downloaded",
  "expired",
  "failed",
  "blocked",
  "Export Formats",
  "json",
  "csv",
  "markdown",
  "zip_bundle",
  "manifest_only",
  "Expiration Rules",
  "Every export request must have an expiration boundary.",
  "Ready exports cannot remain available forever.",
  "Expired exports cannot be downloaded.",
  "Expiration does not remove audit proof.",
  "Scope Category Rules",
  "memory",
  "privacy",
  "audit",
  "custom_trackers",
  "documents_evidence",
  "analytics_timeline",
  "external_connectors",
  "spotify",
  "Connector token values are never exported.",
  "Spotify token values are never exported.",
  "Spotify recently played data is sensitive by default.",
  "Warning Codes",
  "export_all_requested",
  "sensitive_data_included",
  "locked_data_excluded",
  "redaction_applied",
  "connector_tokens_excluded",
  "spotify_tokens_excluded",
  "short_expiration_required",
  "Blocked Reasons",
  "preview_required",
  "review_required",
  "manifest_required",
  "scope_too_broad",
  "private_mode_active",
  "emergency_lockdown_active",
  "connector_token_boundary",
  "spotify_token_boundary",
  "spotify_premium_required",
  "spotify_no_active_device",
  "Audit Events Required",
  "export_request_created",
  "export_preview_generated",
  "export_manifest_created",
  "export_ready_to_prepare",
  "export_expired",
  "export_token_boundary_enforced",
  "Badge Requirements",
  "Export Draft",
  "Preview Required",
  "Manifest Required",
  "Connector Metadata Included",
  "Spotify Metadata Included",
  "Token Excluded",
  "Short Expiration",
  "Must Not Do",
  "do not create migrations in 20L",
  "do not invent export persistence schema in 20L",
  "do not implement export file generation in 20L",
  "do not implement storage buckets in 20L",
  "do not compute checksums in 20L",
  "do not export connector token values",
  "do not export Spotify token values",
  "do not let expired exports download",
  "do not let Carnos create exports silently",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.export_request_model.required_fields.length < 20) missing.push("export request fields incomplete");
if (fixture.export_preview_model.required_fields.length < 18) missing.push("export preview fields incomplete");
if (fixture.export_manifest_model.required_fields.length < 22) missing.push("export manifest fields incomplete");
if (fixture.export_status_model.length < 11) missing.push("export statuses incomplete");
if (fixture.export_formats.length < 5) missing.push("export formats incomplete");
if (fixture.expiration_rules.length < 9) missing.push("expiration rules incomplete");
if (fixture.scope_category_rules.length < 8) missing.push("scope category rules incomplete");
if (fixture.warning_codes.length < 17) missing.push("warning codes incomplete");
if (fixture.blocked_reasons.length < 23) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 17) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20L audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20L export manifest expiration audit passed.");
console.log("✓ Export request, preview, manifest, statuses, expiration, connector, Spotify, token exclusion, audit, and badges are locked.");
