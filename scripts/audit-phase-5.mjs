import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function fail(message) {
  console.error(`Phase 5 audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function requireFile(relativePath) {
  if (!fileExists(relativePath)) {
    fail(`Missing required file: ${relativePath}`);
  }

  pass(`Found ${relativePath}`);
}

function read(relativePath) {
  requireFile(relativePath);
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
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

console.log("=== Phase 5 shared dashboard components ===");

for (const file of [
  "src/components/dashboard/section-card.tsx",
  "src/components/dashboard/empty-state.tsx",
  "src/components/dashboard/data-list.tsx",
  "src/components/dashboard/status-pill.tsx",
  "src/components/dashboard/metric-tile.tsx",
  "src/components/dashboard/authenticated-dashboard-shell.tsx",
  "src/components/dashboard/domain-read-page.tsx",
  "src/components/dashboard/index.ts",
  "src/lib/dashboard/auth.ts",
]) {
  requireFile(file);
}

const dashboardIndex = read("src/components/dashboard/index.ts");

for (const exportName of [
  "SectionCard",
  "EmptyState",
  "DataList",
  "StatusPill",
  "MetricTile",
  "AuthenticatedDashboardShell",
  "DomainReadPage",
]) {
  requireIncludes(
    dashboardIndex,
    exportName,
    `Dashboard barrel export missing ${exportName}`,
  );
}

pass("Shared dashboard component exports are present");

console.log("\n=== Phase 5 connected pages ===");

const pageRequirements = {
  "src/app/command/page.tsx": [
    "AuthenticatedDashboardShell",
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
    "Generation disabled",
    "generation",
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

for (const [file, needles] of Object.entries(pageRequirements)) {
  const content = read(file);

  for (const needle of needles) {
    requireIncludes(content, needle, `${file} is missing expected text/import: ${needle}`);
  }

  pass(`${file} is wired for Phase 5 reads`);
}

console.log("\n=== Phase 5 no-write/no-memory boundary ===");

const phase5Files = [
  ...Object.keys(pageRequirements),
  "src/components/dashboard/domain-read-page.tsx",
  "src/components/dashboard/authenticated-dashboard-shell.tsx",
  "src/lib/dashboard/auth.ts",
];

for (const file of phase5Files) {
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
  ]) {
    forbidIncludes(content, forbidden, `${file} contains forbidden Phase 5 boundary text/call: ${forbidden}`);
  }

  pass(`${file} respects read-only boundary`);
}

for (const forbiddenPath of [
  "src/lib/repositories/core-write.ts",
  "src/lib/memory",
  "src/lib/carnos/generate.ts",
  "src/lib/carnos/execute.ts",
  "src/app/api/carnos/generate",
]) {
  if (fileExists(forbiddenPath)) {
    fail(`Forbidden deferred feature path exists during Phase 5: ${forbiddenPath}`);
  }
}

pass("No premature write, memory, generation, or execution files found");

console.log("\n=== Phase 5 source docs/logs ===");

for (const file of [
  "docs/phase-plans/PHASE_5_CORE_READ_UI_INTEGRATION.md",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "PHASE_STATUS.md",
]) {
  requireFile(file);
}

const phasePlan = read("docs/phase-plans/PHASE_5_CORE_READ_UI_INTEGRATION.md");
for (const phrase of [
  "Phase 5",
  "read-only",
  "generation",
  "memory",
  "Completion gates",
]) {
  requireIncludes(phasePlan, phrase, `Phase 5 plan missing: ${phrase}`);
}

const executionLog = read("PROJECT_EXECUTION_LOG.md");
for (const step of [
  "Phase 5.1",
  "Phase 5.2",
  "Phase 5.3",
  "Phase 5.4",
  "Phase 5.5",
  "Phase 5.6",
  "Phase 5.7",
  "Phase 5.8",
  "Phase 5.9",
  "Phase 5.10",
]) {
  requireIncludes(executionLog, step, `PROJECT_EXECUTION_LOG.md missing ${step}`);
}

pass("Phase 5 plan and logs are present through Phase 5.10");

console.log("\n=== Phase 5 repository boundary ===");

const repositoryFile = read("src/lib/repositories/core-read.ts");
for (const forbidden of [".insert(", ".update(", ".delete(", ".upsert("]) {
  forbidIncludes(
    repositoryFile,
    forbidden,
    `Read repository contains forbidden mutation call: ${forbidden}`,
  );
}

for (const exportName of [
  "listAuditLogs",
  "listAiActions",
  "listChatSessions",
  "listChatMessages",
  "listGoals",
  "listGoalMilestones",
  "listDailyLogs",
  "listProofItems",
  "listTasks",
  "listEvents",
]) {
  requireIncludes(repositoryFile, exportName, `Read repository missing ${exportName}`);
}

pass("Read repository remains read-only and complete");

console.log("\n=== Phase 5 route build classification ===");

const dynamicReadPages = [
  "src/app/command/page.tsx",
  "src/app/goals/page.tsx",
  "src/app/timeline/page.tsx",
  "src/app/carnos/page.tsx",
  "src/app/calendar/page.tsx",
  "src/app/world-class/page.tsx",
  "src/app/analytics/page.tsx",
  "src/app/career/page.tsx",
  "src/app/learning/page.tsx",
  "src/app/body/page.tsx",
];

for (const page of dynamicReadPages) {
  const content = read(page);

  if (
    !normalize(content).includes("authenticateddashboardshell") &&
    !normalize(content).includes("domainreadpage")
  ) {
    fail(`${page} should use authenticated dashboard shell directly or through DomainReadPage`);
  }
}

pass("Phase 5 dynamic read pages use authenticated dashboard shell path");

console.log("\nPhase 5 audit passed: read UI integration is present and still respects no-write/no-memory/no-generation boundaries.");
