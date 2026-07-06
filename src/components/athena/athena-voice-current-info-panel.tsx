"use client";

import { useMemo, useState } from "react";

type AthenaVoiceCurrentInfoPanelProps = {
  readonly latestAssistantText: string;
  readonly onUseTranscript: (text: string) => void;
  readonly onUseCurrentInfoPrompt: (text: string) => void;
};

type PanelState =
  | { status: "idle"; message: string }
  | { status: "working"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type CurrentInfoReview = {
  ok?: boolean;
  error?: string;
  query?: string;
  requiresCurrentInfo?: boolean;
  status?: string;
  providerEnabled?: boolean;
  providerKind?: string;
  liveSearchPerformed?: boolean;
  sourceCount?: number;
  freshnessStatus?: string;
  freshnessExplanation?: string;
  answer?: string;
  warnings?: string[];
  saveRequiresConfirmation?: boolean;
  writesPerformed?: boolean;
  hiddenBrowsingPerformed?: boolean;
  browserSecretsExposed?: boolean;
};

type TranscribeResponse = {
  ok?: boolean;
  error?: string;
  status?: string;
  transcript_text?: string;
  confidence_score?: number;
  needs_review?: boolean;
  audio_saved?: boolean;
  audio_retained?: boolean;
  persisted?: boolean;
  proposed_action_created?: boolean;
};

type SpeakResponse = {
  ok?: boolean;
  error?: string;
  status?: string;
  audio_url?: string | null;
  audio_saved?: boolean;
  audio_retained?: boolean;
  persisted?: boolean;
  proposed_action_created?: boolean;
};

function statusTone(status: PanelState["status"]) {
  if (status === "error") return "border-red-400/20 bg-red-400/10 text-red-100";
  if (status === "success") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function compactText(text: string, limit = 420) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length <= limit ? compact : `${compact.slice(0, limit - 1)}…`;
}

export function AthenaVoiceCurrentInfoPanel({
  latestAssistantText,
  onUseTranscript,
  onUseCurrentInfoPrompt,
}: AthenaVoiceCurrentInfoPanelProps) {
  const [voiceState, setVoiceState] = useState<PanelState>({
    status: "idle",
    message:
      "Voice is click-to-review only. No always-listening, hidden recording, or audio upload is active.",
  });
  const [currentInfoState, setCurrentInfoState] = useState<PanelState>({
    status: "idle",
    message:
      "Current-info review is explicit. Athena will not claim live freshness unless a provider returns source-backed evidence.",
  });
  const [transcriptDraft, setTranscriptDraft] = useState("");
  const [transcriptReview, setTranscriptReview] = useState<TranscribeResponse | null>(null);
  const [currentInfoQuery, setCurrentInfoQuery] = useState("");
  const [currentInfoReview, setCurrentInfoReview] = useState<CurrentInfoReview | null>(null);
  const [speakReview, setSpeakReview] = useState<SpeakResponse | null>(null);

  const latestAssistantPreview = useMemo(
    () => compactText(latestAssistantText || "No Athena reply available yet."),
    [latestAssistantText],
  );

  async function reviewTranscript() {
    const text = transcriptDraft.trim();

    if (!text) {
      setVoiceState({
        status: "error",
        message: "Write or paste a transcript before review.",
      });
      return;
    }

    setVoiceState({
      status: "working",
      message: "Reviewing transcript through the server voice boundary…",
    });

    try {
      const response = await fetch("/api/voice/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "noop",
          transcriptText: text,
          metadata: {
            phase: "21H",
            assistant_display_name: "Athena",
            audio_uploaded: false,
            audio_saved: false,
            audio_retained: false,
            no_hidden_recording: true,
            requires_review_before_use: true,
          },
        }),
      });

      const payload = (await response.json()) as TranscribeResponse;

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Transcript review failed.");
      }

      setTranscriptReview(payload);
      setVoiceState({
        status: "success",
        message:
          "Transcript reviewed. Audio was not uploaded, saved, retained, or converted into an action.",
      });
    } catch (error) {
      setVoiceState({
        status: "error",
        message: error instanceof Error ? error.message : "Transcript review failed.",
      });
    }
  }

  async function reviewTalkBack() {
    const text = latestAssistantText.trim();

    if (!text) {
      setVoiceState({
        status: "error",
        message: "There is no Athena reply to review for talk-back.",
      });
      return;
    }

    setVoiceState({
      status: "working",
      message: "Checking talk-back through the server TTS boundary…",
    });

    try {
      const response = await fetch("/api/voice/speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "noop",
          text,
          metadata: {
            phase: "21H",
            assistant_display_name: "Athena",
            audio_saved: false,
            audio_retained: false,
            no_autoplay: true,
          },
        }),
      });

      const payload = (await response.json()) as SpeakResponse;

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Talk-back review failed.");
      }

      setSpeakReview(payload);
      setVoiceState({
        status: "success",
        message:
          "Talk-back boundary checked. No audio file was generated, saved, retained, or autoplayed.",
      });
    } catch (error) {
      setVoiceState({
        status: "error",
        message: error instanceof Error ? error.message : "Talk-back review failed.",
      });
    }
  }

  async function reviewCurrentInfo() {
    const query = currentInfoQuery.trim();

    if (!query) {
      setCurrentInfoState({
        status: "error",
        message: "Write a current-info question before review.",
      });
      return;
    }

    setCurrentInfoState({
      status: "working",
      message: "Checking current-info boundary without live browsing…",
    });

    try {
      const response = await fetch("/api/athena/current-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const payload = (await response.json()) as CurrentInfoReview;

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Current-info review failed.");
      }

      setCurrentInfoReview(payload);
      setCurrentInfoState({
        status: "success",
        message:
          "Current-info review complete. No live browsing, fake sources, or hidden save occurred.",
      });
    } catch (error) {
      setCurrentInfoState({
        status: "error",
        message: error instanceof Error ? error.message : "Current-info review failed.",
      });
    }
  }

  return (
    <section className="rounded-[2rem] border border-sky-300/20 bg-sky-950/20 p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-200/75">
            Athena voice + current-info
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Review before voice/current-info use
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-sky-100/75">
            Voice and current-info stay explicit: no always-listening, no hidden
            recording, no autoplay, no fake freshness, and no save without confirmation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-5 text-slate-300">
          STT/TTS provider: noop
          <br />
          Current-info provider: honest-disabled/noop
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Voice transcript review</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Browser microphone capture is not activated here. Paste or type the transcript,
            review it, then choose whether to place it into Athena chat.
          </p>

          <div className={`mt-4 rounded-2xl border p-3 text-sm leading-6 ${statusTone(voiceState.status)}`}>
            {voiceState.message}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-500"
              title="Disabled until a real STT provider and browser recording flow are configured."
            >
              Start recording disabled
            </button>

            <button
              type="button"
              disabled
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-500"
              title="No recording session is active."
            >
              Stop recording disabled
            </button>

            <button
              type="button"
              onClick={() => void reviewTalkBack()}
              className="rounded-full border border-sky-300/40 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-300/20"
            >
              Review talk-back boundary
            </button>
          </div>

          <textarea
            value={transcriptDraft}
            onChange={(event) => setTranscriptDraft(event.target.value)}
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/60"
            placeholder="Type or paste reviewed transcript text here..."
            maxLength={4000}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void reviewTranscript()}
              className="rounded-full border border-sky-300/40 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-300/20"
            >
              Review transcript
            </button>

            <button
              type="button"
              onClick={() => onUseTranscript(transcriptDraft)}
              className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/20"
            >
              Use in Athena draft
            </button>
          </div>

          {transcriptReview ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-slate-300">
              <p>Status: {transcriptReview.status}</p>
              <p>Needs review: {String(transcriptReview.needs_review)}</p>
              <p>Audio saved: {String(transcriptReview.audio_saved)}</p>
              <p>Audio retained: {String(transcriptReview.audio_retained)}</p>
              <p>Persisted: {String(transcriptReview.persisted)}</p>
              <p>Proposed action created: {String(transcriptReview.proposed_action_created)}</p>
            </div>
          ) : null}

          {speakReview ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-slate-300">
              <p>Talk-back status: {speakReview.status}</p>
              <p>Audio URL: {speakReview.audio_url ?? "none"}</p>
              <p>Audio saved: {String(speakReview.audio_saved)}</p>
              <p>Audio retained: {String(speakReview.audio_retained)}</p>
              <p>Autoplay: false</p>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-3 text-xs leading-5 text-slate-400">
            Latest Athena reply preview for talk-back review:
            <p className="mt-2 text-slate-300">{latestAssistantPreview}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-semibold text-white">Current-info review</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Ask a latest/current question here first. Athena will disclose whether live
            current-info is available before you rely on freshness.
          </p>

          <div className={`mt-4 rounded-2xl border p-3 text-sm leading-6 ${statusTone(currentInfoState.status)}`}>
            {currentInfoState.message}
          </div>

          <textarea
            value={currentInfoQuery}
            onChange={(event) => setCurrentInfoQuery(event.target.value)}
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/60"
            placeholder="Example: What are the latest AI conferences with upcoming deadlines?"
            maxLength={2000}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void reviewCurrentInfo()}
              className="rounded-full border border-sky-300/40 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-300/20"
            >
              Review current-info boundary
            </button>

            <button
              type="button"
              onClick={() =>
                onUseCurrentInfoPrompt(
                  [
                    currentInfoQuery,
                    "",
                    "Current-info transparency: live browsing is not configured, so do not claim freshness unless source-backed evidence is provided.",
                  ].join("\n"),
                )
              }
              className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/20"
            >
              Use in Athena draft
            </button>
          </div>

          {currentInfoReview ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-5 text-slate-300">
              <p>Status: {currentInfoReview.status}</p>
              <p>Requires current-info: {String(currentInfoReview.requiresCurrentInfo)}</p>
              <p>Live search performed: {String(currentInfoReview.liveSearchPerformed)}</p>
              <p>Sources: {currentInfoReview.sourceCount ?? 0}</p>
              <p>Freshness: {currentInfoReview.freshnessStatus}</p>
              <p className="mt-2 text-slate-400">{currentInfoReview.freshnessExplanation}</p>
              <p className="mt-2 text-slate-400">{currentInfoReview.answer}</p>

              {currentInfoReview.warnings && currentInfoReview.warnings.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1 pl-4 text-amber-100/90">
                  {currentInfoReview.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-3 text-slate-500">
                Save requires confirmation: {String(currentInfoReview.saveRequiresConfirmation)}
                {" · "}Writes performed: {String(currentInfoReview.writesPerformed)}
                {" · "}Hidden browsing: {String(currentInfoReview.hiddenBrowsingPerformed)}
              </p>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-3 text-xs leading-5 text-amber-100/80">
            Current-info findings are not saved from this panel. Use Athena safe cards
            or a later source-backed review flow after evidence exists.
          </div>
        </div>
      </div>
    </section>
  );
}
