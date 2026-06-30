"use client";

import { useMemo, useState } from "react";

import {
  VOICE_TRANSCRIPT_DRAFT_BOUNDARY_MARKERS,
  createVoiceTranscriptDraft,
  summarizeTranscriptDraft,
} from "@/lib/voice/transcript-draft";

export function VoiceManualSimulatorPreview() {
  const [transcriptText, setTranscriptText] = useState(
    "I worked on Phase 14 today and want to review whether this should become a task later.",
  );

  const draft = useMemo(
    () =>
      createVoiceTranscriptDraft({
        transcriptText,
        source: "manual_simulator",
        language: "en",
        notes:
          "Phase 14F manual simulator preview only. This does not save or execute.",
      }),
    [transcriptText],
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-2xl">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Phase 14F manual transcript simulator
        </p>
        <h2 className="text-xl font-semibold text-white">
          Transcript draft preview
        </h2>
        <p className="text-sm text-slate-300">
          Type text as if it came from voice. This creates a local draft preview
          only. It does not call STT, TTS, Carnos extraction, SQL, or the
          proposed-action execution bridge.
        </p>
      </div>

      <label className="mt-5 block text-sm font-medium text-slate-200">
        Manual transcript text
        <textarea
          className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
          value={transcriptText}
          onChange={(event) => setTranscriptText(event.target.value)}
          placeholder="Type a simulated transcript..."
        />
      </label>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Status
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {draft.status}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Review
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            needs_review: true
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Size
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {draft.wordCount} words · {draft.characterCount} chars
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Draft summary
        </p>
        <p className="mt-2 text-sm text-slate-200">
          {summarizeTranscriptDraft(draft)}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
          Protected boundary
        </p>
        <ul className="mt-3 space-y-1 text-sm text-amber-50/90">
          {VOICE_TRANSCRIPT_DRAFT_BOUNDARY_MARKERS.map((marker) => (
            <li key={marker}>• {marker}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
