import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import type { MemoryCandidateEngineResult } from "@/lib/carnos-continuity";

/**
 * Phase 15E — Memory Inbox UI preview.
 *
 * This component renders reviewable memory candidate previews only.
 * It does not approve, edit, reject, archive, forget, persist, retrieve,
 * embed, inject, execute, or call Supabase/providers.
 */

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

interface MemoryInboxPreviewPanelProps {
  candidates?: MemoryCandidateEngineResult[];
  readErrors?: string[];
  surface?: "carnos" | "privacy" | "knowledge" | "preview";
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readString(value: unknown, fallback = "Not set"): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function toneForSensitivity(value: string): Tone {
  if (value === "restricted") return "danger";
  if (value === "high") return "warning";
  if (value === "medium") return "info";
  if (value === "low") return "success";
  return "neutral";
}

function toneForStatus(value: string): Tone {
  if (value === "candidate" || value === "pending_review") return "warning";
  if (value === "approved") return "success";
  if (value === "rejected" || value === "forgotten") return "danger";
  if (value.startsWith("blocked")) return "danger";
  if (value === "needs_review" || value === "stale") return "info";
  return "neutral";
}

function toneForBlockCount(count: number): Tone {
  return count > 0 ? "danger" : "success";
}

function candidateRecord(result: MemoryCandidateEngineResult): Record<string, unknown> {
  const record = asRecord(result);
  const candidate = asRecord(record.candidate);

  if (Object.keys(candidate).length > 0) {
    return candidate;
  }

  return record;
}

function resultRecord(result: MemoryCandidateEngineResult): Record<string, unknown> {
  return asRecord(result);
}

function getCandidateId(result: MemoryCandidateEngineResult, index: number): string {
  const candidate = candidateRecord(result);
  return readString(candidate.id, `memory-candidate-preview-${index}`);
}

function getCandidateTitle(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);

  return (
    readString(candidate.title, "") ||
    readString(candidate.summary, "") ||
    readString(candidate.content, "Untitled memory candidate")
  );
}

function getCandidateContent(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);

  return (
    readString(candidate.normalized_text, "") ||
    readString(candidate.content, "") ||
    readString(candidate.raw_text, "No candidate text available.")
  );
}

function getCandidateType(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);
  return readString(candidate.memory_type, "candidate");
}

function getCandidateStatus(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);
  const record = resultRecord(result);

  return (
    readString(candidate.status, "") ||
    readString(record.status, "") ||
    "pending_review"
  );
}

function getCandidateSensitivity(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);
  return readString(candidate.sensitivity, "medium");
}

function getCandidateDomain(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);
  return readString(candidate.domain_scope, "general");
}

function getCandidateSource(result: MemoryCandidateEngineResult): string {
  const candidate = candidateRecord(result);
  const provenance = asRecord(candidate.provenance);
  const sourceType = readString(candidate.source_type, "");
  const provenanceType = readString(provenance.source_type, "");

  return sourceType || provenanceType || "unknown_source";
}

function getCandidateConfidence(result: MemoryCandidateEngineResult): number {
  const candidate = candidateRecord(result);
  return readNumber(candidate.confidence, 0);
}

function getCandidatePriority(result: MemoryCandidateEngineResult): number {
  const candidate = candidateRecord(result);
  return readNumber(candidate.priority, 0);
}

function getBlockedReasons(result: MemoryCandidateEngineResult): unknown[] {
  const record = resultRecord(result);
  return asArray(record.blocked_reasons);
}

function getDuplicateHints(result: MemoryCandidateEngineResult): unknown[] {
  const record = resultRecord(result);
  return asArray(record.duplicate_hints);
}

function getConflictHints(result: MemoryCandidateEngineResult): unknown[] {
  const record = resultRecord(result);
  return asArray(record.conflict_hints);
}

