import {
  listAdminFinanceReminders,
  listBudgetCategories,
  listFinancialAccounts,
  listFinancialLogs,
  listHousingContacts,
  listHousingOptions,
  listLifeAdminDocuments,
  listSubscriptions,
} from "@/lib/repositories";

import type {
  BudgetCategoryRow,
  FinancialAccountRow,
  FinancialLogRow,
  HousingContactRow,
  HousingOptionRow,
  LifeAdminDocumentRow,
  SubscriptionRow,
} from "@/types/database";
import type { ReminderRow } from "@/lib/repositories/calendar-routine-read";

export interface AdminFinanceDashboardSummary {
  financial_account_count: number;
  active_financial_account_count: number;
  budget_category_count: number;
  active_budget_category_count: number;
  financial_log_count: number;
  income_log_count: number;
  expense_log_count: number;
  rent_log_count: number;
  utility_log_count: number;
  bill_log_count: number;
  subscription_log_count: number;
  recorded_finance_total: number;
  planned_or_pending_finance_count: number;
  paid_finance_count: number;
  overdue_finance_count: number;
  subscription_count: number;
  active_subscription_count: number;
  upcoming_subscription_count: number;
  overdue_subscription_count: number;
  document_count: number;
  active_document_count: number;
  expiring_document_count: number;
  overdue_document_count: number;
  housing_option_count: number;
  current_housing_option_count: number;
  housing_contact_count: number;
  housing_follow_up_due_count: number;
  reminder_count: number;
  pending_reminder_count: number;
  overdue_reminder_count: number;
  admin_attention_count: number;
  read_only_boundary: true;
}

export interface AdminFinanceDashboardDetailRows {
  financial_accounts: FinancialAccountRow[];
  active_financial_accounts: FinancialAccountRow[];
  budget_categories: BudgetCategoryRow[];
  active_budget_categories: BudgetCategoryRow[];
  financial_logs: FinancialLogRow[];
  planned_or_pending_financial_logs: FinancialLogRow[];
  paid_financial_logs: FinancialLogRow[];
  overdue_financial_logs: FinancialLogRow[];
  subscriptions: SubscriptionRow[];
  active_subscriptions: SubscriptionRow[];
  upcoming_subscriptions: SubscriptionRow[];
  overdue_subscriptions: SubscriptionRow[];
  documents: LifeAdminDocumentRow[];
  active_documents: LifeAdminDocumentRow[];
  expiring_documents: LifeAdminDocumentRow[];
  overdue_documents: LifeAdminDocumentRow[];
  housing_options: HousingOptionRow[];
  current_housing_options: HousingOptionRow[];
  housing_contacts: HousingContactRow[];
  housing_follow_ups_due: HousingContactRow[];
  reminders: ReminderRow[];
  pending_reminders: ReminderRow[];
  overdue_reminders: ReminderRow[];
}

export interface AdminFinanceDashboardDataResult {
  summary: AdminFinanceDashboardSummary;
  generated_at: string;
  source_tables: string[];
  warnings: string[];
  detail_rows: AdminFinanceDashboardDetailRows;
}

const DEFAULT_SUMMARY_LIMIT = 100;
const UPCOMING_WINDOW_DAYS = 14;

function asRows<T>(result: { data: T[] | null; error: string | null }): T[] {
  return result.data ?? [];
}

function collectWarning(label: string, error: string | null): string | null {
  if (!error) {
    return null;
  }

  return `${label}: ${error}`;
}

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function parseDateOnly(value: string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const candidate = new Date(value);
  if (Number.isNaN(candidate.getTime())) {
    return null;
  }

  candidate.setHours(0, 0, 0, 0);
  return candidate;
}

function isDueTodayOrEarlier(value: string | null | undefined): boolean {
  const candidate = parseDateOnly(value);

  if (!candidate) {
    return false;
  }

  return candidate.getTime() <= startOfToday().getTime();
}

