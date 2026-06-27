import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const checks = [];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`✗ ${message}`);
}

function pass(message) {
  checks.push(`✓ ${message}`);
}

function resolvePath(filePath) {
  return path.join(root, filePath);
}

function exists(filePath) {
  return fs.existsSync(resolvePath(filePath));
}

function read(filePath) {
  if (!exists(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }

  return fs.readFileSync(resolvePath(filePath), "utf8");
}

function requireFile(filePath) {
  if (!exists(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }

  pass(`Found ${filePath}`);
}

function requireIncludes(filePath, markers) {
  const content = read(filePath);
  const markerList = Array.isArray(markers) ? markers : [markers];

  for (const marker of markerList) {
    if (!content.includes(marker)) {
      fail(`${filePath} missing required marker: ${marker}`);
    }
  }

  pass(`${filePath} includes required markers`);
}

function forbidIncludes(filePath, markers) {
  const content = read(filePath);
  const markerList = Array.isArray(markers) ? markers : [markers];

  for (const marker of markerList) {
    if (content.includes(marker)) {
      fail(`${filePath} contains forbidden marker: ${marker}`);
    }
  }

  pass(`${filePath} excludes forbidden markers`);
}

console.log("=== Phase 12 audit: required files ===");

const requiredFiles = [
  "docs/phase-plans/PHASE_12_LIFE_ADMIN_FINANCE_DAILY_ADMIN_SYSTEM.md",
  "docs/phase-reports/PHASE_12_C01_SOURCE_ROUTE_INSPECTION.md",
  "docs/phase-reports/PHASE_12_LIFE_ADMIN_PRIVACY_SAFETY_REVIEW.md",
  "docs/phase-reports/PHASE_12_SOURCE_TO_SCOPE_TRACEABILITY.md",
  "docs/phase-reports/PHASE_12_SQL_FOUNDATION_VALIDATION_REPORT.md",
  "docs/roadmap/POST_V1_EXPANSION_ROADMAP.md",
  "supabase/migrations/0014_phase12_life_admin_finance_foundation.sql",
  "supabase/migrations/0015_phase12_parent_ownership_guards.sql",
  "src/types/database.ts",
  "src/lib/repositories/admin-finance-read.ts",
  "src/lib/dashboard/admin-finance-dashboard-data-helpers.ts",
  "src/components/dashboard/admin-finance-dashboard-v1.tsx",
  "src/app/life-admin/page.tsx",
  "src/app/finance/page.tsx",
  "src/app/documents/page.tsx",
  "src/app/housing/page.tsx",
  "src/app/command/page.tsx",
  "src/app/calendar/page.tsx",
  "src/components/dashboard/command-dashboard-v1.tsx",
  "src/components/dashboard/calendar-dashboard-v1.tsx",
];

for (const file of requiredFiles) {
  requireFile(file);
}

console.log("\n=== Phase 12 audit: package check wiring ===");

const packageJson = JSON.parse(read("package.json"));

if (
  packageJson.scripts?.["audit:phase12"] !== "node scripts/audit-phase-12.mjs"
) {
  fail("package.json missing audit:phase12 script");
}

if (!packageJson.scripts?.check?.includes("audit:phase12")) {
  fail("npm run check does not include audit:phase12");
}

pass("package.json includes audit:phase12 in npm run check");

console.log("\n=== Phase 12 audit: source scope and deferred scope ===");

requireIncludes("docs/phase-reports/PHASE_12_SOURCE_TO_SCOPE_TRACEABILITY.md", [
  "/life-admin",
  "/finance",
  "/housing",
  "/documents",
  "/command",
  "/calendar",
  "Daily Admin Queue",
  "Manual account summaries, no bank sync",
  "Metadata/deadline tracker only",
  "Housing becomes rent/lease/utilities/admin tracking",
  "bank sync",
  "auto-pay",
  "legal advice",
  "tax advice",
  "immigration advice",
  "document upload/storage",
  "autonomous Carnos writes",
  "Python/ML execution",
  "background jobs",
]);

requireIncludes(
  "docs/phase-reports/PHASE_12_LIFE_ADMIN_PRIVACY_SAFETY_REVIEW.md",
  [
    "read-only status",
    "no external sync",
    "no automatic payment or submission",
    "no legal/tax/immigration advice",
    "document metadata",
    "hidden OCR",
    "automated contact outreach",
    "silently write finance records",
    "silently write document records",
  ],
);

console.log("\n=== Phase 12 audit: SQL foundation ===");

const phase12Sql = read(
  "supabase/migrations/0014_phase12_life_admin_finance_foundation.sql",
);
const phase12Guards = read(
  "supabase/migrations/0015_phase12_parent_ownership_guards.sql",
);

for (const table of [
  "financial_accounts",
  "budget_categories",
  "financial_logs",
  "subscriptions",
  "documents",
  "housing_options",
  "housing_contacts",
]) {
  if (!phase12Sql.includes(`create table if not exists public.${table}`)) {
    fail(`Phase 12 SQL migration missing table: ${table}`);
  }

  if (
    !phase12Sql.includes(
      `alter table public.${table} enable row level security`,
    )
  ) {
    fail(`Phase 12 SQL migration missing RLS enablement for: ${table}`);
  }

  for (const policyAction of ["select", "insert", "update", "delete"]) {
    if (!phase12Sql.includes(`${table}_${policyAction}_own`)) {
      fail(
        `Phase 12 SQL migration missing ${policyAction} own policy for: ${table}`,
      );
    }
  }
}

for (const guard of [
  "phase12_assert_parent_belongs_to_user",
  "phase12_guard_financial_logs_parent_ownership",
  "phase12_guard_subscriptions_parent_ownership",
  "phase12_guard_documents_parent_ownership",
  "phase12_guard_housing_options_parent_ownership",
  "phase12_guard_housing_contacts_parent_ownership",
]) {
  if (!phase12Guards.includes(guard)) {
    fail(`Phase 12 parent ownership migration missing guard: ${guard}`);
  }
}

pass(
  "Phase 12 SQL tables, RLS policies, and parent ownership guards are present",
);

console.log("\n=== Phase 12 audit: database types and read helpers ===");

requireIncludes("src/types/database.ts", [
  "financial_accounts",
  "budget_categories",
  "financial_logs",
  "subscriptions",
  "documents",
  "housing_options",
  "housing_contacts",
  "export type FinancialAccountRow",
  "export type BudgetCategoryRow",
  "export type FinancialLogRow",
  "export type SubscriptionRow",
  "export type LifeAdminDocumentRow",
  "export type HousingOptionRow",
  "export type HousingContactRow",
]);

requireIncludes("src/lib/repositories/index.ts", [
  'export * from "./admin-finance-read";',
]);

requireIncludes("src/lib/repositories/admin-finance-read.ts", [
  "listFinancialAccounts",
  "listBudgetCategories",
  "listFinancialLogs",
  "listSubscriptions",
  "listLifeAdminDocuments",
  "listHousingOptions",
  "listHousingContacts",
  ".select",
  ".eq",
  ".limit",
]);

forbidIncludes("src/lib/repositories/admin-finance-read.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "openai",
  "OpenAI",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
]);

pass("Phase 12 repository helpers stay read-only");

console.log("\n=== Phase 12 audit: dashboard helpers ===");

requireIncludes("src/lib/dashboard/index.ts", [
  'export * from "./admin-finance-dashboard-data-helpers";',
]);

requireIncludes("src/lib/dashboard/admin-finance-dashboard-data-helpers.ts", [
  "AdminFinanceDashboardSummary",
  "AdminFinanceDashboardDataResult",
  "getAdminFinanceDashboardDataSummary",
  "financial_account_count",
  "planned_or_pending_finance_count",
  "upcoming_subscription_count",
  "expiring_document_count",
  "overdue_document_count",
  "housing_option_count",
  "housing_follow_up_due_count",
  "admin_attention_count",
  "read_only_boundary: true",
]);

forbidIncludes("src/lib/dashboard/admin-finance-dashboard-data-helpers.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "openai",
  "OpenAI",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
  "createProposedAction",
  "executeApprovedAction",
]);

