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

console.log("\n=== PHASE 17M RETRIEVAL AUDIT TRAIL EXPLANATION AUDIT ===");

const impl = read("src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION.md");
const report = read("docs/phase-reports/PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_REPORT.md");
const checklist = read("docs/qa/PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17M — Retrieval Audit Trail + Retrieval Explanation",
  "Retrieval Audit Trail + Retrieval Explanation",
  "RetrievalAuditTrailEvent",
  "RetrievalExplanationSummary",
  "RetrievalAuditTrailPreviewResult",
  "PHASE_17M_RETRIEVAL_AUDIT_TRAIL_EXPLANATION_BOUNDARY",
  "buildRetrievalAuditTrailExplanation",
  "summarizeRetrievalAuditTrailExplanation",
  "getRetrievalAuditTrailExplanationSummary",
  "retrieval audit trail preview",
  "retrieval explanation preview",
  "visible retrieval explanations",
  "visible inclusion reasons",
  "visible exclusion reasons",
  "visible budget reasons",
  "visible dedupe reasons",
  "visible safety reasons",
  "uses Phase 17I retrieval planning outputs",
  "uses Phase 17L context pack outputs",
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
  "runtime_side_effects_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false",
  "carnos_prompt_injection_enabled: false"
]) includes("implementation", impl, marker);

includes("index", index, "export * from \"./retrieval-audit-trail-explanation\";");

for (const marker of [
  "Phase 17M",
  "Retrieval Audit Trail + Retrieval Explanation",
  "retrieval audit trail preview",
  "retrieval explanation preview",
  "visible retrieval explanations",
  "visible inclusion reasons",
  "visible exclusion reasons",
  "visible budget reasons",
  "visible dedupe reasons",
  "visible safety reasons",
  "uses Phase 17I retrieval planning outputs",
  "uses Phase 17L context pack outputs",
  "memory_retrieval_events persistence remains deferred",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
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
  "Phase 17M Retrieval Audit Trail + Retrieval Explanation Report",
  "retrieval audit trail event types",
  "retrieval explanation summary types",
  "included candidate explanation",
  "excluded candidate explanation",
  "budget explanation",
  "dedupe explanation",
  "sensitive/conflict safety explanation",
  "context pack section explanation",
  "context pack item explanation",
  "memory_retrieval_events write deferral marker",
  "npm run audit:phase17m",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17M Retrieval Audit Trail + Retrieval Explanation Smoke Checklist",
  "buildRetrievalAuditTrailExplanation",
  "Retrieval audit trail explains Phase 17I retrieval planning outputs",
  "Retrieval audit trail explains Phase 17L context pack outputs",
  "Included retrieval candidates receive visible explanation events",
  "Excluded retrieval candidates receive visible explanation events",
  "Budget reasons remain visible",
  "Dedupe reasons remain visible",
  "Sensitive/conflict safety reasons remain visible",
  "memory_retrieval_events persistence remains deferred",
  "No memory_retrieval_events writes occur",
  "No runtime retrieval occurs",
  "No Carnos prompt/context injection occurs",
  "npm run audit:phase17m",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17m\"");
includes("package.json", pkg, "npm run audit:phase17l && npm run audit:phase17m");

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

console.log("\n✓ Phase 17M Retrieval Audit Trail Explanation audit passed.");
