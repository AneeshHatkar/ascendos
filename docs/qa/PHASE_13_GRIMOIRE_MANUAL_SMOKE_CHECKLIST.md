# Phase 13 Grimoire Manual Smoke Checklist

Status: Final closeout checklist for Phase 13.

## Scope

Phase 13 implements the read-only Grimoire-to-Action surface for symbolic modes, practical missions, proof translation, corruption visibility, reversion, and weekly throne audit.

## Routes

- [ ] `/grimoire` loads behind the authenticated dashboard shell.
- [ ] `/grimoire` shows the Grimoire title and read-only route description.
- [ ] `/grimoire` appears in canonical route coverage.
- [ ] `/grimoire` appears in dashboard registry coverage.
- [ ] `/grimoire` appears in dashboard layout contracts.

## Source tables

Confirm the dashboard reads only from these Phase 13 tables:

- [ ] `grimoire_modes`
- [ ] `grimoire_daily_logs`
- [ ] `grimoire_skills`
- [ ] `grimoire_corruption_checks`
- [ ] `grimoire_reversions`

## SQL and ownership

- [ ] Migration `0016_phase13_grimoire_foundation.sql` exists.
- [ ] Migration `0017_phase13_parent_ownership_guards.sql` exists.
- [ ] All Grimoire tables enable row level security.
- [ ] All Grimoire tables have user-owned select policies.
- [ ] Parent ownership guards exist for linked goals, tasks, proof items, AI actions, chat messages, modes, and daily logs.
- [ ] No seed/demo data is inserted by Phase 13 migrations.

## Read helpers

- [ ] `src/lib/repositories/grimoire-read.ts` exists.
- [ ] Grimoire repository helpers use server-side reads only.
- [ ] Grimoire repository helpers do not insert, update, delete, upsert, execute actions, call generation, or run timers.
- [ ] `src/lib/dashboard/grimoire-dashboard-data-helpers.ts` exists.
- [ ] Dashboard helper aggregates summaries, detail rows, warnings, source tables, grounding rules, anti-corruption rules, and weekly throne audit questions.

## Dashboard UI

- [ ] `src/components/dashboard/grimoire-dashboard-v1.tsx` exists.
- [ ] `GrimoireDashboardV1` is exported through the dashboard barrel.
- [ ] Route `/grimoire` renders `GrimoireDashboardV1`.
- [ ] Read-only Grimoire boundary panel appears.
- [ ] Empty/loading/error/privacy state language appears.
- [ ] Cross-dashboard links appear.
- [ ] Source tables panel appears.
- [ ] Final Grimoire safety audit appears.

## Required cards

- [ ] Mode Selector appears.
- [ ] Mission Mapping appears.
- [ ] Symbol-to-Action Translator appears.
- [ ] Corruption Detector appears.
- [ ] Reversion appears.
- [ ] Weekly Throne Audit appears.

## Preview cards and boundaries

- [ ] Symbol-to-action preview cards are disabled.
- [ ] Corruption correction preview cards are disabled.
- [ ] Reversion recovery preview cards are disabled.
- [ ] Weekly throne audit preview cards are disabled.
- [ ] Save / Confirm is unavailable on every preview card.
- [ ] No proposed-action persistence is wired.
- [ ] No action execution is wired.
- [ ] No Carnos generation is wired.
- [ ] No direct database write is wired.
- [ ] No browser Supabase client is used.
- [ ] No timers or background jobs are used.

## Carnos guide and throne boundaries

- [ ] Carnos Grimoire guide boundary appears.
- [ ] Forbidden guide behavior appears.
- [ ] Throne override boundary appears.
- [ ] Truth, safety, reality evidence, long-term direction, and identity stability are stated as override principles.
- [ ] The UI clearly prevents symbolic inflation, permanent overdrive, proof replacement, and fantasy identity claims.

## Manual acceptance

- [ ] `npm run audit:phase13` passes.
- [ ] `npm run check` passes.
- [ ] `next build` includes `/grimoire`.
- [ ] Git status is clean after final commit.

## Deferred scope

The following remain explicitly deferred beyond Phase 13:

- Writing or editing Grimoire records from the UI.
- Activating modes.
- Logging reversions.
- Running weekly audits.
- Creating proof actions from Grimoire cards.
- Persisting proposed actions from Grimoire preview cards.
- Carnos live generation or memory/RAG.
- Voice behavior.
- Timers, background jobs, or scheduled checks.
