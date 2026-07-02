import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/dashboard/research-current-info-source-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_CONTRACT.md",
  "docs/phase-reports/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_REPORT.md",
  "docs/qa/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16m.mjs",
  "package.json",
];

const optionalResearchPages = [
  "src/app/research-stanford/page.tsx",
  "src/app/research-lab/page.tsx",
];

const markers = {
  "src/components/dashboard/research-current-info-source-panel.tsx": [
    "ResearchCurrentInfoSourcePanel",
    "ResearchCurrentInfoSourceServerPanel",
    "getCurrentInfoDashboardDataSummary",
    "listWebSources",
    "listWebSourceCandidates",
    "CurrentInfoDashboardDataResult",
    "WebSourceCandidateRow",
    "WebSourceRow",
    "paper",
    "lab_page",
    "professor_page",
    "Research guidance",
    "PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_BOUNDARY",
  ],
  "src/components/dashboard/index.ts": [
    "export * from \"./research-current-info-source-panel\";",
  ],
  "docs/contracts/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_CONTRACT.md": [
    "Phase 16M",
    "Research / Stanford / Paper / Lab Integration Contract",
    "read-only visibility",
    "16N — Knowledge Vault Source Bridge",
  ],
  "docs/phase-reports/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_REPORT.md": [
    "Phase 16M",
    "read-only research current-info source panel",
    "without saving citations",
  ],
  "docs/qa/PHASE_16M_RESEARCH_CURRENT_INFO_INTEGRATION_SMOKE_CHECKLIST.md": [
    "Research current-info source panel exists",
    "Paper source visibility exists",
    "No citation-save flow is added",
    "No automatic memory conversion is added",
  ],
  "package.json": [
    "audit:phase16m",
  ],
};

const pageMarkers = [
  "ResearchCurrentInfoSourceServerPanel",
  "userId={user.id}",
  "surfaceLabel=",
];

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

const forbiddenInPages = [
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
  "src/app/api/current-info/research/route.ts",
  "supabase/migrations/0028_phase16m_research_current_info_integration.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16M RESEARCH CURRENT-INFO INTEGRATION AUDIT ===");

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

const patchedPages = optionalResearchPages.filter((file) => existsSync(file) && read(file).includes("ResearchCurrentInfoSourceServerPanel"));
assert(patchedPages.length > 0, "At least one research page must be wired to ResearchCurrentInfoSourceServerPanel.");

for (const file of patchedPages) {
  const text = read(file);
  for (const marker of pageMarkers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }

  for (const marker of forbiddenInPages) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

const panelText = read("src/components/dashboard/research-current-info-source-panel.tsx");
for (const marker of forbiddenInPanel) {
  assert(!panelText.includes(marker), `Research current-info panel includes forbidden marker: ${marker}`);
  console.log(`✓ panel avoids forbidden marker: ${marker}`);
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16M file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16m"),
    `${script} must include audit:phase16m`,
  );
}

console.log("✓ verification chain includes audit:phase16m");
console.log("\nPhase 16M audit passed: Research current-info integration is present, wired, documented, and read-only.");
