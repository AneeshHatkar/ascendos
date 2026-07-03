import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function fail(message) { console.error("✗ " + message); process.exit(1); }
function pass(message) { console.log("✓ " + message); }
function read(path) { if (!existsSync(path)) fail("Missing " + path); pass("Found " + path); return readFileSync(path, "utf8"); }
function includes(label, text, marker) { if (!text.includes(marker)) fail(label + " missing marker: " + marker); pass(label + " includes " + marker); }
function excludes(label, text, marker) { if (text.includes(marker)) fail(label + " contains forbidden marker: " + marker); pass(label + " excludes forbidden marker: " + marker); }
function walk(dir, suffixes) { const out=[]; for (const name of readdirSync(dir)) { const p=join(dir,name); const st=statSync(p); if (st.isDirectory()) out.push(...walk(p,suffixes)); else if (suffixes.some((s)=>p.endsWith(s))) out.push(p); } return out; }

console.log("\n=== PHASE 18N ANTI-DEMO-DATA PRIVACY AUDIT ===");

const implementation = read("src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT.md");
const checklist = read("docs/qa/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18n_anti_demo_data_privacy_audit_fixture.json");
const pkg = read("package.json");

let fixture;
try { fixture = JSON.parse(fixtureText); pass("fixture JSON parses"); } catch (error) { fail("fixture JSON does not parse: " + error.message); }
if (fixture.phase !== "18N") fail("fixture phase is not 18N");
pass("fixture phase is 18N");

for (const marker of [
  "Phase18PrivacySensitivityDomain",
  "Phase18AntiDemoDataRule",
  "Phase18PrivacyRule",
  "Phase18SafetyRule",
  "Phase18AntiDemoDataPrivacyAuditSummary",
  "PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_BOUNDARY",
  "PHASE_18N_PRIVACY_SENSITIVITY_DOMAINS",
  "PHASE_18N_ANTI_DEMO_DATA_RULES",
  "PHASE_18N_PRIVACY_RULES",
  "PHASE_18N_SAFETY_RULES",
  "summarizePhase18AntiDemoDataPrivacyAudit",
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
  "analytics_snapshot",
  "metric_quality",
  "trend_comparison_correlation",
  "self_experiment",
  "experiment_evaluation",
  "carnos_explanation",
  "local_runtime_adapter",
  "memory_candidate",
  "privacy_boundary",
  "no_demo_analytics_values",
  "no_fake_metric_values",
  "no_fake_experiment_results",
  "no_fake_carnos_explanations",
  "no_synthetic_user_context_in_runtime",
  "fixture_data_must_stay_in_docs",
  "empty_state_must_not_pretend_data_exists",
  "cached_context_requires_disclosure",
  "stale_context_requires_disclosure",
  "partial_context_requires_disclosure",
  "missing_context_requires_disclosure",
  "unsynced_context_requires_disclosure",
  "deterministic_preview_requires_disclosure",
  "offline_context_is_not_current_info",
  "local_context_is_not_online_source_of_truth",
  "privacy_restricted_context_blocks_explanation",
  "sensitive_context_requires_review",
  "no_causality_claims",
  "no_proof_claims",
  "review_before_memory_write",
  "action_execution_disabled",
  "model_calls_disabled",
  "network_calls_disabled",
  "supabase_runtime_calls_disabled",
  "schema_writes_disabled",
  "embedding_calls_disabled",
  "vector_search_disabled",
  "local_runtime_not_required"
]) { includes("implementation", implementation, marker); includes("fixture", fixtureText, marker); }

