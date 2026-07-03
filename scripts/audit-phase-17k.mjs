import { readFileSync, existsSync } from "node:fs";

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
  if (text.includes(marker)) fail(label + " includes forbidden runtime marker: " + marker);
  pass(label + " excludes forbidden runtime marker: " + marker);
}

console.log("\n=== PHASE 17K SOURCE BRIDGES AUDIT ===");

const impl = read("src/lib/carnos-continuity/source-bridge-retrieval-preview.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17K_SOURCE_BRIDGES.md");
const report = read("docs/phase-reports/PHASE_17K_SOURCE_BRIDGES_REPORT.md");
const checklist = read("docs/qa/PHASE_17K_SOURCE_BRIDGES_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17K — Current-Info / Document / Career / Research Source Bridges",
  "Current-Info / Document / Career / Research Source Bridges",
  "SourceBridgeRecord",
  "SourceBridgeCandidatePreview",
  "SourceBridgeRetrievalPreviewResult",
  "PHASE_17K_SOURCE_BRIDGES_BOUNDARY",
  "bridgeSourceRecordToRetrievalCandidate",
  "bridgeSourceRecordsToRetrievalCandidates",
  "buildSourceBridgeRetrievalPreview",
  "buildCurrentInfoSourceBridgePreview",
  "buildDocumentSourceBridgePreview",
  "buildCareerSourceBridgePreview",
  "buildResearchSourceBridgePreview",
  "summarizeSourceBridgeRetrievalPreview",
  "getSourceBridgeRetrievalPreviewSummary",
  "current-info source bridge",
  "document source bridge",
  "career source bridge",
  "research source bridge",
  "source records to retrieval candidates",
  "uses Phase 17I retrieval planning",
  "bridged source candidates remain preview-only",
  "visible bridge reasons",
  "planMemoryRetrievalRankingBudgetDedupe",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
  "runtime_side_effects_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false"
]) includes("implementation", impl, marker);

includes("index", index, "export * from \"./source-bridge-retrieval-preview\";");

for (const marker of [
  "Phase 17K",
  "Current-Info / Document / Career / Research Source Bridges",
  "current-info source bridge",
  "document source bridge",
  "career source bridge",
  "research source bridge",
  "source records to retrieval candidates",
  "uses Phase 17I retrieval planning",
  "bridged source candidates remain preview-only",
  "visible bridge reasons",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 17K Source Bridges Report",
  "Current Info source bridge",
  "Document source bridge",
  "Career source bridge",
  "Research source bridge",
  "source record eligibility rules",
  "conversion into Phase 17I retrieval candidates",
  "Phase 17I retrieval planning reuse",
  "source-family summaries",
  "npm run audit:phase17k",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17K Source Bridges Smoke Checklist",
  "bridgeSourceRecordToRetrievalCandidate",
  "buildSourceBridgeRetrievalPreview",
  "buildCurrentInfoSourceBridgePreview",
  "buildDocumentSourceBridgePreview",
  "buildCareerSourceBridgePreview",
  "buildResearchSourceBridgePreview",
  "Inactive source records are excluded by default",
  "Private source records are excluded by default",
  "Bridged source candidates remain preview-only",
  "No runtime retrieval occurs",
  "No memory_retrieval_events writes occur",
  "No embeddings are generated",
  "No provider calls occur",
  "npm run audit:phase17k",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17k\"");
includes("package.json", pkg, "npm run audit:phase17j && npm run audit:phase17k");

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
  "createProposedAction",
  "executeApprovedAction"
]) excludes("implementation", impl, marker);

if (/semantic_retrieval_active:\s*true/.test(impl)) fail("semantic retrieval was activated");
pass("semantic retrieval remains disabled");
if (/runtime_side_effects_enabled:\s*true/.test(impl)) fail("runtime side effects were enabled");
pass("runtime side effects remain disabled");

console.log("\n✓ Phase 17K Source Bridges audit passed.");
