"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Monitor,
  Image,
  Sparkles,
  Mic,
  Music,
  User,
  Bell,
  Gauge,
  ChevronRight,
  Sun,
  Moon,
  Upload,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const accentColors = [
  { name: "Indigo", value: "#6366f1", hue: 239 },
  { name: "Blue", value: "#3b82f6", hue: 217 },
  { name: "Cyan", value: "#06b6d4", hue: 188 },
  { name: "Green", value: "#10b981", hue: 160 },
  { name: "Amber", value: "#f59e0b", hue: 38 },
  { name: "Rose", value: "#f43f5e", hue: 350 },
  { name: "Purple", value: "#a855f7", hue: 271 },
  { name: "White", value: "#e5e5e5", hue: 0 },
];

const wallpapers = [
  { id: "dark-gradient", label: "Dark Gradient", bg: "bg-gradient-to-br from-neutral-950 via-black to-neutral-950" },
  { id: "blue-gradient", label: "Ocean", bg: "bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950" },
  { id: "purple-gradient", label: "Nebula", bg: "bg-gradient-to-br from-purple-950 via-slate-900 to-fuchsia-950" },
  { id: "green-gradient", label: "Forest", bg: "bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950" },
  { id: "warm-gradient", label: "Ember", bg: "bg-gradient-to-br from-amber-950 via-slate-900 to-red-950" },
  { id: "minimal", label: "Minimal", bg: "bg-black" },
];

const aiModels = [
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4", label: "GPT-4" },
  { id: "claude-sonnet", label: "Claude Sonnet" },
  { id: "gemini-pro", label: "Gemini Pro" },
];

type SettingsTab = "appearance" | "ai" | "voice" | "spotify" | "account" | "notifications" | "performance";

