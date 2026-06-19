type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

type StatusPillProps = {
  label: string;
  tone?: StatusTone;
  className?: string;
};

const toneClasses: Record<StatusTone, string> = {
  neutral: "border-slate-700 bg-slate-900 text-slate-300",
  success: "border-emerald-700/70 bg-emerald-950/70 text-emerald-300",
  warning: "border-amber-700/70 bg-amber-950/70 text-amber-300",
  danger: "border-rose-700/70 bg-rose-950/70 text-rose-300",
  info: "border-cyan-700/70 bg-cyan-950/70 text-cyan-300",
};

export function StatusPill({
  label,
  tone = "neutral",
  className = "",
}: StatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
