import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "src/lib/carnos-continuity/embedding-boundary.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/embedding-boundary-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/knowledge/page.tsx",
  "docs/contracts/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER.md",
  "docs/phase-reports/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER_REPORT.md",
  "docs/qa/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15n.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const sharedMarkers = [
  "Phase 15N",
  "Embedding Boundary / Noop Provider",
  "embedding boundary",
  "noop provider",
  "disabled by design",
  "no embeddings generated",
  "no provider calls",
  "no vector search",
  "no pgvector",
  "no SQL reads or writes",
  "no Supabase calls",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
  "Phase 15O",
];

const helperMarkers = [
  "EmbeddingBoundarySurface",
  "EmbeddingBoundaryDecision",
  "EmbeddingBoundaryBlockedReason",
  "EmbeddingBoundaryProviderKind",
  "EmbeddingBoundaryInput",
  "EmbeddingBoundaryPreviewRef",
  "EmbeddingBoundaryProviderResult",
  "EmbeddingBoundarySummary",
  "EmbeddingBoundaryResult",
  "PHASE_15N_EMBEDDING_BOUNDARY",
  "NOOP_EMBEDDING_PROVIDER_RESULT",
  "DEFAULT_EMBEDDING_BOUNDARY_INPUTS",
  "getEmbeddingBoundaryBlockedReasons",
  "getEmbeddingBoundaryDecision",
  "createEmbeddingBoundaryPreviewRef",
  "createNoopEmbeddingProviderResult",
  "createEmbeddingBoundaryPreview",
  "summarizeEmbeddingBoundary",
  "createDefaultEmbeddingBoundarySummary",
  "NoopEmbeddingProvider",
];

const forbiddenRuntimeMarkers = [
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
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "executeApprovedAction(",
  "createProposedAction(",
];

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

const allowedPhase15Migrations = new Set([
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
]);

let failed = false;

function read(path) {
  return readFileSync(path, "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function assertExists(path) {
  if (existsSync(path)) pass(`Found ${path}`);
  else fail(`Missing ${path}`);
}

function assertIncludes(path, marker) {
  const text = read(path);
  if (text.includes(marker)) pass(`${path} includes ${marker}`);
  else fail(`${path} missing ${marker}`);
}

function assertExcludes(path, marker) {
  const text = read(path);
  if (!text.includes(marker)) pass(`${path} avoids forbidden marker: ${marker}`);
  else fail(`${path} contains forbidden marker: ${marker}`);
}

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir);
  const output = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) output.push(...listFiles(full));
    else output.push(full);
  }
  return output;
}

console.log("\n=== PHASE 15N EMBEDDING BOUNDARY / NOOP PROVIDER AUDIT ===");

for (const file of requiredFiles) assertExists(file);

const helper = "src/lib/carnos-continuity/embedding-boundary.ts";
const panel = "src/components/dashboard/embedding-boundary-panel.tsx";
const contract = "docs/contracts/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER.md";
const report = "docs/phase-reports/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER_REPORT.md";
const qa = "docs/qa/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER_SMOKE_CHECKLIST.md";

for (const marker of sharedMarkers) {
  assertIncludes(helper, marker);
  assertIncludes(panel, marker);
  assertIncludes(contract, marker);
  assertIncludes(report, marker);
  assertIncludes(qa, marker);
}

for (const marker of helperMarkers) {
  assertIncludes(helper, marker);
}

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./embedding-boundary";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./embedding-boundary-panel";');
assertIncludes("src/app/knowledge/page.tsx", "EmbeddingBoundaryPanel");
assertIncludes("src/app/knowledge/page.tsx", "<EmbeddingBoundaryPanel />");
assertIncludes("src/app/knowledge/page.tsx", "RetrievalContractPanel");
assertIncludes("src/app/knowledge/page.tsx", "KnowledgeVaultFoundationPanel");

for (const marker of forbiddenRuntimeMarkers) {
  assertExcludes(helper, marker);
  assertExcludes(panel, marker);
}

for (const path of forbiddenPaths) {
  if (existsSync(path)) fail(`Forbidden Phase 15N path exists: ${path}`);
  else pass(`Forbidden Phase 15N path absent: ${path}`);
}

const migrations = readdirSync("supabase/migrations").filter((file) =>
  file.includes("phase15")
);
for (const migration of migrations) {
  if (allowedPhase15Migrations.has(migration)) {
    pass(`Allowed existing Phase 15 migration: ${migration}`);
  } else {
    fail(`Unexpected Phase 15N migration found: ${migration}`);
  }
}

assertIncludes("package.json", "audit:phase15n");
assertIncludes("package.json", "npm run audit:phase15n");

for (const log of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  assertIncludes(log, "Phase 15N");
  assertIncludes(log, "Embedding Boundary / Noop Provider");
}

assertIncludes("PHASE_STATUS.md", "Phase 15O");

for (const file of listFiles("src/lib/carnos-continuity")) {
  if (file.endsWith("embedding-boundary.ts")) continue;
  const content = read(file);
  if (content.includes("NoopEmbeddingProvider") && !file.endsWith("index.ts")) {
    fail(`Noop provider leaked into unrelated continuity file: ${file}`);
  }
}

if (failed) {
  console.error("\nPhase 15N audit failed.");
  process.exit(1);
}

console.log("\nPhase 15N Embedding Boundary / Noop Provider audit passed.");
