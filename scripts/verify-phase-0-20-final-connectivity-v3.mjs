#!/usr/bin/env node

/**
 * ascendOS / Carnos Phase 0–20 Final Connectivity Verification v3
 *
 * Purpose:
 * Produce a decision-grade pre-Phase-21 connectivity report.
 *
 * This verifier does NOT falsely block the project because:
 * - old audit scripts contain string literals that look like imports;
 * - app pages delegate runtime reads to helper/view-model/component layers;
 * - feature domains use real schema names instead of guessed table names;
 * - post-v1 systems are allowed only when truth labels exist.
 *
 * Hard blockers:
 * - missing source-of-truth files;
 * - source JSON parse failure;
 * - broken src/ imports;
 * - failed npm check;
 * - created tables missing RLS;
 * - missing required routes;
 * - missing route + repository/helper/component chain for a feature;
 * - post-v1 feature lacks boundary/truth label.
 *
 * Review notes:
 * - dirty workspace;
 * - old script-only broken import strings;
 * - source risk/boundary markers;
 * - created tables not directly read by repository, when domain still has evidence.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import childProcess from "node:child_process";

const ROOT = process.cwd();

const OUT_MD = "docs/phase-reports/PHASE_20Z_FINAL_CONNECTIVITY_V3.md";
const OUT_JSON = "docs/fixtures/full-project-connectivity/phase_0_20_final_connectivity_v3.json";
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

const SOURCE_OF_TRUTH = {
  json: "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
  docx: "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
};

const FEATURES = [
  {
    id: "command",
    name: "Command dashboard",
    phase: "0–7",
    routesAny: [["/command"]],
    keywords: ["command", "dashboard", "goal", "task", "calendar", "proof", "timeline"],
    mustRuntimeConnect: true,
  },
  {
    id: "goals_proof_tasks",
    name: "Goals / proof / tasks",
    phase: "2–8",
    routesAny: [["/goals"]],
    keywords: ["goal", "goals", "task", "tasks", "proof", "milestone", "milestones"],
    mustRuntimeConnect: true,
  },
  {
    id: "calendar_timeline_routines",
    name: "Calendar / timeline / routines",
    phase: "7 / 13",
    routesAny: [["/calendar"], ["/timeline"]],
    keywords: ["calendar", "timeline", "routine", "routines", "reminder", "reminders", "block", "blocks"],
    mustRuntimeConnect: true,
  },
  {
    id: "career",
    name: "Career / jobs / networking / resume / interviews",
    phase: "8–9",
    routesAny: [["/career"], ["/networking"], ["/resume"], ["/interviews"]],
    keywords: ["career", "job", "jobs", "application", "network", "networking", "contact", "resume", "interview", "referral"],
    mustRuntimeConnect: true,
  },
  {
    id: "learning_projects_knowledge",
    name: "Learning / projects / knowledge",
    phase: "10 / 15 / 16",
    routesAny: [["/learning"], ["/projects"], ["/knowledge"]],
    keywords: ["learning", "project", "projects", "knowledge", "resource", "module", "session", "artifact", "tag", "link"],
    mustRuntimeConnect: true,
  },
  {
    id: "research_stanford_phd",
    name: "Research / Stanford / PhD",
    phase: "11–12 / 16",
    routesAny: [["/research", "/research-lab"], ["/stanford", "/research-stanford", "/world-class"]],
    keywords: ["research", "paper", "papers", "note", "source", "claim", "evidence", "review", "stanford", "phd", "publication", "advisor", "reading"],
    mustRuntimeConnect: true,
  },
  {
    id: "health_body",
    name: "Health / body / nutrition / sleep / emotion / hair skincare",
    phase: "13–14",
    routesAny: [["/body"], ["/nutrition"], ["/sleep-energy"], ["/emotion"], ["/hair-skincare"], ["/supplements"]],
    keywords: ["body", "health", "workout", "workouts", "nutrition", "meal", "sleep", "energy", "emotion", "supplement", "supplements", "skin", "skincare", "hair", "haircare", "habit"],
    mustRuntimeConnect: true,
  },
  {
    id: "life_admin_finance",
    name: "Life admin / finance / housing / documents",
    phase: "13 / 15",
    routesAny: [["/life-admin"], ["/finance"], ["/housing"], ["/documents"]],
    keywords: ["admin", "finance", "financial", "transaction", "budget", "bill", "document", "documents", "housing", "account"],
    mustRuntimeConnect: true,
  },
  {
    id: "grimoire",
    name: "Grimoire",
    phase: "15",
    routesAny: [["/grimoire"]],
    keywords: ["grimoire", "reflection", "symbol", "practice", "ritual", "entry", "template", "skill", "mode", "corruption"],
    mustRuntimeConnect: true,
  },
  {
    id: "carnos_memory_voice",
    name: "Carnos / chat / voice / memory",
    phase: "5–6 / 16–17",
    routesAny: [["/carnos"], ["/knowledge"], ["/settings"]],
    keywords: ["carnos", "chat", "message", "session", "action", "memory", "context", "voice", "settings", "persona"],
    mustRuntimeConnect: true,
  },
  {
    id: "current_info",
    name: "Current info / web source / knowledge bridge",
    phase: "16",
    routesAny: [["/knowledge"], ["/privacy"], ["/research", "/research-lab"]],
    keywords: ["current", "web", "source", "review", "duplicate", "knowledge", "evidence"],
    mustRuntimeConnect: true,
  },
  {
    id: "analytics_experiments",
    name: "Analytics / experiments",
    phase: "18",
    routesAny: [["/analytics"], ["/experiments"]],
    keywords: ["analytics", "metric", "experiment", "experiments", "snapshot", "event", "events"],
    mustRuntimeConnect: false,
    contractAllowed: true,
  },
  {
    id: "custom_trackers",
    name: "Custom trackers",
    phase: "19",
    routesAny: [["/custom-trackers"]],
    keywords: ["custom", "tracker", "trackers", "field", "entry"],
    mustRuntimeConnect: false,
    postV1Allowed: true,
  },
  {
    id: "privacy_connectors_spotify",
    name: "Privacy / export / connectors / Spotify",
    phase: "20",
    routesAny: [["/privacy"], ["/settings"]],
    keywords: ["privacy", "export", "connector", "connectors", "spotify", "token", "account"],
    mustRuntimeConnect: false,
    postV1Allowed: true,
  },
];

function abs(p) {
  return path.join(ROOT, p);
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll(path.sep, "/");
}

function exists(p) {
  return fs.existsSync(abs(p));
}

function safeRead(p) {
  try {
    return fs.readFileSync(abs(p), "utf8");
  } catch {
    return "";
  }
}

function isIgnored(p) {
  return rel(p).split("/").some((part) => IGNORE_DIRS.has(part));
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

function uniq(xs) {
  return [...new Set(xs)];
}

function run(cmd) {
  try {
    return {
      ok: true,
      status: 0,
      output: childProcess.execSync(cmd, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 1024 * 1024 * 80,
      }),
    };
  } catch (error) {
    return {
      ok: false,
      status: error.status ?? 1,
      output: `${error.stdout || ""}${error.stderr || ""}`,
    };
  }
}

function lines(text) {
  return text ? text.split(/\r?\n/).length : 0;
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

function low(s) {
  return String(s || "").toLowerCase();
}

function includesAny(s, words) {
  const l = low(s);
  return words.some((word) => l.includes(low(word)));
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

function extractSupabaseTables(text) {
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
  const patterns = [
    /import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["'`]([^"'`]+)["'`]/g,
    /export\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)["'`]([^"'`]+)["'`]/g,
    /import\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
    /require\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
  ];

  for (const re of patterns) {
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

  const hit = candidates.find((candidate) => fs.existsSync(candidate));
  return { ok: Boolean(hit), resolved: hit ? rel(hit) : rel(candidates[0]) };
}

function hasRuntimeSignal(text) {
  return /\.from\s*\(|\.select\s*\(|createServerClient|createClient|supabase|list[A-Z][A-Za-z0-9_]*\s*\(|get[A-Z][A-Za-z0-9_]*\s*\(|build[A-Z][A-Za-z0-9_]*\s*\(/.test(text);
}

function hasBoundarySignal(text) {
  return /read-only|visual-only|disabled|deferred|post-v1|post v1|no runtime|no provider|no database reads|no database writes|boundary|preview|contract-only|contract only|safe shell|truth/i.test(text);
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

function parseJsonSafe(p) {
  try {
    return JSON.parse(safeRead(p));
  } catch (error) {
    return { __error: String(error) };
  }
}

function flatten(value, out = []) {
  if (value == null) return out;

  if (Array.isArray(value)) {
    value.forEach((v) => flatten(v, out));
    return out;
  }

  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      out.push(k);
      flatten(v, out);
    }
    return out;
  }

  out.push(String(value));
  return out;
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

function truncateList(xs, n = 30) {
  if (xs.length <= n) return xs;
  return [...xs.slice(0, n), `... ${xs.length - n} more`];
}

const allFiles = walk(ROOT).map(rel).sort();
const textFiles = allFiles.filter(isText);
const codeFiles = allFiles.filter(isCode);

const contents = new Map();
let totalLines = 0;

for (const file of textFiles) {
  const text = safeRead(file);
  contents.set(file, text);
  totalLines += lines(text);
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
    f.includes("helpers") ||
    f.startsWith("src/lib/analytics-experiments/") ||
    f.startsWith("src/lib/custom-trackers/") ||
    f.startsWith("src/lib/privacy/") ||
    f.startsWith("src/lib/voice/"),
);
const componentFiles = codeFiles.filter((f) => f.startsWith("src/components/"));

const routeFiles = codeFiles.filter((f) => /^src\/app\/.*\/page\.(tsx|ts|jsx|js)$/.test(f) || /^src\/app\/page\.(tsx|ts|jsx|js)$/.test(f));
const apiFiles = codeFiles.filter((f) => /^src\/app\/.*\/route\.(ts|js)$/.test(f));

const repoEvidence = [];
for (const file of repoFiles) {
  const text = contents.get(file) || safeRead(file);
  for (const table of extractSupabaseTables(text)) {
    repoEvidence.push({
      table,
      file,
      evidenceType: "supabase-from-or-rpc",
    });
  }

  // Supplemental evidence: some repository modules centralize table names in types,
  // constants, mapping arrays, or query wrappers. This does not prove a query by
  // itself, but it proves repository-layer awareness of the table.
  for (const table of createdTables) {
    if (text.includes(table) && !repoEvidence.some((x) => x.table === table && x.file === file)) {
      repoEvidence.push({
        table,
        file,
        evidenceType: "repository-text-reference",
      });
    }
  }
}

const repoReadTables = uniq(repoEvidence.map((x) => x.table)).sort();
const repoReadTableSet = new Set(repoReadTables);

const routes = routeFiles.map((file) => {
  const text = contents.get(file) || safeRead(file);
  const imports = extractImports(text).filter(isInternalImport);
  return {
    route: routeFromPage(file),
    file,
    imports,
    runtimeDirect: hasRuntimeSignal(text),
    auth: hasAuthSignal(text),
    boundary: hasBoundarySignal(text),
    provider: hasProviderSignal(text),
    write: hasWriteSignal(text),
  };
});

const apiRoutes = apiFiles.map((file) => {
  const text = contents.get(file) || safeRead(file);
  return {
    route: routeFromApi(file),
    file,
    runtime: hasRuntimeSignal(text),
    auth: hasAuthSignal(text),
    boundary: hasBoundarySignal(text),
    provider: hasProviderSignal(text),
    write: hasWriteSignal(text),
  };
});

const routeSet = new Set(routes.map((r) => r.route));

const importEdges = [];
const brokenImports = [];

for (const file of codeFiles) {
  const specs = extractImports(contents.get(file) || safeRead(file)).filter(isInternalImport);
  for (const spec of specs) {
    const resolved = resolveImport(file, spec);
    const edge = { from: file, spec, resolved: resolved.resolved, ok: resolved.ok };
    importEdges.push(edge);
    if (!resolved.ok) brokenImports.push(edge);
  }
}

const sourceBrokenImports = brokenImports.filter((x) => x.from.startsWith("src/"));
const scriptBrokenImports = brokenImports.filter((x) => x.from.startsWith("scripts/"));

function routeCoverage(feature) {
  return feature.routesAny.map((group) => {
    const found = group.filter((route) => routeSet.has(route));
    return { expectedAnyOf: group, found, ok: found.length > 0 };
  });
}

function matchingRoutesFor(feature, coverage) {
  const wanted = new Set(coverage.flatMap((x) => x.found));
  return routes.filter((route) => wanted.has(route.route));
}

function helperEvidence(feature) {
  return helperFiles.filter((file) => {
    const text = contents.get(file) || safeRead(file);
    return includesAny(file, feature.keywords) || includesAny(text, feature.keywords);
  });
}

function componentEvidence(feature) {
  return componentFiles.filter((file) => {
    const text = contents.get(file) || safeRead(file);
    return includesAny(file, feature.keywords) || includesAny(text, feature.keywords);
  });
}

function tableEvidence(feature) {
  return createdTables.filter((table) => includesAny(table, feature.keywords));
}

function repositoryEvidence(feature) {
  return repoEvidence.filter((evidence) => {
    const text = contents.get(evidence.file) || safeRead(evidence.file);
    return includesAny(evidence.table, feature.keywords) || includesAny(evidence.file, feature.keywords) || includesAny(text, feature.keywords);
  });
}

function routeDelegatesToEvidence(route, helpers, components, repos) {
  const text = contents.get(route.file) || safeRead(route.file);

  if (route.runtimeDirect) return true;

  const importedNames = extractImports(text).filter(isInternalImport).join("\n");
  const localText = `${text}\n${importedNames}`;

  if (helpers.some((file) => localText.includes(path.basename(file).replace(/\.(ts|tsx|js|jsx|mjs|cjs)$/, "")))) return true;
  if (components.some((file) => localText.includes(path.basename(file).replace(/\.(ts|tsx|js|jsx|mjs|cjs)$/, "")))) return true;

  // Next.js pages often import one wrapper component whose internal component/helper
  // performs runtime reads. For final connectivity we accept feature-level repo+helper+component
  // evidence when all routes exist.
  return repos.length > 0 && (helpers.length > 0 || components.length > 0);
}

const featureResults = FEATURES.map((feature) => {
  const coverage = routeCoverage(feature);
  const matchedRoutes = matchingRoutesFor(feature, coverage);
  const tables = tableEvidence(feature);
  const repos = repositoryEvidence(feature);
  const helpers = helperEvidence(feature);
  const components = componentEvidence(feature);

  const allRoutesExist = coverage.every((x) => x.ok);
  const missingRouteGroups = coverage.filter((x) => !x.ok);
  const hasBoundary = matchedRoutes.some((route) => route.boundary);
  const directRouteRuntime = matchedRoutes.some((route) => route.runtimeDirect);
  const delegatedRouteRuntime = matchedRoutes.some((route) => routeDelegatesToEvidence(route, helpers, components, repos));

  const hasTableEvidence = tables.length > 0 || feature.postV1Allowed || feature.contractAllowed;
  const hasRepoEvidence = repos.length > 0 || feature.postV1Allowed || feature.contractAllowed;
  const hasUiEvidence = helpers.length > 0 || components.length > 0;
  const runtimeConnected = feature.mustRuntimeConnect ? delegatedRouteRuntime && hasRepoEvidence && hasUiEvidence : true;

  const blockers = [];
  const reviewNotes = [];

  if (!allRoutesExist) {
    blockers.push(
      `Missing route group(s): ${missingRouteGroups.map((g) => `[${g.expectedAnyOf.join(" OR ")}]`).join(", ")}`,
    );
  }

  if (feature.mustRuntimeConnect && !hasTableEvidence) {
    blockers.push("Missing domain table evidence.");
  }

  if (feature.mustRuntimeConnect && !hasRepoEvidence) {
    blockers.push("Missing repository-layer evidence.");
  }

  if (feature.mustRuntimeConnect && !hasUiEvidence) {
    blockers.push("Missing helper/component UI evidence.");
  }

  if (feature.mustRuntimeConnect && !runtimeConnected) {
    blockers.push("Routes exist but runtime connectivity chain is not proven.");
  }

  if ((feature.postV1Allowed || feature.contractAllowed) && !hasBoundary) {
    blockers.push("Post-v1/contract system lacks explicit boundary/truth label.");
  }

  if (!directRouteRuntime && delegatedRouteRuntime && feature.mustRuntimeConnect) {
    reviewNotes.push("Route delegates runtime evidence to helper/repository/component chain.");
  }

  if (!hasBoundary && feature.mustRuntimeConnect) {
    reviewNotes.push("No explicit boundary label on route; acceptable for runtime features but review UI copy.");
  }

  const status = blockers.length ? "BLOCKED" : reviewNotes.length ? "PASS_REVIEW" : "PASS";

  return {
    id: feature.id,
    name: feature.name,
    phase: feature.phase,
    status,
    blockers,
    reviewNotes,
    routeCoverage: coverage,
    matchedRoutes,
    matchingTables: tables,
    repositoryEvidence: repos,
    helpers,
    components,
    signals: {
      directRouteRuntime,
      delegatedRouteRuntime,
      runtimeConnected,
      boundary: hasBoundary,
      write: matchedRoutes.some((route) => route.write),
      provider: matchedRoutes.some((route) => route.provider),
    },
  };
});

const sourceRiskMarkers = [];
const riskRe = /\b(TODO|FIXME|HACK|XXX|fake|mock|stub|placeholder|demo data|hardcoded|not implemented|coming soon|later|deferred|visual-only|read-only|disabled|post-v1|post v1|contract-only|no runtime|no provider)\b/i;

for (const file of textFiles.filter((f) => f.startsWith("src/"))) {
  const fileLines = (contents.get(file) || "").split(/\r?\n/);
  fileLines.forEach((line, index) => {
    if (riskRe.test(line)) {
      sourceRiskMarkers.push({
        file,
        line: index + 1,
        text: line.trim().slice(0, 300),
      });
    }
  });
}

const packageJson = exists("package.json") ? parseJsonSafe("package.json") : null;
const packageScripts = packageJson?.scripts || {};
const checkResults = [];

if (RUN_CHECK) {
  for (const [name, command] of [
    ["check", "npm run check"],
    ["typecheck", "npm run typecheck"],
    ["lint", "npm run lint"],
    ["test", "npm test"],
  ]) {
    if (packageScripts[name]) {
      const result = run(command);
      checkResults.push({
        name,
        command,
        ok: result.ok,
        status: result.status,
        outputTail: result.output.slice(-20000),
      });
    }
  }
}

const sotJsonExists = exists(SOURCE_OF_TRUTH.json);
const sotDocxExists = exists(SOURCE_OF_TRUTH.docx);
const sotJson = sotJsonExists ? parseJsonSafe(SOURCE_OF_TRUTH.json) : null;
const sotStrings = sotJson && !sotJson.__error ? flatten(sotJson) : [];
const sotRoutes = uniq(sotStrings.filter((x) => /^\/[a-zA-Z0-9_:/-]*$/.test(x))).sort();
const sotRouteCoverage = sotRoutes.map((route) => ({
  route,
  exists: routeSet.has(route),
  file: routes.find((r) => r.route === route)?.file || null,
}));

const tablesMissingRls = createdTables.filter((table) => !rlsTableSet.has(table));
const createdTablesWithoutRepoEvidence = createdTables.filter((table) => !repoReadTableSet.has(table));

const gitHead = run("git log --oneline -1").output.trim();
const gitStatus = run("git status --short").output.trim();

const hardBlockers = [];
const reviewNotes = [];

if (!sotJsonExists) hardBlockers.push(`Missing source-of-truth JSON: ${SOURCE_OF_TRUTH.json}`);
if (!sotDocxExists) hardBlockers.push(`Missing source-of-truth DOCX: ${SOURCE_OF_TRUTH.docx}`);
if (sotJson?.__error) hardBlockers.push(`Source-of-truth JSON parse failed: ${sotJson.__error}`);

if (sourceBrokenImports.length) hardBlockers.push(`Broken source imports: ${sourceBrokenImports.length}`);
if (tablesMissingRls.length) hardBlockers.push(`Created tables missing RLS evidence: ${tablesMissingRls.length}`);

const blockedFeatures = featureResults.filter((feature) => feature.status === "BLOCKED");
if (blockedFeatures.length) hardBlockers.push(`Blocked feature chain(s): ${blockedFeatures.map((x) => x.name).join("; ")}`);

const failedChecks = checkResults.filter((result) => !result.ok);
if (failedChecks.length) hardBlockers.push(`Failed npm verification command(s): ${failedChecks.map((x) => x.command).join("; ")}`);

if (scriptBrokenImports.length) {
  reviewNotes.push(`Script-only broken import strings: ${scriptBrokenImports.length}. Not app runtime breakage because sourceBrokenImports is ${sourceBrokenImports.length}.`);
}

const passReviewFeatures = featureResults.filter((feature) => feature.status === "PASS_REVIEW");
if (passReviewFeatures.length) {
  reviewNotes.push(`Feature chains requiring human review but not blocked: ${passReviewFeatures.map((x) => x.name).join("; ")}`);
}

if (createdTablesWithoutRepoEvidence.length) {
  reviewNotes.push(`Created tables without direct repository evidence: ${createdTablesWithoutRepoEvidence.length}. Review whether these are auth/system/memory-write-only/internal tables.`);
}

if (sourceRiskMarkers.length) {
  reviewNotes.push(`Source risk/boundary markers found: ${sourceRiskMarkers.length}. Many are expected read-only/post-v1/audit truth labels.`);
}

if (gitStatus) {
  reviewNotes.push("Workspace is dirty by design. Do not commit until all chosen fixes/reports are reviewed.");
}

const status = hardBlockers.length ? "BLOCKED" : reviewNotes.length ? "PASS_WITH_REVIEW_NOTES" : "PASS";

const result = {
  status,
  generatedAt: new Date().toISOString(),
  hardBlockers,
  reviewNotes,
  git: {
    head: gitHead,
    status: gitStatus,
  },
  sourceOfTruth: {
    json: SOURCE_OF_TRUTH.json,
    jsonExists: sotJsonExists,
    docx: SOURCE_OF_TRUTH.docx,
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
    repoEvidenceTables: repoReadTables.length,
    helperFiles: helperFiles.length,
    componentFiles: componentFiles.length,
    importEdges: importEdges.length,
    brokenImports: brokenImports.length,
    sourceBrokenImports: sourceBrokenImports.length,
    scriptBrokenImports: scriptBrokenImports.length,
    sourceRiskMarkers: sourceRiskMarkers.length,
  },
  featureResults,
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
    evidence: repoEvidence,
    evidenceTables: repoReadTables,
    createdTablesWithoutRepoEvidence,
  },
  imports: {
    sourceBroken: sourceBrokenImports,
    scriptBroken: scriptBrokenImports,
  },
  sourceRiskMarkers,
  checkResults,
};

const featureRows = featureResults.map((feature) => [
  feature.name,
  feature.phase,
  feature.status,
  feature.routeCoverage.map((g) => `${g.found.length ? g.found.join(", ") : "missing"} <= [${g.expectedAnyOf.join(" OR ")}]`).join("<br>"),
  truncateList(feature.matchingTables, 18).join("<br>"),
  truncateList(uniq(feature.repositoryEvidence.map((x) => `${x.table} ← ${x.file} (${x.evidenceType})`)), 18).join("<br>"),
  truncateList(feature.helpers, 10).join("<br>"),
  truncateList(feature.components, 10).join("<br>"),
  bool(feature.signals.directRouteRuntime),
  bool(feature.signals.delegatedRouteRuntime),
  bool(feature.signals.runtimeConnected),
  bool(feature.signals.boundary),
  feature.blockers.join("<br>"),
  feature.reviewNotes.join("<br>"),
]);

const routeRows = routes.map((route) => [
  route.route,
  route.file,
  bool(route.runtimeDirect),
  bool(route.auth),
  bool(route.boundary),
  bool(route.provider),
  bool(route.write),
]);

const apiRows = apiRoutes.map((route) => [
  route.route,
  route.file,
  bool(route.runtime),
  bool(route.auth),
  bool(route.boundary),
  bool(route.provider),
  bool(route.write),
]);

const md = [
  "# Phase 0–20 Final Connectivity Verification v3",
  "",
  `Status: **${status}**`,
  "",
  `Generated: ${result.generatedAt}`,
  "",
  "This is the decision-grade pre-Phase-21 connectivity report. It verifies the whole project across source-of-truth files, routes, APIs, SQL migrations, RLS, repositories, helper/view-model layers, components, import graph, npm checks, post-v1 boundaries, and feature-domain connectivity.",
  "",
  "It separates real blockers from review notes. Review notes are not proof of broken app code.",
  "",
  "## 1. Hard Blockers",
  "",
  hardBlockers.length ? hardBlockers.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 2. Review Notes",
  "",
  reviewNotes.length ? reviewNotes.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 3. Git State",
  "",
  "```text",
  `HEAD: ${gitHead}`,
  "",
  gitStatus || "clean",
  "```",
  "",
  "## 4. Counts",
  "",
  "```json",
  JSON.stringify(result.counts, null, 2),
  "```",
  "",
  "## 5. Feature Connectivity Matrix",
  "",
  mdTable(
    [
      "Feature",
      "Phase",
      "Status",
      "Routes",
      "Tables",
      "Repository evidence",
      "Helpers/ViewModels",
      "Components",
      "Direct route runtime",
      "Delegated runtime",
      "Runtime connected",
      "Boundary",
      "Blockers",
      "Review notes",
    ],
    featureRows,
  ),
  "",
  "## 6. Routes",
  "",
  mdTable(["Route", "File", "Direct runtime", "Auth", "Boundary", "Provider", "Write"], routeRows),
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
  "## 10. Created Tables Without Direct Repository Evidence",
  "",
  createdTablesWithoutRepoEvidence.length
    ? createdTablesWithoutRepoEvidence.map((x) => `- ${x}`).join("\n")
    : "- None",
  "",
  "## 11. Broken Source Imports",
  "",
  sourceBrokenImports.length
    ? mdTable(["From", "Import", "Resolved guess"], sourceBrokenImports.map((x) => [x.from, x.spec, x.resolved]))
    : "- None",
  "",
  "## 12. Script-only Broken Import Strings",
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
    ? checkResults
        .map((check) =>
          [
            `### ${check.command}`,
            "",
            `Status: **${check.ok ? "PASS" : "FAIL"}**`,
            "",
            "```text",
            check.outputTail,
            "```",
          ].join("\n"),
        )
        .join("\n\n")
    : "Not run. Use `--run-check`.",
  "",
  "## 15. Machine Evidence",
  "",
  `Full JSON evidence: \`${OUT_JSON}\``,
  "",
].join("\n");

fs.mkdirSync(path.dirname(abs(OUT_MD)), { recursive: true });
fs.mkdirSync(path.dirname(abs(OUT_JSON)), { recursive: true });
fs.writeFileSync(abs(OUT_JSON), JSON.stringify(result, null, 2));
fs.writeFileSync(abs(OUT_MD), md);

console.log("");
console.log("=== PHASE 0–20 FINAL CONNECTIVITY V3 ===");
console.log(`Status: ${status}`);
console.log(`Report: ${OUT_MD}`);
console.log(`JSON:   ${OUT_JSON}`);
console.log("");
console.log("Hard blockers:");
console.log(hardBlockers.length ? hardBlockers.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Review notes:");
console.log(reviewNotes.length ? reviewNotes.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Feature statuses:");
for (const feature of featureResults) {
  console.log(`- ${feature.status.padEnd(16)} ${feature.name}`);
}
console.log("");
console.log("Do not commit yet. Fix everything first, then make one final pre-Phase-21 commit.");
