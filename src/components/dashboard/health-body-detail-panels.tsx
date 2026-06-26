import { EmptyState, SectionCard, StatusPill } from "@/components/dashboard";
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

type UnknownRecord = Record<string, unknown>;

function asRecord(value: object | undefined): UnknownRecord | undefined {
  return value as UnknownRecord | undefined;
}

function readString(row: object | undefined, key: string, fallback = "Not set"): string {
  const record = asRecord(row);

  if (!record) {
    return fallback;
  }

  const value = record[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function formatDate(row: object | undefined, key: string): string {
  const value = asRecord(row)?.[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    return "Not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toneForStatus(status: string): "neutral" | "success" | "warning" | "danger" | "info" {
  const normalized = status.toLowerCase();

  if (["active", "completed", "done", "taken", "captured", "logged"].includes(normalized)) {
    return "success";
  }

  if (["planned", "pending", "skipped", "missed", "partial", "low", "medium"].includes(normalized)) {
    return "warning";
  }

  if (["blocked", "failed", "archived", "inactive", "high", "critical"].includes(normalized)) {
    return "danger";
  }

  if (["draft", "routine", "in_progress", "moderate"].includes(normalized)) {
    return "info";
  }

  return "neutral";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}

function DetailNote({
  title,
  text,
}: {
  title: string;
  text: string | null | undefined;
}) {
  if (!text) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function DetailCard({
  row,
  title,
  description,
  status,
  rows,
  notes,
}: {
  row: object | undefined;
  title: string;
  description: string;
  status?: string;
  rows: Array<{ label: string; value: string }>;
  notes?: Array<{ title: string; text: string | null | undefined }>;
}) {
  if (!row) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {status ? <StatusPill label={status} tone={toneForStatus(status)} /> : null}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {rows.map((item) => (
          <DetailRow key={`${title}-${item.label}`} label={item.label} value={item.value} />
        ))}
      </div>

      {notes && notes.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {notes.map((item) => (
            <DetailNote key={`${title}-${item.title}`} title={item.title} text={item.text} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DetailPanel({
  title,
  eyebrow,
  description,
  emptyTitle,
  emptyDescription,
  hasData,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  hasData: boolean;
  children: React.ReactNode;
}) {
  return (
    <SectionCard title={title} eyebrow={eyebrow} description={description}>
      {hasData ? <div className="grid gap-4">{children}</div> : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </SectionCard>
  );
}

export function HealthBodyTrainingDetailPanel({
  bodyLogs = [],
  workouts = [],
  exercises = [],
  workoutSets = [],
}: {
  bodyLogs?: BodyLogRow[];
  workouts?: WorkoutRow[];
  exercises?: ExerciseRow[];
  workoutSets?: WorkoutSetRow[];
}) {
  const bodyLog = bodyLogs[0];
  const workout = workouts[0];
  const exercise = exercises[0];
  const workoutSet = workoutSets[0];

  return (
    <DetailPanel
      title="Body and training detail"
      eyebrow="11.31 detail"
      description="Read-only focused detail for the latest body, workout, exercise, and workout-set records."
      emptyTitle="No body or training detail yet."
      emptyDescription="Body and training detail will appear after body logs, workouts, exercises, or workout sets exist."
      hasData={Boolean(bodyLog || workout || exercise || workoutSet)}
    >
      <DetailCard
        row={bodyLog}
        title="Latest body log"
        description="User-recorded body, recovery, soreness, pain, and progress context."
        rows={[
          { label: "Log date", value: formatDate(bodyLog, "log_date") },
          { label: "Weight", value: readString(bodyLog, "weight_kg") },
          { label: "Soreness", value: readString(bodyLog, "soreness_level") },
          { label: "Energy", value: readString(bodyLog, "energy_level") },
          { label: "Goal", value: readString(bodyLog, "goal_id") },
          { label: "Task", value: readString(bodyLog, "task_id") },
          { label: "Proof", value: readString(bodyLog, "proof_item_id") },
          { label: "Daily log", value: readString(bodyLog, "daily_log_id") },
        ]}
        notes={[
          { title: "Body notes", text: bodyLog?.notes },
          { title: "Safety boundary", text: "Pain and recovery notes are displayed as user records only, not medical interpretation." },
        ]}
      />

      <DetailCard
        row={workout}
        title={readString(workout, "title", "Latest workout")}
        description="Most recent training session connected to existing goals, tasks, events, or proof records."
        status={readString(workout, "status", "")}
        rows={[
          { label: "Workout date", value: formatDate(workout, "workout_date") },
          { label: "Type", value: readString(workout, "workout_type") },
          { label: "Duration", value: readString(workout, "duration_minutes") },
          { label: "Intensity", value: readString(workout, "intensity") },
          { label: "Goal", value: readString(workout, "goal_id") },
          { label: "Task", value: readString(workout, "task_id") },
          { label: "Proof", value: readString(workout, "proof_item_id") },
          { label: "Event", value: readString(workout, "event_id") },
        ]}
        notes={[{ title: "Workout notes", text: workout?.notes }]}
      />

      <DetailCard
        row={exercise}
        title={readString(exercise, "name", "Exercise")}
        description="First available exercise library record for training context."
        status={readString(exercise, "status", "")}
        rows={[
          { label: "Muscle group", value: readString(exercise, "muscle_group") },
          { label: "Equipment", value: readString(exercise, "equipment") },
          { label: "Difficulty", value: readString(exercise, "difficulty") },
          { label: "Updated", value: formatDate(exercise, "updated_at") },
        ]}
        notes={[{ title: "Exercise notes", text: exercise?.notes }]}
      />

      <DetailCard
        row={workoutSet}
        title="Latest workout set"
        description="First available set-level record for training detail."
        rows={[
          { label: "Workout", value: readString(workoutSet, "workout_id") },
          { label: "Exercise", value: readString(workoutSet, "exercise_id") },
          { label: "Set number", value: readString(workoutSet, "set_number") },
          { label: "Reps", value: readString(workoutSet, "reps") },
          { label: "Weight", value: readString(workoutSet, "weight_kg") },
          { label: "RPE", value: readString(workoutSet, "rpe") },
          { label: "Completed", value: readString(workoutSet, "completed") },
          { label: "Created", value: formatDate(workoutSet, "created_at") },
        ]}
        notes={[{ title: "Set notes", text: workoutSet?.notes }]}
      />
    </DetailPanel>
  );
}

export function HealthBodyNutritionMealDetailPanel({
  nutritionLogs = [],
  mealItems = [],
}: {
  nutritionLogs?: NutritionLogRow[];
  mealItems?: MealItemRow[];
}) {
  const nutritionLog = nutritionLogs[0];
  const mealItem = mealItems[0];

  return (
    <DetailPanel
      title="Nutrition and meal detail"
      eyebrow="11.32 detail"
      description="Read-only focused detail for the latest nutrition log and meal item."
      emptyTitle="No nutrition or meal detail yet."
      emptyDescription="Nutrition and meal detail will appear after nutrition logs or meal items exist."
      hasData={Boolean(nutritionLog || mealItem)}
    >
      <DetailCard
        row={nutritionLog}
        title="Latest nutrition log"
        description="User-recorded nutrition values displayed without diet prescription or medical claims."
        rows={[
          { label: "Log date", value: formatDate(nutritionLog, "log_date") },
          { label: "Calories", value: readString(nutritionLog, "calories") },
          { label: "Protein", value: readString(nutritionLog, "protein_g") },
          { label: "Carbs", value: readString(nutritionLog, "carbs_g") },
          { label: "Fat", value: readString(nutritionLog, "fat_g") },
          { label: "Water", value: readString(nutritionLog, "water_ml") },
          { label: "Goal", value: readString(nutritionLog, "goal_id") },
          { label: "Daily log", value: readString(nutritionLog, "daily_log_id") },
        ]}
        notes={[
          { title: "Nutrition notes", text: nutritionLog?.notes },
          { title: "Safety boundary", text: "Calories and macros are displayed only when already recorded. This panel does not prescribe intake." },
        ]}
      />

      <DetailCard
        row={mealItem}
        title={readString(mealItem, "name", "Latest meal item")}
        description="Meal-level record connected to a nutrition log."
        rows={[
          { label: "Meal", value: readString(mealItem, "meal_name") },
          { label: "Nutrition log", value: readString(mealItem, "nutrition_log_id") },
          { label: "Calories", value: readString(mealItem, "calories") },
          { label: "Protein", value: readString(mealItem, "protein_g") },
          { label: "Carbs", value: readString(mealItem, "carbs_g") },
          { label: "Fat", value: readString(mealItem, "fat_g") },
          { label: "Quantity", value: readString(mealItem, "quantity") },
          { label: "Created", value: formatDate(mealItem, "created_at") },
        ]}
        notes={[{ title: "Meal notes", text: null }]}
      />
    </DetailPanel>
  );
}

export function HealthBodySupplementDetailPanel({
  supplements = [],
  supplementLogs = [],
  products = [],
}: {
  supplements?: SupplementRow[];
  supplementLogs?: SupplementLogRow[];
  products?: ProductRow[];
}) {
  const activeSupplement = supplements.find((item) => item.active) ?? supplements[0];
  const supplementLog = supplementLogs[0];
  const activeProduct = products.find((item) => item.active) ?? products[0];

  return (
    <DetailPanel
      title="Supplement detail"
      eyebrow="11.32 detail"
      description="Read-only focused detail for supplement records, supplement logs, and product context."
      emptyTitle="No supplement detail yet."
      emptyDescription="Supplement detail will appear after supplements, supplement logs, or product records exist."
      hasData={Boolean(activeSupplement || supplementLog || activeProduct)}
    >
      <DetailCard
        row={activeSupplement}
        title={readString(activeSupplement, "name", "Supplement")}
        description="Supplement record displayed for schedule and adherence context only."
        status={activeSupplement?.active ? "active" : "inactive"}
        rows={[
          { label: "Category", value: readString(activeSupplement, "category") },
          { label: "Dosage", value: readString(activeSupplement, "dosage") },
          { label: "Schedule", value: readString(activeSupplement, "schedule") },
          { label: "Active", value: readString(activeSupplement, "active") },
          { label: "Started", value: formatDate(activeSupplement, "started_at") },
          { label: "Ended", value: formatDate(activeSupplement, "ended_at") },
          { label: "Created", value: formatDate(activeSupplement, "created_at") },
          { label: "Updated", value: formatDate(activeSupplement, "updated_at") },
        ]}
        notes={[
          { title: "Supplement notes", text: activeSupplement?.notes },
          { title: "Safety boundary", text: "This panel does not recommend dosage, claim efficacy, or provide medical advice." },
        ]}
      />

      <DetailCard
        row={supplementLog}
        title="Latest supplement log"
        description="Most recent adherence or intake record connected to supplement routines."
        status={readString(supplementLog, "status", "")}
        rows={[
          { label: "Supplement", value: readString(supplementLog, "supplement_id") },
          { label: "Taken at", value: formatDate(supplementLog, "taken_at") },
          { label: "Status", value: readString(supplementLog, "status") },
          { label: "Amount", value: readString(supplementLog, "amount") },
          { label: "Created", value: formatDate(supplementLog, "created_at") },
        ]}
        notes={[{ title: "Supplement log notes", text: supplementLog?.notes }]}
      />

      <DetailCard
        row={activeProduct}
        title={readString(activeProduct, "name", "Product")}
        description="Product context displayed without efficacy or treatment claims."
        status={activeProduct?.active ? "active" : "inactive"}
        rows={[
          { label: "Category", value: readString(activeProduct, "category") },
          { label: "Brand", value: readString(activeProduct, "brand") },
          { label: "Active", value: readString(activeProduct, "active") },
          { label: "Started", value: formatDate(activeProduct, "started_at") },
          { label: "Ended", value: formatDate(activeProduct, "ended_at") },
          { label: "Updated", value: formatDate(activeProduct, "updated_at") },
        ]}
        notes={[{ title: "Product usage notes", text: activeProduct?.usage_notes }]}
      />
    </DetailPanel>
  );
}

export function HealthBodySleepEnergyDetailPanel({
  sleepLogs = [],
  energyLogs = [],
  mentalHealthLogs = [],
}: {
  sleepLogs?: SleepLogRow[];
  energyLogs?: EnergyLogRow[];
  mentalHealthLogs?: MentalHealthLogRow[];
}) {
  const sleepLog = sleepLogs[0];
  const energyLog = energyLogs[0];
  const mentalHealthLog = mentalHealthLogs[0];

  return (
    <DetailPanel
      title="Sleep and energy detail"
      eyebrow="11.33 detail"
      description="Read-only focused detail for sleep, energy, fatigue, focus, stress, and mental-state records."
      emptyTitle="No sleep or energy detail yet."
      emptyDescription="Sleep and energy detail will appear after sleep logs, energy logs, or mental health logs exist."
      hasData={Boolean(sleepLog || energyLog || mentalHealthLog)}
    >
      <DetailCard
        row={sleepLog}
        title="Latest sleep log"
        description="User-recorded sleep record displayed without medical interpretation."
        rows={[
          { label: "Sleep date", value: formatDate(sleepLog, "sleep_date") },
          { label: "Bedtime", value: readString(sleepLog, "bedtime") },
          { label: "Wake time", value: readString(sleepLog, "wake_time") },
          { label: "Duration", value: readString(sleepLog, "duration_hours") },
          { label: "Quality", value: readString(sleepLog, "quality_score") },
          { label: "Daily log", value: readString(sleepLog, "daily_log_id") },
          { label: "Created", value: formatDate(sleepLog, "created_at") },
        ]}
        notes={[{ title: "Sleep notes", text: sleepLog?.notes }]}
      />

      <DetailCard
        row={energyLog}
        title="Latest energy log"
        description="User-recorded energy, fatigue, focus, stress, and recovery context."
        rows={[
          { label: "Log date", value: formatDate(energyLog, "log_date") },
          { label: "Energy", value: readString(energyLog, "energy_level") },
          { label: "Fatigue", value: readString(energyLog, "fatigue_level") },
          { label: "Focus", value: readString(energyLog, "focus_level") },
          { label: "Stress", value: readString(energyLog, "stress_level") },
          { label: "Recovery", value: readString(energyLog, "recovery_score") },
          { label: "Daily log", value: readString(energyLog, "daily_log_id") },
          { label: "Created", value: formatDate(energyLog, "created_at") },
        ]}
        notes={[{ title: "Energy notes", text: energyLog?.notes }]}
      />

      <DetailCard
        row={mentalHealthLog}
        title="Latest mental-state log"
        description="Sensitive mental-state context displayed only as user-recorded data."
        status={readString(mentalHealthLog, "sensitivity", "")}
        rows={[
          { label: "Log date", value: formatDate(mentalHealthLog, "log_date") },
          { label: "Mood", value: readString(mentalHealthLog, "mood_score") },
          { label: "Anxiety", value: readString(mentalHealthLog, "anxiety_level") },
          { label: "Stress", value: readString(mentalHealthLog, "stress_level") },
          { label: "Sensitivity", value: readString(mentalHealthLog, "sensitivity") },
          { label: "Created", value: formatDate(mentalHealthLog, "created_at") },
        ]}
        notes={[
          { title: "Mental-state notes", text: mentalHealthLog?.notes },
          { title: "Safety boundary", text: "This panel does not diagnose, provide crisis handling, or recommend medication or treatment." },
        ]}
      />
    </DetailPanel>
  );
}

export function HealthBodyEmotionReflectionDetailPanel({
  emotionLogs = [],
  mentalHealthLogs = [],
  journalEntries = [],
}: {
  emotionLogs?: EmotionLogRow[];
  mentalHealthLogs?: MentalHealthLogRow[];
  journalEntries?: JournalEntryRow[];
}) {
  const emotionLog = emotionLogs[0];
  const mentalHealthLog = mentalHealthLogs[0];
  const journalEntry = journalEntries[0];

  return (
    <DetailPanel
      title="Emotion and reflection detail"
      eyebrow="11.33 detail"
      description="Read-only focused detail for emotion, mental-state, and reflection records."
      emptyTitle="No emotion or reflection detail yet."
      emptyDescription="Emotion and reflection detail will appear after emotion logs, mental health logs, or journal entries exist."
      hasData={Boolean(emotionLog || mentalHealthLog || journalEntry)}
    >
      <DetailCard
        row={emotionLog}
        title={readString(emotionLog, "emotion", "Latest emotion log")}
        description="Emotion labels are displayed as user-recorded data, not objective fact."
        status={readString(emotionLog, "sensitivity", "")}
        rows={[
          { label: "Occurred", value: formatDate(emotionLog, "occurred_at") },
          { label: "Intensity", value: readString(emotionLog, "intensity") },
          { label: "Trigger", value: readString(emotionLog, "trigger") },
          { label: "Regulation", value: readString(emotionLog, "regulation_strategy") },
          { label: "Sensitivity", value: readString(emotionLog, "sensitivity") },
          { label: "Created", value: formatDate(emotionLog, "created_at") },
        ]}
        notes={[
          { title: "Emotion notes", text: emotionLog?.notes },
          { title: "Safety boundary", text: "This panel does not diagnose emotion, infer crisis state, or label feelings as fact." },
        ]}
      />

      <DetailCard
        row={mentalHealthLog}
        title="Mental-state context"
        description="Protected context from the latest mental health log."
        status={readString(mentalHealthLog, "sensitivity", "")}
        rows={[
          { label: "Log date", value: formatDate(mentalHealthLog, "log_date") },
          { label: "Mood", value: readString(mentalHealthLog, "mood_score") },
          { label: "Anxiety", value: readString(mentalHealthLog, "anxiety_level") },
          { label: "Stress", value: readString(mentalHealthLog, "stress_level") },
          { label: "Sensitivity", value: readString(mentalHealthLog, "sensitivity") },
          { label: "Created", value: formatDate(mentalHealthLog, "created_at") },
        ]}
        notes={[{ title: "Mental-state notes", text: mentalHealthLog?.notes }]}
      />

      <DetailCard
        row={journalEntry}
        title={readString(journalEntry, "title", "Latest journal entry")}
        description="Reflection context displayed as a private user record."
        status={readString(journalEntry, "sensitivity", "")}
        rows={[
          { label: "Entry date", value: formatDate(journalEntry, "entry_date") },
          { label: "Private", value: readString(journalEntry, "private") },
          { label: "Sensitivity", value: readString(journalEntry, "sensitivity") },
          { label: "Created", value: formatDate(journalEntry, "created_at") },
          { label: "Updated", value: formatDate(journalEntry, "updated_at") },
        ]}
        notes={[{ title: "Journal excerpt", text: journalEntry?.content }]}
      />
    </DetailPanel>
  );
}

export function HealthBodyHairSkincareDetailPanel({
  skincareLogs = [],
  haircareLogs = [],
  products = [],
}: {
  skincareLogs?: SkincareLogRow[];
  haircareLogs?: HaircareLogRow[];
  products?: ProductRow[];
}) {
  const skincareLog = skincareLogs[0];
  const haircareLog = haircareLogs[0];
  const activeProduct = products.find((item) => item.active) ?? products[0];

  return (
    <DetailPanel
      title="Haircare and skincare detail"
      eyebrow="11.33 detail"
      description="Read-only focused detail for haircare, skincare, and product routine records."
      emptyTitle="No haircare or skincare detail yet."
      emptyDescription="Haircare and skincare detail will appear after haircare logs, skincare logs, or product records exist."
      hasData={Boolean(skincareLog || haircareLog || activeProduct)}
    >
      <DetailCard
        row={skincareLog}
        title="Latest skincare log"
        description="Skincare routine record displayed without treatment or product efficacy claims."
        status={readString(skincareLog, "completed", "")}
        rows={[
          { label: "Log date", value: formatDate(skincareLog, "log_date") },
          { label: "Routine type", value: readString(skincareLog, "routine_type") },
          { label: "Completed", value: readString(skincareLog, "completed") },
          { label: "Products used", value: readString(skincareLog, "products_used") },
          { label: "Irritation", value: readString(skincareLog, "irritation_level") },
          { label: "Created", value: formatDate(skincareLog, "created_at") },
        ]}
        notes={[{ title: "Skincare irritation notes", text: skincareLog?.irritation_notes }]}
      />

      <DetailCard
        row={haircareLog}
        title="Latest haircare log"
        description="Haircare routine record displayed without diagnosis or appearance judgment."
        status={readString(haircareLog, "completed", "")}
        rows={[
          { label: "Log date", value: formatDate(haircareLog, "log_date") },
          { label: "Routine type", value: readString(haircareLog, "routine_type") },
          { label: "Completed", value: readString(haircareLog, "completed") },
          { label: "Products used", value: readString(haircareLog, "products_used") },
          { label: "Shedding", value: readString(haircareLog, "shedding_level") },
          { label: "Created", value: formatDate(haircareLog, "created_at") },
        ]}
        notes={[{ title: "Haircare shedding notes", text: haircareLog?.shedding_notes }]}
      />

      <DetailCard
        row={activeProduct}
        title={readString(activeProduct, "name", "Product")}
        description="Product context displayed without treatment or efficacy claims."
        status={activeProduct?.active ? "active" : "inactive"}
        rows={[
          { label: "Category", value: readString(activeProduct, "category") },
          { label: "Brand", value: readString(activeProduct, "brand") },
          { label: "Active", value: readString(activeProduct, "active") },
          { label: "Started", value: formatDate(activeProduct, "started_at") },
          { label: "Ended", value: formatDate(activeProduct, "ended_at") },
          { label: "Updated", value: formatDate(activeProduct, "updated_at") },
        ]}
        notes={[
          { title: "Product usage notes", text: activeProduct?.usage_notes },
          { title: "Visual evidence boundary", text: "Progress photos and visual evidence remain deferred until an explicit safe storage and privacy flow exists." },
        ]}
      />
    </DetailPanel>
  );
}
