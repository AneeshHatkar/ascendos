import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/carnos/carnos-orb.tsx",
  "src/components/carnos/carnos-companion-widget.tsx",
  "src/components/carnos/carnos-companion-dock.tsx",
  "src/components/carnos/index.ts",
  "docs/contracts/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_REPORT.md",
  "docs/qa/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5e.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const widgetMarkers = [
  "export function CarnosCompanionWidget",
  "CarnosCompanionWidgetProps",
  "CarnosCompanionWidgetMode",
  "CarnosOrb",
  "CARNOS_BOUNDARY_BADGES",
  "CARNOS_MOBILE_COMPANION_SURFACE_TOKEN",
  "data-carnos-companion-widget",
  "data-carnos-companion-mode",
  "data-carnos-mobile-surface",
  "data-carnos-boundary-badge-strip",
  "data-carnos-runtime-boundary-copy",
  "Visual only",
  "mobile_pill",
  "compact",
  "expanded",
  "does not start voice capture",
  "browse the internet",
  "run tools",
  "ingest documents",
  "save memory",
  "execute actions",
];

const dockMarkers = [
  "export function CarnosCompanionDock",
  "CarnosCompanionDockProps",
  "CarnosCompanionDockPlacement",
  "bottom_right",
  "bottom_left",
  "inline",
  "mobile_inline",
  "data-carnos-companion-dock",
  "data-carnos-dock-placement",
  "pointer-events-none",
  "pointer-events-auto",
  "CarnosCompanionWidget",
];

const indexMarkers = [
  "CarnosCompanionWidget",
  "CarnosCompanionWidgetProps",
  "CarnosCompanionWidgetMode",
  "CarnosCompanionDock",
  "CarnosCompanionDockProps",
  "CarnosCompanionDockPlacement",
];

const docMarkers = {
  "docs/contracts/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_CONTRACT.md": [
    "Phase 16.5E",
    "Carnos Companion Widget / Dock Contract",
    "CarnosCompanionWidget",
    "CarnosCompanionDock",
    "mobile_pill",
    "CARNOS_MOBILE_COMPANION_SURFACE_TOKEN",
    "boundary badge strip",
    "runtime boundary copy",
    "no fake active runtime controls",
    "voice capture",
    "real internet provider calls",
    "Python/tool execution",
    "document ingestion",
    "automatic memory writes",
    "autonomous actions",
    "No API route is added",
    "No SQL migration is added",
    "No dashboard page integration is added",
    "No `/carnos` page integration is added",
  ],
  "docs/phase-reports/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_REPORT.md": [
    "Phase 16.5E",
    "CarnosCompanionWidget",
    "CarnosCompanionDock",
    "compact widget mode",
    "expanded widget mode",
    "mobile pill widget mode",
    "No runtime system is activated",
    "Phase 16.5F",
  ],
  "docs/qa/PHASE_16_5E_CARNOS_COMPANION_WIDGET_DOCK_SMOKE_CHECKLIST.md": [
    "src/components/carnos/carnos-companion-widget.tsx",
    "src/components/carnos/carnos-companion-dock.tsx",
    "CarnosCompanionWidget",
    "CarnosCompanionDock",
    "Uses `CarnosOrb`",
    "Supports `mobile_pill`",
    "Shows `Visual only`",
    "No capability matrix panel is added",
    "No API route is added",
    "No SQL migration is added",
  ],
};

const forbiddenPaths = [
  "src/components/dashboard/carnos-visual-identity-panel.tsx",
  "src/app/api/carnos/voice",
  "src/app/api/carnos/tools",
  "src/app/api/carnos/internet",
  "src/app/api/carnos/documents",
  "supabase/migrations/0028_phase16_5_carnos_visual_identity.sql",
];

const forbiddenRuntimeMarkers = [
  "fetch(",
  "supabase",
  "createClient",
  "navigator.mediaDevices",
  "MediaRecorder",
  "SpeechRecognition",
  "webkitSpeechRecognition",
  "speechSynthesis",
  "AudioContext",
  "runPython",
  "executeTool",
  "saveMemory",
  "autonomousAction",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log("\n=== PHASE 16.5E CARNOS COMPANION WIDGET DOCK AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const widgetText = read("src/components/carnos/carnos-companion-widget.tsx");
for (const marker of widgetMarkers) {
  assert(widgetText.includes(marker), `Widget missing marker: ${marker}`);
  console.log(`✓ Widget includes marker: ${marker}`);
}

const dockText = read("src/components/carnos/carnos-companion-dock.tsx");
for (const marker of dockMarkers) {
  assert(dockText.includes(marker), `Dock missing marker: ${marker}`);
  console.log(`✓ Dock includes marker: ${marker}`);
}

for (const marker of forbiddenRuntimeMarkers) {
  assert(!widgetText.includes(marker), `Widget includes forbidden runtime marker: ${marker}`);
  assert(!dockText.includes(marker), `Dock includes forbidden runtime marker: ${marker}`);
  console.log(`✓ Widget/dock exclude forbidden runtime marker: ${marker}`);
}

const indexText = read("src/components/carnos/index.ts");
for (const marker of indexMarkers) {
  assert(indexText.includes(marker), `Component index missing marker: ${marker}`);
  console.log(`✓ Component index includes marker: ${marker}`);
}

for (const [file, markers] of Object.entries(docMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5E future UI/runtime path exists: ${path}`);
  console.log(`✓ Forbidden future UI/runtime path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5e"], "package.json missing audit:phase16_5e");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5e"), "npm run check missing audit:phase16_5e");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5e"), "npm run check:verbose missing audit:phase16_5e");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5e"), "npm run check:quiet missing audit:phase16_5e");

console.log("✓ verification chain includes audit:phase16_5e");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5E"), `${file} missing Phase 16.5E`);
  assert(text.includes("Carnos Companion Widget / Dock"), `${file} missing Carnos Companion Widget / Dock`);
  console.log(`✓ ${file} includes Phase 16.5E status`);
}

console.log("\nPhase 16.5E audit passed: Carnos companion widget/dock are visual-only, mobile-safe, and boundary-protected.");
