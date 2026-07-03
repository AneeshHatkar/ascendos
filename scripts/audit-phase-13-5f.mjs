import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
  console.log(`✓ Found ${file}`);
}

function includes(file, markers) {
  const text = read(file);
  for (const marker of markers) {
    if (!text.includes(marker)) {
      throw new Error(`${file} missing marker: ${marker}`);
    }
    console.log(`✓ ${file} includes ${marker}`);
  }
}

function excludes(file, markers) {
  const text = read(file);
  for (const marker of markers) {
    if (text.includes(marker)) {
      throw new Error(`${file} contains forbidden marker: ${marker}`);
    }
    console.log(`✓ ${file} avoids forbidden marker ${marker}`);
  }
}

const placeholderPages = {
  "src/app/creativity/page.tsx": "creativity",
  "src/app/decisions/page.tsx": "decisions",
  "src/app/experiments/page.tsx": "experiments",
  "src/app/future-simulator/page.tsx": "future_simulator",
};

const requiredFiles = [
  "src/lib/placeholder-route-decisions.ts",
  "src/components/dashboard/placeholder-dashboard-page.tsx",
  "docs/phase-reports/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_REPORT.md",
  "docs/qa/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-13-5f.mjs",
];

for (const file of requiredFiles) {
  exists(file);
}

includes("src/lib/placeholder-route-decisions.ts", [
  "PLACEHOLDER_ROUTE_DECISIONS",
  "INTENTIONAL_PLACEHOLDER_ROUTES",
  "intentional_deferred_route",
  "/creativity",
  "/decisions",
  "/future-simulator",
  "/experiments",
  "Phase 18 custom tracker builder",
  "Phase 17 analytics/experiments",
  "Post-v1",
]);

for (const [file, decisionKey] of Object.entries(placeholderPages)) {
  exists(file);
  includes(file, [
    "PlaceholderDashboardPage",
    "PLACEHOLDER_ROUTE_DECISIONS",
    decisionKey,
  ]);
  excludes(file, [
    ".insert(",
    ".update(",
    ".delete(",
    ".upsert(",
    "createProposedAction",
    "executeApprovedAction(",
    "generateText",
    "streamText",
    "OpenAI",
    "setInterval(",
    "setTimeout(",
  ]);
}

includes("src/components/dashboard/placeholder-dashboard-page.tsx", [
  "Phase 13.5F intentional placeholder route",
  "Decision lock",
  "Why deferred",
  "Protected boundary",
  "Allowed now",
  "Forbidden now",
  "does not mutate records",
  "does not",
]);

excludes("src/components/dashboard/placeholder-dashboard-page.tsx", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  "createSupabaseBrowserClient",
  "createProposedAction",
  "executeApprovedAction(",
  "generateText",
  "streamText",
  "OpenAI",
  "setInterval(",
  "setTimeout(",
]);

const allPageFiles = [];
function collectPageFiles(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const child = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPageFiles(child);
    } else if (entry.isFile() && entry.name === "page.tsx") {
      allPageFiles.push(child);
    }
  }
}

collectPageFiles("src/app");

const actualPlaceholderPages = allPageFiles
  .filter((file) => read(file).includes("PlaceholderDashboardPage"))
  .sort();

const expectedPlaceholderPages = Object.keys(placeholderPages).sort();

if (JSON.stringify(actualPlaceholderPages) !== JSON.stringify(expectedPlaceholderPages)) {
  throw new Error(
    `Unexpected placeholder page set.\nExpected: ${expectedPlaceholderPages.join(", ")}\nActual: ${actualPlaceholderPages.join(", ")}`,
  );
}

console.log("✓ Placeholder page set is locked and intentional");

const migrationFiles = fs.readdirSync(path.join(root, "supabase/migrations"));
const phase13_5fMigrations = migrationFiles.filter((file) =>
  file.includes("phase13_5f") || file.includes("placeholder_route"),
);

if (phase13_5fMigrations.length > 0) {
  throw new Error(`Phase 13.5F must not add SQL migrations: ${phase13_5fMigrations.join(", ")}`);
}

console.log("✓ Phase 13.5F did not add SQL migrations");

includes("docs/phase-reports/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_REPORT.md", [
  "Phase 13.5F Placeholder Route Decision Report",
  "Status: Complete",
  "/creativity",
  "/decisions",
  "/future-simulator",
  "/experiments",
  "not missing accidents",
  "Phase 18",
  "Phase 17",
  "Carnos rename",
]);

includes("docs/qa/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_MANUAL_SMOKE_CHECKLIST.md", [
  "Phase 13.5F Placeholder Route Decision Manual Smoke Checklist",
  "/creativity",
  "/decisions",
  "/future-simulator",
  "/experiments",
  "No writes",
]);

includes("package.json", [
  "audit:phase13_5f",
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts.check.includes("audit:phase13_5f")) {
  throw new Error("npm run check does not include audit:phase13_5f");
}
console.log("✓ npm run check includes audit:phase13_5f");

includes("PROJECT_EXECUTION_LOG.md", ["Phase 13.5F"]);
includes("CODE_LEDGER.md", ["Phase 13.5F"]);
includes("CHANGELOG.md", ["Phase 13.5F"]);
includes("PHASE_STATUS.md", ["Phase 13.5F", "Phase 13.5G"]);

console.log("\nPhase 13.5F placeholder route decision audit passed.");
