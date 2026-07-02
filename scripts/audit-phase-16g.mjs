import { existsSync, readFileSync, readdirSync } from "fs";

const requiredFiles = [
  "src/lib/current-info-capture/current-info-source-candidate.ts",
  "src/lib/current-info-capture/current-info-destination-router.ts",
  "src/lib/current-info-capture/index.ts",
  "docs/contracts/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER.md",
  "docs/phase-reports/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER_REPORT.md",
  "docs/qa/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16g.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const sourceFiles = [
  "src/lib/current-info-capture/current-info-source-candidate.ts",
  "src/lib/current-info-capture/current-info-destination-router.ts",
  "src/lib/current-info-capture/index.ts",
];

const markerMap = new Map([
  [
    "src/lib/current-info-capture/current-info-source-candidate.ts",
    [
      "Phase 16G",
      "CurrentInfoSourceCandidateStatus",
      "CurrentInfoSourceCandidateKind",
      "CurrentInfoSourceCandidateInput",
      "CurrentInfoSourceCandidate",
      "captureCurrentInfoSourceCandidate",
      "rejectCurrentInfoSourceCandidateForReview",
      "candidate_captured",
      "candidate_missing_url",
      "candidate_missing_title",
      "candidate_rejected_for_review",
      "is_persisted: false",
      "requires_user_review: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
    ],
  ],
  [
    "src/lib/current-info-capture/current-info-destination-router.ts",
    [
      "Phase 16G",
      "CurrentInfoDestinationRoute",
      "CurrentInfoDestinationRouterReason",
      "CurrentInfoDestinationRouterInput",
      "CurrentInfoDestinationRouterResult",
      "routeCurrentInfoDestination",
      "job_search_review",
      "company_research_review",
      "professor_lab_review",
      "research_paper_review",
      "documentation_review",
      "current_resource_review",
      "manual_review",
      "route_is_suggestion_only: true",
      "requires_user_review: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
      "can_execute_action: false",
    ],
  ],
  [
    "src/lib/current-info-capture/index.ts",
    [
      'export * from "./current-info-source-candidate";',
      'export * from "./current-info-destination-router";',
    ],
  ],
  [
    "docs/contracts/PHASE_16G_SOURCE_CANDIDATE_CAPTURE_DESTINATION_ROUTER.md",
    [
      "Phase 16G",
      "Source Candidate Capture + Destination Router",
      "job_search_review",
      "company_research_review",
      "professor_lab_review",
      "research_paper_review",
      "documentation_review",
      "current_resource_review",
      "manual_review",
      "No SQL writes",
      "No source persistence",
      "No automatic memory conversion",
      "Phase 16H",
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

for (const [file, markers] of markerMap.entries()) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of markers) {
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
  const phase16gMigrations = migrations.filter((file) =>
    file.toLowerCase().includes("16g"),
  );

  assert(
    phase16gMigrations.length === 0,
    `Unexpected Phase 16G migration(s): ${phase16gMigrations.join(", ")}`,
  );
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["audit:phase16g"] === "node scripts/audit-phase-16g.mjs",
  "package.json missing audit:phase16g",
);

assert(
  packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16g") ||
    packageJson.scripts?.check?.includes("npm run audit:phase16g"),
  "check chain missing audit:phase16g",
);

const logMarkers = [
  ["PROJECT_EXECUTION_LOG.md", "Source Candidate Capture + Destination Router"],
  ["CODE_LEDGER.md", "Source Candidate Capture + Destination Router"],
  ["CHANGELOG.md", "Source Candidate Capture + Destination Router"],
  ["PHASE_STATUS.md", "Source Candidate Capture + Destination Router"],
  ["PHASE_STATUS.md", "Current-Info Review Queue Contract"],
];

for (const [file, marker] of logMarkers) {
  assert(existsSync(file), `Missing ${file}`);

  if (existsSync(file)) {
    assert(read(file).includes(marker), `${file} missing marker: ${marker}`);
  }
}

if (errors.length > 0) {
  console.error("Phase 16G audit failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Phase 16G audit passed: source candidate capture and destination router are present, exported, documented, and boundary-protected.");
