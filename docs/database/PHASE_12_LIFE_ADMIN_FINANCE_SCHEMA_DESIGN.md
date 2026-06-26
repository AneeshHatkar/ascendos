# Phase 12 — Life Admin + Finance Schema Design

Status: Locked design before SQL.

## Covered steps

- 12.7 Design Life Admin + Finance schema.
- 12.8 Design income and expense model.
- 12.9 Design rent, bills, utilities, subscriptions model.
- 12.10 Design document metadata/deadline model.
- 12.11 Design daily admin queue model.
- 12.12 Design due-soon / overdue / critical severity logic.

## Source basis

The FINAL_SYNCED JSON identifies the Life Admin / Finance / Housing / Documents source area through these dashboards and routes:

- Life Admin Dashboard — `/life-admin`
- Finance Dashboard — `/finance`
- Housing Dashboard — `/housing`
- Visa / Documents Dashboard — `/documents`

Source-confirmed tables for this area:

- `housing_options`
- `housing_contacts`
- `financial_accounts`
- `financial_logs`
- `subscriptions`
- `budget_categories`
- `documents`

## User-specific correction

The source treats housing as a housing search CRM. The user clarified they already have housing.

Therefore Phase 12 uses the housing source area as housing administration:

- rent
- lease metadata
- utilities
- maintenance notes
- roommate/shared-cost notes if needed
- housing documents

Phase 12 must not make apartment search the primary workflow.

## Design principle

Phase 12 remains SQL-backed, user-owned, RLS-protected, read-first, and dashboard-safe.

Carnos may propose future actions through the existing proposed-action pattern, but Phase 12 dashboards must not directly create, update, delete, upsert, or execute database writes.

## Proposed SQL tables

### 1. `financial_accounts`

