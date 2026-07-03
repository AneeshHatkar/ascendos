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

console.log("\n=== PHASE 17Q FINAL MEMORY/RAG AUDIT ===");

const pkg = read("package.json");
const contract = read("docs/contracts/PHASE_17Q_FINAL_MEMORY_RAG_AUDIT.md");
const report = read("docs/phase-reports/PHASE_17Q_FINAL_MEMORY_RAG_COMPLETION_REPORT.md");
const checklist = read("docs/qa/PHASE_17Q_FINAL_MEMORY_RAG_SMOKE_CHECKLIST.md");
const fixture = read("docs/fixtures/phase17-memory-rag/phase17_memory_rag_fixture.json");
const phaseStatus = read("PHASE_STATUS.md");
const executionLog = read("PROJECT_EXECUTION_LOG.md");
const codeLedger = read("CODE_LEDGER.md");
const changelog = read("CHANGELOG.md");

const requiredAuditScripts = [
  "scripts/audit-phase-17a.mjs",
  "scripts/audit-phase-17b.mjs",
  "scripts/audit-phase-17c.mjs",
  "scripts/audit-phase-17d.mjs",
  "scripts/audit-phase-17e.mjs",
  "scripts/audit-phase-17f.mjs",
  "scripts/audit-phase-17g.mjs",
  "scripts/audit-phase-17h.mjs",
  "scripts/audit-phase-17i.mjs",
  "scripts/audit-phase-17j.mjs",
  "scripts/audit-phase-17k.mjs",
  "scripts/audit-phase-17l.mjs",
  "scripts/audit-phase-17m.mjs",
  "scripts/audit-phase-17n.mjs",
  "scripts/audit-phase-17o.mjs",
  "scripts/audit-phase-17p.mjs",
  "scripts/audit-phase-17q.mjs"
];

for (const script of requiredAuditScripts) {
  read(script);
}

for (const scriptName of [
  "\"audit:phase17a\"",
  "\"audit:phase17b\"",
  "\"audit:phase17c\"",
  "\"audit:phase17d\"",
  "\"audit:phase17e\"",
  "\"audit:phase17f\"",
  "\"audit:phase17g\"",
  "\"audit:phase17h\"",
  "\"audit:phase17i\"",
  "\"audit:phase17j\"",
  "\"audit:phase17k\"",
  "\"audit:phase17l\"",
  "\"audit:phase17m\"",
  "\"audit:phase17n\"",
  "\"audit:phase17o\"",
  "\"audit:phase17p\"",
  "\"audit:phase17q\""
]) includes("package.json", pkg, scriptName);

includes("package.json", pkg, "npm run audit:phase17p && npm run audit:phase17q");
includes("package.json", pkg, "npm run audit:phase17q && npm run build");

for (const marker of [
  "Phase 17Q — Final Phase 17 Audit + Fixtures + Completion Report",
  "Phase 17 Memory/RAG",
  "17A — Scope Lock",
  "17P — Privacy, Sensitive Lock, Forget/Delete Readiness",
  "17Q — Final Phase 17 Audit + Fixtures + Completion Report",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Carnos prompt/context injection",
  "No background scanning",
  "Real write-enabled forget/delete execution remains deferred"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 17Q Final Memory/RAG Completion Report",
  "Phase 17 Memory/RAG is complete",
  "memory inbox repository boundary",
  "approved memory repository boundary",
  "retrieval audit trail and explanation builder",
  "Memory/RAG preview UI",
  "Carnos Memory Integration Panel",
  "privacy, sensitive lock, and forget/delete readiness evaluator",
  "final fixtures",
  "final audit script",
  "runtime semantic retrieval",
  "write-enabled forget/delete execution",
  "npm run audit:phase17q",
  "npm run check"
]) includes("report", report, marker);

