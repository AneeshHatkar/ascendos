import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function read(path) {
  return readFileSync(join(ROOT, path), "utf8");
}

const requiredFiles = [
  "docs/qa/PHASE_21N_FINAL_BROWSER_SMOKE_CHECKLIST.md",
  "docs/phase-reports/PHASE_21N_FINAL_SMOKE_AND_AUDIT_REPORT.md",
  "scripts/audit-phase-21n.mjs",
  "package.json",
  "src/lib/routes.ts",
  "src/lib/dashboard-registry.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(ROOT, file))) {
    fail(`Missing required Phase 21N file: ${file}`);
  } else {
    pass(`Found ${file}`);
  }
}

const checklist = read("docs/qa/PHASE_21N_FINAL_BROWSER_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_21N_FINAL_SMOKE_AND_AUDIT_REPORT.md");
const routes = read("src/lib/routes.ts");
const registry = read("src/lib/dashboard-registry.ts");
const packageJson = JSON.parse(read("package.json"));

for (const marker of [
  "Status: Pending manual browser execution.",
  "Authentication",
  "Global shell and navigation",
  "Athena and safe actions",
  "Voice and current information",
  "Global Athena drawer",
  "Domain dashboards",
  "Privacy, connector, export, backup",
  "Offline and local cache",
  "Mobile viewport matrix",
  "Browser developer-tools audit",
  "Completion rule",
]) {
  if (!checklist.includes(marker)) {
    fail(`Browser checklist missing marker: ${marker}`);
  } else {
    pass(`Browser checklist includes: ${marker}`);
  }
}

for (const marker of [
  "Status: Pending manual browser smoke execution.",
  "Automated verification is necessary but not sufficient",
  "No browser PASS claims are made",
  "No-secret audit boundary",
  "Export and backup redaction boundary",
  "Known limitations",
  "Final decision",
]) {
  if (!report.includes(marker)) {
    fail(`Final report missing marker: ${marker}`);
  } else {
    pass(`Final report includes: ${marker}`);
  }
}

const canonicalRoutes = [
  "/command",
  "/carnos",
  "/calendar",
  "/timeline",
  "/goals",
  "/world-class",
  "/career",
  "/networking",
  "/resume",
  "/interviews",
  "/learning",
  "/projects",
  "/research-stanford",
  "/research-lab",
  "/body",
  "/nutrition",
  "/supplements",
  "/sleep-energy",
  "/emotion",
  "/hair-skincare",
  "/life-admin",
  "/finance",
  "/housing",
  "/documents",
  "/creativity",
  "/grimoire",
  "/decisions",
  "/future-simulator",
  "/knowledge",
  "/experiments",
  "/analytics",
  "/privacy",
  "/settings",
  "/custom-trackers",
];

for (const route of canonicalRoutes) {
  if (!routes.includes(`"${route}"`)) {
    fail(`Canonical route source missing ${route}`);
  }

  if (!registry.includes(`route: "${route}"`)) {
    fail(`Dashboard registry missing ${route}`);
  }

  if (!checklist.includes(route)) {
    fail(`Browser checklist missing route ${route}`);
  }
}

if (process.exitCode !== 1) {
  pass(`All ${canonicalRoutes.length} canonical routes are represented in the final checklist`);
}

for (const scriptName of [
  "lint",
  "build",
  "check",
  "validate:routes",
  "validate:registry",
  "validate:migrations",
  "audit:phase20z",
  "audit:phase21n",
]) {
  if (!packageJson.scripts?.[scriptName]) {
    fail(`package.json missing ${scriptName}`);
  } else {
    pass(`package.json includes ${scriptName}`);
  }
}

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".verify-logs",
  "node_modules",
  ".venv",
]);

const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".txt",
  ".yml",
  ".yaml",
  ".toml",
  ".env",
  ".example",
]);

const scanRoots = [
  ".env.example",
  "src",
  "scripts",
  "docs/phase-reports",
  "docs/qa",
  "package.json",
];

function collect(path) {
  const absolute = join(ROOT, path);

  if (!existsSync(absolute)) {
    return [];
  }

  const stats = statSync(absolute);

  if (stats.isFile()) {
    return [path];
  }

  const files = [];

  for (const entry of readdirSync(absolute)) {
    if (ignoredDirectories.has(entry)) {
      continue;
    }

    const child = join(path, entry);
    const childStats = statSync(join(ROOT, child));

    if (childStats.isDirectory()) {
      files.push(...collect(child));
    } else if (textExtensions.has(extname(entry)) || entry === ".env.example") {
      files.push(child);
    }
  }

  return files;
}

const files = scanRoots.flatMap(collect);

const suspiciousPatterns = [
  {
    label: "live OpenAI-style secret prefix",
    pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/g,
  },
  {
    label: "private key block",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
  },
  {
    label: "non-placeholder API key assignment",
    pattern:
      /^(?:OPENAI_API_KEY|SPOTIFY_CLIENT_SECRET|SUPABASE_SERVICE_ROLE_KEY)[ \t]*=[ \t]*(?!["']?[ \t]*(?:#|$)|your_|example|placeholder|changeme)[^\s#]+/gim,
  },
  {
    label: "bearer credential literal",
    pattern: /\bBearer\s+[A-Za-z0-9._~-]{24,}\b/g,
  },
];

for (const file of files) {
  const text = readFileSync(join(ROOT, file), "utf8");

  for (const { label, pattern } of suspiciousPatterns) {
    pattern.lastIndex = 0;
    const matches = [...text.matchAll(pattern)];

    if (matches.length > 0) {
      fail(`${label} found in ${relative(ROOT, join(ROOT, file))}`);
    }
  }
}

if (process.exitCode !== 1) {
  pass(`No obvious committed live-secret pattern found across ${files.length} controlled text files`);
}

const backup = read("src/components/backup/phase21l-backup-restore-panel.tsx");

for (const marker of [
  "contains_actual_records: false",
  "contains_provider_keys: false",
  "contains_oauth_tokens: false",
  "contains_env_values: false",
  "contains_service_role_keys: false",
  "automatic_restore_enabled: false",
  "automatic_drive_sync_enabled: false",
]) {
  if (!backup.includes(marker)) {
    fail(`Backup preview missing redaction boundary: ${marker}`);
  } else {
    pass(`Backup preview includes redaction boundary: ${marker}`);
  }
}

if (checklist.includes("Status: Complete") || report.includes("Status: Complete")) {
  fail("Phase 21N browser evidence is marked Complete before this audit can verify real browser execution");
} else {
  pass("Phase 21N remains honestly pending manual browser proof");
}

if (process.exitCode === 1) {
  console.error("\nPhase 21N static audit failed.");
} else {
  console.log(
    "\nPhase 21N static audit passed. Manual browser smoke execution is still required before completion.",
  );
}
