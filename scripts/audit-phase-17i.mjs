import { readFileSync, existsSync } from "node:fs";

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}
function pass(message) {
  console.log(`✓ ${message}`);
}
function read(path) {
  if (!existsSync(path)) fail(`Missing ${path}`);
  pass(`Found ${path}`);
  return readFileSync(path, "utf8");
}
function includes(label, text, marker) {
  if (!text.includes(marker)) fail(`${label} missing marker: ${marker}`);
  pass(`${label} includes ${marker}`);
}
function excludes(label, text, marker) {
  if (text.includes(marker)) fail(`${label} includes forbidden marker: ${marker}`);
  pass(`${label} excludes forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 17I RETRIEVAL RANKING BUDGET DEDUPE AUDIT ===");

const impl = read("src/lib/carnos-continuity/memory-retrieval-ranking-budget-dedupe.ts");
const index = read("src/lib/carnos-continuity/index.ts");
const contract = read("docs/contracts/PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE.md");
const report = read("docs/phase-reports/PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_REPORT.md");
const checklist = read("docs/qa/PHASE_17I_RETRIEVAL_RANKING_BUDGET_DEDUPE_SMOKE_CHECKLIST.md");
const pkg = read("package.json");

for (const marker of [
  "Phase 17I — Retrieval Ranking + Budget + Dedupe Rules",
  "MemoryRetrievalCandidate",
  "MemoryRetrievalRankedCandidate",
  "MemoryRetrievalBudget",
  "MemoryRetrievalBudgetUsage",
  "MemoryRetrievalDedupeSummary",
  "MemoryRetrievalRankingBudgetDedupeResult",
  "planMemoryRetrievalRankingBudgetDedupe",
  "rankMemoryRetrievalCandidates",
  "buildMemoryRetrievalPlan",
  "summarizeMemoryRetrievalPlan",
  "getMemoryRetrievalRankingBudgetDedupeSummary",
  "approved-only retrieval planning",
  "budget-bounded retrieval planning",
  "deduped retrieval planning",
  "source authority scoring",
  "trust scoring integration",
  "keyword/domain scoring",
  "confidence/evidence/reliability scoring",
  "freshness/staleness handling",
  "sensitive memory exclusion by default",
  "conflict exclusion by default",
  "visible inclusion/exclusion reasons",
  "No runtime retrieval",
  "No memory_retrieval_events writes",
  "No embedding generation",
  "No semantic retrieval activation",
  "No provider calls",
  "No vector search",
  "No Supabase calls",
  "No SQL reads or writes",
  "No Carnos prompt/context injection",
  "No background scanning",
  "runtime_side_effects_enabled: false",
  "memory_retrieval_events_write_count: 0",
  "semantic_retrieval_active: false"
]) includes("implementation", impl, marker);

includes("index", index, 'export * from "./memory-retrieval-ranking-budget-dedupe";');

for (const marker of ["Phase 17I","approved-only retrieval planning","budget-bounded retrieval planning","deduped retrieval planning","No runtime retrieval","No memory_retrieval_events writes"]) includes("contract", contract, marker);
for (const marker of ["Retrieval Ranking Budget Dedupe Report","retrieval candidate scoring","retrieval budget enforcement","retrieval dedupe rules","npm run audit:phase17i","npm run check"]) includes("report", report, marker);
for (const marker of ["Retrieval Ranking Budget Dedupe Smoke Checklist","rankMemoryRetrievalCandidates ranks candidates deterministically","No runtime retrieval occurs","No memory_retrieval_events writes occur"]) includes("checklist", checklist, marker);

includes("package.json", pkg, '"audit:phase17i"');
includes("package.json", pkg, "npm run audit:phase17h && npm run audit:phase17i");

for (const marker of ["createSupabaseServerClient",".from(","insert(","update(","delete(","upsert(","fetch(","generateText","streamText","openai","OpenAI","vector(","embedding vector","navigator.mediaDevices","setInterval(","setTimeout(","speechSynthesis","createProposedAction","executeApprovedAction"]) excludes("implementation", impl, marker);

if (/semantic_retrieval_active:\s*true/.test(impl)) fail("semantic retrieval was activated");
pass("semantic retrieval remains disabled");
if (/runtime_side_effects_enabled:\s*true/.test(impl)) fail("runtime side effects were enabled");
pass("runtime side effects remain disabled");

console.log("\n✓ Phase 17I Retrieval Ranking Budget Dedupe audit passed.");
