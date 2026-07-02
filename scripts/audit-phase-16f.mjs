import { existsSync, readFileSync, readdirSync } from "fs";

const requiredFiles = [
  "src/lib/current-info-evidence/current-info-citation-engine.ts",
  "src/lib/current-info-evidence/current-info-reliability-engine.ts",
  "src/lib/current-info-evidence/current-info-freshness-engine.ts",
  "src/lib/current-info-evidence/index.ts",
  "docs/contracts/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE.md",
  "docs/phase-reports/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE_REPORT.md",
  "docs/qa/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16f.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const sourceFiles = [
  "src/lib/current-info-evidence/current-info-citation-engine.ts",
  "src/lib/current-info-evidence/current-info-reliability-engine.ts",
  "src/lib/current-info-evidence/current-info-freshness-engine.ts",
  "src/lib/current-info-evidence/index.ts",
];

const markerMap = new Map([
  [
    "src/lib/current-info-evidence/current-info-citation-engine.ts",
    [
      "Phase 16F",
      "CurrentInfoCitationCoverageStatus",
      "CurrentInfoCitationEvidenceInput",
      "CurrentInfoCitationCoverageResult",
      "createCurrentInfoCitationLabel",
      "evaluateCurrentInfoCitationCoverage",
      "citation_ready",
      "missing_sources",
      "missing_citation_labels",
      "insufficient_citation_coverage",
      "requires_citations: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
    ],
  ],
  [
    "src/lib/current-info-evidence/current-info-reliability-engine.ts",
    [
      "Phase 16F",
      "CurrentInfoReliabilityTier",
      "CurrentInfoReliabilityInput",
      "CurrentInfoReliabilityResult",
      "evaluateCurrentInfoReliability",
      "official_or_primary",
      "reputable_secondary",
      "mixed_or_uncertain",
      "low_reliability",
      "unknown_reliability",
      "requires_reliability_notes: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
    ],
  ],
  [
    "src/lib/current-info-evidence/current-info-freshness-engine.ts",
    [
      "Phase 16F",
      "CurrentInfoFreshnessTier",
      "CurrentInfoFreshnessInput",
      "CurrentInfoFreshnessResult",
      "evaluateCurrentInfoFreshness",
      "current",
      "recent",
      "stale",
      "unknown",
      "not_time_sensitive",
      "requires_freshness_notes: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
    ],
  ],
  [
    "src/lib/current-info-evidence/index.ts",
    [
      'export * from "./current-info-citation-engine";',
      'export * from "./current-info-reliability-engine";',
      'export * from "./current-info-freshness-engine";',
    ],
  ],
  [
    "docs/contracts/PHASE_16F_CITATION_RELIABILITY_FRESHNESS_ENGINE.md",
    [
      "Phase 16F",
      "Citation, Reliability, and Freshness Engine",
      "citation coverage",
      "source reliability",
      "source freshness",
      "No network calls",
      "No SQL writes",
      "No automatic memory conversion",
      "Phase 16G",
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
  const phase16fMigrations = migrations.filter((file) =>
    file.toLowerCase().includes("16f"),
  );

  assert(
    phase16fMigrations.length === 0,
    `Unexpected Phase 16F migration(s): ${phase16fMigrations.join(", ")}`,
  );
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.["audit:phase16f"] === "node scripts/audit-phase-16f.mjs",
  "package.json missing audit:phase16f",
);

assert(
  packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16f") ||
    packageJson.scripts?.check?.includes("npm run audit:phase16f"),
  "check chain missing audit:phase16f",
);

const logMarkers = [
  ["PROJECT_EXECUTION_LOG.md", "Citation, Reliability, and Freshness Engine"],
  ["CODE_LEDGER.md", "Citation, Reliability, and Freshness Engine"],
  ["CHANGELOG.md", "Citation, Reliability, and Freshness Engine"],
  ["PHASE_STATUS.md", "Citation, Reliability, and Freshness Engine"],
  ["PHASE_STATUS.md", "Source Candidate Capture Contract"],
];

for (const [file, marker] of logMarkers) {
  assert(existsSync(file), `Missing ${file}`);

  if (existsSync(file)) {
    assert(read(file).includes(marker), `${file} missing marker: ${marker}`);
  }
}

if (errors.length > 0) {
  console.error("Phase 16F audit failed.");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Phase 16F audit passed: citation, reliability, and freshness evidence helpers are present, exported, documented, and boundary-protected.");
