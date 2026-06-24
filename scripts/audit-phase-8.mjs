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

function forbidIncludes(content, needle, message) {
  if (content.includes(needle)) {
    fail(message);
    return;
  }

  pass(message);
}

console.log("\n=== Phase 8 career files ===");

const requiredFiles = [
  "docs/phase-plans/PHASE_8_CAREER_SYSTEM.md",
  "docs/phase-reports/PHASE_8_2_CAREER_INSPECTION_REPORT.md",
  "docs/qa/PHASE_8_CAREER_MANUAL_SMOKE_CHECKLIST.md",
  "docs/phase-reports/PHASE_8_CAREER_SYSTEM_COMPLETION_REPORT.md",
  "docs/database/CAREER_SQL_SCHEMA_DESIGN.md",
  "supabase/migrations/0007_career_system_foundation.sql",
  "src/lib/dashboard/career-dashboard-data-helpers.ts",
  "src/components/dashboard/career-dashboard-v1.tsx",
  "src/components/dashboard/networking-dashboard-v1.tsx",
  "src/components/dashboard/resume-dashboard-v1.tsx",
  "src/components/dashboard/interviews-dashboard-v1.tsx",
  "src/components/dashboard/career-evidence-linkage-panel.tsx",
  "src/components/dashboard/career-proposed-action-visibility-panel.tsx",
  "src/components/dashboard/career-state-boundary-panel.tsx",
  "src/app/career/page.tsx",
  "src/app/networking/page.tsx",
  "src/app/resume/page.tsx",
  "src/app/interviews/page.tsx",
];

const fileText = new Map();

for (const file of requiredFiles) {
  fileText.set(file, requireFile(file));
}

console.log("\n=== Phase 8 SQL and type contracts ===");

const migration = fileText.get("supabase/migrations/0007_career_system_foundation.sql") ?? "";
const databaseTypes = requireFile("src/types/database.ts");
const repository = requireFile("src/lib/repositories/core-read.ts");

for (const table of [
  "job_applications",
  "job_application_events",
  "networking_contacts",
  "networking_interactions",
  "job_referrals",
  "resume_versions",
  "resume_bullets",
  "interviews",
]) {
  requireIncludes(migration, table, `Career migration includes ${table}`);
  requireIncludes(databaseTypes, table, `Database types include ${table}`);
  requireIncludes(repository, table, `Read repository includes ${table}`);
}

for (const helper of [
  "listJobApplications",
  "listJobApplicationEvents",
  "listNetworkingContacts",
  "listNetworkingInteractions",
  "listJobReferrals",
  "listResumeVersions",
  "listResumeBullets",
  "listInterviews",
]) {
  requireIncludes(repository, helper, `Read repository exports ${helper}`);
}

console.log("\n=== Phase 8 route wiring ===");

const routeRequirements = {
  "src/app/career/page.tsx": [
    "AuthenticatedDashboardShell",
    "CareerDashboardV1",
    "getCareerDashboardDataSummary",
    "listJobApplications",
    "listJobApplicationEvents",
    "listInterviews",
    "listJobReferrals",
    "listNetworkingContacts",
    "listResumeVersions",
    "listResumeBullets",
    "listGoals",
    "listTasks",
    "listProofItems",
    "listDailyLogs",
  ],
  "src/app/networking/page.tsx": [
    "AuthenticatedDashboardShell",
    "NetworkingDashboardV1",
    "listNetworkingContacts",
    "listNetworkingInteractions",
    "listJobReferrals",
  ],
  "src/app/resume/page.tsx": [
    "AuthenticatedDashboardShell",
    "ResumeDashboardV1",
    "listResumeVersions",
    "listResumeBullets",
    "listGoals",
    "listTasks",
    "listProofItems",
    "listDailyLogs",
  ],
  "src/app/interviews/page.tsx": [
    "AuthenticatedDashboardShell",
    "InterviewsDashboardV1",
    "listInterviews",
  ],
};

for (const [file, markers] of Object.entries(routeRequirements)) {
  const content = fileText.get(file) ?? "";
  for (const marker of markers) {
    requireIncludes(content, marker, `${file} includes ${marker}`);
  }
}

console.log("\n=== Phase 8 dashboard surface wiring ===");

const dashboardRequirements = {
  "src/components/dashboard/career-dashboard-v1.tsx": [
    "CareerCrossDashboardLinks",
    "CareerEvidenceLinkagePanel",
    "CareerProposedActionVisibilityPanel",
    "CareerStateBoundaryPanel",
    "job_application_events",
    "Career boundary",
    "read-only",
  ],
  "src/components/dashboard/networking-dashboard-v1.tsx": [
    "CareerCrossDashboardLinks",
    "CareerProposedActionVisibilityPanel",
    "CareerStateBoundaryPanel",
    "networking_contacts",
    "networking_interactions",
    "job_referrals",
    "Networking boundary",
    "read-only",
  ],
  "src/components/dashboard/resume-dashboard-v1.tsx": [
    "CareerCrossDashboardLinks",
    "CareerEvidenceLinkagePanel",
    "CareerProposedActionVisibilityPanel",
    "CareerStateBoundaryPanel",
    "resume_versions",
    "resume_bullets",
    "Resume boundary",
    "read-only",
  ],
  "src/components/dashboard/interviews-dashboard-v1.tsx": [
    "CareerCrossDashboardLinks",
    "CareerProposedActionVisibilityPanel",
    "CareerStateBoundaryPanel",
    "interviews",
    "Interview boundary",
    "read-only",
  ],
  "src/components/dashboard/career-evidence-linkage-panel.tsx": [
    "CareerEvidenceLinkagePanel",
    "goal_id",
    "task_id",
    "proof_item_id",
    "daily_log_id",
    "No supporting proof context yet.",
  ],
  "src/components/dashboard/career-proposed-action-visibility-panel.tsx": [
    "CareerProposedActionVisibilityPanel",
    "ProposedActionReviewCard",
    "create_task",
    "create_goal",
    "create_proof_item",
    "disabled",
    "no callbacks are wired",
    "does not save, cancel, execute, or persist",
  ],
  "src/components/dashboard/career-state-boundary-panel.tsx": [
    "CareerStateBoundaryPanel",
    "empty",
    "loading",
    "error",
    "privacy",
    "private",
    "read-only",
    "does not expose, export, send, or modify",
  ],
};

