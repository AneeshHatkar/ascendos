import { readFileSync, existsSync } from "node:fs";

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

function includes(label, text, marker) {
  if (!text.includes(marker)) fail(label + " missing marker: " + marker);
  pass(label + " includes " + marker);
}

function excludes(label, text, marker) {
  if (text.includes(marker)) fail(label + " includes forbidden runtime marker: " + marker);
  pass(label + " excludes forbidden runtime marker: " + marker);
}

console.log("\n=== PHASE 17J KNOWLEDGE VAULT RETRIEVAL BRIDGE AUDIT ===");

const impl = read("src/lib/carnos-continuity/knowledge-vault-retrieval-bridge.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE.md");
const report = read("docs/phase-reports/PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_REPORT.md");
const checklist = read("docs/qa/PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17J — Knowledge Vault Retrieval Bridge",
  "Knowledge Vault Retrieval Bridge",
  "KnowledgeVaultBridgeItem",
  "KnowledgeVaultBridgedCandidate",
  "KnowledgeVaultRetrievalBridgeResult",
  "PHASE_17J_KNOWLEDGE_VAULT_RETRIEVAL_BRIDGE_BOUNDARY",
  "bridgeKnowledgeVaultItemToRetrievalCandidate",
  "bridgeKnowledgeVaultItemsToRetrievalCandidates",
  "buildKnowledgeVaultRetrievalBridge",
  "summarizeKnowledgeVaultRetrievalBridge",
  "getKnowledgeVaultRetrievalBridgeSummary",
  "knowledge vault to retrieval candidate bridge",
  "knowledge item bridge preview",
  "non-personal knowledge retrieval bridge",
  "uses Phase 17I retrieval planning",
  "bridged knowledge candidates remain preview-only",
  "visible bridge reasons",
  "planMemoryRetrievalRankingBudgetDedupe",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
  "runtime_side_effects_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false"
]) includes("implementation", impl, marker);

includes("index", index, "export * from \"./knowledge-vault-retrieval-bridge\";");

for (const marker of [
  "Phase 17J",
  "Knowledge Vault Retrieval Bridge",
  "knowledge vault to retrieval candidate bridge",
  "knowledge item bridge preview",
  "non-personal knowledge retrieval bridge",
  "uses Phase 17I retrieval planning",
  "bridged knowledge candidates remain preview-only",
  "visible bridge reasons",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 17J Knowledge Vault Retrieval Bridge Report",
  "Knowledge Vault item bridge types",
  "bridge item eligibility rules",
  "conversion into Phase 17I retrieval candidates",
  "Phase 17I retrieval planning reuse",
  "npm run audit:phase17j",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17J Knowledge Vault Retrieval Bridge Smoke Checklist",
  "bridgeKnowledgeVaultItemToRetrievalCandidate",
  "buildKnowledgeVaultRetrievalBridge",
  "Inactive knowledge items are excluded by default",
  "Private knowledge items are excluded by default",
  "Bridged knowledge candidates remain preview-only",
  "No runtime retrieval occurs",
  "No memory_retrieval_events writes occur",
  "No embeddings are generated",
  "No provider calls occur",
  "npm run audit:phase17j",
  "npm run check"
]) includes("checklist", checklist, marker);

includes("package.json", pkg, "\"audit:phase17j\"");
includes("package.json", pkg, "npm run audit:phase17i && npm run audit:phase17j");

for (const marker of [
  "createSupabaseServerClient",
  ".from(",
  "insert(",
  "update(",
  "delete(",
  "upsert(",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "vector(",
  "embedding vector",
  "navigator.mediaDevices",
  "setInterval(",
  "setTimeout(",
  "speechSynthesis",
  "createProposedAction",
  "executeApprovedAction"
]) excludes("implementation", impl, marker);

if (/semantic_retrieval_active:\s*true/.test(impl)) fail("semantic retrieval was activated");
pass("semantic retrieval remains disabled");
if (/runtime_side_effects_enabled:\s*true/.test(impl)) fail("runtime side effects were enabled");
pass("runtime side effects remain disabled");

console.log("\n✓ Phase 17J Knowledge Vault Retrieval Bridge audit passed.");
