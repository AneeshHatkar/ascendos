import Link from "next/link";

import type { CanonicalRoute } from "@/lib/routes";

type CrossDashboardLink = {
  label: string;
  route: CanonicalRoute;
  description: string;
};

const CORE_DASHBOARD_LINKS: CrossDashboardLink[] = [
  {
    label: "Command",
    route: "/command",
    description: "Today mission, proof pressure, and pending updates.",
  },
  {
    label: "Timeline",
    route: "/timeline",
    description: "Recent operating history and dated evidence.",
  },
  {
    label: "Calendar",
    route: "/calendar",
    description: "Time, tasks, events, and schedule pressure.",
  },
  {
    label: "Goals",
    route: "/goals",
    description: "Dream-to-proof loop and active goal reality.",
  },
  {
    label: "Carnos",
    route: "/carnos",
    description: "Companion context and confirmation visibility.",
  },
];

interface CrossDashboardLinksProps {
  activeRoute: CanonicalRoute;
  title?: string;
  description?: string;
}

export function CrossDashboardLinks({
  activeRoute,
  title = "Core dashboard links",
  description = "Move between the Phase 7 operating surfaces without leaving the source-approved route map.",
}: CrossDashboardLinksProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Navigation loop
        </p>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {CORE_DASHBOARD_LINKS.map((item) => {
          const isActive = item.route === activeRoute;

          return (
            <Link
              key={item.route}
              href={item.route}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-4 text-cyan-50"
                  : "rounded-2xl border border-white/10 bg-black/20 p-4 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
              }
            >
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="mt-2 block text-xs leading-5 text-slate-400">
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
