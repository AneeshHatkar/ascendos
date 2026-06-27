# Phase 12 Manual Smoke Checklist — Life Admin / Finance / Daily Admin

Status: Drafted for C16 verification.

## Scope

This checklist verifies the Phase 12 Life Admin + Finance + Daily Admin Queue read-only dashboard suite.

Routes:

- `/life-admin`
- `/finance`
- `/documents`
- `/housing`
- `/command`
- `/calendar`

## Pre-checks

- Run `npm run audit:phase12`.
- Run `npm run check`.
- Confirm no uncommitted SQL migration was added.
- Confirm no write helper was added for admin or finance records.
- Confirm no browser Supabase mutation was added.
- Confirm no bank sync, payment, document upload, OCR, housing outreach, Python/ML execution, or autonomous Carnos write path was added.

## Route smoke checks

### `/life-admin`

Expected:

- Authenticated dashboard shell renders.
- Life Admin Dashboard renders.
- Daily Admin Queue visibility renders.
- Finance, document, subscription, and housing admin summaries render.
- Proposed-action preview cards render as disabled preview-only UI.
- Read-only boundary language is visible.
- No save, cancel, edit, execute, payment, upload, outreach, or Carnos execution behavior is wired.

### `/finance`

Expected:

- Authenticated dashboard shell renders.
- Finance Dashboard renders.
- Manual account, budget, income, expense, rent, utility, bill, and subscription visibility renders where data exists.
- Finance privacy warning is visible.
- Read-only finance boundary is visible.
- No bank sync exists.
- No auto-pay exists.
- No tax advice exists.
- No SQL write behavior exists.

### `/documents`

Expected:

- Authenticated dashboard shell renders.
- Documents Dashboard renders.
- Document metadata, status, deadline, renewal, expiration, and stored-location visibility renders where data exists.
- Read-only document boundary is visible.
- No document upload exists.
- No file storage behavior exists.
- No OCR behavior exists.
- No legal or immigration advice exists.

### `/housing`

Expected:

- Authenticated dashboard shell renders.
- Housing Dashboard renders.
- Current housing admin, rent, lease, utility, maintenance, deposit, and housing-contact visibility renders where data exists.
- UI language treats housing as current rent/lease/admin tracking.
- No apartment-search-first workflow is shown.
- No apartment comparison workflow is shown.
- No housing scraping exists.
- No automated contact outreach exists.

### `/command`

Expected:

- Authenticated dashboard shell renders.
- Command Dashboard renders.
- Admin and finance command visibility section renders.
- Daily Admin Queue pressure is visible.
- Overdue finance, subscription, document, and housing pressure is visible.
- Due-soon subscription, document, and housing visibility is present.
- Command visibility is read-only.
- No proposal persistence or execution is wired from Command.

### `/calendar`

Expected:

- Authenticated dashboard shell renders.
- Calendar Dashboard renders.
- Admin and finance calendar visibility section renders.
- Planned/pending finance record visibility is present.
- Upcoming subscription visibility is present.
- Expiring document visibility is present.
- Housing follow-up visibility is present.
- Calendar visibility is read-only.
- No calendar write, external sync, payment, upload, outreach, or Carnos execution is wired.

## Empty-state checks

Expected:

- Empty panels explain that no matching admin/finance/document/housing records exist yet.
- Empty panels do not imply system failure.
- Empty panels do not trigger automatic record creation.
- Empty states do not write to SQL.

## Error-state checks

Expected:

- Read warnings show inline.
- Errors do not trigger automatic retries.
- Errors do not trigger writes, uploads, emails, payments, scraping, Python/ML execution, or Carnos execution.

## Proposed-action preview checks

Expected:

- ProposedActionReviewCard appears only as disabled preview UI.
- Save / Confirm is unavailable.
- Cancel is unavailable.
- Edit payload is unavailable.
- No callback is wired for persistence.
- No proposal is saved from the dashboard.
- No proposal is executed from the dashboard.

## Privacy and safety checks

Expected:

- Finance data is treated as private.
- Document metadata is treated as private.
- Housing admin data is treated as private.
- No bank sync exists.
- No payment execution exists.
- No document file upload/storage exists.
- No OCR exists.
- No legal, tax, or immigration advice exists.
- No automated email or housing contact outreach exists.
- No autonomous Carnos write exists.

## No write behavior

Forbidden:

- direct SQL writes from dashboards
- browser Supabase mutations
- admin/finance write helper
- autonomous Carnos writes
- Python/ML execution
- background jobs
- bank sync
- auto-pay
- document upload/storage
- OCR
- external apartment scraping
- automated housing contact outreach
- legal advice
- tax advice
- immigration advice

## Final manual smoke result

Manual browser smoke testing is ready for Phase 12.

The implemented route surfaces are expected to remain read-only, source-traced, privacy-bounded, and safe-write-law compliant.
