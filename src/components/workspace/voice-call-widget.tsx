"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, Volume2, VolumeX, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceCallWidgetProps {
  active: boolean;
  onEnd: () => void;
}

export function VoiceCallWidget({ active, onEnd }: VoiceCallWidgetProps) {
  const [muted, setMuted] = useState(false);
  const [speakerOff, setSpeakerOff] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!active) {
      setDuration(0);
      return;
    }
    const interval = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-20 left-4 z-50"
      >
        {minimized ? (
          /* Compact mode */
          <motion.div
            layout
            className="glass-panel-heavy px-4 py-3 rounded-2xl flex items-center gap-3 cursor-pointer"
            onClick={() => setMinimized(false)}
          >
            {/* Pulsing indicator */}
            <div className="relative">
              <div className="w-3 h-3 rounded-full accent-bg" />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-3 h-3 rounded-full accent-bg"
              />
            </div>
            <span className="text-white text-xs font-medium">
              {formatDuration(duration)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEnd();
              }}
              className="w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <PhoneOff className="w-3 h-3 text-white" />
            </button>
          </motion.div>
        ) : (
          /* Expanded mode */
          <motion.div layout className="glass-panel-heavy rounded-2xl p-5 w-64">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500"
                  />
                </div>
                <span className="text-white text-sm font-medium">Voice Active</span>
              </div>
              <button
                onClick={() => setMinimized(true)}
                className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Waveform visualization */}
            <div className="flex items-center justify-center gap-[3px] h-12 mb-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full accent-bg"
                  animate={
                    muted
                      ? { height: 4 }
                      : { height: [4, Math.random() * 32 + 6, 4] }
                  }
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Agent info */}
            <div className="text-center mb-4">
              <p className="text-white text-sm font-medium">Stack AI</p>
              <p className="text-neutral-500 text-xs">
                {formatDuration(duration)}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setMuted(!muted)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  muted
                    ? "bg-red-500/20 text-red-400"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {muted ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setSpeakerOff(!speakerOff)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  speakerOff
                    ? "bg-red-500/20 text-red-400"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {speakerOff ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={onEnd}
                className="w-10 h-10 rounded-full bg-red-500/80 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
