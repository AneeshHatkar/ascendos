import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/repositories/current-info-read.ts",
  "src/lib/dashboard/current-info-dashboard-data-helpers.ts",
  "src/lib/repositories/index.ts",
  "src/lib/dashboard/index.ts",
  "docs/contracts/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_CONTRACT.md",
  "docs/phase-reports/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_REPORT.md",
  "docs/qa/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16i.mjs",
  "package.json",
];

const markers = {
  "src/lib/repositories/current-info-read.ts": [
    "WebSearchQueryRow",
    "WebSourceRow",
    "WebSourceCandidateRow",
    "WebSourceLinkRow",
    "WebSourceAuditEventRow",
    "listWebSearchQueries",
    "listWebSources",
    "listWebSourceCandidates",
    "listWebSourceLinks",
    "listWebSourceAuditEvents",
    "web_search_queries",
    "web_sources",
    "web_source_candidates",
    "web_source_links",
    "web_source_audit_events",
    "createSupabaseServerClient",
    "user_id",
    "limitFor",
    "PHASE_16I_CURRENT_INFO_READ_REPOSITORY_BOUNDARY",
  ],
  "src/lib/dashboard/current-info-dashboard-data-helpers.ts": [
    "CurrentInfoDashboardSummary",
    "CurrentInfoDashboardDataResult",
    "getCurrentInfoDashboardDataSummary",
    "EMPTY_CURRENT_INFO_DASHBOARD_SUMMARY",
    "recent_query_count",
    "executed_query_count",
    "blocked_query_count",
    "recent_source_count",
    "private_source_count",
    "pending_review_candidate_count",
    "approved_candidate_count",
    "rejected_candidate_count",
    "blocked_candidate_count",
    "source_link_count",
    "audit_event_count",
    "source_kind_breakdown",
    "reliability_breakdown",
    "freshness_breakdown",
    "PHASE_16I_CURRENT_INFO_DASHBOARD_HELPER_BOUNDARY",
  ],
  "src/lib/repositories/index.ts": [
    'export * from "./current-info-read";',
  ],
  "src/lib/dashboard/index.ts": [
    'export * from "./current-info-dashboard-data-helpers";',
  ],
  "docs/contracts/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_CONTRACT.md": [
    "Phase 16I",
    "Current-Info Read Repository Contract",
    "read-only",
    "web_search_queries",
    "web_sources",
    "web_source_candidates",
    "web_source_links",
    "web_source_audit_events",
    "16J — Current-Info UI Components",
  ],
  "docs/phase-reports/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_REPORT.md": [
    "Status: Complete pending verification",
    "current-info-read.ts",
    "current-info-dashboard-data-helpers.ts",
    "local explicit row types",
    "no provider calls",
    "no network calls",
    "no inserts",
    "no updates",
    "no deletes",
    "no automatic memory conversion",
  ],
  "docs/qa/PHASE_16I_CURRENT_INFO_READ_REPOSITORY_SMOKE_CHECKLIST.md": [
    "Current-info read repository exists",
    "Current-info dashboard helper exists",
    "Dashboard summary includes reliability breakdown",
    "Phase 16I has no write operations",
    "npm run audit:phase16i",
  ],
  "package.json": [
    "audit:phase16i",
  ],
};

const forbiddenInSource = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".rpc(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
  "approveCurrentInfo",
  "rejectCurrentInfo",
  "memory_embeddings",
  "create extension if not exists vector",
];

const forbiddenFiles = [
  "src/app/current-info/page.tsx",
  "src/app/api/current-info/route.ts",
  "supabase/migrations/0028_phase16i_current_info_read_repository.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16I CURRENT-INFO READ REPOSITORY AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const [file, requiredMarkers] of Object.entries(markers)) {
  const text = read(file);

  for (const marker of requiredMarkers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const file of [
  "src/lib/repositories/current-info-read.ts",
  "src/lib/dashboard/current-info-dashboard-data-helpers.ts",
]) {
  const text = read(file);

  for (const marker of forbiddenInSource) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16I file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.check?.includes("audit:phase16i"),
  "npm run check must include audit:phase16i",
);

assert(
  packageJson.scripts?.["check:verbose"]?.includes("audit:phase16i"),
  "npm run check:verbose must include audit:phase16i",
);

assert(
  packageJson.scripts?.["check:quiet"]?.includes("audit:phase16i"),
  "npm run check:quiet must include audit:phase16i",
);

console.log("✓ verification chain includes audit:phase16i");

console.log(
  "\nPhase 16I audit passed: current-info read repository and dashboard helpers are present, exported, documented, and read-only.",
);
