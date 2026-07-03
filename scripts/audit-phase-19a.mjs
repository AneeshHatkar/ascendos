import { existsSync, readFileSync } from "node:fs";

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
  if (text.includes(marker)) fail(label + " contains forbidden marker: " + marker);
  pass(label + " excludes forbidden marker: " + marker);
}

console.log("\n=== PHASE 19A CUSTOM TRACKERS SCOPE LOCK AUDIT ===");

const roadmap = read("docs/roadmap/PHASE_19_CUSTOM_TRACKERS_EXPANDED_SCOPE_LOCK.md");
const contract = read("docs/contracts/PHASE_19A_CUSTOM_TRACKERS_SCOPE_LOCK.md");
const checklist = read("docs/qa/PHASE_19A_CUSTOM_TRACKERS_SCOPE_LOCK_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19A_CUSTOM_TRACKERS_SCOPE_LOCK_REPORT.md");
const pkgText = read("package.json");

for (const marker of [
  "Official Phase 19 goal: Custom tracker schema builder, entries, dashboard card placement",
  "/custom-trackers",
  "custom_trackers",
  "custom_tracker_fields",
  "custom_tracker_entries",
  "dashboard_cards",
  "138 features",
  "14 coding chunks",
  "19A through 19N",
  "Feature-to-build-chunk map",
  "Dashboard controls. Carnos suggests. Documents store. Web/current-info finds current information. Memory retrieves approved context. User approves writes. System saves only after validation."
]) includes("roadmap", roadmap, marker);

for (const marker of [
  "Custom Tracker Dashboard at /custom-trackers",
  "Manual tracker creation",
  "Tracker template library",
  "Template-based tracker creation",
  "Custom tracker schema builder",
  "Custom tracker name, description, domain, frequency, privacy, active/inactive state",
  "Custom tracker field builder",
  "Allowed field type registry",
  "Field type validation",
  "Required/optional field rules",
  "Field ordering",
  "Field options JSON for select and multi-select fields",
  "Field validation rules",
  "Field units and normalization boundary",
  "Field privacy levels",
  "Field deprecation instead of unsafe hard deletion",
  "Tracker schema versioning",
  "Entry schema version tracking",
  "Tracker archive/delete boundary",
  "Custom tracker entry logging",
  "Entry date handling",
  "Entry notes",
  "values_json validation",
  "Unknown-field rejection or quarantine",
  "Required field validation for entries",
  "Select option validation",
  "Number, rating, date, and duration validation",
  "Duplicate entry detection",
  "Same-day duplicate warning",
  "Quick-log contract",
  "Quick-log button on /custom-trackers",
  "Quick-log readiness for dashboard cards",
  "Repeat-last-entry support boundary",
  "Favorite tracker and pinned tracker boundary",
  "Tracker frequency rules",
  "Daily, weekly, monthly, and custom frequency boundary",
  "Target count per period",
  "Streak enabled/disabled boundary",
  "Missed-entry policy",
  "Dashboard target selection",
  "Dashboard card placement contract",
  "Dashboard placement privacy rules",
  "Dashboard card priority, size, and visibility boundary",
  "Custom tracker card support on domain dashboards",
  "Custom tracker card support on Command dashboard where allowed",
  "Custom tracker card mini-summary",
  "Custom tracker card quick-log boundary",
  "Sensitive tracker dashboard exposure protection",
  "Cross-domain linkage",
  "Domain mapping for career, learning, research, health, body, finance, grimoire, creativity, life admin, and custom",
  "Timeline compatibility metadata",
  "Timeline visibility setting",
  "Timeline label template boundary",
  "Timeline spam prevention boundary",
  "Analytics compatibility metadata",
  "Aggregation type metadata",
  "Trendable and chartable field metadata",
  "Analytics preview boundary",
  "Insufficient-data analytics state",
  "No fake analytics",
  "Tracker quality/readiness score",
  "Tracker setup completeness checks",
  "Analytics-ready status",
  "Privacy-ready status",
  "Dashboard-placement-ready status",
  "Carnos access permissions",
  "Carnos read permission per tracker",
  "Carnos summary permission per tracker",
  "Carnos suggestion permission per tracker",
  "Carnos memory-candidate permission per tracker",
  "Carnos analytics permission per tracker",
  "Carnos-assisted tracker creation proposal",
  "Carnos-assisted tracker improvement proposal",
  "Carnos AI field-mapping proposal",
  "Carnos message-to-entry proposal",
  "Review-before-write queue for AI tracker proposals",
  "Review-before-write queue for AI entry proposals",
  "AI proposal states: draft, needs review, approved, rejected, expired",
  "No silent Carnos tracker creation",
  "No silent Carnos tracker entry logging",
  "No silent Carnos tracker edits",
  "No silent memory writes",
  "Document/source attachment boundary",
  "Saved document reference boundary",
  "Knowledge Vault compatibility boundary",
  "Memory/RAG compatibility boundary",
  "Current-info/web-source compatibility boundary",
  "Web source reference attachment boundary",
  "Evidence/source links on tracker entries",
  "Tracker entries can link to documents, notes, web sources, timeline records, or memory candidates",
  "Carnos can use web/current-info results only with source/freshness disclosure",
  "Carnos can map web/doc info into tracker proposals only after review",
  "Audit trail contract",
  "Audit events for tracker creation",
  "Audit events for field creation/change/deprecation",
  "Audit events for entry creation/edit/archive",
  "Audit events for dashboard placement changes",
  "Audit events for AI mapping proposal approval/rejection",
  "RLS/user ownership boundary",
  "Tracker ownership validation",
  "Field ownership validation through tracker ownership",
  "Entry ownership validation through tracker ownership",
  "Dashboard card ownership validation",
  "Tracker ID and field ID cross-user protection",
  "System tracker vs user tracker boundary",
  "Custom trackers cannot override core modules",
  "Custom tracker IDs cannot collide with system domains",
  "Naming collision handling",
  "Stable tracker key/slug",
  "Display name can change while internal key stays stable",
  "Empty state for no trackers",
  "Empty state with template suggestions",
  "Loading state",
  "Error state",
  "Privacy-restricted state",
  "Review-required state",
  "No hardcoded demo data as final state",
  "No fake tracker entries",
  "No fake dashboard cards",
  "No fake AI mappings",
  "No fake source attachments",
  "No fake analytics/streaks",
  "No unsafe direct action execution",
  "No uncontrolled JSON chaos",
  "No bypassing RLS/user ownership",
  "No unreviewed Carnos memory writes",
  "No unreviewed tracker writes",
  "No timeline spam",
  "No sensitive tracker leakage onto broad dashboards",
  "Acceptance checklist/audit for Phase 19",
  "Schema validation proof",
  "Entry validation proof",
  "Permission/RLS boundary proof",
  "Dashboard placement boundary proof",
  "Carnos review-before-write proof",
  "No-fake-data proof",
  "No-silent-AI-write proof",
  "Full npm check/build integration"
]) includes("roadmap feature list", roadmap, marker);

