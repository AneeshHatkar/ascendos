import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  BudgetCategoryRow,
  FinancialAccountRow,
  FinancialLogRow,
  HousingContactRow,
  HousingOptionRow,
  LifeAdminDocumentRow,
  SubscriptionRow,
} from "@/types/database";

import type { RepositoryListResult } from "./core-read";

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

function clampLimit(limit: number | undefined): number {
  if (limit === undefined || Number.isNaN(limit)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT);
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown admin/finance repository error";
}

export async function listFinancialAccounts(
  userId: string,
  options: {
    accountType?: FinancialAccountRow["account_type"];
    privacyLevel?: FinancialAccountRow["privacy_level"];
    active?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<FinancialAccountRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("financial_accounts")
      .select("*")
      .eq("user_id", userId)
      .order("name", { ascending: true })
      .limit(limit);

    if (options.accountType) {
      query = query.eq("account_type", options.accountType as never);
    }
    if (options.privacyLevel) {
      query = query.eq("privacy_level", options.privacyLevel as never);
    }
    if (options.active !== undefined) {
      query = query.eq("is_active", options.active);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as FinancialAccountRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listBudgetCategories(
  userId: string,
  options: {
    categoryType?: BudgetCategoryRow["category_type"];
    active?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<BudgetCategoryRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("budget_categories")
      .select("*")
      .eq("user_id", userId)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .limit(limit);

    if (options.categoryType) {
      query = query.eq("category_type", options.categoryType as never);
    }
    if (options.active !== undefined) {
      query = query.eq("is_active", options.active);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as BudgetCategoryRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listFinancialLogs(
  userId: string,
  options: {
    accountId?: string;
    budgetCategoryId?: string;
    logType?: FinancialLogRow["log_type"];
    paymentStatus?: FinancialLogRow["payment_status"];
    relatedTaskId?: string;
    relatedEventId?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<FinancialLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("financial_logs")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_on", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.accountId) {
      query = query.eq("account_id", options.accountId as never);
    }
    if (options.budgetCategoryId) {
      query = query.eq("budget_category_id", options.budgetCategoryId as never);
    }
    if (options.logType) {
      query = query.eq("log_type", options.logType as never);
    }
    if (options.paymentStatus) {
      query = query.eq("payment_status", options.paymentStatus as never);
    }
    if (options.relatedTaskId) {
      query = query.eq("related_task_id", options.relatedTaskId as never);
    }
    if (options.relatedEventId) {
      query = query.eq("related_event_id", options.relatedEventId as never);
    }
    if (options.fromDate) {
      query = query.gte("occurred_on", options.fromDate as never);
    }
    if (options.toDate) {
      query = query.lte("occurred_on", options.toDate as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as FinancialLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSubscriptions(
  userId: string,
  options: {
    budgetCategoryId?: string;
    billingCycle?: SubscriptionRow["billing_cycle"];
    paymentStatus?: SubscriptionRow["payment_status"];
    dueAfter?: string;
    dueBefore?: string;
    cancelByBefore?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SubscriptionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .order("next_due_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.budgetCategoryId) {
      query = query.eq("budget_category_id", options.budgetCategoryId as never);
    }
    if (options.billingCycle) {
      query = query.eq("billing_cycle", options.billingCycle as never);
    }
    if (options.paymentStatus) {
      query = query.eq("payment_status", options.paymentStatus as never);
    }
    if (options.dueAfter) {
      query = query.gte("next_due_date", options.dueAfter as never);
    }
    if (options.dueBefore) {
      query = query.lte("next_due_date", options.dueBefore as never);
    }
    if (options.cancelByBefore) {
      query = query.lte("cancel_by_date", options.cancelByBefore as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as SubscriptionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listLifeAdminDocuments(
  userId: string,
  options: {
    documentType?: LifeAdminDocumentRow["document_type"];
    status?: LifeAdminDocumentRow["status"];
    sensitivity?: LifeAdminDocumentRow["sensitivity"];
    relatedTaskId?: string;
    relatedEventId?: string;
    expiresBefore?: string;
    renewalDueBefore?: string;
    reviewBefore?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<LifeAdminDocumentRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("renewal_due_on", { ascending: true, nullsFirst: false })
      .order("expires_on", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.documentType) {
      query = query.eq("document_type", options.documentType as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }
    if (options.sensitivity) {
      query = query.eq("sensitivity", options.sensitivity as never);
    }
    if (options.relatedTaskId) {
      query = query.eq("related_task_id", options.relatedTaskId as never);
    }
    if (options.relatedEventId) {
      query = query.eq("related_event_id", options.relatedEventId as never);
    }
    if (options.expiresBefore) {
      query = query.lte("expires_on", options.expiresBefore as never);
    }
    if (options.renewalDueBefore) {
      query = query.lte("renewal_due_on", options.renewalDueBefore as never);
    }
    if (options.reviewBefore) {
      query = query.lte("review_on", options.reviewBefore as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as LifeAdminDocumentRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listHousingOptions(
  userId: string,
  options: {
    housingStatus?: HousingOptionRow["housing_status"];
    leaseEndingBefore?: string;
    relatedDocumentId?: string;
    relatedTaskId?: string;
    relatedEventId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<HousingOptionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("housing_options")
      .select("*")
      .eq("user_id", userId)
      .order("lease_end_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.housingStatus) {
      query = query.eq("housing_status", options.housingStatus as never);
    }
    if (options.leaseEndingBefore) {
      query = query.lte("lease_end_date", options.leaseEndingBefore as never);
    }
    if (options.relatedDocumentId) {
      query = query.eq(
        "related_document_id",
        options.relatedDocumentId as never,
      );
    }
    if (options.relatedTaskId) {
      query = query.eq("related_task_id", options.relatedTaskId as never);
    }
    if (options.relatedEventId) {
      query = query.eq("related_event_id", options.relatedEventId as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as HousingOptionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listHousingContacts(
  userId: string,
  options: {
    housingOptionId?: string;
    role?: HousingContactRow["role"];
    relatedTaskId?: string;
    followUpBefore?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<HousingContactRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("housing_contacts")
      .select("*")
      .eq("user_id", userId)
      .order("next_follow_up_on", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.housingOptionId) {
      query = query.eq("housing_option_id", options.housingOptionId as never);
    }
    if (options.role) {
      query = query.eq("role", options.role as never);
    }
    if (options.relatedTaskId) {
      query = query.eq("related_task_id", options.relatedTaskId as never);
    }
    if (options.followUpBefore) {
      query = query.lte("next_follow_up_on", options.followUpBefore as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as HousingContactRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}
