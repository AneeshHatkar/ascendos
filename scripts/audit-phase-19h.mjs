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

console.log("=== PHASE 19H CARNOS PROPOSALS REVIEW QUEUE AUDIT ===");

const implementation = read("src/lib/custom-trackers/carnos-proposals-review-queue.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19H_CARNOS_PROPOSALS_REVIEW_QUEUE.md");
const checklist = read("docs/qa/PHASE_19H_CARNOS_PROPOSALS_REVIEW_QUEUE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19H_CARNOS_PROPOSALS_REVIEW_QUEUE_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19h_carnos_proposals_review_queue_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19H") fail("fixture phase is not 19H");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19H complete");

for (const marker of [
  "CustomTrackerAiProposalState",
  "CustomTrackerCarnosProposalKind",
  "CustomTrackerReviewQueueDecision",
  "CustomTrackerProposalValidationStatus",
  "CustomTrackerProposalSourceKind",
  "CustomTrackerProposedField",
  "CustomTrackerCreationProposal",
  "CustomTrackerImprovementProposal",
  "CustomTrackerFieldMappingProposal",
  "CustomTrackerMessageToEntryProposal",
  "CustomTrackerCarnosProposal",
  "CustomTrackerReviewQueueItem",
  "CustomTrackerProposalValidationIssue",
  "CustomTrackerProposalValidationResult",
  "CustomTrackerReviewDecisionResult",
  "CustomTrackerCarnosProposalBoundarySummary",
  "PHASE_19H_CARNOS_PROPOSAL_BOUNDARY",
  "CUSTOM_TRACKER_AI_PROPOSAL_STATES",
  "CUSTOM_TRACKER_CARNOS_PROPOSAL_KINDS",
  "CUSTOM_TRACKER_REVIEW_QUEUE_DECISIONS",
  "isCustomTrackerProposalExpired",
  "buildCustomTrackerReviewQueueItem",
  "validateCustomTrackerProposal",
  "validateCustomTrackerCreationProposal",
  "validateCustomTrackerImprovementProposal",
  "validateCustomTrackerFieldMappingProposal",
  "validateCustomTrackerMessageToEntryProposal",
  "evaluateCustomTrackerProposalPrivacyGate",
  "applyCustomTrackerReviewDecision",
  "assertNoSilentCustomTrackerProposalWrites",
  "summarizeCustomTrackerCarnosProposalBoundary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "trackerCreationProposalsEnabled: true",
  "trackerImprovementProposalsEnabled: true",
  "fieldMappingProposalsEnabled: true",
  "messageToEntryProposalsEnabled: true",
  "reviewBeforeWriteRequired: true",
  "phase19DEntryValidationRequired: true",
  "phase19GPrivacyValidationRequired: true",
  "proposalExpirationEnabled: true",
  "silentTrackerCreationAllowed: false",
  "silentTrackerEntryLoggingAllowed: false",
  "silentTrackerEditsAllowed: false",
  "silentMemoryWritesAllowed: false",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "databaseReadsEnabled: false",
  "databaseWritesEnabled: false",
  "carnosRuntimeWritesEnabled: false",
  "needs_review",
  "approved",
  "rejected",
  "expired",
  "phase19d_entry_validation_required",
  "phase19g_suggestion_permission_required",
  "memory_candidate_review_required",
  "approved proposal still requires separate user-approved persistence"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./carnos-proposals-review-queue\"");

for (const marker of [
  "Carnos-assisted tracker creation proposal contract",
  "Carnos-assisted tracker improvement proposal contract",
  "Carnos AI field-mapping proposal contract",
  "Carnos message-to-entry proposal contract",
  "Review-before-write queue contract",
  "AI proposal states: draft, needs_review, approved, rejected, expired",
  "Tracker proposal validation",
  "Entry proposal validation using Phase 19D",
  "Privacy permission validation using Phase 19G",
  "Proposal expiration boundary",
  "No silent Carnos tracker creation",
  "No silent Carnos tracker entry logging",
  "No silent Carnos tracker edits",
  "No silent memory writes",
  "No SQL schema migration is added in 19H",
  "No runtime database read or write is added in 19H"
]) includes("contract", contract, marker);

for (const marker of [
  "Tracker creation proposal contract exists",
  "Tracker improvement proposal contract exists",
  "Field-mapping proposal contract exists",
  "Message-to-entry proposal contract exists",
  "Review-before-write queue contract exists",
  "AI proposal states exist",
  "Tracker proposal validation exists",
  "Entry proposal validation boundary using Phase 19D exists",
  "Privacy permission validation boundary using Phase 19G exists",
  "Proposal expiration boundary exists",
  "No silent Carnos tracker creation boundary exists",
  "No silent Carnos tracker entry logging boundary exists",
  "No silent Carnos tracker edits boundary exists",
  "No silent memory writes boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19h",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19H adds deterministic local Carnos proposal contracts",
  "Carnos tracker creation proposals are represented",
  "Carnos tracker improvement proposals are represented",
  "Carnos field-mapping proposals are represented",
  "Carnos message-to-entry proposals are represented",
  "Review-before-write queue items always disable tracker, entry, memory, and silent writes",
  "Entry proposals require Phase 19D validation before write",
  "Privacy gates require Phase 19G Carnos permissions before review can proceed",
  "Proposal expiration blocks stale approvals",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "carnos_assisted_tracker_creation_proposal_contract",
  "carnos_assisted_tracker_improvement_proposal_contract",
  "carnos_ai_field_mapping_proposal_contract",
  "carnos_message_to_entry_proposal_contract",
  "review_before_write_queue_contract",
  "ai_proposal_states",
  "tracker_proposal_validation",
  "entry_proposal_validation_using_phase19d",
  "privacy_permission_validation_using_phase19g",
  "proposal_expiration_boundary",
  "no_silent_carnos_tracker_creation",
  "no_silent_carnos_tracker_entry_logging",
  "no_silent_carnos_tracker_edits",
  "no_silent_memory_writes"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19h");
includes("package.json", pkgText, "scripts/audit-phase-19h.mjs");

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
]) {
  excludes("implementation", implementation, marker);
}

console.log("✓ Phase 19H Carnos proposals review queue audit passed.");
