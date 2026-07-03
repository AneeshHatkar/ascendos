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

console.log("\n=== PHASE 18E SELF-EXPERIMENT CONTRACTS AUDIT ===");

const implementation = read("src/lib/analytics-experiments/self-experiment-contracts.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18E_SELF_EXPERIMENT_CONTRACTS.md");
const checklist = read("docs/qa/PHASE_18E_SELF_EXPERIMENT_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18E_SELF_EXPERIMENT_CONTRACTS_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18e_self_experiment_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18E") fail("fixture phase is not 18E");
pass("fixture phase is 18E");

for (const marker of [
  "SelfExperimentDomain",
  "SelfExperimentLifecycleStage",
  "SelfExperimentCadence",
  "SelfExperimentHypothesisDirection",
  "SelfExperimentSourceMode",
  "SelfExperimentEvaluationReadiness",
  "SelfExperimentLessonStatus",
  "SelfExperimentMeasurementRule",
  "SelfExperimentConfounder",
  "SelfExperimentTemplate",
  "SelfExperimentContract",
  "SelfExperimentMeasurementSummary",
  "SelfExperimentValidationResult",
  "PHASE_18E_SELF_EXPERIMENT_BOUNDARY",
  "DEFAULT_SELF_EXPERIMENT_TEMPLATES",
  "listSelfExperimentTemplates",
  "getSelfExperimentTemplate",
  "validateSelfExperimentTemplate",
  "buildSelfExperimentDraftFromTemplate",
  "validateSelfExperiment",
  "summarizeSelfExperimentContract"
]) includes("implementation", implementation, marker);

for (const marker of [
  "draft",
  "planned",
  "baseline",
  "active",
  "paused",
  "completed",
  "reviewed",
  "archived",
  "invalid",
  "ready",
  "ready_with_warnings",
  "not_ready",
  "sleep_reset_experiment",
  "career_sprint_experiment",
  "learning_consistency_experiment",
  "fitness_consistency_experiment",
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "unsynced_local",
  "deterministic_preview"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Experiment id is required",
  "Experiment must be user scoped",
  "Experiment title is required",
  "Experiment hypothesis is required",
  "Primary metric is not registered",
  "Experiment metric is not registered",
  "Baseline range is required before experiment evaluation",
  "Active range is required before experiment evaluation",
  "Reviewed experiment requires a lesson summary",
  "Memory candidate lesson requires a lesson summary",
  "High severity confounders prevent confident experiment claims",
  "Experiment includes unsynced local context",
  "Experiment context is based on eligible offline cache",
  "Experiment is deterministic preview only",
  "Measurement summary is missing for metric",
  "Not enough baseline days for metric",
  "Not enough active days for metric",
  "Not enough measurements for metric",
  "Measurement quality includes confounders for metric",
  "Invalid measurement quality for metric",
  "Insufficient measurement data for metric",
  "Experiment contract must not enable runtime data reads",
  "Experiment contract must not enable schema writes",
  "Experiment contract must not enable Supabase calls",
  "Experiment contract must not allow localStorage core data",
  "Experiment contract must not require local Carnos runtime",
  "Carnos must disclose unsynced experiment context",
  "Carnos must disclose cached experiment context",
  "Carnos must disclose deterministic preview context",
  "Carnos must disclose confounders and avoid causal claims",
  "Carnos may explain experiment readiness without claiming proof"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Self-Experiment Lab foundation",
  "experiment templates",
  "before/during/after lifecycle states",
  "baseline tracking",
  "active-period tracking",
  "measurement requirements",
  "confounder tracking",
  "invalid experiment states",
  "lesson summary foundation",
  "lessons learned system foundation",
  "memory candidate lesson boundary",
  "experiment evaluation readiness",
  "Carnos experiment explanation limits",
  "no confident causal claims when confounders exist",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "browser localStorage core-data ban",
  "offline experiment capture readiness",
  "unsynced local experiment labels",
  "cached experiment context labels",
  "sensitive/private experiment labels",
  "future sync queue boundary",
  "deterministic offline fallback",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no fake experiment data",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Self-experiment contract implementation exists",
  "Self-experiment fixture exists",
  "Registered primary metric validation exists",
  "Registered supporting metric validation exists",
  "Baseline range validation exists",
  "Active range validation exists",
  "Minimum baseline days validation exists",
  "Minimum active days validation exists",
  "Minimum measurements validation exists",
  "Confounder tracking exists",
  "Lesson summary validation exists",
  "Memory candidate lesson boundary exists",
  "Cached/unsynced/deterministic explanation limits exist",
  "Carnos avoids proof/causal claims",
  "Future local Carnos runtime compatibility is represented",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "npm run audit:phase18e",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18E Self-Experiment Contracts Report",
  "self-experiment contracts and validators",
  "registered primary metrics",
  "registered supporting metrics",
  "baseline range",
  "active range",
  "minimum baseline days",
  "minimum active days",
  "minimum measurements",
  "confounder warnings",
  "insufficient data blocks readiness",
  "invalid quality blocks readiness",
  "lesson summary requirement",
  "memory candidate lesson boundary",
  "cached/unsynced/deterministic disclosure",
  "no confident causal claims",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No fake experiment data is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./self-experiment-contracts\"");
includes("package.json", pkg, "\"audit:phase18e\"");
includes("package.json", pkg, "npm run audit:phase18d && npm run audit:phase18e");
includes("package.json", pkg, "npm run audit:phase18e && npm run build");

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

console.log("\n✓ Phase 18E self-experiment contracts audit passed.");
