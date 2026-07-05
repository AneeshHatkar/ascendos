import { DASHBOARD_REGISTRY } from "@/lib/dashboard-registry";

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-black/30 p-5 text-white lg:block">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">
          ascendOS
        </p>
        <h2 className="mt-2 text-xl font-semibold">Athena Shell</h2>
      </div>

      <nav className="mt-8 space-y-2">
        {DASHBOARD_REGISTRY.map((item) => (
          <a
            key={item.route}
            href={item.route}
            className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.07]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">{item.title}</span>
              <span className="text-[10px] uppercase tracking-widest text-cyan-200/70">
                {item.domain}
              </span>
            </div>
            <p className="mt-1 truncate text-xs text-white/40">{item.route}</p>
          </a>
        ))}
      </nav>
    </aside>
  );
}
