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

console.log("\n=== PHASE 18J EXPERIMENT EVALUATION ENGINE AUDIT ===");

const implementation = read("src/lib/analytics-experiments/experiment-evaluation-engine.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18J_EXPERIMENT_EVALUATION_ENGINE.md");
const checklist = read("docs/qa/PHASE_18J_EXPERIMENT_EVALUATION_ENGINE_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18J_EXPERIMENT_EVALUATION_ENGINE_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18j_experiment_evaluation_engine_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18J") fail("fixture phase is not 18J");
pass("fixture phase is 18J");

for (const marker of [
  "ExperimentEvaluationStatus",
  "ExperimentValidityState",
  "ExperimentOutcomeDirection",
  "ExperimentLessonCandidateType",
  "ExperimentEvaluationConfidence",
  "ExperimentMeasurementPoint",
  "ExperimentEvaluationInput",
  "ExperimentLessonCandidate",
  "ExperimentEvaluationResult",
  "ExperimentEvaluationEngineSummary",
  "PHASE_18J_EXPERIMENT_EVALUATION_BOUNDARY",
  "evaluateSelfExperiment",
  "summarizeExperimentEvaluationEngine"
]) includes("implementation", implementation, marker);

for (const marker of [
  "ready",
  "ready_with_warnings",
  "not_ready",
  "invalid",
  "valid_result",
  "inconclusive",
  "insufficient_baseline",
  "insufficient_active_window",
  "too_many_confounders",
  "missing_measurements",
  "improved",
  "worsened",
  "unchanged",
  "continue",
  "adjust",
  "stop",
  "repeat_with_better_measurement",
  "insufficient_data",
  "high",
  "medium",
  "low",
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "unsynced_local",
  "deterministic_preview"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Experiment id is required",
  "Experiment template id is required",
  "Experiment metric id is required",
  "Experiment evaluation must be user scoped",
  "Experiment evaluation must not allow causal claims",
  "Experiment minimum baseline points must be at least 2",
  "Experiment minimum active points must be at least 2",
  "Expected baseline measurements must cover minimum baseline points",
  "Expected active measurements must cover minimum active points",
  "Experiment baseline window has insufficient data",
  "Experiment active window has insufficient data",
  "Experiment has missing expected measurements",
  "Experiment evaluation contains invalid or non-user-scoped measurement",
  "Experiment has confounder warnings",
  "Experiment has too many confounders for a clean result",
  "Carnos must not present this experiment evaluation as valid",
  "Carnos must say this experiment does not have enough data yet",
  "Carnos must disclose cached, unsynced, partial, deterministic, or confounder limits",
  "Carnos may explain this as a deterministic experiment evaluation, but must not claim proof or causality"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Experiment Evaluation Engine",
  "baseline vs active comparison",
  "measurement completeness scoring",
  "baseline completeness gate",
  "active-window completeness gate",
  "confounder penalty",
  "experiment validity states",
  "evaluation readiness states",
  "lesson candidate generation",
  "memory candidate boundary",
  "Carnos explanation limits",
  "no fake experiment data",
  "no memory writes",
  "no action execution",
  "Phase 18E integration",
  "Phase 18F integration",
  "Phase 18I integration",
  "Phase 18A-B integration",
  "cached context disclosure",
  "unsynced context disclosure",
  "partial context disclosure",
  "deterministic preview disclosure",
  "confounder disclosure",
  "no causality claim boundary",
  "sync queue remains future boundary",
  "local Carnos runtime remains optional",
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
  "Experiment evaluation engine implementation exists",
  "Experiment evaluation fixture exists",
  "Baseline vs active comparison exists",
  "Measurement completeness scoring exists",
  "Confounder penalty exists",
  "Lesson candidate generation exists",
  "Memory candidate boundary exists",
  "Carnos explanation limits exist",
  "Causal claims are forbidden",
  "No runtime SQL reads are added",
  "No runtime data writes are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No fake experiment data is added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18j",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18J Experiment Evaluation Engine Report",
  "deterministic self-experiment evaluation engine logic",
  "experiment id required",
  "template id required",
  "metric id required",
  "user scope required",
  "causal claims forbidden",
  "baseline minimum data gate",
  "active-window minimum data gate",
  "expected measurement coverage",
  "missing measurement warnings",
  "invalid measurement blocking",
  "confounder warning and invalid thresholds",
  "memory candidate requires review before write",
  "action execution forbidden",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No experiment runtime writes occur",
  "No fake experiment data is added",
  "No sync queue implementation is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./experiment-evaluation-engine\"");
includes("package.json", pkg, "\"audit:phase18j\"");
includes("package.json", pkg, "npm run audit:phase18i && npm run audit:phase18j");
includes("package.json", pkg, "npm run audit:phase18j && npm run build");

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

console.log("\n✓ Phase 18J experiment evaluation engine audit passed.");
