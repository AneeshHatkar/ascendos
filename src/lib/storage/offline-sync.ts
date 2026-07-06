export type OfflineQueueStatus = "queued" | "syncing" | "failed" | "synced";

export type OfflineSafeCardQueueItem = {
  id: string;
  kind: "athena_safe_card";
  createdAt: string;
  updatedAt: string;
  attempts: number;
  status: OfflineQueueStatus;
  sourceText: string;
  routeContext: string;
  proposedAction: unknown;
  lastError?: string;
};

export type OfflineDraftCacheItem = {
  id: string;
  kind: "text_draft";
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
  routeContext: string;
  staleAfter: string;
  status: "cached" | "stale" | "deleted";
};

export type OfflineSyncSummary = {
  total: number;
  queued: number;
  syncing: number;
  failed: number;
  synced: number;
};

const DB_NAME = "ascendos_phase_21k_offline";
const DB_VERSION = 1;
const SAFE_CARD_STORE = "safe_card_queue";
const DRAFT_STORE = "draft_cache";

const MAX_TEXT_LENGTH = 4000;
const SECRET_PATTERNS = [
  "sk-",
  "api_key",
  "apikey",
  "access_token",
  "refresh_token",
  "client_secret",
  "authorization: bearer",
  "bearer ",
  "openai_api_key",
  "spotify_client_secret",
];

function nowIso() {
  return new Date().toISOString();
}

