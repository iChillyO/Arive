"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Play, Sparkles, Cpu, Mic, Layout } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--accent-color) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, var(--accent-color) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
        >
          <Sparkles className="w-4 h-4 accent-text" />
          <span className="text-sm text-neutral-300">
            Introducing Stack by Aivre
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-6"
        >
          The AI Workspace
          <br />
          <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
            That Thinks With You
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Multi-agent AI desktop with real-time previews, voice conversations,
          unified workflows, and a beautiful customizable workspace.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {[
            { icon: Cpu, label: "Multi-Agent AI" },
            { icon: Layout, label: "Real-time Previews" },
            { icon: Mic, label: "Voice Conversations" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              <Icon className="w-4 h-4 text-neutral-400" />
              <span className="text-sm text-neutral-300">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="accent" size="xl" className="gap-2">
            <Download className="w-5 h-5" />
            Download App
          </Button>
          <Button variant="glass" size="xl" className="gap-2">
            <Play className="w-5 h-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Mock desktop preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-20 relative"
        >
          <div className="glass-panel-heavy p-2 rounded-2xl">
            <div className="bg-neutral-900/80 rounded-xl aspect-[16/9] flex items-center justify-center border border-white/5">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl accent-bg mx-auto mb-4 flex items-center justify-center opacity-60">
                  <Layout className="w-8 h-8 text-white" />
                </div>
                <p className="text-neutral-500 text-sm">
                  Interactive Desktop Preview
                </p>
              </div>
            </div>
          </div>
          {/* Glow underneath */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl opacity-30"
            style={{ background: "var(--accent-color)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
