# Phase 12 — Source-to-Scope Traceability

Status: Locked before SQL.

## Covered step

- 12.14 Write source-to-scope traceability report.

## Source dashboard mapping

| Source dashboard           | Source route  | Phase 12 interpretation                              |
| -------------------------- | ------------- | ---------------------------------------------------- |
| Life Admin Dashboard       | `/life-admin` | Admin overview, daily queue, documents, money        |
| Finance Dashboard          | `/finance`    | Budgets, income, expenses, subscriptions, rent       |
| Housing Dashboard          | `/housing`    | Current housing admin, rent, lease, utilities        |
| Visa / Documents Dashboard | `/documents`  | Metadata/deadlines only, no legal/immigration advice |
| Command Dashboard          | `/command`    | Urgent admin visibility                              |
| Calendar Dashboard         | `/calendar`   | Deadline/due-date visibility                         |

## Source table mapping

| Source table         | Phase 12 use                                          |
| -------------------- | ----------------------------------------------------- |
| `financial_accounts` | Manual account summaries, no bank sync                |
| `financial_logs`     | Income, expenses, bills, rent, utility logs           |
| `subscriptions`      | Recurring payments and renewals                       |
| `budget_categories`  | Budget grouping and monthly summary                   |
| `documents`          | Document metadata, deadlines, renewal dates           |
| `housing_options`    | Current housing/rent/lease admin, not search-first UX |
| `housing_contacts`   | Housing-related contacts, no automated outreach       |

## User override mapping

| Source says                  | User correction                     | Phase 12 result                                     |
| ---------------------------- | ----------------------------------- | --------------------------------------------------- |
| Housing search CRM           | User already has housing            | Housing becomes rent/lease/utilities/admin tracking |
| Track housing option         | Do not prioritize apartment hunting | Keep table/source compatibility, change UX emphasis |
| Documents and visa deadlines | Useful, but no advice               | Metadata/deadline tracker only                      |
| Finance and money dashboard  | Useful                              | Manual finance tracker only                         |
| Life Admin urgent overrides  | Useful                              | Daily Admin Queue                                   |

## Included in Phase 12

- Daily Admin Queue
- income
- expenses
- budgets
- subscriptions
- bills
- rent
- utilities
- lease metadata
- document metadata
- document deadlines
- due-soon / overdue / critical logic
- Command visibility
- Calendar visibility
- read-only dashboards
- proposed-action preview boundary

## Deferred from Phase 12

- housing search as primary workflow
- apartment comparison
- bank sync
- auto-pay
- legal advice
- tax advice
- immigration advice
- document upload/storage
- style/fashion/wardrobe
- post-v1 personal systems
- autonomous Carnos writes
- Python/ML execution
- background jobs

## Post-v1 traceability

The following user-requested systems are recorded in `docs/roadmap/POST_V1_EXPANSION_ROADMAP.md` and are not part of Phase 12:

- Phase 22 — Style / Wardrobe / Personal Aesthetic System
- Phase 23 — Daily Command / Planner v2
- Phase 24 — Relationship / Social Circle System
- Phase 25 — Home / Environment System
- Phase 26 — Personal Knowledge + Media Taste System

## C03 conclusion

Phase 12 remains aligned with FINAL_SYNCED source scope while preserving the user-specific correction that housing search is not needed as a primary workflow.
