import { existsSync, readFileSync } from "node:fs";

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`✗ ${message}`);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function requireFile(path) {
  if (!existsSync(path)) {
    fail(`Missing ${path}`);
    return "";
  }

  pass(`Found ${path}`);
  return readFileSync(path, "utf8");
}

function requireIncludes(content, needle, message) {
  if (!content.includes(needle)) {
    fail(message);
    return;
  }

  pass(message);
}


function createdPublicTables(sql) {
  return [...sql.matchAll(/create\s+table\s+if\s+not\s+exists\s+public\.([a-z0-9_]+)/gi)]
    .map((match) => match[1])
    .join("\n");
}

function forbidIncludes(content, needle, message) {
  if (content.includes(needle)) {
    fail(message);
    return;
  }

  pass(message);
}

console.log("\n=== Phase 11 health/body files ===");

const requiredFiles = [
  "docs/phase-plans/PHASE_11_HEALTH_BODY_SYSTEM.md",
  "docs/database/PHASE_11_HEALTH_BODY_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_11_HEALTH_PRIVACY_SAFETY_REVIEW.md",
  "docs/phase-reports/PHASE_11_SOURCE_TO_SCOPE_TRACEABILITY.md",
  "docs/phase-reports/PHASE_11_BASELINE_UNITS_SLEEP_PHOTO_BOUNDARY.md",
  "docs/phase-reports/PHASE_11_SAFETY_DATA_TARGET_TREND_BOUNDARY.md",
  "docs/phase-reports/PHASE_11_READ_HELPER_SCHEMA_BOUNDARY_AUDIT.md",
  "docs/phase-reports/PHASE_11_HEALTH_BODY_DETAIL_PANEL_PATTERN_REPORT.md",
  "docs/qa/PHASE_11_HEALTH_BODY_MANUAL_SMOKE_CHECKLIST.md",
  "docs/phase-reports/PHASE_11_HEALTH_BODY_AUDIT_GATE.md",
  "supabase/migrations/0012_phase11_health_body_foundation.sql",
  "supabase/migrations/0013_phase11_parent_ownership_guards.sql",
  "src/types/database.ts",
  "src/lib/repositories/health-body-read.ts",
  "src/lib/repositories/index.ts",
  "src/lib/dashboard/health-body-dashboard-data-helpers.ts",
  "src/components/dashboard/health-body-dashboard-states.tsx",
  "src/components/dashboard/health-body-dashboard-v1.tsx",
  "src/components/dashboard/health-body-nutrition-dashboard-v1.tsx",
  "src/components/dashboard/health-body-supplements-dashboard-v1.tsx",
  "src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx",
  "src/components/dashboard/health-body-emotion-dashboard-v1.tsx",
  "src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx",
  "src/components/dashboard/health-body-detail-panels.tsx",
  "src/components/dashboard/health-body-linkage-panels.tsx",
  "src/components/dashboard/health-body-action-boundary-panels.tsx",
  "src/components/dashboard/index.ts",
  "src/app/body/page.tsx",
  "src/app/nutrition/page.tsx",
  "src/app/supplements/page.tsx",
  "src/app/sleep-energy/page.tsx",
  "src/app/emotion/page.tsx",
  "src/app/hair-skincare/page.tsx",
];

const fileText = new Map();

for (const file of requiredFiles) {
  fileText.set(file, requireFile(file));
}

console.log("\n=== Phase 11 SQL and type contracts ===");

const migration = fileText.get("supabase/migrations/0012_phase11_health_body_foundation.sql") ?? "";
const phase11CreatedTablesText = createdPublicTables(migration);
const ownership = fileText.get("supabase/migrations/0013_phase11_parent_ownership_guards.sql") ?? "";
const databaseTypes = fileText.get("src/types/database.ts") ?? "";
const readHelpers = fileText.get("src/lib/repositories/health-body-read.ts") ?? "";
const repositoryIndex = fileText.get("src/lib/repositories/index.ts") ?? "";

for (const table of [
  "body_logs",
  "workouts",
  "exercises",
  "workout_sets",
  "nutrition_logs",
  "meal_items",
  "supplements",
  "supplement_logs",
  "sleep_logs",
  "energy_logs",
  "mental_health_logs",
  "emotion_logs",
  "journal_entries",
  "skincare_logs",
  "haircare_logs",
  "products",
]) {
  requireIncludes(migration, table, `Phase 11 migration includes ${table}`);
  requireIncludes(databaseTypes, table, `Database types include ${table}`);
}

