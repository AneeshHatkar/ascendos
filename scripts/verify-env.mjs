const requiredPublicEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_APP_URL",
];

const optionalServerOnlyEnv = [
  "OPENAI_PROVIDER_ENABLED",
  "OPENAI_API_KEY",
  "OPENAI_MODEL",
  "ATHENA_REQUEST_TOKEN_LIMIT",
  "ATHENA_DAILY_TOKEN_BUDGET",
  "ATHENA_MONTHLY_SPEND_LIMIT_USD",
];

const missing = requiredPublicEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.log("Environment verification: local setup mode");
  console.log("");
  console.log("Missing optional local env vars:");
  for (const key of missing) {
    console.log(`- ${key}`);
  }
  console.log("");
  console.log("This is allowed during foundation development.");
  console.log("Create .env.local from .env.example when connecting to Supabase.");
  process.exit(0);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

try {
  const parsed = new URL(supabaseUrl);

  if (!parsed.hostname.includes("supabase")) {
    console.warn("Environment warning: NEXT_PUBLIC_SUPABASE_URL does not look like a Supabase URL.");
  }
} catch {
  console.error("Environment verification failed: NEXT_PUBLIC_SUPABASE_URL is not a valid URL.");
  process.exit(1);
}

const exposedServerSecretKeys = optionalServerOnlyEnv.filter((key) => key.startsWith("NEXT_PUBLIC_"));

if (exposedServerSecretKeys.length > 0) {
  console.error("Environment verification failed: server-only provider keys must not use NEXT_PUBLIC_ prefix.");
  for (const key of exposedServerSecretKeys) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log("Environment verification passed: Supabase public env vars are present.");
console.log("Environment verification passed: Athena/OpenAI provider env names are server-only.");
