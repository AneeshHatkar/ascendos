import { existsSync, readFileSync, readdirSync } from "fs";

const requiredFiles = [
  "src/lib/current-info-provider/current-info-provider-types.ts",
  "src/lib/current-info-provider/provider-boundary.ts",
  "src/lib/current-info-provider/noop-current-info-provider.ts",
  "src/lib/current-info-provider/index.ts",
  "docs/contracts/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER.md",
  "docs/phase-reports/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER_REPORT.md",
  "docs/qa/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16d.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const providerFiles = [
  "src/lib/current-info-provider/current-info-provider-types.ts",
  "src/lib/current-info-provider/provider-boundary.ts",
  "src/lib/current-info-provider/noop-current-info-provider.ts",
  "src/lib/current-info-provider/index.ts",
];

const requiredMarkers = new Map([
  [
    "src/lib/current-info-provider/current-info-provider-types.ts",
    [
      "Phase 16D",
      "CurrentInfoProviderRequest",
      "CurrentInfoProviderResult",
      "CurrentInfoProviderSourcePreview",
      "CurrentInfoProviderBoundary",
      "CurrentInfoProviderBlockedReason",
      "PHASE_16D_CURRENT_INFO_PROVIDER_BOUNDARY",
      "real_provider_active: false",
      "network_calls_allowed: false",
      "browser_side_secrets_allowed: false",
      "background_browsing_allowed: false",
      "source_persistence_allowed: false",
      "automatic_memory_conversion_allowed: false",
      "automatic_record_write_allowed: false",
    ],
  ],
  [
    "src/lib/current-info-provider/provider-boundary.ts",
    [
      "createCurrentInfoProviderRequest",
      "getCurrentInfoProviderBlockedReasons",
      "createBlockedCurrentInfoProviderResult",
      "evaluateCurrentInfoProviderBoundary",
      "provider_boundary_not_active",
      "private_mode_blocks_query_retention",
      "high_stakes_topic_requires_extra_review",
      "No real current-info provider is activated.",
    ],
  ],
  [
    "src/lib/current-info-provider/noop-current-info-provider.ts",
    [
      "NoopCurrentInfoProvider",
      "noopCurrentInfoProvider",
      "searchWithNoopCurrentInfoProvider",
      "blocked boundary result",
    ],
  ],
  [
    "src/lib/current-info-provider/index.ts",
    [
      'export * from "./current-info-provider-types";',
      'export * from "./provider-boundary";',
      'export * from "./noop-current-info-provider";',
    ],
  ],
  [
    "docs/contracts/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER.md",
    [
      "Phase 16D",
      "Search Provider Boundary + Noop Provider",
      "No real provider activation",
      "No network calls",
      "No browser-side secrets",
      "No automatic memory conversion",
      "Phase 16E",
    ],
  ],
  [
    "docs/phase-reports/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER_REPORT.md",
    [
      "Status: Complete",
      "No runtime search provider is active",
      "No network calls are introduced",
      "No automatic save behavior is introduced",
      "Phase 16E",
    ],
  ],
  [
    "docs/qa/PHASE_16D_SEARCH_PROVIDER_BOUNDARY_NOOP_PROVIDER_SMOKE_CHECKLIST.md",
    [
      "No real provider is activated",
      "No network calls are added",
      "No browser-side secrets are added",
      "`npm run audit:phase16d` passes",
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
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
];

const forbiddenRuntimePaths = [
  "src/components/current-info",
  "src/app/current-info",
  "src/app/web-search",
  "src/lib/web-search",
  "src/lib/vector",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

console.log("\n=== PHASE 16D SEARCH PROVIDER BOUNDARY / NOOP PROVIDER AUDIT ===");

for (const file of requiredFiles) {
  if (existsSync(file)) {
    pass(`Found ${file}`);
  } else {
    fail(`Missing ${file}`);
  }
}

for (const [file, markers] of requiredMarkers.entries()) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of markers) {
    if (text.includes(marker)) {
      pass(`${file} includes marker: ${marker}`);
    } else {
      fail(`${file} missing marker: ${marker}`);
    }
  }
}

for (const file of providerFiles) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of forbiddenMarkers) {
    if (text.includes(marker)) {
      fail(`${file} contains forbidden marker: ${marker}`);
    } else {
      pass(`${file} avoids forbidden marker: ${marker}`);
    }
  }
}

for (const forbiddenPath of forbiddenRuntimePaths) {
  if (existsSync(forbiddenPath)) {
    fail(`Forbidden runtime path exists: ${forbiddenPath}`);
  } else {
    pass(`Forbidden runtime path absent: ${forbiddenPath}`);
  }
}

if (existsSync("supabase/migrations")) {
  const migrations = readdirSync("supabase/migrations");
  const phase16dMigrations = migrations.filter((file) =>
    file.toLowerCase().includes("16d"),
  );

  if (phase16dMigrations.length === 0) {
    pass("No Phase 16D SQL migration was added");
  } else {
    fail(`Unexpected Phase 16D migration(s): ${phase16dMigrations.join(", ")}`);
  }

  if (migrations.includes("0026_phase16_web_source_sql_foundation.sql")) {
    pass("Existing web source SQL migration remains present");
  } else {
    fail("Missing existing web source SQL migration");
  }

  if (migrations.includes("0027_phase16_web_source_parent_ownership_guards.sql")) {
    pass("Existing web source ownership guard migration remains present");
  } else {
    fail("Missing existing web source ownership guard migration");
  }
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["audit:phase16d"] === "node scripts/audit-phase-16d.mjs") {
  pass("package.json includes audit:phase16d");
} else {
  fail("package.json missing audit:phase16d");
}

if (packageJson.scripts?.check?.includes("npm run audit:phase16d")) {
  pass("npm run check includes audit:phase16d");
} else {
  fail("npm run check does not include audit:phase16d");
}

const logMarkers = [
  ["PROJECT_EXECUTION_LOG.md", "Search Provider Boundary + Noop Provider"],
  ["CODE_LEDGER.md", "Search Provider Boundary + Noop Provider"],
  ["CHANGELOG.md", "Search Provider Boundary + Noop Provider"],
  ["PHASE_STATUS.md", "Search Provider Boundary + Noop Provider"],
  ["PHASE_STATUS.md", "Query Classifier + Current-Info Safety Gate"],
];

for (const [file, marker] of logMarkers) {
  if (!existsSync(file)) {
    fail(`Missing ${file}`);
    continue;
  }

  if (read(file).includes(marker)) {
    pass(`${file} includes ${marker}`);
  } else {
    fail(`${file} missing ${marker}`);
  }
}

if (process.exitCode) {
  console.error("\nPhase 16D search provider boundary / noop provider audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 16D search provider boundary / noop provider audit passed.");
