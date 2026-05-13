import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccentColor {
  name: string;
  value: string;
  hue: number;
}

interface PreferencesState {
  // Appearance
  theme: "dark" | "light";
  accentColor: AccentColor;
  wallpaper: string;
  customWallpaper: string | null;

  // AI
  defaultModel: string;
  memoryEnabled: boolean;
  streamingEnabled: boolean;

  // Voice
  voiceEnabled: boolean;
  voiceModel: string;
  autoDetectSpeech: boolean;

  // Performance
  gpuAcceleration: boolean;
  reducedMotion: boolean;
  lazyLoadWidgets: boolean;

  // Notifications
  notifyTaskComplete: boolean;
  notifyVoiceCall: boolean;
  notifyUpdates: boolean;

  // Spotify
  spotifyConnected: boolean;

  // Actions
  setTheme: (theme: "dark" | "light") => void;
  setAccentColor: (color: AccentColor) => void;
  setWallpaper: (wallpaper: string) => void;
  setCustomWallpaper: (url: string | null) => void;
  setDefaultModel: (model: string) => void;
  setMemoryEnabled: (enabled: boolean) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setVoiceModel: (model: string) => void;
  setAutoDetectSpeech: (enabled: boolean) => void;
  setGpuAcceleration: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setLazyLoadWidgets: (enabled: boolean) => void;
  setSpotifyConnected: (connected: boolean) => void;
  setNotification: (key: "notifyTaskComplete" | "notifyVoiceCall" | "notifyUpdates", value: boolean) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      // Appearance defaults
      theme: "dark",
      accentColor: { name: "Indigo", value: "#6366f1", hue: 239 },
      wallpaper: "dark-gradient",
      customWallpaper: null,

      // AI defaults
      defaultModel: "gpt-4o",
      memoryEnabled: true,
      streamingEnabled: true,

      // Voice defaults
      voiceEnabled: true,
      voiceModel: "alloy",
      autoDetectSpeech: false,

      // Performance defaults
      gpuAcceleration: true,
      reducedMotion: false,
      lazyLoadWidgets: true,

      // Notifications defaults
      notifyTaskComplete: true,
      notifyVoiceCall: true,
      notifyUpdates: true,

      // Spotify
      spotifyConnected: false,

      // Actions
      setTheme: (theme) => set({ theme }),
      setAccentColor: (color) => {
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty("--accent-hue", String(color.hue));
        }
        set({ accentColor: color });
      },
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setCustomWallpaper: (url) => set({ customWallpaper: url }),
      setDefaultModel: (model) => set({ defaultModel: model }),
      setMemoryEnabled: (enabled) => set({ memoryEnabled: enabled }),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      setVoiceModel: (model) => set({ voiceModel: model }),
      setAutoDetectSpeech: (enabled) => set({ autoDetectSpeech: enabled }),
      setGpuAcceleration: (enabled) => set({ gpuAcceleration: enabled }),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
      setLazyLoadWidgets: (enabled) => set({ lazyLoadWidgets: enabled }),
      setSpotifyConnected: (connected) => set({ spotifyConnected: connected }),
      setNotification: (key, value) => set({ [key]: value }),
    }),
    {
      name: "stack-preferences",
    }
  )
);
