import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20D_FORGET_HIDE_ARCHIVE_DESTRUCTIVE_SEMANTICS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20d_forget_hide_archive_destructive_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20D_FORGET_HIDE_ARCHIVE_DESTRUCTIVE_SEMANTICS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Forget Hide Archive Destructive Action Semantics",
  "Needs live database schema: false",
  "Existing Schema And Source References",
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
  "0028_memory_rag_schema_alignment.sql",
  "PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES",
  "PHASE_15O_FORGET_DELETE_DERIVED_RECORDS",
  "PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY",
  "PHASE_16P_PRIVACY_RETENTION_RULES_CONTRACT",
  "PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS",
  "PHASE_20B_CORE_PRIVACY_DOMAIN_CONTRACTS",
  "PHASE_20C_MEMORY_CONTROL_CONTRACTS",
  "Action Definitions",
  "Forget",
  "Hide",
  "Archive",
  "Destructive Action",
  "Carnos cannot read, summarize, retrieve, rank, cite, personalize from, or use the forgotten item in context.",
  "Broad dashboards and timelines must not show hidden items.",
  "Active dashboards should not show archived items unless an archive/history surface is selected.",
  "Carnos cannot execute or approve destructive actions.",
  "Behavior Matrix",
  "Affected Surfaces",
  "Derived Record Rules",
  "Derived records must not remain active if their source memory is forgotten.",
  "Carnos cannot use derived records that depend on forgotten memories.",
  "Hard-removal of derived records is deferred to a protected boundary and cannot be silently executed.",
  "Forget Manifest Requirements",
  "Destructive Action Manifest Requirements",
  "affected_records",
  "skipped_records",
  "skip_reasons",
  "derived_record_behavior",
  "confirmation_level",
  "cooldown_status",
  "hard_removal_deferred",
  "Review And Confirmation Rules",
  "Destructive action always requires two-step confirmation.",
  "Carnos cannot approve any forget or destructive action.",
  "Carnos cannot execute destructive action.",
  "Blocked Reasons",
  "private_mode_active",
  "emergency_lockdown_active",
  "fully_locked",
  "cooldown_required",
  "carnos_cannot_approve",
  "carnos_cannot_execute",
  "manifest_required",
  "schema_not_confirmed_for_live_execution",
  "retention_rule_blocks_hard_removal",
  "Audit Events Required",
  "memory_forgotten",
  "memory_hidden",
  "memory_archived",
  "privacy_action_requested",
  "destructive_action_requested",
  "destructive_action_confirmed",
  "destructive_action_blocked",
  "derived_record_blocked",
  "source_lineage_preserved",
  "Carnos Rules",
  "Carnos cannot use forgotten memory.",
  "Carnos cannot silently create hard-removal requests.",
  "Must Not Do",
  "do not create migrations in 20D",
  "do not invent live privacy_action_requests schema in 20D",
  "do not implement hard-removal execution in 20D",
  "do not let forget mean hard removal by default",
  "do not let Carnos approve or execute destructive actions",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.action_definitions.length < 4) missing.push("action definitions incomplete");
if (fixture.behavior_matrix.length < 4) missing.push("behavior matrix incomplete");
if (fixture.affected_surfaces.length < 10) missing.push("affected surfaces incomplete");
if (fixture.derived_record_rules.length < 6) missing.push("derived record rules incomplete");
if (fixture.manifest_requirements.forget_manifest.length < 10) missing.push("forget manifest incomplete");
if (fixture.manifest_requirements.destructive_action_manifest.length < 10) missing.push("destructive action manifest incomplete");
if (fixture.review_and_confirmation_rules.length < 8) missing.push("review rules incomplete");
if (fixture.blocked_reasons.length < 10) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 12) missing.push("audit events incomplete");
if (fixture.carnos_rules.length < 8) missing.push("Carnos rules incomplete");

if (missing.length > 0) {
  console.error("Phase 20D audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20D forget hide archive destructive semantics audit passed.");
console.log("✓ Forget, hide, archive, destructive action, derived record, manifest, review, audit, and Carnos safety rules are locked.");
