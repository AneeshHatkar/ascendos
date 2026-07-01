import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function rel(path) {
  return join(root, path);
}

function read(path) {
  return readFileSync(rel(path), "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (condition) pass(message);
  else fail(message);
}

function assertExists(path) {
  assert(existsSync(rel(path)), `Found ${path}`);
}

function assertIncludes(path, marker) {
  const text = read(path);
  assert(text.includes(marker), `${path} includes ${marker}`);
}

function assertNotIncludes(path, marker) {
  const text = read(path);
  assert(!text.includes(marker), `${path} avoids forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15M RETRIEVAL CONTRACT + PROVENANCE + CONFLICT HANDLING AUDIT ===");

const requiredFiles = [
  "src/lib/carnos-continuity/retrieval-contract.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/retrieval-contract-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/knowledge/page.tsx",
  "docs/contracts/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING.md",
  "docs/phase-reports/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING_REPORT.md",
  "docs/qa/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15m.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of requiredFiles) assertExists(file);

const implementationFiles = [
  "src/lib/carnos-continuity/retrieval-contract.ts",
  "src/components/dashboard/retrieval-contract-panel.tsx",
];

const requiredMarkers = [
  "Phase 15M",
  "Retrieval Contract + Provenance + Conflict Handling",
  "retrieval contract",
  "provenance required",
  "conflict handling",
  "source authority",
  "visible source labels",
  "allowed retrieval surfaces",
  "blocked retrieval reasons",
  "memory retrieval remains preview-only",
  "knowledge retrieval remains preview-only",
  "no SQL reads or writes",
  "no Supabase calls",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone /memory",
  "Phase 15N",
];

for (const file of implementationFiles) {
  for (const marker of requiredMarkers) {
    assertIncludes(file, marker);
  }
}

const helperMarkers = [
  "RetrievalSurface",
  "RetrievalDecision",
  "RetrievalBlockedReason",
  "RetrievalProvenanceRequirement",
  "RetrievalContractBoundary",
  "RetrievalContractOptions",
  "RetrievalCandidateInput",
  "RetrievalContractPreviewRef",
  "RetrievalContractResult",
  "PHASE_15M_RETRIEVAL_CONTRACT_BOUNDARY",
  "RETRIEVAL_PROVENANCE_REQUIREMENTS",
  "createRetrievalContractPreview",
  "createRetrievalCandidateFromApprovedMemory",
  "createRetrievalCandidateFromKnowledgeItem",
  "createRetrievalCandidateFromContextRef",
  "compareRetrievalPreviewAuthority",
  "summarizeRetrievalContract",
  "createDefaultRetrievalContractSummary",
];

for (const marker of helperMarkers) {
  assertIncludes("src/lib/carnos-continuity/retrieval-contract.ts", marker);
}

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./retrieval-contract";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./retrieval-contract-panel";');
assertIncludes("src/app/knowledge/page.tsx", "RetrievalContractPanel");
assertIncludes("src/app/knowledge/page.tsx", "<RetrievalContractPanel />");
assertIncludes("src/app/knowledge/page.tsx", "KnowledgeVaultFoundationPanel");

const docs = [
  "docs/contracts/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING.md",
  "docs/phase-reports/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING_REPORT.md",
  "docs/qa/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING_SMOKE_CHECKLIST.md",
];

for (const doc of docs) {
  for (const marker of requiredMarkers) {
    assertIncludes(doc, marker);
  }
}

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  ".rpc(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "createServerClient",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "memory_items_insert",
  "executeApprovedAction(",
  "createProposedAction(",
];

for (const marker of forbiddenMarkers) {
  for (const file of implementationFiles) {
    assertNotIncludes(file, marker);
  }
}

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

for (const path of forbiddenPaths) {
  assert(!existsSync(rel(path)), `Forbidden Phase 15M path absent: ${path}`);
}

const migrationFiles = [
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
];

for (const file of migrationFiles) {
  assert(existsSync(rel(`supabase/migrations/${file}`)), `Allowed existing Phase 15 migration: ${file}`);
}

const packageText = read("package.json");
assert(packageText.includes('"audit:phase15m"'), "package.json includes audit:phase15m");
assert(packageText.includes("npm run audit:phase15m"), "package.json includes npm run audit:phase15m");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  assertIncludes(file, "Phase 15M");
  assertIncludes(file, "Retrieval Contract + Provenance + Conflict Handling");
}

assertIncludes("PHASE_STATUS.md", "Phase 15N");

if (process.exitCode) {
  console.error("\nPhase 15M audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15M Retrieval Contract + Provenance + Conflict Handling audit passed.");
