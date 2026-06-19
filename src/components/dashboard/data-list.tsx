import type { ReactNode } from "react";

export type DataListItem = {
  id: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
};

type DataListProps = {
  items: DataListItem[];
  emptyState: ReactNode;
  className?: string;
};

export function DataList({ items, emptyState, className = "" }: DataListProps) {
  if (items.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className={["divide-y divide-slate-800/80", className].join(" ")}>
      {items.map((item) => (
        <article key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
          {item.leading ? <div className="shrink-0">{item.leading}</div> : null}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-slate-100">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                ) : null}
              </div>
              {item.trailing ? <div className="shrink-0">{item.trailing}</div> : null}
            </div>
            {item.meta ? <div className="mt-2 text-xs text-slate-500">{item.meta}</div> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
