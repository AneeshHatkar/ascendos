# Phase 20W Spotify UI Media Permission Cards Report

Phase 20W defines Spotify UI cards, media permissions cards, connector audit cards, card visibility, card redaction, card actions, review states, provider limitation display, Carnos restrictions, privacy mode behavior, emergency lockdown behavior, audit card boundaries, blocked reasons, badges, and runtime schema gates before any live UI or data wiring exists.

## Added

- Spotify connector card contract.
- Spotify media permissions card contract.
- Spotify connector audit card contract.
- Spotify action review card contract.
- Card states.
- Media permission groups.
- Card actions.
- Redaction rules.
- Private Mode UI rules.
- Emergency Lockdown UI rules.
- Connector audit card rules.
- Carnos UI rules.
- Visual badge map.
- Audit events.
- Blocked reasons.

## Schema Note

No schema was needed. This chunk does not add migrations, React components, dashboard adapters, database reads, database writes, repositories, RLS policies, connector account storage, Spotify provider calls, audit writes, Carnos runtime tools, or live UI wiring.

## Verification

- npm run audit:phase20w
- npm run check
