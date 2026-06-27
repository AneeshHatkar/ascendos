-- Phase 12 — Life Admin + Finance SQL Foundation
-- Scope: C04 / Steps 12.15–12.17
--
-- Adds source-aligned Phase 12 tables:
-- - financial_accounts
-- - budget_categories
-- - financial_logs
-- - subscriptions
-- - documents
-- - housing_options
-- - housing_contacts
--
-- Boundaries:
-- - No bank sync.
-- - No auto-pay.
-- - No tax/legal/immigration advice automation.
-- - No document upload/OCR/storage.
-- - No autonomous Carnos writes.
-- - No parent ownership guards in this migration; those belong to C05.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.financial_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  account_type text not null default 'other',
  institution_name text,
  currency text not null default 'USD',
  current_balance numeric(14, 2),
  is_active boolean not null default true,
  privacy_level text not null default 'private',
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint financial_accounts_name_not_blank check (length(trim(name)) > 0),
  constraint financial_accounts_account_type_allowed check (
    account_type in (
      'checking',
      'savings',
      'credit_card',
      'cash',
      'loan',
      'investment_manual',
      'other'
    )
  ),
  constraint financial_accounts_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint financial_accounts_privacy_level_allowed check (
    privacy_level in ('private', 'sensitive', 'locked')
  )
);

create table if not exists public.budget_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category_type text not null default 'expense',
  monthly_target numeric(14, 2),
  currency text not null default 'USD',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint budget_categories_name_not_blank check (length(trim(name)) > 0),
  constraint budget_categories_category_type_allowed check (
    category_type in (
      'income',
      'expense',
      'savings',
      'debt',
      'rent',
      'utility',
      'subscription',
      'other'
    )
  ),
  constraint budget_categories_monthly_target_nonnegative check (
    monthly_target is null or monthly_target >= 0
  ),
  constraint budget_categories_currency_format check (currency ~ '^[A-Z]{3}$')
);

