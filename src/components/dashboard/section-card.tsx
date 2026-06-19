import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  description,
  eyebrow,
  action,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-sm shadow-black/20",
        "backdrop-blur",
        className,
      ].join(" ")}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-lg font-semibold text-slate-50">{title}</h2>
          {description ? (
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
