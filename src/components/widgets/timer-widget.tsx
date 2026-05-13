"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Play, Pause, RotateCcw } from "lucide-react";

export function TimerWidget() {
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 minutes default
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;

  const reset = () => {
    setRunning(false);
    setRemaining(totalSeconds);
  };

  const handleTimeInput = (value: string) => {
    const mins = parseInt(value) || 0;
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemaining(secs);
    setEditing(false);
  };

  // Circle progress
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - progress);

  return (
    <GlassCard className="h-full flex flex-col items-center justify-center min-h-[200px]">
      {/* Progress ring */}
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--accent-color)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          {editing ? (
            <input
              type="number"
              autoFocus
              defaultValue={Math.ceil(totalSeconds / 60)}
              onBlur={(e) => handleTimeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTimeInput(e.currentTarget.value);
              }}
              className="w-16 text-center bg-transparent text-white text-2xl font-light focus:outline-none"
              min={1}
              max={999}
            />
          ) : (
            <button
              onClick={() => !running && setEditing(true)}
              className="text-white text-2xl font-light tracking-tight"
            >
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setRunning(!running)}
          className="w-11 h-11 rounded-full accent-bg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          {running ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>
      </div>
    </GlassCard>
  );
}
