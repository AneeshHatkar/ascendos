import {
  listBodyLogs,
  listEmotionLogs,
  listEnergyLogs,
  listExercises,
  listHaircareLogs,
  listJournalEntries,
  listMealItems,
  listMentalHealthLogs,
  listNutritionLogs,
  listProducts,
  listSkincareLogs,
  listSleepLogs,
  listSupplementLogs,
  listSupplements,
  listWorkoutSets,
  listWorkouts,
} from "@/lib/repositories";

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

export interface HealthBodyDashboardSummary {
  body_log_count: number;
  workout_count: number;
  exercise_count: number;
  workout_set_count: number;
  nutrition_log_count: number;
  meal_item_count: number;
  supplement_count: number;
  active_supplement_count: number;
  supplement_log_count: number;
  sleep_log_count: number;
  energy_log_count: number;
  mental_health_log_count: number;
  emotion_log_count: number;
  journal_entry_count: number;
  skincare_log_count: number;
  haircare_log_count: number;
  product_count: number;
  active_product_count: number;
  recent_health_signal_count: number;
  read_only_boundary: true;
}

export interface HealthBodyDashboardDetailRows {
  body_logs: BodyLogRow[];
  workouts: WorkoutRow[];
  exercises: ExerciseRow[];
  workout_sets: WorkoutSetRow[];
  nutrition_logs: NutritionLogRow[];
  meal_items: MealItemRow[];
  supplements: SupplementRow[];
  active_supplements: SupplementRow[];
  supplement_logs: SupplementLogRow[];
  sleep_logs: SleepLogRow[];
  energy_logs: EnergyLogRow[];
  mental_health_logs: MentalHealthLogRow[];
  emotion_logs: EmotionLogRow[];
  journal_entries: JournalEntryRow[];
  skincare_logs: SkincareLogRow[];
  haircare_logs: HaircareLogRow[];
  products: ProductRow[];
  active_products: ProductRow[];
}

export interface HealthBodyDashboardDataResult {
  summary: HealthBodyDashboardSummary;
  generated_at: string;
  source_tables: string[];
  warnings: string[];
  detail_rows: HealthBodyDashboardDetailRows;
}

const RECENT_WINDOW_DAYS = 7;
const DEFAULT_SUMMARY_LIMIT = 100;

function asRows<T>(result: { data: T[] | null; error: string | null }): T[] {
  return result.data ?? [];
}

function collectWarning(label: string, error: string | null): string | null {
  if (!error) {
    return null;
  }

  return `${label}: ${error}`;
}

function isWithinRecentWindow(value: string | null | undefined): boolean {
  if (!value) {
    return false;
  }

  const candidate = new Date(value);
  if (Number.isNaN(candidate.getTime())) {
    return false;
  }

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RECENT_WINDOW_DAYS);

  return candidate.getTime() >= cutoff.getTime();
}

