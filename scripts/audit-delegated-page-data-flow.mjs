import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const root = process.cwd();
const reportPath = join(root, "docs/phase-reports/DELEGATED_PAGE_DATA_FLOW_AUDIT.md");

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (["node_modules", ".next", ".git", ".tmp", ".verify-logs"].includes(entry)) continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

function rel(path) {
  return path.replace(root + "/", "");
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

const sourceFiles = walk(join(root, "src"))
  .map(rel)
  .filter((file) => /\.(ts|tsx)$/.test(file));

const pages = sourceFiles.filter((file) => file.startsWith("src/app/") && file.endsWith("page.tsx"));
const components = sourceFiles.filter((file) => file.startsWith("src/components/"));
const helpers = sourceFiles.filter((file) => file.startsWith("src/lib/dashboard/"));
const repositories = sourceFiles.filter((file) => file.startsWith("src/lib/repositories/"));

function imports(text) {
  const out = [];
  const regex = /from\s+["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(text))) out.push(match[1]);
  return out;
}

function localNameFromImport(path) {
  return path.split("/").pop()?.replace(/\.(tsx|ts)$/, "") ?? "";
}

function fileHasRuntimeDataSignal(file) {
  const text = read(file);
  return (
    text.includes(".from(") ||
    text.includes("createSupabaseServerClient") ||
    text.includes("@/lib/repositories") ||
    text.includes("@/lib/dashboard") ||
    text.includes("getHealthBodyDashboardDataSummary") ||
    text.includes("getAdminFinanceDashboardDataSummary") ||
    text.includes("getGrimoireDashboardDataSummary") ||
    text.includes("getLearningProjectDashboardDataSummary") ||
    text.includes("getSettingsPrivacyDashboardDataSummary") ||
    text.includes("getResearchStanfordDashboardDataSummary") ||
    text.includes("listGoals") ||
    text.includes("listTasks") ||
    text.includes("listEvents") ||
    text.includes("list")
  );
}

function fileHasStateSignal(file) {
  const text = read(file);
  return /empty|error|warning|loading|fallback|No .* found|No .* records|EmptyState|WarningPanel/i.test(text);
}

function componentNamesUsedByPage(page) {
  const text = read(page);
  const names = [];
  const componentRegex = /<([A-Z][A-Za-z0-9_]*)/g;
  let match;
  while ((match = componentRegex.exec(text))) names.push(match[1]);
  return [...new Set(names)];
}

function findComponentFileByName(name) {
  const candidates = components.filter((file) => {
    const text = read(file);
    return (
      text.includes(`function ${name}`) ||
      text.includes(`const ${name}`) ||
      text.includes(`export async function ${name}`) ||
      text.includes(`export function ${name}`)
    );
  });
  return candidates[0] ?? null;
}

const rows = [];

for (const page of pages) {
  const pageText = read(page);
  const names = componentNamesUsedByPage(page);
  const componentFiles = names.map(findComponentFileByName).filter(Boolean);

  const componentRuntimeFiles = componentFiles.filter(fileHasRuntimeDataSignal);
  const componentStateFiles = componentFiles.filter(fileHasStateSignal);

  const pageRuntime =
    fileHasRuntimeDataSignal(page) ||
    componentRuntimeFiles.length > 0;

  const stateRuntime =
    fileHasStateSignal(page) ||
    componentStateFiles.length > 0;

  rows.push({
    page,
    componentNames: names,
    componentFiles,
    pageRuntime,
    stateRuntime,
    componentRuntimeFiles,
    componentStateFiles,
    suspicious:
      !pageRuntime ||
      !stateRuntime ||
      /placeholder|coming soon|deferred|mock|demo|boundary/i.test(pageText),
  });
}

const lines = [];
lines.push("# Delegated Page Data Flow Audit");
lines.push("");
lines.push("Generated audit. Do not treat as completion claim.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push(`- Pages checked: ${rows.length}`);
lines.push(`- Pages with runtime/delegated data signal: ${rows.filter(r => r.pageRuntime).length}`);
lines.push(`- Pages with page/component state signal: ${rows.filter(r => r.stateRuntime).length}`);
lines.push(`- Pages requiring review: ${rows.filter(r => r.suspicious).length}`);
lines.push("");

lines.push("## Pages Requiring Review");
lines.push("");
for (const row of rows.filter(r => r.suspicious)) {
  lines.push(`- ${row.page}`);
}
lines.push("");

lines.push("## Page Details");
for (const row of rows) {
  lines.push("");
  lines.push(`### ${row.page}`);
  lines.push(`- Runtime/delegated data signal: ${row.pageRuntime ? "yes" : "no"}`);
  lines.push(`- Empty/error/loading state signal: ${row.stateRuntime ? "yes" : "no"}`);
  lines.push(`- Component names: ${row.componentNames.length ? row.componentNames.join(", ") : "none"}`);
  lines.push(`- Component files: ${row.componentFiles.length ? row.componentFiles.join(", ") : "none"}`);
  lines.push(`- Runtime component files: ${row.componentRuntimeFiles.length ? row.componentRuntimeFiles.join(", ") : "none"}`);
  lines.push(`- State component files: ${row.componentStateFiles.length ? row.componentStateFiles.join(", ") : "none"}`);
}

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, lines.join("\n") + "\n");

console.log("=== DELEGATED PAGE DATA FLOW AUDIT ===");
console.log(`Report: docs/phase-reports/DELEGATED_PAGE_DATA_FLOW_AUDIT.md`);
console.log(`Pages checked: ${rows.length}`);
console.log(`Runtime/delegated data signal: ${rows.filter(r => r.pageRuntime).length}`);
console.log(`State signal: ${rows.filter(r => r.stateRuntime).length}`);
console.log(`Pages requiring review: ${rows.filter(r => r.suspicious).length}`);
for (const row of rows.filter(r => r.suspicious)) {
  console.log(`REVIEW_PAGE ${row.page}`);
}