for (const marker of [
  "Phase 17Q Final Memory/RAG Smoke Checklist",
  "Phase 17A audit exists",
  "Phase 17Q final audit exists",
  "Final fixture exists",
  "No memory_retrieval_events writes occur in preview layers",
  "No runtime retrieval occurs",
  "No semantic retrieval is activated",
  "No Carnos prompt/context injection occurs",
  "No actual write-enabled forget/delete execution is added",
  "npm run audit:phase17q",
  "npm run check"
]) includes("checklist", checklist, marker);

const parsedFixture = JSON.parse(fixture);
if (parsedFixture.phase !== "17Q") fail("fixture phase is not 17Q");
pass("fixture phase is 17Q");
if (parsedFixture.fixture_name !== "phase17_memory_rag_final_fixture") fail("fixture name mismatch");
pass("fixture name is correct");
if (parsedFixture.preview_only !== true) fail("fixture preview_only must be true");
pass("fixture preview_only is true");
if (parsedFixture.runtime_side_effects_enabled !== false) fail("runtime side effects must be false");
pass("fixture runtime side effects disabled");
if (parsedFixture.runtime_retrieval_enabled !== false) fail("runtime retrieval must be false");
pass("fixture runtime retrieval disabled");
if (parsedFixture.semantic_retrieval_active !== false) fail("semantic retrieval must be false");
pass("fixture semantic retrieval disabled");
if (parsedFixture.provider_calls_enabled !== false) fail("provider calls must be false");
pass("fixture provider calls disabled");
if (parsedFixture.vector_search_enabled !== false) fail("vector search must be false");
pass("fixture vector search disabled");
if (parsedFixture.sql_runtime_enabled !== false) fail("SQL runtime must be false");
pass("fixture SQL runtime disabled");
if (parsedFixture.memory_retrieval_events_write_count !== 0) fail("memory retrieval event writes must be zero");
pass("fixture memory retrieval event writes are zero");
if (parsedFixture.carnos_prompt_injection_enabled !== false) fail("Carnos prompt injection must be false");
pass("fixture Carnos prompt injection disabled");
if (parsedFixture.mutation_execution_enabled !== false) fail("mutation execution must be false");
pass("fixture mutation execution disabled");
if (parsedFixture.retrieval_plan_expectations?.approved_only !== true) fail("fixture approved_only expectation missing");
pass("fixture approved_only expectation present");
if (parsedFixture.retrieval_plan_expectations?.sensitive_locked_blocked_by_default !== true) fail("fixture sensitive lock expectation missing");
pass("fixture sensitive lock expectation present");
if (parsedFixture.ui_expectations?.memory_rag_preview_panel !== true) fail("fixture Memory/RAG UI expectation missing");
pass("fixture Memory/RAG UI expectation present");
if (parsedFixture.ui_expectations?.carnos_memory_integration_panel !== true) fail("fixture Carnos integration UI expectation missing");
pass("fixture Carnos integration UI expectation present");
if (parsedFixture.final_boundary?.no_runtime_retrieval !== true) fail("fixture no-runtime boundary missing");
pass("fixture no-runtime boundary present");
if (parsedFixture.final_boundary?.no_embedding_generation !== true) fail("fixture no-embedding boundary missing");
pass("fixture no-embedding boundary present");
if (parsedFixture.final_boundary?.no_carnos_prompt_context_injection !== true) fail("fixture no Carnos injection boundary missing");
pass("fixture no Carnos injection boundary present");

for (const marker of [
  "Phase 17Q",
  "Final Phase 17 Audit",
  "Phase 17 Memory/RAG complete",
  "No memory_retrieval_events writes",
  "No runtime retrieval",
  "No Carnos prompt/context injection"
]) {
  includes("PHASE_STATUS.md", phaseStatus, marker);
  includes("PROJECT_EXECUTION_LOG.md", executionLog, marker);
}

includes("CODE_LEDGER.md", codeLedger, "Phase 17Q");
includes("CHANGELOG.md", changelog, "Phase 17Q");

console.log("\n✓ Phase 17Q final Memory/RAG audit passed.");
