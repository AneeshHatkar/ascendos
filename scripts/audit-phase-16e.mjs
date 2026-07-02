import { existsSync, readFileSync, readdirSync } from "fs";

const requiredFiles = [
  "src/lib/current-info-safety/current-info-query-classifier.ts",
  "src/lib/current-info-safety/current-info-safety-gate.ts",
  "src/lib/current-info-safety/index.ts",
  "docs/contracts/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE.md",
  "docs/phase-reports/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE_REPORT.md",
  "docs/qa/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16e.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const sourceFiles = [
  "src/lib/current-info-safety/current-info-query-classifier.ts",
  "src/lib/current-info-safety/current-info-safety-gate.ts",
  "src/lib/current-info-safety/index.ts",
];

const markers = new Map([
  [
    "src/lib/current-info-safety/current-info-query-classifier.ts",
    [
      "Phase 16E",
      "CurrentInfoQueryClass",
      "CurrentInfoQueryRiskLevel",
      "CurrentInfoQueryClassificationReason",
      "CurrentInfoQueryClassification",
      "classifyCurrentInfoQuery",
      "job_search",
      "company_research",
      "lab_or_professor_search",
      "paper_or_literature_search",
      "documentation_lookup",
      "current_resource_lookup",
      "high_stakes_current_info",
      "unsupported_current_info",
      "requires_citations: true",
      "requires_reliability_notes: true",
      "requires_freshness_notes: true",
      "requires_review_before_save: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
    ],
  ],
  [
    "src/lib/current-info-safety/current-info-safety-gate.ts",
    [
      "Phase 16E",
      "CurrentInfoSafetyGateDecision",
      "CurrentInfoSafetyGateResult",
      "evaluateCurrentInfoSafetyGate",
      "allowed_for_noop_provider",
      "blocked_by_private_mode",
      "requires_high_stakes_review",
      "blocked_as_unsupported",
      "blocked_by_provider_boundary",
      "can_call_real_provider: false",
      "can_autosave: false",
      "can_auto_memory_convert: false",
      "requires_user_review: true",
      "provider_boundary_blocks_runtime_search",
    ],
  ],
  [
    "src/lib/current-info-safety/index.ts",
    [
      'export * from "./current-info-query-classifier";',
      'export * from "./current-info-safety-gate";',
    ],
  ],
  [
    "docs/contracts/PHASE_16E_QUERY_CLASSIFIER_CURRENT_INFO_SAFETY_GATE.md",
    [
      "Phase 16E",
      "Query Classifier + Current-Info Safety Gate",
      "allowed_for_noop_provider",
      "blocked_by_private_mode",
      "requires_high_stakes_review",
      "blocked_as_unsupported",
      "No real provider activation",
      "No network calls",
      "No automatic memory conversion",
      "Phase 16F",
    ],
  ],
]);

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  ".rpc(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "createServerClient",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
];

const forbiddenPaths = [
  "src/components/current-info",
  "src/app/current-info",
  "src/app/web-search",
  "src/lib/web-search",
  "src/lib/vector",
];

function read(path) {
  return readFileSync(path, "utf8");
}

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
}

for (const [file, requiredMarkers] of markers.entries()) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of requiredMarkers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
  }
}

for (const file of sourceFiles) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of forbiddenMarkers) {
    assert(!text.includes(marker), `${file} contains forbidden marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden runtime path exists: ${path}`);
}

if (existsSync("supabase/migrations")) {
  const migrations = readdirSync("supabase/migrations");
  const phase16eMigrations = migrations.filter((file) =>
    file.toLowerCase().includes("16e"),
  );
  assert(
    phase16eMigrations.length === 0,
    `Unexpected Phase 16E migration(s): ${phase16eMigrations.join(", ")}`,
  );
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["audit:phase16e"] === "node scripts/audit-phase-16e.mjs",
  "package.json missing audit:phase16e",
);

assert(
  packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16e") ||
    packageJson.scripts?.check?.includes("npm run audit:phase16e"),
  "check chain missing audit:phase16e",
);

const logMarkers = [
  ["PROJECT_EXECUTION_LOG.md", "Query Classifier + Current-Info Safety Gate"],
  ["CODE_LEDGER.md", "Query Classifier + Current-Info Safety Gate"],
  ["CHANGELOG.md", "Query Classifier + Current-Info Safety Gate"],
  ["PHASE_STATUS.md", "Query Classifier + Current-Info Safety Gate"],
  ["PHASE_STATUS.md", "Citation, Reliability, and Freshness Engine"],
];

for (const [file, marker] of logMarkers) {
  assert(existsSync(file), `Missing ${file}`);
  if (existsSync(file)) {
    assert(read(file).includes(marker), `${file} missing marker: ${marker}`);
  }
}

if (errors.length > 0) {
  console.error("Phase 16E audit failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Phase 16E audit passed: query classifier and current-info safety gate are present, exported, documented, and boundary-protected.");
