import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/carnos-identity/carnos-visual-identity.ts",
  "src/lib/carnos-identity/carnos-visual-tokens.ts",
  "src/lib/carnos-identity/carnos-accessibility.ts",
  "src/lib/carnos-identity/index.ts",
  "docs/contracts/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_REPORT.md",
  "docs/qa/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5c.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const tokenMarkers = [
  "CARNOS_BASE_VISUAL_TOKENS",
  "CARNOS_TONE_TOKENS",
  "CARNOS_STATE_VISUAL_TOKENS",
  "CARNOS_RESPONSIVE_TOKENS",
  "CARNOS_MOTION_BOUNDARIES",
  "CarnosMotionMode",
  "CarnosResponsiveMode",
  "CarnosToneToken",
  "CarnosStateVisualToken",
  "getCarnosToneToken",
  "getCarnosStateVisualToken",
  "getCarnosResponsiveToken",
  "getCarnosStaticFallbackClassName",
  "motion-reduce:animate-none",
  "noFlashing",
  "noAggressivePulse",
  "noSeizureRiskEffects",
  "staticFallbackRequired",
  "desktop",
  "tablet",
  "mobile",
  "mobile_companion_pill",
];

const accessibilityMarkers = [
  "CARNOS_ACCESSIBILITY_RULES",
  "CARNOS_ACCESSIBLE_STATE_LABELS",
  "CARNOS_REDUCED_MOTION_REQUIREMENTS",
  "getCarnosAccessibleStateLabel",
  "getCarnosAriaLabel",
  "screen_reader_label_required",
  "keyboard_focus_required",
  "reduced_motion_required",
  "static_fallback_required",
  "no_flashing",
  "no_aggressive_pulse",
  "mobile_no_overlap",
  "truthful_state_label_required",
  "microphone capture is not active",
  "audio output is not active",
  "No hidden memory write is implied",
  "No live internet call is implied",
  "No action is executed automatically",
];

const docMarkers = {
  "docs/contracts/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_CONTRACT.md": [
    "Phase 16.5C",
    "Carnos Visual Tokens + Accessibility + Reduced Motion Contract",
    "CARNOS_BASE_VISUAL_TOKENS",
    "CARNOS_TONE_TOKENS",
    "CARNOS_STATE_VISUAL_TOKENS",
    "CARNOS_RESPONSIVE_TOKENS",
    "CARNOS_MOTION_BOUNDARIES",
    "CARNOS_ACCESSIBILITY_RULES",
    "CARNOS_ACCESSIBLE_STATE_LABELS",
    "CARNOS_REDUCED_MOTION_REQUIREMENTS",
    "prefers-reduced-motion support",
    "static fallback orb rules",
    "no flashing",
    "no aggressive pulse",
    "mobile no-overlap rule",
    "No UI component is added",
    "No orb component is added",
    "No runtime system is activated",
  ],
  "docs/phase-reports/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_REPORT.md": [
    "Phase 16.5C",
    "CARNOS_BASE_VISUAL_TOKENS",
    "CARNOS_ACCESSIBILITY_RULES",
    "CARNOS_REDUCED_MOTION_REQUIREMENTS",
    "No UI component is added",
    "No orb component is added",
    "No runtime system is activated",
    "Phase 16.5D",
  ],
  "docs/qa/PHASE_16_5C_CARNOS_VISUAL_TOKENS_ACCESSIBILITY_SMOKE_CHECKLIST.md": [
    "CARNOS_BASE_VISUAL_TOKENS",
    "CARNOS_TONE_TOKENS",
    "CARNOS_STATE_VISUAL_TOKENS",
    "CARNOS_RESPONSIVE_TOKENS",
    "CARNOS_MOTION_BOUNDARIES",
    "CARNOS_ACCESSIBILITY_RULES",
    "CARNOS_ACCESSIBLE_STATE_LABELS",
    "CARNOS_REDUCED_MOTION_REQUIREMENTS",
    "prefers-reduced-motion support is required",
    "static fallback is required",
    "no flashing is required",
    "No UI component is added",
    "No orb component is added",
  ],
};

const forbiddenPaths = [
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

console.log("\n=== PHASE 16.5C CARNOS VISUAL TOKENS ACCESSIBILITY AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const tokenText = read("src/lib/carnos-identity/carnos-visual-tokens.ts");
for (const marker of tokenMarkers) {
  assert(tokenText.includes(marker), `visual tokens missing marker: ${marker}`);
  console.log(`✓ visual tokens include marker: ${marker}`);
}

const accessibilityText = read("src/lib/carnos-identity/carnos-accessibility.ts");
for (const marker of accessibilityMarkers) {
  assert(accessibilityText.includes(marker), `accessibility contract missing marker: ${marker}`);
  console.log(`✓ accessibility includes marker: ${marker}`);
}

const indexText = read("src/lib/carnos-identity/index.ts");
for (const marker of [
  "CARNOS_BASE_VISUAL_TOKENS",
  "CARNOS_ACCESSIBILITY_RULES",
  "getCarnosStateVisualToken",
  "getCarnosAriaLabel",
]) {
  assert(indexText.includes(marker), `index export missing marker: ${marker}`);
  console.log(`✓ index exports marker: ${marker}`);
}

for (const [file, markers] of Object.entries(docMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5C UI/runtime path exists: ${path}`);
  console.log(`✓ Forbidden UI/runtime path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5c"], "package.json missing audit:phase16_5c");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5c"), "npm run check missing audit:phase16_5c");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5c"), "npm run check:verbose missing audit:phase16_5c");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5c"), "npm run check:quiet missing audit:phase16_5c");

console.log("✓ verification chain includes audit:phase16_5c");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5C"), `${file} missing Phase 16.5C`);
  assert(text.includes("Visual Tokens + Accessibility + Reduced Motion"), `${file} missing Visual Tokens + Accessibility + Reduced Motion`);
  console.log(`✓ ${file} includes Phase 16.5C status`);
}

console.log("\nPhase 16.5C audit passed: Carnos visual tokens, accessibility labels, reduced-motion rules, responsive behavior, and static fallback contracts are locked without UI/runtime activation.");
