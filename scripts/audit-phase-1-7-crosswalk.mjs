import fs from "node:fs";

function fail(message) {
  console.error(`Phase 1-7 crosswalk audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function requireFile(path) {
  if (!fs.existsSync(path)) {
    fail(`Missing required file: ${path}`);
  }
  pass(`Found ${path}`);
}

function read(path) {
  requireFile(path);
  return fs.readFileSync(path, "utf8");
}

function requireIncludes(path, needle) {
  const content = read(path);
  if (!content.includes(needle)) {
    fail(`${path} is missing marker: ${needle}`);
  }
  pass(`${path} contains ${needle}`);
}

function forbidFile(path) {
  if (fs.existsSync(path)) {
    fail(`Forbidden file exists: ${path}`);
  }
  pass(`Forbidden file absent: ${path}`);
}

for (const file of [
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
  "SOURCE_OF_TRUTH.md",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "DECISIONS.md",
  "ERRORS_AND_FIXES.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
  "docs/phase-reports/PHASE_4_CORE_SQL_SPINE_REPORT.md",
  "docs/phase-reports/PHASE_5_CORE_READ_UI_INTEGRATION_REPORT.md",
  "docs/phase-reports/PHASE_6_SAFE_WRITE_PROPOSED_ACTION_FLOW_REPORT.md",
  "docs/phase-reports/PHASE_7_CORE_OPERATING_DASHBOARDS_REPORT.md",
  "docs/audits/PHASE_1_7_SOURCE_CROSSWALK.md",
  "docs/qa/PHASE_7_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-integration-sanity.mjs",
]) {
  requireFile(file);
}

for (const file of [
  "src/app/command/page.tsx",
  "src/app/timeline/page.tsx",
  "src/app/calendar/page.tsx",
  "src/app/goals/page.tsx",
  "src/app/carnos/page.tsx",
]) {
  requireFile(file);
}

forbidFile("src/app/proof/page.tsx");

for (const marker of [
  "Phase 1 — Source-of-truth foundation",
  "Phase 2 — App shell and route foundation",
  "Phase 3 — Auth and Supabase foundation",
  "Phase 4 — Core SQL spine",
  "Phase 5 — Core read UI / Carnos foundation status",
  "Phase 6 — Safe Write / Proposed Action Flow",
  "Phase 7 — Core Operating Dashboards",
  "Phases 1–7 are safe to build upon.",
]) {
  requireIncludes("docs/audits/PHASE_1_7_SOURCE_CROSSWALK.md", marker);
}

requireIncludes("PHASE_STATUS.md", "Phase 7 Completion");
requireIncludes("PHASE_STATUS.md", "Next phase: Phase 8 Career System.");
requireIncludes("docs/phase-reports/PHASE_7_CORE_OPERATING_DASHBOARDS_REPORT.md", "Status: Complete.");

console.log("\nPhase 1-7 crosswalk audit passed.");
