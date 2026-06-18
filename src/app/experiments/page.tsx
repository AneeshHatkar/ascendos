import { AppShell } from "@/components/layout/app-shell";

export default function ExperimentsPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
          ascendOS dashboard
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
          Experiments
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/55">
          Personal experiments, hypotheses, variables, observations, and conclusions.
        </p>

        <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-black/20 p-6">
          <p className="text-sm text-white/50">
            Placeholder page. Data models, Supabase wiring, and Carnos actions
            will be added in later phases.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