for (const helper of [
  "listBodyLogs",
  "listWorkouts",
  "listExercises",
  "listWorkoutSets",
  "listNutritionLogs",
  "listMealItems",
  "listSupplements",
  "listSupplementLogs",
  "listSleepLogs",
  "listEnergyLogs",
  "listMentalHealthLogs",
  "listEmotionLogs",
  "listJournalEntries",
  "listSkincareLogs",
  "listHaircareLogs",
  "listProducts",
]) {
  requireIncludes(readHelpers, helper, `Health/body read repository exports ${helper}`);
}

requireIncludes(repositoryIndex, 'export * from "./health-body-read";', "Repository barrel exports health/body read helpers");

for (const marker of [
  "goal_id",
  "task_id",
  "proof_item_id",
  "daily_log_id",
  "event_id",
  "source_ai_action_id",
  "source_chat_message_id",
  "raise exception",
  "user_id",
]) {
  requireIncludes(ownership, marker, `Phase 11 parent ownership guard includes ${marker}`);
}

for (const forbiddenTable of [
  "health_body_baselines",
  "progress_photos",
  "analytics_snapshots",
]) {
  forbidIncludes(phase11CreatedTablesText, forbiddenTable, `Phase 11 migration avoids deferred table ${forbiddenTable}`);
  forbidIncludes(databaseTypes, forbiddenTable, `Database types avoid deferred table ${forbiddenTable}`);
  forbidIncludes(readHelpers, forbiddenTable, `Read helpers avoid deferred table ${forbiddenTable}`);
}

console.log("\n=== Phase 11 dashboard helper and components ===");

const dashboardHelper = fileText.get("src/lib/dashboard/health-body-dashboard-data-helpers.ts") ?? "";
const dashboardIndex = fileText.get("src/components/dashboard/index.ts") ?? "";
const detailPanels = fileText.get("src/components/dashboard/health-body-detail-panels.tsx") ?? "";
const linkagePanels = fileText.get("src/components/dashboard/health-body-linkage-panels.tsx") ?? "";
const actionBoundaryPanels = fileText.get("src/components/dashboard/health-body-action-boundary-panels.tsx") ?? "";

for (const marker of [
  "getHealthBodyDashboardDataSummary",
  "HealthBodyDashboardDetailRows",
  "detail_rows",
  "read_only_boundary",
  "recent_health_signal_count",
  "source_tables",
]) {
  requireIncludes(dashboardHelper, marker, `Health/body dashboard helper includes ${marker}`);
}

for (const marker of [
  'export * from "./health-body-dashboard-v1";',
  'export * from "./health-body-dashboard-states";',
  'export * from "./health-body-nutrition-dashboard-v1";',
  'export * from "./health-body-supplements-dashboard-v1";',
  'export * from "./health-body-sleep-energy-dashboard-v1";',
  'export * from "./health-body-emotion-dashboard-v1";',
  'export * from "./health-body-hair-skincare-dashboard-v1";',
  'export * from "./health-body-detail-panels";',
  'export * from "./health-body-linkage-panels";',
  'export * from "./health-body-action-boundary-panels";',
]) {
  requireIncludes(dashboardIndex, marker, `Dashboard barrel includes ${marker}`);
}

for (const marker of [
  "HealthBodyTrainingDetailPanel",
  "HealthBodyNutritionMealDetailPanel",
  "HealthBodySupplementDetailPanel",
  "HealthBodySleepEnergyDetailPanel",
  "HealthBodyEmotionReflectionDetailPanel",
  "HealthBodyHairSkincareDetailPanel",
  "Read-only",
  "This panel does not",
  "Progress photos and visual evidence remain deferred",
]) {
  requireIncludes(detailPanels, marker, `Detail panels include ${marker}`);
}

for (const marker of [
  "HealthBodyProofLinkagePanel",
  "proof_item_id",
  "goal_id",
  "task_id",
  "daily_log_id",
  "event_id",
  "This panel only reads existing linkage fields",
  "does not create proof",
]) {
  requireIncludes(linkagePanels, marker, `Linkage panels include ${marker}`);
}

for (const marker of [
  "HealthBodyProposedActionVisibilityPanel",
  "HealthBodyStateBoundaryPanel",
  "HealthBodyCrossLinks",
  "ProposedActionReviewCard",
  "CrossDashboardLinks",
  "disabled",
  "Save / Confirm unavailable in Phase 11 dashboard preview",
  "empty · loading · error · privacy",
  "Privacy boundary",
  "/body",
  "/nutrition",
  "/supplements",
  "/sleep-energy",
  "/emotion",
  "/hair-skincare",
]) {
  requireIncludes(actionBoundaryPanels, marker, `Action/state boundary panels include ${marker}`);
}

