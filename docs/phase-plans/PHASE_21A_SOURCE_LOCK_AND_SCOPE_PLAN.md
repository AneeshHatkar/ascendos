# Phase 21A — Source Lock and Scope Plan

## Status
Phase 21 starts from commit `c57ec6d` after pre-Phase-21 readiness evidence.

Current branch: `main`.

Current known local untracked file intentionally not included in Phase 21A:
- `I am continuing the ascendOS.docx`

This file is not added, committed, modified, or used as source unless explicitly requested later.

## Source hierarchy
Use sources in this order:

1. `ascendOS_Phase_21_Final_Companion_Activation_Bible_FINAL_PERFECTED_LOCKED.docx`
2. `ascendOS_Phase_21_Grail_Coding_Bible_315_Item_Master_V2_PERFECTED.docx`
3. `ascendOS_Phase_21_Final_Build_Order_Safe_Coding_Playbook.docx`
4. `ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
5. `ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`
6. Existing repo docs, audits, reports, migrations, types, repositories, and current terminal output.

## Phase 21 end goal
After Phase 21, ascendOS must be a working v1 personal AI life operating system:

- manual-first
- Athena-assisted
- Supabase-backed
- privacy-safe
- locally resilient
- backup-capable
- browser-tested
- free of fake-done loopholes

The app must let the user sign in, land on Command, see the day, manually add/edit dashboard data, talk/type to Athena, review save cards, approve memory, export/backup data, check connectors, and always know what is configured, disabled, private, stale, synced, or backed up.

## Naming lock
The visible user-facing assistant identity is `Athena`.

`Carnos` may remain only for internal compatibility in routes, tables, components, contracts, audits, and history where destructive rename would create risk.

Do not globally or destructively rename Carnos internals unless the repo proves it is safe and the change is explicitly scoped.

## Storage lock
Supabase/Postgres is the permanent source of truth.

IndexedDB/local cache may support:

- drafts
- safe cached snapshots
- offline queue
- sync review
- conflict handling
- stale/partial/offline state display

IndexedDB/local cache is not the permanent source of truth.

Mac/Drive backup is user-controlled export/mirror only and must exclude:

- OpenAI/provider API keys
- Spotify access tokens
- Spotify refresh tokens
- OAuth secrets
- Supabase service-role keys
- raw `.env` values
- credentials
- private provider config

## Safe-write invariant
Athena suggests.
User confirms, edits, or cancels.
Server validates.
Repository writes.
Timeline/proof/audit update where relevant.
Dashboard refreshes.

No hidden writes.

## Manual-first invariant
Every major dashboard must remain usable manually even if all of the following are disabled:

- Athena
- OpenAI/equivalent AI provider
- voice/STT
- talk-back/TTS
- current-info provider
- Spotify
- connectors
- local cache
- backup

## Provider/API invariant
OpenAI or equivalent provider keys are server-side only.

Provider keys must never appear in:

- browser code
- localStorage
- IndexedDB
- exports
- Mac/Drive backups
- logs
- screenshots
- reports
- committed files

When a provider is missing or disabled, the UI must show an honest disabled state.

No fake AI responses.

## Current-info invariant
Current/latest/fresh answers require an enabled current-info provider and visible evidence/source/freshness state.

If current-info is disabled, Athena must not fake freshness.

Current-info findings may be saved to Knowledge, Research, Career, or Learning only after confirmation.

## Voice invariant
Voice is explicit click-to-talk only.

No always-listening.
No hidden recording.
No voice-triggered writes without review and confirmation.

## Memory invariant
Chat history is not automatically long-term memory.

Long-term memory requires candidate creation, review, approve/edit/reject/delete/forget controls, metadata, and context-used transparency.

No secret memory writes.

## Backup invariant
Supabase remains the source of truth.

Mac/Drive backup is user-controlled export/mirror.

Backup files must include category/version/integrity metadata and must exclude secrets/tokens/keys.

Restore/import, if enabled, must have preview and conflict handling.

## No-loopholes rule
A feature does not count as complete because a file, route, table, UI card, or placeholder exists.

A feature counts only when it is:

- reachable
- truthful
- private
- validated
- backed by real user-owned data or an honest empty/disabled/error state
- browser-tested where relevant

## Build order lock
Phase 21 must follow this order:

1. 21A — Source Lock and Truth Matrix
2. 21B — App Shell, Navigation, Status Foundation
3. 21C — Manual Dashboard Activation
4. 21D — AI Provider Boundary and Disabled States
5. 21E — Athena Runtime and Chat UI
6. 21F — Safe Cards and Conversation Routing
7. 21G — Memory Review and Context Use
8. 21H — Voice, Talk-Back, and Current-Info
9. 21I — Global Athena, Add Anything, Search Palette
10. 21J — Privacy, Export, Connectors, Spotify, Settings
11. 21K — Local IndexedDB / Offline Cache / Sync Queue
12. 21L — Mac/Drive Backup and Restore Preview
13. 21M — Onboarding, Daily Ritual, Weekly Review, Mobile, Polish
14. 21N — Final Smoke Tests and Audits
15. 21O — Final v1 Closeout, Commit, Push

No jumping ahead.
No broad rewrites.
No schema guessing.
No duplicate systems.
