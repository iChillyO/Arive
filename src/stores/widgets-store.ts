import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WidgetType = "clock" | "timer" | "notes" | "image" | "spotify" | "calendar" | "weather" | "stocks" | "ai-actions";

export interface WidgetInstance {
  id: string;
  type: WidgetType;
  size: "small" | "medium" | "large";
  position: { x: number; y: number };
  config: Record<string, any>;
}

interface WidgetsState {
  widgets: WidgetInstance[];

  addWidget: (type: WidgetType, size?: "small" | "medium" | "large") => void;
  removeWidget: (id: string) => void;
  updateWidgetPosition: (id: string, position: { x: number; y: number }) => void;
  updateWidgetSize: (id: string, size: "small" | "medium" | "large") => void;
  updateWidgetConfig: (id: string, config: Record<string, any>) => void;
  reorderWidgets: (fromIndex: number, toIndex: number) => void;
}

export const useWidgetsStore = create<WidgetsState>()(
  persist(
    (set) => ({
      widgets: [
        { id: "default-clock", type: "clock", size: "small", position: { x: 0, y: 0 }, config: { use24h: false } },
        { id: "default-spotify", type: "spotify", size: "large", position: { x: 1, y: 0 }, config: {} },
        { id: "default-timer", type: "timer", size: "medium", position: { x: 0, y: 1 }, config: { duration: 300 } },
        { id: "default-notes", type: "notes", size: "medium", position: { x: 2, y: 0 }, config: {} },
      ],

      addWidget: (type, size = "medium") =>
        set((state) => ({
          widgets: [
            ...state.widgets,
            {
              id: `${type}-${Date.now()}`,
              type,
              size,
              position: { x: 0, y: state.widgets.length },
              config: {},
            },
          ],
        })),

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),

      updateWidgetPosition: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, position } : w
          ),
        })),

      updateWidgetSize: (id, size) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, size } : w
          ),
        })),

      updateWidgetConfig: (id, config) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, config: { ...w.config, ...config } } : w
          ),
        })),

      reorderWidgets: (fromIndex, toIndex) =>
        set((state) => {
          const newWidgets = [...state.widgets];
          const [moved] = newWidgets.splice(fromIndex, 1);
          newWidgets.splice(toIndex, 0, moved);
          return { widgets: newWidgets };
        }),
    }),
    {
      name: "stack-widgets",
    }
  )
);
