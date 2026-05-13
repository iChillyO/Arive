"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Monitor,
  Bell,
  RefreshCw,
  Wifi,
  Keyboard,
  Grip,
  FolderOpen,
  Shield,
} from "lucide-react";

const features = [
  { icon: Monitor, title: "Cross-Platform", desc: "Windows, macOS, and Linux" },
  { icon: Bell, title: "Native Notifications", desc: "System-level alerts" },
  { icon: RefreshCw, title: "Auto-Updater", desc: "Always up to date" },
  { icon: Wifi, title: "Offline Mode", desc: "Works without internet" },
  { icon: Keyboard, title: "Keyboard Shortcuts", desc: "Power-user workflows" },
  { icon: Grip, title: "Drag and Drop", desc: "Natural interactions" },
  { icon: FolderOpen, title: "File System Access", desc: "Native file handling" },
  { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade auth" },
];

export function FeaturesSection() {
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
            Desktop-Grade Features
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Not a web app pretending to be desktop. A real installable
            application with native capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <GlassCard className="text-center hover:border-white/20 transition-all duration-500 h-full">
                <feature.icon className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 text-xs">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