const settingsTabs = [
  { id: "appearance" as const, icon: Palette, label: "Appearance" },
  { id: "ai" as const, icon: Sparkles, label: "AI Preferences" },
  { id: "voice" as const, icon: Mic, label: "Voice" },
  { id: "spotify" as const, icon: Music, label: "Spotify" },
  { id: "account" as const, icon: User, label: "Account" },
  { id: "notifications" as const, icon: Bell, label: "Notifications" },
  { id: "performance" as const, icon: Gauge, label: "Performance" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [accent, setAccent] = useState("#6366f1");
  const [wallpaper, setWallpaper] = useState("dark-gradient");
  const [defaultModel, setDefaultModel] = useState("gpt-4o");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [spotifyConnected, setSpotifyConnected] = useState(false);

  const applyAccent = (color: typeof accentColors[0]) => {
    setAccent(color.value);
    document.documentElement.style.setProperty("--accent-hue", String(color.hue));
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-neutral-500 text-sm">Customize your workspace</p>
      </motion.div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 flex-shrink-0 space-y-1"
        >
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id && "accent-text")} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 max-w-2xl"
        >
          {activeTab === "appearance" && (
            <div className="space-y-6">
              {/* Theme */}
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-neutral-400" />
                  Theme Mode
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border transition-all",
                      theme === "dark"
                        ? "border-[var(--accent-color)] bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <Moon className="w-5 h-5 text-neutral-300" />
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">Dark</p>
                      <p className="text-neutral-500 text-xs">Black dominant</p>
                    </div>
                    {theme === "dark" && <Check className="w-4 h-4 accent-text ml-auto" />}
                  </button>
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border transition-all",
                      theme === "light"
                        ? "border-[var(--accent-color)] bg-white/5"
                        : "border-white/10 hover:border-white/20"
                    )}
                  >
                    <Sun className="w-5 h-5 text-neutral-300" />
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">Light</p>
                      <p className="text-neutral-500 text-xs">White dominant</p>
                    </div>
                    {theme === "light" && <Check className="w-4 h-4 accent-text ml-auto" />}
                  </button>
                </div>
              </GlassCard>

              {/* Accent Color */}
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-neutral-400" />
                  Accent Color
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {accentColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => applyAccent(color)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
                        accent === color.value
                          ? "border-white/30 bg-white/5"
                          : "border-white/5 hover:border-white/15"
                      )}
                    >
                      <div
                        className="w-8 h-8 rounded-full shadow-lg"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-neutral-400 text-[10px]">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Wallpaper */}
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Image className="w-4 h-4 text-neutral-400" />
                  Wallpaper
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {wallpapers.map((wp) => (
                    <button
                      key={wp.id}
                      onClick={() => setWallpaper(wp.id)}
                      className={cn(
                        "aspect-video rounded-lg border overflow-hidden transition-all",
                        wallpaper === wp.id
                          ? "border-[var(--accent-color)] ring-1 ring-[var(--accent-color)]"
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <div className={`w-full h-full ${wp.bg}`} />
                    </button>
                  ))}
                </div>
                <Button variant="glass" size="sm" className="gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Custom Wallpaper
                </Button>
              </GlassCard>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neutral-400" />
                  Default AI Model
                </h3>
                <div className="space-y-2">
                  {aiModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setDefaultModel(model.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all",
                        defaultModel === model.id
                          ? "border-[var(--accent-color)] bg-white/5 text-white"
                          : "border-white/5 text-neutral-400 hover:text-white hover:border-white/15"
                      )}
                    >
                      <span className="text-sm">{model.label}</span>
                      {defaultModel === model.id && (
                        <Check className="w-4 h-4 accent-text" />
                      )}
                    </button>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-white font-medium mb-2">Memory</h3>
                <p className="text-neutral-500 text-sm mb-4">
                  Allow AI to remember context across conversations
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300 text-sm">
                    Long-term memory
                  </span>
                  <button className="w-11 h-6 rounded-full bg-[var(--accent-color)] flex items-center p-0.5 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-white shadow-sm transform translate-x-5" />
                  </button>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "voice" && (
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-neutral-400" />
                  Voice Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Voice Mode</p>
                      <p className="text-neutral-500 text-xs">
                        Enable voice conversations
                      </p>
                    </div>
                    <button
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      className={cn(
                        "w-11 h-6 rounded-full flex items-center p-0.5 transition-colors",
                        voiceEnabled ? "bg-[var(--accent-color)]" : "bg-white/10"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                          voiceEnabled ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Auto-detect speech</p>
                      <p className="text-neutral-500 text-xs">
                        Start listening automatically
                      </p>
                    </div>
                    <button className="w-11 h-6 rounded-full bg-white/10 flex items-center p-0.5">
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "spotify" && (
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Music className="w-4 h-4 text-neutral-400" />
                  Spotify Connection
                </h3>
                {spotifyConnected ? (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm">Connected</p>
                        <p className="text-neutral-500 text-xs">Premium account</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSpotifyConnected(false)}
                      className="text-red-400"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Music className="w-10 h-10 text-green-500/50 mx-auto mb-3" />
                    <p className="text-neutral-400 text-sm mb-4">
                      Connect your Spotify account for playback controls
                    </p>
                    <Button
                      variant="glass"
                      onClick={() => setSpotifyConnected(true)}
                      className="gap-2"
                    >
                      <Music className="w-4 h-4" />
                      Connect Spotify
                    </Button>
                  </div>
                )}
              </GlassCard>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-400" />
                  Profile
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center">
                    <User className="w-7 h-7 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">User</p>
                    <p className="text-neutral-500 text-sm">user@email.com</p>
                    <p className="text-neutral-600 text-xs mt-1">
                      Joined May 2025
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-neutral-300 text-sm">Username</span>
                    <span className="text-neutral-500 text-sm">@user</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-neutral-300 text-sm">Display Name</span>
                    <span className="text-neutral-500 text-sm">User</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-neutral-300 text-sm">Email</span>
                    <span className="text-neutral-500 text-sm">
                      user@email.com
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neutral-400" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "AI task completion", desc: "When background agents finish" },
                    { label: "Voice call incoming", desc: "When AI initiates conversation" },
                    { label: "System updates", desc: "New features and improvements" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">{item.label}</p>
                        <p className="text-neutral-500 text-xs">{item.desc}</p>
                      </div>
                      <button className="w-11 h-6 rounded-full bg-[var(--accent-color)] flex items-center p-0.5">
                        <div className="w-5 h-5 rounded-full bg-white shadow-sm translate-x-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-neutral-400" />
                  Performance
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "GPU acceleration", desc: "Use hardware for animations" },
                    { label: "Reduced motion", desc: "Minimize animations" },
                    { label: "Lazy load widgets", desc: "Load widgets on demand" },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">{item.label}</p>
                        <p className="text-neutral-500 text-xs">{item.desc}</p>
                      </div>
                      <button
                        className={cn(
                          "w-11 h-6 rounded-full flex items-center p-0.5",
                          i === 0 ? "bg-[var(--accent-color)]" : "bg-white/10"
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full bg-white shadow-sm",
                            i === 0 ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
