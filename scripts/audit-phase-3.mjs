import { existsSync, readFileSync } from "node:fs";

function fail(message) {
  console.error(`Phase 3 audit failed: ${message}`);
  process.exit(1);
}

function requireFile(path) {
  if (!existsSync(path)) {
    fail(`Missing required file: ${path}`);
  }
}

function requireIncludes(path, snippets) {
  requireFile(path);
  const text = readFileSync(path, "utf8");

  for (const snippet of snippets) {
    if (!text.includes(snippet)) {
      fail(`${path} is missing required snippet: ${snippet}`);
    }
  }
}

const requiredFiles = [
  ".env.example",
  "middleware.ts",
  "src/lib/supabase/env.ts",
  "src/lib/supabase/browser.ts",
  "src/lib/supabase/server.ts",
  "src/lib/supabase/middleware.ts",
  "src/lib/auth/actions.ts",
  "src/lib/auth/session.ts",
  "src/app/auth/login/page.tsx",
  "src/app/auth/signup/page.tsx",
  "src/app/auth/callback/route.ts",
  "src/app/auth/signout/route.ts",
  "supabase/migrations/0001_profiles_and_carnos_profiles.sql",
  "scripts/validate-sql-migrations.mjs",
  "scripts/verify-env.mjs",
  "scripts/generate-code-snapshot.mjs",
  "src/types/database.ts",
  "src/lib/profile/queries.ts",
  "src/lib/profile/index.ts",
  "src/components/profile/profile-summary-card.tsx",
  "src/components/auth/protected-page.tsx",
  "src/components/auth/index.ts",
  "src/app/settings/page.tsx",
  "docs/setup/SUPABASE_SETUP.md",
  "docs/setup/AUTH_SMOKE_TEST.md",
  "docs/setup/PROTECTED_ROUTES.md",
  "CODE_SNAPSHOT.md",
  "CODE_LEDGER.md",
  "PROJECT_EXECUTION_LOG.md",
  "ERRORS_AND_FIXES.md",
];

for (const file of requiredFiles) {
  requireFile(file);
}

requireIncludes("package.json", [
  '"check"',
  '"validate:routes"',
  '"validate:registry"',
  '"validate:migrations"',
  '"verify:env"',
  '"snapshot:code"',
]);

requireIncludes(".env.example", [
  "NEXT_PUBLIC_SUPABASE_URL=",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY=",
  "NEXT_PUBLIC_APP_URL=http://localhost:3000",
]);

requireIncludes("supabase/migrations/0001_profiles_and_carnos_profiles.sql", [
  "create table if not exists public.profiles",
  "create table if not exists public.carnos_profiles",
  "alter table public.profiles enable row level security",
  "alter table public.carnos_profiles enable row level security",
  "create policy",
  "confirmation_required",
  "handle_new_user",
  "on_auth_user_created",
]);

requireIncludes("src/types/database.ts", [
  "export type ProfileRow",
  "export type CarnosProfileRow",
  "export type Database",
  "confirmation_required",
]);

requireIncludes("src/lib/supabase/browser.ts", [
  "createBrowserClient<Database>",
]);

requireIncludes("src/lib/supabase/server.ts", [
  "createServerClient<Database>",
]);

requireIncludes("src/lib/supabase/middleware.ts", [
  "createServerClient<Database>",
  "auth.getUser",
]);

requireIncludes("src/lib/auth/actions.ts", [
  "signInWithPassword",
  "signUpWithPassword",
  "signOut",
]);

requireIncludes("src/lib/auth/session.ts", [
  "getCurrentUser",
  "requireCurrentUser",
]);

requireIncludes("src/lib/profile/queries.ts", [
  "getProfileBundle",
  "getProfile",
  "getCarnosProfile",
]);

requireIncludes("src/components/auth/protected-page.tsx", [
  "ProtectedPage",
  "redirect(\"/auth/login\")",
]);

requireIncludes("src/components/profile/profile-summary-card.tsx", [
  "ProfileSummaryCard",
  "confirmation-required",
]);

requireIncludes("docs/setup/SUPABASE_SETUP.md", [
  "Supabase Setup Guide",
  "Never commit secrets",
  "confirmation_required",
]);

requireIncludes("docs/setup/AUTH_SMOKE_TEST.md", [
  "Auth Smoke-Test Checklist",
  "RLS smoke test",
  "Phase 3 completion requirement",
]);

requireIncludes("docs/setup/PROTECTED_ROUTES.md", [
  "Protected Routes Guide",
  "Do not apply blindly",
]);

requireIncludes("CODE_SNAPSHOT.md", [
  "# ascendOS Code Snapshot",
  "src/lib/auth/actions.ts",
  "supabase/migrations/0001_profiles_and_carnos_profiles.sql",
]);

console.log("Phase 3 audit passed: Supabase/Auth foundation files are present and aligned.");
