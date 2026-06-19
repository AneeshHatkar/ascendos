import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function fail(message) {
  console.error(`Python/ML boundary audit failed: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`✓ ${message}`);
}

function readFile(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing required file: ${relativePath}`);
  }
  ok(`Found ${relativePath}`);
  return fs.readFileSync(fullPath, "utf8");
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function requireText(content, phrase, label) {
  if (!normalize(content).includes(normalize(phrase))) {
    fail(`${label} missing required phrase: ${phrase}`);
  }
}

function forbidPath(relativePath, message) {
  if (fs.existsSync(path.join(root, relativePath))) {
    fail(message);
  }
}

console.log("=== Python/ML boundary audit ===");

const jsonText = readFile("docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json");
const sourceTruth = JSON.parse(jsonText);

if (!sourceTruth.python_ml_intelligence_worker) {
  fail("JSON source of truth missing python_ml_intelligence_worker");
}

const worker = JSON.stringify(sourceTruth.python_ml_intelligence_worker);

for (const phrase of [
  "Python/ML Intelligence Worker",
  "Daily Priority Engine",
  "Goal Risk Predictor",
  "Proof-of-Work Scorer",
  "Career Readiness Engine",
  "Learning Optimizer",
  "Semantic Memory Retrieval",
  "Carnos Context Pack Builder",
  "Persona Router",
  "Life Trajectory Simulator",
  "Burnout / Drift Detector",
  "Health/Energy Pattern Detector",
  "Project Momentum Analyzer",
  "Resume/JD Fit Optimizer",
  "Networking and Referral Prioritizer",
  "Interview Weakness Detector",
  "Research/PhD Readiness Engine",
  "Decision Quality Analyzer",
  "Custom Tracker Intelligence",
  "ML Explainability Contract",
  "ML Output Audit Log",
  "Feedback Loop",
  "Cold-Start Mode",
  "Privacy Controls",
  "Versioned ML Output Schemas",
  "Human Override",
  "Evaluation Tests",
  "No Fake Metrics Rule",
  "Direct SQL Write Blocker",
  "Data Freshness Check",
  "Score Definitions",
  "Python/ML must never directly mutate SQL.",
  "Python/ML must never bypass Save/Edit/Cancel confirmation.",
  "Python/ML must never silently create memory."
]) {
  requireText(worker, phrase, "JSON python_ml_intelligence_worker");
}

const archDoc = readFile("docs/architecture/PYTHON_ML_INTELLIGENCE_WORKER.md");

for (const phrase of [
  "Python/ML must never directly mutate SQL",
  "proposal -> validation -> Save/Edit/Cancel -> server write -> audit log -> timeline event -> dashboard refresh",
  "Health output stays pattern analysis only",
  "Finance output stays budgeting and pattern analysis only",
  "No fake ML accuracy",
  "The current Next.js build must not depend on Python"
]) {
  requireText(archDoc, phrase, "Python/ML architecture doc");
}

const phasePlan = readFile("docs/phase-plans/PHASE_5_15_PYTHON_ML_INTELLIGENCE_ARCHITECTURE_PATCH.md");

for (const phrase of [
  "Runtime impact: none",
  "No active Python service",
  "No database writes from Python",
  "No npm build dependency on Python",
  "proceed to Phase 6"
]) {
  requireText(phasePlan, phrase, "Phase 5.15 plan");
}

forbidPath("apps/worker-python", "apps/worker-python must not exist yet; Phase 5.15 is architecture-only.");
forbidPath("src/lib/repositories/core-write.ts", "core-write repository must not exist before Phase 6 safe-write work.");
forbidPath("src/lib/memory", "memory implementation must not exist before the memory phase.");

console.log("");
console.log("Python/ML boundary audit passed.");
