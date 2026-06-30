import { VoiceBoundaryPanel } from "./voice-boundary-panel";
import { VoiceConfirmationPreview } from "./voice-confirmation-preview";
import { VoiceModeSelectorPreview } from "./voice-mode-selector-preview";
import { VoiceSessionControlsPreview } from "./voice-session-controls-preview";
import { VoiceTranscriptPreview } from "./voice-transcript-preview";

export function VoiceUiShellPreview() {
  return (
    <div className="space-y-5">
      <VoiceBoundaryPanel />
      <div className="grid gap-5 xl:grid-cols-2">
        <VoiceModeSelectorPreview />
        <VoiceSessionControlsPreview />
        <VoiceTranscriptPreview />
        <VoiceConfirmationPreview />
      </div>
    </div>
  );
}
