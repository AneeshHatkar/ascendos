import { ProposedActionReviewCard } from "@/components/actions";
import {
  CrossDashboardLinks,
  SectionCard,
} from "@/components/dashboard";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";
import type { CanonicalRoute } from "@/lib/routes";

type HealthBodySurface =
  | "body"
  | "nutrition"
  | "supplements"
  | "sleep_energy"
  | "emotion"
  | "hair_skincare";

const SURFACE_LABELS: Record<HealthBodySurface, string> = {
  body: "Health Body Overview",
  nutrition: "Nutrition",
  supplements: "Supplements",
  sleep_energy: "Sleep Energy",
  emotion: "Emotion",
  hair_skincare: "Hair Skincare",
};

const HEALTH_BODY_LINKS = [
  {
    label: "Body",
    route: "/body" as CanonicalRoute,
    description: "Body logs, workouts, exercises, recovery notes, and proof-linked training records.",
  },
  {
    label: "Nutrition",
    route: "/nutrition" as CanonicalRoute,
    description: "Nutrition logs, meal items, macros, hydration, and meal context.",
  },
  {
    label: "Supplements",
    route: "/supplements" as CanonicalRoute,
    description: "Supplement routines, supplement logs, and product context.",
  },
  {
    label: "Sleep Energy",
    route: "/sleep-energy" as CanonicalRoute,
    description: "Sleep logs, energy logs, fatigue, focus, stress, and recovery signals.",
  },
  {
    label: "Emotion",
    route: "/emotion" as CanonicalRoute,
    description: "Emotion logs, mental-state context, and journal/reflection records.",
  },
  {
    label: "Hair Skincare",
    route: "/hair-skincare" as CanonicalRoute,
    description: "Haircare logs, skincare logs, product use, and visual-evidence boundaries.",
  },
  {
    label: "Proof",
    route: "/timeline" as CanonicalRoute,
    description: "Timeline and proof context connected to health/body execution records.",
  },
  {
    label: "Goals",
    route: "/goals" as CanonicalRoute,
    description: "Execution goals that health/body records may support.",
  },
  {
    label: "Calendar",
    route: "/calendar" as CanonicalRoute,
    description: "Calendar events linked to workouts, routines, sleep, and recovery context.",
  },
  {
    label: "Carnos",
    route: "/carnos" as CanonicalRoute,
    description: "Companion review surface for future proposed health/body records.",
  },
];

const HEALTH_BODY_PROPOSED_ACTION_PREVIEWS: ProposedActionContract[] = [
  {
    action_type: "create_task",
    source: "carnos",
    confidence: 0.7,
    reason:
      "Health/body context may suggest a follow-up routine task, but Phase 11 only previews the confirmation shape.",
    payload: {
      title: "Review a health/body routine follow-up",
      description:
        "Check existing body, nutrition, sleep, energy, emotion, haircare, or skincare records before deciding whether to save a task.",
      domain: "body",
      priority: "medium",
      status: "todo",
    },
    evidence_refs: ["body_logs", "workouts", "nutrition_logs", "sleep_logs", "energy_logs"],
  },
  {
    action_type: "create_goal",
    source: "carnos",
    confidence: 0.66,
    reason:
      "A health/body pattern could become a goal only after user review, validation, and server-owned persistence.",
    payload: {
      title: "Strengthen a proof-backed health/body routine",
      description:
        "Connect existing records, safety boundaries, and proof links before deciding whether to save a goal.",
      domain: "body",
      priority: "medium",
      status: "active",
    },
    evidence_refs: ["body_logs", "workouts", "sleep_logs", "proof_items"],
  },
  {
    action_type: "create_proof_item",
    source: "carnos",
    confidence: 0.69,
    reason:
      "A completed workout, routine, sleep milestone, or nutrition record may deserve proof capture, but this panel does not persist anything.",
    payload: {
      title: "Capture proof for a health/body milestone",
      proof_type: "metric",
      description:
        "Review the record and supporting context before using it as proof in goals, timeline, or personal progress tracking.",
      goal_id: "review-required",
      task_id: "review-required",
    },
    evidence_refs: ["workouts", "body_logs", "nutrition_logs", "sleep_logs", "skincare_logs"],
  },
];

export function HealthBodyProposedActionVisibilityPanel() {
  return (
    <SectionCard
      title="Health/body proposed-action visibility"
      eyebrow="11.39 confirmation preview"
      description="Preview-only Carnos proposal cards for future health/body suggestions. This dashboard does not save, cancel, execute, or persist proposals."
    >
      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
          This panel is visibility only. It uses disabled proposal cards to show the review shape.
          Health/body suggestions must remain separate from persistence until validation,
          user confirmation, server-owned writes, SQL records, and audit logging exist.
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {HEALTH_BODY_PROPOSED_ACTION_PREVIEWS.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              disabled
              saveLabel="Save / Confirm unavailable in Phase 11 dashboard preview"
              cancelLabel="Cancel unavailable in Phase 11 dashboard preview"
              editLabel="Edit payload unavailable in Phase 11 dashboard preview"
              reviewTitle="Health/body proposal preview"
              validationIssues={[
                "Preview only: this dashboard does not persist proposals.",
                "User confirmation and server-owned execution must remain separate from read dashboards.",
                "No medical, supplement, visual-evidence, or mental-health action is wired here.",
              ]}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export function HealthBodyStateBoundaryPanel({
  surface,
  readErrors = [],
}: {
  surface: HealthBodySurface;
  readErrors?: string[];
}) {
  const label = SURFACE_LABELS[surface];

  return (
    <SectionCard
      title={`${label} state and privacy boundary`}
      eyebrow="11.40 empty · loading · error · privacy"
      description="Consistent read-state and privacy language for Phase 11 health/body surfaces."
    >
      <div className="grid gap-4 text-sm leading-6 text-slate-400 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Empty state</p>
          <p className="mt-2">
            Empty panels mean no matching records exist yet, not that the system failed. New
            health/body records must appear only after safe write flows exist.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Loading state</p>
          <p className="mt-2">
            These surfaces are server-rendered after authenticated reads complete. Future loading
            skeletons must stay read-only and must not start background work.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Error state</p>
          <p className="mt-2">
            Read errors are shown inline through warnings. Errors must not trigger automatic
            writes, retries, product changes, health records, visual uploads, or AI execution.
          </p>
          {readErrors.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-rose-200">
              {readErrors.slice(0, 5).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Privacy boundary</p>
          <p className="mt-2">
            Health/body, emotion, mental-state, sleep, haircare, skincare, nutrition, supplement,
            and product data is private to the authenticated user. These dashboards only read
            existing records and do not expose, export, send, upload, or modify private data.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export function HealthBodyCrossLinks({
  activeRoute,
}: {
  activeRoute: CanonicalRoute;
}) {
  return (
    <CrossDashboardLinks
      activeRoute={activeRoute}
      title="Health/body system links"
      description="Move between health/body overview, nutrition, supplements, sleep-energy, emotion, hair-skincare, goals, timeline, calendar, and Carnos review surfaces."
      links={HEALTH_BODY_LINKS}
    />
  );
}
