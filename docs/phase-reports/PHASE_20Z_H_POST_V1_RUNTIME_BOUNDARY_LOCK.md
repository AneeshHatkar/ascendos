# Phase 20Z-H — Post-v1 Runtime Boundary Lock

Generated after the post-Phase-20 whole-project connectivity audit and follow-up runtime-read fixes.

This report locks the remaining intentionally incomplete systems before Phase 21 so the project can proceed without falsely claiming runtime capabilities that do not exist.

## Current verified fixes already completed

The following runtime-read connectivity gaps were closed before this lock:

- Memory / Knowledge / Carnos read alignment was added in commit `1934d88`.
- AdminFinance reminders read coverage was added in commit `bb4b072`.
- Runtime memory/knowledge/Carnos boundary wording was clarified in commit `600178d`.

## CustomTrackers v1 stance

### v1 status

CustomTrackers is a safe preview and contract shell for v1.

The current `/custom-trackers` surface intentionally has:

- no runtime database reads;
- no runtime database writes;
- disabled primary actions;
- no fake tracker entries;
- no fake dashboard cards;
- no fake AI mappings;
- review-before-write boundaries;
- template suggestions only;
- local view-model rendering only.

### Explicit post-v1 runtime scope

The following CustomTrackers capabilities are post-v1 unless a future source-of-truth update explicitly brings them forward:

- custom tracker table persistence;
- custom tracker field persistence;
- custom tracker entry persistence;
- dashboard placement persistence;
- Carnos-to-entry proposal persistence;
- custom tracker analytics from persisted entries;
- custom tracker timeline/runtime integration;
- custom tracker repository write flows;
- custom tracker RLS-backed CRUD operations.

### Phase 21 implication

Phase 21 must not treat CustomTrackers as a completed runtime tracker engine. It may polish the safe preview shell only if it preserves the no-runtime/no-write truth.

## Spotify v1 stance

### v1 status

Spotify is a connector trust, privacy, permission, token-safety, and action-review boundary for v1.

The current privacy surface may describe Spotify connector rules, but the app intentionally has no live Spotify runtime integration.

The current project has:

- no Spotify OAuth start route;
- no Spotify OAuth callback route;
- no Spotify token storage;
- no Spotify token refresh;
- no Spotify account persistence;
- no Spotify provider client;
- no Spotify API reads;
- no Spotify API writes;
- no Spotify playback actions;
- no Spotify playlist actions;
- no Spotify sync jobs;
- no Carnos Spotify runtime tools.

### Explicit post-v1 runtime scope

The following Spotify capabilities are post-v1 unless a future source-of-truth update explicitly brings them forward:

- Spotify Developer App runtime setup;
- OAuth/PKCE start and callback routes;
- encrypted token storage strategy;
- token refresh lifecycle;
- account/profile persistence;
- provider client and service layer;
- playback/media read APIs;
- playlist/library read APIs;
- playback or playlist mutation APIs;
- Carnos Spotify proposal execution;
- Spotify audit persistence;
- Spotify export inclusion from real provider data.

### Phase 21 implication

Phase 21 must not treat Spotify as connected. It may polish privacy/connector boundary UI only if it preserves the truth that Spotify runtime is post-v1.

## What remains allowed for v1

The following are allowed in v1:

- truthful dashboard visibility for connected internal SQL-backed domains;
- read-only memory/knowledge/Carnos visibility from implemented repositories;
- existing admin/finance/life-admin reminders visibility;
- privacy boundary UI for future connectors;
- disabled preview cards for unimplemented actions;
- explicit post-v1 labels for deferred runtime systems.

## What remains forbidden for v1 without explicit implementation

The following remain forbidden before v1 unless separately implemented, audited, checked, committed, and pushed:

- silent writes;
- fake data pretending to be runtime data;
- hidden Carnos prompt/context injection;
- background provider calls;
- background connector sync;
- hidden token storage;
- unreviewed memory writes;
- unreviewed destructive actions;
- claiming CustomTrackers runtime persistence exists;
- claiming Spotify runtime connection exists.

## Phase 21 readiness consequence

Phase 21 may proceed only after the final pre-Phase-21 smoke/truth audit confirms:

- completed domains have no missing repository table coverage;
- CustomTrackers is explicitly treated as post-v1 runtime;
- Spotify is explicitly treated as post-v1 runtime;
- no UI copy falsely claims provider/runtime/write capabilities;
- `npm run check` passes.