for (const marker of [
  "19A - Expanded scope lock plus no-loophole contract",
  "19B - Core tracker domain contracts",
  "19C - Field type registry plus field validation rules",
  "19D - Entry validation plus values_json safety",
  "19E - Schema versioning plus deprecation/archive boundaries",
  "19F - Templates plus frequency, streaks, and quality score",
  "19G - Privacy levels plus Carnos access permissions",
  "19H - Carnos proposals plus review-before-write queue",
  "19I - Dashboard placement plus cross-domain card rules",
  "19J - Timeline plus analytics compatibility boundaries",
  "19K - Document, web, source, and evidence attachment boundaries",
  "19L - Repository, RLS, audit, and ownership boundaries",
  "19M - Custom Tracker dashboard view model plus UI",
  "19N - Final fixtures, audits, reports, package check integration, and completion proof"
]) includes("roadmap chunk map", roadmap, marker);

for (const marker of [
  "Will code/build:",
  "Custom tracker domain model",
  "Allowed field type registry",
  "values_json validation",
  "Tracker schema versioning",
  "Tracker template library",
  "Carnos access permissions",
  "Carnos-assisted tracker creation proposal",
  "Dashboard card placement contract",
  "Timeline compatibility metadata",
  "Document/source attachment boundary",
  "RLS/user ownership boundary",
  "Custom Tracker Dashboard at /custom-trackers",
  "Final Phase 19 completion proof"
]) includes("roadmap feature-to-chunk map", roadmap, marker);

for (const marker of [
  "Feature-to-build-chunk map",
  "Every coding chunk must state exactly what features it will code/build",
  "No runtime tracker writes",
  "No database schema migration in 19A",
  "No UI implementation in 19A",
  "No fake tracker data",
  "No Carnos runtime behavior change",
  "No model calls",
  "No network calls",
  "No memory writes",
  "No action execution"
]) includes("contract", contract, marker);

for (const marker of [
  "Feature-to-build-chunk map exists",
  "Each coding chunk says exactly what features it will code/build",
  "All 138 features are listed",
  "All 14 chunks 19A through 19N are listed",
  "Carnos role is proposal/review only",
  "Document/web/source compatibility is included",
  "Timeline/analytics compatibility is included",
  "Privacy/RLS/audit boundaries are included",
  "No-fake-data boundary is included",
  "No-silent-AI-write boundary is included"
]) includes("checklist", checklist, marker);

for (const marker of [
  "feature-to-build-chunk map",
  "138 features are explicitly represented",
  "14 coding chunks are explicitly mapped",
  "Each coding chunk lists exactly what it will code/build",
  "No runtime behavior was added",
  "No schema was changed",
  "No fake data was added",
  "No Carnos write behavior was enabled"
]) includes("report", report, marker);

includes("package.json", pkgText, "audit:phase19a");
includes("package.json", pkgText, "scripts/audit-phase-19a.mjs");

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
  "executeApprovedAction"
]) excludes("Phase 19A roadmap", roadmap, marker);

console.log("\n✓ Phase 19A custom trackers scope lock audit passed.");
