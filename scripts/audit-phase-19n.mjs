import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/custom-trackers/phase19-completion-proof.ts",
  "src/lib/custom-trackers/index.ts",
  "docs/contracts/PHASE_19N_FINAL_COMPLETION.md",
  "docs/qa/PHASE_19N_FINAL_COMPLETION_CHECKLIST.md",
  "docs/phase-reports/PHASE_19N_FINAL_COMPLETION_REPORT.md",
  "docs/fixtures/phase19-custom-trackers/phase19n_final_completion_fixture.json",
  "package.json",
];

const previousPhase19Files = [
  "docs/roadmap/PHASE_19_CUSTOM_TRACKERS_EXPANDED_SCOPE_LOCK.md",
  "src/lib/custom-trackers/core-tracker-domain-contracts.ts",
  "src/lib/custom-trackers/field-type-registry.ts",
  "src/lib/custom-trackers/entry-validation.ts",
  "src/lib/custom-trackers/schema-versioning-archive-boundaries.ts",
  "src/lib/custom-trackers/template-frequency-semantics.ts",
  "src/lib/custom-trackers/privacy-carnos-permissions.ts",
  "src/lib/custom-trackers/carnos-proposals-review-queue.ts",
  "src/lib/custom-trackers/dashboard-placement-rules.ts",
  "src/lib/custom-trackers/timeline-analytics-compatibility.ts",
  "src/lib/custom-trackers/evidence-attachment-boundaries.ts",
  "src/lib/custom-trackers/repository-rls-audit-ownership.ts",
  "src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts",
  "src/components/custom-trackers/custom-trackers-dashboard-ui.tsx",
  "src/app/custom-trackers/page.tsx",
];

const read = (file) => readFileSync(file, "utf8");
const ok = (message) => console.log(`✓ ${message}`);
const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
};
const include = (file, marker) => {
  if (!read(file).includes(marker)) {
    fail(`${file} missing marker: ${marker}`);
  } else {
    ok(`${file} includes ${marker}`);
  }
};

console.log("=== PHASE 19N FINAL COMPLETION AUDIT ===");

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    fail(`Missing required file: ${file}`);
  } else {
    ok(`Found ${file}`);
  }
}

for (const file of previousPhase19Files) {
  if (!existsSync(file)) {
    fail(`Missing previous Phase 19 evidence file: ${file}`);
  } else {
    ok(`Previous Phase 19 evidence exists: ${file}`);
  }
}

const fixture = JSON.parse(read("docs/fixtures/phase19-custom-trackers/phase19n_final_completion_fixture.json"));
if (fixture.phase !== "19N" || fixture.status !== "complete") {
  fail("fixture phase/status is not 19N complete");
} else {
  ok("fixture phase/status is 19N complete");
}

for (const chunk of ["19A", "19B", "19C", "19D", "19E", "19F", "19G", "19H", "19I", "19J", "19K", "19L", "19M"]) {
  if (!fixture.completed_chunks.includes(chunk)) {
    fail(`fixture missing completed chunk ${chunk}`);
  } else {
    ok(`fixture includes completed chunk ${chunk}`);
  }
}

const implementation = "src/lib/custom-trackers/phase19-completion-proof.ts";
for (const marker of [
  "Phase19CompletedChunk",
  "Phase19CompletionArea",
  "Phase19CompletionProofItem",
  "Phase19FinalBoundary",
  "Phase19CompletionValidationResult",
  "Phase19CompletionProofSummary",
  "PHASE_19N_REQUIRED_CHUNKS",
  "PHASE_19N_REQUIRED_AREAS",
  "PHASE_19N_FINAL_BOUNDARY",
  "PHASE_19N_COMPLETION_PROOF_ITEMS",
  "getPhase19CompletionProofItem",
  "validatePhase19CompletionProof",
  "summarizePhase19CompletionProof",
  "finalCompletionProofEnabled: true",
  "allChunksRepresented: true",
  "schemaValidationProof: true",
  "entryValidationProof: true",
  "permissionRlsBoundaryProof: true",
  "dashboardPlacementBoundaryProof: true",
  "carnosReviewBeforeWriteProof: true",
  "noFakeDataProof: true",
  "noSilentAiWriteProof: true",
  "noUnsafeDirectActionExecutionProof: true",
  "runtimeDatabaseReadsEnabled: false",
  "runtimeDatabaseWritesEnabled: false",
  "runtimeTrackerWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "modelCallsEnabled: false",
  "networkCallsEnabled: false",
  "memoryWritesEnabled: false",
  "actionExecutionEnabled: false",
]) {
  include(implementation, marker);
}

