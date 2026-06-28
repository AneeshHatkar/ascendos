import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "docs/carnos/CARNOS_PERSONA_CONTRACT.md",
  "docs/database/PHASE_13_5B_CARNOS_PERSONA_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_13_5B_CARNOS_PERSONA_COMPLETION_REPORT.md",
  "docs/qa/PHASE_13_5B_CARNOS_PERSONA_MANUAL_SMOKE_CHECKLIST.md",
  "supabase/migrations/0018_phase13_5b_carnos_persona_foundation.sql",
  "src/lib/carnos/persona-contract.ts",
  "src/lib/repositories/carnos-persona-read.ts",
  "src/components/carnos/carnos-persona-boundary-panel.tsx",
  "src/components/carnos/index.ts",
  "src/app/carnos/page.tsx",
];

const requiredMarkers = new Map([
  [
    "docs/carnos/CARNOS_PERSONA_CONTRACT.md",
    [
      "loyal friend",
      "direct operator",
      "disciplined coach",
      "protective guardian",
      "honest mirror",
      "strategic analyst",
      "research/career mentor",
      "grounded grimoire guide",
      "No silent database writes",
      "Memory/RAG is deferred to Phase 15",
      "Voice is deferred to Phase 14",
      "Web search is deferred to Phase 16",
    ],
  ],
  [
    "supabase/migrations/0018_phase13_5b_carnos_persona_foundation.sql",
    [
      "create table if not exists public.persona_prompt_versions",
      "alter table public.persona_prompt_versions enable row level security",
      "persona_prompt_versions_select_own",
      "phase13_5b_assert_carnos_profile_belongs_to_user",
      "phase13_5b_guard_persona_prompt_versions_profile",
      "system_prompt",
      "safety_rules",
      "routing_rules",
    ],
  ],
  [
    "src/lib/carnos/persona-contract.ts",
    [
      "CARNOS_PERSONA_VERSION",
      "CARNOS_PERSONA_LAYERS",
      "CARNOS_DEFAULT_SYSTEM_PROMPT",
      "CARNOS_RUNTIME_BOUNDARIES",
      "getDefaultCarnosPersonaContract",
      "No silent database writes.",
      "No replacing proof with fantasy identity.",
    ],
  ],
  [
    "src/lib/repositories/carnos-persona-read.ts",
    [
      "PersonaPromptVersionRow",
      "listPersonaPromptVersions",
      "getActiveCarnosPersonaPromptVersion",
      "getCarnosPersonaRuntimeSummary",
      "persona_prompt_versions",
    ],
  ],
  [
    "src/components/carnos/carnos-persona-boundary-panel.tsx",
    [
      "CarnosPersonaBoundaryPanel",
      "Carnos v1 is locked",
      "Runtime boundary",
      "Persona layers",
      "Safety rules",
    ],
  ],
  [
    "src/app/carnos/page.tsx",
    ["CarnosPersonaBoundaryPanel"],
  ],
  [
    "docs/phase-reports/PHASE_13_5B_CARNOS_PERSONA_COMPLETION_REPORT.md",
    [
      "does not enable assistant generation",
      "does not enable voice",
      "does not enable memory/RAG",
      "does not enable web search",
      "confirmation-before-write",
    ],
  ],
]);

const forbiddenRuntimeMarkers = new Map([
  [
    "src/lib/carnos/persona-contract.ts",
    ["openai.chat.completions.create", "generateText(", "streamText("],
  ],
  [
    "src/lib/repositories/carnos-persona-read.ts",
    [".insert(", ".update(", ".delete(", ".upsert(", "generateText(", "streamText("],
  ],
  [
    "src/components/carnos/carnos-persona-boundary-panel.tsx",
    [".insert(", ".update(", ".delete(", ".upsert(", "generateText(", "streamText("],
  ],
]);

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`Missing required file: ${file}`);
  }
}

for (const [file, markers] of requiredMarkers.entries()) {
  if (!existsSync(file)) {
    continue;
  }

  const content = readFileSync(file, "utf8");

  for (const marker of markers) {
    if (!content.includes(marker)) {
      failures.push(`Missing marker in ${file}: ${marker}`);
    }
  }
}

for (const [file, markers] of forbiddenRuntimeMarkers.entries()) {
  if (!existsSync(file)) {
    continue;
  }

  const content = readFileSync(file, "utf8");

  for (const marker of markers) {
    if (content.includes(marker)) {
      failures.push(`Forbidden runtime marker in ${file}: ${marker}`);
    }
  }
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
if (!packageJson.scripts?.["audit:phase13_5b"]) {
  failures.push("Missing package script: audit:phase13_5b");
}

if (!packageJson.scripts?.check?.includes("audit:phase13_5b")) {
  failures.push("npm run check does not include audit:phase13_5b");
}

if (failures.length > 0) {
  console.error("Phase 13.5B audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 13.5B Carnos persona/chat repair audit passed.");
