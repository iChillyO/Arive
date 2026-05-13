"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Code,
  MessageSquare,
  FileText,
  Image,
  Video,
  Rocket,
  Server,
  TrendingUp,
  Search,
  Zap,
} from "lucide-react";

const agents = [
  { icon: Code, name: "AI Coder", desc: "Code generation with live preview and sandbox execution" },
  { icon: MessageSquare, name: "AI Chat", desc: "Conversational assistant with long-term memory" },
  { icon: FileText, name: "AI Notes", desc: "Summarize files and organize knowledge" },
  { icon: Image, name: "AI Image", desc: "Real image generation and prompt enhancement" },
  { icon: Video, name: "AI Video", desc: "Cinematic prompt-to-video creation" },
  { icon: Rocket, name: "Startup Builder", desc: "Ideas, pitch decks, and market analysis" },
  { icon: Server, name: "API Builder", desc: "Backend generation with documentation" },
  { icon: TrendingUp, name: "Stock Market AI", desc: "Live dashboards and AI market analysis" },
  { icon: Search, name: "Research Agent", desc: "Deep research with citations and summaries" },
  { icon: Zap, name: "Automation", desc: "Workflow automation with triggers" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AgentsSection() {
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
            Ten Intelligent Agents
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Each agent is a specialist. Run them simultaneously, assign tasks,
            and let them work in parallel.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {agents.map((agent) => (
            <motion.div key={agent.name} variants={item}>
              <GlassCard
                className="h-full hover:border-white/20 transition-all duration-500 cursor-pointer group"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <agent.icon className="w-8 h-8 text-neutral-400 group-hover:accent-text transition-colors duration-500 mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1">
                  {agent.name}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {agent.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
