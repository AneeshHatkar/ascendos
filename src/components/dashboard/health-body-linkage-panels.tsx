import { EmptyState, MetricTile, SectionCard } from "@/components/dashboard";
import type {
  BodyLogRow,
  EmotionLogRow,
  EnergyLogRow,
  HaircareLogRow,
  NutritionLogRow,
  SkincareLogRow,
  SleepLogRow,
  SupplementLogRow,
  WorkoutRow,
} from "@/types/database";

type UnknownRecord = Record<string, unknown>;

interface HealthBodyProofLinkagePanelProps {
  bodyLogs?: BodyLogRow[];
  workouts?: WorkoutRow[];
  nutritionLogs?: NutritionLogRow[];
  supplementLogs?: SupplementLogRow[];
  sleepLogs?: SleepLogRow[];
  energyLogs?: EnergyLogRow[];
  emotionLogs?: EmotionLogRow[];
  skincareLogs?: SkincareLogRow[];
  haircareLogs?: HaircareLogRow[];
}

function readString(row: UnknownRecord, key: string, fallback = ""): string {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function linkedCount(rows: UnknownRecord[], keys: string[]): number {
  return rows.reduce((count, row) => {
    return count + keys.filter((key) => readString(row, key).length > 0).length;
  }, 0);
}

function uniqueIds(rows: UnknownRecord[], key: string): string[] {
  return [
    ...new Set(
      rows
        .map((row) => readString(row, key))
        .filter((value) => value.length > 0),
    ),
  ].slice(0, 8);
}

function IdLine({ label, ids }: { label: string; ids: string[] }) {
  return (
    <p>
      {label}: {ids.length === 0 ? "None linked yet" : ids.join(", ")}
    </p>
  );
}

function SurfaceLine({
  label,
  rows,
}: {
  label: string;
  rows: UnknownRecord[];
}) {
  const proofLinks = linkedCount(rows, ["proof_item_id"]);
  const goalLinks = linkedCount(rows, ["goal_id"]);
  const taskLinks = linkedCount(rows, ["task_id"]);
  const dailyLogLinks = linkedCount(rows, ["daily_log_id"]);
  const eventLinks = linkedCount(rows, ["event_id"]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="mt-2 text-xs leading-6 text-slate-500">
        Proof: {proofLinks} · Goals: {goalLinks} · Tasks: {taskLinks} · Daily logs: {dailyLogLinks} · Events: {eventLinks}
      </p>
    </div>
  );
}

export function HealthBodyProofLinkagePanel({
  bodyLogs = [],
  workouts = [],
  nutritionLogs = [],
  supplementLogs = [],
  sleepLogs = [],
  energyLogs = [],
  emotionLogs = [],
  skincareLogs = [],
  haircareLogs = [],
}: HealthBodyProofLinkagePanelProps) {
  const bodyRows = bodyLogs as UnknownRecord[];
  const workoutRows = workouts as UnknownRecord[];
  const nutritionRows = nutritionLogs as UnknownRecord[];
  const supplementRows = supplementLogs as UnknownRecord[];
  const sleepRows = sleepLogs as UnknownRecord[];
  const energyRows = energyLogs as UnknownRecord[];
  const emotionRows = emotionLogs as UnknownRecord[];
  const skincareRows = skincareLogs as UnknownRecord[];
  const haircareRows = haircareLogs as UnknownRecord[];

  const allRows = [
    ...bodyRows,
    ...workoutRows,
    ...nutritionRows,
    ...supplementRows,
    ...sleepRows,
    ...energyRows,
    ...emotionRows,
    ...skincareRows,
    ...haircareRows,
  ];

  const proofLinks = linkedCount(allRows, ["proof_item_id"]);
  const goalLinks = linkedCount(allRows, ["goal_id"]);
  const taskLinks = linkedCount(allRows, ["task_id"]);
  const dailyLogLinks = linkedCount(allRows, ["daily_log_id"]);
  const eventLinks = linkedCount(allRows, ["event_id"]);

  return (
    <SectionCard
      title="Health/body proof and operating linkage"
      eyebrow="11.37 · 11.38 linkage"
      description="Read-only visibility for how health/body records connect to proof, goals, tasks, daily logs, and calendar events."
    >
      {allRows.length === 0 ? (
        <EmptyState
          title="No health/body linkage records yet."
          description="Proof, goal, task, daily-log, and event links will appear after health/body records exist with those references."
        />
      ) : (
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-5">
            <MetricTile
              label="Proof links"
              value={proofLinks}
              description="Health/body records linked to proof items."
            />
            <MetricTile
              label="Goal links"
              value={goalLinks}
              description="Health/body records linked to goals."
            />
            <MetricTile
              label="Task links"
              value={taskLinks}
              description="Health/body records linked to tasks."
            />
            <MetricTile
              label="Daily log links"
              value={dailyLogLinks}
              description="Health/body records linked to daily logs."
            />
            <MetricTile
              label="Event links"
              value={eventLinks}
              description="Workout or operating records linked to events."
            />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <SurfaceLine label="Body logs" rows={bodyRows} />
            <SurfaceLine label="Workouts" rows={workoutRows} />
            <SurfaceLine label="Nutrition logs" rows={nutritionRows} />
            <SurfaceLine label="Supplement logs" rows={supplementRows} />
            <SurfaceLine label="Sleep logs" rows={sleepRows} />
            <SurfaceLine label="Energy logs" rows={energyRows} />
            <SurfaceLine label="Emotion logs" rows={emotionRows} />
            <SurfaceLine label="Skincare logs" rows={skincareRows} />
            <SurfaceLine label="Haircare logs" rows={haircareRows} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-slate-500">
            <IdLine label="Proof ids" ids={uniqueIds(allRows, "proof_item_id")} />
            <IdLine label="Goal ids" ids={uniqueIds(allRows, "goal_id")} />
            <IdLine label="Task ids" ids={uniqueIds(allRows, "task_id")} />
            <IdLine label="Daily log ids" ids={uniqueIds(allRows, "daily_log_id")} />
            <IdLine label="Event ids" ids={uniqueIds(allRows, "event_id")} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
            This panel only reads existing linkage fields. It does not create proof, edit goals,
            modify tasks, change daily logs, schedule events, write health/body records, or trigger
            Carnos actions.
          </div>
        </div>
      )}
    </SectionCard>
  );
}
