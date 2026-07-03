import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/current-info-capture/current-info-privacy-retention-rules.ts",
  "src/lib/current-info-capture/index.ts",
  "src/components/dashboard/current-info-privacy-retention-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16P_PRIVACY_RETENTION_RULES_CONTRACT.md",
  "docs/phase-reports/PHASE_16P_PRIVACY_RETENTION_RULES_REPORT.md",
  "docs/qa/PHASE_16P_PRIVACY_RETENTION_RULES_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16p.mjs",
  "package.json",
];

const markers = {
  "src/lib/current-info-capture/current-info-privacy-retention-rules.ts": [
    "evaluateCurrentInfoPrivacyRetentionRules",
    "evaluateCurrentInfoQueryPrivacy",
    "evaluateCurrentInfoSourcePrivacy",
    "evaluateCurrentInfoCandidatePrivacy",
    "private_mode_ephemeral",
    "do_not_retain",
    "manual_save_only",
    "block_retention",
    "redact_preview",
    "raw_content_stored",
    "web_source_blocked_by_private_mode",
    "web_source_blocked_by_reliability",
    "PHASE_16P_PRIVACY_RETENTION_RULE_BOUNDARY",
  ],
  "src/lib/current-info-capture/index.ts": [
    'export * from "./current-info-privacy-retention-rules";',
  ],
  "src/components/dashboard/current-info-privacy-retention-panel.tsx": [
    "CurrentInfoPrivacyRetentionPanel",
    "CurrentInfoPrivacyRetentionEvaluation",
    "Current-info privacy and retention",
    "PHASE_16P_PRIVACY_RETENTION_PANEL_BOUNDARY",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./current-info-privacy-retention-panel";',
  ],
  "docs/contracts/PHASE_16P_PRIVACY_RETENTION_RULES_CONTRACT.md": [
    "Phase 16P",
    "Privacy, Sensitive Search, Retention Rules Contract",
    "private_mode_ephemeral",
    "16Q — Web Source Audit Trail",
  ],
  "docs/phase-reports/PHASE_16P_PRIVACY_RETENTION_RULES_REPORT.md": [
    "Phase 16P",
    "preview-only current-info privacy and retention-rule evaluation",
    "No deletion",
  ],
  "docs/qa/PHASE_16P_PRIVACY_RETENTION_RULES_SMOKE_CHECKLIST.md": [
    "Privacy retention helper exists",
    "No delete flow is added",
    "No audit insert is added",
  ],
  "package.json": [
    "audit:phase16p",
  ],
};

const forbiddenInRuntime = [
  "createSupabaseServerClient",
  "createSupabaseBrowserClient",
  ".from(",
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".rpc(",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "createEmbedding",
  "embed(",
  "executeApprovedAction(",
  "createProposedAction(",
  "approveCurrentInfo",
  "rejectCurrentInfo",
  "memory_embeddings",
];

const forbiddenFiles = [
  "src/app/api/current-info/privacy-retention/route.ts",
  "src/app/api/current-info/private-mode/route.ts",
  "supabase/migrations/0028_phase16p_privacy_retention_rules.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16P PRIVACY RETENTION RULES AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const [file, requiredMarkers] of Object.entries(markers)) {
  const text = read(file);

  for (const marker of requiredMarkers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const file of [
  "src/lib/current-info-capture/current-info-privacy-retention-rules.ts",
  "src/components/dashboard/current-info-privacy-retention-panel.tsx",
]) {
  const text = read(file);

  for (const marker of forbiddenInRuntime) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16P file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16p"),
    `${script} must include audit:phase16p`,
  );
}

console.log("✓ verification chain includes audit:phase16p");
console.log("\nPhase 16P audit passed: privacy, sensitive-search, raw-content, and retention rules are preview-only and wired into verification.");
