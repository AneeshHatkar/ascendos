import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/current-info-capture/current-info-review-to-save-flow.ts",
  "src/lib/current-info-capture/index.ts",
  "src/components/dashboard/current-info-review-to-save-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_CONTRACT.md",
  "docs/phase-reports/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_REPORT.md",
  "docs/qa/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16o.mjs",
  "package.json",
];

const markers = {
  "src/lib/current-info-capture/current-info-review-to-save-flow.ts": [
    "buildCurrentInfoReviewToSaveFlow",
    "CurrentInfoReviewToSavePreview",
    "CurrentInfoKnowledgeSavePreview",
    "approve_for_save_preview",
    "request_edit_preview",
    "web_source_candidate_approved",
    "web_source_candidate_rejected",
    "web_source_saved",
    "web_source_linked_to_record",
    "create_task",
    "create_goal",
    "create_proof_item",
    "PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_BOUNDARY",
  ],
  "src/lib/current-info-capture/index.ts": [
    'export * from "./current-info-review-to-save-flow";',
  ],
  "src/components/dashboard/current-info-review-to-save-panel.tsx": [
    "CurrentInfoReviewToSavePanel",
    "CurrentInfoReviewToSaveFlowResult",
    "Review-to-save candidate flow",
    "PHASE_16O_REVIEW_TO_SAVE_PANEL_BOUNDARY",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./current-info-review-to-save-panel";',
  ],
  "docs/contracts/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_CONTRACT.md": [
    "Phase 16O",
    "Review-to-Save Candidate Flow Contract",
    "confirmation-first review-to-save preview layer",
    "16P — Privacy, Sensitive Search, Retention Rules",
  ],
  "docs/phase-reports/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_REPORT.md": [
    "Phase 16O",
    "schema-aware, read-only review-to-save preview flow",
    "No candidate state changes",
  ],
  "docs/qa/PHASE_16O_REVIEW_TO_SAVE_CANDIDATE_FLOW_SMOKE_CHECKLIST.md": [
    "Review-to-save helper exists",
    "No candidate update is added",
    "No ai_actions insert is added",
  ],
  "package.json": [
    "audit:phase16o",
  ],
};

const forbiddenInRuntime = [
  "createSupabaseServerClient",
  "createSupabaseBrowserClient",
  ".from(",
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".rpc(",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "createEmbedding",
  "embed(",
  "executeApprovedAction(",
  "createProposedAction(",
  "approveCurrentInfo",
  "rejectCurrentInfo",
  "memory_embeddings",
];

const forbiddenFiles = [
  "src/app/api/current-info/review-to-save/route.ts",
  "src/app/api/current-info/save-candidate/route.ts",
  "supabase/migrations/0028_phase16o_review_to_save_candidate_flow.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16O REVIEW-TO-SAVE CANDIDATE FLOW AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const [file, requiredMarkers] of Object.entries(markers)) {
  const text = read(file);

  for (const marker of requiredMarkers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const file of [
  "src/lib/current-info-capture/current-info-review-to-save-flow.ts",
  "src/components/dashboard/current-info-review-to-save-panel.tsx",
]) {
  const text = read(file);

  for (const marker of forbiddenInRuntime) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16O file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16o"),
    `${script} must include audit:phase16o`,
  );
}

console.log("✓ verification chain includes audit:phase16o");
console.log("\nPhase 16O audit passed: Review-to-save candidate flow is present, schema-aware, confirmation-first, and read-only.");
