import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "src/lib/current-info-contracts/current-info-enums.ts",
  "src/lib/current-info-contracts/current-info-contracts.ts",
  "src/lib/current-info-contracts/current-info-validators.ts",
  "src/lib/current-info-contracts/index.ts",
  "docs/contracts/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS.md",
  "docs/phase-reports/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS_REPORT.md",
  "docs/qa/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16c.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const markerChecks = [
  [
    "src/lib/current-info-contracts/current-info-enums.ts",
    [
      "Phase 16C",
      "CURRENT_INFO_QUERY_KINDS",
      "CURRENT_INFO_SOURCE_KINDS",
      "CURRENT_INFO_RELIABILITY_LABELS",
      "CURRENT_INFO_FRESHNESS_LABELS",
      "CURRENT_INFO_CANDIDATE_STATUSES",
      "CURRENT_INFO_DESTINATION_SUGGESTIONS",
      "CURRENT_INFO_AUDIT_EVENT_TYPES",
      "CURRENT_INFO_BLOCKED_REASONS",
      "job_search",
      "company_research",
      "lab_search",
      "professor_search",
      "paper_search",
      "documentation_lookup",
      "health_current_info",
      "legal_current_info",
      "financial_current_info",
      "job_posting",
      "company_page",
      "lab_page",
      "professor_page",
      "paper",
      "documentation",
      "official",
      "primary_source",
      "academic",
      "reputable_secondary",
      "community",
      "unknown",
      "live_or_recent",
      "possibly_stale",
      "save_web_source_to_knowledge_candidate",
      "create_job_application_from_web_source_candidate",
      "create_research_literature_item_from_web_source_candidate",
      "create_target_lab_from_web_source_candidate",
      "create_target_professor_from_web_source_candidate",
      "private_mode_blocks_query_retention",
      "weak_source_for_high_stakes_topic",
      "provider_boundary_not_active",
      "raw_full_page_storage_deferred",
      "PHASE_16C_CURRENT_INFO_ENUM_BOUNDARY",
    ],
  ],
  [
    "src/lib/current-info-contracts/current-info-contracts.ts",
    [
      "CurrentInfoCitationContract",
      "CurrentInfoQueryContract",
      "CurrentInfoSourceContract",
      "CurrentInfoCandidateContract",
      "CurrentInfoReviewDecisionContract",
      "CurrentInfoAuditEventContract",
      "CurrentInfoValidationResult",
      "CurrentInfoSafetyGateResult",
      "requires_user_review: true",
      "can_autosave: false",
      "can_auto_memory_convert: false",
      "DEFAULT_CURRENT_INFO_QUERY_CONTRACT",
      "DEFAULT_CURRENT_INFO_CITATION_CONTRACT",
      "DEFAULT_CURRENT_INFO_SOURCE_CONTRACT",
      "DEFAULT_CURRENT_INFO_CANDIDATE_CONTRACT",
      "PHASE_16C_CURRENT_INFO_CONTRACT_BOUNDARY",
    ],
  ],
  [
    "src/lib/current-info-contracts/current-info-validators.ts",
    [
      "validateCurrentInfoCitation",
      "validateCurrentInfoQuery",
      "validateCurrentInfoSource",
      "validateCurrentInfoCandidate",
      "evaluateCurrentInfoSafetyGate",
      "createCurrentInfoValidationSummary",
      "isHighStakesCurrentInfoQueryKind",
      "internet candidates must require user review",
      "internet candidates must not autosave",
      "internet candidates must not automatically become memory",
      "private mode should block query retention by default",
      "PHASE_16C_CURRENT_INFO_VALIDATOR_BOUNDARY",
    ],
  ],
  [
    "src/lib/current-info-contracts/index.ts",
    [
      'export * from "./current-info-enums";',
      'export * from "./current-info-contracts";',
      'export * from "./current-info-validators";',
    ],
  ],
  [
    "docs/contracts/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS.md",
    [
      "Phase 16C",
      "Current-Info Types, Enums, and Validators",
      "current-info query kinds",
      "source kinds",
      "citation contracts",
      "reliability labels",
      "freshness labels",
      "destination suggestion contracts",
      "blocked reasons",
      "Carnos may search, summarize, cite, classify, and suggest where internet content belongs.",
      "Carnos may not silently save, remember, apply, email, or modify records from internet content.",
      "Private mode blocks query retention by default.",
      "Full-page raw content storage remains deferred.",
      "Phase 16D — Search Provider Boundary + Noop Provider",
    ],
  ],
  [
    "docs/phase-reports/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS_REPORT.md",
    [
      "Status: Complete",
      "Current-info query kind enums",
      "Citation contract",
      "High-stakes current-info safety gate",
      "contract-only",
      "No runtime search provider",
      "Phase 16D — Search Provider Boundary + Noop Provider",
    ],
  ],
  [
    "docs/qa/PHASE_16C_CURRENT_INFO_TYPES_ENUMS_VALIDATORS_SMOKE_CHECKLIST.md",
    [
      "No SQL migration is added in Phase 16C",
      "No runtime search provider is added",
      "No network calls are added",
      "No Supabase calls are added",
      "No automatic memory conversion is added",
      "`npm run audit:phase16c` passes",
    ],
  ],
];

const forbiddenInSource = [
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
  "setInterval(",
  "setTimeout(",
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "executeApprovedAction(",
  "createProposedAction(",
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

function assert(condition, message) {
  if (!condition) {
    console.error(`✗ ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

console.log("\n=== PHASE 16C CURRENT-INFO TYPES / ENUMS / VALIDATORS AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Found ${file}`);
}

for (const [file, markers] of markerChecks) {
  const content = read(file);
  for (const marker of markers) {
    assert(content.includes(marker), `${file} includes marker: ${marker}`);
  }
}

const sourceFiles = [
  "src/lib/current-info-contracts/current-info-enums.ts",
  "src/lib/current-info-contracts/current-info-contracts.ts",
  "src/lib/current-info-contracts/current-info-validators.ts",
  "src/lib/current-info-contracts/index.ts",
];

for (const file of sourceFiles) {
  const content = read(file);
  for (const marker of forbiddenInSource) {
    assert(!content.includes(marker), `${file} avoids forbidden marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden runtime path absent: ${path}`);
}

const migrationFiles = readdirSync("supabase/migrations").filter((file) =>
  file.includes("phase16"),
);

assert(
  migrationFiles.includes("0026_phase16_web_source_sql_foundation.sql"),
  "Existing Phase 16B web source SQL migration remains present",
);

assert(
  migrationFiles.includes("0027_phase16_web_source_parent_ownership_guards.sql"),
  "Existing Phase 16B parent ownership guard migration remains present",
);

assert(
  !migrationFiles.some((file) => file.includes("16c")),
  "No Phase 16C SQL migration was added",
);

const packageJson = read("package.json");
assert(packageJson.includes('"audit:phase16c"'), "package.json includes audit:phase16c");
assert(packageJson.includes("npm run audit:phase16c"), "npm run check includes audit:phase16c");

for (const file of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  const content = read(file);
  assert(content.includes("Phase 16C"), `${file} includes Phase 16C`);
  assert(
    content.includes("Current-Info Types, Enums, and Validators"),
    `${file} includes Current-Info Types, Enums, and Validators`,
  );
}

assert(
  read("PHASE_STATUS.md").includes("Phase 16D"),
  "PHASE_STATUS.md points to Phase 16D",
);

console.log("\nPhase 16C current-info types, enums, and validators audit passed.");
