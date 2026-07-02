import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/dashboard/career-current-info-source-panel.tsx",
  "src/app/career/page.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_CONTRACT.md",
  "docs/phase-reports/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_REPORT.md",
  "docs/qa/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16l.mjs",
  "package.json",
];

const markers = {
  "src/components/dashboard/career-current-info-source-panel.tsx": [
    "CareerCurrentInfoSourcePanel",
    "CurrentInfoDashboardDataResult",
    "WebSourceCandidateRow",
    "WebSourceRow",
    "job_posting",
    "company_page",
    "Career guidance",
    "PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_BOUNDARY",
  ],
  "src/app/career/page.tsx": [
    "CareerCurrentInfoSourcePanel",
    "getCurrentInfoDashboardDataSummary",
    "listWebSources",
    "listWebSourceCandidates",
    "currentInfoData",
    "currentInfoSources",
    "currentInfoCandidates",
    "sourceKind: \"job_posting\"",
  ],
  "src/components/dashboard/index.ts": [
    "export * from \"./career-current-info-source-panel\";",
  ],
  "docs/contracts/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_CONTRACT.md": [
    "Phase 16L",
    "Career Web Source Integration Contract",
    "read-only visibility",
    "16M — Research / Stanford / Paper / Lab Integration",
  ],
  "docs/phase-reports/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_REPORT.md": [
    "Phase 16L",
    "read-only Career current-info source panel",
    "without applying to jobs",
  ],
  "docs/qa/PHASE_16L_CAREER_WEB_SOURCE_INTEGRATION_SMOKE_CHECKLIST.md": [
    "Career current-info source panel exists",
    "No apply-to-job flow is added",
    "No write operation is added",
    "No automatic memory conversion is added",
  ],
  "package.json": [
    "audit:phase16l",
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
  "src/app/api/current-info/career/route.ts",
  "supabase/migrations/0028_phase16l_career_web_source_integration.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16L CAREER WEB SOURCE INTEGRATION AUDIT ===");

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

const panelText = read("src/components/dashboard/career-current-info-source-panel.tsx");
for (const marker of forbiddenInPanel) {
  assert(!panelText.includes(marker), `Career current-info panel includes forbidden marker: ${marker}`);
  console.log(`✓ panel avoids forbidden marker: ${marker}`);
}

const pageText = read("src/app/career/page.tsx");
for (const marker of forbiddenInPage) {
  assert(!pageText.includes(marker), `Career page includes forbidden marker: ${marker}`);
  console.log(`✓ Career page avoids forbidden marker: ${marker}`);
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16L file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16l"),
    `${script} must include audit:phase16l`,
  );
}

console.log("✓ verification chain includes audit:phase16l");
console.log("\nPhase 16L audit passed: Career current-info web-source integration is present, wired, documented, and read-only.");
