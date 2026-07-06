"use client";

import { usePathname } from "next/navigation";

import { DASHBOARD_REGISTRY } from "@/lib/dashboard-registry";
import { ROUTE_GROUPS, type CanonicalRoute } from "@/lib/routes";

type AppSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

function getRegistryItem(route: CanonicalRoute) {
  return DASHBOARD_REGISTRY.find((item) => item.route === route);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">
          ascendOS
        </p>
        <h2 className="mt-2 text-xl font-semibold">Athena Shell</h2>
        <p className="mt-2 text-xs leading-5 text-white/45">
          Manual-first life OS with Athena as the visible companion. Carnos
          internals stay compatibility-only.
        </p>
      </div>

      <nav className="mt-8 flex-1 space-y-6 overflow-y-auto pr-1">
        {ROUTE_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`nav-group-${group.id}`}>
            <div className="mb-2">
              <h3
                id={`nav-group-${group.id}`}
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200/70"
              >
                {group.label}
              </h3>
              <p className="mt-1 text-[11px] leading-4 text-white/35">
                {group.description}
              </p>
            </div>

            <div className="space-y-2">
              {group.routes.map((route) => {
                const item = getRegistryItem(route);

                if (!item) {
                  return null;
                }

                const active = pathname === item.route;

                return (
                  <a
                    key={item.route}
                    href={item.route}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-2xl border px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                      active
                        ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_24px_rgba(103,232,249,0.08)]"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40">
                        {item.domain}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-white/40">
                      {item.route}
                    </p>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">
          21B shell lock
        </p>
        <p className="mt-2 text-xs leading-5 text-white/50">
          Navigation is grouped by the Phase 21 build order. Manual dashboards
          remain usable even when AI, voice, current-info, or connectors are
          disabled.
        </p>
      </div>
    </div>
  );
}

export function AppSidebar({ mobileOpen = false, onClose }: AppSidebarProps) {
  return (
    <>
      <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-black/30 p-5 text-white lg:block">
        <SidebarContent />
      </aside>

      {mobileOpen ? (
        <div id="ascendos-mobile-navigation" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 w-[min(22rem,88vw)] border-r border-white/10 bg-[#07070a] p-5 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold">Navigation</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Close
              </button>
            </div>
            <SidebarContent onNavigate={onClose} />
          </aside>
        </div>
      ) : null}
    </>
  );
}
