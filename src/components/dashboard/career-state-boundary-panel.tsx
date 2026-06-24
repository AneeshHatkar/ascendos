import { SectionCard } from "@/components/dashboard";

interface CareerStateBoundaryPanelProps {
  surface: "career" | "networking" | "resume" | "interviews";
}

const SURFACE_LABELS: Record<CareerStateBoundaryPanelProps["surface"], string> = {
  career: "Career",
  networking: "Networking",
  resume: "Resume",
  interviews: "Interviews",
};

export function CareerStateBoundaryPanel({ surface }: CareerStateBoundaryPanelProps) {
  const label = SURFACE_LABELS[surface];

  return (
    <SectionCard
      title={`${label} state and privacy boundary`}
      eyebrow="empty · loading · error · privacy"
      description="Consistent Phase 8 read-state language for career surfaces."
    >
      <div className="grid gap-4 text-sm leading-6 text-slate-400 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Empty state</p>
          <p className="mt-2">
            Empty panels mean no matching records exist yet, not that the system failed.
            New career records must appear only after user-confirmed persistence paths exist.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Loading state</p>
          <p className="mt-2">
            This surface is server-rendered after authenticated reads complete. Future loading skeletons
            must stay read-only and must not start background jobs.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Error state</p>
          <p className="mt-2">
            Read errors are shown inline through safe error summaries. Errors must not trigger automatic
            retries, writes, emails, scraping, or Python/ML execution.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Privacy boundary</p>
          <p className="mt-2">
            Career data is private to the authenticated user. This dashboard only reads existing records
            and does not expose, export, send, or modify private career data.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
