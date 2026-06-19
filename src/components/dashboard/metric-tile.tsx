import type { ReactNode } from "react";

type MetricTileProps = {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function MetricTile({
  label,
  value,
  description,
  icon,
  className = "",
}: MetricTileProps) {
  return (
    <div
      className={[
        "rounded-xl border border-slate-800 bg-slate-950/60 p-4",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
            {value}
          </p>
        </div>
        {icon ? (
          <div className="flex size-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300">
            {icon}
          </div>
        ) : null}
      </div>
      {description ? (
        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
