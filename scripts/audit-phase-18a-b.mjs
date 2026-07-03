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

console.log("\n=== PHASE 18A-B COMPANION PERSISTENCE + OFFLINE AI READINESS AUDIT ===");

const contract = read("docs/contracts/PHASE_18A_B_COMPANION_PERSISTENCE_OFFLINE_AI_READINESS.md");
const architecture = read("docs/roadmap/COMPANION_PERSISTENCE_OFFLINE_LEVEL4_ARCHITECTURE.md");
const proof = read("docs/audits/CARNOS_PERSISTENCE_PROOF_REPORT.md");
const checklist = read("docs/qa/PHASE_18A_B_COMPANION_PERSISTENCE_OFFLINE_AI_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18A_B_COMPANION_PERSISTENCE_OFFLINE_AI_REPORT.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 18A-B — Companion Persistence Proof Audit + Level 4 Offline AI Readiness Lock",
  "Carnos must not be a one-chat companion",
  "Supabase/Postgres is the online source of truth",
  "IndexedDB or equivalent local encrypted cache",
  "Browser localStorage is not allowed for core life data",
  "Offline writes must enter a sync queue",
  "Conflicts must be detected before overwrite",
  "Duplicates must be detected before creating remote records",
  "Sensitive and restricted data require stricter offline cache rules",
  "Level 1 — Offline read-only companion",
  "Level 2 — Offline capture companion",
  "Level 3 — Offline deterministic guidance",
  "Level 4 — Full Offline AI Companion",
  "Option C — local AI server/runtime on the Mac",
  "MacBook Pro M3 Pro",
  "Ollama-compatible localhost API",
  "MLX-compatible",
  "llama.cpp-compatible",
  "local embeddings",
  "local retrieval/index layer",
  "Tauri desktop wrapper",
  "browser-only local AI, is fallback only",
  "Phase 18B through Phase 18O must respect this lock",
  "Phase 20 Privacy/Export",
  "Phase 21 v1 Polish",
  "does not claim that full Level 4 runtime is implemented"
]) includes("contract", contract, marker);

for (const marker of [
  "Companion Persistence + Level 4 Offline AI Architecture",
  "Online:",
  "Offline:",
  "Back online:",
  "Supabase/Postgres",
  "IndexedDB or equivalent encrypted local cache",
  "Sync queue",
  "Carnos context pack",
  "Approved memory cache",
  "Analytics snapshot cache",
  "Local AI server/runtime",
  "Option C — local server/runtime on MacBook Pro M3 Pro",
  "Ollama-style request/response",
  "MLX-compatible runtime",
  "llama.cpp-compatible runtime",
  "Tauri-managed local sidecar",
  "local embedding model",
  "local retrieval/index store",
  "18A-B",
  "18B",
  "18C",
  "18D",
  "18E",
  "18F",
  "18G",
  "18H",
  "18I",
  "18J",
  "18K",
  "18L",
  "18M",
  "18N",
  "18O",
  "Phase 20",
  "Phase 21"
]) includes("architecture", architecture, marker);

for (const marker of [
  "Carnos Persistence Proof Report",
  "Carnos must not be designed as a one-chat/session-only assistant",
  "Supabase/Postgres is the online source of truth",
  "memory candidates",
  "approved memory repository",
  "memory/RAG schema foundation",
  "Carnos memory context pack builder",
  "privacy/sensitive/forget readiness",
  "Offline continuity must use IndexedDB or equivalent encrypted local cache",
  "Core life data must not be localStorage-only",
  "Level 4 full offline Carnos is a required advanced readiness target",
  "Option C",
  "Ollama-compatible localhost boundary",
  "MLX-compatible",
  "llama.cpp-compatible",
  "Tauri wrapper",
  "must not claim full offline AI is implemented unless"
]) includes("proof", proof, marker);

for (const marker of [
  "Phase 18A-B Companion Persistence + Offline AI Readiness Smoke Checklist",
  "Carnos one-chat-only behavior is rejected",
  "Close/reopen continuity is required",
  "Login-to-login continuity is required",
  "Supabase/Postgres source-of-truth is documented",
  "IndexedDB or equivalent encrypted local cache is documented",
  "Browser localStorage core-data ban is documented",
  "Offline sync queue is required",
  "Conflict detection is required",
  "Duplicate prevention is required",
  "Level 4 full offline AI companion is documented",
  "Option C local AI server/runtime is selected for MacBook Pro M3 Pro",
  "Ollama-compatible localhost boundary is documented",
  "MLX/llama.cpp-compatible future runtime paths are documented",
  "Local embeddings readiness is documented",
  "Local retrieval/index readiness is documented",
  "Future Tauri packaging path is documented",
  "Full Level 4 runtime is not falsely claimed as implemented",
  "npm run audit:phase18a_b",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18A-B Companion Persistence Proof Audit + Level 4 Offline AI Readiness Report",
  "Carnos must not be one-chat-only",
  "Supabase/Postgres remains the online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "Browser localStorage is banned for core life data",
  "Offline writes must use a sync queue",
  "Level 4 Full Offline AI Companion is a required advanced readiness target",
  "Option C local server/runtime is the primary Level 4 path for MacBook Pro M3 Pro",
  "Option B Tauri wrapper is future packaging path",
  "Option A browser-only local AI is fallback only",
  "npm run audit:phase18a_b",
  "npm run check"
]) includes("report", report, marker);

includes("package.json", pkg, "\"audit:phase18a_b\"");
includes("package.json", pkg, "npm run audit:phase18a && npm run audit:phase18a_b");
includes("package.json", pkg, "npm run audit:phase18a_b && npm run build");

console.log("\n✓ Phase 18A-B companion persistence + offline AI readiness audit passed.");
