# Phase 20Z-D — Integration Gap Closure Plan

## Status

Required corrective phase before Phase 21.

## Why This Exists

The Phase 20Z-C whole-project interconnection reality audit proved that ascendOS is partially interconnected but not yet fully end-to-end hardened.

The project has real migrations, real tables, real pages, repositories, dashboard helpers, and components. However, multiple pages still have weak runtime/data wiring signals, several tables lack real Supabase repository usage, and Spotify is not connected.

Phase 21 must not proceed as visual polish only until these gaps are resolved or explicitly deferred.

## Audit Inputs

- Tables discovered: 118
- App pages: 37
- Repository files: 14
- Dashboard helper files: 15
- Weak runtime/data pages: 18
- Static/placeholder/deferred pages: 24
- Tables without any source reference: 1
- Tables without real Supabase repository usage: 18
- Spotify runtime/token integration files: 0

## P0 — Must Fix Before v1

### Health / Body Wiring

Pages:

- `src/app/body/page.tsx`
- `src/app/nutrition/page.tsx`
- `src/app/sleep-energy/page.tsx`
- `src/app/supplements/page.tsx`
- `src/app/hair-skincare/page.tsx`
- `src/app/emotion/page.tsx`

Required connection:

- `src/lib/repositories/health-body-read.ts`
- `src/lib/dashboard/health-body-dashboard-data-helpers.ts`

Required tables:

- `body_logs`
- `workouts`
- `exercises`
- `workout_sets`
- `nutrition_logs`
- `meal_items`
- `supplements`
- `supplement_logs`
- `sleep_logs`
- `energy_logs`
- `mental_health_logs`
- `emotion_logs`
- `journal_entries`
- `skincare_logs`
- `haircare_logs`
- `products`

Acceptance criteria:

- Each page uses authenticated read flow.
- Each page is backed by repository/helper data.
- Each page has loading/empty/error-safe UI states where applicable.
- No fake demo data is introduced.

### Admin / Finance / Life Admin Wiring

Pages:

- `src/app/finance/page.tsx`
- `src/app/life-admin/page.tsx`
- `src/app/housing/page.tsx`
- `src/app/documents/page.tsx`

Required connection:

- `src/lib/repositories/admin-finance-read.ts`
- `src/lib/dashboard/admin-finance-dashboard-data-helpers.ts`

Required tables:

- `financial_accounts`
- `budget_categories`
- `financial_logs`
- `subscriptions`
- `documents`
- `housing_options`
- `housing_contacts`
- `reminders`

Acceptance criteria:

- Each page uses authenticated read flow.
- Each page is backed by repository/helper data.
- No fake financial or life-admin data is introduced.
- Empty states explain missing user data honestly.

### Grimoire Wiring

Page:

- `src/app/grimoire/page.tsx`

Required connection:

- `src/lib/repositories/grimoire-read.ts`
- `src/lib/dashboard/grimoire-dashboard-data-helpers.ts`

Required tables:

- `grimoire_modes`
- `grimoire_daily_logs`
- `grimoire_skills`
- `grimoire_corruption_checks`
- `grimoire_reversions`
- `skills`
- `daily_logs`
- `proof_items`
- `tasks`
- `events`

Acceptance criteria:

- Grimoire page uses real repository/helper data.
- Any unavailable runtime ritual/action flow is clearly marked as deferred.
- No mystical/static shell is presented as operational data.

## P1 — Must Fix or Explicitly Defer

Pages:

- `src/app/custom-trackers/page.tsx`
- `src/app/experiments/page.tsx`
- `src/app/future-simulator/page.tsx`
- `src/app/creativity/page.tsx`
- `src/app/decisions/page.tsx`

Acceptance criteria:

Each page must be one of:

1. Real DB-backed page.
2. Real read-only boundary page.
3. Explicitly deferred page with honest UI copy.
4. Removed from primary v1 navigation.

## P2 — Memory / Knowledge / System Memory Repository Gaps

Tables without real Supabase repository usage:

- `carnos_context_snapshots`
- `carnos_profiles`
- `knowledge_items`
- `knowledge_links`
- `knowledge_tags`
- `memory_conflict_groups`
- `memory_conflict_members`
- `memory_do_not_remember_rules`
- `memory_embedding_records`
- `memory_links`
- `memory_preferences`
- `memory_retrieval_events`
- `memory_review_queue`
- `memory_usage_logs`
- `profiles`
- `project_memory_state`
- `retrieval_logs`
- `system_memory_state`

Required action:

- Add repository coverage where these tables are meant to be runtime-readable.
- Explicitly defer tables that are schema placeholders.
- Remove or document `system_memory_state`, which currently has no source reference.

## P3 — Spotify Real Connection

Current truth:

- Spotify is not connected.
- Phase 20 built the connector trust boundary only.

Required real implementation if Spotify is included before v1:

- Connector account schema.
- Encrypted token storage strategy.
- Spotify OAuth PKCE start route.
- Spotify OAuth callback route.
- Token refresh service.
- Spotify read service.
- Permission card UI.
- Audit log events.
- Carnos read boundary.
- No playback/write actions unless explicitly approved.

## Required Corrective Subphases

- 20Z-E — Health/body page wiring.
- 20Z-F — Admin/finance/life-admin page wiring.
- 20Z-G — Grimoire/documents/custom-trackers wiring.
- 20Z-H — Memory/knowledge repository gap closure.
- 20Z-I — Spotify real connector implementation, if included before v1.
- 20Z-J — End-to-end smoke test matrix.

## Rule Before Phase 21

Phase 21 can begin only after:

- P0 pages are repository/helper-backed.
- P1 pages are either backed or explicitly deferred.
- Memory/knowledge repository gaps are resolved or explicitly deferred.
- Spotify is either truly connected or explicitly marked post-v1.
- Full verification passes.
- A final end-to-end smoke matrix exists.
