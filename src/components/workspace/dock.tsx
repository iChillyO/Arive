"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Code,
  Image,
  Music,
  FileText,
  Mic,
  LayoutGrid,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dockItems = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: MessageSquare, label: "Chat" },
  { icon: Code, label: "Coder" },
  { icon: Image, label: "Image" },
  { icon: FileText, label: "Notes" },
  { icon: Music, label: "Spotify" },
  { icon: Mic, label: "Voice" },
  { icon: Settings, label: "Settings" },
];

export function Dock() {
  return (
    <div className="flex justify-center pb-3 pt-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-panel-heavy px-3 py-2 flex items-center gap-1 rounded-2xl"
      >
        {dockItems.map((item, i) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <item.icon className="w-5 h-5" />
            </div>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-neutral-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              {item.label}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
