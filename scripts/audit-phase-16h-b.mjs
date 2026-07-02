import { existsSync, readFileSync, readdirSync } from "fs";

const requiredFiles = [
  "src/lib/current-info-capture/current-info-duplicate-detector.ts",
  "src/lib/current-info-capture/index.ts",
  "docs/contracts/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_CONTRACT.md",
  "docs/phase-reports/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_REPORT.md",
  "docs/qa/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16h-b.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const sourceFiles = [
  "src/lib/current-info-capture/current-info-duplicate-detector.ts",
  "src/lib/current-info-capture/index.ts",
];

const markerMap = new Map([
  [
    "src/lib/current-info-capture/current-info-duplicate-detector.ts",
    [
      "Phase 16H-B",
      "CurrentInfoDuplicateDetectionStatus",
      "CurrentInfoDuplicateSignal",
      "CurrentInfoDuplicateDetectionInput",
      "CurrentInfoDuplicateDetectionResult",
      "detectCurrentInfoSourceCandidateDuplicates",
      "no_duplicate_detected",
      "possible_duplicate_detected",
      "likely_duplicate_detected",
      "duplicate_detection_needs_review",
      "normalized_url_match",
      "title_match",
      "publisher_match",
      "citation_label_match",
      "requires_user_review: true",
      "can_merge_automatically: false",
      "can_persist_sources: false",
      "can_autosave: false",
      "can_auto_memory_convert: false",
    ],
  ],
  [
    "src/lib/current-info-capture/index.ts",
    [
      'export * from "./current-info-source-candidate";',
      'export * from "./current-info-destination-router";',
      'export * from "./current-info-duplicate-detector";',
    ],
  ],
  [
    "docs/contracts/PHASE_16H_B_CURRENT_INFO_DUPLICATE_DETECTION_CONTRACT.md",
    [
      "Phase 16H-B",
      "Current-Info Duplicate Detection Contract",
      "No SQL writes",
      "No source persistence",
      "No automatic merge",
      "No automatic memory conversion",
      "Phase 16I",
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

if (existsSync("supabase/migrations")) {
  const migrations = readdirSync("supabase/migrations");
  const phase16hBMigrations = migrations.filter((file) =>
    file.toLowerCase().includes("16h_b") || file.toLowerCase().includes("16h-b"),
  );

  assert(
    phase16hBMigrations.length === 0,
    `Unexpected Phase 16H-B migration(s): ${phase16hBMigrations.join(", ")}`,
  );
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["audit:phase16h_b"] === "node scripts/audit-phase-16h-b.mjs",
  "package.json missing audit:phase16h_b",
);

assert(
  packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16h_b") ||
    packageJson.scripts?.check?.includes("npm run audit:phase16h_b"),
  "check chain missing audit:phase16h_b",
);

const logMarkers = [
  ["PROJECT_EXECUTION_LOG.md", "Current-Info Duplicate Detection"],
  ["CODE_LEDGER.md", "Current-Info Duplicate Detection"],
  ["CHANGELOG.md", "Current-Info Duplicate Detection"],
  ["PHASE_STATUS.md", "Current-Info Duplicate Detection"],
  ["PHASE_STATUS.md", "Web Current-Info Read Repository + Dashboard Helpers"],
];

for (const [file, marker] of logMarkers) {
  assert(existsSync(file), `Missing ${file}`);

  if (existsSync(file)) {
    assert(read(file).includes(marker), `${file} missing marker: ${marker}`);
  }
}

if (errors.length > 0) {
  console.error("Phase 16H-B audit failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Phase 16H-B audit passed: duplicate detection contract is present, exported, documented, and boundary-protected.");
