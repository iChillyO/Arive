"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Music,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from "lucide-react";

export function SpotifySection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Green glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl bg-green-500" />

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
              Spotify Integration
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Connect your Spotify account for real playback control. See what is
              playing, browse playlists, and control your music without leaving
              the workspace.
            </p>
            <div className="space-y-3">
              {[
                "Real-time playback sync",
                "Full transport controls",
                "Album art and playlists",
                "Widget and mini-player",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-neutral-300">
                  <Music className="w-4 h-4 text-green-500/70" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Player preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <GlassCard className="w-80">
              {/* Album art placeholder */}
              <div className="w-full aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-6 flex items-center justify-center">
                <Music className="w-16 h-16 text-neutral-600" />
              </div>

              {/* Track info */}
              <p className="text-white font-semibold mb-1">Starlight</p>
              <p className="text-neutral-500 text-sm mb-4">Artist Name</p>

              {/* Progress bar */}
              <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div className="w-1/3 h-full bg-green-500/70 rounded-full" />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <Shuffle className="w-4 h-4 text-neutral-500" />
                <SkipBack className="w-5 h-5 text-neutral-300" />
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Play className="w-4 h-4 text-black ml-0.5" />
                </div>
                <SkipForward className="w-5 h-5 text-neutral-300" />
                <Repeat className="w-4 h-4 text-neutral-500" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
