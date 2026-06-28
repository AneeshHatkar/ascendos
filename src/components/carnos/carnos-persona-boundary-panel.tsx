import {
  CARNOS_PERSONA_LAYERS,
  CARNOS_RUNTIME_BOUNDARIES,
  CARNOS_SAFETY_RULES,
  CARNOS_TONE_RULES,
} from "@/lib/carnos/persona-contract";

type CarnosPersonaBoundaryPanelProps = {
  hasActiveDatabasePrompt?: boolean;
  activeVersionName?: string | null;
};

export function CarnosPersonaBoundaryPanel({
  hasActiveDatabasePrompt = false,
  activeVersionName = null,
}: CarnosPersonaBoundaryPanelProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">
          Carnos persona foundation
        </p>
        <h2 className="text-xl font-semibold text-white">Carnos v1 is locked.</h2>
        <p className="max-w-3xl text-sm leading-6 text-white/65">
          Carnos is the loyal friend, operator, coach, guardian, analyst, mirror,
          research/career mentor, and grimoire guide inside ascendOS. This panel
          locks the personality and safety contract before Voice, Memory, Web
          Search, or real assistant generation are connected.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Active prompt
          </p>
          <p className="mt-2 text-sm font-medium text-white">
            {hasActiveDatabasePrompt
              ? activeVersionName ?? "Database persona prompt"
              : "Default Carnos v1 contract"}
          </p>
          <p className="mt-2 text-xs leading-5 text-white/50">
            Database prompt versions are supported through
            persona_prompt_versions. If none exists, the locked code contract is
            used as the baseline.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Runtime boundary
          </p>
          <ul className="mt-2 space-y-1 text-xs leading-5 text-white/55">
            {Object.entries(CARNOS_RUNTIME_BOUNDARIES).map(([key, value]) => (
              <li key={key}>
                <span className="text-white/75">{key}</span>: {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Persona layers
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CARNOS_PERSONA_LAYERS.map((layer) => (
              <span
                key={layer}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/65"
              >
                {layer.replaceAll("_", " ")}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Tone rules
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CARNOS_TONE_RULES.map((rule) => (
              <span
                key={rule}
                className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-100/80"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Safety rules
          </p>
          <ul className="mt-3 space-y-1.5 text-xs leading-5 text-white/60">
            {CARNOS_SAFETY_RULES.map((rule) => (
              <li key={rule}>• {rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
