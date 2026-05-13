import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tab {
  id: string;
  label: string;
  type: "dashboard" | "chat" | "coder" | "image" | "notes" | "stocks" | "research" | "automation" | "voice" | "settings" | "widgets";
  active: boolean;
}

interface WorkspaceState {
  // Sidebar
  sidebarCollapsed: boolean;
  activeNav: string;

  // Tabs
  tabs: Tab[];
  activeTabId: string | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveNav: (nav: string) => void;
  addTab: (tab: Omit<Tab, "active">) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      activeNav: "Dashboard",
      tabs: [
        { id: "dashboard", label: "Dashboard", type: "dashboard", active: true },
      ],
      activeTabId: "dashboard",

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      setActiveNav: (nav) => set({ activeNav: nav }),

      addTab: (tab) =>
        set((state) => {
          const existing = state.tabs.find((t) => t.id === tab.id);
          if (existing) {
            return {
              tabs: state.tabs.map((t) => ({
                ...t,
                active: t.id === tab.id,
              })),
              activeTabId: tab.id,
            };
          }
          return {
            tabs: [
              ...state.tabs.map((t) => ({ ...t, active: false })),
              { ...tab, active: true },
            ],
            activeTabId: tab.id,
          };
        }),

      closeTab: (id) =>
        set((state) => {
          const newTabs = state.tabs.filter((t) => t.id !== id);
          if (newTabs.length === 0) {
            return {
              tabs: [{ id: "dashboard", label: "Dashboard", type: "dashboard" as const, active: true }],
              activeTabId: "dashboard",
            };
          }
          if (state.activeTabId === id) {
            const lastTab = newTabs[newTabs.length - 1];
            lastTab.active = true;
            return { tabs: newTabs, activeTabId: lastTab.id };
          }
          return { tabs: newTabs };
        }),

      setActiveTab: (id) =>
        set((state) => ({
          tabs: state.tabs.map((t) => ({ ...t, active: t.id === id })),
          activeTabId: id,
        })),
    }),
    {
      name: "stack-workspace",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeNav: state.activeNav,
      }),
    }
  )
);
