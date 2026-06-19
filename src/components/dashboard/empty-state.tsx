import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  footer,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={[
        "rounded-xl border border-dashed border-slate-800 bg-slate-950/50 px-5 py-8 text-center",
        className,
      ].join(" ")}
    >
      {icon ? (
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300">
          {icon}
        </div>
      ) : null}
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
        {description}
      </p>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}
