"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Mic, Phone, PhoneOff, Volume2 } from "lucide-react";

export function VoiceSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Voice Conversations
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Real-time voice AI with low latency streaming. Talk to your agents
              while navigating other tabs. The floating call widget stays
              visible.
            </p>
            <div className="space-y-4">
              {[
                "Low latency streaming voice",
                "Interruption handling",
                "Persistent floating call widget",
                "Navigate freely while talking",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-neutral-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full accent-bg" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Voice UI Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <GlassCard className="w-72 text-center">
              {/* Waveform visualization */}
              <div className="flex items-center justify-center gap-1 h-16 mb-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full accent-bg"
                    animate={{
                      height: [8, Math.random() * 40 + 10, 8],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <p className="text-white font-medium mb-1">AI Assistant</p>
              <p className="text-neutral-500 text-sm mb-6">03:42</p>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Volume2 className="w-4 h-4 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mic className="w-4 h-4 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition-colors">
                  <PhoneOff className="w-4 h-4 text-white" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