pass("Phase 12 dashboard aggregation helper stays read-only");

console.log("\n=== Phase 12 audit: routes and dashboard surfaces ===");

const routeRequirements = {
  "src/app/life-admin/page.tsx": [
    "AuthenticatedDashboardShell",
    "LifeAdminDashboardV1",
    "Read-only",
  ],
  "src/app/finance/page.tsx": [
    "AuthenticatedDashboardShell",
    "FinanceDashboardV1",
    "Read-only",
  ],
  "src/app/documents/page.tsx": [
    "AuthenticatedDashboardShell",
    "DocumentsDashboardV1",
    "Read-only",
  ],
  "src/app/housing/page.tsx": [
    "AuthenticatedDashboardShell",
    "HousingDashboardV1",
    "Read-only",
  ],
  "src/app/command/page.tsx": [
    "AuthenticatedDashboardShell",
    "CommandDashboardV1",
    "getAdminFinanceDashboardDataSummary",
    "adminFinanceData",
  ],
  "src/app/calendar/page.tsx": [
    "AuthenticatedDashboardShell",
    "CalendarDashboardV1",
    "getAdminFinanceDashboardDataSummary",
    "adminFinanceData",
  ],
};

for (const [file, markers] of Object.entries(routeRequirements)) {
  requireIncludes(file, markers);
}

