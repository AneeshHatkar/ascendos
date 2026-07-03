import { existsSync, readFileSync } from "node:fs";

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
  if (text.includes(marker)) fail(label + " contains forbidden marker: " + marker);
  pass(label + " excludes forbidden marker: " + marker);
}

console.log("\n=== PHASE 18M-B LOCAL CARNOS RUNTIME BOUNDARY AUDIT ===");

const implementation = read("src/lib/analytics-experiments/local-carnos-runtime-boundary.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.md");
const checklist = read("docs/qa/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18m_b_local_carnos_runtime_boundary_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18M-B") fail("fixture phase is not 18M-B");
pass("fixture phase is 18M-B");

for (const marker of [
  "LocalCarnosRuntimeMode",
  "LocalCarnosRuntimeAdapterKind",
  "LocalCarnosRuntimeReadiness",
  "LocalCarnosOfflineDisclosure",
  "LocalCarnosRuntimeCapabilityFlags",
  "LocalCarnosAnalyticsAdapterRequest",
  "LocalCarnosAnalyticsAdapterResponse",
  "LocalCarnosRuntimeBoundarySummary",
  "PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY",
  "PHASE_18M_B_LOCAL_CARNOS_RUNTIME_MODES",
  "PHASE_18M_B_LOCAL_CARNOS_ADAPTER_KINDS",
  "PHASE_18M_B_LOCAL_CARNOS_READINESS_STATES",
  "PHASE_18M_B_LOCAL_CARNOS_DISCLOSURES",
  "buildLocalCarnosRuntimeCapabilityFlags",
  "buildLocalCarnosAnalyticsAdapterResponse",
  "collectLocalCarnosOfflineDisclosures",
  "summarizeLocalCarnosRuntimeBoundary",
  "canCallNetwork: false",
  "canCallModelDuringCheck: false",
  "canStreamModelOutput: false",
  "canCreateEmbeddings: false",
  "canSearchVectors: false",
  "canWriteMemory: false",
  "canExecuteAction: false",
  "canClaimCurrentInfo: false",
  "canClaimOnlineSourceOfTruth: false"
]) includes("implementation", implementation, marker);

for (const marker of [
  "disabled",
  "unavailable",
  "deterministic_fallback",
  "local_runtime_ready",
  "future_sidecar_ready",
  "none",
  "deterministic_adapter",
  "localhost_compatible_future",
  "mlx_compatible_future",
  "llama_cpp_compatible_future",
  "tauri_sidecar_future",
  "not_required",
  "not_configured",
  "available_for_future_use",
  "blocked_by_policy",
  "disabled_for_ci",
  "offline_runtime_not_required",
  "offline_runtime_unavailable",
  "deterministic_fallback_used",
  "cached_context_must_be_disclosed",
  "unsynced_context_must_be_disclosed",
  "local_context_is_not_online_source_of_truth",
  "current_info_unavailable_offline",
  "memory_write_disabled",
  "action_execution_disabled"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "local Carnos runtime boundary",
  "offline AI adapter contract",
  "optional local runtime mode",
  "runtime unavailable mode",
  "runtime disabled mode",
  "deterministic fallback mode",
  "analytics explanation adapter request contract",
  "analytics explanation adapter response contract",
  "safe local-runtime capability flags",
  "model-not-required CI boundary",
  "no model install requirement",
  "no runtime health call",
  "no network call",
  "no model generation call",
  "no streaming call",
  "no embedding call",
  "no vector search",
  "no memory writes",
  "no action execution",
  "no Supabase calls",
  "no schema writes",
  "no fake analytics data",
  "no fake experiment conclusions",
  "Option C local AI server/runtime boundary",
  "future localhost-compatible runtime path",
  "future MLX-compatible runtime path",
  "future llama.cpp-compatible runtime path",
  "future Tauri sidecar-compatible runtime path",
  "browser-only fallback is limited",
  "offline companion can use deterministic guidance when runtime unavailable",
  "cached context disclosure remains required",
  "unsynced context disclosure remains required",
  "deterministic preview disclosure remains required",
  "local/offline context is not online source of truth",
  "Carnos must not pretend offline output is live/current info",
  "Carnos must not claim sync completed from unsynced context",
  "local runtime remains optional during CI/build/checks",
  "review-before-memory-write remains preserved",
  "action execution remains disabled",
  "Phase 18M integration",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no network calls",
  "no model calls",
  "no streaming",
  "no embedding calls",
  "no vector search",
  "no runtime install requirement",
  "no runtime health call",
  "no local Carnos runtime requirement during checks"
]) includes("contract", contract, marker);

for (const marker of [
  "Local Carnos runtime boundary implementation exists",
  "Offline AI adapter contract exists",
  "Optional local runtime mode exists",
  "Runtime unavailable mode exists",
  "Runtime disabled mode exists",
  "Deterministic fallback mode exists",
  "Request contract exists",
  "Response contract exists",
  "Capability flags exist",
  "Model-not-required CI boundary exists",
  "No model install requirement exists",
  "No runtime health call exists",
  "No network call boundary exists",
  "No model generation call boundary exists",
  "No streaming call boundary exists",
  "No embedding call boundary exists",
  "No vector search boundary exists",
  "Option C local AI server/runtime boundary exists",
  "Future localhost-compatible runtime path exists",
  "Future MLX-compatible runtime path exists",
  "Future llama.cpp-compatible runtime path exists",
  "Future Tauri sidecar-compatible runtime path exists",
  "Browser-only fallback limitation exists",
  "Cached context disclosure exists",
  "Unsynced context disclosure exists",
  "Deterministic preview disclosure exists",
  "Current info unavailable offline boundary exists",
  "Review-before-memory-write remains preserved",
  "Action execution remains disabled",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No model calls are added",
  "No fake analytics data is added",
  "No fake experiment conclusions are added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18m_b",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18M-B Local Carnos Runtime Boundary Report",
  "optional local Carnos runtime boundary and offline AI adapter contract",
  "local Carnos runtime boundary exists",
  "offline AI adapter contract exists",
  "optional local runtime mode exists",
  "runtime unavailable mode exists",
  "runtime disabled mode exists",
  "deterministic fallback mode exists",
  "request and response contracts exist",
  "capability flags exist",
  "model-not-required CI boundary exists",
  "no model install requirement exists",
  "no runtime health call exists",
  "no network/model/streaming/embedding/vector calls exist",
  "Option C local AI server/runtime boundary exists",
  "future localhost-compatible runtime path exists",
  "future MLX-compatible runtime path exists",
  "future llama.cpp-compatible runtime path exists",
  "future Tauri sidecar-compatible runtime path exists",
  "browser-only fallback limitation exists",
  "offline disclosures exist",
  "review-before-memory-write remains preserved",
  "action execution remains disabled",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No network calls occur",
  "No model calls occur",
  "No streaming calls occur",
  "No embedding calls occur",
  "No vector search occurs",
  "No runtime install is required",
  "No runtime health call occurs",
  "No fake analytics data is added",
  "No fake experiment conclusions are added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./local-carnos-runtime-boundary\"");
includes("package.json", pkg, "\"audit:phase18m_b\"");
includes("package.json", pkg, "npm run audit:phase18m && npm run audit:phase18m_b");
includes("package.json", pkg, "npm run audit:phase18m_b && npm run build");

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
]) {
  excludes("implementation", implementation, marker);
}

console.log("\n✓ Phase 18M-B local Carnos runtime boundary audit passed.");