for (const marker of [
  "Final Phase 19 completion proof",
  "Final Phase 19 fixture",
  "Final Phase 19 contract",
  "Final Phase 19 checklist",
  "Final Phase 19 report",
  "Final audit script",
  "Package check integration confirmation",
  "Coverage proof for 19A through 19M",
  "Schema validation proof",
  "Entry validation proof",
  "Permission/RLS boundary proof",
  "Dashboard placement boundary proof",
  "Carnos review-before-write proof",
  "No fake data proof",
  "No silent AI write proof",
  "No unsafe direct action execution proof",
]) {
  include("docs/contracts/PHASE_19N_FINAL_COMPLETION.md", marker);
}

for (const marker of [
  "Phase 19N closes Phase 19 Custom Trackers",
  "Phase 19A through Phase 19M are represented",
  "Schema validation proof is represented",
  "Entry validation proof is represented",
  "Permission/RLS boundary proof is represented",
  "Dashboard placement proof is represented",
  "Carnos review-before-write proof is represented",
  "No fake data proof is represented",
  "No silent AI write proof is represented",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added",
]) {
  include("docs/phase-reports/PHASE_19N_FINAL_COMPLETION_REPORT.md", marker);
}

for (const marker of [
  "Final Phase 19 completion proof exists",
  "19A is represented",
  "19M is represented",
  "Schema validation proof exists",
  "Entry validation proof exists",
  "Permission/RLS boundary proof exists",
  "Dashboard placement boundary proof exists",
  "Carnos review-before-write proof exists",
  "No fake data proof exists",
  "No silent AI write proof exists",
  "No runtime database read/write is added",
  "npm run audit:phase19n",
  "npm run check",
]) {
  include("docs/qa/PHASE_19N_FINAL_COMPLETION_CHECKLIST.md", marker);
}

for (const marker of [
  "final_phase_19_completion_proof",
  "coverage_proof_for_19a_through_19m",
  "schema_validation_proof",
  "entry_validation_proof",
  "permission_rls_boundary_proof",
  "dashboard_placement_boundary_proof",
  "carnos_review_before_write_proof",
  "no_fake_data_proof",
  "no_silent_ai_write_proof",
  "no_unsafe_direct_action_execution_proof",
]) {
  if (!fixture.final_proofs.includes(marker)) {
    fail(`fixture missing final proof ${marker}`);
  } else {
    ok(`fixture includes final proof ${marker}`);
  }
}

include("src/lib/custom-trackers/index.ts", "export * from \"./phase19-completion-proof\"");

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || !pkg.scripts["audit:phase19n"]) {
  fail("package.json missing audit:phase19n");
} else {
  ok("package.json includes audit:phase19n");
}
if (!pkg.scripts || !pkg.scripts.check || !pkg.scripts.check.includes("npm run audit:phase19n")) {
  fail("npm run check missing audit:phase19n");
} else {
  ok("npm run check includes audit:phase19n");
}

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
  "executeApprovedAction",
]) {
  if (read(implementation).includes(marker)) {
    fail(`implementation includes forbidden marker: ${marker}`);
  } else {
    ok(`implementation excludes forbidden marker: ${marker}`);
  }
}

if (process.exitCode) {
  console.error("Phase 19N final completion audit failed.");
  process.exit(process.exitCode);
}

console.log("✓ Phase 19N final completion audit passed.");
