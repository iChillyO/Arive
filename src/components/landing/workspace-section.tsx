"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Layout,
  PanelLeft,
  MonitorUp,
  Layers,
  GripVertical,
} from "lucide-react";

export function WorkspaceSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Desktop mock */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-3">
              <div className="bg-neutral-900/90 rounded-lg aspect-[4/3] p-4 border border-white/5">
                {/* Title bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-neutral-500 text-xs">
                      Stack Workspace
                    </span>
                  </div>
                </div>

                {/* Layout mock */}
                <div className="flex gap-2 h-full">
                  {/* Sidebar */}
                  <div className="w-12 bg-white/5 rounded-lg flex flex-col items-center gap-3 py-3">
                    <div className="w-6 h-6 rounded-md bg-white/10" />
                    <div className="w-6 h-6 rounded-md bg-white/10" />
                    <div className="w-6 h-6 rounded-md accent-bg opacity-40" />
                    <div className="w-6 h-6 rounded-md bg-white/10" />
                  </div>
                  {/* Main area */}
                  <div className="flex-1 bg-white/[0.02] rounded-lg p-3">
                    <div className="flex gap-2 mb-3">
                      <div className="h-5 w-16 bg-white/10 rounded" />
                      <div className="h-5 w-16 bg-white/5 rounded" />
                      <div className="h-5 w-16 bg-white/5 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-white/5 rounded" />
                      <div className="h-3 w-3/4 bg-white/5 rounded" />
                      <div className="h-3 w-1/2 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Workspace
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              A desktop-grade environment with persistent tabs, multi-agent
              sessions, and live updates. Open, arrange, and manage your AI
              workflows like a professional OS.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: PanelLeft, label: "Smart Sidebar" },
                { icon: Layers, label: "Multi-Tab System" },
                { icon: GripVertical, label: "Drag and Drop" },
                { icon: MonitorUp, label: "Live Previews" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <Icon className="w-5 h-5 text-neutral-400" />
                  <span className="text-sm text-neutral-300">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
