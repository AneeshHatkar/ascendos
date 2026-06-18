import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = "supabase/migrations";

function fail(message) {
  console.error(`SQL migration validation failed: ${message}`);
  process.exit(1);
}

if (!existsSync(MIGRATIONS_DIR)) {
  fail(`${MIGRATIONS_DIR} does not exist.`);
}

const files = readdirSync(MIGRATIONS_DIR)
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  fail("No SQL migration files found.");
}

const seenNumbers = new Set();

for (const file of files) {
  const fullPath = join(MIGRATIONS_DIR, file);
  const stats = statSync(fullPath);

  if (!stats.isFile()) {
    continue;
  }

  const match = file.match(/^(\d{4})_[a-z0-9_]+\.sql$/);

  if (!match) {
    fail(`${file} must match pattern 0001_descriptive_name.sql.`);
  }

  const number = match[1];

  if (seenNumbers.has(number)) {
    fail(`Duplicate migration number ${number}.`);
  }

  seenNumbers.add(number);

  const content = readFileSync(fullPath, "utf8").trim();

  if (!content) {
    fail(`${file} is empty.`);
  }

  if (/create table/i.test(content) && !/enable row level security/i.test(content)) {
    fail(`${file} creates tables but does not enable row level security.`);
  }

  if (/public\.(profiles|carnos_profiles)/i.test(content) && !/create policy/i.test(content)) {
    fail(`${file} touches personal tables but does not define policies.`);
  }

  if (/auth\.users/i.test(content) && !/security definer/i.test(content)) {
    fail(`${file} touches auth.users but does not define a security definer function.`);
  }
}

console.log(`SQL migration validation passed: ${files.length} migration file(s).`);
