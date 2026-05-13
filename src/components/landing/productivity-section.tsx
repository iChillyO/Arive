"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  GitBranch,
  Layers,
  Workflow,
  Gauge,
} from "lucide-react";

const steps = [
  {
    icon: Layers,
    title: "Open Multiple Agents",
    desc: "Run AI Coder, Research Agent, and Chat simultaneously in separate tabs.",
  },
  {
    icon: Workflow,
    title: "Assign Tasks",
    desc: "Each agent works independently on its assigned task in the background.",
  },
  {
    icon: GitBranch,
    title: "Combine Results",
    desc: "Merge outputs from multiple agents into a unified workflow.",
  },
  {
    icon: Gauge,
    title: "Ship Faster",
    desc: "Achieve in minutes what used to take hours with parallel AI workers.",
  },
];

export function ProductivitySection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Parallel Productivity
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Multi-agent workflows that run concurrently. The future of
            getting work done.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="text-center h-full">
                <div className="w-10 h-10 rounded-xl accent-bg opacity-60 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-neutral-500 text-xs font-mono mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
