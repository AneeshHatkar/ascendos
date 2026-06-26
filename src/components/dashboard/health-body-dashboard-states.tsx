interface HealthBodyEmptyStateProps {
  title: string;
  description: string;
}

interface HealthBodyBoundaryNoticeProps {
  title?: string;
  description?: string;
}

interface HealthBodyWarningPanelProps {
  warnings: string[];
}

export function HealthBodyEmptyState({ title, description }: HealthBodyEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">empty state</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

export function HealthBodyBoundaryNotice({
  title = "Read-only health boundary",
  description = "This dashboard can summarize existing health/body records only. New health, body, nutrition, sleep, supplement, emotion, haircare, or skincare records must wait for confirmed safe-write flows.",
}: HealthBodyBoundaryNoticeProps) {
  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 leading-6 text-cyan-100/80">{description}</p>
    </div>
  );
}

export function HealthBodyWarningPanel({ warnings }: HealthBodyWarningPanelProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
      <p className="font-semibold">Some health/body reads returned warnings.</p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </div>
  );
}

export function HealthBodyPrivacyNotice() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
      <p className="font-semibold text-white">Private health/body data</p>
      <p className="mt-2 leading-6">
        Health, sleep, emotion, nutrition, supplement, haircare, and skincare records are treated as
        sensitive personal data. This surface avoids diagnosis, treatment claims, body-shaming
        language, supplement claims, and autonomous changes.
      </p>
    </div>
  );
}
