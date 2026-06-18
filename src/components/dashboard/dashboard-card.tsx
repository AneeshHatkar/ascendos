type DashboardCardProps = {
  title: string;
  route: string;
  description: string;
};

export function DashboardCard({
  title,
  route,
  description,
}: DashboardCardProps) {
  return (
    <a
      href={route}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium text-white">{title}</h3>
        <code className="rounded-full bg-black/30 px-3 py-1 text-xs text-cyan-200">
          {route}
        </code>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
    </a>
  );
}
