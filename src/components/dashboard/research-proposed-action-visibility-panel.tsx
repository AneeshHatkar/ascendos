import { ProposedActionReviewCard } from "@/components/actions";
import { SectionCard } from "@/components/dashboard";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

const RESEARCH_PROPOSED_ACTION_PREVIEWS: ProposedActionContract[] = [
  {
    action_type: "create_task",
    source: "carnos",
    confidence: 0.73,
    reason:
      "Research dashboard context may suggest a next research execution task, but Phase 10 only previews the confirmation shape.",
    payload: {
      title: "Review the next research execution step",
      description:
        "Check ideas, literature, claims, experiments, paper state, and proof gaps before deciding whether to save a task.",
      domain: "research",
      priority: "medium",
      status: "todo",
    },
    evidence_refs: ["research_ideas", "research_literature_items", "research_experiments"],
  },
  {
    action_type: "create_goal",
    source: "carnos",
    confidence: 0.7,
    reason:
      "A paper, experiment, or PhD readiness target could become a goal only after user review and server-owned persistence.",
    payload: {
      title: "Advance a proof-backed research milestone",
      description:
        "Connect a research idea, experiment, paper version, and proof requirement into a concrete execution goal.",
      domain: "research",
      priority: "high",
      status: "active",
    },
    evidence_refs: ["research_papers", "research_experiments", "proof_items"],
  },
  {
    action_type: "create_proof_item",
    source: "carnos",
    confidence: 0.72,
    reason:
      "A completed experiment, accepted claim, paper draft, or PhD application asset may deserve proof capture, but this panel does not persist anything.",
    payload: {
      title: "Capture proof for a research or PhD milestone",
      proof_type: "metric",
      description:
        "Attach evidence before using this research/PhD milestone in a paper, SOP, resume, professor outreach, or application package.",
      goal_id: "review-required",
      task_id: "review-required",
    },
    evidence_refs: ["research_results", "research_paper_versions", "phd_application_assets"],
  },
];

export function ResearchProposedActionVisibilityPanel() {
  return (
    <SectionCard
      title="Research proposed-action visibility"
      eyebrow="10.28 confirmation preview"
      description="Read-only preview of how research and Stanford suggestions may appear before user confirmation. Phase 10 does not save, cancel, execute, or persist these proposals."
    >
      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
          This panel is visibility only. It uses the existing proposed-action review card to show
          the confirmation shape, but all controls are disabled here and no callbacks are wired.
          It must not create tasks, goals, proof items, papers, professor outreach, submissions,
          applications, scraping jobs, emails, or Python/ML execution.
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {RESEARCH_PROPOSED_ACTION_PREVIEWS.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              disabled
              saveLabel="Save / Confirm unavailable in Phase 10"
              cancelLabel="Cancel unavailable in Phase 10"
              editLabel="Edit payload unavailable in Phase 10"
              reviewTitle="Research proposal preview"
              validationIssues={[
                "Preview only: this research dashboard does not persist proposals.",
                "User confirmation flow must remain separate from Phase 10 read dashboards.",
                "No professor outreach, scraping, paper submission, or application action is wired.",
              ]}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
