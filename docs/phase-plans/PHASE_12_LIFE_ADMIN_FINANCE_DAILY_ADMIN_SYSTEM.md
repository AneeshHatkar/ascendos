# Phase 12 — Life Admin + Finance + Daily Admin Queue

Status: Locked for implementation.

## Source-of-truth basis

Phase 12 is based on the FINAL_SYNCED source-of-truth Life Admin, Finance, Housing, Documents, Command, and Calendar scope.

Source-confirmed dashboards/routes:

- `/life-admin`
- `/finance`
- `/housing`
- `/documents`
- `/command`
- `/calendar`

Source-confirmed source tables:

- `housing_options`
- `housing_contacts`
- `financial_accounts`
- `financial_logs`
- `subscriptions`
- `budget_categories`
- `documents`

## User-specific scope correction

The source-of-truth includes a housing search CRM, but the user already has housing.

Therefore Phase 12 must not build apartment search or housing-option comparison as the primary workflow.

Phase 12 reinterprets housing scope as:

- rent tracking
- lease metadata
- utility tracking
- maintenance notes
- roommate/shared-cost notes if needed
- housing documents
- rent/bill/document deadline visibility

The source table names may still be used where source-aligned, but UI language must avoid implying that the user is actively apartment hunting unless future user input changes this.

## Phase 12 goal

Build a read-only, SQL-backed Life Admin + Finance + Daily Admin Queue system that helps the user see:

- what admin items matter today
- what is overdue
- what is due soon
- what bills/rent/subscriptions need attention
- what documents have deadlines or renewals
- what finance records exist
- what should be surfaced to Command and Calendar as survival/admin priority

## Included scope

### Daily Admin Queue

- today’s admin tasks
- overdue admin tasks
- due-soon admin tasks
- custom day-specific task visibility
- bills due
- rent due
- subscription renewals
- document deadlines
- calendar-linked admin items
- Command dashboard admin visibility
- Calendar dashboard due-date visibility

### Finance

- income tracking
- expense tracking
- financial accounts
- budget categories
- financial logs
- monthly finance summary
- rent
- utilities
- bills
- subscriptions
- recurring payments
- paid/unpaid status
- due dates
- privacy warnings

### Documents

- document metadata
- document category
- status
- renewal deadline
- expiration date
- stored-location note
- related task/event/proof links where source-supported
- visa/work authorization/school/career documents as metadata only
- no legal advice

### Housing as admin/rent tracking

- rent amount
- lease start/end metadata
- utilities
- maintenance notes
- deposit notes
- roommate/shared payment notes if needed
- housing documents
- no apartment search workflow in Phase 12

## Explicitly deferred scope

Phase 12 must not implement:

- housing search CRM as the primary UX
- apartment comparison
- external apartment scraping
- bank sync
- auto-pay
- tax advice
- legal advice
- immigration advice
- document file upload/storage
- autonomous Carnos writes
- Python/ML execution
- background jobs
- direct SQL writes from dashboards
- browser Supabase mutations
- style/fashion/wardrobe features

## Fashion / wardrobe deferral

Style, wardrobe, outfits, clothing wishlist links, and personal aesthetic planning are not part of Phase 12.

They are deferred to post-v1 expansion:

- Phase 22 — Style / Wardrobe / Personal Aesthetic System

## Safe-write law

Python/ML advises. The app validates. The user confirms. The server writes. SQL records. Audit logs.

Phase 12 dashboards are read-only unless a later source-approved safe-write flow is explicitly implemented. Proposed actions may be previewed, but no dashboard may persist them directly.

## Step count

Phase 12 has 45 locked steps.

## Code chunk count

Phase 12 has 14 planned implementation chunks.

If a chunk becomes too large or risky, it must be split before commit.

## Planned chunks

1. C01 — Source inspection preflight.
2. C02 — Phase 12 plan lock and post-v1 roadmap addendum.
3. C03 — Schema design and traceability docs.
4. C04 — SQL foundation tables.
5. C05 — RLS and parent ownership guards.
6. C06 — Database types.
7. C07 — Read helpers.
8. C08 — Aggregation helpers and states.
9. C09 — Life Admin and Finance dashboards.
10. C10 — Documents and Rent/Bills panels.
11. C11 — Daily Admin Queue and cross-links.
12. C12 — Route wiring.
13. C13 — Command/Calendar visibility and proposed-action boundary.
14. C14 — Audit gate, smoke checklist, completion report.

## Acceptance criteria

Phase 12 is complete only when:

- Life Admin, Finance, Housing-as-admin, and Documents scope are source-traced.
- User override is recorded: no housing search as primary workflow.
- SQL tables are present and RLS-protected.
- Parent ownership guards exist where cross-table references exist.
- Database types are updated.
- Read helpers are server-side and read-only.
- Dashboards are route-wired.
- Daily Admin Queue exists.
- Finance summary exists.
- Rent/bill/subscription/document deadline visibility exists.
- Command/Calendar admin visibility exists.
- Proposed-action preview is disabled/non-mutating.
- Phase 12 audit gate passes.
- Full repo check passes.
- Completion report is committed and pushed.
