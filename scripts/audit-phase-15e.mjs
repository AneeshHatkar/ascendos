import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

let failed = false;

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function requireFile(relPath) {
  if (exists(relPath)) {
    pass(`Found ${relPath}`);
  } else {
    fail(`Missing ${relPath}`);
  }
}

function requireIncludes(relPath, marker) {
  const text = read(relPath);
  if (text.includes(marker)) {
    pass(`${relPath} includes ${marker}`);
  } else {
    fail(`${relPath} missing ${marker}`);
  }
}

function requireAbsent(relPath, marker) {
  const text = read(relPath);
  if (!text.includes(marker)) {
    pass(`${relPath} avoids forbidden marker: ${marker}`);
  } else {
    fail(`${relPath} contains forbidden marker: ${marker}`);
  }
}

function requirePathAbsent(relPath) {
  if (!exists(relPath)) {
    pass(`Forbidden Phase 15E path absent: ${relPath}`);
  } else {
    fail(`Forbidden Phase 15E path exists: ${relPath}`);
  }
}

console.log("\n=== PHASE 15E MEMORY INBOX UI AUDIT ===");

const requiredFiles = [
  "src/components/dashboard/memory-inbox-preview-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_15E_MEMORY_INBOX_UI.md",
  "docs/phase-reports/PHASE_15E_MEMORY_INBOX_UI_REPORT.md",
  "docs/qa/PHASE_15E_MEMORY_INBOX_UI_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15e.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of requiredFiles) {
  requireFile(file);
}

const component = "src/components/dashboard/memory-inbox-preview-panel.tsx";

const requiredComponentMarkers = [
  "Phase 15E",
  "Memory Inbox UI",
  "MemoryInboxPreviewPanel",
  "MemoryCandidateEngineResult",
  "reviewable memory candidate previews",
  "candidate text",
  "memory type",
  "sensitivity",
  "provenance",
  "confidence",
  "priority",
  "duplicate hints",
  "conflict hints",
  "private-mode",
  "do-not-remember",
  "approve disabled",
  "edit disabled",
  "reject disabled",
  "archive disabled",
  "forget disabled",
  "mark sensitive disabled",
  "merge disabled",
  "resolve conflict disabled",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no Supabase calls",
  "no standalone /memory route",
  "no hidden Carnos prompt injection",
  "no automatic transcript-to-memory",
  "PHASE_15E_MEMORY_INBOX_UI_BOUNDARY",
  "Phase 15F — Privacy, Private Mode, Do-Not-Remember Rules",
];

for (const marker of requiredComponentMarkers) {
  requireIncludes(component, marker);
}

requireIncludes(
  "src/components/dashboard/index.ts",
  'export * from "./memory-inbox-preview-panel";',
);

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
  "createMemoryCandidatePreview(",
  "memory_items_insert",
  "executeApprovedAction(",
  "createProposedAction(",
];

for (const marker of forbiddenMarkers) {
  requireAbsent(component, marker);
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

for (const relPath of forbiddenPaths) {
  requirePathAbsent(relPath);
}

const migrations = fs
  .readdirSync(path.join(root, "supabase/migrations"))
  .filter((file) => file.includes("phase15") || file.includes("memory"));

const allowedMigrations = new Set([
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
  "0028_memory_rag_schema_alignment.sql",
]);

for (const file of migrations) {
  if (allowedMigrations.has(file)) {
    pass(`Allowed existing Phase 15 migration: ${file}`);
  } else {
    fail(`Unexpected Phase 15E SQL migration added: ${file}`);
  }
}

const docsToCheck = [
  "docs/contracts/PHASE_15E_MEMORY_INBOX_UI.md",
  "docs/phase-reports/PHASE_15E_MEMORY_INBOX_UI_REPORT.md",
  "docs/qa/PHASE_15E_MEMORY_INBOX_UI_SMOKE_CHECKLIST.md",
];

for (const file of docsToCheck) {
  for (const marker of [
    "Phase 15E",
    "Memory Inbox UI",
    "disabled",
    "no approval",
    "no persistence",
    "no retrieval",
    "no embeddings",
    "no provider calls",
    "no Supabase",
    "standalone `/memory` route",
    "Phase 15F",
  ]) {
    requireIncludes(file, marker);
  }
}

requireIncludes("package.json", "audit:phase15e");
requireIncludes("package.json", "npm run audit:phase15e");
requireIncludes("PROJECT_EXECUTION_LOG.md", "Phase 15E");
requireIncludes("PROJECT_EXECUTION_LOG.md", "Memory Inbox UI");
requireIncludes("CODE_LEDGER.md", "Phase 15E");
requireIncludes("CODE_LEDGER.md", "Memory Inbox UI");
requireIncludes("CHANGELOG.md", "Phase 15E");
requireIncludes("CHANGELOG.md", "Memory Inbox UI");
requireIncludes("PHASE_STATUS.md", "Phase 15E");
requireIncludes("PHASE_STATUS.md", "Memory Inbox UI");
requireIncludes("PHASE_STATUS.md", "Phase 15F");

if (failed) {
  console.error("\nPhase 15E Memory Inbox UI audit failed.");
  process.exit(1);
}

console.log("\nPhase 15E Memory Inbox UI audit passed.");