for (const [file, markers] of Object.entries(dashboardRequirements)) {
  const content = fileText.get(file) ?? "";
  for (const marker of markers) {
    requireIncludes(content, marker, `${file} includes ${marker}`);
  }
}

console.log("\n=== Phase 8 dashboard exports ===");

const dashboardIndex = requireFile("src/components/dashboard/index.ts");

for (const marker of [
  'export * from "./career-dashboard-v1";',
  'export * from "./networking-dashboard-v1";',
  'export * from "./resume-dashboard-v1";',
  'export * from "./interviews-dashboard-v1";',
  'export * from "./career-evidence-linkage-panel";',
  'export * from "./career-proposed-action-visibility-panel";',
  'export * from "./career-state-boundary-panel";',
]) {
  requireIncludes(dashboardIndex, marker, `Dashboard barrel includes ${marker}`);
}

console.log("\n=== Phase 8 protected dashboard boundaries ===");

const protectedDashboardFiles = [
  "src/components/dashboard/career-dashboard-v1.tsx",
  "src/components/dashboard/networking-dashboard-v1.tsx",
  "src/components/dashboard/resume-dashboard-v1.tsx",
  "src/components/dashboard/interviews-dashboard-v1.tsx",
  "src/components/dashboard/career-evidence-linkage-panel.tsx",
  "src/components/dashboard/career-proposed-action-visibility-panel.tsx",
  "src/components/dashboard/career-state-boundary-panel.tsx",
];

for (const file of protectedDashboardFiles) {
  const content = fileText.get(file) ?? "";
  for (const forbidden of [
    ".insert(",
    ".update(",
    ".delete(",
    ".upsert(",
    ".from(",
    "createProposedAction",
    "executeApprovedAction(",
    "openai",
    "OpenAI",
    "generateText",
    "streamText",
    "ai_actions",
    "server write",
    "server-side write",
    "direct database write",
  ]) {
    forbidIncludes(content, forbidden, `${file} avoids forbidden marker: ${forbidden}`);
  }
}

console.log("\n=== Phase 8 source/log markers ===");

const phasePlan = fileText.get("docs/phase-plans/PHASE_8_CAREER_SYSTEM.md") ?? "";
const executionLog = requireFile("PROJECT_EXECUTION_LOG.md");
const phaseStatus = requireFile("PHASE_STATUS.md");

for (const marker of [
  "Phase 8",
  "Career",
]) {
  requireIncludes(phasePlan, marker, `Phase 8 plan includes ${marker}`);
}

for (const marker of [
  "Phase 8",
  "Career",
]) {
  requireIncludes(executionLog, marker, `Execution log includes ${marker}`);
  requireIncludes(phaseStatus, marker, `Phase status includes ${marker}`);
}


console.log("\n=== Phase 8 final closeout markers ===");

const completionReport = fileText.get("docs/phase-reports/PHASE_8_CAREER_SYSTEM_COMPLETION_REPORT.md") ?? "";
const manualChecklist = fileText.get("docs/qa/PHASE_8_CAREER_MANUAL_SMOKE_CHECKLIST.md") ?? "";
const changelog = requireFile("CHANGELOG.md");
const codeLedger = requireFile("CODE_LEDGER.md");

for (const marker of [
  "Phase 8 Completion Report",
  "Career System",
  "Verification gates",
  "Deferred scope",
  "Phase 9",
]) {
  requireIncludes(completionReport, marker, `Phase 8 completion report includes ${marker}`);
}

for (const marker of [
  "Phase 8 Manual Smoke Checklist",
  "/career",
  "/networking",
  "/resume",
  "/interviews",
  "Proposed-action visibility checks",
  "Privacy and safety checks",
]) {
  requireIncludes(manualChecklist, marker, `Phase 8 manual smoke checklist includes ${marker}`);
}

for (const marker of [
  "Phase 8 Career System Complete",
  "Phase 8.24",
]) {
  requireIncludes(changelog, marker, `Changelog includes ${marker}`);
  requireIncludes(codeLedger, marker, `Code ledger includes ${marker}`);
}

if (failures > 0) {
  console.error(`\nPhase 8 audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("\nPhase 8 audit passed: career system surfaces are present, wired, exported, read-only, and boundary-protected.");