console.log("\n=== Phase 11 route and dashboard wiring ===");

const routeRequirements = {
  "src/app/body/page.tsx": [
    "AuthenticatedDashboardShell",
    "HealthBodyDashboardV1",
    "DomainReadPage.name",
  ],
  "src/app/nutrition/page.tsx": [
    "AuthenticatedDashboardShell",
    "HealthBodyNutritionDashboardV1",
  ],
  "src/app/supplements/page.tsx": [
    "AuthenticatedDashboardShell",
    "HealthBodySupplementsDashboardV1",
  ],
  "src/app/sleep-energy/page.tsx": [
    "AuthenticatedDashboardShell",
    "HealthBodySleepEnergyDashboardV1",
  ],
  "src/app/emotion/page.tsx": [
    "AuthenticatedDashboardShell",
    "HealthBodyEmotionDashboardV1",
  ],
  "src/app/hair-skincare/page.tsx": [
    "AuthenticatedDashboardShell",
    "HealthBodyHairSkincareDashboardV1",
  ],
};

for (const [file, markers] of Object.entries(routeRequirements)) {
  const content = fileText.get(file) ?? "";
  for (const marker of markers) {
    requireIncludes(content, marker, `${file} includes ${marker}`);
  }
}

const dashboardSurfaceRequirements = {
  "src/components/dashboard/health-body-dashboard-v1.tsx": [
    "HealthBodyTrainingDetailPanel",
    "HealthBodyProofLinkagePanel",
    "HealthBodyStateBoundaryPanel",
    "HealthBodyCrossLinks",
    "HealthBodyProposedActionVisibilityPanel",
    'activeRoute="/body"',
    'surface="body"',
  ],
  "src/components/dashboard/health-body-nutrition-dashboard-v1.tsx": [
    "HealthBodyNutritionMealDetailPanel",
    "HealthBodyProofLinkagePanel",
    "HealthBodyStateBoundaryPanel",
    "HealthBodyCrossLinks",
    "HealthBodyProposedActionVisibilityPanel",
    'activeRoute="/nutrition"',
    'surface="nutrition"',
  ],
  "src/components/dashboard/health-body-supplements-dashboard-v1.tsx": [
    "HealthBodySupplementDetailPanel",
    "HealthBodyProofLinkagePanel",
    "HealthBodyStateBoundaryPanel",
    "HealthBodyCrossLinks",
    "HealthBodyProposedActionVisibilityPanel",
    'activeRoute="/supplements"',
    'surface="supplements"',
  ],
  "src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx": [
    "HealthBodySleepEnergyDetailPanel",
    "HealthBodyProofLinkagePanel",
    "HealthBodyStateBoundaryPanel",
    "HealthBodyCrossLinks",
    "HealthBodyProposedActionVisibilityPanel",
    'activeRoute="/sleep-energy"',
    'surface="sleep_energy"',
  ],
  "src/components/dashboard/health-body-emotion-dashboard-v1.tsx": [
    "HealthBodyEmotionReflectionDetailPanel",
    "HealthBodyProofLinkagePanel",
    "HealthBodyStateBoundaryPanel",
    "HealthBodyCrossLinks",
    "HealthBodyProposedActionVisibilityPanel",
    'activeRoute="/emotion"',
    'surface="emotion"',
  ],
  "src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx": [
    "HealthBodyHairSkincareDetailPanel",
    "HealthBodyProofLinkagePanel",
    "HealthBodyStateBoundaryPanel",
    "HealthBodyCrossLinks",
    "HealthBodyProposedActionVisibilityPanel",
    'activeRoute="/hair-skincare"',
    'surface="hair_skincare"',
  ],
};

for (const [file, markers] of Object.entries(dashboardSurfaceRequirements)) {
  const content = fileText.get(file) ?? "";
  for (const marker of markers) {
    requireIncludes(content, marker, `${file} includes ${marker}`);
  }
}

console.log("\n=== Phase 11 protected dashboard boundaries ===");

const protectedFiles = [
  "src/lib/repositories/health-body-read.ts",
  "src/lib/dashboard/health-body-dashboard-data-helpers.ts",
  "src/components/dashboard/health-body-dashboard-states.tsx",
  "src/components/dashboard/health-body-dashboard-v1.tsx",
  "src/components/dashboard/health-body-nutrition-dashboard-v1.tsx",
  "src/components/dashboard/health-body-supplements-dashboard-v1.tsx",
  "src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx",
  "src/components/dashboard/health-body-emotion-dashboard-v1.tsx",
  "src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx",
  "src/components/dashboard/health-body-detail-panels.tsx",
  "src/components/dashboard/health-body-linkage-panels.tsx",
  "src/components/dashboard/health-body-action-boundary-panels.tsx",
  "src/app/body/page.tsx",
  "src/app/nutrition/page.tsx",
  "src/app/supplements/page.tsx",
  "src/app/sleep-energy/page.tsx",
  "src/app/emotion/page.tsx",
  "src/app/hair-skincare/page.tsx",
];

