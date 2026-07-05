import { existsSync, readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const root = process.cwd();
const outPath = join(root, "docs/phase-reports/PHASE_20Z_C_WHOLE_PROJECT_INTERCONNECTION_REALITY_AUDIT.md");

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === ".git" ||
        entry === ".verify-logs" ||
        entry === ".tmp"
      ) continue;
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

function hasAny(text, markers) {
  return markers.some((marker) => text.includes(marker));
}

const allFiles = walk(root).map((file) => relative(root, file));
const sourceFiles = allFiles.filter((file) => file.startsWith("src/") && /\.(ts|tsx)$/.test(file));
const pages = allFiles.filter((file) => file.startsWith("src/app/") && file.endsWith("page.tsx"));
const apiRoutes = allFiles.filter((file) => file.startsWith("src/app/api/") && file.endsWith("route.ts"));
const repositories = allFiles.filter((file) => file.startsWith("src/lib/repositories/") && file.endsWith(".ts"));
const helpers = allFiles.filter((file) => file.startsWith("src/lib/dashboard/") && file.endsWith(".ts"));
const components = allFiles.filter((file) => file.startsWith("src/components/") && /\.(ts|tsx)$/.test(file));
const contracts = allFiles.filter((file) => file.startsWith("docs/contracts/"));
const migrations = allFiles.filter((file) => file.startsWith("supabase/migrations/") && file.endsWith(".sql"));

const tables = new Set();
for (const migration of migrations) {
  const text = readRel(migration);
  const regexes = [
    /create table if not exists public\.([a-zA-Z0-9_]+)/g,
    /create table public\.([a-zA-Z0-9_]+)/g
  ];
  for (const regex of regexes) {
    let match;
    while ((match = regex.exec(text))) tables.add(match[1]);
  }
}

const tableList = [...tables].sort();

function tableRefsFor(file) {
  const text = readRel(file);
  return tableList.filter((table) =>
    text.includes(`"${table}"`) ||
    text.includes(`'${table}'`) ||
    text.includes(table)
  );
}

