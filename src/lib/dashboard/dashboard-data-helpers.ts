import { getDashboardCardsForSurface, type DashboardSurface } from "@/lib/dashboard";
import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

type TypedSupabaseClient = SupabaseClient<Database>;

export interface DashboardDataSummary {
  surface: DashboardSurface;
  card_count: number;
  source_tables: string[];
  pending_updates_count: number;
  active_goals_count: number;
  open_tasks_count: number;
  recent_proof_count: number;
  recent_events_count: number;
}

export interface DashboardDataResult {
  summary: DashboardDataSummary;
  generated_at: string;
}

async function getCount(
  supabase: TypedSupabaseClient,
  table: 'ai_actions' | 'goals' | 'tasks' | 'proof_items' | 'events',
  userId: string,
  queryBuilder?: (query: ReturnType<TypedSupabaseClient['from']>) => ReturnType<TypedSupabaseClient['from']>,
): Promise<number> {
  let query = supabase.from(table).select('id', { count: 'exact', head: true }).eq('user_id', userId);

  if (queryBuilder) {
    query = queryBuilder(query);
  }

  const { count, error } = await query;

  if (error) {
    return 0;
  }

  return count ?? 0;
}

export async function getDashboardDataSummary(
  supabase: TypedSupabaseClient,
  userId: string,
  surface: DashboardSurface,
): Promise<DashboardDataResult> {
  const cards = getDashboardCardsForSurface(surface);
  const sourceTables = Array.from(new Set(cards.flatMap((card) => card.sourceTables))).sort();

  const [pendingUpdatesCount, activeGoalsCount, openTasksCount, recentProofCount, recentEventsCount] =
    await Promise.all([
      getCount(supabase, 'ai_actions', userId, (query) => query.eq('status', 'pending_confirmation')),
      getCount(supabase, 'goals', userId, (query) => query.in('status', ['draft', 'active'])),
      getCount(supabase, 'tasks', userId, (query) => query.in('status', ['todo', 'in_progress', 'blocked'])),
      getCount(supabase, 'proof_items', userId),
      getCount(supabase, 'events', userId),
    ]);

  return {
    generated_at: new Date().toISOString(),
    summary: {
      surface,
      card_count: cards.length,
      source_tables: sourceTables,
      pending_updates_count: pendingUpdatesCount,
      active_goals_count: activeGoalsCount,
      open_tasks_count: openTasksCount,
      recent_proof_count: recentProofCount,
      recent_events_count: recentEventsCount,
    },
  };
}

export async function getCoreDashboardDataSummaries(
  supabase: TypedSupabaseClient,
  userId: string,
): Promise<DashboardDataResult[]> {
  const surfaces: DashboardSurface[] = ['command', 'timeline', 'calendar', 'goals', 'proof', 'carnos'];

  return Promise.all(surfaces.map((surface) => getDashboardDataSummary(supabase, userId, surface)));
}

