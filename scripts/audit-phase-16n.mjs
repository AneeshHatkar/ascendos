import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/current-info-capture/knowledge-vault-source-bridge.ts",
  "src/lib/current-info-capture/index.ts",
  "src/components/dashboard/knowledge-vault-source-bridge-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_CONTRACT.md",
  "docs/phase-reports/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_REPORT.md",
  "docs/qa/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16n.mjs",
  "package.json",
];

const markers = {
  "src/lib/current-info-capture/knowledge-vault-source-bridge.ts": [
    "buildKnowledgeVaultSourceBridge",
    "KnowledgeVaultSourceBridgeRecord",
    "KnowledgeVaultSourceBridgeSummary",
    "ready_for_review",
    "needs_evidence",
    "save_web_source_to_knowledge_candidate",
    "knowledge_vault_items",
    "PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_BOUNDARY",
  ],
  "src/lib/current-info-capture/index.ts": [
    'export * from "./knowledge-vault-source-bridge";',
  ],
  "src/components/dashboard/knowledge-vault-source-bridge-panel.tsx": [
    "KnowledgeVaultSourceBridgePanel",
    "KnowledgeVaultSourceBridgeResult",
    "Vault guidance",
    "PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_PANEL_BOUNDARY",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./knowledge-vault-source-bridge-panel";',
  ],
  "docs/contracts/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_CONTRACT.md": [
    "Phase 16N",
    "Knowledge Vault Source Bridge Contract",
    "read-only bridge",
    "16O — Review-to-Save Candidate Flow",
  ],
  "docs/phase-reports/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_REPORT.md": [
    "Phase 16N",
    "read-only Knowledge Vault source bridge helper",
    "without writing Knowledge Vault records",
  ],
  "docs/qa/PHASE_16N_KNOWLEDGE_VAULT_SOURCE_BRIDGE_SMOKE_CHECKLIST.md": [
    "Knowledge Vault source bridge helper exists",
    "No embedding flow is added",
    "No write operation is added",
  ],
  "package.json": [
    "audit:phase16n",
  ],
};

const forbiddenInBridge = [
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
  "memory_embeddings",
  "approveCurrentInfo",
  "rejectCurrentInfo",
];

const forbiddenFiles = [
  "src/app/api/current-info/knowledge-vault/route.ts",
  "supabase/migrations/0028_phase16n_knowledge_vault_source_bridge.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16N KNOWLEDGE VAULT SOURCE BRIDGE AUDIT ===");

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
  "src/lib/current-info-capture/knowledge-vault-source-bridge.ts",
  "src/components/dashboard/knowledge-vault-source-bridge-panel.tsx",
]) {
  const text = read(file);

  for (const marker of forbiddenInBridge) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16N file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16n"),
    `${script} must include audit:phase16n`,
  );
}

console.log("✓ verification chain includes audit:phase16n");
console.log("\nPhase 16N audit passed: Knowledge Vault source bridge is present, exported, documented, and read-only.");
