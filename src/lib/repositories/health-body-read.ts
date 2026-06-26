import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  BodyLogRow,
  EmotionLogRow,
  EnergyLogRow,
  ExerciseRow,
  HaircareLogRow,
  JournalEntryRow,
  MealItemRow,
  MentalHealthLogRow,
  NutritionLogRow,
  ProductRow,
  SkincareLogRow,
  SleepLogRow,
  SupplementLogRow,
  SupplementRow,
  WorkoutRow,
  WorkoutSetRow,
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

  return "Unknown health/body repository error";
}

export async function listBodyLogs(
  userId: string,
  options: {
    goalId?: string;
    taskId?: string;
    proofItemId?: string;
    dailyLogId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<BodyLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("body_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.goalId) {
      query = query.eq("goal_id", options.goalId);
    }
    if (options.taskId) {
      query = query.eq("task_id", options.taskId);
    }
    if (options.proofItemId) {
      query = query.eq("proof_item_id", options.proofItemId);
    }
    if (options.dailyLogId) {
      query = query.eq("daily_log_id", options.dailyLogId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as BodyLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listWorkouts(
  userId: string,
  options: {
    goalId?: string;
    taskId?: string;
    proofItemId?: string;
    eventId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<WorkoutRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId)
      .order("workout_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.goalId) {
      query = query.eq("goal_id", options.goalId);
    }
    if (options.taskId) {
      query = query.eq("task_id", options.taskId);
    }
    if (options.proofItemId) {
      query = query.eq("proof_item_id", options.proofItemId);
    }
    if (options.eventId) {
      query = query.eq("event_id", options.eventId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as WorkoutRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listExercises(
  userId: string,
  options: {
    muscleGroup?: string;
    equipment?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ExerciseRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("exercises")
      .select("*")
      .eq("user_id", userId)
      .order("name", { ascending: true })
      .limit(limit);

    if (options.muscleGroup) {
      query = query.eq("muscle_group", options.muscleGroup);
    }
    if (options.equipment) {
      query = query.eq("equipment", options.equipment);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ExerciseRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listWorkoutSets(
  userId: string,
  options: {
    workoutId?: string;
    exerciseId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<WorkoutSetRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("workout_sets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.workoutId) {
      query = query.eq("workout_id", options.workoutId);
    }
    if (options.exerciseId) {
      query = query.eq("exercise_id", options.exerciseId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as WorkoutSetRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listNutritionLogs(
  userId: string,
  options: {
    goalId?: string;
    taskId?: string;
    proofItemId?: string;
    dailyLogId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<NutritionLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("nutrition_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.goalId) {
      query = query.eq("goal_id", options.goalId);
    }
    if (options.taskId) {
      query = query.eq("task_id", options.taskId);
    }
    if (options.proofItemId) {
      query = query.eq("proof_item_id", options.proofItemId);
    }
    if (options.dailyLogId) {
      query = query.eq("daily_log_id", options.dailyLogId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as NutritionLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listMealItems(
  userId: string,
  options: {
    nutritionLogId?: string;
    mealName?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MealItemRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("meal_items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.nutritionLogId) {
      query = query.eq("nutrition_log_id", options.nutritionLogId);
    }
    if (options.mealName) {
      query = query.eq("meal_name", options.mealName);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as MealItemRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSupplements(
  userId: string,
  options: {
    active?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SupplementRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("supplements")
      .select("*")
      .eq("user_id", userId)
      .order("name", { ascending: true })
      .limit(limit);

    if (options.active !== undefined) {
      query = query.eq("active", options.active);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as SupplementRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSupplementLogs(
  userId: string,
  options: {
    supplementId?: string;
    status?: SupplementLogRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SupplementLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("supplement_logs")
      .select("*")
      .eq("user_id", userId)
      .order("taken_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.supplementId) {
      query = query.eq("supplement_id", options.supplementId);
    }
    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as SupplementLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSleepLogs(
  userId: string,
  options: {
    dailyLogId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SleepLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("sleep_logs")
      .select("*")
      .eq("user_id", userId)
      .order("sleep_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.dailyLogId) {
      query = query.eq("daily_log_id", options.dailyLogId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as SleepLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listEnergyLogs(
  userId: string,
  options: {
    dailyLogId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<EnergyLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("energy_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.dailyLogId) {
      query = query.eq("daily_log_id", options.dailyLogId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as EnergyLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listMentalHealthLogs(
  userId: string,
  options: {
    sensitivity?: MentalHealthLogRow["sensitivity"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<MentalHealthLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("mental_health_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.sensitivity) {
      query = query.eq("sensitivity", options.sensitivity);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as MentalHealthLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listEmotionLogs(
  userId: string,
  options: {
    emotion?: string;
    sensitivity?: EmotionLogRow["sensitivity"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<EmotionLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("emotion_logs")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.emotion) {
      query = query.eq("emotion", options.emotion);
    }
    if (options.sensitivity) {
      query = query.eq("sensitivity", options.sensitivity);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as EmotionLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listJournalEntries(
  userId: string,
  options: {
    sensitivity?: JournalEntryRow["sensitivity"];
    privateOnly?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<JournalEntryRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("entry_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.sensitivity) {
      query = query.eq("sensitivity", options.sensitivity);
    }
    if (options.privateOnly !== undefined) {
      query = query.eq("private", options.privateOnly);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as JournalEntryRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSkincareLogs(
  userId: string,
  options: {
    routineType?: string;
    completed?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SkincareLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("skincare_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.routineType) {
      query = query.eq("routine_type", options.routineType);
    }
    if (options.completed !== undefined) {
      query = query.eq("completed", options.completed);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as SkincareLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listHaircareLogs(
  userId: string,
  options: {
    completed?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<HaircareLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("haircare_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.completed !== undefined) {
      query = query.eq("completed", options.completed);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as HaircareLogRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProducts(
  userId: string,
  options: {
    category?: string;
    active?: boolean;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProductRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("category", { ascending: true })
      .order("name", { ascending: true })
      .limit(limit);

    if (options.category) {
      query = query.eq("category", options.category);
    }
    if (options.active !== undefined) {
      query = query.eq("active", options.active);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ProductRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}
