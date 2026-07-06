"use client";

import { useEffect, useState } from "react";

import {
  isOfflineStorageAvailable,
  listOfflineSafeCardQueue,
  summarizeOfflineQueue,
  type OfflineSyncSummary,
} from "@/lib/storage/offline-sync";

function emptySummary(): OfflineSyncSummary {
  return {
    total: 0,
    queued: 0,
    syncing: 0,
    failed: 0,
    synced: 0,
  };
}

export function OfflineSyncStatusPill() {
  const [online, setOnline] = useState(true);
  const [summary, setSummary] = useState<OfflineSyncSummary>(emptySummary);
  const [available, setAvailable] = useState(false);

  async function refresh() {
    setAvailable(isOfflineStorageAvailable());

    if (typeof navigator !== "undefined") {
      setOnline(navigator.onLine);
    }

    if (!isOfflineStorageAvailable()) {
      setSummary(emptySummary());
      return;
    }

    try {
      const items = await listOfflineSafeCardQueue();
      setSummary(summarizeOfflineQueue(items));
    } catch {
      setSummary(emptySummary());
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);

    const handleChange = () => {
      void refresh();
    };

    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    window.addEventListener("ascendos-offline-queue-changed", handleChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
      window.removeEventListener("ascendos-offline-queue-changed", handleChange);
    };
  }, []);

  const label = !available
    ? "unavailable"
    : online
      ? summary.queued + summary.failed > 0
        ? "sync ready"
        : "online"
      : "offline";

  const tone = !available
    ? "text-amber-300"
    : online
      ? summary.failed > 0
        ? "text-amber-300"
        : "text-emerald-300"
      : "text-orange-300";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
        Offline
      </p>
      <p className={`mt-1 text-xs font-semibold ${tone}`}>
        {label}
      </p>
      <p className="mt-1 text-[10px] text-white/35">
        {summary.queued} queued · {summary.failed} failed
      </p>
    </div>
  );
}
