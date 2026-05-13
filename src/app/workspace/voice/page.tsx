"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { VoiceCallWidget } from "@/components/workspace/voice-call-widget";
import {
  Mic,
  Phone,
  Settings,
  Volume2,
  ChevronDown,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

const voiceModels = [
  { id: "alloy", name: "Alloy", desc: "Neutral and balanced" },
  { id: "echo", name: "Echo", desc: "Warm and conversational" },
  { id: "nova", name: "Nova", desc: "Gentle and clear" },
  { id: "shimmer", name: "Shimmer", desc: "Expressive and dynamic" },
  { id: "onyx", name: "Onyx", desc: "Deep and authoritative" },
  { id: "fable", name: "Fable", desc: "Soft and narrative" },
];

const recentCalls = [
  { id: "1", title: "Architecture discussion", duration: "4:32", date: "Today" },
  { id: "2", title: "Code review brainstorm", duration: "12:08", date: "Yesterday" },
  { id: "3", title: "Product ideation session", duration: "7:45", date: "2 days ago" },
];

export default function VoicePage() {
  const [callActive, setCallActive] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("alloy");

  return (
    <div className="h-full overflow-y-auto custom-scrollbar space-y-6">
      {/* Floating call widget */}
      <VoiceCallWidget
        active={callActive}
        onEnd={() => setCallActive(false)}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Voice Mode</h1>
        <p className="text-neutral-500 text-sm">
          Real-time voice conversations with AI
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main call area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2"
        >
          <GlassCard className="flex flex-col items-center justify-center min-h-[400px] text-center">
            {!callActive ? (
              <>
                {/* Idle state */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-28 rounded-full accent-bg opacity-60 flex items-center justify-center mb-8"
                >
                  <Mic className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-white text-xl font-semibold mb-2">
                  Start a Voice Session
                </h2>
                <p className="text-neutral-500 text-sm max-w-sm mb-8">
                  Have a natural conversation with Stack AI. Navigate freely
                  while the floating call widget stays visible.
                </p>

                <Button
                  onClick={() => setCallActive(true)}
                  variant="accent"
                  size="lg"
                  className="gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Begin Call
                </Button>
              </>
            ) : (
              <>
                {/* Active state */}
                <div className="flex items-center justify-center gap-1 h-24 mb-6">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full accent-bg"
                      animate={{
                        height: [6, Math.random() * 60 + 10, 6],
                      }}
                      transition={{
                        duration: 1 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: i * 0.04,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                <h2 className="text-white text-xl font-semibold mb-2">
                  Listening...
                </h2>
                <p className="text-neutral-500 text-sm mb-8">
                  Speak naturally. AI will respond in real-time.
                </p>

                <Button
                  onClick={() => setCallActive(false)}
                  variant="glass"
                  size="lg"
                  className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Phone className="w-4 h-4" />
                  End Call
                </Button>
              </>
            )}
          </GlassCard>
        </motion.div>

        {/* Right panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Voice Selection */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-4 h-4 text-neutral-400" />
              <h3 className="text-white text-sm font-medium">Voice Model</h3>
            </div>
            <div className="space-y-1.5">
              {voiceModels.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedVoice === voice.id
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{voice.name}</span>
                  <span className="text-neutral-600 text-xs">{voice.desc}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Recent calls */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-neutral-400" />
              <h3 className="text-white text-sm font-medium">Recent Calls</h3>
            </div>
            <div className="space-y-2">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-neutral-300 text-xs">{call.title}</p>
                    <p className="text-neutral-600 text-[10px]">{call.date}</p>
                  </div>
                  <span className="text-neutral-500 text-xs font-mono">
                    {call.duration}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
