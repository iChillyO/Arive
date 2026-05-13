"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  MessageSquare,
  Code,
  Image,
  FileText,
  TrendingUp,
  Mic,
  Sparkles,
  Clock,
} from "lucide-react";

const quickActions = [
  { icon: MessageSquare, label: "Start Chat", color: "from-blue-500/20" },
  { icon: Code, label: "Write Code", color: "from-green-500/20" },
  { icon: Image, label: "Generate Image", color: "from-purple-500/20" },
  { icon: FileText, label: "Take Notes", color: "from-amber-500/20" },
  { icon: TrendingUp, label: "Market Data", color: "from-cyan-500/20" },
  { icon: Mic, label: "Voice Call", color: "from-rose-500/20" },
];

export default function WorkspaceDashboard() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">Good evening</h1>
        <p className="text-neutral-500">
          What would you like to work on today?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <GlassCard
                className="cursor-pointer hover:border-white/20 transition-all duration-300 text-center py-6"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} to-transparent flex items-center justify-center mx-auto mb-3`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-neutral-300 text-sm">
                  {action.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity + Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-2"
        >
          <GlassCard>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400" />
              Recent Conversations
            </h3>
            <div className="space-y-3">
              {[
                { title: "React component architecture", time: "2h ago", agent: "AI Coder" },
                { title: "Market analysis for Q2", time: "5h ago", agent: "Research" },
                { title: "Landing page redesign ideas", time: "1d ago", agent: "AI Chat" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-white text-sm">{item.title}</p>
                    <p className="text-neutral-500 text-xs">{item.agent}</p>
                  </div>
                  <span className="text-neutral-600 text-xs">{item.time}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard className="h-full">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-400" />
              AI Usage
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-neutral-400 text-xs">Messages Today</span>
                  <span className="text-white text-sm font-medium">47</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full accent-bg rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-neutral-400 text-xs">Active Agents</span>
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full accent-bg rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-neutral-400 text-xs">Voice Minutes</span>
                  <span className="text-white text-sm font-medium">12m</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-1/5 h-full accent-bg rounded-full" />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
