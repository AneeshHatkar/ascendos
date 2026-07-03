# Phase 19F Templates and Frequency Semantics Report

Status: COMPLETE

Phase 19F adds deterministic local template and frequency semantics for custom trackers. It introduces a safe template library, template creation contracts requiring review before write, frequency rule validation, target count semantics, streak and missed-entry behavior, favorite/pinned/repeat-last preferences, and tracker readiness scoring for analytics, privacy, and dashboard placement.

## Result

- Template library is available from src/lib/custom-trackers.
- Frequency semantics are deterministic and local.
- Template creation remains a contract and does not write data.
- Streaks are blocked for on-demand trackers.
- Tracker readiness scoring exposes missing setup items.
- Analytics, privacy, and dashboard readiness are reported separately.
- No SQL migration was added.
- No runtime database call was added.
- No Carnos write behavior was added.
- No UI behavior was changed.
