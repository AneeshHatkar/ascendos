# Phase 20V Spotify Carnos Action Safety Report

Phase 20V defines Spotify Carnos action proposal, review, approval, cooldown, provider limitation, scope, Premium, active device, playlist mutation, listening history, audit, blocked reason, badge, and runtime schema gate boundaries before Carnos can propose or perform any Spotify action.

## Added

- Carnos Spotify action classes.
- Action safety levels.
- Future proposal manifest fields.
- Approval rules.
- Review queue rules.
- Cooldown rules.
- Scope and provider requirement rules.
- Private Mode rules.
- Emergency Lockdown rules.
- Playlist action rules.
- Playback action rules.
- Listening history action rules.
- Allowed Carnos phrase boundaries.
- Forbidden Carnos behaviors.
- Audit events.
- Blocked reasons.
- Badge requirements.

## Schema Note

No schema was needed. This chunk does not add migrations, Spotify action persistence, Carnos Spotify runtime tools, provider API clients, playback actions, playlist actions, scope request persistence, review queue persistence, approval persistence, cooldown persistence, audit writes, UI cards, or provider calls.

## Verification

- npm run audit:phase20v
- npm run check
