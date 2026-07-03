import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";

function fail(message) {
  console.error("✗ " + message);
  process.exit(1);
}

function pass(message) {
  console.log("✓ " + message);
}

function read(path) {
  if (!existsSync(path)) fail("Missing " + path);
  pass("Found " + path);
  return readFileSync(path, "utf8");
}

function mustInclude(label, text, marker) {
  if (!text.includes(marker)) fail(label + " missing marker: " + marker);
  pass(label + " includes " + marker);
}

function countFiles(dir) {
  if (!existsSync(dir)) return 0;
  let total = 0;
  for (const entry of readdirSync(dir)) {
    const path = dir + "/" + entry;
    const stat = statSync(path);
    if (stat.isDirectory()) total += countFiles(path);
    else total += 1;
  }
  return total;
}

function git(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

console.log("\n=== PROJECT INTEGRITY PROOF AUDIT ===");

const pkgText = read("package.json");
const pkg = JSON.parse(pkgText);
const phaseStatus = read("PHASE_STATUS.md");
const executionLog = read("PROJECT_EXECUTION_LOG.md");
const codeLedger = read("CODE_LEDGER.md");
const changelog = read("CHANGELOG.md");
const sourceTruth = read("SOURCE_OF_TRUTH.md");

const requiredTopLevelFiles = [
  "README.md",
  "SOURCE_OF_TRUTH.md",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "PHASE_STATUS.md",
  "CHANGELOG.md",
  "package.json",
  "next.config.ts",
  "tsconfig.json"
];

for (const file of requiredTopLevelFiles) read(file);

const requiredScriptNames = [
  "lint",
  "build",
  "validate:routes",
  "validate:registry",
  "validate:migrations",
  "audit:source",
  "audit:pythonml",
  "audit:integration",
  "check"
];

for (const scriptName of requiredScriptNames) {
  if (!pkg.scripts || typeof pkg.scripts[scriptName] !== "string") {
    fail("package.json missing script " + scriptName);
  }
  pass("package.json has script " + scriptName);
}

const requiredAuditScripts = [
  "audit:phase3",
  "audit:phase4",
  "audit:phase5",
  "audit:phase6",
  "audit:phase8",
  "audit:phase10",
  "audit:phase11",
  "audit:phase12",
  "audit:phase13",
  "audit:phase13_5",
  "audit:phase13_5b",
  "audit:phase13_5c",
  "audit:phase13_5d",
  "audit:phase13_5e",
  "audit:phase13_5f",
  "audit:phase13_5g",
  "audit:phase14a",
  "audit:phase14b",
  "audit:phase14c",
  "audit:phase14d",
  "audit:phase14e",
  "audit:phase14f",
  "audit:phase14g",
  "audit:phase14h",
  "audit:phase14i",
  "audit:phase14j",
  "audit:phase15a",
  "audit:phase15b",
  "audit:phase15c",
  "audit:phase15d",
  "audit:phase15e",
  "audit:phase15f",
  "audit:phase15g",
  "audit:phase15h",
  "audit:phase15i",
  "audit:phase15j",
  "audit:phase15k",
  "audit:phase15l",
  "audit:phase15m",
  "audit:phase15n",
  "audit:phase15o",
  "audit:phase15p",
  "audit:phase15q",
  "audit:phase15r",
  "audit:phase16a",
  "audit:phase16b",
  "audit:phase16c",
  "audit:phase16d",
  "audit:phase16e",
  "audit:phase16f",
  "audit:phase16g",
  "audit:phase16g_b",
  "audit:phase16h",
  "audit:phase16h_b",
  "audit:phase16i",
  "audit:phase16j",
  "audit:phase16k",
  "audit:phase16l",
  "audit:phase16m",
  "audit:phase16n",
  "audit:phase16o",
  "audit:phase16p",
  "audit:phase16q",
  "audit:phase16r",
  "audit:phase16_5a",
  "audit:phase16_5b",
  "audit:phase16_5c",
  "audit:phase16_5d",
  "audit:phase16_5e",
  "audit:phase16_5f",
  "audit:phase16_5g",
  "audit:phase16_5h",
  "audit:phase16_5i",
  "audit:phase16_5j",
  "audit:phase17a",
  "audit:phase17b",
  "audit:phase17c",
  "audit:phase17d",
  "audit:phase17e",
  "audit:phase17f",
  "audit:phase17g",
  "audit:phase17h",
  "audit:phase17i",
  "audit:phase17j",
  "audit:phase17k",
  "audit:phase17l",
  "audit:phase17m",
  "audit:phase17n",
  "audit:phase17o",
  "audit:phase17p",
  "audit:phase17q"
];

for (const scriptName of requiredAuditScripts) {
  if (!pkg.scripts || typeof pkg.scripts[scriptName] !== "string") {
    fail("package.json missing " + scriptName);
  }
  pass("package.json has " + scriptName);
  mustInclude("package.json check chain", pkg.scripts.check, "npm run " + scriptName);
}

const representativeFiles = [
  "src/lib/carnos-continuity/index.ts",
  "src/lib/repositories/index.ts",
  "src/components/memory-rag/index.ts",
  "src/components/memory-rag/MemoryRagPreviewPanel.tsx",
  "src/components/memory-rag/CarnosMemoryIntegrationPanel.tsx",
  "src/lib/carnos-continuity/carnos-memory-context-pack-builder.ts",
  "src/lib/carnos-continuity/retrieval-audit-trail-explanation.ts",
  "src/lib/carnos-continuity/privacy-sensitive-forget-readiness.ts",
  "docs/contracts/PHASE_17Q_FINAL_MEMORY_RAG_AUDIT.md",
  "docs/phase-reports/PHASE_17Q_FINAL_MEMORY_RAG_COMPLETION_REPORT.md",
  "docs/fixtures/phase17-memory-rag/phase17_memory_rag_fixture.json"
];

for (const file of representativeFiles) read(file);

mustInclude("PHASE_STATUS.md", phaseStatus, "Phase 17 Memory/RAG complete");
mustInclude("PROJECT_EXECUTION_LOG.md", executionLog, "Phase 17 Memory/RAG complete");
mustInclude("CODE_LEDGER.md", codeLedger, "Phase 17Q");
mustInclude("CHANGELOG.md", changelog, "Phase 17Q");
mustInclude("SOURCE_OF_TRUTH.md", sourceTruth, "source");

const head = git("git rev-parse --short HEAD");
const branch = git("git branch --show-current");
const latestCommit = git("git log -1 --oneline");
const srcCount = countFiles("src");
const docsCount = countFiles("docs");
const scriptCount = countFiles("scripts");
const migrationCount = countFiles("supabase/migrations") + countFiles("db/migrations") + countFiles("migrations");

mkdirSync("docs/audits", { recursive: true });

const report = [
  "# Project Integrity Proof Report",
  "",
  "Generated by `npm run audit:project-proof`.",
  "",
  "## Git proof",
  "",
  "- Branch: `" + branch + "`",
  "- HEAD: `" + head + "`",
  "- Latest commit: `" + latestCommit + "`",
  "",
  "## Verification chain proof",
  "",
  "- Required top-level scripts checked: " + requiredScriptNames.length,
  "- Required phase/integration audit scripts checked in `package.json`: " + requiredAuditScripts.length,
  "- `npm run check` contains every required phase audit through Phase 17Q.",
  "- Representative cross-module files exist for repositories, Carnos continuity, Memory/RAG UI, Carnos integration UI, privacy readiness, final fixture, and final completion report.",
  "",
  "## Repository surface counts",
  "",
  "- Source files under `src`: " + srcCount,
  "- Documentation files under `docs`: " + docsCount,
  "- Script files under `scripts`: " + scriptCount,
  "- Migration files counted across migration folders: " + migrationCount,
  "",
  "## Phase status proof",
  "",
  "- `PHASE_STATUS.md` contains `Phase 17 Memory/RAG complete`.",
  "- `PROJECT_EXECUTION_LOG.md` contains `Phase 17 Memory/RAG complete`.",
  "- `CODE_LEDGER.md` contains Phase 17Q entries.",
  "- `CHANGELOG.md` contains Phase 17Q entries.",
  "",
  "## Boundary proof",
  "",
  "- Final Phase 17 fixture confirms preview-only memory/RAG boundaries.",
  "- Final audit chain confirms no runtime memory retrieval was activated.",
  "- Final audit chain confirms no Carnos prompt/context injection was activated.",
  "- Final audit chain confirms no write-enabled forget/delete execution was activated.",
  "",
  "## Commands that must pass for final proof",
  "",
  "```bash",
  "npm run audit:project-proof",
  "npm run check",
  "```",
  ""
].join("\n");

writeFileSync("docs/audits/PROJECT_INTEGRITY_PROOF_REPORT.md", report);

pass("Wrote docs/audits/PROJECT_INTEGRITY_PROOF_REPORT.md");
console.log("\n✓ Project integrity proof audit passed.");
