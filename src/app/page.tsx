import { DASHBOARD_REGISTRY } from "@/lib/dashboard-registry";
import { CANONICAL_ROUTES } from "@/lib/routes";

const coreSignals = [
  "Mission",
  "Proof",
  "Calendar",
  "Timeline",
  "Carnos",
  "Audit",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/45">
              ascendOS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Carnos Command Foundation
            </h1>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            Phase 2 Shell
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Turn ambition into evidence; turn evidence into evolution.
            </p>

            <h2 className="max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
              A personal operating system for proof-based evolution.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              ascendOS will coordinate goals, evidence, calendar reality,
              learning, career, health, research, grimoire translation,
              analytics, privacy, and Carnos-powered reflection through
              confirmed actions only.
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
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Canonical Dashboards</h3>
              <span className="text-sm text-white/45">
                {CANONICAL_ROUTES.length} routes
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {DASHBOARD_REGISTRY.map((item) => (
                <div
                  key={item.route}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{item.title}</p>
                    <code className="text-xs text-cyan-200">{item.route}</code>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
