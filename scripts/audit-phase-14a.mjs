import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(p(rel));
}

function read(rel) {
  return fs.readFileSync(p(rel), "utf8");
}

const failures = [];

const requiredFiles = [
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
  "docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md",
  "docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md",
  "docs/qa/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14a.mjs"
];

for (const file of requiredFiles) {
  if (!exists(file)) failures.push(`Missing required file: ${file}`);
}

const planMarkers = [
  "Build chunks: 14A–14J",
  "Requirement categories: A–K",
  "14J — Final Voice/Text Integration Hardening",
  "145 checklist-level requirements",
  "Voice orb / waveform visual",
  "Voice session state machine",
  "Transcript draft before save",
  "Manual transcript fallback",
  "Simulated transcript testing flow",
  "Carnos system-wide update bridge",
  "Typed Carnos message-to-system bridge",
  "Voice transcript-to-system bridge",
  "Manual transcript-to-system bridge",
  "Simulated transcript-to-system bridge",
  "Shared extraction pipeline",
  "Domain routing hints",
  "Future domain-action expansion map",
  "Human World Anchor anti-dependency rule",
  "Detected emotion label",
  "End session summary",
  "source_message_id",
  "occurred_at",
  "logged_at",
  "provider_not_configured",
  "api/voice/transcribe",
  "api/voice/speak",
  "voice_sessions",
  "voice_transcripts",
  "/voice-companion",
  "/carnos",
  "No Memory/RAG implementation",
  "No pgvector",
  "No web search",
  "No analytics snapshots",
  "No custom tracker builder",
  "No full export/delete/private mode implementation",
  "Carnos is allowed to understand and propose updates across ascendOS",
  "Carnos is not allowed to silently write important changes"
];

const reportMarkers = [
  "Phase 14 build chunks are **14A through 14J**",
  "Requirement checklist categories are **A through K**",
  "Checklist requirements: 145",
  "14J — Final Voice/Text Integration Hardening",
  "all 145 checklist-level requirements",
  "Carnos text/voice-to-system update bridge",
  "typed Carnos message",
  "voice transcript",
  "manual transcript",
  "simulated transcript",
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
  "Direct domain-specific writes are deferred"
];

const qaMarkers = [
  "Phase 14 has 10 build chunks, 14A through 14J",
  "Requirement checklist categories are A through K",
  "145 checklist-level requirements",
  "Carnos text/voice-to-system update bridge",
  "Audio retention is off by default",
  "Transcript draft before save",
  "Human World Anchor anti-dependency rule",
  "Typed Carnos messages are included in the bridge",
  "Voice transcripts are included in the bridge",
  "Manual transcripts are included in the bridge",
  "Simulated transcripts are included in the bridge",
  "Direct domain-specific writes are deferred"
];

if (exists("docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md")) {
  const text = read("docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md");
  for (const marker of planMarkers) {
    if (!text.includes(marker)) failures.push(`Phase 14A plan missing marker: ${marker}`);
  }
}

if (exists("docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md")) {
  const text = read("docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md");
  for (const marker of reportMarkers) {
    if (!text.includes(marker)) failures.push(`Phase 14A report missing marker: ${marker}`);
  }
}

if (exists("docs/qa/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_MANUAL_SMOKE_CHECKLIST.md")) {
  const text = read("docs/qa/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_MANUAL_SMOKE_CHECKLIST.md");
  for (const marker of qaMarkers) {
    if (!text.includes(marker)) failures.push(`Phase 14A QA checklist missing marker: ${marker}`);
  }
}

if (exists("docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json")) {
  const json = read("docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json");
  for (const marker of [
    "speech-to-text provider abstraction",
    "text-to-speech provider abstraction",
    "voice session UI",
    "transcript storage",
    "api/voice/transcribe",
    "api/voice/speak",
    "voice_sessions",
    "voice_transcripts"
  ]) {
    if (!json.includes(marker)) failures.push(`Source JSON missing expected voice marker: ${marker}`);
  }
}

// Phase 14A remains a scope-lock audit after Phase 14 implementation begins.
// It must not permanently block planned Phase 14B+ implementation files.
// The only route-level boundary that remains forbidden is the standalone
// /voice-companion route, because the locked decision says Phase 14 starts in /carnos.
for (const forbidden of [
  "src/app/voice-companion/page.tsx",
  "src/app/voice-companion"
]) {
  if (exists(forbidden)) failures.push(`Standalone /voice-companion route is still deferred: ${forbidden}`);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts?.["audit:phase14a"]) {
  failures.push("package.json missing audit:phase14a");
}
if (!pkg.scripts?.check?.includes("audit:phase14a")) {
  failures.push("npm run check missing audit:phase14a");
}

for (const rel of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  if (!exists(rel)) {
    failures.push(`Missing log/status file: ${rel}`);
    continue;
  }

  const text = read(rel);
  if (!text.includes("Phase 14A")) failures.push(`${rel} missing Phase 14A marker`);
  if (!text.includes("Voice Foundation")) failures.push(`${rel} missing Voice Foundation marker`);
  if (!text.includes("14J")) failures.push(`${rel} missing 14J marker`);
  if (!text.includes("14A–14J")) failures.push(`${rel} missing 14A–14J marker`);
}

if (failures.length) {
  console.error("\n=== PHASE 14A VOICE FOUNDATION SCOPE LOCK AUDIT FAILED ===");
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log("\n=== PHASE 14A VOICE FOUNDATION SCOPE LOCK AUDIT ===");
console.log("✓ Source voice markers present");
console.log("✓ Build chunks are locked as 14A–14J");
console.log("✓ Requirement categories are documented as A–K");
console.log("✓ Full 145-requirement scope is locked");
console.log("✓ Carnos text/voice-to-system update bridge is locked");
console.log("✓ Route reconciliation is locked");
console.log("✓ Safety and deferred boundaries are locked");
console.log("✓ Phase 14A scope lock remains valid after Phase 14B implementation begins");
console.log("✓ package.json check gate includes audit:phase14a");
console.log("✓ Logs/status markers present");
console.log("\nPhase 14A voice foundation scope lock audit passed.");

// Phase 14A audit future-compatible after Phase 14B:
// Planned Phase 14B+ implementation files are allowed after the scope lock.
// Standalone /voice-companion remains deferred unless canonical routes expand.
