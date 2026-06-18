# Auth Smoke-Test Checklist

This checklist verifies that ascendOS + Carnos auth, profile creation, and Carnos profile creation work correctly.

## Current modes

ascendOS supports two modes:

1. Local setup mode
   - Supabase env vars are missing.
   - App must still build.
   - Auth/profile UI must show safe placeholder state.

2. Connected Supabase mode
   - Supabase env vars are present in `.env.local`.
   - Auth pages should work.
   - Database rows should be created.

## Local setup smoke test

Run:

    npm run verify:env
    npm run check

Expected:

- `verify:env` prints local setup mode.
- Missing env vars are listed.
- Exit code is still success.
- `npm run check` passes.
- `/command` builds.
- `/settings` builds.
- Auth routes build:
  - `/auth/login`
  - `/auth/signup`
  - `/auth/callback`
  - `/auth/signout`

## Connected Supabase setup

Before connected testing:

1. Create `.env.local`.
2. Fill:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL=http://localhost:3000`
3. Add local callback URL in Supabase:
   - `http://localhost:3000/auth/callback`
4. Apply migration:
   - `supabase/migrations/0001_profiles_and_carnos_profiles.sql`

Then run:

    npm run verify:env
    rm -rf .next
    npm run check
    npm run dev

## Connected auth smoke test

Open:

    http://localhost:3000/auth/signup

Test signup:

1. Enter a test email.
2. Enter a test password.
3. Submit.
4. Confirm redirect to `/command`.

Expected:

- Signup completes or requests email confirmation depending on Supabase Auth settings.
- No server error occurs.
- If session is active, `/command` shows signed-in state instead of local setup mode.

Test database creation:

In Supabase Table Editor or SQL Editor, confirm:

1. `public.profiles` contains a row where:
   - `id` equals auth user id
   - `email` equals test email
   - `onboarding_status` is `not_started`

2. `public.carnos_profiles` contains a row where:
   - `user_id` equals auth user id
   - `companion_name` is `Carnos`
   - `memory_mode` is `confirmation_required`
   - `safety_mode` is `standard`

## Login smoke test

Open:

    http://localhost:3000/auth/login

Test:

1. Enter test email.
2. Enter test password.
3. Submit.
4. Confirm redirect to `/command`.

Expected:

- User signs in.
- Topbar shows user/auth state.
- `/command` can load profile bundle if rows exist.

## Signout smoke test

Open:

    http://localhost:3000/auth/signout

Expected:

- User signs out.
- App redirects to `/auth/login`.

## RLS smoke test

After connected setup:

1. Create two test users.
2. Confirm user A cannot read or update user B profile rows.
3. Confirm user A cannot read or update user B Carnos profile rows.

Expected:

- `profiles` is owner-only.
- `carnos_profiles` is owner-only.
- No cross-user reads or writes are allowed.

## Failure rules

If signup works but profile rows are missing:

- Check whether migration was applied.
- Check whether `on_auth_user_created` trigger exists.
- Check whether `handle_new_user()` exists.
- Check Supabase Auth logs.

If build fails after adding `.env.local`:

- Run `npm run verify:env`.
- Check URL formatting.
- Check anon key presence.
- Delete `.next`.
- Rerun `npm run check`.

If login redirects but user state does not appear:

- Check middleware.
- Check Supabase callback settings.
- Check cookies.
- Check `/auth/callback`.

## Phase 3 completion requirement

Phase 3 can be marked complete only when:

- Local setup mode passes.
- Migration exists and validates.
- TypeScript types exist.
- Supabase clients are typed.
- Auth pages exist.
- Auth helpers exist.
- Protected route boundary exists.
- Smoke-test checklist exists.
- Project builds cleanly.
- Code snapshot is updated.