function formatReason(value: unknown, fallback: string): string {
  const record = asRecord(value);

  return (
    readString(record.reason, "") ||
    readString(record.message, "") ||
    readString(record.type, "") ||
    readString(record.code, "") ||
    fallback
  );
}

function MemoryInboxDisabledControls() {
  const controls = [
    "Approve disabled",
    "Edit disabled",
    "Reject disabled",
    "Archive disabled",
    "Forget disabled",
    "Mark sensitive disabled",
    "Merge disabled",
    "Resolve conflict disabled",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {controls.map((label) => (
        <button
          key={label}
          type="button"
          disabled
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-500 opacity-70"
          aria-label={`${label} in Phase 15E preview`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function MemoryCandidatePreviewCard({
  result,
  index,
}: {
  result: MemoryCandidateEngineResult;
  index: number;
}) {
  const status = getCandidateStatus(result);
  const sensitivity = getCandidateSensitivity(result);
  const blockedReasons = getBlockedReasons(result);
  const duplicateHints = getDuplicateHints(result);
  const conflictHints = getConflictHints(result);

  return (
    <article className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Memory candidate preview · {getCandidateId(result, index)}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
            {getCandidateTitle(result)}
          </h3>
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
            {getCandidateContent(result)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
          <StatusPill label={status} tone={toneForStatus(status)} />
          <StatusPill label={sensitivity} tone={toneForSensitivity(sensitivity)} />
          <StatusPill label={getCandidateType(result)} tone="info" />
          <StatusPill label={getCandidateDomain(result)} tone="neutral" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <MetricTile
          label="Confidence"
          value={`${Math.round(getCandidateConfidence(result) * 100)}%`}
          description="Preview confidence only."
        />
        <MetricTile
          label="Priority"
          value={getCandidatePriority(result)}
          description="Review priority."
        />
        <MetricTile
          label="Blocks"
          value={blockedReasons.length}
          description="Private/do-not-remember blocks."
        />
        <MetricTile
          label="Source"
          value={getCandidateSource(result)}
          description="Provenance preview."
        />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Blocking warnings"
          eyebrow="private mode / do-not-remember"
          description="Blocks are displayed only; no rule is created or changed here."
        >
          {blockedReasons.length === 0 ? (
            <StatusPill label="No blocking reasons" tone={toneForBlockCount(0)} />
          ) : (
            <div className="grid gap-2 text-sm leading-6 text-slate-400">
              {blockedReasons.map((reason, reasonIndex) => (
                <p key={`${getCandidateId(result, index)}-block-${reasonIndex}`}>
                  • {formatReason(reason, "Blocked reason")}
                </p>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="Duplicate hints"
          eyebrow="lightweight dedupe"
          description="Hints only. Merge stays disabled until a later confirmed write phase."
        >
          {duplicateHints.length === 0 ? (
            <StatusPill label="No duplicate hints" tone="success" />
          ) : (
            <div className="grid gap-2 text-sm leading-6 text-slate-400">
              {duplicateHints.map((hint, hintIndex) => (
                <p key={`${getCandidateId(result, index)}-duplicate-${hintIndex}`}>
                  • {formatReason(hint, "Possible duplicate")}
                </p>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="Conflict hints"
          eyebrow="source hierarchy"
          description="Conflict visibility only. Resolution remains disabled in Phase 15E."
        >
          {conflictHints.length === 0 ? (
            <StatusPill label="No conflict hints" tone="success" />
          ) : (
            <div className="grid gap-2 text-sm leading-6 text-slate-400">
              {conflictHints.map((hint, hintIndex) => (
                <p key={`${getCandidateId(result, index)}-conflict-${hintIndex}`}>
                  • {formatReason(hint, "Possible conflict")}
                </p>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Review controls preview
        </p>
        <MemoryInboxDisabledControls />
      </div>
    </article>
  );
}

export function MemoryInboxPreviewPanel({
  candidates = [],
  readErrors = [],
  surface = "preview",
}: MemoryInboxPreviewPanelProps) {
  const blockedCount = candidates.filter((candidate) => getBlockedReasons(candidate).length > 0).length;
  const duplicateCount = candidates.filter((candidate) => getDuplicateHints(candidate).length > 0).length;
  const conflictCount = candidates.filter((candidate) => getConflictHints(candidate).length > 0).length;
  const restrictedCount = candidates.filter(
    (candidate) => getCandidateSensitivity(candidate) === "restricted",
  ).length;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 15E Memory Inbox UI
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Memory Inbox Preview
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Review surface for memory candidate previews from Carnos continuity.
          This panel shows candidate text, memory type, sensitivity, provenance,
          confidence, priority, duplicate hints, conflict hints, private-mode
          blocks, and do-not-remember blocks. It does not approve memory, save
          memory, persist memory, retrieve memory, embed memory, inject hidden
          context, execute actions, call Supabase, call external model providers, or create a
          standalone /memory route.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricTile label="Candidates" value={candidates.length} description="Preview records only." />
          <MetricTile label="Blocked" value={blockedCount} description="Private/rule blocked." />
          <MetricTile label="Duplicates" value={duplicateCount} description="Candidate hint count." />
          <MetricTile label="Conflicts" value={conflictCount} description="Candidate hint count." />
          <MetricTile label="Restricted" value={restrictedCount} description="Sensitive lock preview." />
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Surface: {surface}. Phase 15E is UI-only; Phase 15F handles privacy controls,
          Phase 15G handles approved read rules, and Phase 15K expands Carnos memory visibility.
        </p>
      </section>

      {readErrors.length > 0 ? (
        <EmptyState
          title="Some memory candidates could not be previewed."
          description={readErrors.join(" · ")}
        />
      ) : null}

      <SectionCard
        title="Candidate review queue"
        eyebrow="memory_review_queue preview"
        description="Candidates appear here for human review. All review buttons are intentionally disabled in this phase."
      >
        {candidates.length === 0 ? (
          <EmptyState
            title="No memory candidates pending preview."
            description="When the Phase 15D candidate engine is connected to a later review surface, candidate previews will appear here before any approval or persistence is allowed."
          />
        ) : (
          <div className="grid gap-4">
            {candidates.map((candidate, index) => (
              <MemoryCandidatePreviewCard
                key={getCandidateId(candidate, index)}
                result={candidate}
                index={index}
              />
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Protected boundaries"
        eyebrow="Phase 15E disabled scope"
        description="The Memory Inbox UI is intentionally non-mutating."
      >
        <div className="grid gap-2 text-sm leading-6 text-slate-400 md:grid-cols-2">
          <p>• No approval.</p>
          <p>• No persistence.</p>
          <p>• No retrieval.</p>
          <p>• No embeddings.</p>
          <p>• No provider calls.</p>
          <p>• No Supabase calls.</p>
          <p>• No standalone `/memory` route.</p>
          <p>• No hidden Carnos prompt injection.</p>
          <p>• No automatic transcript-to-memory.</p>
          <p>• No do-not-remember rule mutation.</p>
        </div>
      </SectionCard>
    </div>
  );
}

export const PHASE_15E_MEMORY_INBOX_UI_BOUNDARY = [
  "Phase 15E",
  "Memory Inbox UI",
  "reviewable candidate previews",
  "approve disabled",
  "edit disabled",
  "reject disabled",
  "archive disabled",
  "forget disabled",
  "mark sensitive disabled",
  "merge disabled",
  "resolve conflict disabled",
  "duplicate hints",
  "conflict hints",
  "private mode blocks",
  "do-not-remember blocks",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no Supabase calls",
  "no standalone /memory route",
  "no hidden Carnos prompt injection",
  "no automatic transcript-to-memory",
  "Phase 15F — Privacy, Private Mode, Do-Not-Remember Rules",
] as const;
