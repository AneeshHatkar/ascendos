import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

let failed = false;

const requiredFiles = [
  "src/lib/carnos-continuity/memory-privacy-rules.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/memory-privacy-rules-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md",
  "docs/phase-reports/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_REPORT.md",
  "docs/qa/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15f.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const privacyMarkers = [
  "Phase 15F",
  "Privacy, Private Mode, Do-Not-Remember Rules",
  "MemoryPrivacySettingsPreview",
  "MemoryPrivacyRulePreview",
  "MemoryPrivacyEvaluationInput",
  "MemoryPrivacyEvaluationResult",
  "MemoryPrivacyBlockReason",
  "DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW",
  "createPrivateModeSettingsPreview",
  "createDoNotRememberRulePreview",
  "evaluateMemoryPrivacyRules",
  "private mode blocks memory candidates",
  "do-not-remember rules block memory candidates",
  "ask-every-time memory mode",
  "memory disabled mode",
  "sensitive memory requires review",
  "restricted memory requires explicit allow",
  "redaction preview only",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no Supabase calls",
  "no standalone /memory route",
  "no hidden Carnos prompt injection",
  "no automatic transcript-to-memory",
  "Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules",
];

const panelMarkers = [
  "MemoryPrivacyRulesPanel",
  "Phase 15F Privacy / Private Mode / Do-Not-Remember Rules",
  "Memory Privacy Control Preview",
  "private mode",
  "do-not-remember",
  "blocked categories",
  "restricted categories",
  "redaction",
  "candidate privacy evaluation",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no Supabase",
  "standalone /memory route",
  "hidden Carnos",
  "automatic transcript-to-memory",
];

const docsMarkers = [
  "Phase 15F",
  "Privacy, Private Mode, Do-Not-Remember Rules",
  "private mode blocking",
  "do-not-remember rule blocking",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no Supabase",
  "standalone `/memory` route",
  "Phase 15G",
];

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  ".rpc(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "createServerClient",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "createMemoryCandidatePreview(",
  "memory_items_insert",
  "executeApprovedAction(",
  "createProposedAction(",
];

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(filePath(relativePath));
}

function ok(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function requireFile(relativePath) {
  if (exists(relativePath)) {
    ok(`Found ${relativePath}`);
  } else {
    fail(`Missing ${relativePath}`);
  }
}

function requireIncludes(relativePath, marker) {
  const text = read(relativePath);
  if (text.includes(marker)) {
    ok(`${relativePath} includes ${marker}`);
  } else {
    fail(`${relativePath} missing ${marker}`);
  }
}

function requireAbsent(relativePath, marker) {
  const text = read(relativePath);
  if (text.includes(marker)) {
    fail(`${relativePath} contains forbidden marker: ${marker}`);
  } else {
    ok(`${relativePath} avoids forbidden marker: ${marker}`);
  }
}

console.log("\n=== PHASE 15F PRIVACY / PRIVATE MODE / DO-NOT-REMEMBER AUDIT ===");

for (const requiredFile of requiredFiles) {
  requireFile(requiredFile);
}

for (const marker of privacyMarkers) {
  requireIncludes("src/lib/carnos-continuity/memory-privacy-rules.ts", marker);
}

requireIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./memory-privacy-rules";');

for (const marker of panelMarkers) {
  requireIncludes("src/components/dashboard/memory-privacy-rules-panel.tsx", marker);
}

requireIncludes("src/components/dashboard/index.ts", 'export * from "./memory-privacy-rules-panel";');

for (const marker of forbiddenMarkers) {
  requireAbsent("src/lib/carnos-continuity/memory-privacy-rules.ts", marker);
  requireAbsent("src/components/dashboard/memory-privacy-rules-panel.tsx", marker);
}

for (const forbiddenPath of forbiddenPaths) {
  if (exists(forbiddenPath)) {
    fail(`Forbidden Phase 15F path exists: ${forbiddenPath}`);
  } else {
    ok(`Forbidden Phase 15F path absent: ${forbiddenPath}`);
  }
}

const migrationFiles = fs
  .readdirSync(filePath("supabase/migrations"))
  .filter((file) => file.includes("phase15"))
  .sort();

for (const migrationFile of migrationFiles) {
  if (
    migrationFile === "0024_phase15_memory_sql_foundation.sql" ||
    migrationFile === "0025_phase15_memory_parent_ownership_guards.sql"
  ) {
    ok(`Allowed existing Phase 15 migration: ${migrationFile}`);
  } else {
    fail(`Unexpected Phase 15F SQL migration found: ${migrationFile}`);
  }
}

for (const doc of [
  "docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md",
  "docs/phase-reports/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_REPORT.md",
  "docs/qa/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_SMOKE_CHECKLIST.md",
]) {
  for (const marker of docsMarkers) {
    requireIncludes(doc, marker);
  }
}

requireIncludes("package.json", "audit:phase15f");
requireIncludes("package.json", "npm run audit:phase15f");

for (const logFile of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  requireIncludes(logFile, "Phase 15F");
  requireIncludes(logFile, "Privacy, Private Mode, Do-Not-Remember Rules");
}

requireIncludes("PHASE_STATUS.md", "Phase 15G");

if (failed) {
  console.error("\nPhase 15F privacy/private-mode/do-not-remember audit failed.");
  process.exit(1);
}

console.log("\nPhase 15F privacy/private-mode/do-not-remember audit passed.");
