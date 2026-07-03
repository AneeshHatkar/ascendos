# Phase 18A-B Companion Persistence Proof Audit + Level 4 Offline AI Readiness Report

Phase 18A-B adds the missing persistence/offline companion architecture lock.

## Added

- Companion persistence contract
- Level 4 offline AI readiness contract
- Carnos persistence proof report
- Offline storage architecture map
- Phase 18 integration map
- Phase 20 privacy/export/delete tie-in
- Phase 21 offline QA tie-in
- Phase 18A-B audit script
- Phase 18A-B smoke checklist

## Locked decisions

- Carnos must not be one-chat-only.
- Supabase/Postgres remains the online source of truth.
- IndexedDB or equivalent encrypted local cache is the offline continuity layer.
- Browser localStorage is banned for core life data.
- Offline writes must use a sync queue.
- Conflicts and duplicates must be detected before remote merge.
- Offline Carnos must label cached, stale, partial, and unavailable context.
- Level 4 Full Offline AI Companion is a required advanced readiness target.
- Option C local server/runtime is the primary Level 4 path for MacBook Pro M3 Pro.
- Option B Tauri wrapper is future packaging path.
- Option A browser-only local AI is fallback only.

## Verification

Run:

- `npm run audit:phase18a_b`
- `npm run check`
