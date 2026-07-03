import fs from "node:fs";
import path from "node:path";

let failed = false;

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(process.cwd(), relativePath));
}

function requireFile(relativePath) {
  if (!exists(relativePath)) {
    fail(`Missing file: ${relativePath}`);
    return "";
  }

  pass(`Found ${relativePath}`);
  return read(relativePath);
}

function requireIncludes(label, text, markers) {
  for (const marker of markers) {
    if (!text.includes(marker)) {
      fail(`${label} missing marker: ${marker}`);
    } else {
      pass(`${label} includes ${marker}`);
    }
  }
}

function requireExcludes(label, text, markers) {
  for (const marker of markers) {
    if (text.includes(marker)) {
      fail(`${label} includes forbidden marker: ${marker}`);
    } else {
      pass(`${label} excludes forbidden marker: ${marker}`);
    }
  }
}

console.log("\n=== PHASE 17E MEMORY INBOX REPOSITORY AUDIT ===");

const repositoryPath = "src/lib/repositories/memory-inbox-write.ts";
const repositoryIndexPath = "src/lib/repositories/index.ts";
const contractPath = "docs/contracts/PHASE_17E_MEMORY_INBOX_REPOSITORY.md";
const reportPath = "docs/phase-reports/PHASE_17E_MEMORY_INBOX_REPOSITORY_REPORT.md";
const checklistPath = "docs/qa/PHASE_17E_MEMORY_INBOX_REPOSITORY_SMOKE_CHECKLIST.md";
const packagePath = "package.json";
const phase15aAuditPath = "scripts/audit-phase-15a.mjs";

const repository = requireFile(repositoryPath);
const repositoryIndex = requireFile(repositoryIndexPath);
const contract = requireFile(contractPath);
const report = requireFile(reportPath);
const checklist = requireFile(checklistPath);
const packageJson = requireFile(packagePath);
const phase15aAudit = requireFile(phase15aAuditPath);

requireIncludes("repository", repository, [
  "Phase 17E — Memory Inbox Repository",
  "public.memory_candidates as the memory inbox table",
  "createMemoryCandidate",
  "listMemoryCandidates",
  "getMemoryCandidate",
  "updateMemoryCandidate",
  "rejectMemoryCandidate",
  "archiveMemoryCandidate",
  "markMemoryCandidateSensitivity",
  "getMemoryInboxRepositoryBoundarySummary",
  "MEMORY_INBOX_TABLE",
  '"memory_candidates"',
  "user_id",
  "candidate_text",
  "status",
  "sensitivity",
  "priority",
  "confidence",
  "pending_review",
  "rejected",
  "archived",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
]);

requireIncludes("repository index", repositoryIndex, [
  'export * from "./memory-inbox-write";',
]);

requireIncludes("contract", contract, [
  "Phase 17E",
  "Memory Inbox Repository Contract",
  "Create memory candidate",
  "List memory candidates",
  "Reject memory candidate",
  "Archive memory candidate",
  "Mark memory candidate sensitivity",
  "`memory_candidates` remains the memory inbox table",
  "`memory_items` remains the approved-memory table and is not written in this step",
  "No automatic approval",
  "No hidden memory write",
  "No embedding generation",
  "No Carnos prompt/context injection",
]);

requireIncludes("report", report, [
  "Phase 17E",
  "Memory Inbox Repository Report",
  "candidate persistence",
  "memory_candidates",
  "does not write `memory_items`",
  "does not create embeddings",
  "does not retrieve memories",
]);

requireIncludes("checklist", checklist, [
  "Memory Inbox Repository Smoke Checklist",
  "Repository can create memory candidates",
  "Repository can list memory candidates",
  "Repository can reject candidates",
  "Repository can archive candidates",
  "Repository writes `memory_candidates`",
  "Repository does not write `memory_items`",
  "`npm run audit:phase17e` passes",
  "`npm run check` passes",
]);

requireIncludes("package.json", packageJson, [
  "audit:phase17e",
  "npm run audit:phase17d && npm run audit:phase17e",
]);

requireIncludes("Phase 15A allowlist", phase15aAudit, [
  "src/lib/repositories/memory-inbox-write.ts",
]);

requireExcludes("repository", repository, [
  '.from("memory_items")',
  ".from('memory_items')",
  'from("memory_items")',
  "memory_embedding_records",
  "memory_retrieval_events",
  "executeApprovedAction",
  "createProposedAction",
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
  "approved_memory_item_id:",
]);

if (!repository.includes(".insert(payload)")) {
  fail("repository should insert only the validated candidate payload");
} else {
  pass("repository inserts validated candidate payload");
}

if (!repository.includes(".eq(\"user_id\", userId)") && !repository.includes(".eq(\"user_id\", input.user_id)")) {
  fail("repository must scope queries by user_id");
} else {
  pass("repository scopes queries by user_id");
}

if (failed) {
  console.error("\nPhase 17E Memory Inbox Repository audit failed.");
  process.exit(1);
}

console.log("\n✓ Phase 17E Memory Inbox Repository audit passed.");
