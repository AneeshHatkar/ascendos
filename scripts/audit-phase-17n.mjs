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

console.log("\n=== PHASE 17N MEMORY/RAG UI AUDIT ===");

const component = read("src/components/memory-rag/MemoryRagPreviewPanel.tsx");
const barrel = read("src/components/memory-rag/index.ts");
const contract = read("docs/contracts/PHASE_17N_MEMORY_RAG_UI.md");
const report = read("docs/phase-reports/PHASE_17N_MEMORY_RAG_UI_REPORT.md");
const checklist = read("docs/qa/PHASE_17N_MEMORY_RAG_UI_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17N — Memory/RAG UI",
  "Memory/RAG UI",
  "MemoryRagPreviewPanel",
  "MemoryRagPreviewPanelProps",
  "MemoryRagPreviewPanelMode",
  "PHASE_17N_MEMORY_RAG_UI_BOUNDARY",
  "getMemoryRagPreviewPanelBoundary",
  "memory rag preview panel",
  "context pack preview UI",
  "retrieval audit trail preview UI",
  "retrieval explanation preview UI",
  "visible memory boundaries",
  "visible retrieval reasons",
  "visible audit reasons",
  "visible no-runtime state",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
  "No approve/reject/delete/forget mutations",
  "runtime_side_effects_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false",
  "carnos_prompt_injection_enabled: false"
]) includes("component", component, marker);

includes("barrel", barrel, "export * from \"./MemoryRagPreviewPanel\";");

for (const marker of [
  "Phase 17N",
  "Memory/RAG UI",
  "memory rag preview panel",
  "context pack preview UI",
  "retrieval audit trail preview UI",
  "retrieval explanation preview UI",
  "visible memory boundaries",
  "visible retrieval reasons",
  "visible audit reasons",
  "visible no-runtime state",
  "disabled approve/reject/delete/forget actions",
  "loading state",
  "empty state",
  "error state",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
  "No approve/reject/delete/forget mutations"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 17N Memory/RAG UI Report",
  "Memory/RAG preview panel",
  "context pack preview UI",
  "retrieval audit trail preview UI",
  "visible memory boundary badges",
  "disabled write-action list",
  "loading state",
  "empty state",
  "error state",
  "npm run audit:phase17n",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17N Memory/RAG UI Smoke Checklist",
  "MemoryRagPreviewPanel",
  "Context pack preview UI renders sections and items",
  "Retrieval audit trail preview UI renders audit events",
  "Visible memory boundaries are shown",
  "Disabled approve/reject/delete/forget actions are shown",
  "No memory_retrieval_events writes occur",
  "No runtime retrieval occurs",
  "No Carnos prompt/context injection occurs",
  "No approve/reject/delete/forget mutations occur",
  "npm run audit:phase17n",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17n\"");
includes("package.json", pkg, "npm run audit:phase17m && npm run audit:phase17n");

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
]) excludes("component", component, marker);

if (/semantic_retrieval_active:\s*true/.test(component)) fail("semantic retrieval was activated");
pass("semantic retrieval remains disabled");
if (/runtime_side_effects_enabled:\s*true/.test(component)) fail("runtime side effects were enabled");
pass("runtime side effects remain disabled");
if (/carnos_prompt_injection_enabled:\s*true/.test(component)) fail("Carnos prompt injection was enabled");
pass("Carnos prompt injection remains disabled");

console.log("\n✓ Phase 17N Memory/RAG UI audit passed.");
