import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "docs/phase-plans/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK.md",
  "docs/phase-reports/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK_REPORT.md",
  "docs/qa/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5a.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const requiredMarkers = {
  "docs/phase-plans/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK.md": [
    "Phase 16.5 — Carnos Visual Identity + Companion UI",
    "Carnos is a mythic futuristic AI orb / mask companion.",
    "black-cyan-violet glowing orb",
    "subtle inner eye / mask / intelligence core",
    "16.5A — Carnos Visual Identity Scope Lock",
    "16.5B — Carnos Identity, State, and Capability Contract",
    "16.5C — Visual Tokens + Accessibility + Reduced Motion",
    "16.5D — Carnos Orb / Avatar Component",
    "16.5E — Carnos Companion Widget / Dock",
    "16.5F — Carnos Capability Matrix + Truthfulness Panel",
    "16.5G — Carnos Visual Identity Dashboard Panel",
    "16.5H — `/carnos` Page Integration",
    "16.5I — Command/Dashboard Lightweight Companion Integration",
    "16.5J — Final Phase 16.5 Audit + Visual Smoke Checklist + Completion Report",
    "listening_visual_ready",
    "speaking_visual_ready",
    "reviewing_memory",
    "reviewing_current_info",
    "privacy_locked",
    "action_pending",
    "State priority rule",
    "Truthfulness rule",
    "Required capability matrix",
    "Accessibility and reduced motion",
    "Mobile behavior",
    "Forbidden in Phase 16.5",
    "real voice talk-back runtime",
    "real internet provider calls",
    "Python/tool execution runtime",
    "document ingestion engine",
    "automatic memory writes",
    "autonomous action execution",
  ],
  "docs/phase-reports/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK_REPORT.md": [
    "Phase 16.5A",
    "Carnos Visual Identity + Companion UI",
    "state priority system",
    "truthfulness rules",
    "accessibility and reduced-motion requirements",
    "No runtime code",
    "Phase 16.5B",
  ],
  "docs/qa/PHASE_16_5A_CARNOS_VISUAL_IDENTITY_SCOPE_LOCK_SMOKE_CHECKLIST.md": [
    "Carnos visual identity is locked",
    "State priority rule is listed",
    "Truthfulness rule is listed",
    "Capability matrix requirement is listed",
    "Accessibility and reduced-motion requirements are listed",
    "No runtime code is added in 16.5A",
  ],
  "package.json": [
    "audit:phase16_5a",
  ],
};

const forbiddenPaths = [
  "src/components/carnos/carnos-orb.tsx",
  "src/components/carnos/carnos-companion-widget.tsx",
  "src/components/carnos/carnos-companion-dock.tsx",
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

console.log("\n=== PHASE 16.5A CARNOS VISUAL IDENTITY SCOPE LOCK AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const [file, markers] of Object.entries(requiredMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5A new runtime path exists: ${path}`);
  console.log(`✓ Forbidden new runtime path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5a"], "package.json missing audit:phase16_5a");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5a"), "npm run check missing audit:phase16_5a");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5a"), "npm run check:verbose missing audit:phase16_5a");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5a"), "npm run check:quiet missing audit:phase16_5a");

console.log("✓ verification chain includes audit:phase16_5a");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5A"), `${file} missing Phase 16.5A`);
  assert(text.includes("Carnos Visual Identity Scope Lock"), `${file} missing Carnos Visual Identity Scope Lock`);
  console.log(`✓ ${file} includes Phase 16.5A status`);
}

console.log("\nPhase 16.5A audit passed: Carnos visual identity scope is locked with truthfulness, accessibility, mobile, and safety boundaries.");
