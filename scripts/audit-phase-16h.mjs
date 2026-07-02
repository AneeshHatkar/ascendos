import { existsSync, readFileSync, readdirSync } from "fs";

const requiredFiles = [
  "src/lib/current-info-review/current-info-review-queue-item.ts",
  "src/lib/current-info-review/current-info-review-decision.ts",
  "src/lib/current-info-review/index.ts",
  "docs/contracts/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT.md",
  "docs/phase-reports/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT_REPORT.md",
  "docs/qa/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16h.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const sourceFiles = [
  "src/lib/current-info-review/current-info-review-queue-item.ts",
  "src/lib/current-info-review/current-info-review-decision.ts",
  "src/lib/current-info-review/index.ts",
];

const markerMap = new Map([
  [
    "src/lib/current-info-review/current-info-review-queue-item.ts",
    [
      "Phase 16H",
      "CurrentInfoReviewQueueStatus",
      "CurrentInfoReviewQueueReason",
      "CurrentInfoReviewQueueItemInput",
      "CurrentInfoReviewQueueItem",
      "createCurrentInfoReviewQueueItem",
      "blockCurrentInfoReviewQueueItem",
      "queued_for_review",
      "needs_more_evidence",
      "ready_for_user_review",
      "review_blocked",
      "review_completed",
      "is_persisted: false",
      "requires_user_review: true",
      "can_autosave: false",
      "can_persist_sources: false",
      "can_auto_memory_convert: false",
      "can_execute_action: false",
    ],
  ],
  [
    "src/lib/current-info-review/current-info-review-decision.ts",
    [
      "Phase 16H",
      "CurrentInfoReviewDecisionKind",
      "CurrentInfoReviewDecisionReason",
      "CurrentInfoReviewDecisionInput",
      "CurrentInfoReviewDecision",
      "createCurrentInfoReviewDecision",
      "approve_for_save",
      "reject_current_info",
      "request_more_sources",
      "mark_high_stakes",
      "defer_review",
      "can_execute_action: false",
      "can_persist_sources: false",
      "can_auto_memory_convert: false",
      "requires_followup_flow",
    ],
  ],
  [
    "src/lib/current-info-review/index.ts",
    [
      'export * from "./current-info-review-queue-item";',
      'export * from "./current-info-review-decision";',
    ],
  ],
  [
    "docs/contracts/PHASE_16H_CURRENT_INFO_REVIEW_QUEUE_CONTRACT.md",
    [
      "Phase 16H",
      "Current-Info Review Queue Contract",
      "approve_for_save",
      "reject_current_info",
      "request_more_sources",
      "mark_high_stakes",
      "defer_review",
      "No SQL writes",
      "No source persistence",
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
  const phase16hMigrations = migrations.filter((file) =>
    file.toLowerCase().includes("16h"),
  );

  assert(
    phase16hMigrations.length === 0,
    `Unexpected Phase 16H migration(s): ${phase16hMigrations.join(", ")}`,
  );
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["audit:phase16h"] === "node scripts/audit-phase-16h.mjs",
  "package.json missing audit:phase16h",
);

assert(
  packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16h") ||
    packageJson.scripts?.check?.includes("npm run audit:phase16h"),
  "check chain missing audit:phase16h",
);

const logMarkers = [
  ["PROJECT_EXECUTION_LOG.md", "Current-Info Review Queue Contract"],
  ["CODE_LEDGER.md", "Current-Info Review Queue Contract"],
  ["CHANGELOG.md", "Current-Info Review Queue Contract"],
  ["PHASE_STATUS.md", "Current-Info Review Queue Contract"],
  ["PHASE_STATUS.md", "Review-to-Save Source Confirmation Contract"],
];

for (const [file, marker] of logMarkers) {
  assert(existsSync(file), `Missing ${file}`);

  if (existsSync(file)) {
    assert(read(file).includes(marker), `${file} missing marker: ${marker}`);
  }
}

if (errors.length > 0) {
  console.error("Phase 16H audit failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Phase 16H audit passed: current-info review queue contracts are present, exported, documented, and boundary-protected.");
