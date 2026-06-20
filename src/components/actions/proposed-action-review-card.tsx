"use client";

import { useMemo, useState } from "react";

import {
  PROPOSED_ACTION_TYPE_DESCRIPTIONS,
  PROPOSED_ACTION_TYPE_LABELS,
} from "@/lib/actions/action-types";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

export interface ProposedActionReviewCardProps {
  initialAction: ProposedActionContract;
  disabled?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  editLabel?: string;
  reviewTitle?: string;
  validationIssues?: string[];
  onSave?: (action: ProposedActionContract) => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseEditedAction(
  initialAction: ProposedActionContract,
  payloadText: string,
): { status: "success"; action: ProposedActionContract } | { status: "error"; message: string } {
  try {
    const parsedPayload = JSON.parse(payloadText) as unknown;

    if (!isRecord(parsedPayload)) {
      return {
        status: "error",
        message: "Edited payload must be a JSON object.",
      };
    }

    return {
      status: "success",
      action: {
        ...initialAction,
        payload: parsedPayload as unknown as ProposedActionContract["payload"],
      } as ProposedActionContract,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Invalid JSON payload.",
    };
  }
}

export function ProposedActionReviewCard({
  initialAction,
  disabled = false,
  saveLabel = "Save / Confirm",
  cancelLabel = "Cancel",
  editLabel = "Edit payload",
  reviewTitle = "Proposed action review",
  validationIssues = [],
  onSave,
  onCancel,
}: ProposedActionReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [payloadText, setPayloadText] = useState(formatJson(initialAction.payload));
  const [parseError, setParseError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actionLabel = PROPOSED_ACTION_TYPE_LABELS[initialAction.action_type];
  const actionDescription = PROPOSED_ACTION_TYPE_DESCRIPTIONS[initialAction.action_type];

  const previewPayload = useMemo(() => {
    const parsed = parseEditedAction(initialAction, payloadText);

    if (parsed.status === "error") {
      return initialAction.payload;
    }

    return parsed.action.payload;
  }, [initialAction, payloadText]);

  async function handleSave() {
    const parsed = parseEditedAction(initialAction, payloadText);

    if (parsed.status === "error") {
      setParseError(parsed.message);
      return;
    }

    setParseError(null);
    setIsSubmitting(true);

    try {
      await onSave?.(parsed.action);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCancel() {
    setIsSubmitting(true);

    try {
      await onCancel?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  const isBusy = disabled || isSubmitting;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {reviewTitle}
          </p>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-slate-100">{actionLabel}</h2>
            <p className="text-sm text-slate-400">{actionDescription}</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400">Source</span>
            <span className="font-medium text-slate-200">{initialAction.source}</span>
          </div>

          {typeof initialAction.confidence === "number" ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Confidence</span>
              <span className="font-medium text-slate-200">
                {Math.round(initialAction.confidence * 100)}%
              </span>
            </div>
          ) : null}

          {initialAction.reason ? (
            <div className="grid gap-1">
              <span className="text-slate-400">Reason</span>
              <p className="text-slate-200">{initialAction.reason}</p>
            </div>
          ) : null}
        </div>

        {validationIssues.length > 0 ? (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
            <p className="text-sm font-semibold text-amber-200">Validation issues</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-100">
              {validationIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-200">Payload</p>
            <button
              type="button"
              className="rounded-lg border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isBusy}
              onClick={() => {
                setParseError(null);
                setIsEditing((value) => !value);
              }}
            >
              {isEditing ? "Preview payload" : editLabel}
            </button>
          </div>

          {isEditing ? (
            <textarea
              className="min-h-72 w-full rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-50"
              value={payloadText}
              disabled={isBusy}
              onChange={(event) => {
                setPayloadText(event.target.value);
                setParseError(null);
              }}
              spellCheck={false}
            />
          ) : (
            <pre className="max-h-80 overflow-auto rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-100">
              {formatJson(previewPayload)}
            </pre>
          )}

          {parseError ? (
            <p className="text-sm text-red-300">Payload JSON error: {parseError}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isBusy}
            onClick={() => void handleCancel()}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isBusy}
            onClick={() => void handleSave()}
          >
            {isSubmitting ? "Saving..." : saveLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
