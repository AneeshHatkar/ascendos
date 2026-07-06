import type { ReactNode } from "react";

import { OfflineSyncStatusPill } from "@/components/storage/offline-sync-status-pill";
import { AuthStatus } from "./auth-status";

type AppTopbarProps = {
  menuSlot?: ReactNode;
};

const statusItems = [
  {
    label: "AI provider",
    value: "status-gated",
    tone: "info",
  },
  {
    label: "Privacy",
    value: "manual-first",
    tone: "success",
  },
  {
    label: "Connectors",
    value: "scoped",
    tone: "neutral",
  },
] as const;

type StatusTone = (typeof statusItems)[number]["tone"];

function statusToneClass(tone: StatusTone) {
  if (tone === "success") return "text-emerald-300";
  if (tone === "info") return "text-cyan-300";

  return "text-white/65";
}

export function AppTopbar({ menuSlot }: AppTopbarProps) {
  return (
    <header className="border-b border-white/10 bg-black/20 px-4 py-4 text-white sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          {menuSlot}

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Proof-first operating system
            </p>
            <h1 className="mt-1 text-lg font-semibold">ascendOS + Athena</h1>
            <p className="mt-1 text-xs text-white/45">
              Phase 21 shell: grouped navigation, honest states, and safe status
              visibility.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            aria-label="Global app status"
          >
            {statusItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {item.label}
                  </p>
                  <p className={`mt-1 text-xs font-semibold ${statusToneClass(item.tone)}`}>
                    {item.value}
                  </p>
                </div>
            ))}
            <OfflineSyncStatusPill />
          </div>

          <AuthStatus />
        </div>
      </div>
    </header>
  );
}
