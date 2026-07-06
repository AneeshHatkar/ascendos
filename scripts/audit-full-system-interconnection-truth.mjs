import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const reportPath = join(
  root,
  "docs/phase-reports/FULL_SYSTEM_INTERCONNECTION_TRUTH_AUDIT.md",
);

const ignoredDirs = new Set([
  "node_modules",
  ".next",
  ".git",
  ".verify-logs",
  ".tmp",
  "coverage",
  "dist",
]);

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      if (ignoredDirs.has(entry)) continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }

  return acc;
}

function readRel(path) {
  return readFileSync(join(root, path), "utf8");
}

function safeReadRel(path) {
  try {
    return readRel(path);
  } catch {
    return "";
  }
}

function pushSection(lines, title) {
  lines.push("");
  lines.push(`## ${title}`);
  lines.push("");
}

function pushSubsection(lines, title) {
  lines.push("");
  lines.push(`### ${title}`);
  lines.push("");
}

function uniqueSorted(values) {
  return [...new Set(values)].sort();
}

function hasAny(text, markers) {
  return markers.some((marker) => text.includes(marker));
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

const absoluteFiles = walk(root);
const files = absoluteFiles.map((file) => relative(root, file)).sort();

const sourceFiles = files.filter((file) => file.startsWith("src/") && /\.(ts|tsx)$/.test(file));
const appPages = files.filter((file) => file.startsWith("src/app/") && file.endsWith("page.tsx"));
const layouts = files.filter((file) => file.startsWith("src/app/") && file.endsWith("layout.tsx"));
const apiRoutes = files.filter((file) => file.startsWith("src/app/api/") && file.endsWith("route.ts"));
const components = files.filter((file) => file.startsWith("src/components/") && /\.(ts|tsx)$/.test(file));
const dashboardComponents = components.filter((file) => file.startsWith("src/components/dashboard/"));
const carnosComponents = components.filter((file) => file.startsWith("src/components/carnos/"));
const libFiles = files.filter((file) => file.startsWith("src/lib/") && /\.(ts|tsx)$/.test(file));
const repositoryFiles = files.filter((file) => file.startsWith("src/lib/repositories/") && file.endsWith(".ts"));
const dashboardHelperFiles = files.filter((file) => file.startsWith("src/lib/dashboard/") && file.endsWith(".ts"));
const actionFiles = files.filter((file) => file.startsWith("src/lib/actions/") && file.endsWith(".ts"));
const carnosFiles = files.filter((file) => file.startsWith("src/lib/carnos") && /\.(ts|tsx)$/.test(file));
const memoryFiles = files.filter((file) => file.includes("memory") && /\.(ts|tsx|md|json|sql)$/.test(file));
const migrations = files.filter((file) => file.startsWith("supabase/migrations/") && file.endsWith(".sql"));
const contractDocs = files.filter((file) => file.startsWith("docs/contracts/") && file.endsWith(".md"));
const phaseReports = files.filter((file) => file.startsWith("docs/phase-reports/") && file.endsWith(".md"));
const qaDocs = files.filter((file) => file.startsWith("docs/qa/") && file.endsWith(".md"));
const auditScripts = files.filter((file) => file.startsWith("scripts/audit") && file.endsWith(".mjs"));

const packageJson = JSON.parse(safeReadRel("package.json") || "{}");
const packageScripts = packageJson.scripts || {};
const checkScript = packageScripts.check || "";

const tables = new Set();
const migrationToTables = new Map();

for (const migration of migrations) {
  const text = readRel(migration);
  const found = [];
  const regexes = [
    /create table if not exists public\.([a-zA-Z0-9_]+)/g,
    /create table public\.([a-zA-Z0-9_]+)/g,
    /alter table public\.([a-zA-Z0-9_]+)/g,
  ];

  for (const regex of regexes) {
    let match;
    while ((match = regex.exec(text))) {
      tables.add(match[1]);
      found.push(match[1]);
    }
  }

  migrationToTables.set(migration, uniqueSorted(found));
}

const tableList = uniqueSorted([...tables]);

function tableRefsForFile(file) {
  const text = safeReadRel(file);
  return tableList.filter((table) => {
    const quotedDouble = `"${table}"`;
    const quotedSingle = `'${table}'`;
    const backtick = `\`${table}\``;
    const word = new RegExp(`\\b${table}\\b`);
    return (
      text.includes(quotedDouble) ||
      text.includes(quotedSingle) ||
      text.includes(backtick) ||
      word.test(text)
    );
  });
}

function importsForFile(file) {
  const text = safeReadRel(file);
  const imports = [];
  const regex = /from\s+["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(text))) {
    imports.push(match[1]);
  }
  return imports;
}

function classifySourceFile(file) {
  const text = safeReadRel(file);
  const imports = importsForFile(file);
  const tableRefs = tableRefsForFile(file);

  const directSupabase =
    text.includes("createSupabaseServerClient") ||
    text.includes("createSupabaseBrowserClient") ||
    text.includes(".from(");

  const directWrites =
    text.includes(".insert(") ||
    text.includes(".update(") ||
    text.includes(".delete(") ||
    text.includes(".upsert(") ||
    text.includes(".rpc(");

  const actionFlow =
    text.includes("createProposedAction") ||
    text.includes("executeApprovedAction") ||
    text.includes("validateProposedAction") ||
    text.includes("writeAuditLog") ||
    text.includes("ai_actions");

  const auth =
    text.includes("AuthenticatedDashboardShell") ||
    text.includes("requireUser") ||
    text.includes("getUser") ||
    text.includes("auth.getUser") ||
    text.includes("user.id");

  const repositoryImport =
    text.includes("@/lib/repositories") ||
    imports.some((item) => item.includes("repositories"));

  const dashboardHelperImport =
    text.includes("@/lib/dashboard") ||
    imports.some((item) => item.includes("dashboard"));

  const dashboardComponentImport =
    text.includes("@/components/dashboard") ||
    imports.some((item) => item.includes("components/dashboard"));

  const carnosSignal =
    /carnos/i.test(text) ||
    imports.some((item) => /carnos/i.test(item));

  const memorySignal =
    /memory/i.test(text) ||
    imports.some((item) => /memory/i.test(item));

  const metricSignal =
    /metric|analytics|experiment|trend|correlation|snapshot/i.test(text);

  const placeholderSignal =
    /placeholder|coming soon|not wired|deferred|mock|demo|stub|noop|boundary only|contract only/i.test(text);

  const errorEmptyLoadingSignal =
    /empty|warning|error|loading|fallback|No .* found|No .* records/i.test(text);

  const externalProviderSignal =
    /spotify|garmin|google|oauth|connector|api\.spotify|accounts\.spotify|token/i.test(text);

  const route = file
    .replace(/^src\/app\//, "/")
    .replace(/\/page\.tsx$/, "")
    .replace(/\/route\.ts$/, "")
    .replace(/^\/page$/, "/");

  return {
    file,
    route,
    imports,
    tableRefs,
    directSupabase,
    directWrites,
    actionFlow,
    auth,
    repositoryImport,
    dashboardHelperImport,
    dashboardComponentImport,
    carnosSignal,
    memorySignal,
    metricSignal,
    placeholderSignal,
    errorEmptyLoadingSignal,
    externalProviderSignal,
  };
}

const sourceInfo = new Map(sourceFiles.map((file) => [file, classifySourceFile(file)]));
const pageInfo = appPages.map((file) => sourceInfo.get(file));
const repoInfo = repositoryFiles.map((file) => sourceInfo.get(file));
const helperInfo = dashboardHelperFiles.map((file) => sourceInfo.get(file));
const apiInfo = apiRoutes.map((file) => sourceInfo.get(file));

const tableUsage = new Map();
const tableRepoUsage = new Map();
const tableApiUsage = new Map();
const tablePageUsage = new Map();
const tableWriteUsage = new Map();

for (const file of sourceFiles) {
  const info = sourceInfo.get(file);
  for (const table of info.tableRefs) {
    if (!tableUsage.has(table)) tableUsage.set(table, []);
    tableUsage.get(table).push(file);

    if (repositoryFiles.includes(file) && info.directSupabase) {
      if (!tableRepoUsage.has(table)) tableRepoUsage.set(table, []);
      tableRepoUsage.get(table).push(file);
    }

    if (apiRoutes.includes(file)) {
      if (!tableApiUsage.has(table)) tableApiUsage.set(table, []);
      tableApiUsage.get(table).push(file);
    }

    if (appPages.includes(file)) {
      if (!tablePageUsage.has(table)) tablePageUsage.set(table, []);
      tablePageUsage.get(table).push(file);
    }

    if (info.directWrites || info.actionFlow) {
      if (!tableWriteUsage.has(table)) tableWriteUsage.set(table, []);
      tableWriteUsage.get(table).push(file);
    }
  }
}

function phaseIdFromPath(path) {
  const match = path.match(/PHASE_([0-9]+(?:_[0-9]+)?[A-Z]?(?:_[A-Z])?)/i);
  if (match) return match[1].replace(/_/g, ".");
  const chunk = path.match(/phase([0-9]+[a-z]?)/i);
  if (chunk) return chunk[1].toUpperCase();
  return "unknown";
}

const phases = new Map();

function ensurePhase(phase) {
  if (!phases.has(phase)) {
    phases.set(phase, {
      phase,
      migrations: [],
      contracts: [],
      reports: [],
      qa: [],
      audits: [],
      fixtures: [],
      source: [],
      packageScripts: [],
      checkIntegrated: false,
      likelyRuntime: false,
      likelyContractHeavy: false,
      likelyUi: false,
      likelySchema: false,
      likelyCarnos: false,
      likelyMetrics: false,
      likelyConnector: false,
    });
  }
  return phases.get(phase);
}

for (const file of migrations) {
  const phase = phaseIdFromPath(file);
  const item = ensurePhase(phase);
  item.migrations.push(file);
  item.likelySchema = true;
}

for (const file of contractDocs) {
  const phase = phaseIdFromPath(file);
  const item = ensurePhase(phase);
  const text = safeReadRel(file).toLowerCase();
  item.contracts.push(file);
  if (
    text.includes("boundary") ||
    text.includes("contract") ||
    text.includes("deferred") ||
    text.includes("noop") ||
    text.includes("no runtime") ||
    text.includes("no provider") ||
    text.includes("no database")
  ) {
    item.likelyContractHeavy = true;
  }
  if (text.includes("carnos")) item.likelyCarnos = true;
  if (text.includes("metric") || text.includes("analytics") || text.includes("experiment")) item.likelyMetrics = true;
  if (text.includes("connector") || text.includes("spotify") || text.includes("oauth")) item.likelyConnector = true;
}

for (const file of phaseReports) {
  const phase = phaseIdFromPath(file);
  const item = ensurePhase(phase);
  item.reports.push(file);
}

for (const file of qaDocs) {
  const phase = phaseIdFromPath(file);
  const item = ensurePhase(phase);
  item.qa.push(file);
}

for (const file of auditScripts) {
  const text = safeReadRel(file);
  const names = [...text.matchAll(/phase([0-9]+[a-z_0-9]*)/gi)].map((m) => m[1].toUpperCase());
  const phase = names[0] || phaseIdFromPath(file);
  const item = ensurePhase(phase);
  item.audits.push(file);
}

for (const [name, value] of Object.entries(packageScripts)) {
  if (!name.startsWith("audit:phase")) continue;
  const phase = name.replace("audit:phase", "").toUpperCase();
  const item = ensurePhase(phase);
  item.packageScripts.push(name);
  if (checkScript.includes(`npm run ${name}`)) item.checkIntegrated = true;
}

for (const file of sourceFiles) {
  const text = safeReadRel(file).toLowerCase();
  for (const phase of phases.keys()) {
    const normalized = String(phase).toLowerCase().replace(".", "_");
    if (
      text.includes(`phase ${String(phase).toLowerCase()}`) ||
      text.includes(`phase_${normalized}`) ||
      text.includes(`phase${normalized}`)
    ) {
      const item = ensurePhase(phase);
      item.source.push(file);
      item.likelyRuntime = true;
      if (file.includes("components")) item.likelyUi = true;
      if (text.includes("carnos")) item.likelyCarnos = true;
      if (text.includes("metric") || text.includes("analytics") || text.includes("experiment")) item.likelyMetrics = true;
    }
  }
}

const weakPages = pageInfo.filter((info) => {
  if (!info) return false;
  if (info.file.includes("/auth/")) return false;
  return !info.directSupabase && !info.repositoryImport && !info.dashboardHelperImport && !info.dashboardComponentImport;
});

const delegatedPages = pageInfo.filter((info) => {
  if (!info) return false;
  return !info.directSupabase && (info.dashboardComponentImport || info.repositoryImport || info.dashboardHelperImport);
});

const directDataPages = pageInfo.filter((info) => info?.directSupabase || info?.repositoryImport || info?.dashboardHelperImport);

const suspiciousPages = pageInfo.filter((info) => {
  if (!info) return false;
  if (info.file.includes("/auth/")) return false;
  return info.placeholderSignal || (!info.directSupabase && !info.repositoryImport && !info.dashboardHelperImport);
});

const noEmptyErrorPages = pageInfo.filter((info) => {
  if (!info) return false;
  if (info.file.includes("/auth/")) return false;
  return !info.errorEmptyLoadingSignal;
});

const reposWithoutSupabase = repoInfo.filter((info) => info && !info.directSupabase);
const reposWithoutTables = repoInfo.filter((info) => info && info.tableRefs.length === 0);

const tablesNoSource = tableList.filter((table) => !tableUsage.has(table));
const tablesNoRepo = tableList.filter((table) => !tableRepoUsage.has(table));
const tablesNoWrite = tableList.filter((table) => !tableWriteUsage.has(table));
const tablesNoApi = tableList.filter((table) => !tableApiUsage.has(table));

const carnosSource = sourceFiles.filter((file) => /carnos/i.test(file) || /carnos/i.test(safeReadRel(file)));
const carnosPages = appPages.filter((file) => /carnos/i.test(file) || /carnos/i.test(safeReadRel(file)));
const carnosApi = apiRoutes.filter((file) => /carnos/i.test(file) || /carnos/i.test(safeReadRel(file)));
const carnosWriteSignals = carnosSource.filter((file) =>
  hasAny(safeReadRel(file), [".insert(", ".update(", ".delete(", ".upsert(", "createProposedAction", "executeApprovedAction", "writeAuditLog"]),
);

const metricSource = sourceFiles.filter((file) => /metric|analytics|experiment|trend|correlation|snapshot/i.test(file) || /metric|analytics|experiment|trend|correlation|snapshot/i.test(safeReadRel(file)));
const metricPages = appPages.filter((file) => /analytics|experiments/i.test(file) || /metric|analytics|experiment|trend|correlation|snapshot/i.test(safeReadRel(file)));

const connectorSource = sourceFiles.filter((file) => /connector|spotify|oauth|garmin|token|external/i.test(file) || /connector|spotify|oauth|garmin|token|external/i.test(safeReadRel(file)));
const spotifyRuntime = sourceFiles.filter((file) => {
  const text = safeReadRel(file);
  return hasAny(text, [
    "accounts.spotify.com",
    "api.spotify.com",
    "SPOTIFY_CLIENT",
    "refresh_token",
    "access_token",
    "code_verifier",
    "code_challenge",
  ]);
});

const apiWriteRoutes = apiInfo.filter((info) => info && (info.directWrites || info.actionFlow));
const apiReadOnlyRoutes = apiInfo.filter((info) => info && !info.directWrites && !info.actionFlow);

const phaseRows = [...phases.values()].sort((a, b) => String(a.phase).localeCompare(String(b.phase)));

for (const phase of phaseRows) {
  const allText = [
    ...phase.contracts,
    ...phase.reports,
    ...phase.qa,
    ...phase.source,
  ].map(safeReadRel).join("\n").toLowerCase();

  if (phase.source.length > 0 || allText.includes(".from(") || allText.includes("supabase")) phase.likelyRuntime = true;
  if (allText.includes("dashboard") || allText.includes("page.tsx") || allText.includes("component")) phase.likelyUi = true;
  if (allText.includes("carnos")) phase.likelyCarnos = true;
  if (allText.includes("metric") || allText.includes("analytics") || allText.includes("experiment")) phase.likelyMetrics = true;
  if (allText.includes("connector") || allText.includes("spotify") || allText.includes("oauth")) phase.likelyConnector = true;
}

const phaseProblems = [];

for (const phase of phaseRows) {
  const problems = [];

  if (phase.contracts.length > 0 && phase.source.length === 0 && phase.migrations.length === 0) {
    problems.push("contract/report-heavy with no direct source/migration mapping detected");
  }

  if (phase.packageScripts.length > 0 && !phase.checkIntegrated) {
    problems.push("has package audit script but is not check-integrated");
  }

  if (phase.likelyConnector && phase.likelyContractHeavy && phase.source.length === 0) {
    problems.push("connector phase appears boundary-only");
  }

  if (phase.likelyCarnos && phase.likelyContractHeavy && phase.source.length === 0) {
    problems.push("Carnos phase appears contract-heavy without direct runtime mapping");
  }

  if (phase.likelyMetrics && phase.likelyContractHeavy && phase.source.length === 0) {
    problems.push("metrics/analytics phase appears contract-heavy without direct runtime mapping");
  }

  if (problems.length > 0) {
    phaseProblems.push({ phase: phase.phase, problems, data: phase });
  }
}

const lines = [];

lines.push("# Full System Interconnection Truth Audit");
lines.push("");
lines.push("## Status");
lines.push("");
lines.push("Generated-only audit. Do not treat this as a completion claim. This report is meant to reveal integration gaps before Phase 21.");
lines.push("");
lines.push("## Executive Summary");
lines.push("");
lines.push(`- Total files scanned: ${files.length}`);
lines.push(`- Source files scanned: ${sourceFiles.length}`);
lines.push(`- App pages: ${appPages.length}`);
lines.push(`- API routes: ${apiRoutes.length}`);
lines.push(`- Components: ${components.length}`);
lines.push(`- Dashboard components: ${dashboardComponents.length}`);
lines.push(`- Repository files: ${repositoryFiles.length}`);
lines.push(`- Dashboard helper files: ${dashboardHelperFiles.length}`);
lines.push(`- Supabase migrations: ${migrations.length}`);
lines.push(`- Tables discovered: ${tableList.length}`);
lines.push(`- Package audit scripts: ${Object.keys(packageScripts).filter((name) => name.startsWith("audit:phase")).length}`);
lines.push(`- Phases/chunks detected from artifacts: ${phaseRows.length}`);
lines.push("");
lines.push("## Critical Findings");
lines.push("");
lines.push(`- Weak non-auth pages with no direct/delegated data wiring signal: ${weakPages.length}`);
lines.push(`- Delegated pages that need component-level verification: ${delegatedPages.length}`);
lines.push(`- Suspicious/static/deferred pages: ${suspiciousPages.length}`);
lines.push(`- Pages without clear empty/error/loading signals: ${noEmptyErrorPages.length}`);
lines.push(`- Repository files without direct Supabase signal: ${reposWithoutSupabase.length}`);
lines.push(`- Tables without any source reference: ${tablesNoSource.length}`);
lines.push(`- Tables without real repository Supabase usage: ${tablesNoRepo.length}`);
lines.push(`- Tables without write/action/API write signal: ${tablesNoWrite.length}`);
lines.push(`- Spotify runtime/token files: ${spotifyRuntime.length}`);
lines.push(`- Phase-level suspicious mappings: ${phaseProblems.length}`);
lines.push("");

pushSection(lines, "Route/Page Runtime Classification");
for (const info of pageInfo) {
  lines.push(`### ${info.file}`);
  lines.push(`- Route: ${info.route}`);
  lines.push(`- Auth/user signal: ${info.auth ? "yes" : "no"}`);
  lines.push(`- Direct Supabase signal: ${info.directSupabase ? "yes" : "no"}`);
  lines.push(`- Repository import signal: ${info.repositoryImport ? "yes" : "no"}`);
  lines.push(`- Dashboard helper import signal: ${info.dashboardHelperImport ? "yes" : "no"}`);
  lines.push(`- Dashboard component import signal: ${info.dashboardComponentImport ? "yes" : "no"}`);
  lines.push(`- Write/action signal: ${info.directWrites || info.actionFlow ? "yes" : "no"}`);
  lines.push(`- Carnos signal: ${info.carnosSignal ? "yes" : "no"}`);
  lines.push(`- Memory signal: ${info.memorySignal ? "yes" : "no"}`);
  lines.push(`- Metrics signal: ${info.metricSignal ? "yes" : "no"}`);
  lines.push(`- Placeholder/deferred/mock/boundary signal: ${info.placeholderSignal ? "yes" : "no"}`);
  lines.push(`- Empty/error/loading signal: ${info.errorEmptyLoadingSignal ? "yes" : "no"}`);
  lines.push(`- Table refs: ${info.tableRefs.length ? info.tableRefs.join(", ") : "none"}`);
  lines.push("");
}

pushSection(lines, "Weak Non-Auth Pages");
if (weakPages.length === 0) lines.push("None detected.");
for (const info of weakPages) {
  lines.push(`- ${info.file}`);
}

pushSection(lines, "Delegated Pages Requiring Component-Level Verification");
if (delegatedPages.length === 0) lines.push("None detected.");
for (const info of delegatedPages) {
  lines.push(`- ${info.file}`);
}

pushSection(lines, "Suspicious Static / Deferred / Placeholder Pages");
if (suspiciousPages.length === 0) lines.push("None detected.");
for (const info of suspiciousPages) {
  lines.push(`- ${info.file}`);
}

pushSection(lines, "Pages Without Clear Empty/Error/Loading Signals");
if (noEmptyErrorPages.length === 0) lines.push("None detected.");
for (const info of noEmptyErrorPages) {
  lines.push(`- ${info.file}`);
}

pushSection(lines, "Repository Runtime Classification");
for (const info of repoInfo) {
  lines.push(`### ${info.file}`);
  lines.push(`- Direct Supabase signal: ${info.directSupabase ? "yes" : "no"}`);
  lines.push(`- Write signal: ${info.directWrites ? "yes" : "no"}`);
  lines.push(`- Action/audit signal: ${info.actionFlow ? "yes" : "no"}`);
  lines.push(`- Table refs: ${info.tableRefs.length ? info.tableRefs.join(", ") : "none"}`);
  lines.push("");
}

pushSection(lines, "Repository Files Without Direct Supabase Signal");
if (reposWithoutSupabase.length === 0) lines.push("None detected.");
for (const info of reposWithoutSupabase) {
  lines.push(`- ${info.file}`);
}

pushSection(lines, "Dashboard Helper Classification");
for (const info of helperInfo) {
  lines.push(`### ${info.file}`);
  lines.push(`- Direct Supabase signal: ${info.directSupabase ? "yes" : "no"}`);
  lines.push(`- Repository import signal: ${info.repositoryImport ? "yes" : "no"}`);
  lines.push(`- Table refs: ${info.tableRefs.length ? info.tableRefs.join(", ") : "none"}`);
  lines.push("");
}

pushSection(lines, "API Route Classification");
if (apiInfo.length === 0) lines.push("No API routes detected.");
for (const info of apiInfo) {
  lines.push(`### ${info.file}`);
  lines.push(`- Direct Supabase signal: ${info.directSupabase ? "yes" : "no"}`);
  lines.push(`- Write/action signal: ${info.directWrites || info.actionFlow ? "yes" : "no"}`);
  lines.push(`- Carnos signal: ${info.carnosSignal ? "yes" : "no"}`);
  lines.push(`- Table refs: ${info.tableRefs.length ? info.tableRefs.join(", ") : "none"}`);
  lines.push("");
}

pushSection(lines, "Schema / Table Coverage");
for (const table of tableList) {
  lines.push(`### ${table}`);
  lines.push(`- Migration files: ${[...migrationToTables.entries()].filter(([, tablesForMigration]) => tablesForMigration.includes(table)).map(([file]) => file).join(", ") || "unknown"}`);
  lines.push(`- Any source refs: ${tableUsage.get(table)?.join(", ") || "none"}`);
  lines.push(`- Real repository refs: ${tableRepoUsage.get(table)?.join(", ") || "none"}`);
  lines.push(`- API route refs: ${tableApiUsage.get(table)?.join(", ") || "none"}`);
  lines.push(`- Page refs: ${tablePageUsage.get(table)?.join(", ") || "none"}`);
  lines.push(`- Write/action refs: ${tableWriteUsage.get(table)?.join(", ") || "none"}`);
  lines.push("");
}

pushSection(lines, "Tables Without Any Source Reference");
if (tablesNoSource.length === 0) lines.push("None detected.");
for (const table of tablesNoSource) lines.push(`- ${table}`);

pushSection(lines, "Tables Without Real Repository Supabase Usage");
if (tablesNoRepo.length === 0) lines.push("None detected.");
for (const table of tablesNoRepo) lines.push(`- ${table}`);

pushSection(lines, "Tables Without Write/Action Signal");
if (tablesNoWrite.length === 0) lines.push("None detected.");
for (const table of tablesNoWrite) lines.push(`- ${table}`);

pushSection(lines, "Carnos Interconnection");
lines.push(`- Carnos source files/signals: ${carnosSource.length}`);
for (const file of carnosSource) lines.push(`  - ${file}`);
lines.push(`- Carnos pages: ${carnosPages.length}`);
for (const file of carnosPages) lines.push(`  - ${file}`);
lines.push(`- Carnos API routes: ${carnosApi.length}`);
for (const file of carnosApi) lines.push(`  - ${file}`);
lines.push(`- Carnos write/action/audit signal files: ${carnosWriteSignals.length}`);
for (const file of carnosWriteSignals) lines.push(`  - ${file}`);

pushSection(lines, "Metrics / Analytics / Experiments Interconnection");
lines.push(`- Metric/analytics/experiment source files/signals: ${metricSource.length}`);
for (const file of metricSource) lines.push(`  - ${file}`);
lines.push(`- Metric/analytics/experiment pages: ${metricPages.length}`);
for (const file of metricPages) lines.push(`  - ${file}`);

pushSection(lines, "Connector / Spotify Reality");
lines.push(`- Connector/provider source signal files: ${connectorSource.length}`);
for (const file of connectorSource) lines.push(`  - ${file}`);
lines.push(`- Spotify runtime/token integration files: ${spotifyRuntime.length}`);
if (spotifyRuntime.length === 0) {
  lines.push("- Conclusion: Spotify is not connected. Current Spotify work is boundary/planning/UI truth only.");
} else {
  for (const file of spotifyRuntime) lines.push(`  - ${file}`);
}

pushSection(lines, "Phase / Chunk Artifact Classification");
for (const phase of phaseRows) {
  lines.push(`### Phase ${phase.phase}`);
  lines.push(`- Migrations: ${phase.migrations.length}`);
  for (const file of phase.migrations) lines.push(`  - ${file}`);
  lines.push(`- Contracts: ${phase.contracts.length}`);
  for (const file of phase.contracts) lines.push(`  - ${file}`);
  lines.push(`- Reports: ${phase.reports.length}`);
  for (const file of phase.reports) lines.push(`  - ${file}`);
  lines.push(`- QA docs: ${phase.qa.length}`);
  for (const file of phase.qa) lines.push(`  - ${file}`);
  lines.push(`- Audit scripts: ${phase.audits.length}`);
  for (const file of phase.audits) lines.push(`  - ${file}`);
  lines.push(`- Package scripts: ${phase.packageScripts.length ? phase.packageScripts.join(", ") : "none"}`);
  lines.push(`- Check integrated: ${phase.checkIntegrated ? "yes" : "no"}`);
  lines.push(`- Runtime/source mapping signal: ${phase.likelyRuntime ? "yes" : "no"}`);
  lines.push(`- UI signal: ${phase.likelyUi ? "yes" : "no"}`);
  lines.push(`- Schema signal: ${phase.likelySchema ? "yes" : "no"}`);
  lines.push(`- Contract-heavy signal: ${phase.likelyContractHeavy ? "yes" : "no"}`);
  lines.push(`- Carnos signal: ${phase.likelyCarnos ? "yes" : "no"}`);
  lines.push(`- Metrics signal: ${phase.likelyMetrics ? "yes" : "no"}`);
  lines.push(`- Connector signal: ${phase.likelyConnector ? "yes" : "no"}`);
  lines.push("");
}

pushSection(lines, "Suspicious Phase-Level Mappings");
if (phaseProblems.length === 0) lines.push("None detected.");
for (const item of phaseProblems) {
  lines.push(`### Phase ${item.phase}`);
  for (const problem of item.problems) lines.push(`- ${problem}`);
  lines.push(`- Contracts: ${item.data.contracts.length}`);
  lines.push(`- Migrations: ${item.data.migrations.length}`);
  lines.push(`- Source mappings: ${item.data.source.length}`);
  lines.push(`- Check integrated: ${item.data.checkIntegrated ? "yes" : "no"}`);
  lines.push("");
}

pushSection(lines, "Required Human Review Questions");
lines.push("- Which weak pages are intentional post-v1 pages?");
lines.push("- Which delegated pages actually call repository/helper data after component-level inspection?");
lines.push("- Which contract-heavy phases must become runtime before v1?");
lines.push("- Which tables need write flows versus read-only dashboards?");
lines.push("- Should Spotify be implemented before v1 or explicitly marked post-v1?");
lines.push("- Does Carnos have enough real read/write/audit capability for v1?");
lines.push("- Do metrics/analytics use real user data or mostly summaries/contracts?");
lines.push("- Are all primary navigation items honest about whether they are operational?");
lines.push("");

pushSection(lines, "Recommended Fix Order");
lines.push("1. Verify delegated dashboards with targeted audits, not shallow page-only scans.");
lines.push("2. Fix or defer weak pages.");
lines.push("3. Add repository coverage for tables with no real repository usage.");
lines.push("4. Add end-to-end smoke tests for core flows: goals, tasks, calendar, Carnos chat, proof, health, finance, memory, privacy.");
lines.push("5. Decide Spotify: real connector before v1 or post-v1.");
lines.push("6. Only then proceed to Phase 21 final polish.");
lines.push("");

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, lines.join("\n").replace(/\n+$/g, "\n"));

console.log("=== FULL SYSTEM INTERCONNECTION TRUTH AUDIT ===");
console.log(`Report: ${relative(root, reportPath)}`);
console.log(`Files scanned: ${files.length}`);
console.log(`Source files: ${sourceFiles.length}`);
console.log(`App pages: ${appPages.length}`);
console.log(`API routes: ${apiRoutes.length}`);
console.log(`Components: ${components.length}`);
console.log(`Repositories: ${repositoryFiles.length}`);
console.log(`Dashboard helpers: ${dashboardHelperFiles.length}`);
console.log(`Migrations: ${migrations.length}`);
console.log(`Tables: ${tableList.length}`);
console.log(`Detected phases/chunks: ${phaseRows.length}`);
console.log("");
console.log(`WEAK_PAGES=${weakPages.length}`);
for (const info of weakPages) console.log(`WEAK_PAGE ${info.file}`);
console.log("");
console.log(`DELEGATED_PAGES_NEED_COMPONENT_AUDIT=${delegatedPages.length}`);
for (const info of delegatedPages) console.log(`DELEGATED_PAGE ${info.file}`);
console.log("");
console.log(`SUSPICIOUS_STATIC_DEFERRED_PAGES=${suspiciousPages.length}`);
for (const info of suspiciousPages) console.log(`SUSPICIOUS_PAGE ${info.file}`);
console.log("");
console.log(`PAGES_WITHOUT_EMPTY_ERROR_LOADING=${noEmptyErrorPages.length}`);
for (const info of noEmptyErrorPages) console.log(`NO_STATE_PAGE ${info.file}`);
console.log("");
console.log(`REPOS_WITHOUT_SUPABASE=${reposWithoutSupabase.length}`);
for (const info of reposWithoutSupabase) console.log(`REPO_NO_SUPABASE ${info.file}`);
console.log("");
console.log(`TABLES_WITHOUT_SOURCE=${tablesNoSource.length}`);
for (const table of tablesNoSource) console.log(`TABLE_NO_SOURCE ${table}`);
console.log("");
console.log(`TABLES_WITHOUT_REPOSITORY=${tablesNoRepo.length}`);
for (const table of tablesNoRepo) console.log(`TABLE_NO_REPO ${table}`);
console.log("");
console.log(`TABLES_WITHOUT_WRITE_SIGNAL=${tablesNoWrite.length}`);
for (const table of tablesNoWrite) console.log(`TABLE_NO_WRITE ${table}`);
console.log("");
console.log(`SPOTIFY_RUNTIME_FILES=${spotifyRuntime.length}`);
if (spotifyRuntime.length === 0) console.log("SPOTIFY_NOT_CONNECTED");
console.log("");
console.log(`SUSPICIOUS_PHASES=${phaseProblems.length}`);
for (const item of phaseProblems) console.log(`SUSPICIOUS_PHASE ${item.phase}: ${item.problems.join("; ")}`);
