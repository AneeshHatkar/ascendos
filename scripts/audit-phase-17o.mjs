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

console.log("\n=== PHASE 17O CARNOS MEMORY INTEGRATION PANEL AUDIT ===");

const component = read("src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx");
const barrel = read("src/components/memory-rag/index.ts");
const contract = read("docs/contracts/PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL.md");
const report = read("docs/phase-reports/PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_REPORT.md");
const checklist = read("docs/qa/PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17O — Carnos Memory Integration Panel",
  "Carnos Memory Integration Panel",
  "CarnosMemoryIntegrationPanel",
  "CarnosMemoryIntegrationPanelProps",
  "CarnosMemoryIntegrationMode",
  "PHASE_17O_CARNOS_MEMORY_INTEGRATION_PANEL_BOUNDARY",
  "getCarnosMemoryIntegrationPanelBoundary",
  "carnos memory integration panel",
  "carnos allowed memory preview",
  "carnos blocked memory actions",
  "carnos memory boundary visibility",
  "carnos memory audit visibility",
  "carnos truthfulness guard visible",
  "memory context pack visible to user",
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
  "No autonomous memory use",
  "runtime_side_effects_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false",
  "carnos_prompt_injection_enabled: false"
]) includes("component", component, marker);

includes("barrel", barrel, "export * from \"./CarnosMemoryIntegrationPanel\";");

for (const marker of [
  "Phase 17O",
  "Carnos Memory Integration Panel",
  "carnos memory integration panel",
  "carnos allowed memory preview",
  "carnos blocked memory actions",
  "carnos memory boundary visibility",
  "carnos memory audit visibility",
  "carnos truthfulness guard visible",
  "memory context pack visible to user",
  "no hidden memory use",
  "no prompt injection",
  "no autonomous memory use",
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
  "No autonomous memory use"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 17O Carnos Memory Integration Panel Report",
  "Carnos memory integration panel",
  "allowed memory preview surface",
  "blocked memory action surface",
  "memory boundary visibility",
  "retrieval audit visibility",
  "truthfulness guard visibility",
  "visible memory context pack handoff surface",
  "no hidden memory use marker",
  "no prompt injection marker",
  "no autonomous memory use marker",
  "npm run audit:phase17o",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17O Carnos Memory Integration Panel Smoke Checklist",
  "CarnosMemoryIntegrationPanel",
  "Carnos allowed memory preview is visible",
  "Carnos blocked memory actions are visible",
  "Carnos memory boundary visibility is shown",
  "Carnos memory audit visibility is shown",
  "Carnos truthfulness guard is visible",
  "Memory context pack is visible to the user",
  "Prompt injection count stays zero",
  "No autonomous memory use is allowed",
  "No memory_retrieval_events writes occur",
  "No runtime retrieval occurs",
  "No Carnos prompt/context injection occurs",
  "No approve/reject/delete/forget mutations occur",
  "npm run audit:phase17o",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17o\"");
includes("package.json", pkg, "npm run audit:phase17n && npm run audit:phase17o");

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

console.log("\n✓ Phase 17O Carnos Memory Integration Panel audit passed.");
