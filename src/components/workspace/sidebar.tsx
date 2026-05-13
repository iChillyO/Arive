"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  MessageSquare,
  Code,
  Image,
  FileText,
  TrendingUp,
  Search,
  Zap,
  Settings,
  LayoutGrid,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Mic,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/workspace" },
  { icon: MessageSquare, label: "AI Chat", href: "/workspace/chat" },
  { icon: Code, label: "AI Coder", href: "/workspace/coder" },
  { icon: Image, label: "AI Image", href: "/workspace/image" },
  { icon: FileText, label: "AI Notes", href: "/workspace/notes" },
  { icon: TrendingUp, label: "Stocks", href: "/workspace/stocks" },
  { icon: Search, label: "Research", href: "/workspace/research" },
  { icon: Zap, label: "Automation", href: "/workspace/automation" },
  { icon: Mic, label: "Voice", href: "/workspace/voice" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="h-14 flex items-center px-4 gap-2 border-b border-white/5">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 flex-1"
            >
              <div className="w-7 h-7 rounded-lg accent-bg flex items-center justify-center flex-shrink-0">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Stack</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 px-2 space-y-1 custom-scrollbar overflow-y-auto">
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <button
              onClick={() => setActive(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                active === item.label
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  active === item.label && "accent-text"
                )}
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-2 border-t border-white/5 space-y-1">
        <Link href="/workspace/settings">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200">
            <Settings className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Link>
      </div>
    </motion.aside>
  );
}
