import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "src/lib/carnos-continuity/memory-provenance-confidence-conflict-engine.ts",
  "src/lib/carnos-continuity/index.ts",
  "docs/contracts/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE.md",
  "docs/phase-reports/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE_REPORT.md",
  "docs/qa/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE_SMOKE_CHECKLIST.md",
  "package.json",
];

const enginePath = "src/lib/carnos-continuity/memory-provenance-confidence-conflict-engine.ts";
const indexPath = "src/lib/carnos-continuity/index.ts";
const contractPath = "docs/contracts/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE.md";
const reportPath = "docs/phase-reports/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE_REPORT.md";
const checklistPath = "docs/qa/PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_ENGINE_SMOKE_CHECKLIST.md";
const packagePath = "package.json";

function fail(message) {
  console.error(`✗ Phase 17G audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function requireIncludes(label, text, markers) {
  for (const marker of markers) {
    if (!text.includes(marker)) {
      fail(`${label} missing marker: ${marker}`);
    }
    pass(`${label} includes ${marker}`);
  }
}

console.log("\n=== PHASE 17G PROVENANCE CONFIDENCE CONFLICT ENGINE AUDIT ===");

for (const file of requiredFiles) {
  if (!existsSync(file)) fail(`Missing required file: ${file}`);
  pass(`Found ${file}`);
}

const engine = read(enginePath);
const index = read(indexPath);
const contract = read(contractPath);
const report = read(reportPath);
const checklist = read(checklistPath);
const pkg = read(packagePath);

requireIncludes("engine", engine, [
  "Phase 17G — Provenance + Confidence + Conflict Engine",
  "scoreMemoryTrust",
  "assessMemoryConflict",
  "buildConflictKey",
  "createMemoryConflictGroupPreview",
  "summarizeMemoryProvenanceConfidenceConflicts",
  "getMemoryProvenanceConfidenceConflictBoundarySummary",
  "PHASE_17G_PROVENANCE_CONFIDENCE_CONFLICT_BOUNDARY",
  "source_authority_score",
  "confidence_score",
  "evidence_score",
  "reliability_score",
  "freshness_score",
  "sensitivity_penalty",
  "conflict_penalty",
  "review_penalty",
  "needs_user_review",
  "superseded",
  "blocked",
  "No Supabase calls",
  "No runtime retrieval",
  "No embeddings",
  "No provider calls",
  "No Carnos prompt/context injection",
]);

requireIncludes("index", index, [
  'export * from "./memory-provenance-confidence-conflict-engine";',
]);

requireIncludes("contract", contract, [
  "Phase 17G",
  "Provenance + Confidence + Conflict Engine",
  "source authority",
  "confidence",
  "evidence strength",
  "source reliability",
  "freshness",
  "sensitivity",
  "conflict metadata",
  "review metadata",
  "No runtime retrieval",
  "No embedding generation",
  "No Carnos prompt/context injection",
  "silent conflict resolution",
]);

requireIncludes("report", report, [
  "Phase 17G",
  "Provenance + Confidence + Conflict Engine Report",
  "trust scoring",
  "pairwise conflict assessment",
  "conflict group preview",
  "does not",
  "npm run audit:phase17g",
  "npm run check",
]);

requireIncludes("checklist", checklist, [
  "Provenance + Confidence + Conflict Engine Smoke Checklist",
  "Engine scores memory trust deterministically",
  "Engine uses source authority",
  "Engine uses confidence",
  "Engine uses evidence strength",
  "Engine uses source reliability",
  "Engine creates conflict group previews",
  "Ambiguous conflicts require user review",
  "Engine does not call Supabase",
  "Engine does not retrieve memory",
  "Engine does not create embeddings",
  "Engine does not call providers",
  "Engine does not inject Carnos context",
]);

requireIncludes("package.json", pkg, [
  '"audit:phase17g"',
  "npm run audit:phase17f && npm run audit:phase17g",
]);

const forbiddenRuntimeMarkers = [
  "createSupabaseServerClient",
  ".from(",
  "insert(",
  "update(",
  "delete(",
  "upsert(",
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
];

for (const marker of forbiddenRuntimeMarkers) {
  if (engine.includes(marker)) {
    fail(`engine includes forbidden runtime marker: ${marker}`);
  }
  pass(`engine excludes forbidden runtime marker: ${marker}`);
}

if (!engine.includes("compareMemoryAuthority")) {
  fail("engine must reuse existing memory conflict authority rules");
}
pass("engine reuses existing memory conflict authority rules");

if (!engine.includes("runtime_side_effects_enabled: false")) {
  fail("engine must expose runtime_side_effects_enabled: false");
}
pass("engine exposes runtime_side_effects_enabled false");

console.log("\n✓ Phase 17G Provenance Confidence Conflict Engine audit passed.");
