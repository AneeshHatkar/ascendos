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

console.log("\n=== PHASE 17P PRIVACY SENSITIVE FORGET DELETE READINESS AUDIT ===");

const impl = read("src/lib/carnos-continuity/privacy-sensitive-forget-readiness.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS.md");
const report = read("docs/phase-reports/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_REPORT.md");
const checklist = read("docs/qa/PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17P — Privacy, Sensitive Lock, Forget/Delete Readiness",
  "Privacy, Sensitive Lock, Forget/Delete Readiness",
  "MemoryPrivacyRecordPreview",
  "MemoryPrivacyReadinessOptions",
  "MemoryPrivacyReadinessResult",
  "MemoryPrivacyReadinessBatchResult",
  "PHASE_17P_PRIVACY_SENSITIVE_FORGET_DELETE_READINESS_BOUNDARY",
  "evaluateMemoryPrivacyReadiness",
  "evaluateMemoryPrivacyReadinessBatch",
  "getPrivacySensitiveForgetDeleteReadinessSummary",
  "privacy sensitive forget delete readiness",
  "sensitive lock enforcement preview",
  "forget/delete readiness preview",
  "delete execution deferred",
  "forget execution deferred",
  "schema check required before write-enabled implementation",
  "repository required before write-enabled implementation",
  "visible privacy reasons",
  "visible sensitive lock reasons",
  "visible forget/delete reasons",
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
  "No actual approve/reject/archive/forget/delete mutations",
  "runtime_side_effects_enabled: false",
  "mutation_execution_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false",
  "carnos_prompt_injection_enabled: false"
]) includes("implementation", impl, marker);

includes("index", index, "export * from \"./privacy-sensitive-forget-readiness\";");

for (const marker of [
  "Phase 17P",
  "Privacy, Sensitive Lock, Forget/Delete Readiness",
  "privacy sensitive forget delete readiness",
  "sensitive lock enforcement preview",
  "forget/delete readiness preview",
  "delete execution deferred",
  "forget execution deferred",
  "schema check required before write-enabled implementation",
  "repository required before write-enabled implementation",
  "visible privacy reasons",
  "visible sensitive lock reasons",
  "visible forget/delete reasons",
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
  "No actual approve/reject/archive/forget/delete mutations"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 17P Privacy, Sensitive Lock, Forget/Delete Readiness Report",
  "privacy readiness contract",
  "sensitive lock enforcement preview",
  "forget/delete readiness preview",
  "confirmation requirement detection",
  "schema-check requirement marker",
  "repository requirement marker",
  "blocked rejected/forgotten/deleted-preview memory",
  "blocked sensitive/locked memory",
  "deferred write-like action execution",
  "npm run audit:phase17p",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17P Privacy, Sensitive Lock, Forget/Delete Readiness Smoke Checklist",
  "evaluateMemoryPrivacyReadiness",
  "Sensitive lock enforcement preview blocks high/restricted memory by default",
  "Forget/delete readiness remains deferred",
  "Schema check is required before write-enabled implementation",
  "Repository implementation is required before write-enabled implementation",
  "Visible privacy reasons are returned",
  "Visible sensitive lock reasons are returned",
  "Visible forget/delete reasons are returned",
  "No memory_retrieval_events writes occur",
  "No runtime retrieval occurs",
  "No Carnos prompt/context injection occurs",
  "No actual approve/reject/archive/forget/delete mutations occur",
  "npm run audit:phase17p",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17p\"");
includes("package.json", pkg, "npm run audit:phase17o && npm run audit:phase17p");

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
if (/mutation_execution_enabled:\s*true/.test(impl)) fail("mutation execution was enabled");
pass("mutation execution remains disabled");
if (/carnos_prompt_injection_enabled:\s*true/.test(impl)) fail("Carnos prompt injection was enabled");
pass("Carnos prompt injection remains disabled");

console.log("\n✓ Phase 17P Privacy Sensitive Forget Delete Readiness audit passed.");