create table if not exists public.financial_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references public.financial_accounts(id) on delete set null,
  budget_category_id uuid references public.budget_categories(id) on delete set null,
  log_type text not null,
  title text not null,
  amount numeric(14, 2) not null,
  currency text not null default 'USD',
  occurred_on date not null default current_date,
  payment_status text not null default 'recorded',
  merchant_or_source text,
  notes text,
  related_task_id uuid references public.tasks(id) on delete set null,
  related_event_id uuid references public.events(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint financial_logs_title_not_blank check (length(trim(title)) > 0),
  constraint financial_logs_log_type_allowed check (
    log_type in (
      'income',
      'expense',
      'rent',
      'utility',
      'bill',
      'subscription',
      'savings',
      'debt_payment',
      'refund',
      'transfer',
      'adjustment',
      'other'
    )
  ),
  constraint financial_logs_amount_nonnegative check (amount >= 0),
  constraint financial_logs_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint financial_logs_payment_status_allowed check (
    payment_status in (
      'planned',
      'pending',
      'recorded',
      'paid',
      'overdue',
      'cancelled',
      'skipped'
    )
  )
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  budget_category_id uuid references public.budget_categories(id) on delete set null,
  name text not null,
  provider text,
  amount numeric(14, 2) not null,
  currency text not null default 'USD',
  billing_cycle text not null default 'monthly',
  next_due_date date,
  payment_status text not null default 'active',
  auto_renew boolean not null default false,
  cancel_by_date date,
  notes text,
  related_task_id uuid references public.tasks(id) on delete set null,
  related_event_id uuid references public.events(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint subscriptions_name_not_blank check (length(trim(name)) > 0),
  constraint subscriptions_amount_nonnegative check (amount >= 0),
  constraint subscriptions_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint subscriptions_billing_cycle_allowed check (
    billing_cycle in (
      'weekly',
      'biweekly',
      'monthly',
      'quarterly',
      'semiannual',
      'annual',
      'one_time',
      'other'
    )
  ),
  constraint subscriptions_payment_status_allowed check (
    payment_status in (
      'active',
      'trial',
      'pending',
      'paid',
      'overdue',
      'cancelled',
      'paused',
      'unknown'
    )
  )
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  document_type text not null default 'other',
  status text not null default 'active',
  issuing_body text,
  stored_location text,
  issued_on date,
  expires_on date,
  renewal_due_on date,
  review_on date,
  sensitivity text not null default 'private',
  notes text,
  related_task_id uuid references public.tasks(id) on delete set null,
  related_event_id uuid references public.events(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  source_chat_message_id uuid references public.chat_messages(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint documents_title_not_blank check (length(trim(title)) > 0),
  constraint documents_document_type_allowed check (
    document_type in (
      'id',
      'passport',
      'visa',
      'work_authorization',
      'school',
      'career',
      'housing',
      'finance',
      'tax_metadata_only',
      'medical_metadata_only',
      'insurance',
      'other'
    )
  ),
  constraint documents_status_allowed check (
    status in (
      'active',
      'expired',
      'renewal_needed',
      'missing',
      'archived',
      'unknown'
    )
  ),
  constraint documents_sensitivity_allowed check (
    sensitivity in ('private', 'sensitive', 'locked')
  )
);

create table if not exists public.housing_options (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  housing_status text not null default 'current',
  address_label text,
  rent_amount numeric(14, 2),
  currency text not null default 'USD',
  rent_due_day integer,
  lease_start_date date,
  lease_end_date date,
  deposit_amount numeric(14, 2),
  utilities_notes text,
  maintenance_notes text,
  roommate_notes text,
  pros_cons_json jsonb not null default '{}'::jsonb,
  notes text,
  related_document_id uuid references public.documents(id) on delete set null,
  related_task_id uuid references public.tasks(id) on delete set null,
  related_event_id uuid references public.events(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint housing_options_label_not_blank check (length(trim(label)) > 0),
  constraint housing_options_status_allowed check (
    housing_status in (
      'current',
      'past',
      'future',
      'backup',
      'research_only',
      'archived'
    )
  ),
  constraint housing_options_rent_nonnegative check (
    rent_amount is null or rent_amount >= 0
  ),
  constraint housing_options_deposit_nonnegative check (
    deposit_amount is null or deposit_amount >= 0
  ),
  constraint housing_options_currency_format check (currency ~ '^[A-Z]{3}$'),
  constraint housing_options_rent_due_day_valid check (
    rent_due_day is null or (rent_due_day >= 1 and rent_due_day <= 31)
  )
);

create table if not exists public.housing_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  housing_option_id uuid references public.housing_options(id) on delete cascade,
  name text not null,
  role text not null default 'other',
  contact_notes text,
  preferred_contact_method text,
  last_contacted_on date,
  next_follow_up_on date,
  related_task_id uuid references public.tasks(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint housing_contacts_name_not_blank check (length(trim(name)) > 0),
  constraint housing_contacts_role_allowed check (
    role in (
      'landlord',
      'property_manager',
      'roommate',
      'utility_provider',
      'maintenance',
      'broker',
      'other'
    )
  )
);

drop trigger if exists financial_accounts_set_updated_at on public.financial_accounts;
create trigger financial_accounts_set_updated_at
before update on public.financial_accounts
for each row execute function public.set_updated_at();

drop trigger if exists budget_categories_set_updated_at on public.budget_categories;
create trigger budget_categories_set_updated_at
before update on public.budget_categories
for each row execute function public.set_updated_at();

drop trigger if exists financial_logs_set_updated_at on public.financial_logs;
create trigger financial_logs_set_updated_at
before update on public.financial_logs
for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

drop trigger if exists documents_set_updated_at on public.documents;
create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

drop trigger if exists housing_options_set_updated_at on public.housing_options;
create trigger housing_options_set_updated_at
before update on public.housing_options
for each row execute function public.set_updated_at();

drop trigger if exists housing_contacts_set_updated_at on public.housing_contacts;
create trigger housing_contacts_set_updated_at
before update on public.housing_contacts
for each row execute function public.set_updated_at();

create index if not exists financial_accounts_user_id_idx on public.financial_accounts(user_id);
create index if not exists financial_accounts_active_idx on public.financial_accounts(user_id, is_active);

create index if not exists budget_categories_user_id_idx on public.budget_categories(user_id);
create index if not exists budget_categories_active_idx on public.budget_categories(user_id, is_active);
create index if not exists budget_categories_type_idx on public.budget_categories(user_id, category_type);

create index if not exists financial_logs_user_id_idx on public.financial_logs(user_id);
create index if not exists financial_logs_occurred_on_idx on public.financial_logs(user_id, occurred_on desc);
create index if not exists financial_logs_type_idx on public.financial_logs(user_id, log_type);
create index if not exists financial_logs_account_id_idx on public.financial_logs(account_id);
create index if not exists financial_logs_budget_category_id_idx on public.financial_logs(budget_category_id);
create index if not exists financial_logs_related_task_id_idx on public.financial_logs(related_task_id);
create index if not exists financial_logs_related_event_id_idx on public.financial_logs(related_event_id);
create index if not exists financial_logs_source_ai_action_id_idx on public.financial_logs(source_ai_action_id);
create index if not exists financial_logs_source_chat_message_id_idx on public.financial_logs(source_chat_message_id);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_next_due_date_idx on public.subscriptions(user_id, next_due_date);
create index if not exists subscriptions_cancel_by_date_idx on public.subscriptions(user_id, cancel_by_date);
create index if not exists subscriptions_payment_status_idx on public.subscriptions(user_id, payment_status);
create index if not exists subscriptions_budget_category_id_idx on public.subscriptions(budget_category_id);
create index if not exists subscriptions_related_task_id_idx on public.subscriptions(related_task_id);
create index if not exists subscriptions_related_event_id_idx on public.subscriptions(related_event_id);
create index if not exists subscriptions_source_ai_action_id_idx on public.subscriptions(source_ai_action_id);
create index if not exists subscriptions_source_chat_message_id_idx on public.subscriptions(source_chat_message_id);

create index if not exists documents_user_id_idx on public.documents(user_id);
create index if not exists documents_expires_on_idx on public.documents(user_id, expires_on);
create index if not exists documents_renewal_due_on_idx on public.documents(user_id, renewal_due_on);
create index if not exists documents_review_on_idx on public.documents(user_id, review_on);
create index if not exists documents_type_idx on public.documents(user_id, document_type);
create index if not exists documents_status_idx on public.documents(user_id, status);
create index if not exists documents_related_task_id_idx on public.documents(related_task_id);
create index if not exists documents_related_event_id_idx on public.documents(related_event_id);
create index if not exists documents_source_ai_action_id_idx on public.documents(source_ai_action_id);
create index if not exists documents_source_chat_message_id_idx on public.documents(source_chat_message_id);

create index if not exists housing_options_user_id_idx on public.housing_options(user_id);
create index if not exists housing_options_status_idx on public.housing_options(user_id, housing_status);
create index if not exists housing_options_lease_end_date_idx on public.housing_options(user_id, lease_end_date);
create index if not exists housing_options_related_document_id_idx on public.housing_options(related_document_id);
create index if not exists housing_options_related_task_id_idx on public.housing_options(related_task_id);
create index if not exists housing_options_related_event_id_idx on public.housing_options(related_event_id);

create index if not exists housing_contacts_user_id_idx on public.housing_contacts(user_id);
create index if not exists housing_contacts_housing_option_id_idx on public.housing_contacts(housing_option_id);
create index if not exists housing_contacts_next_follow_up_on_idx on public.housing_contacts(user_id, next_follow_up_on);
create index if not exists housing_contacts_related_task_id_idx on public.housing_contacts(related_task_id);

alter table public.financial_accounts enable row level security;
alter table public.budget_categories enable row level security;
alter table public.financial_logs enable row level security;
alter table public.subscriptions enable row level security;
alter table public.documents enable row level security;
alter table public.housing_options enable row level security;
alter table public.housing_contacts enable row level security;

drop policy if exists financial_accounts_select_own on public.financial_accounts;
create policy financial_accounts_select_own on public.financial_accounts
for select using (auth.uid() = user_id);

drop policy if exists financial_accounts_insert_own on public.financial_accounts;
create policy financial_accounts_insert_own on public.financial_accounts
for insert with check (auth.uid() = user_id);

drop policy if exists financial_accounts_update_own on public.financial_accounts;
create policy financial_accounts_update_own on public.financial_accounts
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists financial_accounts_delete_own on public.financial_accounts;
create policy financial_accounts_delete_own on public.financial_accounts
for delete using (auth.uid() = user_id);

drop policy if exists budget_categories_select_own on public.budget_categories;
create policy budget_categories_select_own on public.budget_categories
for select using (auth.uid() = user_id);

drop policy if exists budget_categories_insert_own on public.budget_categories;
create policy budget_categories_insert_own on public.budget_categories
for insert with check (auth.uid() = user_id);

drop policy if exists budget_categories_update_own on public.budget_categories;
create policy budget_categories_update_own on public.budget_categories
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists budget_categories_delete_own on public.budget_categories;
create policy budget_categories_delete_own on public.budget_categories
for delete using (auth.uid() = user_id);

drop policy if exists financial_logs_select_own on public.financial_logs;
create policy financial_logs_select_own on public.financial_logs
for select using (auth.uid() = user_id);

drop policy if exists financial_logs_insert_own on public.financial_logs;
create policy financial_logs_insert_own on public.financial_logs
for insert with check (auth.uid() = user_id);

drop policy if exists financial_logs_update_own on public.financial_logs;
create policy financial_logs_update_own on public.financial_logs
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists financial_logs_delete_own on public.financial_logs;
create policy financial_logs_delete_own on public.financial_logs
for delete using (auth.uid() = user_id);

drop policy if exists subscriptions_select_own on public.subscriptions;
create policy subscriptions_select_own on public.subscriptions
for select using (auth.uid() = user_id);

drop policy if exists subscriptions_insert_own on public.subscriptions;
create policy subscriptions_insert_own on public.subscriptions
for insert with check (auth.uid() = user_id);

drop policy if exists subscriptions_update_own on public.subscriptions;
create policy subscriptions_update_own on public.subscriptions
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists subscriptions_delete_own on public.subscriptions;
create policy subscriptions_delete_own on public.subscriptions
for delete using (auth.uid() = user_id);

drop policy if exists documents_select_own on public.documents;
create policy documents_select_own on public.documents
for select using (auth.uid() = user_id);

drop policy if exists documents_insert_own on public.documents;
create policy documents_insert_own on public.documents
for insert with check (auth.uid() = user_id);

drop policy if exists documents_update_own on public.documents;
create policy documents_update_own on public.documents
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists documents_delete_own on public.documents;
create policy documents_delete_own on public.documents
for delete using (auth.uid() = user_id);

drop policy if exists housing_options_select_own on public.housing_options;
create policy housing_options_select_own on public.housing_options
for select using (auth.uid() = user_id);

drop policy if exists housing_options_insert_own on public.housing_options;
create policy housing_options_insert_own on public.housing_options
for insert with check (auth.uid() = user_id);

drop policy if exists housing_options_update_own on public.housing_options;
create policy housing_options_update_own on public.housing_options
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists housing_options_delete_own on public.housing_options;
create policy housing_options_delete_own on public.housing_options
for delete using (auth.uid() = user_id);

drop policy if exists housing_contacts_select_own on public.housing_contacts;
create policy housing_contacts_select_own on public.housing_contacts
for select using (auth.uid() = user_id);

drop policy if exists housing_contacts_insert_own on public.housing_contacts;
create policy housing_contacts_insert_own on public.housing_contacts
for insert with check (auth.uid() = user_id);

drop policy if exists housing_contacts_update_own on public.housing_contacts;
create policy housing_contacts_update_own on public.housing_contacts
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists housing_contacts_delete_own on public.housing_contacts;
create policy housing_contacts_delete_own on public.housing_contacts
for delete using (auth.uid() = user_id);
