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

console.log("\n=== PHASE 18A ANALYTICS/EXPERIMENTS SCOPE LOCK AUDIT ===");

const scope = read("docs/contracts/PHASE_18A_ANALYTICS_EXPERIMENTS_SCOPE_LOCK.md");
const featureMap = read("docs/roadmap/PHASE_18_ANALYTICS_EXPERIMENTS_FEATURE_MAP.md");
const chunks = read("docs/roadmap/PHASE_18_ANALYTICS_EXPERIMENTS_BUILD_CHUNKS.md");
const checklist = read("docs/qa/PHASE_18A_ANALYTICS_EXPERIMENTS_SCOPE_LOCK_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18A_ANALYTICS_EXPERIMENTS_SCOPE_LOCK_REPORT.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 18A — Analytics/Experiments Scope Lock + Expanded Feature Contract",
  "Analytics/Experiments",
  "Snapshots",
  "Charts",
  "Correlations",
  "Self-experiments",
  "Data quality",
  "Metric Registry",
  "Data Completeness Score",
  "Analytics Snapshot System",
  "Weekly/monthly snapshot comparison",
  "Self-Experiment Lab foundation",
  "Experiment templates",
  "Before/During/After experiment lifecycle",
  "Baseline tracking",
  "Confounder tracking",
  "Invalid experiment states",
  "Lessons learned system",
  "Insight Quality Levels",
  "Analytics Provenance",
  "Correlation-not-causation guardrails",
  "Analytics repository boundaries",
  "Experiment repository boundaries",
  "Trend engine",
  "Correlation engine",
  "Comparison engine",
  "Minimum data rules",
  "Chart type boundaries",
  "Analytics Dashboard",
  "Domain-specific analytics cards",
  "Insight Inbox",
  "Action-from-insight preview",
  "Self-Experiment Lab UI",
  "Carnos analytics explanation mode",
  "Analytics-to-memory boundary",
  "Privacy/sensitivity labels",
  "Anti-demo-data audit",
  "Manual correction readiness",
  "Time range consistency",
  "Analytics preferences / pinned metrics readiness",
  "Export-ready report boundary",
  "Final fixtures/audit/report",
  "No silent memory writes are allowed",
  "full export/delete implementation belongs to Phase 20",
  "jump into Phase 19 Custom Trackers",
  "jump into Phase 20 Privacy/Export full implementation",
  "jump into Phase 21 v1 Polish"
]) includes("scope", scope, marker);

for (const marker of [
  "Metric Registry",
  "18C",
  "Data Completeness Score",
  "18C",
  "Analytics Snapshot System",
  "18D",
  "Self-Experiment Lab foundation",
  "18E",
  "Insight Quality Levels",
  "18F",
  "Analytics repository boundaries",
  "18G",
  "Experiment repository boundaries",
  "18H",
  "Trend engine",
  "18I",
  "Experiment Evaluation",
  "18J",
  "Analytics Dashboard",
  "18K",
  "Self-Experiment Lab UI",
  "18L",
  "Carnos analytics explanation mode",
  "18M",
  "Anti-demo-data audit",
  "18N",
  "Final fixtures/audit/report",
  "18O",
  "Sleep Reset Experiment",
  "Deep Work Sprint",
  "Job Application Sprint",
  "Workout Consistency Experiment",
  "Lean Bulk Tracking Experiment",
  "Skin Routine Experiment",
  "Hair Routine Experiment",
  "No Weed/Vape Experiment",
  "Korean Study Consistency Experiment",
  "Guitar Practice Experiment",
  "Drawing Practice Experiment",
  "Dance Practice Experiment",
  "Research Reading Experiment",
  "Portfolio/GitHub Sprint",
  "Content Creation Sprint",
  "high_confidence",
  "medium_confidence",
  "low_confidence",
  "insufficient_data",
  "invalid",
  "normal",
  "private",
  "sensitive",
  "restricted"
]) includes("feature map", featureMap, marker);

