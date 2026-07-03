import { readFileSync, existsSync } from "node:fs";

function read(path) {
  return readFileSync(path, "utf8");
}

function fail(message) {
  console.error(`✗ Phase 17F audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function requireFile(path) {
  if (!existsSync(path)) fail(`Missing required file: ${path}`);
  pass(`Found ${path}`);
}

function requireIncludes(label, text, marker) {
  if (!text.includes(marker)) {
    fail(`${label} missing marker: ${marker}`);
  }
  pass(`${label} includes ${marker}`);
}

function requireExcludes(label, text, marker) {
  if (text.includes(marker)) {
    fail(`${label} includes forbidden marker: ${marker}`);
  }
  pass(`${label} excludes forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 17F APPROVED MEMORY REPOSITORY AUDIT ===");

const repositoryPath = "src/lib/repositories/approved-memory-write.ts";
const indexPath = "src/lib/repositories/index.ts";
const contractPath = "docs/contracts/PHASE_17F_APPROVED_MEMORY_REPOSITORY.md";
const reportPath = "docs/phase-reports/PHASE_17F_APPROVED_MEMORY_REPOSITORY_REPORT.md";
const checklistPath = "docs/qa/PHASE_17F_APPROVED_MEMORY_REPOSITORY_SMOKE_CHECKLIST.md";
const packagePath = "package.json";
const phase15aAuditPath = "scripts/audit-phase-15a.mjs";

[
  repositoryPath,
  indexPath,
  contractPath,
  reportPath,
  checklistPath,
  packagePath,
  phase15aAuditPath,
].forEach(requireFile);

const repository = read(repositoryPath);
const index = read(indexPath);
const contract = read(contractPath);
const report = read(reportPath);
const checklist = read(checklistPath);
const packageJson = read(packagePath);
const phase15aAudit = read(phase15aAuditPath);

[
  "Phase 17F — Approved Memory Repository + Approval Flow",
  "public.memory_items as the canonical approved-memory table",
  "approveMemoryCandidate",
  "createApprovedMemory",
  "listApprovedMemories",
  "getApprovedMemory",
  "updateApprovedMemory",
  "archiveApprovedMemory",
  "forgetApprovedMemory",
  "lockApprovedMemory",
  "getApprovedMemoryRepositoryBoundarySummary",
  "MEMORY_ITEMS_TABLE",
  "MEMORY_CANDIDATES_TABLE",
  "MEMORY_EVENTS_TABLE",
  '"memory_items"',
  '"memory_candidates"',
  '"memory_events"',
  "approved_memory_item_id",
  "candidate_approved",
  "memory_created",
  "memory_updated",
  "memory_archived",
  "memory_forgotten",
  "review_requested",
  "validateApprovedMemorySchemaAlignment",
  "user_id",
  "retrieval_enabled",
  "semantic_retrieval_allowed",
].forEach((marker) => requireIncludes("repository", repository, marker));

requireIncludes("repository index", index, 'export * from "./approved-memory-write";');

[
  "Phase 17F",
  "Approved Memory Repository + Approval Flow Contract",
  "`memory_candidates` remains the memory inbox table",
  "`memory_items` remains the approved-memory table",
  "`memory_events` records lifecycle audit events",
  "No automatic approval",
  "No hidden memory write",
  "No embedding generation",
  "No Carnos prompt/context injection",
  "No runtime retrieval",
  "No `memory_embedding_records` writes",
  "No `memory_retrieval_events` writes",
].forEach((marker) => requireIncludes("contract", contract, marker));

[
  "Phase 17F",
  "Approved Memory Repository Report",
  "Writes `memory_items`",
  "Updates `memory_candidates`",
  "Writes `memory_events`",
  "does not create embeddings",
  "does not retrieve memories",
].forEach((marker) => requireIncludes("report", report, marker));

[
  "Approved Memory Repository Smoke Checklist",
  "Repository can create approved memories",
  "Repository can approve memory candidates",
  "Repository writes `memory_items`",
  "Repository links `memory_candidates.approved_memory_item_id`",
  "Repository writes `memory_events`",
  "Repository does not write `memory_embedding_records`",
  "Repository does not write `memory_retrieval_events`",
  "`npm run audit:phase17f` passes",
  "`npm run check` passes",
].forEach((marker) => requireIncludes("checklist", checklist, marker));

[
  '"audit:phase17f"',
  "npm run audit:phase17e && npm run audit:phase17f",
].forEach((marker) => requireIncludes("package.json", packageJson, marker));

requireIncludes(
  "Phase 15A allowlist",
  phase15aAudit,
  "src/lib/repositories/approved-memory-write.ts",
);

[
  "memory_embedding_records",
  "memory_retrieval_events",
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
  "createProposedAction",
  "executeApprovedAction",
].forEach((marker) => requireExcludes("repository", repository, marker));

if (!repository.includes(".from(MEMORY_ITEMS_TABLE)")) {
  fail("repository must write/query memory_items through MEMORY_ITEMS_TABLE");
}
pass("repository uses MEMORY_ITEMS_TABLE");

if (!repository.includes(".from(MEMORY_CANDIDATES_TABLE)")) {
  fail("repository must read/update memory_candidates through MEMORY_CANDIDATES_TABLE");
}
pass("repository uses MEMORY_CANDIDATES_TABLE");

if (!repository.includes(".from(MEMORY_EVENTS_TABLE)")) {
  fail("repository must write memory_events through MEMORY_EVENTS_TABLE");
}
pass("repository uses MEMORY_EVENTS_TABLE");

if (!repository.includes('.eq("user_id", input.user_id)') && !repository.includes('.eq("user_id", userId)')) {
  fail("repository must scope reads/writes by user_id");
}
pass("repository scopes operations by user_id");

if (!repository.includes('status: "approved"')) {
  fail("approval flow must set approved status");
}
pass("approval flow sets approved status");

console.log("\n✓ Phase 17F Approved Memory Repository audit passed.");
