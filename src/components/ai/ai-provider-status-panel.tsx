import { getAiProviderPublicStatus } from "@/lib/ai";

const statusCopy = {
  disabled: {
    label: "Disabled",
    className: "border-white/10 bg-white/[0.03] text-white/60",
  },
  missing_api_key: {
    label: "Missing server key",
    className: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  },
  ready: {
    label: "Ready",
    className: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  },
  misconfigured: {
    label: "Misconfigured",
    className: "border-red-300/30 bg-red-300/10 text-red-100",
  },
};

function BooleanPill({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
      {label}:{" "}
      <span className={value ? "text-emerald-200" : "text-white/40"}>
        {value ? "yes" : "no"}
      </span>
    </span>
  );
}

export function AiProviderStatusPanel() {
  const status = getAiProviderPublicStatus();
  const copy = statusCopy[status.status];

  return (
    <section className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.04] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
            Athena Provider Boundary
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            OpenAI server-side provider status
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
            This panel exposes only sanitized provider readiness. It never shows
            API keys, never stores provider secrets in the browser, and does not
            perform AI calls or writes in this phase.
          </p>
        </div>

        <span className={`rounded-full border px-4 py-2 text-xs font-medium ${copy.className}`}>
          {copy.label}
        </span>
      </div>

      {status.disabledReason ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
          {status.disabledReason}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
          Provider boundary is ready for future Athena runtime calls. Direct
          writes and automatic tool execution are still blocked.
        </div>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Model
          </p>
          <p className="mt-2 text-sm text-white">
            {status.model ?? "Not active"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Request guard
          </p>
          <p className="mt-2 text-sm text-white">
            {status.costGuard.requestTokenLimit.toLocaleString()} token request limit
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Daily guard
          </p>
          <p className="mt-2 text-sm text-white">
            {status.costGuard.dailyTokenBudget.toLocaleString()} token daily budget
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <BooleanPill label="enabled flag" value={status.configuredEnv.enabledFlagPresent} />
        <BooleanPill label="server key present" value={status.configuredEnv.apiKeyPresent} />
        <BooleanPill label="model set" value={status.configuredEnv.modelPresent} />
        <BooleanPill label="request guard set" value={status.configuredEnv.requestTokenLimitPresent} />
        <BooleanPill label="daily guard set" value={status.configuredEnv.dailyTokenBudgetPresent} />
        <BooleanPill label="spend guard set" value={status.configuredEnv.monthlySpendLimitPresent} />
      </div>

      <div className="mt-5 grid gap-3 text-sm text-white/60 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-medium text-white">Blocked by design</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>No browser-side API keys.</li>
            <li>No localStorage or IndexedDB secrets.</li>
            <li>No direct record writes.</li>
            <li>No automatic tool execution.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-medium text-white">Allowed in this phase</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Server-side provider readiness detection.</li>
            <li>Disabled/missing-key/configured UI states.</li>
            <li>Sanitized provider status endpoint.</li>
            <li>Cost guard values without usage execution.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
