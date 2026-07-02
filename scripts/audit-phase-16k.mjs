import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/dashboard/carnos-current-info-integration-panel.tsx",
  "src/app/carnos/page.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_CONTRACT.md",
  "docs/phase-reports/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_REPORT.md",
  "docs/qa/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16k.mjs",
  "package.json",
];

const markers = {
  "src/components/dashboard/carnos-current-info-integration-panel.tsx": [
    "CarnosCurrentInfoIntegrationPanel",
    "CurrentInfoDashboardDataResult",
    "WebSourceCandidateRow",
    "WebSourceRow",
    "read-only bridge",
    "Carnos guidance",
    "PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_BOUNDARY",
  ],
  "src/app/carnos/page.tsx": [
    "CarnosCurrentInfoIntegrationPanel",
    "getCurrentInfoDashboardDataSummary",
    "listWebSources",
    "listWebSourceCandidates",
    "currentInfoData",
    "currentInfoSources",
    "currentInfoCandidates",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./carnos-current-info-integration-panel";',
  ],
  "docs/contracts/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_CONTRACT.md": [
    "Phase 16K",
    "Carnos Current-Info Integration Contract",
    "read-only awareness",
    "16L — Career Web Source Integration",
  ],
  "docs/phase-reports/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_REPORT.md": [
    "Phase 16K",
    "read-only Carnos current-info integration panel",
    "without enabling Carnos to browse",
  ],
  "docs/qa/PHASE_16K_CARNOS_CURRENT_INFO_INTEGRATION_SMOKE_CHECKLIST.md": [
    "Carnos current-info integration panel exists",
    "No provider call is added",
    "No write operation is added",
    "No automatic memory conversion is added",
  ],
  "package.json": [
    "audit:phase16k",
  ],
};

const forbiddenInPanel = [
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

const forbiddenInPage = [
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
  "approveCurrentInfo",
  "rejectCurrentInfo",
  "memory_embeddings",
];

const forbiddenFiles = [
  "src/app/api/current-info/carnos/route.ts",
  "supabase/migrations/0028_phase16k_carnos_current_info_integration.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\\n=== PHASE 16K CARNOS CURRENT-INFO INTEGRATION AUDIT ===");

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

const panelText = read("src/components/dashboard/carnos-current-info-integration-panel.tsx");
for (const marker of forbiddenInPanel) {
  assert(!panelText.includes(marker), `Carnos current-info panel includes forbidden marker: ${marker}`);
  console.log(`✓ panel avoids forbidden marker: ${marker}`);
}

const pageText = read("src/app/carnos/page.tsx");
for (const marker of forbiddenInPage) {
  assert(!pageText.includes(marker), `Carnos page includes forbidden marker: ${marker}`);
  console.log(`✓ Carnos page avoids forbidden marker: ${marker}`);
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16K file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16k"),
    `${script} must include audit:phase16k`,
  );
}

console.log("✓ verification chain includes audit:phase16k");
console.log("\\nPhase 16K audit passed: Carnos current-info integration is present, wired, documented, and read-only.");
