import fs from "node:fs";

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function fail(message) {
  console.error(`Integration sanity audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function requireFile(path) {
  if (!fs.existsSync(path)) {
    fail(`Missing required file: ${path}`);
  }
  pass(`Found ${path}`);
}

function read(path) {
  requireFile(path);
  return fs.readFileSync(path, "utf8");
}

function requireIncludes(content, needle, message) {
  if (!normalize(content).includes(normalize(needle))) {
    fail(message);
  }
}

function forbidIncludes(content, needle, message) {
  if (normalize(content).includes(normalize(needle))) {
    fail(message);
  }
}

console.log("=== Integration sanity audit: source foundation ===");

for (const file of [
  "README.md",
  "SOURCE_OF_TRUTH.md",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "DECISIONS.md",
  "ERRORS_AND_FIXES.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
]) {
  requireFile(file);
}

pass("Phase 1 source foundation files are present");

console.log("\n=== Integration sanity audit: app/auth/sql foundations ===");

for (const file of [
  "middleware.ts",
  "src/lib/supabase/env.ts",
  "src/lib/supabase/browser.ts",
  "src/lib/supabase/server.ts",
  "src/lib/supabase/middleware.ts",
  "src/lib/auth/actions.ts",
  "src/lib/auth/session.ts",
  "src/components/auth/protected-page.tsx",
  "src/components/layout/auth-status.tsx",
  "src/types/database.ts",
  "src/lib/repositories/core-read.ts",
  "src/lib/repositories/index.ts",
]) {
  requireFile(file);
}

for (const file of [
  "supabase/migrations/0001_profiles_and_carnos_profiles.sql",
  "supabase/migrations/0002_audit_and_ai_actions.sql",
  "supabase/migrations/0003_chat_foundation.sql",
  "supabase/migrations/0004_goals_foundation.sql",
  "supabase/migrations/0005_daily_logs_and_proof_items.sql",
  "supabase/migrations/0006_tasks_and_events.sql",
]) {
  requireFile(file);
}

pass("Phases 3–4 auth, Supabase, SQL, and repository foundations are present");

console.log("\n=== Integration sanity audit: read pages are still wired ===");

const readPageRequirements = {
  "src/app/command/page.tsx": [
    "AuthenticatedDashboardShell",
    "CommandDashboardV1",
    "getDashboardDataSummary",
    "listGoals",
    "listTasks",
    "listEvents",
    "listProofItems",
    "listDailyLogs",
    "listAiActions",
    "Read-only mode",
  ],
  "src/app/goals/page.tsx": [
    "AuthenticatedDashboardShell",
    "listGoals",
    "No goals found",
    "Read-only",
  ],
  "src/app/timeline/page.tsx": [
    "AuthenticatedDashboardShell",
    "listEvents",
    "listProofItems",
    "listAuditLogs",
    "No timeline records found",
  ],
  "src/app/carnos/page.tsx": [
    "AuthenticatedDashboardShell",
    "listChatSessions",
    "listChatMessages",
    "listAiActions",
    "ProposedActionReviewCard",
    "Generation disabled",
  ],
  "src/app/calendar/page.tsx": [
    "AuthenticatedDashboardShell",
    "listTasks",
    "listEvents",
    "No tasks or events found",
  ],
  "src/app/world-class/page.tsx": [
    "AuthenticatedDashboardShell",
    "listProofItems",
    "listDailyLogs",
    "No proof items found",
  ],
  "src/app/analytics/page.tsx": [
    "AuthenticatedDashboardShell",
    "listProofItems",
    "listDailyLogs",
    "No daily logs found",
  ],
  "src/app/career/page.tsx": [
    "DomainReadPage",
    "career",
    "No career records found",
  ],
  "src/app/learning/page.tsx": [
    "DomainReadPage",
    "learning",
    "No learning records found",
  ],
  "src/app/body/page.tsx": [
    "DomainReadPage",
    "body",
    "No body records found",
  ],
};

for (const [file, needles] of Object.entries(readPageRequirements)) {
  const content = read(file);
  for (const needle of needles) {
    requireIncludes(content, needle, `${file} is missing integration marker/import/text: ${needle}`);
  }
  pass(`${file} has expected route-level wiring markers`);
}

console.log("\n=== Integration sanity audit: dashboard Phase 7 core operating surfaces ===");

for (const file of [
  "docs/phase-plans/PHASE_7_CORE_OPERATING_DASHBOARDS.md",
  "src/lib/dashboard/dashboard-layout-contract.ts",
  "src/lib/dashboard/dashboard-card-registry.ts",
  "src/lib/dashboard/dashboard-data-helpers.ts",
  "src/components/dashboard/operating-dashboard-card.tsx",
  "src/components/dashboard/operating-dashboard-grid.tsx",
  "src/components/dashboard/cross-dashboard-links.tsx",
  "src/components/dashboard/command-dashboard-v1.tsx",
  "src/components/dashboard/timeline-dashboard-v1.tsx",
  "src/components/dashboard/calendar-dashboard-v1.tsx",
  "src/components/dashboard/goals-dashboard-v1.tsx",
  "src/components/dashboard/proof-dashboard-v1.tsx",
  "src/components/dashboard/carnos-panel-v1.tsx",
  "src/components/actions/pending-updates-drawer.tsx",
  "src/components/dashboard/index.ts",
  "src/components/actions/index.ts",
  "src/app/command/page.tsx",
  "src/app/timeline/page.tsx",
  "src/app/calendar/page.tsx",
  "src/app/goals/page.tsx",
  "src/app/carnos/page.tsx",
]) {
  requireFile(file);
}

const dashboardIndex = read("src/components/dashboard/index.ts");
const actionsIndex = read("src/components/actions/index.ts");

const dashboardBarrelRequirements = [
  {
    exportName: "OperatingDashboardCard",
    acceptedMarkers: [
      "OperatingDashboardCard",
      'export * from "./operating-dashboard-card"',
      "export * from './operating-dashboard-card'",
    ],
  },
  {
    exportName: "OperatingDashboardGrid",
    acceptedMarkers: [
      "OperatingDashboardGrid",
      'export * from "./operating-dashboard-grid"',
      "export * from './operating-dashboard-grid'",
    ],
  },
  {
    exportName: "CommandDashboardV1",
    acceptedMarkers: [
      "CommandDashboardV1",
      'export * from "./command-dashboard-v1"',
      "export * from './command-dashboard-v1'",
    ],
  },
  {
    exportName: "TimelineDashboardV1",
    acceptedMarkers: [
      "TimelineDashboardV1",
      'export * from "./timeline-dashboard-v1"',
      "export * from './timeline-dashboard-v1'",
    ],
  },
  {
    exportName: "CalendarDashboardV1",
    acceptedMarkers: [
      "CalendarDashboardV1",
      'export * from "./calendar-dashboard-v1"',
      "export * from './calendar-dashboard-v1'",
    ],
  },
  {
    exportName: "GoalsDashboardV1",
    acceptedMarkers: [
      "GoalsDashboardV1",
      'export * from "./goals-dashboard-v1"',
      "export * from './goals-dashboard-v1'",
    ],
  },
  {
    exportName: "ProofDashboardV1",
    acceptedMarkers: [
      "ProofDashboardV1",
      'export * from "./proof-dashboard-v1"',
      "export * from './proof-dashboard-v1'",
    ],
  },
  {
    exportName: "CarnosPanelV1",
    acceptedMarkers: [
      "CarnosPanelV1",
      'export * from "./carnos-panel-v1"',
      "export * from './carnos-panel-v1'",
    ],
  },
  {
    exportName: "CrossDashboardLinks",
    acceptedMarkers: [
      "CrossDashboardLinks",
      'export * from "./cross-dashboard-links"',
      "export * from './cross-dashboard-links'",
    ],
  },
];

for (const requirement of dashboardBarrelRequirements) {
  const hasAcceptedMarker = requirement.acceptedMarkers.some((marker) =>
    normalize(dashboardIndex).includes(normalize(marker)),
  );

  if (!hasAcceptedMarker) {
    fail(`Dashboard barrel export missing ${requirement.exportName}`);
  }
}

requireIncludes(
  actionsIndex,
  "PendingUpdatesDrawer",
  "Actions barrel export missing PendingUpdatesDrawer",
);

const commandPage = read("src/app/command/page.tsx");
requireIncludes(commandPage, "CommandDashboardV1", "/command route is not wired to CommandDashboardV1");
requireIncludes(commandPage, "getDashboardDataSummary", "/command route is not loading Phase 7 dashboard data summary");

const timelinePage = read("src/app/timeline/page.tsx");
requireIncludes(timelinePage, "TimelineDashboardV1", "/timeline route is not wired to TimelineDashboardV1");
requireIncludes(timelinePage, "getDashboardDataSummary", "/timeline route is not loading Phase 7 dashboard data summary");

const calendarPage = read("src/app/calendar/page.tsx");
requireIncludes(calendarPage, "CalendarDashboardV1", "/calendar route is not wired to CalendarDashboardV1");
requireIncludes(calendarPage, "getDashboardDataSummary", "/calendar route is not loading Phase 7 dashboard data summary");

const goalsPage = read("src/app/goals/page.tsx");
requireIncludes(goalsPage, "GoalsDashboardV1", "/goals route is not wired to GoalsDashboardV1");
requireIncludes(goalsPage, "getDashboardDataSummary", "/goals route is not loading Phase 7 dashboard data summary");

const carnosPage = read("src/app/carnos/page.tsx");
requireIncludes(carnosPage, "CarnosPanelV1", "/carnos route is not wired to CarnosPanelV1");
requireIncludes(carnosPage, "PendingUpdatesDrawer", "/carnos route is not wired to PendingUpdatesDrawer");
requireIncludes(carnosPage, "getDashboardDataSummary", "/carnos route is not loading Phase 7 dashboard data summary");

const crossDashboardLinks = read("src/components/dashboard/cross-dashboard-links.tsx");
for (const route of ["/command", "/timeline", "/calendar", "/goals", "/carnos"]) {
  requireIncludes(crossDashboardLinks, route, `Cross-dashboard links missing canonical route: ${route}`);
}
forbidIncludes(crossDashboardLinks, "/proof", "Cross-dashboard links must not introduce non-canonical /proof route");

const dashboardCard = read("src/components/dashboard/operating-dashboard-card.tsx");
for (const marker of ["loading", "error", "privacy_redacted", "DashboardLoadingState"]) {
  requireIncludes(dashboardCard, marker, `OperatingDashboardCard missing state marker: ${marker}`);
}

const proofDashboard = read("src/components/dashboard/proof-dashboard-v1.tsx");
requireIncludes(proofDashboard, "ProofDashboardV1", "ProofDashboardV1 component missing");
requireIncludes(
  proofDashboard,
  "component-only surface",
  "ProofDashboardV1 must document that proof remains component-only without /proof route",
);

pass("Phase 7 core operating dashboard surfaces are exported, wired, state-aware, and canonical-route safe");

console.log("\n=== Integration sanity audit: Phase 6 safe action flow wiring ===");

for (const file of [
  "src/lib/actions/action-types.ts",
  "src/lib/actions/proposed-action-contracts.ts",
  "src/lib/actions/validate-proposed-action.ts",
  "src/lib/actions/create-proposed-action.ts",
  "src/lib/actions/action-lifecycle.ts",
  "src/lib/actions/execution-dispatcher.ts",
  "src/lib/actions/flows/create-task-flow.ts",
  "src/lib/actions/flows/create-goal-flow.ts",
  "src/lib/actions/flows/create-daily-log-flow.ts",
  "src/lib/actions/flows/create-proof-item-flow.ts",
  "src/components/actions/proposed-action-review-card.tsx",
  "src/components/actions/index.ts",
]) {
  requireFile(file);
}

const dispatcher = read("src/lib/actions/execution-dispatcher.ts");
for (const flow of [
  "executeCreateTaskAction",
  "executeCreateGoalAction",
  "executeCreateDailyLogAction",
  "executeCreateProofItemAction",
]) {
  requireIncludes(dispatcher, flow, `Execution dispatcher missing ${flow}`);
}

const actionCard = read("src/components/actions/proposed-action-review-card.tsx");
for (const forbidden of [
  "createSupabase",
  "executeApprovedAction",
  "createProposedAction",
  ".from(",
]) {
  forbidIncludes(
    actionCard,
    forbidden,
    `ProposedActionReviewCard must stay UI-only and contains forbidden marker: ${forbidden}`,
  );
}

pass("Phase 6 proposed-action flow exists and UI card remains non-mutating");

console.log("\n=== Integration sanity audit: protected boundaries ===");

const boundaryFiles = [
  ...Object.keys(readPageRequirements),
  "src/components/dashboard/domain-read-page.tsx",
  "src/components/dashboard/authenticated-dashboard-shell.tsx",
  "src/lib/dashboard/auth.ts",
  "src/components/dashboard/command-dashboard-v1.tsx",
  "src/components/dashboard/timeline-dashboard-v1.tsx",
  "src/components/dashboard/calendar-dashboard-v1.tsx",
  "src/components/dashboard/goals-dashboard-v1.tsx",
  "src/components/dashboard/proof-dashboard-v1.tsx",
  "src/components/dashboard/carnos-panel-v1.tsx",
  "src/components/dashboard/cross-dashboard-links.tsx",
  "src/components/actions/pending-updates-drawer.tsx",
];

for (const file of boundaryFiles) {
  const content = read(file);
  for (const forbidden of [
    ".insert(",
    ".update(",
    ".delete(",
    ".upsert(",
    "createMemory",
    "memory_items",
    "openai",
    "OpenAI",
    "generateText",
    "streamText",
    "executeAction",
    "server write",
    "direct database write",
  ]) {
    forbidIncludes(content, forbidden, `${file} violates protected read/UI boundary with: ${forbidden}`);
  }
  pass(`${file} respects protected read/UI boundary`);
}

console.log("\nIntegration sanity audit passed: Phases 1–6 plus Phase 7 core operating dashboard wiring are structurally present, exported, wired, and boundary-protected.");
