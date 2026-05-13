"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Clock } from "lucide-react";

interface ClockWidgetProps {
  use24h?: boolean;
}

export function ClockWidget({ use24h = false }: ClockWidgetProps) {
  const [time, setTime] = useState(new Date());
  const [is24h, setIs24h] = useState(use24h);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    if (is24h) {
      return time.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return time.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <GlassCard className="h-full flex flex-col items-center justify-center text-center min-h-[160px]">
      <button
        onClick={() => setIs24h(!is24h)}
        className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Clock className="w-3.5 h-3.5" />
      </button>

      <motion.div
        key={formatTime()}
        initial={{ opacity: 0.8, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-light text-white tracking-tight"
      >
        {formatTime()}
      </motion.div>

      {!is24h && (
        <span className="text-neutral-500 text-xs mt-1">
          {time.getHours() >= 12 ? "PM" : "AM"}
        </span>
      )}

      <p className="text-neutral-400 text-sm mt-2">{formatDate()}</p>
    </GlassCard>
  );
}
