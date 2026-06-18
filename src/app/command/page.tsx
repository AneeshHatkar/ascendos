import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";

const commandModules = [
  "Proof feed",
  "Today queue",
  "Carnos proposals",
  "Timeline pulse",
  "Goal pressure",
  "System alerts",
];

export default function CommandPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          Command Center
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Proof-first control room
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
          This dashboard will become the daily execution hub for ascendOS:
          proof, goals, Carnos proposals, timeline events, risks, and next
          actions. It is currently connected to the auth/profile foundation
          without requiring live Supabase keys during local setup.
        </p>
      </section>

      <ProfileSummaryCard />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {commandModules.map((module) => (
          <div
            key={module}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <p className="text-sm font-medium text-white">{module}</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Pending real data wiring after the SQL spine and confirmation
              system are established.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