function isWithinUpcomingWindow(value: string | null | undefined): boolean {
  const candidate = parseDateOnly(value);

  if (!candidate) {
    return false;
  }

  const today = startOfToday();
  const cutoff = startOfToday();
  cutoff.setDate(cutoff.getDate() + UPCOMING_WINDOW_DAYS);

  return (
    candidate.getTime() >= today.getTime() &&
    candidate.getTime() <= cutoff.getTime()
  );
}

function sumAmounts(rows: FinancialLogRow[]): number {
  return rows.reduce((total, row) => total + Number(row.amount ?? 0), 0);
}

export async function getAdminFinanceDashboardDataSummary(
  userId: string,
): Promise<AdminFinanceDashboardDataResult> {
  const [
    financialAccounts,
    activeFinancialAccounts,
    budgetCategories,
    activeBudgetCategories,
    financialLogs,
    subscriptions,
    activeSubscriptions,
    documents,
    activeDocuments,
    housingOptions,
    currentHousingOptions,
    housingContacts,
    reminders,
    pendingReminders,
  ] = await Promise.all([
    listFinancialAccounts(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listFinancialAccounts(userId, {
      active: true,
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listBudgetCategories(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listBudgetCategories(userId, {
      active: true,
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listFinancialLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listSubscriptions(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listSubscriptions(userId, {
      paymentStatus: "active",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listLifeAdminDocuments(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listLifeAdminDocuments(userId, {
      status: "active",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listHousingOptions(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listHousingOptions(userId, {
      housingStatus: "current",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listHousingContacts(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listAdminFinanceReminders(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listAdminFinanceReminders(userId, {
      status: "pending",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
  ]);

  const accountRows = asRows(financialAccounts);
  const activeAccountRows = asRows(activeFinancialAccounts);
  const categoryRows = asRows(budgetCategories);
  const activeCategoryRows = asRows(activeBudgetCategories);
  const financeRows = asRows(financialLogs);
  const subscriptionRows = asRows(subscriptions);
  const activeSubscriptionRows = asRows(activeSubscriptions);
  const documentRows = asRows(documents);
  const activeDocumentRows = asRows(activeDocuments);
  const housingRows = asRows(housingOptions);
  const currentHousingRows = asRows(currentHousingOptions);
  const contactRows = asRows(housingContacts);
  const reminderRows = asRows(reminders);
  const pendingReminderRows = asRows(pendingReminders);

  const plannedOrPendingFinanceRows = financeRows.filter((item) =>
    ["planned", "pending"].includes(item.payment_status),
  );
  const paidFinanceRows = financeRows.filter((item) =>
    ["recorded", "paid"].includes(item.payment_status),
  );
  const overdueFinanceRows = financeRows.filter(
    (item) => item.payment_status === "overdue",
  );

  const upcomingSubscriptionRows = subscriptionRows.filter((item) =>
    isWithinUpcomingWindow(item.next_due_date),
  );
  const overdueSubscriptionRows = subscriptionRows.filter(
    (item) => item.payment_status === "overdue",
  );

  const expiringDocumentRows = documentRows.filter(
    (item) =>
      isWithinUpcomingWindow(item.expires_on) ||
      isWithinUpcomingWindow(item.renewal_due_on),
  );
  const overdueDocumentRows = documentRows.filter(
    (item) =>
      item.status === "expired" ||
      isDueTodayOrEarlier(item.expires_on) ||
      isDueTodayOrEarlier(item.renewal_due_on),
  );

  const housingFollowUpRows = contactRows.filter((item) =>
    isDueTodayOrEarlier(item.next_follow_up_on),
  );

  const overdueReminderRows = reminderRows.filter((item) =>
    item.status === "pending" && isDueTodayOrEarlier(item.remind_at),
  );

  const warnings = [
    collectWarning("financial_accounts", financialAccounts.error),
    collectWarning("active_financial_accounts", activeFinancialAccounts.error),
    collectWarning("budget_categories", budgetCategories.error),
    collectWarning("active_budget_categories", activeBudgetCategories.error),
    collectWarning("financial_logs", financialLogs.error),
    collectWarning("subscriptions", subscriptions.error),
    collectWarning("active_subscriptions", activeSubscriptions.error),
    collectWarning("documents", documents.error),
    collectWarning("active_documents", activeDocuments.error),
    collectWarning("housing_options", housingOptions.error),
    collectWarning("current_housing_options", currentHousingOptions.error),
    collectWarning("housing_contacts", housingContacts.error),
    collectWarning("reminders", reminders.error),
    collectWarning("pending_reminders", pendingReminders.error),
  ].filter((warning): warning is string => warning !== null);

  const adminAttentionCount =
    plannedOrPendingFinanceRows.length +
    overdueFinanceRows.length +
    upcomingSubscriptionRows.length +
    overdueSubscriptionRows.length +
    expiringDocumentRows.length +
    overdueDocumentRows.length +
    housingFollowUpRows.length +
    overdueReminderRows.length;

  return {
    generated_at: new Date().toISOString(),
    source_tables: [
      "financial_accounts",
      "budget_categories",
      "financial_logs",
      "subscriptions",
      "documents",
      "housing_options",
      "housing_contacts",
    "reminders",
    ],
    warnings,
    detail_rows: {
      financial_accounts: accountRows,
      active_financial_accounts: activeAccountRows,
      budget_categories: categoryRows,
      active_budget_categories: activeCategoryRows,
      financial_logs: financeRows,
      planned_or_pending_financial_logs: plannedOrPendingFinanceRows,
      paid_financial_logs: paidFinanceRows,
      overdue_financial_logs: overdueFinanceRows,
      subscriptions: subscriptionRows,
      active_subscriptions: activeSubscriptionRows,
      upcoming_subscriptions: upcomingSubscriptionRows,
      overdue_subscriptions: overdueSubscriptionRows,
      documents: documentRows,
      active_documents: activeDocumentRows,
      expiring_documents: expiringDocumentRows,
      overdue_documents: overdueDocumentRows,
      housing_options: housingRows,
      current_housing_options: currentHousingRows,
      housing_contacts: contactRows,
      housing_follow_ups_due: housingFollowUpRows,
      reminders: reminderRows,
      pending_reminders: pendingReminderRows,
      overdue_reminders: overdueReminderRows,
    },
    summary: {
      financial_account_count: accountRows.length,
      active_financial_account_count: activeAccountRows.length,
      budget_category_count: categoryRows.length,
      active_budget_category_count: activeCategoryRows.length,
      financial_log_count: financeRows.length,
      income_log_count: financeRows.filter((item) => item.log_type === "income")
        .length,
      expense_log_count: financeRows.filter(
        (item) => item.log_type === "expense",
      ).length,
      rent_log_count: financeRows.filter((item) => item.log_type === "rent")
        .length,
      utility_log_count: financeRows.filter(
        (item) => item.log_type === "utility",
      ).length,
      bill_log_count: financeRows.filter((item) => item.log_type === "bill")
        .length,
      subscription_log_count: financeRows.filter(
        (item) => item.log_type === "subscription",
      ).length,
      recorded_finance_total: sumAmounts(paidFinanceRows),
      planned_or_pending_finance_count: plannedOrPendingFinanceRows.length,
      paid_finance_count: paidFinanceRows.length,
      overdue_finance_count: overdueFinanceRows.length,
      subscription_count: subscriptionRows.length,
      active_subscription_count: activeSubscriptionRows.length,
      upcoming_subscription_count: upcomingSubscriptionRows.length,
      overdue_subscription_count: overdueSubscriptionRows.length,
      document_count: documentRows.length,
      active_document_count: activeDocumentRows.length,
      expiring_document_count: expiringDocumentRows.length,
      overdue_document_count: overdueDocumentRows.length,
      housing_option_count: housingRows.length,
      current_housing_option_count: currentHousingRows.length,
      housing_contact_count: contactRows.length,
      housing_follow_up_due_count: housingFollowUpRows.length,
      reminder_count: reminderRows.length,
      pending_reminder_count: pendingReminderRows.length,
      overdue_reminder_count: overdueReminderRows.length,
      admin_attention_count: adminAttentionCount,
      read_only_boundary: true,
    },
  };
}
