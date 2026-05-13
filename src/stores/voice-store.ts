import { create } from "zustand";

interface VoiceState {
  // Call state
  callActive: boolean;
  callDuration: number;
  muted: boolean;
  speakerOff: boolean;
  minimized: boolean;

  // Current agent
  agentName: string;
  voiceModel: string;

  // Actions
  startCall: (agentName?: string) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleSpeaker: () => void;
  toggleMinimized: () => void;
  incrementDuration: () => void;
  setVoiceModel: (model: string) => void;
}

export const useVoiceStore = create<VoiceState>((set) => ({
  callActive: false,
  callDuration: 0,
  muted: false,
  speakerOff: false,
  minimized: false,
  agentName: "Stack AI",
  voiceModel: "alloy",

  startCall: (agentName = "Stack AI") =>
    set({
      callActive: true,
      callDuration: 0,
      muted: false,
      speakerOff: false,
      minimized: false,
      agentName,
    }),

  endCall: () =>
    set({
      callActive: false,
      callDuration: 0,
      muted: false,
      speakerOff: false,
      minimized: false,
    }),

  toggleMute: () => set((state) => ({ muted: !state.muted })),
  toggleSpeaker: () => set((state) => ({ speakerOff: !state.speakerOff })),
  toggleMinimized: () => set((state) => ({ minimized: !state.minimized })),
  incrementDuration: () =>
    set((state) => ({ callDuration: state.callDuration + 1 })),
  setVoiceModel: (model) => set({ voiceModel: model }),
}));
