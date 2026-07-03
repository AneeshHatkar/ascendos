import { existsSync, readFileSync } from "node:fs";

function fail(message) {
  console.error("✗ " + message);
  process.exit(1);
}

function pass(message) {
  console.log("✓ " + message);
}

function read(path) {
  if (!existsSync(path)) fail("Missing " + path);
  pass("Found " + path);
  return readFileSync(path, "utf8");
}

function includes(label, text, marker) {
  if (!text.includes(marker)) fail(label + " missing marker: " + marker);
  pass(label + " includes " + marker);
}

function excludes(label, text, marker) {
  if (text.includes(marker)) fail(label + " contains forbidden marker: " + marker);
  pass(label + " excludes forbidden marker: " + marker);
}

console.log("=== PHASE 19L REPOSITORY RLS AUDIT OWNERSHIP AUDIT ===");

const implementation = read("src/lib/custom-trackers/repository-rls-audit-ownership.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP.md");
const checklist = read("docs/qa/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19L_REPOSITORY_RLS_AUDIT_OWNERSHIP_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19l_repository_rls_audit_ownership_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19L") fail("fixture phase is not 19L");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19L complete");

for (const marker of [
  "CustomTrackerRepositoryOperation",
  "CustomTrackerOwnershipResource",
  "CustomTrackerOwnershipDecisionStatus",
  "CustomTrackerRlsPolicyStatus",
  "CustomTrackerAuditEventKind",
  "CustomTrackerAuditSeverity",
  "CustomTrackerPermissionBoundary",
  "CustomTrackerOwnershipSubject",
  "CustomTrackerOwnershipResourceInput",
  "CustomTrackerOwnershipDecision",
  "CustomTrackerRlsPolicyInput",
  "CustomTrackerRlsPolicyDecision",
  "CustomTrackerAuditEventContract",
  "CustomTrackerRepositoryBoundaryInput",
  "CustomTrackerRepositoryBoundaryDecision",
  "CustomTrackerRepositoryRlsAuditSummary",
  "PHASE_19L_REPOSITORY_RLS_AUDIT_BOUNDARY",
  "CUSTOM_TRACKER_REPOSITORY_OPERATIONS",
  "CUSTOM_TRACKER_OWNERSHIP_RESOURCES",
  "CUSTOM_TRACKER_AUDIT_EVENT_KINDS",
  "CUSTOM_TRACKER_WRITE_OPERATIONS",
  "validateCustomTrackerOwnership",
  "assertCustomTrackerRlsBoundary",
  "mapCustomTrackerOperationToAuditEvent",
  "buildCustomTrackerAuditEventContract",
  "evaluateCustomTrackerRepositoryBoundary",
  "validateCustomTrackerFieldOwnershipThroughTracker",
  "validateCustomTrackerEntryOwnershipThroughTracker",
  "validateCustomTrackerDashboardCardOwnership",
  "blockCustomTrackerCrossUserReference",
  "assertNoBypassingCustomTrackerRlsOwnership",
  "summarizeCustomTrackerRepositoryRlsAuditBoundary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "repositoryBoundaryEnabled: true",
  "rlsBoundaryEnabled: true",
  "auditTrailContractEnabled: true",
  "trackerOwnershipValidationEnabled: true",
  "fieldOwnershipValidationThroughTrackerEnabled: true",
  "entryOwnershipValidationThroughTrackerEnabled: true",
  "dashboardCardOwnershipValidationEnabled: true",
  "trackerIdFieldIdCrossUserProtectionEnabled: true",
  "runtimeRepositoryEnabled: false",
  "runtimeWritesEnabled: false",
  "runtimeDatabaseReadsEnabled: false",
  "runtimeDatabaseWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "supabaseRuntimeEnabled: false",
  "noBypassingRlsUserOwnership: true",
  "noUnreviewedTrackerWrites: true",
  "missing authenticated user",
  "missing owner id",
  "owner mismatch blocks cross-user access",
  "tracker id and parent tracker id mismatch",
  "field id and parent field id mismatch",
  "dashboard card owner mismatch",
  "write operation requires explicit user approval",
  "write operation requires review queue reference",
  "system resource is blocked for non-system subject",
  "crossUserAccessAllowed: false"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./repository-rls-audit-ownership\"");

for (const marker of [
  "Repository boundary contract",
  "RLS/user ownership boundary",
  "Tracker ownership validation",
  "Field ownership validation through tracker ownership",
  "Entry ownership validation through tracker ownership",
  "Dashboard card ownership validation",
  "Tracker ID / field ID cross-user protection",
  "Audit trail contract",
  "Audit events for tracker creation",
  "Audit events for field creation/change/deprecation",
  "Audit events for entry creation/change/archive",
  "Audit events for dashboard placement changes",
  "Audit events for AI mapping proposal approval/rejection",
  "Write operation approval boundary",
  "Review queue reference requirement for future writes",
  "Cross-user access blocking",
  "System-resource misuse blocking",
  "No bypassing RLS/user ownership",
  "No unreviewed tracker writes",
  "No SQL schema migration is added in 19L",
  "No runtime database read or write is added in 19L"
]) includes("contract", contract, marker);

for (const marker of [
  "Repository boundary contract exists",
  "RLS/user ownership boundary exists",
  "Tracker ownership validation exists",
  "Field ownership validation through tracker ownership exists",
  "Entry ownership validation through tracker ownership exists",
  "Dashboard card ownership validation exists",
  "Tracker ID / field ID cross-user protection exists",
  "Audit trail contract exists",
  "Audit events for tracker creation exist",
  "Audit events for field creation/change/deprecation exist",
  "Audit events for entry creation/change/archive exist",
  "Audit events for dashboard placement changes exist",
  "Audit events for AI mapping proposal approval/rejection exist",
  "Write operation approval boundary exists",
  "Review queue reference requirement exists",
  "Cross-user access blocking exists",
  "System-resource misuse blocking exists",
  "No bypassing RLS/user ownership boundary exists",
  "No unreviewed tracker writes boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19l",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19L adds deterministic local boundaries",
  "Repository operations are represented as contracts only",
  "RLS/user ownership checks block missing auth",
  "Write operations require explicit approval and review queue references",
  "Audit event contracts represent tracker, field, entry, dashboard placement, and AI mapping approval/rejection events",
  "Cross-user tracker and field references are blocked",
  "No SQL migration was added",
  "No runtime database call was added",
  "No runtime repository write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "repository_boundary_contract",
  "rls_user_ownership_boundary",
  "tracker_ownership_validation",
  "field_ownership_validation_through_tracker_ownership",
  "entry_ownership_validation_through_tracker_ownership",
  "dashboard_card_ownership_validation",
  "tracker_id_field_id_cross_user_protection",
  "audit_trail_contract",
  "audit_events_for_tracker_creation",
  "audit_events_for_field_creation_change_deprecation",
  "audit_events_for_entry_creation_change_archive",
  "audit_events_for_dashboard_placement_changes",
  "audit_events_for_ai_mapping_proposal_approval_rejection",
  "write_operation_approval_boundary",
  "review_queue_reference_requirement",
  "cross_user_access_blocking",
  "system_resource_misuse_blocking",
  "no_bypassing_rls_user_ownership",
  "no_unreviewed_tracker_writes"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19l");
includes("package.json", pkgText, "scripts/audit-phase-19l.mjs");

for (const marker of [
  "createSupabaseServerClient",
  ".from(",
  "insert(",
  "update(",
  "delete(",
  "upsert(",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "vector(",
  "embedding vector",
  "navigator.mediaDevices",
  "setInterval(",
  "setTimeout(",
  "speechSynthesis",
  "executeApprovedAction"
]) excludes("implementation", implementation, marker);

console.log("✓ Phase 19L repository RLS audit ownership audit passed.");
