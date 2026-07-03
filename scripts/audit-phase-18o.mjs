import { existsSync, readFileSync } from "node:fs";

function fail(message) { console.error("✗ " + message); process.exit(1); }
function pass(message) { console.log("✓ " + message); }
function read(path) { if (!existsSync(path)) fail("Missing " + path); pass("Found " + path); return readFileSync(path, "utf8"); }
function includes(label, text, marker) { if (!text.includes(marker)) fail(label + " missing marker: " + marker); pass(label + " includes " + marker); }
function excludes(label, text, marker) { if (text.includes(marker)) fail(label + " contains forbidden marker: " + marker); pass(label + " excludes forbidden marker: " + marker); }

console.log("\n=== PHASE 18O FINAL COMPLETION AUDIT ===");

const implementation = read("src/lib/analytics-experiments/phase18-completion-proof.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18O_FINAL_COMPLETION.md");
const checklist = read("docs/qa/PHASE_18O_FINAL_COMPLETION_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18O_FINAL_COMPLETION_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18o_final_completion_fixture.json");
const pkg = read("package.json");

let fixture;
try { fixture = JSON.parse(fixtureText); pass("fixture JSON parses"); } catch (error) { fail("fixture JSON does not parse: " + error.message); }
if (fixture.phase !== "18O") fail("fixture phase is not 18O");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 18O complete");

for (const path of [
  "src/lib/analytics-experiments/metric-registry.ts",
  "src/lib/analytics-experiments/analytics-snapshot-contracts.ts",
  "src/lib/analytics-experiments/self-experiment-contracts.ts",
  "src/lib/analytics-experiments/insight-quality-provenance.ts",
  "src/lib/analytics-experiments/analytics-repository-boundary.ts",
  "src/lib/analytics-experiments/experiment-repository-boundary.ts",
  "src/lib/analytics-experiments/trend-correlation-comparison-engine.ts",
  "src/lib/analytics-experiments/experiment-evaluation-engine.ts",
  "src/lib/analytics-experiments/analytics-dashboard-view-model.ts",
  "src/components/analytics-experiments/analytics-dashboard-ui.tsx",
  "src/lib/analytics-experiments/self-experiment-lab-view-model.ts",
  "src/components/analytics-experiments/self-experiment-lab-ui.tsx",
  "src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts",
  "src/lib/analytics-experiments/local-carnos-runtime-boundary.ts",
  "src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts",
  "src/app/analytics/page.tsx"
]) read(path);

for (const marker of [
  "Phase18CompletionStep",
  "Phase18CompletionArea",
  "Phase18FinalBoundary",
  "Phase18FinalDisclosure",
  "Phase18CompletionProofSummary",
  "PHASE_18O_COMPLETION_BOUNDARY",
  "PHASE_18O_COMPLETED_STEPS",
  "PHASE_18O_COMPLETED_AREAS",
  "PHASE_18O_FINAL_BOUNDARIES",
  "PHASE_18O_FINAL_DISCLOSURES",
  "summarizePhase18CompletionProof",
  "runtimeDataReadsEnabled: false",
  "schemaWritesEnabled: false",
  "supabaseCallsEnabled: false",
  "modelCallsEnabled: false",
  "networkCallsEnabled: false",
  "embeddingCallsEnabled: false",
  "vectorSearchEnabled: false",
  "memoryWriteEnabled: false",
  "actionExecutionEnabled: false",
  "localCarnosRuntimeRequired: false"
]) includes("implementation", implementation, marker);

for (const marker of [
  "18A", "18A-B", "18B", "18B-B", "18C", "18D", "18E", "18F", "18G", "18H", "18I", "18J", "18K", "18L", "18M", "18M-B", "18N", "18O",
  "scope_lock",
  "offline_ai_readiness",
  "schema_source_mapping",
  "local_runtime_planning",
  "metric_quality",
  "analytics_snapshots",
  "self_experiments",
  "insight_quality_provenance",
  "repository_boundaries",
  "trend_correlation_comparison",
  "experiment_evaluation",
  "analytics_dashboard_ui",
  "self_experiment_lab_ui",
  "carnos_explanation_boundary",
  "local_carnos_runtime_boundary",
  "anti_demo_data_privacy_audit",
  "final_completion_proof",
  "no_runtime_sql_reads",
  "no_schema_writes",
  "no_supabase_runtime_calls",
  "no_model_calls",
  "no_network_calls",
  "no_embedding_calls",
  "no_vector_search",
  "no_memory_writes",
  "no_action_execution",
  "no_fake_analytics_data",
  "no_fake_experiment_data",
  "no_causality_claims",
  "no_proof_claims",
  "local_runtime_not_required",
  "review_before_memory_write",
  "cached_context_disclosure",
  "stale_context_disclosure",
  "partial_context_disclosure",
  "missing_context_disclosure",
  "unsynced_context_disclosure",
  "deterministic_preview_disclosure",
  "offline_current_info_limitation",
  "local_context_not_online_source_of_truth",
  "privacy_restricted_context_boundary"
]) { includes("implementation", implementation, marker); includes("fixture", fixtureText, marker); }

