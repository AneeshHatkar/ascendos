#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import childProcess from "node:child_process";
import process from "node:process";

const ROOT = process.cwd();

const OUT_MD = "docs/phase-reports/PHASE_20Z_TABLE_CLOSURE_V4B.md";
const OUT_JSON = "docs/fixtures/full-project-connectivity/phase_0_20_table_closure_v4b.json";

const TABLES_TO_CLOSE = [
  "audit_logs",
  "carnos_context_snapshots",
  "carnos_entity_state",
  "daily_logs",
  "events",
  "memory_candidates",
  "memory_events",
  "memory_items",
  "memory_review_queue",
  "project_memory_state",
  "quiz_attempts",
  "quizzes",
  "recommendation_targets",
  "skill_paths",
  "skill_prerequisites",
  "skill_progress",
  "skills",
  "sop_versions",
  "system_memory_state",
];

const EXPECTED_ASSIGNMENTS = {
  audit_logs: {
    domain: "Command / audit / privacy",
    expectedRepos: ["src/lib/repositories/core-read.ts", "src/lib/repositories/settings-privacy-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  carnos_context_snapshots: {
    domain: "Carnos / memory / analytics",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/carnos-persona-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  carnos_entity_state: {
    domain: "Carnos / memory",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/carnos-persona-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  daily_logs: {
    domain: "Command / goals / health / grimoire",
    expectedRepos: ["src/lib/repositories/core-read.ts", "src/lib/repositories/health-body-read.ts", "src/lib/repositories/grimoire-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  events: {
    domain: "Analytics / command timeline",
    expectedRepos: ["src/lib/repositories/core-read.ts", "src/lib/repositories/current-info-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  memory_candidates: {
    domain: "Memory inbox / Carnos review queue",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/memory-inbox-write.ts"],
    acceptableIfNoDirectRead: false,
  },
  memory_events: {
    domain: "Memory audit / analytics",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/approved-memory-write.ts"],
    acceptableIfNoDirectRead: false,
  },
  memory_items: {
    domain: "Memory / knowledge / Carnos",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/approved-memory-write.ts"],
    acceptableIfNoDirectRead: false,
  },
  memory_review_queue: {
    domain: "Memory review / current-info save queue",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/current-info-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  project_memory_state: {
    domain: "Projects / memory state",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  quiz_attempts: {
    domain: "Learning",
    expectedRepos: ["src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  quizzes: {
    domain: "Learning",
    expectedRepos: ["src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  recommendation_targets: {
    domain: "Learning / career / Carnos recommendations",
    expectedRepos: ["src/lib/repositories/core-read.ts", "src/lib/repositories/research-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  skill_paths: {
    domain: "Grimoire / skills",
    expectedRepos: ["src/lib/repositories/grimoire-read.ts", "src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  skill_prerequisites: {
    domain: "Grimoire / skills",
    expectedRepos: ["src/lib/repositories/grimoire-read.ts", "src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  skill_progress: {
    domain: "Grimoire / skills",
    expectedRepos: ["src/lib/repositories/grimoire-read.ts", "src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  skills: {
    domain: "Grimoire / skills",
    expectedRepos: ["src/lib/repositories/grimoire-read.ts", "src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  sop_versions: {
    domain: "Learning / projects / operating system",
    expectedRepos: ["src/lib/repositories/core-read.ts"],
    acceptableIfNoDirectRead: false,
  },
  system_memory_state: {
    domain: "System memory / Carnos state",
    expectedRepos: ["src/lib/repositories/memory-knowledge-read.ts", "src/lib/repositories/carnos-persona-read.ts"],
    acceptableIfNoDirectRead: false,
  },
};

function abs(file) {
  return path.join(ROOT, file);
}

function exists(file) {
  return fs.existsSync(abs(file));
}

function read(file) {
  try {
    return fs.readFileSync(abs(file), "utf8");
  } catch {
    return "";
  }
}

function run(command) {
  try {
    return {
      ok: true,
      output: childProcess.execSync(command, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 1024 * 1024 * 80,
      }),
    };
  } catch (error) {
    return {
      ok: false,
      output: `${error.stdout || ""}${error.stderr || ""}`,
    };
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replaceAll(path.sep, "/");
    if (rel.includes("node_modules/") || rel.includes(".next/") || rel.includes(".git/")) continue;
    if (entry.isDirectory()) walk(full, out);
    else out.push(rel);
  }
  return out;
}

function exactRepoReadSignal(file, table) {
  const text = read(file);
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const patterns = [
    new RegExp(`\\.from\\s*\\(\\s*["'\`]${escaped}["'\`]\\s*\\)`, "m"),
    new RegExp(`\\.rpc\\s*\\(\\s*["'\`]${escaped}["'\`]`, "m"),
  ];

  return patterns.some((p) => p.test(text));
}

function textReferenceSignal(file, table) {
  const text = read(file);
  return text.includes(table);
}

function migrationCreateSignal(table) {
  const sql = walk(path.join(ROOT, "supabase/migrations"))
    .filter((file) => file.endsWith(".sql"))
    .map(read)
    .join("\n\n");

  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`create\\s+table\\s+(?:if\\s+not\\s+exists\\s+)?(?:"?public"?\\.)?"?${escaped}"?`, "i");
  return re.test(sql);
}

function rlsSignal(table) {
  const sql = walk(path.join(ROOT, "supabase/migrations"))
    .filter((file) => file.endsWith(".sql"))
    .map(read)
    .join("\n\n");

  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`alter\\s+table\\s+(?:if\\s+exists\\s+)?(?:"?public"?\\.)?"?${escaped}"?\\s+enable\\s+row\\s+level\\s+security`, "i");
  return re.test(sql);
}

const allFiles = walk(ROOT);
const repoFiles = allFiles.filter((file) => file.startsWith("src/lib/repositories/") && /\.(ts|tsx)$/.test(file));
const sourceFiles = allFiles.filter((file) => file.startsWith("src/") && /\.(ts|tsx|js|jsx)$/.test(file));

const rows = TABLES_TO_CLOSE.map((table) => {
  const assignment = EXPECTED_ASSIGNMENTS[table];

  const exactReads = repoFiles.filter((file) => exactRepoReadSignal(file, table));
  const textReferences = repoFiles.filter((file) => textReferenceSignal(file, table));

  const expectedRepoEvidence = assignment.expectedRepos.map((file) => ({
    file,
    exists: exists(file),
    exactRead: exists(file) && exactRepoReadSignal(file, table),
    textReference: exists(file) && textReferenceSignal(file, table),
  }));

  const migration = migrationCreateSignal(table);
  const rls = rlsSignal(table);

  let status = "CLOSED";
  const blockers = [];
  const review = [];

  if (!migration) blockers.push("No migration create-table evidence.");
  if (!rls) blockers.push("No RLS evidence.");

  if (!exactReads.length && !assignment.acceptableIfNoDirectRead) {
    blockers.push("No exact repository `.from()` / `.rpc()` read evidence.");
  }

  if (!expectedRepoEvidence.some((repo) => repo.exactRead) && exactReads.length) {
    review.push("Exact read exists, but not in the expected domain repository. Review placement.");
  }

  if (!exactReads.length && textReferences.length) {
    review.push("Repository text reference exists but not exact read. This may be write-only or contract-only, not read-connected.");
  }

  if (blockers.length) status = "OPEN";
  else if (review.length) status = "REVIEW";

  return {
    table,
    domain: assignment.domain,
    status,
    migration,
    rls,
    exactReads,
    textReferences,
    expectedRepoEvidence,
    acceptableIfNoDirectRead: assignment.acceptableIfNoDirectRead,
    blockers,
    review,
  };
});

const openRows = rows.filter((row) => row.status === "OPEN");
const reviewRows = rows.filter((row) => row.status === "REVIEW");

const npmCheck = run("npm run check");
const diffCheck = run("git diff --check");

const hardBlockers = [];
if (openRows.length) hardBlockers.push(`Open table closures: ${openRows.length}`);
if (!npmCheck.ok) hardBlockers.push("npm run check failed");
if (!diffCheck.ok) hardBlockers.push("git diff --check failed");

const status = hardBlockers.length ? "BLOCKED" : reviewRows.length ? "PASS_WITH_REVIEW_NOTES" : "PASS";

function mdTable(headers, data) {
  const esc = (v) => String(v ?? "").replaceAll("|", "\\|").replace(/\n/g, "<br>");
  return [
    `| ${headers.map(esc).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...data.map((row) => `| ${row.map(esc).join(" | ")} |`),
  ].join("\n");
}

const result = {
  status,
  generatedAt: new Date().toISOString(),
  hardBlockers,
  counts: {
    totalTablesChecked: rows.length,
    closed: rows.filter((r) => r.status === "CLOSED").length,
    review: reviewRows.length,
    open: openRows.length,
  },
  rows,
  npmCheck: {
    ok: npmCheck.ok,
    tail: npmCheck.output.slice(-12000),
  },
  diffCheck: {
    ok: diffCheck.ok,
    output: diffCheck.output,
  },
  git: {
    head: run("git log --oneline -1").output.trim(),
    status: run("git status --short").output.trim(),
  },
};

const md = [
  "# Phase 20Z Table Closure v4B",
  "",
  `Status: **${status}**`,
  "",
  `Generated: ${result.generatedAt}`,
  "",
  "This report resolves the 19 unaccounted created tables from the V4 exact-chain verifier. It checks migration evidence, RLS evidence, exact repository `.from()`/`.rpc()` reads, expected domain repository placement, npm verification, and diff whitespace safety.",
  "",
  "## 1. Hard Blockers",
  "",
  hardBlockers.length ? hardBlockers.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 2. Counts",
  "",
  "```json",
  JSON.stringify(result.counts, null, 2),
  "```",
  "",
  "## 3. Table Closure Matrix",
  "",
  mdTable(
    ["Table", "Domain", "Status", "Migration", "RLS", "Exact read repos", "Text reference repos", "Blockers", "Review"],
    rows.map((row) => [
      row.table,
      row.domain,
      row.status,
      row.migration ? "yes" : "no",
      row.rls ? "yes" : "no",
      row.exactReads.join("<br>") || "",
      row.textReferences.join("<br>") || "",
      row.blockers.join("<br>"),
      row.review.join("<br>"),
    ]),
  ),
  "",
  "## 4. Open Tables",
  "",
  openRows.length
    ? mdTable(
        ["Table", "Expected repos", "Blockers"],
        openRows.map((row) => [
          row.table,
          row.expectedRepoEvidence.map((repo) => `${repo.file}: exists=${repo.exists ? "yes" : "no"}, exactRead=${repo.exactRead ? "yes" : "no"}, textRef=${repo.textReference ? "yes" : "no"}`).join("<br>"),
          row.blockers.join("<br>"),
        ]),
      )
    : "- None",
  "",
  "## 5. Review Tables",
  "",
  reviewRows.length
    ? mdTable(
        ["Table", "Review"],
        reviewRows.map((row) => [row.table, row.review.join("<br>")]),
      )
    : "- None",
  "",
  "## 6. npm run check",
  "",
  `Status: **${npmCheck.ok ? "PASS" : "FAIL"}**`,
  "",
  "```text",
  npmCheck.output.slice(-12000),
  "```",
  "",
  "## 7. git diff --check",
  "",
  `Status: **${diffCheck.ok ? "PASS" : "FAIL"}**`,
  "",
  "```text",
  diffCheck.output || "",
  "```",
  "",
  "## 8. Git State",
  "",
  "```text",
  `HEAD: ${result.git.head}`,
  "",
  result.git.status || "clean",
  "```",
  "",
].join("\n");

fs.writeFileSync(OUT_JSON, JSON.stringify(result, null, 2));
fs.writeFileSync(OUT_MD, md);

console.log("");
console.log("=== PHASE 20Z TABLE CLOSURE V4B ===");
console.log(`Status: ${status}`);
console.log(`Report: ${OUT_MD}`);
console.log(`JSON:   ${OUT_JSON}`);
console.log("");
console.log("Hard blockers:");
console.log(hardBlockers.length ? hardBlockers.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Counts:");
console.log(JSON.stringify(result.counts, null, 2));
console.log("");
console.log("OPEN TABLES:");
console.log(openRows.length ? openRows.map((row) => `- ${row.table}: ${row.blockers.join("; ")}`).join("\n") : "- None");
console.log("");
console.log("REVIEW TABLES:");
console.log(reviewRows.length ? reviewRows.map((row) => `- ${row.table}: ${row.review.join("; ")}`).join("\n") : "- None");
console.log("");
console.log("npm run check:", npmCheck.ok ? "PASS" : "FAIL");
console.log("git diff --check:", diffCheck.ok ? "PASS" : "FAIL");
console.log("");
console.log("Do not commit yet.");