export async function getHealthBodyDashboardDataSummary(
  userId: string,
): Promise<HealthBodyDashboardDataResult> {
  const [
    bodyLogs,
    workouts,
    exercises,
    workoutSets,
    nutritionLogs,
    mealItems,
    supplements,
    activeSupplements,
    supplementLogs,
    sleepLogs,
    energyLogs,
    mentalHealthLogs,
    emotionLogs,
    journalEntries,
    skincareLogs,
    haircareLogs,
    products,
    activeProducts,
  ] = await Promise.all([
    listBodyLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listWorkouts(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listExercises(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listWorkoutSets(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listNutritionLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listMealItems(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listSupplements(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listSupplements(userId, { active: true, limit: DEFAULT_SUMMARY_LIMIT }),
    listSupplementLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listSleepLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listEnergyLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listMentalHealthLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listEmotionLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listJournalEntries(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listSkincareLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listHaircareLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listProducts(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listProducts(userId, { active: true, limit: DEFAULT_SUMMARY_LIMIT }),
  ]);

  const bodyRows = asRows(bodyLogs);
  const workoutRows = asRows(workouts);
  const exerciseRows = asRows(exercises);
  const workoutSetRows = asRows(workoutSets);
  const nutritionRows = asRows(nutritionLogs);
  const mealRows = asRows(mealItems);
  const supplementRows = asRows(supplements);
  const activeSupplementRows = asRows(activeSupplements);
  const supplementLogRows = asRows(supplementLogs);
  const sleepRows = asRows(sleepLogs);
  const energyRows = asRows(energyLogs);
  const mentalRows = asRows(mentalHealthLogs);
  const emotionRows = asRows(emotionLogs);
  const journalRows = asRows(journalEntries);
  const skincareRows = asRows(skincareLogs);
  const haircareRows = asRows(haircareLogs);
  const productRows = asRows(products);
  const activeProductRows = asRows(activeProducts);

  const recentHealthSignalCount =
    bodyRows.filter((item) => isWithinRecentWindow(item.log_date)).length +
    workoutRows.filter((item) => isWithinRecentWindow(item.workout_date)).length +
    nutritionRows.filter((item) => isWithinRecentWindow(item.log_date)).length +
    sleepRows.filter((item) => isWithinRecentWindow(item.sleep_date)).length +
    energyRows.filter((item) => isWithinRecentWindow(item.log_date)).length +
    mentalRows.filter((item) => isWithinRecentWindow(item.log_date)).length +
    emotionRows.filter((item) => isWithinRecentWindow(item.occurred_at)).length +
    skincareRows.filter((item) => isWithinRecentWindow(item.log_date)).length +
    haircareRows.filter((item) => isWithinRecentWindow(item.log_date)).length;

  const warnings = [
    collectWarning("body_logs", bodyLogs.error),
    collectWarning("workouts", workouts.error),
    collectWarning("workout_sets", workoutSets.error),
    collectWarning("nutrition_logs", nutritionLogs.error),
    collectWarning("meal_items", mealItems.error),
    collectWarning("supplements", supplements.error),
    collectWarning("active_supplements", activeSupplements.error),
    collectWarning("supplement_logs", supplementLogs.error),
    collectWarning("sleep_logs", sleepLogs.error),
    collectWarning("energy_logs", energyLogs.error),
    collectWarning("mental_health_logs", mentalHealthLogs.error),
    collectWarning("emotion_logs", emotionLogs.error),
    collectWarning("journal_entries", journalEntries.error),
    collectWarning("skincare_logs", skincareLogs.error),
    collectWarning("haircare_logs", haircareLogs.error),
    collectWarning("products", products.error),
    collectWarning("active_products", activeProducts.error),
  ].filter((warning): warning is string => warning !== null);

  return {
    generated_at: new Date().toISOString(),
    source_tables: [
      "body_logs",
      "workouts",
      "exercises",
      "workout_sets",
      "nutrition_logs",
      "meal_items",
      "supplements",
      "supplement_logs",
      "sleep_logs",
      "energy_logs",
      "mental_health_logs",
      "emotion_logs",
      "journal_entries",
      "skincare_logs",
      "haircare_logs",
      "products",
    ],
    warnings,
    detail_rows: {
      body_logs: bodyRows,
      workouts: workoutRows,
      exercises: exerciseRows,
      workout_sets: workoutSetRows,
      nutrition_logs: nutritionRows,
      meal_items: mealRows,
      supplements: supplementRows,
      active_supplements: activeSupplementRows,
      supplement_logs: supplementLogRows,
      sleep_logs: sleepRows,
      energy_logs: energyRows,
      mental_health_logs: mentalRows,
      emotion_logs: emotionRows,
      journal_entries: journalRows,
      skincare_logs: skincareRows,
      haircare_logs: haircareRows,
      products: productRows,
      active_products: activeProductRows,
    },
    summary: {
      body_log_count: bodyRows.length,
      workout_count: workoutRows.length,
      exercise_count: exerciseRows.length,
      workout_set_count: workoutSetRows.length,
      nutrition_log_count: nutritionRows.length,
      meal_item_count: mealRows.length,
      supplement_count: supplementRows.length,
      active_supplement_count: activeSupplementRows.length,
      supplement_log_count: supplementLogRows.length,
      sleep_log_count: sleepRows.length,
      energy_log_count: energyRows.length,
      mental_health_log_count: mentalRows.length,
      emotion_log_count: emotionRows.length,
      journal_entry_count: journalRows.length,
      skincare_log_count: skincareRows.length,
      haircare_log_count: haircareRows.length,
      product_count: productRows.length,
      active_product_count: activeProductRows.length,
      recent_health_signal_count: recentHealthSignalCount,
      read_only_boundary: true,
    },
  };
}
