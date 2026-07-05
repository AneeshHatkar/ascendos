# Phase 20Z — Privacy / Export / Connector Final Smoke Checklist

## Required Checks

- [ ] Run `npm run audit:phase20z`.
- [ ] Run `npm run check`.
- [ ] Confirm `/privacy` builds successfully.
- [ ] Confirm the `/privacy` route remains read-only.
- [ ] Confirm no Phase 20Z SQL migration exists.
- [ ] Confirm Spotify remains a boundary contract and does not call provider APIs.
- [ ] Confirm no token storage is introduced.
- [ ] Confirm no background polling is introduced.
- [ ] Confirm Garmin remains deferred.
- [ ] Confirm Echo/Alexa remains excluded.
- [ ] Confirm manual workout logging remains a first-party/manual tracker stance.
- [ ] Confirm Carnos external actions remain permission-gated.
- [ ] Confirm only Phase 20Z intended files are staged for commit.

## Pass Rule

The checklist passes when automated verification passes and no deferred connector is accidentally implemented.
