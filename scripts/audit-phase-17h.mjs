import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/carnos-continuity/memory-embedding-provider-boundary.ts",
  "src/lib/carnos-continuity/index.ts",
  "docs/contracts/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY.md",
  "docs/phase-reports/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY_REPORT.md",
  "docs/qa/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY_SMOKE_CHECKLIST.md",
  "package.json",
];

const forbiddenRuntimeMarkers = [
  "createSupabaseServerClient",
  ".from(",
  "insert(",
  "update(",
  "delete(",
  "upsert(",
  "fetch(",
  "generateText",
  "streamText",
  "vector(",
  "embedding vector",
  "navigator.mediaDevices",
  "setInterval(",
  "setTimeout(",
  "speechSynthesis",
  "createProposedAction",
  "executeApprovedAction",
];

function fail(message) {
  console.error(`✗ Phase 17H audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function read(path) {
  if (!existsSync(path)) fail(`Missing required file: ${path}`);
  pass(`Found ${path}`);
  return readFileSync(path, "utf8");
}

function requireIncludes(label, text, markers) {
  for (const marker of markers) {
    if (!text.includes(marker)) fail(`${label} missing marker: ${marker}`);
    pass(`${label} includes ${marker}`);
  }
}

console.log("\n=== PHASE 17H EMBEDDING PROVIDER BOUNDARY AUDIT ===");

for (const file of requiredFiles) {
  read(file);
}

const boundary = read("src/lib/carnos-continuity/memory-embedding-provider-boundary.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY.md");
const report = read("docs/phase-reports/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY_REPORT.md");
const checklist = read("docs/qa/PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

requireIncludes("boundary", boundary, [
  "Phase 17H — Embedding Provider Boundary",
  "MemoryEmbeddingProviderBoundaryRequest",
  "MemoryEmbeddingProviderBoundaryEvaluation",
  "MemoryEmbeddingRecordPreview",
  "NoopMemoryEmbeddingProvider",
  "evaluateMemoryEmbeddingProviderBoundary",
  "createDeferredMemoryEmbeddingRecordPreview",
  "runNoopMemoryEmbeddingProvider",
  "summarizeMemoryEmbeddingProviderBoundary",
  "getMemoryEmbeddingProviderBoundarySummary",
  "PHASE_17H_EMBEDDING_PROVIDER_BOUNDARY",
  "No runtime retrieval",
  "No embedding generation",
  "No fake vectors",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background queue execution",
  "memory_embedding_records previews may describe deferred metadata only",
  "noop provider cannot return generated embeddings",
  "semantic retrieval remains deferred",
  "generated_embedding: false",
  "embedding_vector: null",
  "runtime_side_effects_enabled: false",
  "validateMemoryEmbeddingRecord",
]);

requireIncludes("index", index, [
  'export * from "./memory-embedding-provider-boundary";',
]);

requireIncludes("contract", contract, [
  "Phase 17H",
  "Embedding Provider Boundary",
  "NoopMemoryEmbeddingProvider",
  "memory_embedding_records previews may describe deferred metadata only",
  "noop provider cannot return generated embeddings",
  "semantic retrieval remains deferred",
  "No runtime retrieval",
  "No embedding generation",
  "No fake vectors",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background queue execution",
]);

requireIncludes("report", report, [
  "Phase 17H",
  "Embedding Provider Boundary Report",
  "NoopMemoryEmbeddingProvider",
  "deferred embedding record previews",
  "does not",
  "generate embeddings",
  "return fake vectors",
  "call providers",
  "run vector search",
  "retrieve memory",
  "npm run audit:phase17h",
  "npm run check",
]);

requireIncludes("checklist", checklist, [
  "Embedding Provider Boundary Smoke Checklist",
  "Boundary exposes `NoopMemoryEmbeddingProvider`",
  "Boundary evaluates embedding requests deterministically",
  "Boundary creates deferred embedding record previews",
  "Boundary blocks fake vectors",
  "Boundary blocks real provider behavior",
  "Boundary keeps semantic retrieval deferred",
  "Boundary does not call Supabase",
  "Boundary does not read or write SQL",
  "Boundary does not retrieve memory",
  "Boundary does not create embeddings",
  "Boundary does not run vector search",
  "Boundary does not inject Carnos context",
  "`npm run audit:phase17h` passes",
  "`npm run check` passes",
]);

requireIncludes("package.json", pkg, [
  '"audit:phase17h"',
  "npm run audit:phase17g && npm run audit:phase17h",
]);

for (const marker of forbiddenRuntimeMarkers) {
  if (boundary.includes(marker)) {
    fail(`boundary includes forbidden runtime marker: ${marker}`);
  }
  pass(`boundary excludes forbidden runtime marker: ${marker}`);
}

if (boundary.includes("provider_call_count: 1")) {
  fail("boundary must not increment provider_call_count");
}
pass("boundary never increments provider_call_count");

if (boundary.includes("generated_embedding: true")) {
  fail("boundary must not mark generated_embedding true");
}
pass("boundary never marks generated_embedding true");

if (boundary.includes("embedding_status: \"generated\"")) {
  fail("boundary must not create generated embedding status");
}
pass("boundary never creates generated embedding status");

if (!boundary.includes('provider: "noop"')) {
  fail("boundary must force deferred previews through noop provider");
}
pass("boundary forces deferred previews through noop provider");

console.log("\n✓ Phase 17H Embedding Provider Boundary audit passed.");