for (const marker of [
  "anti-demo-data audit",
  "anti-fake-analytics audit",
  "anti-fake-experiment audit",
  "analytics privacy/sensitivity audit",
  "self-experiment privacy/sensitivity audit",
  "Carnos explanation privacy/sensitivity audit",
  "local runtime privacy/sensitivity audit",
  "source-state disclosure audit",
  "cached context disclosure audit",
  "stale context disclosure audit",
  "partial context disclosure audit",
  "missing context disclosure audit",
  "unsynced context disclosure audit",
  "deterministic preview disclosure audit",
  "no-causality claim audit",
  "no-proof claim audit",
  "review-before-memory-write audit",
  "no action execution audit",
  "no model-call audit",
  "no network-call audit",
  "no Supabase-runtime-call audit",
  "no schema-write audit",
  "no embeddings/vector-search audit",
  "no local-runtime-required audit",
  "cached context must be disclosed",
  "stale context must be disclosed",
  "partial context must be disclosed",
  "missing context must be disclosed",
  "unsynced local context must be disclosed",
  "deterministic preview must be disclosed",
  "offline context is not live/current info",
  "local/offline context is not online source of truth",
  "unsynced context is not synced context",
  "privacy-restricted context must be blocked or explicitly represented",
  "review-before-memory-write remains required",
  "action execution remains disabled",
  "local runtime remains optional during CI/build/checks",
  "Option C local runtime boundary remains future-compatible",
  "no database read/write",
  "no new SQL migration",
  "no Supabase client",
  "no local model call",
  "no cloud model call",
  "no embedding call",
  "no vector search",
  "no memory write",
  "no action execution"
]) includes("contract", contract, marker);

for (const marker of ["Anti-demo-data audit exists", "Anti-fake-analytics audit exists", "Anti-fake-experiment audit exists", "Analytics privacy/sensitivity audit exists", "Self-experiment privacy/sensitivity audit exists", "Carnos explanation privacy/sensitivity audit exists", "Local runtime privacy/sensitivity audit exists", "Source-state disclosure audit exists", "Cached context disclosure audit exists", "Stale context disclosure audit exists", "Partial context disclosure audit exists", "Missing context disclosure audit exists", "Unsynced context disclosure audit exists", "Deterministic preview disclosure audit exists", "No-causality claim audit exists", "No-proof claim audit exists", "Review-before-memory-write audit exists", "No action execution audit exists", "No model-call audit exists", "No network-call audit exists", "No Supabase-runtime-call audit exists", "No schema-write audit exists", "No embeddings/vector-search audit exists", "No local-runtime-required audit exists", "npm run audit:phase18n", "npm run check"]) includes("checklist", checklist, marker);

for (const marker of ["Phase 18N Anti-Demo-Data + Privacy/Sensitivity Audit Report", "anti-demo-data and privacy/sensitivity audit", "anti-fake analytics and experiment audits exist", "source-state disclosures are represented", "no-causality and no-proof rules are represented", "review-before-memory-write is represented", "local Carnos runtime remains optional", "No database read/write is added", "No new SQL migration is added", "No Supabase client is added", "No local or cloud model call is added", "No embedding call or vector search is added", "No memory write is added", "No action execution is added"]) includes("report", report, marker);

includes("index", index, "export * from \"./anti-demo-data-privacy-audit\"");
includes("package.json", pkg, "\"audit:phase18n\"");
includes("package.json", pkg, "npm run audit:phase18m_b && npm run audit:phase18n");
includes("package.json", pkg, "npm run audit:phase18n && npm run build");

const runtimeFiles = [
  ...walk("src/lib/analytics-experiments", [".ts", ".tsx"]),
  ...walk("src/components/analytics-experiments", [".ts", ".tsx"]),
  "src/app/analytics/page.tsx"
].filter((path) => existsSync(path));

for (const path of runtimeFiles) {
  const text = readFileSync(path, "utf8");
  for (const marker of ["createSupabaseServerClient", ".from(", "insert(", "update(", "delete(", "upsert(", "fetch(", "generateText", "streamText", "openai", "OpenAI", "navigator.mediaDevices", "setInterval(", "setTimeout(", "speechSynthesis", "createProposedAction", "executeApprovedAction"]) excludes(path, text, marker);
  for (const marker of ["proof-of-causality", "causal proof", "guaranteed result", "auto-write memory", "auto execute action"]) excludes(path, text, marker);
}

console.log("\n✓ Phase 18N anti-demo-data privacy/sensitivity audit passed.");
