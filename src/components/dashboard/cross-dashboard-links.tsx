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

const CAREER_DASHBOARD_LINKS: CrossDashboardLink[] = [
  {
    label: "Career",
    route: "/career",
    description: "Applications, interviews, referrals, resumes, and career pressure.",
  },
  {
    label: "Networking",
    route: "/networking",
    description: "Contacts, interactions, referrals, and follow-up loops.",
  },
  {
    label: "Resume",
    route: "/resume",
    description: "Resume versions, bullets, keywords, metrics, and proof links.",
  },
  {
    label: "Interviews",
    route: "/interviews",
    description: "Rounds, prep notes, outcomes, schedules, and follow-up pressure.",
  },
];

const RESEARCH_DASHBOARD_LINKS: CrossDashboardLink[] = [
  {
    label: "Research Lab",
    route: "/research-lab",
    description: "Ideas, literature, claims, experiments, results, papers, and proof linkage.",
  },
  {
    label: "Research Stanford",
    route: "/research-stanford",
    description: "Universities, labs, professors, SOPs, recommendations, and PhD readiness.",
  },
  {
    label: "Projects",
    route: "/projects",
    description: "Research-backed portfolio projects, releases, demos, and evidence.",
  },
  {
    label: "Learning",
    route: "/learning",
    description: "Skill paths and practice loops that support research execution.",
  },
  {
    label: "World-Class Proof",
    route: "/world-class",
    description: "Evidence and proof standards that support research claims, papers, SOPs, and applications.",
  },
  {
    label: "Resume",
    route: "/resume",
    description: "Proof-backed resume packaging for research, projects, and PhD applications.",
  },
  {
    label: "Goals",
    route: "/goals",
    description: "Execution goals connected to research milestones and application readiness.",
  },
  {
    label: "Carnos",
    route: "/carnos",
    description: "Companion review surface and proposed-action visibility.",
  },
];

interface CrossDashboardLinksProps {
  activeRoute: CanonicalRoute;
  title?: string;
  description?: string;
  links?: CrossDashboardLink[];
}

export function CrossDashboardLinks({
  activeRoute,
  title = "Core dashboard links",
  description = "Move between the Phase 7 operating surfaces without leaving the source-approved route map.",
  links = CORE_DASHBOARD_LINKS,
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

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {links.map((item) => {
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

export function CareerCrossDashboardLinks({ activeRoute }: { activeRoute: CanonicalRoute }) {
  return (
    <CrossDashboardLinks
      activeRoute={activeRoute}
      title="Career system links"
      description="Move between the Phase 8 career surfaces: applications, networking, resume versions, and interviews."
      links={CAREER_DASHBOARD_LINKS}
    />
  );
}

export function ResearchCrossDashboardLinks({ activeRoute }: { activeRoute: CanonicalRoute }) {
  return (
    <CrossDashboardLinks
      activeRoute={activeRoute}
      title="Research system links"
      description="Move between Phase 10 research surfaces and the proof, project, learning, career, and Carnos context that supports research execution."
      links={RESEARCH_DASHBOARD_LINKS}
    />
  );
}