function classifySource(file) {
  const text = readRel(file);
  const refs = tableRefsFor(file);

  const usesSupabase =
    text.includes("createSupabaseServerClient") ||
    text.includes("createSupabaseBrowserClient") ||
    text.includes(".from(");

  const importsRepository =
    text.includes("@/lib/repositories") ||
    /from ["']\.\.\/.*repositories/.test(text) ||
    /from ["']@\/lib\/repositories/.test(text);

  const importsDashboardHelper =
    text.includes("@/lib/dashboard") ||
    /from ["']@\/lib\/dashboard/.test(text);

  const importsDashboardComponent =
    text.includes("@/components/dashboard") ||
    /from ["']@\/components\/dashboard/.test(text);

  const hasPlaceholder =
    /placeholder|coming soon|not wired|deferred|mock|demo/i.test(text);

  const hasWriteAction =
    text.includes("createProposedAction") ||
    text.includes("executeApprovedAction") ||
    text.includes("writeAuditLog") ||
    text.includes(".insert(") ||
    text.includes(".update(") ||
    text.includes(".delete(") ||
    text.includes(".upsert(");

  const hasAuthShell = text.includes("AuthenticatedDashboardShell");

  return {
    file,
    refs,
    usesSupabase,
    importsRepository,
    importsDashboardHelper,
    importsDashboardComponent,
    hasPlaceholder,
    hasWriteAction,
    hasAuthShell
  };
}

const pageInfo = pages.map(classifySource);
const repoInfo = repositories.map(classifySource);
const helperInfo = helpers.map(classifySource);
const apiInfo = apiRoutes.map(classifySource);

const tableUsageByRealSupabaseRepo = new Map();
for (const repo of repoInfo) {
  if (!repo.usesSupabase) continue;
  for (const table of repo.refs) {
    if (!tableUsageByRealSupabaseRepo.has(table)) tableUsageByRealSupabaseRepo.set(table, []);
    tableUsageByRealSupabaseRepo.get(table).push(repo.file);
  }
}

const tableUsageByAnySource = new Map();
for (const file of sourceFiles) {
  const refs = tableRefsFor(file);
  for (const table of refs) {
    if (!tableUsageByAnySource.has(table)) tableUsageByAnySource.set(table, []);
    tableUsageByAnySource.get(table).push(file);
  }
}

const orphanTables = tableList.filter((table) => !tableUsageByAnySource.has(table));
const noRealRepoTables = tableList.filter((table) => !tableUsageByRealSupabaseRepo.has(table));

const pageGaps = pageInfo.filter((page) =>
  !page.usesSupabase &&
  !page.importsRepository &&
  !page.importsDashboardHelper
);

const likelyStaticPages = pageInfo.filter((page) =>
  page.hasPlaceholder ||
  (!page.usesSupabase && !page.importsRepository && !page.importsDashboardHelper)
);

const contractHeavyByPhase = new Map();
for (const file of contracts) {
  const text = readRel(file).toLowerCase();
  const phaseMatch = file.match(/PHASE_([0-9]+[A-Z_0-9]*)/i);
  const phase = phaseMatch ? phaseMatch[1] : "unknown";
  const heavy =
    text.includes("boundary") ||
    text.includes("contract") ||
    text.includes("deferred") ||
    text.includes("no runtime") ||
    text.includes("no provider") ||
    text.includes("no database") ||
    text.includes("noop");
  if (heavy) {
    if (!contractHeavyByPhase.has(phase)) contractHeavyByPhase.set(phase, []);
    contractHeavyByPhase.get(phase).push(file);
  }
}

const spotifySignals = sourceFiles.filter((file) => /spotify/i.test(readRel(file)));
const spotifyActualRuntime = sourceFiles.filter((file) => {
  const text = readRel(file);
  return (
    text.includes("accounts.spotify.com") ||
    text.includes("api.spotify.com") ||
    text.includes("refresh_token") ||
    text.includes("access_token") ||
    text.includes("code_verifier") ||
    text.includes("SPOTIFY_CLIENT")
  );
});

const lines = [];

lines.push("# Phase 20Z-C — Whole Project Interconnection Reality Audit");
lines.push("");
lines.push("## Status");
lines.push("");
lines.push("Generated local audit report. This is a truth-finding audit, not a completion claim.");
lines.push("");
lines.push("## Top-Level Counts");
lines.push("");
lines.push(`- Migrations: ${migrations.length}`);
lines.push(`- Tables discovered: ${tableList.length}`);
lines.push(`- App pages: ${pages.length}`);
lines.push(`- API routes: ${apiRoutes.length}`);
lines.push(`- Repository files: ${repositories.length}`);
lines.push(`- Dashboard helper files: ${helpers.length}`);
lines.push(`- Component files: ${components.length}`);
lines.push("");

lines.push("## Pages Classified");
lines.push("");
for (const page of pageInfo) {
  lines.push(`### ${page.file}`);
  lines.push(`- Auth shell: ${page.hasAuthShell ? "yes" : "no"}`);
  lines.push(`- Direct Supabase/table read signal: ${page.usesSupabase ? "yes" : "no"}`);
  lines.push(`- Repository import signal: ${page.importsRepository ? "yes" : "no"}`);
  lines.push(`- Dashboard helper import signal: ${page.importsDashboardHelper ? "yes" : "no"}`);
  lines.push(`- Dashboard component import signal: ${page.importsDashboardComponent ? "yes" : "no"}`);
  lines.push(`- Placeholder/deferred/mock signal: ${page.hasPlaceholder ? "yes" : "no"}`);
  lines.push(`- Table references: ${page.refs.length ? page.refs.join(", ") : "none"}`);
  lines.push("");
}

lines.push("## Pages With Weak Runtime/Data Wiring Signals");
lines.push("");
if (pageGaps.length === 0) {
  lines.push("None detected by this static scan.");
} else {
  for (const page of pageGaps) lines.push(`- ${page.file}`);
}
lines.push("");

lines.push("## Likely Static / Placeholder / Deferred Pages");
lines.push("");
if (likelyStaticPages.length === 0) {
  lines.push("None detected by this static scan.");
} else {
  for (const page of likelyStaticPages) lines.push(`- ${page.file}`);
}
lines.push("");

lines.push("## Repository Files Classified");
lines.push("");
for (const repo of repoInfo) {
  lines.push(`### ${repo.file}`);
  lines.push(`- Direct Supabase/table read signal: ${repo.usesSupabase ? "yes" : "no"}`);
  lines.push(`- Write signal: ${repo.hasWriteAction ? "yes" : "no"}`);
  lines.push(`- Table references: ${repo.refs.length ? repo.refs.join(", ") : "none"}`);
  lines.push("");
}

lines.push("## Tables Without Any Source Reference");
lines.push("");
if (orphanTables.length === 0) {
  lines.push("None detected.");
} else {
  for (const table of orphanTables) lines.push(`- ${table}`);
}
lines.push("");

lines.push("## Tables Without Real Supabase Repository Usage");
lines.push("");
if (noRealRepoTables.length === 0) {
  lines.push("None detected.");
} else {
  for (const table of noRealRepoTables) lines.push(`- ${table}`);
}
lines.push("");

lines.push("## API Routes Classified");
lines.push("");
if (apiInfo.length === 0) {
  lines.push("No API routes detected.");
} else {
  for (const route of apiInfo) {
    lines.push(`### ${route.file}`);
    lines.push(`- Direct Supabase/table signal: ${route.usesSupabase ? "yes" : "no"}`);
    lines.push(`- Write/action signal: ${route.hasWriteAction ? "yes" : "no"}`);
    lines.push(`- Table references: ${route.refs.length ? route.refs.join(", ") : "none"}`);
    lines.push("");
  }
}

lines.push("## Contract-Heavy Phase Signals");
lines.push("");
for (const [phase, files] of [...contractHeavyByPhase.entries()].sort()) {
  lines.push(`### Phase ${phase}`);
  for (const file of files) lines.push(`- ${file}`);
  lines.push("");
}

lines.push("## Spotify Reality");
lines.push("");
lines.push(`- Source files mentioning Spotify: ${spotifySignals.length}`);
for (const file of spotifySignals) lines.push(`  - ${file}`);
lines.push(`- Actual Spotify runtime/token integration files: ${spotifyActualRuntime.length}`);
if (spotifyActualRuntime.length === 0) {
  lines.push("- Conclusion: Spotify is not connected yet.");
} else {
  for (const file of spotifyActualRuntime) lines.push(`  - ${file}`);
}
lines.push("");

lines.push("## Audit Conclusion");
lines.push("");
lines.push("This project is partially interconnected, not merely empty contracts. Evidence: migrations, repositories, dashboards, app pages, and shared table references exist across many domains.");
lines.push("");
lines.push("However, full end-to-end interconnection is not proven until every page is classified as DB-backed, repository-backed, intentionally static, or intentionally deferred, and every critical user flow is smoke-tested.");
lines.push("");
lines.push("Phase 21 must not proceed as visual polish only. It must include closing runtime/data-flow gaps found in this report.");
lines.push("");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, lines.join("\n") + "\n");

console.log("=== WHOLE PROJECT INTERCONNECTION REALITY SUMMARY ===");
console.log(`Report written: ${relative(root, outPath)}`);
console.log(`Tables discovered: ${tableList.length}`);
console.log(`App pages: ${pages.length}`);
console.log(`Repository files: ${repositories.length}`);
console.log(`Pages with weak runtime/data wiring signals: ${pageGaps.length}`);
for (const page of pageGaps) console.log(`WEAK_PAGE ${page.file}`);
console.log(`Likely static/placeholder/deferred pages: ${likelyStaticPages.length}`);
for (const page of likelyStaticPages) console.log(`STATIC_OR_DEFERRED ${page.file}`);
console.log(`Tables without any source reference: ${orphanTables.length}`);
for (const table of orphanTables) console.log(`ORPHAN_TABLE ${table}`);
console.log(`Tables without real Supabase repository usage: ${noRealRepoTables.length}`);
for (const table of noRealRepoTables) console.log(`NO_REAL_REPO_TABLE ${table}`);
console.log(`Spotify actual runtime/token integration files: ${spotifyActualRuntime.length}`);
if (spotifyActualRuntime.length === 0) console.log("SPOTIFY_NOT_CONNECTED");
