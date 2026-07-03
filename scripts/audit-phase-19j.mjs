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

console.log("=== PHASE 19J TIMELINE ANALYTICS COMPATIBILITY AUDIT ===");

const implementation = read("src/lib/custom-trackers/timeline-analytics-compatibility.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19J_TIMELINE_ANALYTICS_COMPATIBILITY.md");
const checklist = read("docs/qa/PHASE_19J_TIMELINE_ANALYTICS_COMPATIBILITY_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19J_TIMELINE_ANALYTICS_COMPATIBILITY_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19j_timeline_analytics_compatibility_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19J") fail("fixture phase is not 19J");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19J complete");

for (const marker of [
  "CustomTrackerTimelineVisibility",
  "CustomTrackerTimelineEventDensity",
  "CustomTrackerTimelineSpamDecisionStatus",
  "CustomTrackerTimelineLabelToken",
  "CustomTrackerAnalyticsAggregationType",
  "CustomTrackerAnalyticsPreviewStatus",
  "CustomTrackerAnalyticsTrendDirection",
  "CustomTrackerTimelineMetadata",
  "CustomTrackerTimelineSpamPolicyInput",
  "CustomTrackerTimelineSpamDecision",
  "CustomTrackerAnalyticsFieldMetadata",
  "CustomTrackerAnalyticsCompatibilityInput",
  "CustomTrackerAnalyticsPreviewBoundary",
  "CustomTrackerTimelineReadinessResult",
  "CustomTrackerAnalyticsReadinessResult",
  "CustomTrackerTimelineAnalyticsSummary",
  "PHASE_19J_TIMELINE_ANALYTICS_BOUNDARY",
  "CUSTOM_TRACKER_TIMELINE_VISIBILITIES",
  "CUSTOM_TRACKER_TIMELINE_LABEL_TOKENS",
  "CUSTOM_TRACKER_ANALYTICS_AGGREGATION_TYPES",
  "CUSTOM_TRACKER_ANALYTICS_MINIMUM_ENTRIES",
  "normalizeCustomTrackerTimelineLabelTemplate",
  "extractCustomTrackerTimelineLabelTokens",
  "validateCustomTrackerTimelineLabelTemplate",
  "buildCustomTrackerTimelineMetadata",
  "resolveCustomTrackerTimelineVisibility",
  "estimateCustomTrackerTimelineEventDensity",
  "evaluateCustomTrackerTimelineSpamPolicy",
  "getDefaultCustomTrackerAggregationType",
  "buildCustomTrackerAnalyticsFieldMetadata",
  "evaluateCustomTrackerAnalyticsCompatibility",
  "getCustomTrackerAnalyticsPreviewStatus",
  "buildCustomTrackerAnalyticsPreviewBoundary",
  "validateCustomTrackerTimelineReadiness",
  "summarizeCustomTrackerTimelineAnalyticsBoundary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "timelineCompatibilityEnabled: true",
  "timelineVisibilityEnabled: true",
  "timelineLabelTemplateBoundaryEnabled: true",
  "timelineSpamPreventionEnabled: true",
  "analyticsCompatibilityEnabled: true",
  "aggregationMetadataEnabled: true",
  "trendableChartableFieldMetadataEnabled: true",
  "analyticsPreviewBoundaryEnabled: true",
  "insufficientDataStateEnabled: true",
  "fakeAnalyticsAllowed: false",
  "fakeStreaksAllowed: false",
  "timelineWritesEnabled: false",
  "runtimeAnalyticsReadsEnabled: false",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "uiRouteChanged: false",
  "timeline spam prevention blocked high-volume tracker",
  "timeline visibility requires review for non-standard tracker",
  "insufficient data for analytics preview",
  "analytics preview metadata is ready without calculating fake values",
  "privacy_restricted",
  "insufficient_data",
  "not_chartable"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./timeline-analytics-compatibility\"");

for (const marker of [
  "Timeline compatibility metadata",
  "Timeline visibility setting",
  "Timeline label template boundary",
  "Timeline spam prevention boundary",
  "Analytics compatibility metadata",
  "Aggregation type metadata",
  "Trendable/chartable field metadata",
  "Analytics preview boundary",
  "Insufficient-data analytics state",
  "No fake analytics/streaks boundary",
  "Tracker analytics readiness result",
  "Timeline readiness result",
  "No SQL schema migration is added in 19J",
  "No runtime database read or write is added in 19J",
  "No timeline write is added in 19J",
  "No analytics runtime read is added in 19J"
]) includes("contract", contract, marker);

for (const marker of [
  "Timeline compatibility metadata exists",
  "Timeline visibility setting exists",
  "Timeline label template boundary exists",
  "Timeline spam prevention boundary exists",
  "Analytics compatibility metadata exists",
  "Aggregation type metadata exists",
  "Trendable/chartable field metadata exists",
  "Analytics preview boundary exists",
  "Insufficient-data analytics state exists",
  "No fake analytics/streaks boundary exists",
  "Tracker analytics readiness result exists",
  "Timeline readiness result exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "No timeline write is added",
  "No analytics runtime read is added",
  "npm run audit:phase19j",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19J adds deterministic local compatibility boundaries",
  "Timeline metadata can describe visibility, labels, and event density without writing timeline records",
  "Timeline label templates are normalized and checked for supported tokens",
  "Timeline spam prevention blocks or review-gates noisy tracker timelines",
  "Analytics metadata can mark fields as aggregatable, trendable, or chartable",
  "Analytics previews expose ready, insufficient-data, not-chartable, privacy-restricted, and disabled states",
  "Analytics preview contracts explicitly disable fake analytics and fake streaks",
  "Analytics preview contracts explicitly disable runtime analytics reads",
  "No SQL migration was added",
  "No runtime database call was added",
  "No UI behavior was changed"
]) includes("report", report, marker);

for (const marker of [
  "timeline_compatibility_metadata",
  "timeline_visibility_setting",
  "timeline_label_template_boundary",
  "timeline_spam_prevention_boundary",
  "analytics_compatibility_metadata",
  "aggregation_type_metadata",
  "trendable_chartable_field_metadata",
  "analytics_preview_boundary",
  "insufficient_data_analytics_state",
  "no_fake_analytics_streaks_boundary",
  "tracker_analytics_readiness_result",
  "timeline_readiness_result"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19j");
includes("package.json", pkgText, "scripts/audit-phase-19j.mjs");

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
]) {
  excludes("implementation", implementation, marker);
}

console.log("✓ Phase 19J timeline analytics compatibility audit passed.");
