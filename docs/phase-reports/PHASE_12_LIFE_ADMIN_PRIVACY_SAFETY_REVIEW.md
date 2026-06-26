# Phase 12 — Life Admin / Finance / Documents Privacy and Safety Review

Status: Locked before SQL.

## Covered step

- 12.13 Write finance/document privacy and safety review.

## Sensitive modules

Phase 12 touches sensitive life data:

- finance
- documents
- visa/work authorization metadata
- housing/rent
- deadlines
- personal admin status

## Privacy boundaries

Phase 12 must not expose private admin data casually.

Dashboards must clearly indicate:

- read-only status
- privacy-sensitive finance/document data
- no external sync
- no automatic payment or submission
- no legal/tax/immigration advice

## Finance safety boundary

Phase 12 can show:

- manually recorded income
- manually recorded expenses
- budgets
- rent
- subscriptions
- bills
- due dates
- monthly totals
- unpaid/overdue states

Phase 12 must not provide:

- investment advice
- tax advice
- legal advice
- loan advice
- credit advice
- immigration financial advice
- bank sync
- automatic payments
- external account connection

## Documents safety boundary

Phase 12 can show:

- document metadata
- expiration dates
- renewal dates
- stored-location notes
- status
- related tasks/events

Phase 12 must not provide:

- legal interpretation
- immigration advice
- tax filing advice
- document filing/submission automation
- file upload/storage
- hidden OCR
- background document monitoring

## Housing safety boundary

Phase 12 can show:

- rent
- utilities
- lease dates
- housing documents
- maintenance notes
- housing contacts

Phase 12 must not provide:

- legal lease advice
- apartment search as primary workflow
- external scraping
- exact address requirement
- automated contact outreach

## Carnos boundary

Carnos may explain or propose admin actions only through preview/confirmation patterns.

Carnos must not:

- silently write finance records
- silently write document records
- silently create tasks/events
- execute payments
- contact people
- submit forms
- make legal/tax/immigration decisions
- infer sensitive status beyond user-provided records

## UI boundary

Phase 12 UI components must avoid:

- `.insert(`
- `.update(`
- `.delete(`
- `.upsert(`
- browser Supabase mutation
- direct SQL writes
- OpenAI calls
- background jobs
- timers
- fetch-based external integrations

## Safe wording

Use language such as:

- “read-only”
- “manual tracking”
- “not legal advice”
- “not tax advice”
- “not immigration advice”
- “no bank sync”
- “no auto-pay”
- “metadata only”
- “user confirmation required”

Avoid language such as:

- “we will pay”
- “we filed”
- “legally required”
- “tax optimization”
- “guaranteed”
- “approved”
- “immigration-safe”
- “automatically submitted”

## C03 conclusion

Phase 12 is safe to proceed to SQL only if the SQL implements RLS, owner-only records, parent ownership guards, and keeps the dashboards read-only until an explicitly approved safe-write flow is added.
