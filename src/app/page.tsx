import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { AppShell } from "@/components/layout/app-shell";
import { DASHBOARD_REGISTRY } from "@/lib/dashboard-registry";
import { CANONICAL_ROUTES } from "@/lib/routes";

const coreSignals = [
  "Mission",
  "Proof",
  "Calendar",
  "Timeline",
  "Athena",
  "Audit",
];

export default function Home() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <p className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Turn ambition into evidence; turn evidence into evolution.
            </p>

            <h2 className="max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
              A personal operating system for proof-based evolution.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              ascendOS coordinates goals, proof, calendar reality, learning,
              career, health, research, grimoire translation, analytics,
              privacy, and Athena-powered reflection through confirmed actions
              only.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {coreSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
                >
                  {signal}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Canonical Foundation</h3>
              <span className="text-sm text-white/45">
                {CANONICAL_ROUTES.length} routes
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {DASHBOARD_REGISTRY.map((item) => (
                <DashboardCard
                  key={item.route}
                  title={item.title}
                  route={item.route}
                  description={item.description}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  );
}
