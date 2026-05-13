"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Plus,
  X,
  MessageSquare,
  Code,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}

export function TopBar() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", label: "Dashboard", icon: LayoutGrid, active: true },
    { id: "2", label: "AI Chat", icon: MessageSquare, active: false },
  ]);
  const [searchOpen, setSearchOpen] = useState(false);

  const setActiveTab = (id: string) => {
    setTabs(
      tabs.map((t) => ({ ...t, active: t.id === id }))
    );
  };

  const closeTab = (id: string) => {
    const newTabs = tabs.filter((t) => t.id !== id);
    if (newTabs.length > 0 && !newTabs.some((t) => t.active)) {
      newTabs[newTabs.length - 1].active = true;
    }
    setTabs(newTabs);
  };

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      label: "New Tab",
      icon: MessageSquare,
      active: true,
    };
    setTabs([...tabs.map((t) => ({ ...t, active: false })), newTab]);
  };

  return (
    <div className="h-12 flex items-center border-b border-white/5 bg-black/20 backdrop-blur-sm">
      {/* Tabs */}
      <div className="flex-1 flex items-center h-full overflow-x-auto custom-scrollbar">
        <div className="flex items-center h-full">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              layout
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 h-full text-sm border-r border-white/5 min-w-[140px] max-w-[200px] group transition-colors",
                tab.active
                  ? "text-white bg-white/5"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]"
              )}
            >
              <tab.icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{tab.label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="ml-auto opacity-0 group-hover:opacity-100 w-4 h-4 rounded flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
              {tab.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 accent-bg"
                />
              )}
            </motion.button>
          ))}

          {/* Add tab */}
          <button
            onClick={addTab}
            className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/5 rounded mx-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 px-3">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors relative">
          <Bell className="w-4 h-4" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full accent-bg" />
        </button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800 ml-2 cursor-pointer" />
      </div>
    </div>
  );
}
