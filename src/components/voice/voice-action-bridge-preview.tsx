"use client";

import { useMemo, useState } from "react";

import {
  VOICE_ACTION_BRIDGE_ALLOWED_ACTION_TYPES,
  VOICE_ACTION_BRIDGE_BOUNDARY_MARKERS,
  deriveVoiceActionBridgeCandidate,
  summarizeVoiceActionBridgeCandidate,
} from "@/lib/voice/voice-action-bridge";
import { createVoiceTranscriptDraft } from "@/lib/voice/transcript-draft";

export function VoiceActionBridgePreview() {
  const [transcriptText, setTranscriptText] = useState(
    "Review my job application tracker tomorrow and create a task to follow up with the recruiter.",
  );

  const draft = useMemo(
    () =>
      createVoiceTranscriptDraft({
        transcriptText,
        source: "typed_text",
        language: "en",
        notes:
          "Phase 14H bridge preview. This creates only a local proposed-action candidate.",
      }),
    [transcriptText],
  );

  const candidate = useMemo(
    () => deriveVoiceActionBridgeCandidate(draft),
    [draft],
  );

  return (
    <section className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.04] p-5 shadow-2xl">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Phase 14H text / voice bridge preview
        </p>
        <h2 className="text-xl font-semibold text-white">
          Transcript draft to review candidate
        </h2>
        <p className="text-sm text-slate-300">
          This local bridge turns a reviewed transcript draft into a preview-only
          proposed-action contract candidate. It does not persist, execute, call
          AI, call providers, or write to SQL.
        </p>
      </div>

      <label className="mt-5 block text-sm font-medium text-slate-200">
        Simulated reviewed transcript
        <textarea
          className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
          value={transcriptText}
          onChange={(event) => setTranscriptText(event.target.value)}
          placeholder="Type a reviewed transcript draft..."
        />
      </label>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Decision
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {candidate.decision}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Confidence
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {Math.round(candidate.confidence * 100)}%
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Contract
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {candidate.contract?.action_type ?? "none"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Bridge summary
        </p>
        <p className="mt-2 text-sm text-slate-200">
          {summarizeVoiceActionBridgeCandidate(candidate)}
        </p>
      </div>

      {candidate.contract ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Candidate payload preview
          </p>
          <pre className="mt-3 overflow-auto rounded-xl bg-slate-950/80 p-3 text-xs leading-5 text-slate-200">
            {JSON.stringify(candidate.contract.payload, null, 2)}
          </pre>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Allowed action types
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            {VOICE_ACTION_BRIDGE_ALLOWED_ACTION_TYPES.map((actionType) => (
              <li key={actionType}>• {actionType}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Protected boundary
          </p>
          <ul className="mt-3 space-y-1 text-sm text-amber-50/90">
            {VOICE_ACTION_BRIDGE_BOUNDARY_MARKERS.map((marker) => (
              <li key={marker}>• {marker}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
