import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === ".git" ||
        entry === ".verify-logs" ||
        entry === ".tmp"
      ) continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

function read(path) {
  return readFileSync(path, "utf8");
}

const files = walk(root);
const relFiles = files.map((file) => relative(root, file));

const migrations = relFiles.filter((file) => file.startsWith("supabase/migrations/") && file.endsWith(".sql"));
const appPages = relFiles.filter((file) => file.startsWith("src/app/") && file.endsWith("page.tsx"));
const repoFiles = relFiles.filter((file) => file.startsWith("src/lib/repositories/"));
const dashboardFiles = relFiles.filter((file) => file.startsWith("src/lib/dashboard/") || file.startsWith("src/components/dashboard/"));
const privacyFiles = relFiles.filter((file) => file.includes("privacy"));
const connectorFiles = relFiles.filter((file) => /connector|spotify|oauth|external/i.test(file));

const tableNames = new Set();
for (const file of migrations) {
  const text = read(join(root, file));
  const regexes = [
    /create table if not exists public\.([a-zA-Z0-9_]+)/g,
    /create table public\.([a-zA-Z0-9_]+)/g,
    /alter table public\.([a-zA-Z0-9_]+)/g
  ];
  for (const regex of regexes) {
    let match;
    while ((match = regex.exec(text))) {
      tableNames.add(match[1]);
    }
  }
}

const tableUsage = [];
for (const file of relFiles.filter((file) => file.startsWith("src/") && /\.(ts|tsx)$/.test(file))) {
  const text = read(join(root, file));
  const used = [];
  for (const table of tableNames) {
    if (text.includes(`"${table}"`) || text.includes(`'${table}'`) || text.includes(table)) {
      used.push(table);
    }
  }
  if (used.length > 0) {
    tableUsage.push({ file, tables: used });
  }
}

const contractOnlySignals = [];
for (const file of relFiles.filter((file) => file.startsWith("docs/contracts/") || file.startsWith("docs/phase-reports/"))) {
  const text = read(join(root, file)).toLowerCase();
  if (
    text.includes("contract") &&
    (
      text.includes("no runtime") ||
      text.includes("no provider") ||
      text.includes("no database") ||
      text.includes("no sql") ||
      text.includes("deferred") ||
      text.includes("boundary")
    )
  ) {
    contractOnlySignals.push(file);
  }
}

const spotifyRuntimeSignals = [];
for (const file of relFiles.filter((file) => file.startsWith("src/") || file.startsWith("supabase/"))) {
  const text = read(join(root, file));
  if (
    /spotify/i.test(text) ||
    /accounts\.spotify\.com/i.test(text) ||
    /api\.spotify\.com/i.test(text) ||
    /refresh_token/i.test(text) ||
    /access_token/i.test(text) ||
    /code_verifier/i.test(text)
  ) {
    spotifyRuntimeSignals.push(file);
  }
}

const forbiddenSpotifyRuntime = [];
for (const file of spotifyRuntimeSignals) {
  const text = read(join(root, file));
  for (const marker of [
    "accounts.spotify.com",
    "api.spotify.com",
    "refresh_token",
    "access_token",
    "code_verifier",
    "client_secret"
  ]) {
    if (text.includes(marker)) {
      forbiddenSpotifyRuntime.push({ file, marker });
    }
  }
}

console.log("=== ASCENDOS INTEGRATION + SCHEMA REALITY AUDIT ===");

console.log("\n=== Migrations ===");
for (const migration of migrations) console.log(migration);

console.log("\n=== Tables discovered from migrations ===");
for (const table of [...tableNames].sort()) console.log(table);

console.log("\n=== App routes/pages ===");
for (const page of appPages) console.log(page);

console.log("\n=== Repository files ===");
for (const file of repoFiles) console.log(file);

console.log("\n=== Dashboard/helper files ===");
for (const file of dashboardFiles) console.log(file);

console.log("\n=== Privacy-related files ===");
for (const file of privacyFiles) console.log(file);

console.log("\n=== Connector/Spotify/OAuth-related files ===");
for (const file of connectorFiles) console.log(file);

console.log("\n=== Source files using discovered table names ===");
for (const item of tableUsage) {
  console.log(`${item.file} -> ${item.tables.join(", ")}`);
}

console.log("\n=== Contract/boundary-heavy docs ===");
for (const file of contractOnlySignals) console.log(file);

console.log("\n=== Spotify runtime signal files ===");
for (const file of spotifyRuntimeSignals) console.log(file);

console.log("\n=== Spotify actual runtime/token markers ===");
if (forbiddenSpotifyRuntime.length === 0) {
  console.log("NONE FOUND — Spotify is not actually connected yet.");
} else {
  for (const item of forbiddenSpotifyRuntime) {
    console.log(`${item.file} -> ${item.marker}`);
  }
}

console.log("\n=== Reality conclusion ===");
console.log("If Spotify runtime/token markers are NONE, then Phase 20 is a connector trust boundary, not an actual Spotify connection.");
console.log("Next required work is an integration/schema gap report before Phase 21 polish.");
