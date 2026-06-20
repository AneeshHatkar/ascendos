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
