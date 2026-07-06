import Link from "next/link";

import { ManualDashboardProposalComposer } from "./manual-dashboard-proposal-composer";

type ManualDashboardActivationPanelProps = {
  surface: string;
  defaultDomain?: Parameters<typeof ManualDashboardProposalComposer>[0]["defaultDomain"];
  title?: string;
  description?: string;
};

const reviewLinks = [
  { href: "/command", label: "Command" },
  { href: "/goals", label: "Goals" },
  { href: "/calendar", label: "Calendar" },
  { href: "/timeline", label: "Timeline" },
  { href: "/privacy", label: "Privacy" },
];

export function ManualDashboardActivationPanel({
  surface,
  defaultDomain = "general",
  title,
  description,
}: ManualDashboardActivationPanelProps) {
  return (
    <div className="space-y-4">
      <ManualDashboardProposalComposer
        surface={surface}
        defaultDomain={defaultDomain}
        title={title}
        description={description}
      />

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
          manual activation boundary
        </p>
        <h3 className="mt-2 text-lg font-semibold text-white">
          Review-before-write workflow
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Manual dashboard activation in Phase 21C uses the existing proposal
          queue. The app can capture tasks, goals, and proof as pending updates,
          but final writes must still go through validation, ownership checks,
          approval/rejection, server-owned execution, and audit logging.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {reviewLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
