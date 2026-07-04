import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20C_MEMORY_CONTROL_CONTRACTS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20c_memory_control_contracts_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20C_MEMORY_CONTROL_CONTRACTS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Memory Control Contracts",
  "Needs live database schema: false",
  "Existing Schema And Source References",
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
  "0028_memory_rag_schema_alignment.sql",
  "PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES",
  "PHASE_15D_MEMORY_CANDIDATE_ENGINE",
  "PHASE_15E_MEMORY_INBOX_UI",
  "PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES",
  "PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES",
  "PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL",
  "PHASE_15O_FORGET_DELETE_DERIVED_RECORDS",
  "PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY",
  "PHASE_17E_MEMORY_INBOX_REPOSITORY",
  "PHASE_17F_APPROVED_MEMORY_REPOSITORY",
  "Memory Inbox",
  "Saved Memories",
  "Memory Candidate Model",
  "Saved Memory Model",
  "candidate_id",
  "proposed_summary",
  "source_reference",
  "privacy_level",
  "sensitivity_level",
  "lock_state",
  "redaction_level",
  "review_status",
  "duplicate_warning",
  "conflict_warning",
  "evidence_link",
  "audit_link",
  "approve_memory",
  "reject_memory",
  "defer_memory",
  "forget_memory",
  "hide_memory",
  "archive_memory",
  "Carnos cannot approve its own memory candidate.",
  "Private Mode blocks automatic memory candidate creation",
  "Emergency Lockdown blocks memory candidate creation by default.",
  "Forgotten saved memories cannot be used by Carnos context",
  "Hidden saved memories must not appear on broad dashboards",
  "Archived saved memories remain preserved for history/audit",
  "Duplicate candidates must show duplicate_warning.",
  "Conflict candidates must show conflict_warning.",
  "memory_candidate_created",
  "memory_approved",
  "memory_rejected",
  "memory_deferred",
  "memory_hidden",
  "memory_archived",
  "memory_forgotten",
  "memory_privacy_changed",
  "memory_carnos_access_changed",
  "no silent memory save",
  "no Carnos self-approval",
  "no sensitive memory auto-approval",
  "no rejected memory use",
  "no deferred memory use",
  "no forgotten memory use",
  "no hidden memory dashboard exposure",
  "no locked memory Carnos access",
  "no source/evidence privacy bypass",
  "no audit-free memory review action",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.memory_surfaces.length < 2) missing.push("memory surfaces incomplete");
if (fixture.memory_candidate_model.required_fields.length < 12) missing.push("candidate fields incomplete");
if (fixture.saved_memory_model.required_fields.length < 15) missing.push("saved memory fields incomplete");
if (fixture.review_rules.length < 10) missing.push("review rules incomplete");
if (fixture.carnos_memory_access_rules.length < 8) missing.push("Carnos memory rules incomplete");
if (fixture.source_evidence_rules.length < 6) missing.push("source evidence rules incomplete");
if (fixture.audit_events_required.length < 10) missing.push("audit events incomplete");
if (fixture.blocked_behaviors.length < 8) missing.push("blocked behaviors incomplete");

if (missing.length > 0) {
  console.error("Phase 20C audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20C memory control contracts audit passed.");
console.log("✓ Memory Inbox, Saved Memories, candidate review, Carnos access, source/evidence, duplicate/conflict, and audit rules are locked.");
