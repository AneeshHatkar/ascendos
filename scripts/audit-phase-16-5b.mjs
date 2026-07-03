import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "docs/phase-plans/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK.md",
  "docs/contracts/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT_REPORT.md",
  "docs/qa/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT_SMOKE_CHECKLIST.md",
  "src/lib/carnos-identity/carnos-visual-identity.ts",
  "src/lib/carnos-identity/index.ts",
  "scripts/audit-phase-16-5b.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const requiredContractMarkers = [
  "CARNOS_VISUAL_STATE_IDS",
  "CarnosVisualStateId",
  "CarnosCapabilityStatus",
  "CarnosCompanionSurface",
  "CarnosBoundaryBadgeId",
  "CarnosVisualState",
  "CarnosCapability",
  "CarnosBoundaryBadge",
  "CarnosVisualIdentity",
  "CARNOS_STATE_PRIORITIES",
  "CARNOS_VISUAL_STATES",
  "CARNOS_BOUNDARY_BADGES",
  "CARNOS_CAPABILITY_MATRIX",
  "CARNOS_COMPANION_SURFACES",
  "CARNOS_DEFAULT_VISUAL_IDENTITY",
  "getCarnosVisualState",
  "getHighestPriorityCarnosState",
  "getCarnosCapabilityStatus",
  "isCarnosRuntimeCapabilityEnabled",
  "listening_visual_ready",
  "speaking_visual_ready",
  "reviewing_memory",
  "reviewing_current_info",
  "privacy_locked",
  "action_pending",
  "runtime_deferred",
  "requires_confirmation",
  "forbidden",
  "planned",
  "automatic_memory_write",
  "real_internet_provider",
  "full_voice_talk_back",
  "python_tools",
  "document_ingestion",
  "background_autonomous_actions",
  "No hidden memory",
  "No silent browsing",
  "No autosave",
  "Foundation present",
  "Runtime deferred",
];

const requiredDocMarkers = {
  "docs/contracts/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT.md": [
    "Phase 16.5B",
    "Carnos Identity, State, and Capability Contract",
    "CARNOS_VISUAL_STATES",
    "CARNOS_STATE_PRIORITIES",
    "CARNOS_CAPABILITY_MATRIX",
    "CARNOS_BOUNDARY_BADGES",
    "Truthfulness rule",
    "Runtime boundary",
    "No UI component",
    "No runtime system is activated",
  ],
  "docs/phase-reports/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT_REPORT.md": [
    "Phase 16.5B",
    "CARNOS_DEFAULT_VISUAL_IDENTITY",
    "getHighestPriorityCarnosState",
    "No UI component is added",
    "No runtime system is activated",
    "Phase 16.5C",
  ],
  "docs/qa/PHASE_16_5B_CARNOS_IDENTITY_STATE_CONTRACT_SMOKE_CHECKLIST.md": [
    "src/lib/carnos-identity/carnos-visual-identity.ts",
    "Required visual states are defined",
    "Capability statuses are defined",
    "Automatic memory write is forbidden",
    "Real internet provider is runtime_deferred",
    "Full voice talk-back is runtime_deferred",
    "Python/tools are runtime_deferred",
    "Document ingestion is planned",
    "Background autonomous actions are forbidden",
    "No UI component is added",
  ],
};

const forbiddenPaths = [
  "src/components/carnos/carnos-capability-matrix-panel.tsx",
  "src/components/carnos/carnos-boundary-badges.tsx",
  "src/app/api/carnos/voice",
  "src/app/api/carnos/tools",
  "src/app/api/carnos/internet",
  "src/app/api/carnos/documents",
  "supabase/migrations/0028_phase16_5_carnos_visual_identity.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16.5B CARNOS IDENTITY STATE CAPABILITY CONTRACT AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const contractText = read("src/lib/carnos-identity/carnos-visual-identity.ts");

for (const marker of requiredContractMarkers) {
  assert(contractText.includes(marker), `Carnos visual identity contract missing marker: ${marker}`);
  console.log(`✓ Contract includes marker: ${marker}`);
}

for (const [file, markers] of Object.entries(requiredDocMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5B runtime/UI path exists: ${path}`);
  console.log(`✓ Forbidden runtime/UI path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5b"], "package.json missing audit:phase16_5b");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5b"), "npm run check missing audit:phase16_5b");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5b"), "npm run check:verbose missing audit:phase16_5b");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5b"), "npm run check:quiet missing audit:phase16_5b");

console.log("✓ verification chain includes audit:phase16_5b");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5B"), `${file} missing Phase 16.5B`);
  assert(text.includes("Carnos Identity, State, and Capability Contract"), `${file} missing Carnos Identity, State, and Capability Contract`);
  console.log(`✓ ${file} includes Phase 16.5B status`);
}

console.log("\nPhase 16.5B audit passed: Carnos identity, state, priority, capability, badge, and surface contracts are locked without runtime activation.");
