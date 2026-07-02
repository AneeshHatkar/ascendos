import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/dashboard/current-info-ui-components.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_CONTRACT.md",
  "docs/phase-reports/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_REPORT.md",
  "docs/qa/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16j.mjs",
  "package.json",
];

const markers = {
  "src/components/dashboard/current-info-ui-components.tsx": [
    "CurrentInfoDashboardPanelV1",
    "CurrentInfoStatusBadge",
    "CurrentInfoMetricGrid",
    "CurrentInfoBreakdownList",
    "CurrentInfoSourcePreviewList",
    "CurrentInfoCandidateReviewPreview",
    "CurrentInfoQueryAuditPreview",
    "CurrentInfoDashboardDataResult",
    "WebSourceRow",
    "WebSourceCandidateRow",
    "WebSearchQueryRow",
    "WebSourceAuditEventRow",
    "source_kind_breakdown",
    "reliability_breakdown",
    "freshness_breakdown",
    "PHASE_16J_CURRENT_INFO_UI_BOUNDARY",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./current-info-ui-components";',
  ],
  "docs/contracts/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_CONTRACT.md": [
    "Phase 16J",
    "Current-Info UI Components Contract",
    "read-only",
    "current-info metric grid",
    "candidate review preview list",
    "16K — Carnos Current-Info Integration",
  ],
  "docs/phase-reports/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_REPORT.md": [
    "Phase 16J",
    "current-info-ui-components.tsx",
    "No data fetching",
    "provider calls",
    "memory conversion",
  ],
  "docs/qa/PHASE_16J_CURRENT_INFO_UI_COMPONENTS_SMOKE_CHECKLIST.md": [
    "Current-info UI component file exists",
    "Dashboard export exists",
    "No route is created",
    "No write operation is added",
  ],
  "package.json": [
    "audit:phase16j",
  ],
};

const forbiddenInComponent = [
  "createSupabaseServerClient",
  "createSupabaseBrowserClient",
  ".from(",
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".rpc(",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "executeApprovedAction(",
  "createProposedAction(",
  "approveCurrentInfo",
  "rejectCurrentInfo",
  "memory_embeddings",
];

const forbiddenFiles = [
  "src/app/current-info/page.tsx",
  "src/app/api/current-info/route.ts",
  "supabase/migrations/0028_phase16j_current_info_ui.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16J CURRENT-INFO UI COMPONENTS AUDIT ===");

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

const componentText = read("src/components/dashboard/current-info-ui-components.tsx");

for (const marker of forbiddenInComponent) {
  assert(!componentText.includes(marker), `UI component includes forbidden marker: ${marker}`);
  console.log(`✓ UI component avoids forbidden marker: ${marker}`);
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16J file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));

for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16j"),
    `${script} must include audit:phase16j`,
  );
}

console.log("✓ verification chain includes audit:phase16j");
console.log("\nPhase 16J audit passed: current-info UI components are present, exported, documented, and read-only.");