Purpose: Stores manual financial account summaries without bank sync.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `name text not null`
- `account_type text`
- `institution_name text`
- `currency text default 'USD'`
- `current_balance numeric`
- `is_active boolean default true`
- `privacy_level text default 'private'`
- `notes text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Boundary:

- No bank sync.
- No external account connection.
- No investment/financial advice.

### 2. `budget_categories`

Purpose: Stores manual budget categories for expenses, income, rent, utilities, subscriptions, savings, and admin costs.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `name text not null`
- `category_type text`
- `monthly_target numeric`
- `currency text default 'USD'`
- `is_active boolean default true`
- `sort_order integer default 0`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Suggested category types:

- `income`
- `expense`
- `rent`
- `utility`
- `subscription`
- `savings`
- `debt`
- `admin`
- `other`

### 3. `financial_logs`

Purpose: Stores manual income and expense records.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `account_id uuid references financial_accounts(id)`
- `budget_category_id uuid references budget_categories(id)`
- `log_type text not null`
- `title text not null`
- `amount numeric not null`
- `currency text default 'USD'`
- `occurred_on date not null`
- `payment_status text default 'recorded'`
- `merchant_or_source text`
- `notes text`
- `related_task_id uuid references tasks(id)`
- `related_event_id uuid references events(id)`
- `source_ai_action_id uuid references ai_actions(id)`
- `source_chat_message_id uuid references chat_messages(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Suggested `log_type` values:

- `income`
- `expense`
- `rent`
- `utility`
- `subscription`
- `bill`
- `refund`
- `transfer`
- `adjustment`
- `other`

Suggested `payment_status` values:

- `planned`
- `due`
- `paid`
- `overdue`
- `recorded`
- `cancelled`

### 4. `subscriptions`

Purpose: Stores recurring subscriptions and recurring payments.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `budget_category_id uuid references budget_categories(id)`
- `name text not null`
- `provider text`
- `amount numeric`
- `currency text default 'USD'`
- `billing_cycle text`
- `next_due_date date`
- `payment_status text default 'active'`
- `auto_renew boolean default false`
- `cancel_by_date date`
- `notes text`
- `related_task_id uuid references tasks(id)`
- `related_event_id uuid references events(id)`
- `source_ai_action_id uuid references ai_actions(id)`
- `source_chat_message_id uuid references chat_messages(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Suggested `billing_cycle` values:

- `weekly`
- `monthly`
- `quarterly`
- `yearly`
- `custom`

Boundary:

- Tracks subscriptions only.
- Does not cancel subscriptions automatically.
- Does not connect to external providers.

### 5. `housing_options`

Purpose: Source-aligned table retained, but Phase 12 uses it for current housing/rent/lease administration.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `label text not null`
- `housing_status text default 'current'`
- `address_label text`
- `rent_amount numeric`
- `currency text default 'USD'`
- `rent_due_day integer`
- `lease_start_date date`
- `lease_end_date date`
- `deposit_amount numeric`
- `utilities_notes text`
- `maintenance_notes text`
- `roommate_notes text`
- `pros_cons_json jsonb default '{}'::jsonb`
- `notes text`
- `related_document_id uuid references documents(id)`
- `related_task_id uuid references tasks(id)`
- `related_event_id uuid references events(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Boundary:

- No apartment search as the primary Phase 12 experience.
- No scraping.
- No lease/legal advice.
- Address field should be a label or partial description, not forced precise address storage.

### 6. `housing_contacts`

Purpose: Stores contacts related to current housing administration if needed.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `housing_option_id uuid references housing_options(id)`
- `name text not null`
- `role text`
- `contact_notes text`
- `preferred_contact_method text`
- `last_contacted_on date`
- `next_follow_up_on date`
- `related_task_id uuid references tasks(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Boundary:

- No automated outreach.
- No external messaging.
- No hidden contact syncing.

### 7. `documents`

Purpose: Stores document metadata and deadline tracking only.

Fields:

- `id uuid primary key`
- `user_id uuid not null references auth.users(id)`
- `title text not null`
- `document_type text`
- `status text default 'active'`
- `issuing_body text`
- `stored_location text`
- `issued_on date`
- `expires_on date`
- `renewal_due_on date`
- `review_on date`
- `sensitivity text default 'private'`
- `notes text`
- `related_task_id uuid references tasks(id)`
- `related_event_id uuid references events(id)`
- `source_ai_action_id uuid references ai_actions(id)`
- `source_chat_message_id uuid references chat_messages(id)`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Suggested document types:

- `passport`
- `visa`
- `i20`
- `opt`
- `ead`
- `license`
- `insurance`
- `lease`
- `school`
- `career`
- `tax_metadata`
- `other`

Boundary:

- Metadata only.
- No file upload in Phase 12.
- No legal or immigration advice.
- No tax advice.

## Daily Admin Queue design

Phase 12 does not need a separate queue table unless C04 reveals a real schema gap.

The Daily Admin Queue should aggregate from:

- `tasks`
- `events`
- `financial_logs`
- `subscriptions`
- `housing_options`
- `documents`

Queue item types:

- task due today
- overdue task
- bill due
- rent due
- subscription due
- document expiration
- document renewal
- housing follow-up
- calendar-linked admin event

Queue item fields at helper/UI level:

- `id`
- `source_table`
- `source_id`
- `title`
- `description`
- `due_date`
- `status`
- `severity`
- `route`
- `domain`
- `is_overdue`
- `days_until_due`

## Severity logic

Suggested helper-level severity:

### `critical`

- overdue document with high sensitivity
- overdue bill/rent
- due today and marked important
- deadline within 0 days

### `high`

- due within 1–3 days
- unpaid bill/rent due soon
- important document renewal approaching

### `medium`

- due within 4–14 days
- subscription or recurring payment due soon
- document review upcoming

### `low`

- due after 14 days
- informational/admin reminder
- no due date but useful context

## Dashboard read model

Phase 12 dashboard helpers should produce:

- finance monthly totals
- income total
- expense total
- rent due visibility
- subscription due visibility
- overdue item count
- due soon item count
- document deadline count
- daily admin queue items
- privacy/safety flags
- source table list
- read-only boundary text

## Index plan

Expected indexes:

- user/date indexes on all date-bearing tables
- `user_id`
- `occurred_on`
- `next_due_date`
- `expires_on`
- `renewal_due_on`
- `lease_end_date`
- `related_task_id`
- `related_event_id`
- `source_ai_action_id`
- `source_chat_message_id`

## RLS plan

Every Phase 12 table must:

- enable row level security
- allow select only for the owning authenticated user
- allow insert/update/delete only for owning authenticated user if future write flows are enabled
- avoid public access
- avoid service assumptions in client code

## Parent ownership guard plan

Parent ownership guards are required for nullable links to:

- `tasks`
- `events`
- `ai_actions`
- `chat_messages`
- `documents`
- `housing_options`
- `financial_accounts`
- `budget_categories`

Parent ownership guards must reject cross-user parent links before insert/update.

## Deferred schema

Do not add these in Phase 12:

- `document_files`
- `bank_connections`
- `payment_methods`
- `autopay_rules`
- `tax_filings`
- `legal_cases`
- `wardrobe_items`
- `outfits`
- `style_wishlist_items`
- `relationship_contacts`
- `home_inventory`
- `media_items`

## Completion criteria for C03

C03 is complete when this design exists, privacy/safety review exists, source-to-scope traceability exists, logs are updated, formatting passes, full check passes, and the docs-only commit is pushed.
