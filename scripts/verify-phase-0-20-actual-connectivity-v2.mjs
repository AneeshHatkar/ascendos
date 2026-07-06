#!/usr/bin/env node

/**
 * ascendOS / Carnos Phase 0–20 Actual Connectivity Verification v2
 *
 * This is stricter about real code evidence but less stupid about table names.
 *
 * v1 showed false BLOCKED statuses because it used hardcoded guessed table names
 * like timeline_items/calendar_events even when the repo may use calendar_blocks,
 * items, body_logs, etc.
 *
 * v2 checks:
 * - source-of-truth presence
 * - app routes
 * - API routes
 * - migrations
 * - RLS
 * - repositories
 * - repository table reads
 * - route/helper/component connectivity
 * - source import graph
 * - npm check output
 * - feature-domain keyword evidence across real table names + repo files
 * - post-v1 / boundary truth labels
 *
 * It writes:
 * - docs/phase-reports/PHASE_20Z_ACTUAL_PROJECT_CONNECTIVITY_V2.md
 * - docs/fixtures/full-project-connectivity/phase_0_20_actual_connectivity_v2.json
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import childProcess from "node:child_process";

const ROOT = process.cwd();

const OUT_MD = "docs/phase-reports/PHASE_20Z_ACTUAL_PROJECT_CONNECTIVITY_V2.md";
const OUT_JSON = "docs/fixtures/full-project-connectivity/phase_0_20_actual_connectivity_v2.json";

const RUN_CHECK = process.argv.includes("--run-check");

const IGNORE_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  ".vercel",
  "coverage",
  "dist",
  "build",
  ".turbo",
  ".cache",
]);

const TEXT_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".sql",
  ".css",
  ".yml",
  ".yaml",
  ".txt",
]);

const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

const REQUIRED_SOURCE_OF_TRUTH = {
  json: "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
  docx: "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
};

const FEATURES = [
  {
    id: "command",
    name: "Command dashboard",
    phase: "0–7",
    requiredRoutes: ["/command"],
    routeAliases: [],
    keywords: ["command", "dashboard", "goal", "task", "calendar", "proof", "timeline"],
    requiredRuntime: true,
  },
  {
    id: "goals_proof_tasks",
    name: "Goals / proof / tasks",
    phase: "2–8",
    requiredRoutes: ["/goals"],
    keywords: ["goal", "task", "proof", "milestone"],
    requiredRuntime: true,
  },
  {
    id: "calendar_timeline_routines",
    name: "Calendar / timeline / routines",
    phase: "7 / 13",
    requiredRoutes: ["/calendar", "/timeline"],
    keywords: ["calendar", "timeline", "routine", "reminder", "block"],
    requiredRuntime: true,
  },
  {
    id: "career",
    name: "Career / jobs / networking / resume / interviews",
    phase: "8–9",
    requiredRoutes: ["/career", "/networking", "/resume", "/interviews"],
    keywords: ["career", "job", "application", "network", "contact", "resume", "interview", "referral"],
    requiredRuntime: true,
  },
  {
    id: "learning_projects_knowledge",
    name: "Learning / projects / knowledge",
    phase: "10 / 15 / 16",
    requiredRoutes: ["/learning", "/projects", "/knowledge"],
    keywords: ["learning", "project", "knowledge", "resource", "module", "session", "artifact", "tag", "link"],
    requiredRuntime: true,
  },
  {
    id: "research_stanford_phd",
    name: "Research / Stanford / PhD",
    phase: "11–12 / 16",
    requiredRoutesAny: [["/research", "/research-lab"], ["/stanford", "/research-stanford", "/world-class"]],
    keywords: ["research", "paper", "note", "source", "claim", "evidence", "review", "stanford", "phd", "publication", "advisor", "reading"],
    requiredRuntime: true,
  },
  {
    id: "health_body",
    name: "Health / body / nutrition / sleep / emotion / hair skincare",
    phase: "13–14",
    requiredRoutes: ["/body", "/nutrition", "/sleep-energy", "/emotion", "/hair-skincare", "/supplements"],
    keywords: ["body", "health", "workout", "nutrition", "meal", "sleep", "energy", "emotion", "supplement", "skin", "hair", "habit"],
    requiredRuntime: true,
  },
  {
    id: "life_admin_finance",
    name: "Life admin / finance / housing / documents",
    phase: "13 / 15",
    requiredRoutes: ["/life-admin", "/finance", "/housing", "/documents"],
    keywords: ["admin", "finance", "transaction", "budget", "bill", "document", "housing", "account"],
    requiredRuntime: true,
  },
  {
    id: "grimoire",
    name: "Grimoire",
    phase: "15",
    requiredRoutes: ["/grimoire"],
    keywords: ["grimoire", "reflection", "symbol", "practice", "ritual", "entry", "template"],
    requiredRuntime: true,
  },
  {
    id: "carnos_memory_voice",
    name: "Carnos / chat / voice / memory",
    phase: "5–6 / 16–17",
    requiredRoutes: ["/carnos", "/knowledge", "/settings"],
    keywords: ["carnos", "chat", "message", "session", "action", "memory", "context", "voice", "settings"],
    requiredRuntime: true,
  },
  {
    id: "current_info",
    name: "Current info / web source / knowledge bridge",
    phase: "16",
    requiredRoutesAny: [["/knowledge"], ["/privacy"], ["/research", "/research-lab"]],
    keywords: ["current", "web", "source", "review", "duplicate", "knowledge", "evidence"],
    requiredRuntime: true,
  },
  {
    id: "analytics_experiments",
    name: "Analytics / experiments",
    phase: "18",
    requiredRoutes: ["/analytics", "/experiments"],
    keywords: ["analytics", "metric", "experiment", "snapshot", "event"],
    contractAllowed: true,
  },
  {
    id: "custom_trackers",
    name: "Custom trackers",
    phase: "19",
    requiredRoutes: ["/custom-trackers"],
    keywords: ["custom", "tracker", "field", "entry"],
    postV1Allowed: true,
  },
  {
    id: "privacy_connectors_spotify",
    name: "Privacy / export / connectors / Spotify",
    phase: "20",
    requiredRoutes: ["/privacy", "/settings"],
    keywords: ["privacy", "export", "connector", "spotify", "token", "account"],
    postV1Allowed: true,
  },
];

function rel(abs) {
  return path.relative(ROOT, abs).replaceAll(path.sep, "/");
}

function abs(p) {
  return path.join(ROOT, p);
}

function exists(p) {
  return fs.existsSync(abs(p));
}

function read(p) {
  return fs.readFileSync(abs(p), "utf8");
}

function safeRead(p) {
  try {
    return read(p);
  } catch {
    return "";
  }
}

function isIgnored(absPath) {
  return rel(absPath).split("/").some((part) => IGNORE_DIRS.has(part));
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (isIgnored(p)) continue;

    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile()) out.push(p);
  }

  return out;
}

function ext(file) {
  return path.extname(file);
}

function isText(file) {
  return TEXT_EXTS.has(ext(file));
}

function isCode(file) {
  return CODE_EXTS.has(ext(file));
}

function lines(text) {
  return text ? text.split(/\r?\n/).length : 0;
}

function uniq(xs) {
  return [...new Set(xs)];
}

function run(command) {
  try {
    return {
      ok: true,
      output: childProcess.execSync(command, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 1024 * 1024 * 50,
      }),
    };
  } catch (error) {
    return {
      ok: false,
      status: error.status ?? null,
      output: `${error.stdout || ""}${error.stderr || ""}`,
    };
  }
}

function gitStatus() {
  return run("git status --short").output.trim();
}

function gitHead() {
  return run("git log --oneline -1").output.trim();
}

function extractCreateTables(sql) {
  const out = [];
  const re = /create\s+table\s+(?:if\s+not\s+exists\s+)?(?:"?public"?\.)?"?([a-zA-Z0-9_]+)"?/gi;
  let m;
  while ((m = re.exec(sql))) out.push(m[1]);
  return uniq(out).sort();
}

function extractRlsTables(sql) {
  const out = [];
  const re = /alter\s+table\s+(?:if\s+exists\s+)?(?:"?public"?\.)?"?([a-zA-Z0-9_]+)"?\s+enable\s+row\s+level\s+security/gi;
  let m;
  while ((m = re.exec(sql))) out.push(m[1]);
  return uniq(out).sort();
}

function extractRepoTables(text) {
  const out = [];
  const fromRe = /\.from\s*\(\s*["'`]([a-zA-Z0-9_]+)["'`]\s*\)/g;
  const rpcRe = /\.rpc\s*\(\s*["'`]([a-zA-Z0-9_]+)["'`]/g;
  let m;
  while ((m = fromRe.exec(text))) out.push(m[1]);
  while ((m = rpcRe.exec(text))) out.push(m[1]);
  return out;
}

function extractImports(text) {
  const specs = [];
  const regexes = [
    /import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["'`]([^"'`]+)["'`]/g,
    /export\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)["'`]([^"'`]+)["'`]/g,
    /import\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
    /require\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
  ];

  for (const re of regexes) {
    let m;
    while ((m = re.exec(text))) specs.push(m[1]);
  }

  return uniq(specs);
}

function isInternalImport(spec) {
  return spec.startsWith(".") || spec.startsWith("@/") || spec.startsWith("~/");
}

function resolveImport(from, spec) {
  let base;

  if (spec.startsWith("@/")) {
    base = abs("src/" + spec.slice(2));
  } else if (spec.startsWith("~/")) {
    base = abs(spec.slice(2));
  } else if (spec.startsWith(".")) {
    base = path.resolve(path.dirname(abs(from)), spec);
  } else {
    return { ok: true, resolved: null };
  }

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.mjs`,
    `${base}.cjs`,
    `${base}.json`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.js"),
    path.join(base, "index.jsx"),
    path.join(base, "page.tsx"),
    path.join(base, "route.ts"),
  ];

  const hit = candidates.find((x) => fs.existsSync(x));
  return { ok: Boolean(hit), resolved: hit ? rel(hit) : rel(candidates[0]) };
}

function routeFromPage(file) {
  let route = file.replace(/^src\/app/, "").replace(/\/page\.(tsx|ts|jsx|js)$/, "");
  route = route.replace(/\/\([^)]+\)/g, "");
  route = route.replace(/\/\[[^\]]+\]/g, "/:param");
  return route || "/";
}

function routeFromApi(file) {
  let route = file.replace(/^src\/app/, "").replace(/\/route\.(ts|js)$/, "");
  route = route.replace(/\/\([^)]+\)/g, "");
  route = route.replace(/\/\[[^\]]+\]/g, "/:param");
  return route || "/";
}

function hasRuntimeSignal(text) {
  return /\.from\s*\(|\.select\s*\(|createServerClient|createClient|supabase|list[A-Z][A-Za-z0-9_]*\s*\(|get[A-Z][A-Za-z0-9_]*\s*\(/.test(text);
}

function hasBoundarySignal(text) {
  return /read-only|visual-only|disabled|deferred|post-v1|post v1|no runtime|no provider|no database reads|no database writes|boundary|preview|contract-only|contract only/i.test(text);
}

function hasWriteSignal(text) {
  return /\.(insert|upsert|update|delete)\s*\(/.test(text);
}

function hasProviderSignal(text) {
  return /openai|anthropic|gemini|spotify|oauth|access_token|refresh_token|provider|fetch\(/i.test(text);
}

function hasAuthSignal(text) {
  return /requireUser|getUser\(|auth\.getUser|redirect\(["']\/auth|cookies\(\)|createServerClient/.test(text);
}

function includesAny(text, keywords) {
  const low = text.toLowerCase();
  return keywords.some((kw) => low.includes(kw.toLowerCase()));
}

function routeGroupCoverage(routeSet, feature) {
  if (feature.requiredRoutesAny) {
    return feature.requiredRoutesAny.map((group) => {
      const found = group.filter((r) => routeSet.has(r));
      return { expectedAnyOf: group, found, ok: found.length > 0 };
    });
  }

  return feature.requiredRoutes.map((route) => ({
    expectedAnyOf: [route],
    found: routeSet.has(route) ? [route] : [],
    ok: routeSet.has(route),
  }));
}

function mdTable(headers, rows) {
  const esc = (x) => String(x ?? "").replaceAll("|", "\\|").replace(/\n/g, "<br>");
  return [
    `| ${headers.map(esc).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(esc).join(" | ")} |`),
  ].join("\n");
}

function bool(v) {
  return v ? "yes" : "no";
}

function parseJsonSafe(p) {
  try {
    return JSON.parse(read(p));
  } catch (error) {
    return { __error: String(error) };
  }
}

function flatten(value, out = []) {
  if (value == null) return out;
  if (typeof value === "object") {
    if (Array.isArray(value)) value.forEach((v) => flatten(v, out));
    else {
      for (const [k, v] of Object.entries(value)) {
        out.push(k);
        flatten(v, out);
      }
    }
  } else {
    out.push(String(value));
  }
  return out;
}

const allFiles = walk(ROOT).map(rel).sort();
const textFiles = allFiles.filter(isText);
const codeFiles = allFiles.filter(isCode);

const contents = new Map();
let totalLines = 0;

for (const file of textFiles) {
  const t = safeRead(file);
  contents.set(file, t);
  totalLines += lines(t);
}

const migrationFiles = textFiles.filter((f) => f.startsWith("supabase/migrations/") && f.endsWith(".sql"));
const migrationText = migrationFiles.map((f) => contents.get(f) || "").join("\n\n");
const createdTables = extractCreateTables(migrationText);
const rlsTables = extractRlsTables(migrationText);
const createdTableSet = new Set(createdTables);
const rlsTableSet = new Set(rlsTables);

const repoFiles = codeFiles.filter((f) => f.startsWith("src/lib/repositories/"));
const helperFiles = codeFiles.filter(
  (f) =>
    f.startsWith("src/lib/dashboard/") ||
    f.includes("view-model") ||
    f.includes("data-helper") ||
    f.includes("helpers"),
);
const componentFiles = codeFiles.filter((f) => f.startsWith("src/components/"));

const repoTableEvidence = [];
for (const file of repoFiles) {
  const t = contents.get(file) || safeRead(file);
  for (const table of extractRepoTables(t)) {
    repoTableEvidence.push({ table, file });
  }
}
const repoReadTables = uniq(repoTableEvidence.map((x) => x.table)).sort();
const repoReadTableSet = new Set(repoReadTables);

const routeFiles = codeFiles.filter((f) => /^src\/app\/.*\/page\.(tsx|ts|jsx|js)$/.test(f) || /^src\/app\/page\.(tsx|ts|jsx|js)$/.test(f));
const apiFiles = codeFiles.filter((f) => /^src\/app\/.*\/route\.(ts|js)$/.test(f));

const routes = routeFiles.map((file) => {
  const t = contents.get(file) || safeRead(file);
  return {
    route: routeFromPage(file),
    file,
    runtime: hasRuntimeSignal(t),
    auth: hasAuthSignal(t),
    boundary: hasBoundarySignal(t),
    provider: hasProviderSignal(t),
    write: hasWriteSignal(t),
  };
});

const apiRoutes = apiFiles.map((file) => {
  const t = contents.get(file) || safeRead(file);
  return {
    route: routeFromApi(file),
    file,
    runtime: hasRuntimeSignal(t),
    auth: hasAuthSignal(t),
    boundary: hasBoundarySignal(t),
    provider: hasProviderSignal(t),
    write: hasWriteSignal(t),
  };
});

const routeSet = new Set(routes.map((x) => x.route));

const brokenImports = [];
const importEdges = [];

for (const file of codeFiles) {
  const specs = extractImports(contents.get(file) || safeRead(file));
  for (const spec of specs) {
    if (!isInternalImport(spec)) continue;
    const resolved = resolveImport(file, spec);
    const edge = { from: file, spec, resolved: resolved.resolved, ok: resolved.ok };
    importEdges.push(edge);
    if (!resolved.ok) brokenImports.push(edge);
  }
}

const sourceBrokenImports = brokenImports.filter((x) => x.from.startsWith("src/"));
const scriptBrokenImports = brokenImports.filter((x) => x.from.startsWith("scripts/"));

const packageJson = exists("package.json") ? parseJsonSafe("package.json") : null;
const scripts = packageJson?.scripts || {};

const checkResults = [];
if (RUN_CHECK) {
  for (const [name, command] of [
    ["check", "npm run check"],
    ["typecheck", "npm run typecheck"],
    ["lint", "npm run lint"],
    ["test", "npm test"],
  ]) {
    if (scripts[name]) {
      const r = run(command);
      checkResults.push({
        name,
        command,
        ok: r.ok,
        status: r.status ?? 0,
        outputTail: (r.output || "").slice(-16000),
      });
    }
  }
}

const sotJsonExists = exists(REQUIRED_SOURCE_OF_TRUTH.json);
const sotDocxExists = exists(REQUIRED_SOURCE_OF_TRUTH.docx);
const sotJson = sotJsonExists ? parseJsonSafe(REQUIRED_SOURCE_OF_TRUTH.json) : null;
const sotStrings = sotJson && !sotJson.__error ? flatten(sotJson) : [];

const sotRoutes = uniq(sotStrings.filter((x) => /^\/[a-zA-Z0-9_:/-]*$/.test(x))).sort();

const sotRouteCoverage = sotRoutes.map((route) => ({
  route,
  exists: routeSet.has(route),
  file: routes.find((r) => r.route === route)?.file || null,
}));

const tablesMissingRls = createdTables.filter((table) => !rlsTableSet.has(table));
const createdTablesWithoutRepoRead = createdTables.filter((table) => !repoReadTableSet.has(table));

const sourceRiskMarkers = [];
const riskRe = /\b(TODO|FIXME|HACK|XXX|fake|mock|stub|placeholder|demo data|hardcoded|not implemented|coming soon|later|deferred|visual-only|read-only|disabled|post-v1|post v1|contract-only|no runtime|no provider)\b/i;

for (const file of textFiles.filter((f) => f.startsWith("src/"))) {
  const lines = (contents.get(file) || "").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (riskRe.test(line)) {
      sourceRiskMarkers.push({ file, line: index + 1, text: line.trim().slice(0, 300) });
    }
  });
}

const domainEvidence = FEATURES.map((feature) => {
  const routeCoverage = routeGroupCoverage(routeSet, feature);
  const matchingRoutes = routes.filter((r) => routeCoverage.some((g) => g.found.includes(r.route)));

  const tableMatches = createdTables.filter((table) => includesAny(table, feature.keywords));
  const repoTableMatches = repoTableEvidence.filter((x) => includesAny(x.table, feature.keywords) || includesAny(x.file, feature.keywords));
  const repoFileMatches = repoFiles.filter((file) => includesAny(file, feature.keywords));
  const helperMatches = helperFiles.filter((file) => includesAny(file, feature.keywords));
  const componentMatches = componentFiles.filter((file) => includesAny(file, feature.keywords));

  const routeRuntime = matchingRoutes.some((r) => r.runtime);
  const boundary = matchingRoutes.some((r) => r.boundary);
  const provider = matchingRoutes.some((r) => r.provider);
  const write = matchingRoutes.some((r) => r.write);

  const blockers = [];
  const warnings = [];

  const missingRouteGroups = routeCoverage.filter((x) => !x.ok);
  if (missingRouteGroups.length) {
    blockers.push(
      `Missing route group(s): ${missingRouteGroups.map((g) => `[${g.expectedAnyOf.join(" OR ")}]`).join(", ")}`,
    );
  }

  if (feature.requiredRuntime && tableMatches.length === 0) {
    warnings.push("No domain table-name evidence detected. Could be real gap or naming mismatch.");
  }

  if (feature.requiredRuntime && repoTableMatches.length === 0 && repoFileMatches.length === 0) {
    warnings.push("No repository evidence detected for this domain.");
  }

  if (feature.requiredRuntime && helperMatches.length === 0) {
    warnings.push("No helper/view-model evidence detected for this domain.");
  }

  if (componentMatches.length === 0) {
    warnings.push("No component evidence detected for this domain.");
  }

  if (feature.requiredRuntime && !routeRuntime) {
    warnings.push("Matched route(s) do not show direct runtime read signal. They may delegate to imported helpers/components.");
  }

  if ((feature.postV1Allowed || feature.contractAllowed) && !boundary) {
    warnings.push("Post-v1/contract feature should have explicit truth boundary label on route.");
  }

  let status = "PASS";
  if (blockers.length) status = "BLOCKED";
  else if (warnings.length) status = "WARN";

  return {
    ...feature,
    status,
    blockers,
    warnings,
    routeCoverage,
    matchingRoutes,
    tableMatches,
    repoTableMatches,
    repoFileMatches,
    helperMatches,
    componentMatches,
    signals: {
      routeRuntime,
      boundary,
      provider,
      write,
    },
  };
});

const blockedFeatures = domainEvidence.filter((x) => x.status === "BLOCKED");
const warnFeatures = domainEvidence.filter((x) => x.status === "WARN");

const finalBlockers = [];
const finalWarnings = [];

if (!sotJsonExists) finalBlockers.push(`Missing source-of-truth JSON: ${REQUIRED_SOURCE_OF_TRUTH.json}`);
if (!sotDocxExists) finalWarnings.push(`Missing source-of-truth DOCX: ${REQUIRED_SOURCE_OF_TRUTH.docx}`);
if (sotJson?.__error) finalBlockers.push(`Source-of-truth JSON parse failed: ${sotJson.__error}`);

if (sourceBrokenImports.length) finalBlockers.push(`Broken source imports: ${sourceBrokenImports.length}`);
if (blockedFeatures.length) finalBlockers.push(`Blocked feature routes: ${blockedFeatures.map((x) => x.name).join("; ")}`);
if (tablesMissingRls.length) finalBlockers.push(`Created tables missing RLS evidence: ${tablesMissingRls.length}`);

const failedChecks = checkResults.filter((x) => !x.ok);
if (failedChecks.length) finalBlockers.push(`Failed npm verification command(s): ${failedChecks.map((x) => x.command).join("; ")}`);

if (scriptBrokenImports.length) finalWarnings.push(`Broken script imports: ${scriptBrokenImports.length}`);
if (warnFeatures.length) finalWarnings.push(`Feature warning(s): ${warnFeatures.map((x) => x.name).join("; ")}`);
if (createdTablesWithoutRepoRead.length) finalWarnings.push(`Created tables without repository read evidence: ${createdTablesWithoutRepoRead.length}`);
if (sourceRiskMarkers.length) finalWarnings.push(`Source risk/boundary markers found: ${sourceRiskMarkers.length}`);
if (gitStatus()) finalWarnings.push("Workspace is dirty. Keep fixing; do not commit yet.");

const status = finalBlockers.length ? "BLOCKED" : finalWarnings.length ? "WARN" : "PASS";

const result = {
  status,
  generatedAt: new Date().toISOString(),
  git: {
    head: gitHead(),
    status: gitStatus(),
  },
  sourceOfTruth: {
    json: REQUIRED_SOURCE_OF_TRUTH.json,
    jsonExists: sotJsonExists,
    docx: REQUIRED_SOURCE_OF_TRUTH.docx,
    docxExists: sotDocxExists,
    parseError: sotJson?.__error || null,
    routeHints: sotRoutes,
    routeCoverage: sotRouteCoverage,
  },
  counts: {
    totalFiles: allFiles.length,
    textFiles: textFiles.length,
    codeFiles: codeFiles.length,
    totalLines,
    routes: routes.length,
    apiRoutes: apiRoutes.length,
    migrations: migrationFiles.length,
    createdTables: createdTables.length,
    rlsTables: rlsTables.length,
    repoFiles: repoFiles.length,
    repoReadTables: repoReadTables.length,
    helperFiles: helperFiles.length,
    componentFiles: componentFiles.length,
    importEdges: importEdges.length,
    brokenImports: brokenImports.length,
    sourceBrokenImports: sourceBrokenImports.length,
    scriptBrokenImports: scriptBrokenImports.length,
    sourceRiskMarkers: sourceRiskMarkers.length,
  },
  finalBlockers,
  finalWarnings,
  domainEvidence,
  routes,
  apiRoutes,
  migrations: {
    files: migrationFiles,
    createdTables,
    rlsTables,
    tablesMissingRls,
  },
  repositories: {
    files: repoFiles,
    readTables: repoReadTables,
    tableEvidence: repoTableEvidence,
    createdTablesWithoutRepoRead,
  },
  helpers: helperFiles,
  components: componentFiles,
  imports: {
    broken: brokenImports,
    sourceBroken: sourceBrokenImports,
    scriptBroken: scriptBrokenImports,
  },
  sourceRiskMarkers,
  checkResults,
};

const featureRows = domainEvidence.map((f) => [
  f.name,
  f.phase,
  f.status,
  f.routeCoverage.map((g) => `${g.found.length ? g.found.join(", ") : "missing"} of [${g.expectedAnyOf.join(" OR ")}]`).join("<br>"),
  f.tableMatches.slice(0, 20).join("<br>"),
  uniq(f.repoTableMatches.map((x) => `${x.table} ← ${x.file}`)).slice(0, 20).join("<br>"),
  f.helperMatches.slice(0, 12).join("<br>"),
  f.componentMatches.slice(0, 12).join("<br>"),
  bool(f.signals.routeRuntime),
  bool(f.signals.boundary),
  f.blockers.join("<br>"),
  f.warnings.join("<br>"),
]);

const routeRows = routes.map((r) => [
  r.route,
  r.file,
  bool(r.runtime),
  bool(r.auth),
  bool(r.boundary),
  bool(r.provider),
  bool(r.write),
]);

const apiRows = apiRoutes.map((r) => [
  r.route,
  r.file,
  bool(r.runtime),
  bool(r.auth),
  bool(r.boundary),
  bool(r.provider),
  bool(r.write),
]);

const md = [
  "# Phase 0–20 Actual Project Connectivity Verification v2",
  "",
  `Status: **${status}**`,
  "",
  `Generated: ${result.generatedAt}`,
  "",
  "This v2 report checks real repo evidence instead of blocking the project on guessed table names. It still flags real missing routes, broken source imports, failed npm checks, RLS gaps, missing repository/helper/component evidence, and unclear runtime/post-v1 boundaries.",
  "",
  "## 1. Final Blockers",
  "",
  finalBlockers.length ? finalBlockers.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 2. Final Warnings",
  "",
  finalWarnings.length ? finalWarnings.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 3. Git State",
  "",
  "```text",
  `HEAD: ${result.git.head}`,
  "",
  result.git.status || "clean",
  "```",
  "",
  "## 4. Counts",
  "",
  "```json",
  JSON.stringify(result.counts, null, 2),
  "```",
  "",
  "## 5. Feature / Domain Connectivity",
  "",
  mdTable(
    [
      "Feature",
      "Phase",
      "Status",
      "Routes",
      "Matching tables",
      "Repository table evidence",
      "Helpers/ViewModels",
      "Components",
      "Route runtime",
      "Boundary label",
      "Blockers",
      "Warnings",
    ],
    featureRows,
  ),
  "",
  "## 6. Routes",
  "",
  mdTable(["Route", "File", "Runtime", "Auth", "Boundary", "Provider", "Write"], routeRows),
  "",
  "## 7. API Routes",
  "",
  mdTable(["Route", "File", "Runtime", "Auth", "Boundary", "Provider", "Write"], apiRows),
  "",
  "## 8. Source-of-Truth Route Coverage",
  "",
  mdTable(
    ["Route", "Exists", "File"],
    sotRouteCoverage.map((x) => [x.route, bool(x.exists), x.file || ""]),
  ),
  "",
  "## 9. Migration / RLS",
  "",
  `- Created tables: ${createdTables.length}`,
  `- RLS tables: ${rlsTables.length}`,
  "",
  "### Tables missing RLS",
  "",
  tablesMissingRls.length ? tablesMissingRls.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 10. Created Tables Without Repository Read Evidence",
  "",
  createdTablesWithoutRepoRead.length
    ? createdTablesWithoutRepoRead.map((x) => `- ${x}`).join("\n")
    : "- None",
  "",
  "## 11. Broken Source Imports",
  "",
  sourceBrokenImports.length
    ? mdTable(["From", "Import", "Resolved guess"], sourceBrokenImports.map((x) => [x.from, x.spec, x.resolved]))
    : "- None",
  "",
  "## 12. Broken Script Imports",
  "",
  scriptBrokenImports.length
    ? mdTable(["From", "Import", "Resolved guess"], scriptBrokenImports.slice(0, 250).map((x) => [x.from, x.spec, x.resolved]))
    : "- None",
  "",
  "## 13. Source Risk / Boundary Markers",
  "",
  sourceRiskMarkers.length
    ? mdTable(["File", "Line", "Text"], sourceRiskMarkers.slice(0, 400).map((x) => [x.file, x.line, x.text]))
    : "- None",
  "",
  "## 14. npm Verification",
  "",
  checkResults.length
    ? checkResults.map((r) => [
        `### ${r.command}`,
        "",
        `Status: **${r.ok ? "PASS" : "FAIL"}**`,
        "",
        "```text",
        r.outputTail,
        "```",
      ].join("\n")).join("\n\n")
    : "Not run. Use `--run-check`.",
  "",
  "## 15. JSON Evidence",
  "",
  `Full machine-readable evidence: \`${OUT_JSON}\``,
  "",
].join("\n");

fs.mkdirSync(path.dirname(abs(OUT_MD)), { recursive: true });
fs.mkdirSync(path.dirname(abs(OUT_JSON)), { recursive: true });
fs.writeFileSync(abs(OUT_JSON), JSON.stringify(result, null, 2));
fs.writeFileSync(abs(OUT_MD), md);

console.log("");
console.log("=== PHASE 0–20 ACTUAL CONNECTIVITY V2 ===");
console.log(`Status: ${status}`);
console.log(`Report: ${OUT_MD}`);
console.log(`JSON:   ${OUT_JSON}`);
console.log("");
console.log("Final blockers:");
console.log(finalBlockers.length ? finalBlockers.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Final warnings:");
console.log(finalWarnings.length ? finalWarnings.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Feature statuses:");
for (const f of domainEvidence) {
  console.log(`- ${f.status.padEnd(7)} ${f.name}`);
}
console.log("");
console.log("Do not commit yet. Fix everything first, then make one final pre-Phase-21 commit.");