for (const marker of [
  "18A — Scope Lock + Expanded Feature Contract",
  "18B — Schema Discovery + Metric Source Map",
  "18C — Metric Registry + Data Quality Contracts",
  "18D — Analytics Snapshot Contracts + Validators",
  "18E — Self-Experiment Contracts + Validators",
  "18F — Insight Quality + Provenance Contracts",
  "18G — Analytics Repository Boundaries",
  "18H — Experiment Repository Boundaries",
  "18I — Trend / Correlation / Comparison Engine",
  "18J — Experiment Evaluation Engine",
  "18K — Analytics Dashboard UI",
  "18L — Self-Experiment Lab UI",
  "18M — Carnos Analytics Explanation Boundary",
  "18N — Anti-Demo-Data + Privacy/Sensitivity Audit",
  "18O — Final Phase 18 Fixtures + Completion Report",
  "no correlation with fewer than 7 matched data points",
  "no weekly trend with fewer than 4 logged days",
  "no before-after result without baseline",
  "no high confidence if confounders exist",
  "no month-over-month claim if current month is incomplete unless marked partial",
  "/analytics",
  "/experiments",
  "Career Analytics",
  "Learning Analytics",
  "Health/Body Analytics",
  "Research Analytics",
  "Life Admin Analytics",
  "Grimoire/Creativity Analytics",
  "Goals/Proof Analytics",
  "Memory/RAG Analytics boundary card"
]) includes("build chunks", chunks, marker);

for (const marker of [
  "Phase 18A Scope Lock Smoke Checklist",
  "Metric Registry is included",
  "Data Completeness Score is included",
  "Analytics Snapshot System is included",
  "Weekly/monthly comparison is included",
  "Self-Experiment Lab is included",
  "Experiment templates are included",
  "Before/During/After experiment lifecycle is included",
  "Baseline tracking is included",
  "Confounder tracking is included",
  "Invalid experiment states are included",
  "Lessons learned system is included",
  "Insight Quality Levels are included",
  "Analytics Provenance is included",
  "Correlation-not-causation guardrails are included",
  "Analytics repository boundaries are included",
  "Experiment repository boundaries are included",
  "Trend/correlation/comparison engines are included",
  "Minimum data rules are included",
  "Chart type boundaries are included",
  "Analytics Dashboard is included",
  "Domain-specific analytics cards are included",
  "Insight Inbox is included",
  "Action-from-insight preview is included",
  "Self-Experiment Lab UI is included",
  "Carnos analytics explanation mode is included",
  "Analytics-to-memory boundary is included",
  "Privacy/sensitivity labels are included",
  "Anti-demo-data audit is included",
  "Manual correction readiness is included",
  "Time range consistency is included",
  "Analytics preferences / pinned metrics readiness is included",
  "Export-ready report boundary is included",
  "Final fixtures/audit/report are included",
  "No-demo-data rule is included",
  "No-fake-insight rule is included",
  "No-false-causation rule is included",
  "No-silent-AI-write rule is included",
  "No-hidden-memory-use rule is included",
  "No Phase 19/20/21 leakage rule is included",
  "npm run audit:phase18a",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18A Scope Lock Report",
  "Phase 18A locks the expanded Analytics/Experiments implementation plan",
  "Metric Registry",
  "Data Completeness Score",
  "Analytics Snapshot System",
  "Self-Experiment Lab UI",
  "Carnos analytics explanation mode",
  "Anti-demo-data audit",
  "npm run audit:phase18a",
  "npm run check"
]) includes("report", report, marker);

includes("package.json", pkg, "\"audit:phase18a\"");
includes("package.json", pkg, "npm run audit:phase17q && npm run audit:phase18a");
includes("package.json", pkg, "npm run audit:phase18a && npm run build");

console.log("\n✓ Phase 18A Analytics/Experiments scope lock audit passed.");
