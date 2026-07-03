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

console.log("=== PHASE 19K EVIDENCE ATTACHMENT BOUNDARIES AUDIT ===");

const implementation = read("src/lib/custom-trackers/evidence-attachment-boundaries.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARIES.md");
const checklist = read("docs/qa/PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARIES_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARIES_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19k_evidence_attachment_boundaries_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19K") fail("fixture phase is not 19K");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19K complete");

for (const marker of [
  "CustomTrackerEvidenceAttachmentKind",
  "CustomTrackerSourceFreshnessStatus",
  "CustomTrackerEvidenceReviewStatus",
  "CustomTrackerEvidenceTrustLevel",
  "CustomTrackerCarnosEvidenceMappingStatus",
  "CustomTrackerAttachmentPrivacyDecision",
  "CustomTrackerEvidenceSourceReference",
  "CustomTrackerSavedDocumentReferenceBoundary",
  "CustomTrackerWebSourceReferenceBoundary",
  "CustomTrackerEvidenceAttachmentInput",
  "CustomTrackerEvidenceAttachmentResult",
  "CustomTrackerEvidenceLink",
  "CustomTrackerCarnosEvidenceMappingInput",
  "CustomTrackerCarnosEvidenceMappingDecision",
  "CustomTrackerEvidenceAttachmentReadinessInput",
  "CustomTrackerEvidenceAttachmentReadinessResult",
  "CustomTrackerEvidenceAttachmentSummary",
  "PHASE_19K_EVIDENCE_ATTACHMENT_BOUNDARY",
  "CUSTOM_TRACKER_EVIDENCE_ATTACHMENT_KINDS",
  "CUSTOM_TRACKER_SOURCE_FRESHNESS_STATUSES",
  "CUSTOM_TRACKER_EVIDENCE_REVIEW_STATUSES",
  "isSupportedCustomTrackerEvidenceAttachmentKind",
  "normalizeCustomTrackerEvidenceLabel",
  "requiresCustomTrackerFreshnessDisclosure",
  "evaluateCustomTrackerSourceFreshness",
  "evaluateCustomTrackerEvidenceTrustLevel",
  "buildCustomTrackerEvidenceSourceReference",
  "validateCustomTrackerEvidenceAttachment",
  "buildCustomTrackerSavedDocumentReferenceBoundary",
  "buildCustomTrackerWebSourceReferenceBoundary",
  "buildCustomTrackerEvidenceLink",
  "evaluateCustomTrackerCarnosEvidenceMapping",
  "validateCustomTrackerEvidenceAttachmentReadiness",
  "assertNoRuntimeCustomTrackerEvidenceWrites",
  "summarizeCustomTrackerEvidenceAttachmentBoundary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "documentSourceAttachmentBoundaryEnabled: true",
  "savedDocumentReferenceBoundaryEnabled: true",
  "knowledgeVaultCompatibilityEnabled: true",
  "memoryRagCompatibilityEnabled: true",
  "currentInfoWebSourceCompatibilityEnabled: true",
  "webSourceReferenceAttachmentBoundaryEnabled: true",
  "trackerEntryEvidenceLinksEnabled: true",
  "carnosFreshnessDisclosureRequired: true",
  "carnosMappingRequiresReview: true",
  "runtimeFileIngestionEnabled: false",
  "runtimeNetworkCallsEnabled: false",
  "runtimeDatabaseReadsEnabled: false",
  "runtimeDatabaseWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "fakeEvidenceAllowed: false",
  "silentCarnosMappingAllowed: false",
  "source freshness disclosure is required",
  "web source reference attachment requires source uri",
  "evidence attachment requires review before persistence",
  "web source freshness disclosure is stale",
  "Carnos web/current-info mapping requires source and freshness disclosure",
  "Carnos mapping for non-standard tracker requires privacy review",
  "memory candidate mapping requires explicit review"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./evidence-attachment-boundaries\"");

for (const marker of [
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
  "Source freshness status",
  "Attachment trust and review status",
  "No fake evidence boundary",
  "No SQL schema migration is added in 19K",
  "No runtime database read or write is added in 19K",
  "No runtime file ingestion is added in 19K",
  "No runtime web/network call is added in 19K"
]) includes("contract", contract, marker);

for (const marker of [
  "Document/source attachment boundary exists",
  "Saved document reference boundary exists",
  "Knowledge Vault compatibility boundary exists",
  "Memory/RAG compatibility boundary exists",
  "Current-info/web-source compatibility boundary exists",
  "Web source reference attachment boundary exists",
  "Evidence/source links on tracker entries exist",
  "Tracker entry links to documents, notes, web sources, timeline records, or memory candidates exist",
  "Carnos source/freshness disclosure boundary exists",
  "Carnos mapping to tracker proposals requires review",
  "Source freshness status exists",
  "Attachment trust/review status exists",
  "No fake evidence boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "No runtime file ingestion is added",
  "No runtime web/network call is added",
  "npm run audit:phase19k",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19K adds deterministic local boundaries",
  "Tracker and entry evidence links can represent documents, notes, web sources, timeline records, memory candidates, and external references",
  "Saved document references are compatible with Knowledge Vault and Memory/RAG as boundaries only",
  "Web source references carry freshness status and require source/freshness disclosure",
  "Carnos web/current-info mapping requires source disclosure and review before any tracker proposal can proceed",
  "Evidence readiness reports approved, review-required, and blocked attachments",
  "Fake evidence, fake source attachments, runtime file ingestion, runtime network calls, and runtime database writes remain disabled",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "document_source_attachment_boundary",
  "saved_document_reference_boundary",
  "knowledge_vault_compatibility_boundary",
  "memory_rag_compatibility_boundary",
  "current_info_web_source_compatibility_boundary",
  "web_source_reference_attachment_boundary",
  "evidence_source_links_on_tracker_entries",
  "tracker_entries_link_to_documents_notes_web_sources_timeline_records_memory_candidates",
  "carnos_source_freshness_disclosure_boundary",
  "carnos_mapping_to_tracker_proposals_requires_review",
  "source_freshness_status",
  "attachment_trust_review_status",
  "no_fake_evidence_boundary"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19k");
includes("package.json", pkgText, "scripts/audit-phase-19k.mjs");

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

console.log("✓ Phase 19K evidence attachment boundaries audit passed.");