for (const file of protectedFiles) {
  const content = fileText.get(file) ?? requireFile(file);

  for (const marker of [
    ".insert(",
    ".update(",
    ".delete(",
    ".upsert(",
    ".rpc(",
    "createSupabaseBrowserClient",
    "useState",
    "useEffect",
    '"use client"',
    "openai",
    "OpenAI",
    "generateText",
    "streamText",
    "sendEmail",
    "fetch(",
    "setInterval(",
    "setTimeout(",
    "executeApprovedAction(",
    "createProposedAction",
  ]) {
    forbidIncludes(content, marker, `${file} avoids forbidden marker: ${marker}`);
  }
}

console.log("\n=== Phase 11 health/body safety language ===");

const combinedHealthUi = [
  fileText.get("src/components/dashboard/health-body-dashboard-states.tsx") ?? "",
  detailPanels,
  linkagePanels,
  actionBoundaryPanels,
  ...Object.keys(dashboardSurfaceRequirements).map((file) => fileText.get(file) ?? ""),
].join("\n\n");

for (const marker of [
  "read-only",
  "does not create or modify data",
  "does not diagnose",
  "medical advice",
  "dosage",
  "body-shaming",
  "appearance",
  "Progress photos and visual evidence remain deferred",
  "No medical, supplement, visual-evidence, or mental-health action is wired here.",
]) {
  requireIncludes(combinedHealthUi, marker, `Phase 11 UI safety language includes ${marker}`);
}

for (const unsafe of [
  "diagnoses you with",
  "guaranteed results",
  "cures",
  "treats your condition",
  "you are overweight",
  "you are underweight",
  "fix your face",
]) {
  forbidIncludes(combinedHealthUi.toLowerCase(), unsafe, `Phase 11 UI avoids unsafe phrase: ${unsafe}`);
}

console.log("\n=== Phase 11 docs and logs ===");

const smoke = fileText.get("docs/qa/PHASE_11_HEALTH_BODY_MANUAL_SMOKE_CHECKLIST.md") ?? "";
const auditGate = fileText.get("docs/phase-reports/PHASE_11_HEALTH_BODY_AUDIT_GATE.md") ?? "";
const executionLog = requireFile("PROJECT_EXECUTION_LOG.md");
const codeLedger = requireFile("CODE_LEDGER.md");
const changelog = requireFile("CHANGELOG.md");
const phaseStatus = requireFile("PHASE_STATUS.md");

for (const marker of [
  "Health Body Manual Smoke Checklist",
  "/body",
  "/nutrition",
  "/supplements",
  "/sleep-energy",
  "/emotion",
  "/hair-skincare",
  "Proposed-action visibility",
  "Privacy and safety checks",
  "No write behavior",
]) {
  requireIncludes(smoke, marker, `Phase 11 smoke checklist includes ${marker}`);
}

for (const marker of [
  "Phase 11 Health/Body Audit Gate",
  "Verification gates",
  "Protected boundaries",
  "Deferred scope",
]) {
  requireIncludes(auditGate, marker, `Phase 11 audit gate includes ${marker}`);
}

for (const marker of [
  "Phase 11 Chunk A",
  "Health/Body Detail Panels",
  "Health/Body Linkage Visibility",
  "Health/Body Proposed-Action and State Boundaries",
  "Health/Body Audit Gate",
]) {
  requireIncludes(executionLog, marker, `Execution log includes ${marker}`);
}

for (const marker of [
  "Health/Body Proposed-Action and State Boundaries",
  "Health/Body Audit Gate",
]) {
  requireIncludes(codeLedger, marker, `Code ledger includes ${marker}`);
  requireIncludes(changelog, marker, `Changelog includes ${marker}`);
  requireIncludes(phaseStatus, marker, `Phase status includes ${marker}`);
}

if (failures > 0) {
  console.error(`\nPhase 11 audit failed with ${failures} failure(s).`);
  process.exit(1);
}

console.log("\nPhase 11 audit passed: health/body system is structurally present, route-wired, exported, documented, safety-bounded, and protected through J1.");
