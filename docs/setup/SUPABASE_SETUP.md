# Supabase Setup Guide for ascendOS + Carnos

This guide connects the local ascendOS app to a real Supabase project safely.

## Current status

The codebase is designed to build in two modes:

1. Local setup mode
   - No Supabase keys are present.
   - Auth/profile UI shows safe placeholder state.
   - `npm run check` still passes.

2. Connected Supabase mode
   - `.env.local` contains Supabase project values.
   - Auth pages can sign up/sign in users.
   - Database migrations can be applied.
   - Profile and Carnos profile rows can load from Supabase.

## Never commit secrets

Do not commit:

- `.env`
- `.env.local`
- service role keys
- database passwords
- access tokens

Only `.env.example` belongs in Git.

## Required env vars

Create `.env.local` from `.env.example`:

    cp .env.example .env.local

Fill these values:

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    NEXT_PUBLIC_APP_URL=http://localhost:3000

## Supabase project settings

In Supabase:

1. Create a new Supabase project.
2. Go to Project Settings -> API.
3. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`.
4. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Keep service role keys private.
6. Do not put service role keys in frontend env vars.

## Auth callback URL

For local development, configure this redirect URL in Supabase Auth settings:

    http://localhost:3000/auth/callback

For production, also add:

    https://YOUR_PRODUCTION_DOMAIN/auth/callback

## Apply migrations

The first migration is:

    supabase/migrations/0001_profiles_and_carnos_profiles.sql

It creates:

- `public.profiles`
- `public.carnos_profiles`
- owner-only RLS policies
- auth user creation trigger
- automatic Carnos profile creation

Apply it through either:

1. Supabase SQL Editor by pasting the migration SQL, or
2. Supabase CLI later after CLI setup is added.

## Verification commands

Before connection:

    npm run verify:env
    npm run check

After `.env.local` is configured:

    npm run verify:env
    rm -rf .next
    npm run check
    npm run dev

Then test:

1. Open `/auth/signup`.
2. Create a test account.
3. Confirm redirect to `/command`.
4. Confirm `/command` no longer shows local setup mode.
5. Confirm `profiles` row exists.
6. Confirm `carnos_profiles` row exists.
7. Confirm sign out works through `/auth/signout`.

## Safety requirement

Carnos memory defaults to:

    confirmation_required

Do not change this default unless the user explicitly chooses a different memory mode in a future settings UI.

Important Carnos writes must continue to follow:

    proposed action -> user confirmation -> database write -> audit log -> timeline event
