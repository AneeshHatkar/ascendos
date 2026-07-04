import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20M_FORGET_DESTRUCTIVE_MANIFEST_SAFETY.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20m_forget_destructive_manifest_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20M_FORGET_DESTRUCTIVE_MANIFEST_SAFETY_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Forget / Destructive Manifest + Destructive Safety",
  "Needs live database schema: false",
  "Forget Manifest Model",
  "manifest_id",
  "soft_forgotten_count",
  "hidden_count",
  "archived_count",
  "hard_removal_deferred_count",
  "derived_record_count",
  "Destructive Manifest Model",
  "protected_record_count",
  "audit_protected_count",
  "locked_record_count",
  "connector_boundary_count",
  "spotify_boundary_count",
  "20M never performs hard removal.",
  "Affected Record Model",
  "planned_effect",
  "soft_forgotten",
  "hard_removal_deferred",
  "Skipped Record Model",
  "skip_reason",
  "Skip Reasons",
  "already_forgotten",
  "fully_locked_domain",
  "hard_removal_not_supported",
  "derived_record_protected",
  "source_evidence_protected",
  "connector_token_boundary",
  "spotify_token_boundary",
  "Status Model",
  "preview_required",
  "needs_review",
  "confirmation_required",
  "cooldown_pending",
  "ready_to_apply",
  "applied_soft_effects",
  "hard_removal_deferred",
  "blocked",
  "expired",
  "Action Types",
  "forget_memory",
  "hide_scope",
  "archive_scope",
  "request_destructive_action",
  "request_hard_removal_deferred",
  "forget_connector_metadata",
  "forget_spotify_metadata",
  "Derived Record Rules",
  "Derived records must be identified in preview when available.",
  "Derived records cannot be hard removed by 20M.",
  "Audit records remain protected and append-only.",
  "Connector-derived records must preserve token boundaries.",
  "Spotify-derived records must preserve token boundaries and recently played sensitivity.",
  "Action Group Rules",
  "memory_forget",
  "hide",
  "archive",
  "destructive_action_boundary",
  "audit",
  "connectors",
  "spotify",
  "Forget means Carnos cannot use the memory anymore.",
  "Forget does not mean hard removal by default.",
  "Destructive action requires manifest linkage.",
  "Carnos cannot approve destructive action.",
  "Carnos cannot execute destructive action.",
  "Hard removal remains deferred unless a future protected execution boundary exists.",
  "Connector token values are never affected by visible manifests except as token-boundary metadata.",
  "Spotify token values are never affected by visible manifests except as token-boundary metadata.",
  "Count Rules",
  "soft_forgotten_count must count records planned to block future Carnos use.",
  "hard_removal_deferred_count must count records where hard removal is requested but deferred.",
  "connector_boundary_count must count connector records blocked or deferred by provider/token boundaries.",
  "spotify_boundary_count must count Spotify records blocked or deferred by provider/token boundaries.",
  "Warning Codes",
  "forget_does_not_hard_remove",
  "hard_removal_deferred",
  "audit_records_protected",
  "derived_records_detected",
  "connector_tokens_protected",
  "spotify_tokens_protected",
  "manifest_only_no_runtime_effect",
  "Blocked Reasons",
  "manifest_required",
  "hard_removal_not_supported",
  "hard_removal_deferred",
  "carnos_cannot_approve",
  "carnos_cannot_execute",
  "connector_provider_boundary",
  "spotify_provider_boundary",
  "spotify_recently_played_sensitive",
  "Audit Events Required",
  "forget_manifest_created",
  "forget_manifest_preview_generated",
  "destructive_manifest_created",
  "destructive_manifest_preview_generated",
  "destructive_manifest_hard_removal_deferred",
  "carnos_destructive_action_blocked",
  "connector_destructive_boundary_enforced",
  "spotify_destructive_boundary_enforced",
  "Badge Requirements",
  "Soft Forgotten",
  "Hard Removal Deferred",
  "Audit Protected",
  "Source Protected",
  "Derived Records Detected",
  "Carnos Blocked",
  "Connector Boundary",
  "Spotify Boundary",
  "Token Protected",
  "Must Not Do",
  "do not create migrations in 20M",
  "do not invent manifest persistence schema in 20M",
  "do not implement forget mutations in 20M",
  "do not implement hard removal in 20M",
  "do not let Carnos approve destructive action",
  "do not let Carnos execute destructive action",
  "do not expose connector token values",
  "do not expose Spotify token values",
  "do not hard remove audit records",
  "do not treat forget as hard removal by default",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.forget_manifest_model.required_fields.length < 18) missing.push("forget manifest fields incomplete");
if (fixture.destructive_manifest_model.required_fields.length < 20) missing.push("destructive manifest fields incomplete");
if (fixture.affected_record_model.required_fields.length < 10) missing.push("affected record fields incomplete");
if (fixture.skipped_record_model.required_fields.length < 8) missing.push("skipped record fields incomplete");
if (fixture.skip_reasons.length < 18) missing.push("skip reasons incomplete");
if (fixture.status_model.length < 10) missing.push("status model incomplete");
if (fixture.action_types.length < 10) missing.push("action types incomplete");
if (fixture.derived_record_rules.length < 10) missing.push("derived record rules incomplete");
if (fixture.action_group_rules.length < 7) missing.push("action group rules incomplete");
if (fixture.count_rules.length < 9) missing.push("count rules incomplete");
if (fixture.warning_codes.length < 17) missing.push("warning codes incomplete");
if (fixture.blocked_reasons.length < 23) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 19) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20M audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20M forget destructive manifest safety audit passed.");
console.log("✓ Forget manifests, destructive manifests, affected/skipped records, hard-removal-deferred, Carnos denial, connector, Spotify, audit, and badges are locked.");
