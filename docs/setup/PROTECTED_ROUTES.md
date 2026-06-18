# Protected Routes Guide

ascendOS will eventually protect private dashboards and personal data routes behind Supabase Auth.

## Current status

The project now has a reusable protected route boundary:

    src/components/auth/protected-page.tsx

It is intentionally not applied globally yet because the project still supports local setup mode without Supabase keys.

## Behavior

When Supabase env vars are missing:

- The protected boundary renders a safe local setup placeholder.
- The app still builds.
- No personal data is loaded.

When Supabase env vars are present:

- The protected boundary checks the current Supabase user.
- If no user is signed in, it redirects to `/auth/login`.
- If a user is signed in, it renders the protected page content.

## Usage example

    import { ProtectedPage } from "@/components/auth";

    export default function PrivateDashboardPage() {
      return (
        <ProtectedPage>
          <YourPrivateDashboard />
        </ProtectedPage>
      );
    }

## Do not apply blindly

Do not wrap every route until Supabase is configured and auth smoke tests pass.

Recommended order:

1. Confirm `.env.local` is configured.
2. Apply migration.
3. Test signup/login/signout.
4. Confirm `profiles` and `carnos_profiles` rows are created.
5. Start protecting truly private routes.
6. Leave public/portfolio routes unprotected if needed.

## Privacy rule

Any route that reads personal SQL data should eventually be protected or explicitly designed as safe/public.
