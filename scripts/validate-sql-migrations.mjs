import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const migrationsDir = path.join(root, "supabase", "migrations");

function fail(message) {
  console.error(`SQL migration validation failed: ${message}`);
  process.exit(1);
}

function normalize(sql) {
  return sql.toLowerCase().replace(/\s+/g, " ").trim();
}

function requirePattern(content, pattern, message) {
  if (!pattern.test(content)) {
    fail(message);
  }
}

function requireIncludes(content, needle, message) {
  if (!normalize(content).includes(normalize(needle))) {
    fail(message);
  }
}

function getCreateTableBlocks(sql) {
  const lowerSql = sql.toLowerCase();
  const blocks = [];
  let cursor = 0;

  while (cursor < lowerSql.length) {
    const startIndex = lowerSql.indexOf("create table if not exists public.", cursor);

    if (startIndex === -1) {
      break;
    }

    const nameStart = startIndex + "create table if not exists public.".length;
    const rest = lowerSql.slice(nameStart);
    const nameMatch = rest.match(/^([a-z0-9_]+)/);

    if (!nameMatch) {
      fail("Found create table statement with invalid or missing public table name.");
    }

    const table = nameMatch[1];
    const endIndex = lowerSql.indexOf("\n);", startIndex);

    if (endIndex === -1) {
      fail(`Could not find closing statement for public.${table}.`);
    }

    blocks.push({
      table,
      sql: sql.slice(startIndex, endIndex + 3),
    });

    cursor = endIndex + 3;
  }

  return blocks;
}

if (!fs.existsSync(migrationsDir)) {
  fail("Missing supabase/migrations directory.");
}

const migrationFiles = fs
  .readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (migrationFiles.length === 0) {
  fail("No SQL migration files found.");
}

const seenNumbers = new Set();

for (const file of migrationFiles) {
  if (!/^\d{4}_[a-z0-9_]+\.sql$/.test(file)) {
    fail(`Migration file name is not canonical: ${file}`);
  }

  const number = file.slice(0, 4);

  if (seenNumbers.has(number)) {
    fail(`Duplicate migration number detected: ${number}`);
  }

  seenNumbers.add(number);
}

for (let index = 0; index < migrationFiles.length; index += 1) {
  const expected = String(index + 1).padStart(4, "0");
  const actual = migrationFiles[index].slice(0, 4);

  if (actual !== expected) {
    fail(`Migration sequence gap or ordering issue. Expected ${expected}, found ${actual}.`);
  }
}

const allSql = migrationFiles
  .map((file) => {
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, "utf8");

    if (sql.trim().length === 0) {
      fail(`Migration file is empty: ${file}`);
    }

    if (/\$begin:|\$end:/i.test(sql)) {
      fail(`Migration file contains corrupted copied math markers: ${file}`);
    }

    if (/referencespublic\./i.test(sql)) {
      fail(`Migration file contains missing whitespace in references public.*: ${file}`);
    }

    if (/disable\s+row\s+level\s+security/i.test(sql)) {
      fail(`Migration file disables row level security: ${file}`);
    }

    if (/create\s+table/i.test(sql)) {
      requirePattern(
        sql,
        /alter\s+table\s+public\.[a-z0-9_]+\s+enable\s+row\s+level\s+security/i,
        `Migration creates table(s) but does not enable RLS: ${file}`,
      );
    }

    return {
      file,
      sql,
      blocks: getCreateTableBlocks(sql),
    };
  });

const combinedSql = allSql.map((entry) => entry.sql).join("\n\n");

for (const entry of allSql) {
  for (const block of entry.blocks) {
    const { table, sql } = block;
    const normalizedBlock = normalize(sql);
    const isUserOwned = normalizedBlock.includes(
      "user_id uuid not null references public.profiles(id) on delete cascade",
    );

    if (!isUserOwned) {
      continue;
    }

    requireIncludes(
      combinedSql,
      `alter table public.${table} enable row level security`,
      `User-owned table public.${table} is missing RLS enable statement.`,
    );

    requirePattern(
      combinedSql,
      new RegExp(`create\\s+policy\\s+"[^"]+"\\s+on\\s+public\\.${table}\\s+for\\s+select`, "i"),
      `User-owned table public.${table} is missing SELECT policy.`,
    );

    requirePattern(
      combinedSql,
      new RegExp(`create\\s+policy\\s+"[^"]+"\\s+on\\s+public\\.${table}\\s+for\\s+insert`, "i"),
      `User-owned table public.${table} is missing INSERT policy.`,
    );

    requireIncludes(
      combinedSql,
      `${table}_user_id_idx`,
      `User-owned table public.${table} is missing user_id index.`,
    );
  }
}

requireIncludes(
  combinedSql,
  "create table if not exists public.profiles",
  "Missing profiles migration.",
);

requireIncludes(
  combinedSql,
  "create table if not exists public.carnos_profiles",
  "Missing carnos_profiles migration.",
);

if (normalize(combinedSql).includes("create table if not exists public.memory_items")) {
  fail("memory_items is not allowed before the dedicated memory phase.");
}

console.log(`SQL migration validation passed: ${migrationFiles.length} migration file(s).`);
