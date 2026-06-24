import { ProposedActionReviewCard } from "@/components/actions";
import { SectionCard } from "@/components/dashboard";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

const CAREER_PROPOSED_ACTION_PREVIEWS: ProposedActionContract[] = [
  {
    action_type: "create_task",
    source: "carnos",
    confidence: 0.72,
    reason: "Career dashboard context suggests a follow-up task could be useful, but Phase 8 only displays the proposal.",
    payload: {
      title: "Follow up on a high-priority career opportunity",
      description: "Review application status, contact history, and next follow-up date before deciding whether to save this task.",
      domain: "career",
      priority: "medium",
      status: "todo",
    },
    evidence_refs: ["job_applications", "networking_contacts"],
  },
  {
    action_type: "create_goal",
    source: "carnos",
    confidence: 0.68,
    reason: "The career system can surface a goal-shaped suggestion, but it must remain user-reviewed before any persistence.",
    payload: {
      title: "Strengthen the career application pipeline",
      description: "Improve application quality, referral coverage, resume alignment, and interview readiness.",
      domain: "career",
      priority: "high",
      status: "active",
    },
    evidence_refs: ["job_applications", "resume_bullets", "interviews"],
  },
  {
    action_type: "create_proof_item",
    source: "carnos",
    confidence: 0.74,
    reason: "Resume bullets may need supporting proof, but Phase 8 only exposes the review surface.",
    payload: {
      title: "Capture evidence for a resume metric claim",
      proof_type: "metric",
      description: "Attach measurable evidence before using the claim in an application-specific resume.",
      goal_id: "review-required",
      task_id: "review-required",
    },
    evidence_refs: ["resume_bullets", "proof_items"],
  },
];

export function CareerProposedActionVisibilityPanel() {
  return (
    <SectionCard
      title="Career proposed-action visibility"
      eyebrow="confirmation preview"
      description="Read-only preview of how career suggestions will appear before user confirmation. Phase 8 does not save, cancel, execute, or persist these proposals."
    >
      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
          This panel is visibility only. It uses the existing proposed-action review card to show the confirmation shape,
          but all controls are disabled here and no callbacks are wired.
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {CAREER_PROPOSED_ACTION_PREVIEWS.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              disabled
              saveLabel="Save / Confirm unavailable in Phase 8"
              cancelLabel="Cancel unavailable in Phase 8"
              editLabel="Edit payload unavailable in Phase 8"
              reviewTitle="Career proposal preview"
              validationIssues={[
                "Preview only: this career dashboard does not persist proposals.",
                "User confirmation flow must remain separate from Phase 8 read dashboards.",
              ]}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
