import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "docs/phase-plans/PHASE_13_5_COMPLETED_SCOPE_REPAIR.md",
  "docs/audits/PHASE_1_13_FULL_SOURCE_SCOPE_GAP_AUDIT.md",
  "docs/phase-reports/PHASE_13_5A_FORMAL_GAP_LOCK_REPORT.md",
];

const requiredPlanMarkers = [
  "Carnos Chat + Persona Repair",
  "Calendar / Timeline / Routine Repair",
  "Career Subsystem Repair",
  "Settings / Privacy Foundation Repair",
  "Placeholder Route Decision",
  "Explicit non-scope",
  "Voice sessions",
  "Memory/RAG",
  "Web search",
  "Phase 14 Voice Foundation",
];

const requiredAuditMarkers = [
  "Carnos text persistence",
  "persona_prompt_versions",
  "calendar_blocks",
  "routines",
  "routine_steps",
  "behavioral_stories",
  "question_bank",
  "mock_interviews",
  "app_settings",
  "privacy_settings",
  "Future phase",
  "Post-v1",
  "Phase 13.5G",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`Missing required file: ${file}`);
  }
}

function assertMarkers(file, markers) {
  if (!existsSync(file)) {
    return;
  }

  const content = readFileSync(file, "utf8");

  for (const marker of markers) {
    if (!content.includes(marker)) {
      failures.push(`Missing marker in ${file}: ${marker}`);
    }
  }
}

assertMarkers(
  "docs/phase-plans/PHASE_13_5_COMPLETED_SCOPE_REPAIR.md",
  requiredPlanMarkers,
);

assertMarkers(
  "docs/audits/PHASE_1_13_FULL_SOURCE_SCOPE_GAP_AUDIT.md",
  requiredAuditMarkers,
);

if (failures.length > 0) {
  console.error("Phase 13.5 audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 13.5A formal gap lock audit passed.");
