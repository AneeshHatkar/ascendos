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

console.log("\n=== PHASE 18H EXPERIMENT REPOSITORY BOUNDARY AUDIT ===");

const implementation = read("src/lib/analytics-experiments/experiment-repository-boundary.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARIES.md");
const checklist = read("docs/qa/PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARIES_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18h_experiment_repository_boundary_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18H") fail("fixture phase is not 18H");
pass("fixture phase is 18H");

for (const marker of [
  "ExperimentRepositoryReadIntent",
  "ExperimentRepositorySource",
  "ExperimentRepositoryCaptureMode",
  "ExperimentRepositoryFreshnessLabel",
  "ExperimentRepositoryCapability",
  "ExperimentTemplateRepositoryPlan",
  "ExperimentRepositoryBoundaryContract",
  "ExperimentRepositoryBoundaryValidationResult",
  "PHASE_18H_EXPERIMENT_REPOSITORY_BOUNDARY",
  "buildExperimentTemplateRepositoryPlan",
  "buildDefaultExperimentRepositoryBoundary",
  "validateExperimentRepositoryBoundary",
  "summarizeExperimentRepositoryBoundaryContract"
]) includes("implementation", implementation, marker);

for (const marker of [
  "template_lookup",
  "experiment_read",
  "draft_capture_preview",
  "measurement_read",
  "confounder_read",
  "lesson_summary_read",
  "memory_candidate_lesson_read",
  "evaluation_preview_read",
  "supabase_postgres_source_of_truth",
  "encrypted_offline_cache",
  "mixed_source_router",
  "unsynced_local_queue",
  "deterministic_empty_state",
  "read_only",
  "offline_capture_preview",
  "sync_queue_required",
  "online_runtime_required",
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "deterministic_preview",
  "read_experiment_templates",
  "read_experiment_records",
  "read_experiment_measurements",
  "read_experiment_confounders",
  "read_lesson_summaries",
  "read_memory_candidate_lessons",
  "read_evaluation_previews",
  "capture_offline_experiment_preview",
  "route_sync_queue_candidate",
  "label_source_mode",
  "validate_user_scope"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Experiment repository boundary id is required",
  "Experiment repository boundary must be user scoped",
  "Experiment repository boundary must define read intents",
  "Experiment repository boundary must define capabilities",
  "Experiment repository boundary must define template plans",
  "Experiment repository online source of truth must remain Supabase/Postgres",
  "Experiment repository offline continuity layer must remain encrypted IndexedDB or equivalent",
  "Experiment repository boundary must point to the Phase 18B schema source map fixture",
  "Experiment repository template plan is not registered",
  "Experiment repository template plan must require user scope",
  "Experiment repository runtime reads must not be implemented in this boundary chunk",
  "Experiment repository runtime writes must not be implemented in this boundary chunk",
  "Experiment repository runtime implementation must require schema source map first",
  "Offline experiment capture preview must require sync queue before write",
  "Offline experiment capture preview must use mixed source router",
  "Only source-of-truth reads may claim fresh experiment data",
  "Unsynced local experiment context must be disclosed to Carnos",
  "Deterministic experiment preview must be disclosed to Carnos",
  "Experiment repository boundary must not enable runtime data reads",
  "Experiment repository boundary must not enable runtime data writes",
  "Experiment repository boundary must not enable schema writes",
  "Experiment repository boundary must not enable Supabase calls",
  "Experiment repository boundary must not allow localStorage core data",
  "Experiment repository boundary must not allow fake experiment data",
  "Experiment repository boundary must not require local Carnos runtime",
  "Experiment repository boundary must not enable memory writes",
  "Experiment repository boundary must not enable action execution",
  "Carnos must disclose experiment repository source, cache, unsynced, or deterministic preview limits"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Experiment repository boundaries",
  "experiment template lookup boundary",
  "experiment read boundary",
  "experiment draft capture preview boundary",
  "experiment measurement read boundary",
  "experiment confounder read boundary",
  "lesson summary read boundary",
  "memory candidate lesson read boundary",
  "experiment evaluation preview boundary",
  "offline experiment capture boundary",
  "sync queue readiness boundary",
  "source routing boundary",
  "cached experiment context boundary",
  "unsynced local experiment context boundary",
  "deterministic experiment preview boundary",
  "user scope validation boundary",
  "no fake experiment repository data boundary",
  "schema source map requirement before runtime implementation",
  "Carnos experiment repository explanation limits",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "browser localStorage core-data ban",
  "offline experiment capture readiness",
  "cached experiment context labels",
  "unsynced local experiment labels",
  "deterministic preview disclosure",
  "future sync queue boundary",
  "sync queue required before write",
  "Carnos cached/offline honesty",
  "Phase 18E integration",
  "Phase 18F integration",
  "Runtime implementation must not begin until the Phase 18B schema source map is consulted",
  "no schema writes",
  "no runtime SQL reads",
  "no runtime data writes",
  "no Supabase client calls",
  "no fake experiment data",
  "no sync queue implementation",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Experiment repository boundary implementation exists",
  "Experiment repository boundary fixture exists",
  "Phase 18B schema source map requirement exists",
  "Registered template plan validation exists",
  "User scope validation exists",
  "Offline capture preview requires sync queue before write",
  "Cached/unsynced/deterministic repository disclosure exists",
  "Carnos experiment repository explanation limits exist",
  "Future local Carnos runtime compatibility is represented",
  "No runtime SQL reads are added",
  "No runtime data writes are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No fake experiment data is added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18h",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18H Experiment Repository Boundaries Report",
  "experiment repository boundary contracts",
  "repository id required",
  "user scoped repository required",
  "read intents required",
  "capabilities required",
  "template plans required",
  "Supabase/Postgres online source of truth",
  "encrypted IndexedDB offline continuity layer",
  "Phase 18B source map requirement",
  "registered template plans only",
  "user scope required per template plan",
  "no runtime reads in this boundary chunk",
  "no runtime writes in this boundary chunk",
  "offline capture preview requires sync queue before write",
  "Carnos disclosure for cached/unsynced/deterministic experiment repository context",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No experiment runtime writes occur",
  "No fake experiment data is added",
  "No sync queue implementation is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./experiment-repository-boundary\"");
includes("package.json", pkg, "\"audit:phase18h\"");
includes("package.json", pkg, "npm run audit:phase18g && npm run audit:phase18h");
includes("package.json", pkg, "npm run audit:phase18h && npm run build");

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
]) excludes("implementation", implementation, marker);

console.log("\n✓ Phase 18H experiment repository boundary audit passed.");
