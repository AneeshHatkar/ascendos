# Phase 21B — Completion Report

## Chunk
21B — App Shell, Navigation, Status Foundation

## Goal
Upgrade the existing app shell without duplicating systems.

## Completed
- Extended `src/lib/routes.ts` with grouped route metadata.
- Preserved canonical routes and banned legacy routes.
- Updated dashboard registry visible assistant label from Carnos to Athena while preserving `/carnos` compatibility route.
- Upgraded the existing sidebar into grouped Phase 21 navigation:
  - Core
  - Career
  - Learning / Research
  - Health / Body
  - Life
  - System
- Added active route highlighting.
- Added mobile navigation drawer through the existing AppShell.
- Isolated mobile drawer state in `src/components/layout/mobile-navigation.tsx` so server-only auth stays out of the client bundle.
- Added topbar global status primitives for:
  - AI provider
  - Privacy
  - Connectors
  - Offline/local continuity
- Added shared authenticated dashboard header with:
  - title
  - description
  - Supabase source status
  - Manual-first status
  - optional Athena/context right panel slot
- Added reusable dashboard state components:
  - DashboardState
  - LoadingState
  - ErrorState
  - PrivacyBlockedState
  - ProviderDisabledState
  - ConnectorDisconnectedState
  - OfflineState
- Updated app metadata away from default Create Next App text.

## Explicit non-goals
- No OpenAI/provider implementation was added.
- No Athena runtime/chat implementation was added.
- No save-card flow was added.
- No dashboard CRUD/manual write behavior was added.
- No schema was changed.
- No Carnos internals were destructively renamed.

## Verification required
- `npm run lint`
- `npm run validate:routes`
- `npm run validate:registry`
- `npm run build`
- `git diff --check`
- browser verification for desktop navigation
- browser verification for mobile navigation/drawer

## Completion gate
21B is complete only when the app shell, navigation, status states, dashboard header, and mobile drawer build cleanly and are browser-verified.

## Verification results
- `npm run lint`: passed with existing warnings only and 0 errors.
- `npm run validate:routes`: passed; 33 canonical routes present and banned legacy route check passed.
- `npm run validate:registry`: passed; 33 registry routes match canonical routes.
- `npm run build`: passed after isolating mobile drawer client state from server-only auth.
- `npm run check`: passed full quiet verification.
- `npm run audit:phase20z`: passed.
- `git diff --check`: passed.

## Build correction made during 21B
The first 21B shell patch made `AppShell` a client component, which pulled `AuthStatus` and server-only Supabase helpers into the client bundle. The fix keeps `AppShell` and `AppTopbar` server-safe, and isolates only the mobile drawer state in `MobileNavigationButton`.

## Final status
21B is ready for staging, final staged-diff review, commit, and push.
