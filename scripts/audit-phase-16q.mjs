import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/current-info-capture/current-info-web-source-audit-trail.ts",
  "src/lib/current-info-capture/index.ts",
  "src/components/dashboard/current-info-web-source-audit-trail-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_CONTRACT.md",
  "docs/phase-reports/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_REPORT.md",
  "docs/qa/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16q.mjs",
  "package.json",
];

const markers = {
  "src/lib/current-info-capture/current-info-web-source-audit-trail.ts": [
    "buildCurrentInfoWebSourceAuditTrail",
    "CurrentInfoAuditTrailRecord",
    "CurrentInfoAuditTrailSummary",
    "web_search_performed",
    "web_source_candidate_created",
    "web_source_candidate_approved",
    "web_source_candidate_rejected",
    "web_source_saved",
    "web_source_linked_to_record",
    "web_source_marked_stale",
    "web_source_blocked_by_private_mode",
    "web_source_blocked_by_reliability",
    "sourceCoverageWarnings",
    "PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_BOUNDARY",
  ],
  "src/lib/current-info-capture/index.ts": [
    'export * from "./current-info-web-source-audit-trail";',
  ],
  "src/components/dashboard/current-info-web-source-audit-trail-panel.tsx": [
    "CurrentInfoWebSourceAuditTrailPanel",
    "CurrentInfoAuditTrailResult",
    "Web source audit trail",
    "PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_PANEL_BOUNDARY",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./current-info-web-source-audit-trail-panel";',
  ],
  "docs/contracts/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_CONTRACT.md": [
    "Phase 16Q",
    "Web Source Audit Trail Contract",
    "web_source_audit_events",
    "16R — Final Phase 16 Audit + Smoke Checklist + Completion Report",
  ],
  "docs/phase-reports/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_REPORT.md": [
    "Phase 16Q",
    "read-only web source audit trail helper",
    "No audit inserts",
  ],
  "docs/qa/PHASE_16Q_WEB_SOURCE_AUDIT_TRAIL_SMOKE_CHECKLIST.md": [
    "Web source audit trail helper exists",
    "No audit insert flow is added",
    "No generic audit log write is added",
  ],
  "package.json": [
    "audit:phase16q",
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
  "writeAuditLog(",
  "executeApprovedAction(",
  "createProposedAction(",
  "approveCurrentInfo",
  "rejectCurrentInfo",
  "memory_embeddings",
];

const forbiddenFiles = [
  "src/app/api/current-info/audit-trail/route.ts",
  "src/app/api/current-info/audit-events/route.ts",
  "supabase/migrations/0028_phase16q_web_source_audit_trail.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16Q WEB SOURCE AUDIT TRAIL AUDIT ===");

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
  "src/lib/current-info-capture/current-info-web-source-audit-trail.ts",
  "src/components/dashboard/current-info-web-source-audit-trail-panel.tsx",
]) {
  const text = read(file);

  for (const marker of forbiddenInRuntime) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16Q file exists: ${file}`);
  console.log(`✓ Forbidden file absent: ${file}`);
}

const packageJson = JSON.parse(read("package.json"));
for (const script of ["check", "check:verbose", "check:quiet"]) {
  assert(
    packageJson.scripts?.[script]?.includes("audit:phase16q"),
    `${script} must include audit:phase16q`,
  );
}

console.log("✓ verification chain includes audit:phase16q");
console.log("\nPhase 16Q audit passed: web source audit trail is read-only, provenance-aware, and wired into verification.");
