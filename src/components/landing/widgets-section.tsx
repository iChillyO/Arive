"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Clock,
  Timer,
  Music,
  Calendar,
  Cloud,
  TrendingUp,
  ImageIcon,
  StickyNote,
  Sparkles,
} from "lucide-react";

const widgets = [
  { icon: Clock, name: "Clock", size: "small" },
  { icon: Timer, name: "Timer", size: "small" },
  { icon: Music, name: "Spotify", size: "large" },
  { icon: Calendar, name: "Calendar", size: "medium" },
  { icon: Cloud, name: "Weather", size: "medium" },
  { icon: TrendingUp, name: "Stocks", size: "medium" },
  { icon: ImageIcon, name: "Image", size: "large" },
  { icon: StickyNote, name: "Notes", size: "small" },
  { icon: Sparkles, name: "AI Actions", size: "small" },
];

export function WidgetsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--accent-color)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Beautiful Widgets
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Premium iOS-inspired widgets in liquid glass design. Resize,
            rearrange, and personalize your workspace.
          </p>
        </motion.div>

        {/* Widget grid preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {widgets.map((widget, i) => (
            <motion.div
              key={widget.name}
              className={
                widget.size === "large"
                  ? "col-span-2 row-span-2"
                  : widget.size === "medium"
                  ? "col-span-2"
                  : ""
              }
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <GlassCard
                className="h-full min-h-[120px] flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all duration-500"
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <widget.icon className="w-8 h-8 text-neutral-400" />
                <span className="text-neutral-300 text-sm font-medium">
                  {widget.name}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
