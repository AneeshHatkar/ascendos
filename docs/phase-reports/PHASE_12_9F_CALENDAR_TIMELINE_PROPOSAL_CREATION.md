# Phase 12.9F — Calendar / Timeline Proposal Creation

Status: Complete.

## Scope

This patch closes the pre-Grimoire Calendar / Timeline honesty gap by adding proposal-first task capture to the Calendar and Timeline surfaces.

## Completed

- Added `/api/calendar/proposals`.
- Added a client proposal composer for Calendar and Timeline.
- Wired `/calendar` to create pending task proposals without direct task/event writes.
- Wired `/timeline` to create pending task proposals without direct timeline/audit/proof writes.
- Updated stale disabled-language on Calendar and Timeline pages.
- Updated the pre-Grimoire audit to verify proposal wiring instead of stale disabled claims.

## Safety boundary

This patch does not create tasks directly. It only inserts proposed actions through the existing safe-write confirmation system. Final mutation remains gated by Pending Updates approval.

## Deferred

- Real event creation remains deferred.
- Reminder scheduling remains deferred.
- Calendar sync remains deferred.
- Timeline events table implementation remains deferred; existing timeline helper still records skipped timeline writes honestly.