for (const marker of [
  "Phase 18O closes Phase 18",
  "18A scope lock",
  "18A-B persistence/offline AI readiness",
  "18B schema discovery/source map",
  "18B-B local Carnos runtime plan",
  "18C metric registry/data quality",
  "18D analytics snapshot contracts",
  "18E self-experiment contracts",
  "18F insight quality/provenance",
  "18G analytics repository boundaries",
  "18H experiment repository boundaries",
  "18I trend/correlation/comparison engine",
  "18J experiment evaluation engine",
  "18K analytics dashboard UI",
  "18L self-experiment lab UI",
  "18M Carnos analytics explanation boundary",
  "18M-B local Carnos runtime boundary/offline adapter",
  "18N anti-demo-data privacy/sensitivity audit",
  "18O final completion proof",
  "Supabase/Postgres remains online source of truth",
  "offline cache remains future boundary only",
  "sync queue execution remains disabled",
  "cached context disclosure preserved",
  "stale context disclosure preserved",
  "partial context disclosure preserved",
  "missing context disclosure preserved",
  "unsynced local context disclosure preserved",
  "deterministic preview disclosure preserved",
  "offline/current-info limitation preserved",
  "local/offline context is not online source of truth",
  "local runtime remains optional",
  "Option C local runtime path preserved",
  "review-before-memory-write preserved",
  "action execution disabled",
  "no runtime SQL reads",
  "no schema writes",
  "no Supabase runtime calls",
  "no model calls",
  "no network calls",
  "no embedding calls",
  "no vector search",
  "no memory writes",
  "no action execution",
  "no fake analytics data",
  "no fake experiment data",
  "no causality claims",
  "no proof claims",
  "local runtime not required",
  "review before memory write"
]) includes("contract", contract, marker);

for (const marker of [
  "Final Phase 18 completion proof exists",
  "Final Phase 18 fixture exists",
  "Final Phase 18 contract exists",
  "Final Phase 18 report exists",
  "Final Phase 18 audit exists",
  "18A is represented",
  "18A-B is represented",
  "18B is represented",
  "18B-B is represented",
  "18C is represented",
  "18D is represented",
  "18E is represented",
  "18F is represented",
  "18G is represented",
  "18H is represented",
  "18I is represented",
  "18J is represented",
  "18K is represented",
  "18L is represented",
  "18M is represented",
  "18M-B is represented",
  "18N is represented",
  "18O is represented",
  "Final 18A-B persistence/offline disclosures are represented",
  "Final no-runtime-SQL boundary is represented",
  "Final no-schema-write boundary is represented",
  "Final no-Supabase-runtime boundary is represented",
  "Final no-model/network boundary is represented",
  "Final no-embedding/vector boundary is represented",
  "Final no-memory-write boundary is represented",
  "Final no-action-execution boundary is represented",
  "Final no-fake-data boundary is represented",
  "npm run audit:phase18o",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18O Final Phase 18 Completion Report",
  "Phase 18 is complete",
  "18A, 18A-B, 18B, 18B-B, 18C, 18D, 18E, 18F, 18G, 18H, 18I, 18J, 18K, 18L, 18M, 18M-B, 18N, and 18O",
  "Phase 18 added analytics and self-experiment foundations",
  "Supabase/Postgres as online source of truth",
  "offline cache and sync execution as future boundaries",
  "cached/stale/partial/missing/unsynced/deterministic disclosures",
  "local runtime optional",
  "review-before-memory-write",
  "action execution disabled",
  "No runtime SQL reads are added",
  "No schema writes are added",
  "No Supabase runtime calls are added",
  "No model calls are added",
  "No network calls are added",
  "No embedding calls or vector search are added",
  "No memory writes are added",
  "No action execution is added",
  "No fake analytics or experiment data is added",
  "No causality or proof claims are allowed",
  "Local Carnos runtime is not required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./phase18-completion-proof\"");
includes("package.json", pkg, "\"audit:phase18o\"");
includes("package.json", pkg, "npm run audit:phase18n && npm run audit:phase18o");
includes("package.json", pkg, "npm run audit:phase18o && npm run build");

for (const marker of ["createSupabaseServerClient", ".from(", "insert(", "update(", "delete(", "upsert(", "fetch(", "generateText", "streamText", "openai", "OpenAI", "vector(", "embedding vector", "navigator.mediaDevices", "setInterval(", "setTimeout(", "speechSynthesis", "createProposedAction", "executeApprovedAction"]) excludes("implementation", implementation, marker);

console.log("\n✓ Phase 18O final completion audit passed.");
