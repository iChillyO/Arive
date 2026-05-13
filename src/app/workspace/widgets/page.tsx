"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClockWidget } from "@/components/widgets/clock-widget";
import { TimerWidget } from "@/components/widgets/timer-widget";
import { NotesWidget } from "@/components/widgets/notes-widget";
import { ImageWidget } from "@/components/widgets/image-widget";
import { SpotifyWidget } from "@/components/widgets/spotify-widget";
import { Button } from "@/components/ui/button";
import {
  Plus,
  X,
  Clock,
  Timer,
  StickyNote,
  ImageIcon,
  Music,
  GripVertical,
} from "lucide-react";

type WidgetType = "clock" | "timer" | "notes" | "image" | "spotify";

interface WidgetInstance {
  id: string;
  type: WidgetType;
  size: "small" | "medium" | "large";
}

const widgetCatalog = [
  { type: "clock" as const, icon: Clock, label: "Clock", defaultSize: "small" as const },
  { type: "timer" as const, icon: Timer, label: "Timer", defaultSize: "medium" as const },
  { type: "notes" as const, icon: StickyNote, label: "Notes", defaultSize: "medium" as const },
  { type: "image" as const, icon: ImageIcon, label: "Image", defaultSize: "medium" as const },
  { type: "spotify" as const, icon: Music, label: "Spotify", defaultSize: "large" as const },
];

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<WidgetInstance[]>([
    { id: "1", type: "clock", size: "small" },
    { id: "2", type: "spotify", size: "large" },
    { id: "3", type: "timer", size: "medium" },
    { id: "4", type: "notes", size: "medium" },
  ]);
  const [showCatalog, setShowCatalog] = useState(false);

  const addWidget = (type: WidgetType, size: "small" | "medium" | "large") => {
    setWidgets([
      ...widgets,
      { id: Date.now().toString(), type, size },
    ]);
    setShowCatalog(false);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const renderWidget = (type: WidgetType) => {
    switch (type) {
      case "clock":
        return <ClockWidget />;
      case "timer":
        return <TimerWidget />;
      case "notes":
        return <NotesWidget />;
      case "image":
        return <ImageWidget />;
      case "spotify":
        return <SpotifyWidget />;
    }
  };

  const getGridClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1";
      case "medium":
        return "col-span-1 md:col-span-2";
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-2 row-span-2";
      default:
        return "col-span-1";
    }
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Widgets</h1>
          <p className="text-neutral-500 text-sm">
            Customize your workspace with interactive widgets
          </p>
        </div>
        <div className="relative">
          <Button
            onClick={() => setShowCatalog(!showCatalog)}
            variant="glass"
            size="sm"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Widget
          </Button>

          <AnimatePresence>
            {showCatalog && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                className="absolute top-full right-0 mt-2 w-56 glass-panel-heavy p-2 rounded-xl z-50"
              >
                {widgetCatalog.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => addWidget(item.type, item.defaultSize)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-min">
        <AnimatePresence mode="popLayout">
          {widgets.map((widget) => (
            <motion.div
              key={widget.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative group ${getGridClass(widget.size)}`}
            >
              {/* Remove button */}
              <button
                onClick={() => removeWidget(widget.id)}
                className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Drag handle */}
              <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-neutral-500">
                <GripVertical className="w-4 h-4" />
              </div>

              {renderWidget(widget.type)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