function id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `offline-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function assertBrowserIndexedDb() {
  if (typeof window === "undefined" || typeof indexedDB === "undefined") {
    throw new Error("IndexedDB is not available in this environment.");
  }
}

function compactText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function containsSecretSignal(value: string) {
  const normalized = value.toLowerCase();

  return SECRET_PATTERNS.some((pattern) => normalized.includes(pattern));
}

function assertNoSecretLikeContent(value: unknown) {
  const text = typeof value === "string" ? value : JSON.stringify(value);

  if (containsSecretSignal(text)) {
    throw new Error(
      "This looks like it may contain an API key, token, secret, or bearer credential. Offline storage refused it.",
    );
  }
}

function requestToPromise<T = unknown>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
  });
}

function transactionDone(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error("IndexedDB transaction failed."));
    transaction.onabort = () => reject(transaction.error ?? new Error("IndexedDB transaction aborted."));
  });
}

export function isOfflineStorageAvailable() {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

export function isBrowserOnline() {
  if (typeof navigator === "undefined") {
    return true;
  }

  return navigator.onLine;
}

export function dispatchOfflineQueueChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ascendos-offline-queue-changed"));
  }
}

export async function openOfflineSyncDb() {
  assertBrowserIndexedDb();

  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(SAFE_CARD_STORE)) {
        const safeCardStore = db.createObjectStore(SAFE_CARD_STORE, {
          keyPath: "id",
        });
        safeCardStore.createIndex("status", "status", { unique: false });
        safeCardStore.createIndex("createdAt", "createdAt", { unique: false });
      }

      if (!db.objectStoreNames.contains(DRAFT_STORE)) {
        const draftStore = db.createObjectStore(DRAFT_STORE, {
          keyPath: "id",
        });
        draftStore.createIndex("status", "status", { unique: false });
        draftStore.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open offline IndexedDB."));
  });
}

export async function queueOfflineSafeCard(input: {
  proposedAction: unknown;
  sourceText: string;
  routeContext: string;
}) {
  assertNoSecretLikeContent(input.sourceText);
  assertNoSecretLikeContent(input.proposedAction);

  const timestamp = nowIso();
  const item: OfflineSafeCardQueueItem = {
    id: id(),
    kind: "athena_safe_card",
    createdAt: timestamp,
    updatedAt: timestamp,
    attempts: 0,
    status: "queued",
    sourceText: compactText(input.sourceText).slice(0, MAX_TEXT_LENGTH),
    routeContext: compactText(input.routeContext).slice(0, 240),
    proposedAction: input.proposedAction,
  };

  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(SAFE_CARD_STORE, "readwrite");
    transaction.objectStore(SAFE_CARD_STORE).put(item);
    await transactionDone(transaction);
    dispatchOfflineQueueChanged();

    return item;
  } finally {
    db.close();
  }
}

export async function saveOfflineDraftCache(input: {
  title: string;
  body: string;
  routeContext: string;
}) {
  assertNoSecretLikeContent(input.title);
  assertNoSecretLikeContent(input.body);

  const timestamp = nowIso();
  const staleAfterDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const item: OfflineDraftCacheItem = {
    id: id(),
    kind: "text_draft",
    createdAt: timestamp,
    updatedAt: timestamp,
    title: compactText(input.title).slice(0, 160) || "Untitled offline draft",
    body: input.body.slice(0, MAX_TEXT_LENGTH),
    routeContext: compactText(input.routeContext).slice(0, 240),
    staleAfter: staleAfterDate.toISOString(),
    status: "cached",
  };

  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(DRAFT_STORE, "readwrite");
    transaction.objectStore(DRAFT_STORE).put(item);
    await transactionDone(transaction);
    dispatchOfflineQueueChanged();

    return item;
  } finally {
    db.close();
  }
}

export async function listOfflineSafeCardQueue() {
  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(SAFE_CARD_STORE, "readonly");
    const items = await requestToPromise<OfflineSafeCardQueueItem[]>(
      transaction.objectStore(SAFE_CARD_STORE).getAll(),
    );

    return items.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  } finally {
    db.close();
  }
}

export async function listOfflineDraftCache() {
  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(DRAFT_STORE, "readonly");
    const items = await requestToPromise<OfflineDraftCacheItem[]>(
      transaction.objectStore(DRAFT_STORE).getAll(),
    );

    const now = Date.now();

    return items
      .map((item) =>
        item.status === "cached" && new Date(item.staleAfter).getTime() < now
          ? { ...item, status: "stale" as const }
          : item,
      )
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  } finally {
    db.close();
  }
}

export async function deleteOfflineQueueItem(itemId: string) {
  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(SAFE_CARD_STORE, "readwrite");
    transaction.objectStore(SAFE_CARD_STORE).delete(itemId);
    await transactionDone(transaction);
    dispatchOfflineQueueChanged();
  } finally {
    db.close();
  }
}

export async function deleteOfflineDraft(itemId: string) {
  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(DRAFT_STORE, "readwrite");
    transaction.objectStore(DRAFT_STORE).delete(itemId);
    await transactionDone(transaction);
    dispatchOfflineQueueChanged();
  } finally {
    db.close();
  }
}

export async function clearSyncedOfflineQueueItems() {
  const items = await listOfflineSafeCardQueue();
  const synced = items.filter((item) => item.status === "synced");

  await Promise.all(synced.map((item) => deleteOfflineQueueItem(item.id)));

  return synced.length;
}

async function updateSafeCardQueueItem(item: OfflineSafeCardQueueItem) {
  const db = await openOfflineSyncDb();

  try {
    const transaction = db.transaction(SAFE_CARD_STORE, "readwrite");
    transaction.objectStore(SAFE_CARD_STORE).put(item);
    await transactionDone(transaction);
    dispatchOfflineQueueChanged();
  } finally {
    db.close();
  }
}

export function summarizeOfflineQueue(items: OfflineSafeCardQueueItem[]): OfflineSyncSummary {
  return {
    total: items.length,
    queued: items.filter((item) => item.status === "queued").length,
    syncing: items.filter((item) => item.status === "syncing").length,
    failed: items.filter((item) => item.status === "failed").length,
    synced: items.filter((item) => item.status === "synced").length,
  };
}

export async function syncOfflineSafeCardQueue() {
  if (!isBrowserOnline()) {
    return {
      synced: 0,
      failed: 0,
      skipped: 0,
      message: "Browser is offline. Queue sync skipped.",
    };
  }

  const items = await listOfflineSafeCardQueue();
  const candidates = items
    .filter((item) => item.status === "queued" || item.status === "failed")
    .slice(0, 8);

  let synced = 0;
  let failed = 0;

  for (const item of candidates) {
    const syncingItem: OfflineSafeCardQueueItem = {
      ...item,
      status: "syncing",
      attempts: item.attempts + 1,
      updatedAt: nowIso(),
      lastError: undefined,
    };

    await updateSafeCardQueueItem(syncingItem);

    try {
      const response = await fetch("/api/athena/save-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposed_action: item.proposedAction,
          source_text: item.sourceText,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        status?: string;
        message?: string;
      };

      if (!response.ok || payload.status !== "success") {
        throw new Error(payload.message ?? "Safe-card sync failed.");
      }

      await updateSafeCardQueueItem({
        ...syncingItem,
        status: "synced",
        updatedAt: nowIso(),
      });
      synced += 1;
    } catch (error) {
      await updateSafeCardQueueItem({
        ...syncingItem,
        status: "failed",
        updatedAt: nowIso(),
        lastError:
          error instanceof Error ? error.message : "Safe-card sync failed.",
      });
      failed += 1;
    }
  }

  return {
    synced,
    failed,
    skipped: Math.max(0, items.length - candidates.length),
    message: `Sync complete. Synced ${synced}; failed ${failed}.`,
  };
}
