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

console.log("\n=== LOCAL CARNOS RUNTIME CHUNK LOCK AUDIT ===");

const contract = read("docs/contracts/LOCAL_CARNOS_RUNTIME_CHUNK_LOCK.md");
const plan = read("docs/roadmap/LOCAL_CARNOS_RUNTIME_BUILD_CHUNK_PLAN.md");
const checklist = read("docs/qa/LOCAL_CARNOS_RUNTIME_CHUNK_LOCK_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/LOCAL_CARNOS_RUNTIME_CHUNK_LOCK_REPORT.md");
const feature = read("docs/roadmap/PHASE_18_ANALYTICS_EXPERIMENTS_FEATURE_MAP.md");
const chunks = read("docs/roadmap/PHASE_18_ANALYTICS_EXPERIMENTS_BUILD_CHUNKS.md");
const pkg = read("package.json");

for (const marker of [
  "Local Carnos Runtime Chunk Lock",
  "18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter",
  "Option C — local AI server/runtime on MacBook Pro M3 Pro",
  "Ollama-compatible localhost runtime boundary",
  "MLX-compatible runtime",
  "llama.cpp-compatible runtime",
  "Tauri-managed local sidecar",
  "browser-only local AI is fallback only",
  "local Carnos runtime contract",
  "local runtime capability detector",
  "local model availability state",
  "offline AI mode router",
  "deterministic fallback mode",
  "no-crash fallback behavior",
  "no false claim that offline AI is active",
  "no remote-provider dependency while offline",
  "no required local runtime during CI/checks",
  "This lock does not implement the local runtime yet"
]) includes("contract", contract, marker);

for (const marker of [
  "Local Carnos Runtime Build Chunk Plan",
  "18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter",
  "local runtime contract",
  "local runtime adapter shape",
  "localhost runtime health check boundary",
  "local model availability detector",
  "local Carnos request type",
  "local Carnos response type",
  "offline AI capability state",
  "deterministic fallback state",
  "cached approved-memory input boundary",
  "cached analytics input boundary",
  "cached experiment context input boundary",
  "Local runtime must be optional",
  "The app must pass checks without local runtime installed"
]) includes("plan", plan, marker);

for (const marker of [
  "Local Carnos Runtime Chunk Lock Smoke Checklist",
  "18M-B is inserted into the Phase 18 build plan",
  "Option C local server/runtime is the primary target",
  "MacBook Pro M3 Pro target is preserved",
  "Ollama-compatible localhost boundary is preserved",
  "MLX-compatible future path is preserved",
  "llama.cpp-compatible future path is preserved",
  "Tauri-managed sidecar future path is preserved",
  "Browser-only local AI is fallback only",
  "Local runtime is optional",
  "Missing local runtime must not break the app",
  "Missing model must not break the app",
  "Deterministic offline fallback remains required",
  "No local model download is required during checks",
  "No false claim that full offline AI is implemented",
  "Package audit chain includes `audit:phase18b_b`"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Local Carnos Runtime Chunk Lock Report",
  "18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter",
  "Option C local server/runtime on MacBook Pro M3 Pro",
  "Ollama-compatible localhost boundary",
  "MLX/llama.cpp-compatible future paths",
  "Tauri-managed local sidecar future path",
  "deterministic offline fallback when runtime/model is missing",
  "no app breakage when local runtime is unavailable",
  "no false claim that full offline AI is implemented before runtime exists"
]) includes("report", report, marker);

for (const marker of [
  "Local Carnos Runtime Boundary",
  "Option C Offline AI Adapter",
  "Local model capability detection",
  "Deterministic offline fallback",
  "18M-B"
]) includes("feature map", feature, marker);

for (const marker of [
  "18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter",
  "local Carnos runtime contract",
  "Option C local server/runtime adapter boundary",
  "Ollama-compatible localhost boundary",
  "local runtime capability detector",
  "local model availability state",
  "offline AI mode router",
  "deterministic fallback mode",
  "cached approved-memory/context input boundary",
  "cached analytics snapshot input boundary",
  "cached experiment context input boundary",
  "offline Carnos capability labels",
  "no-crash fallback behavior",
  "no false claim that full offline AI is implemented unless local runtime/model exists"
]) includes("build chunks", chunks, marker);

includes("package.json", pkg, "\"audit:phase18b_b\"");
includes("package.json", pkg, "npm run audit:phase18b && npm run audit:phase18b_b");
includes("package.json", pkg, "npm run audit:phase18b_b && npm run build");

console.log("\n✓ Local Carnos runtime chunk lock audit passed.");
