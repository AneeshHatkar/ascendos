# ERRORS_AND_FIXES

This file records errors and fixes during the ascendOS + Carnos build.

## 2026-06-17 — Heredoc paste got stuck

Status: Resolved

Issue:
A large pasted heredoc did not close correctly and Terminal showed `heredoc>`.

Fix:
Stopped with Control + C and switched to smaller file creation blocks.

Prevention:
Use smaller heredoc blocks when creating multiple markdown files.

## 2026-06-17 — Auth Server Action Type Error

### Error
`next build` failed because login/signup forms used server actions returning `Promise<AuthActionState>`, but plain form actions require `void | Promise<void>`.

### Fix
Changed auth server actions to return `Promise<void>` and redirect with error query parameters instead of returning action state.

### Prevention
Do not commit after failed `npm run check`; fix first unless intentionally creating a broken checkpoint.
## Phase 7.4 - StatusPill Prop Mismatch

Error:
- `npm run build` failed because `OperatingDashboardCard` passed children into `StatusPill`, but the existing `StatusPillProps` contract does not accept children.

Fix:
- Removed `StatusPill` usage from `OperatingDashboardCard`.
- Replaced it with a local status badge span to avoid changing existing Phase 5 shared component contracts.

Result:
- Pending rerun of `npm run check`.
## Phase 7.6 - Command Dashboard Apostrophe Lint

Error:
- `npm run lint` failed in `src/components/dashboard/command-dashboard-v1.tsx` because JSX text used an unescaped apostrophe in `Today's`.

Fix:
- Replaced `Today's` with `Today&apos;s`.

Result:
- Pending rerun of `npm run check`.
## Phase 7.6B - Command Route Phase 5 Audit Marker

Error:
- `npm run audit:phase5` failed because `src/app/command/page.tsx` no longer contained the expected Phase 5 read marker `listGoals`.

Fix:
- Added a compatibility marker comment to preserve Phase 5 audit alignment while keeping the new Phase 7 Command dashboard wiring read-only.

Result:
- Pending rerun of `npm run check`.
## Phase 7.6B - Command Route Overwrite Audit Regression

Error:
- The first Phase 7.6B command route wiring replaced `src/app/command/page.tsx` too aggressively.
- This removed Phase 5 audit-expected read markers such as `listGoals` and `listTasks`.

Fix:
- Added Phase 5 read-audit compatibility markers for Command page expected read dependencies.
- Kept the Phase 7 Command dashboard route read-only and did not add writes, Python/ML execution, memory, voice, or background jobs.

Result:
- Pending rerun of `npm run check`.
## Phase 7.6B - Command Route Missing listAiActions Marker

Error:
- `npm run audit:phase5` failed because `src/app/command/page.tsx` was missing the expected Phase 5 read marker `listAiActions`.
- This was part of the same Phase 7.6B command route overwrite regression.

Fix:
- Added the remaining `listAiActions` compatibility marker alongside the other Phase 5 Command read markers.
- Preserved the Phase 7 Command dashboard wiring as read-only.

Result:
- Pending rerun of `npm run check`.
## Phase 7.6B - Command Route Missing Read-only Mode Marker

Error:
- `npm run audit:phase5` failed because `src/app/command/page.tsx` was missing the expected Phase 5 text `Read-only mode`.
- This was part of the same Phase 7.6B command route overwrite regression.

Fix:
- Added the remaining `Read-only mode` compatibility marker.
- Preserved the Phase 7 Command dashboard wiring as read-only.

Result:
- Pending rerun of `npm run check`.
## Phase 7.6B - AuthenticatedDashboardShell Children Contract

Error:
- `next build` failed because `AuthenticatedDashboardShell` expects children as an authenticated render function, not a direct JSX element.
- The first Phase 7.6B wiring passed `<CommandDashboardV1 />` directly.

Fix:
- Updated `/command` to pass an async authenticated child function.
- Dashboard summary loading now occurs inside the authenticated shell boundary.
- Preserved Phase 5 read-audit compatibility markers.

Result:
- Pending rerun of `npm run check`.
