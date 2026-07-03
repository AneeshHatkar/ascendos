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

console.log("\n=== PHASE 17L CARNOS MEMORY CONTEXT PACK BUILDER AUDIT ===");

const impl = read("src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER.md");
const report = read("docs/phase-reports/PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_REPORT.md");
const checklist = read("docs/qa/PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17L — Carnos Memory Context Pack Builder",
  "Carnos Memory Context Pack Builder",
  "CarnosMemoryContextPackInput",
  "CarnosMemoryContextPackItem",
  "CarnosMemoryContextPackSection",
  "CarnosMemoryContextPackBuilderResult",
  "PHASE_17L_CARNOS_MEMORY_CONTEXT_PACK_BUILDER_BOUNDARY",
  "buildCarnosMemoryContextPack",
  "summarizeCarnosMemoryContextPack",
  "getCarnosMemoryContextPackBuilderSummary",
  "carnos memory context pack",
  "context pack planning only",
  "preview-only context pack",
  "uses Phase 17I retrieval planning outputs",
  "uses Phase 17J knowledge bridge outputs",
  "uses Phase 17K source bridge outputs",
  "preserves visible retrieval reasons",
  "preserves visible bridge reasons",
  "budget-bounded context pack",
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
  "semantic_retrieval_active: false",
  "carnos_prompt_injection_enabled: false"
]) includes("implementation", impl, marker);

includes("index", index, "export * from \"./carnos-memory-context-pack-builder\";");

for (const marker of [
  "Phase 17L",
  "Carnos Memory Context Pack Builder",
  "carnos memory context pack",
  "context pack planning only",
  "preview-only context pack",
  "uses Phase 17I retrieval planning outputs",
  "uses Phase 17J knowledge bridge outputs",
  "uses Phase 17K source bridge outputs",
  "preserves visible retrieval reasons",
  "preserves visible bridge reasons",
  "budget-bounded context pack",
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
  "Phase 17L Carnos Memory Context Pack Builder Report",
  "Carnos memory context pack types",
  "context pack item construction",
  "context pack section grouping",
  "context pack budget enforcement",
  "Phase 17I retrieval plan consumption",
  "Phase 17J Knowledge Vault bridge consumption",
  "Phase 17K source bridge consumption",
  "no prompt injection boundary",
  "npm run audit:phase17l",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17L Carnos Memory Context Pack Builder Smoke Checklist",
  "buildCarnosMemoryContextPack",
  "Context pack consumes Phase 17I retrieval planning outputs",
  "Context pack consumes Phase 17J Knowledge Vault bridge outputs",
  "Context pack consumes Phase 17K source bridge outputs",
  "Context pack groups items into sections",
  "Context pack applies item budget",
  "No runtime retrieval occurs",
  "No memory_retrieval_events writes occur",
  "No embeddings are generated",
  "No provider calls occur",
  "No Carnos prompt/context injection occurs",
  "npm run audit:phase17l",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17l\"");
includes("package.json", pkg, "npm run audit:phase17k && npm run audit:phase17l");

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
if (/carnos_prompt_injection_enabled:\s*true/.test(impl)) fail("Carnos prompt injection was enabled");
pass("Carnos prompt injection remains disabled");

console.log("\n✓ Phase 17L Carnos Memory Context Pack Builder audit passed.");