const uiBoundaryFiles = [
  "src/app/life-admin/page.tsx",
  "src/app/finance/page.tsx",
  "src/app/documents/page.tsx",
  "src/app/housing/page.tsx",
  "src/app/command/page.tsx",
  "src/app/calendar/page.tsx",
  "src/components/dashboard/admin-finance-dashboard-v1.tsx",
  "src/components/dashboard/command-dashboard-v1.tsx",
  "src/components/dashboard/calendar-dashboard-v1.tsx",
];

const forbiddenUiMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  '"use client"',
  "openai",
  "OpenAI",
  "generateText",
  "streamText",
  "sendEmail",
  "setInterval(",
  "setTimeout(",
  "createProposedAction",
  "executeApprovedAction",
  "onSave=",
  "onCancel=",
];

for (const file of uiBoundaryFiles) {
  forbidIncludes(file, forbiddenUiMarkers);
}

pass(
  "Phase 12 routes and dashboards avoid direct writes, client Supabase, AI, timers, and proposal execution",
);

console.log("\n=== Phase 12 audit: dashboard content markers ===");

requireIncludes("src/components/dashboard/admin-finance-dashboard-v1.tsx", [
  "LifeAdminDashboardV1",
  "FinanceDashboardV1",
  "DocumentsDashboardV1",
  "HousingDashboardV1",
  "Admin proposed-action preview visibility",
  "ProposedActionReviewCard",
  "ADMIN_FINANCE_PROPOSED_ACTION_PREVIEWS",
  "disabled",
  "No payment, bank sync, document upload, document renewal, email, housing contact, or Carnos execution is wired here.",
  "Read-only finance boundary",
  "Read-only document boundary",
  "Read-only housing boundary",
]);

requireIncludes("src/components/dashboard/command-dashboard-v1.tsx", [
  "Admin and finance command visibility",
  "Command visibility only",
  "overdue_finance_count",
  "overdue_subscription_count",
  "overdue_document_count",
  "upcoming_subscription_count",
  "expiring_document_count",
  "housing_option_count",
  "housing operations",
]);

requireIncludes("src/components/dashboard/calendar-dashboard-v1.tsx", [
  "Admin and finance calendar visibility",
  "Calendar visibility only",
  "planned_or_pending_finance_count",
  "upcoming_subscription_count",
  "expiring_document_count",
  "housing",
  "follow-up",
]);

pass("Phase 12 dashboard content markers are present");

console.log("\n=== Phase 12 audit: no deferred implementation paths ===");

const forbiddenPaths = [
  "src/lib/banking",
  "src/lib/payments",
  "src/lib/documents/upload.ts",
  "src/lib/documents/ocr.ts",
  "src/lib/housing/scrape-listings.ts",
  "src/lib/housing/contact-outreach.ts",
  "src/lib/admin-finance/write.ts",
  "src/lib/repositories/admin-finance-write.ts",
  "apps/worker-python",
  "src/lib/memory",
];

for (const forbiddenPath of forbiddenPaths) {
  if (exists(forbiddenPath)) {
    fail(`Forbidden deferred Phase 12 path exists: ${forbiddenPath}`);
  }
}

pass("No deferred Phase 12 implementation paths exist");

console.log("\n=== Phase 12 audit: logs and progress markers ===");

requireIncludes("PHASE_STATUS.md", [
  "Phase 12 C14 Status",
  "Next step: Phase 12 C15",
  "Completed after C08: 22 / 45",
  "Completed after this chunk: 23 / 45",
  "Completed after this chunk: 28 / 45",
  "Completed after this chunk: 32 / 45",
]);

requireIncludes("PROJECT_EXECUTION_LOG.md", [
  "Phase 12 C12",
  "Phase 12 C13",
  "Phase 12 C14",
]);

requireIncludes("CODE_LEDGER.md", [
  "Phase 12 C12",
  "Phase 12 C13",
  "Phase 12 C14",
]);

requireIncludes("CHANGELOG.md", [
  "Phase 12 C12",
  "Phase 12 C13",
  "Phase 12 C14",
]);

pass("Phase 12 logs and status markers are present through C14");

console.log(checks.join("\\n"));
if (failures.length > 0) {
  console.error(`\nPhase 12 audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  "\\nPhase 12 audit passed: Life Admin + Finance + Daily Admin boundaries, scope, SQL, read helpers, dashboards, Command/Calendar visibility, and proposed-action preview protections are present.",
);
