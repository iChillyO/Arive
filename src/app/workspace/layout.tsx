"use client";

import { Sidebar } from "@/components/workspace/sidebar";
import { TopBar } from "@/components/workspace/top-bar";
import { Dock } from "@/components/workspace/dock";
import { motion } from "framer-motion";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Wallpaper layer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-950"
        id="wallpaper-layer"
      />

      {/* Main layout */}
      <div className="relative z-10 h-full flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <TopBar />

          {/* Workspace content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-hidden p-4"
          >
            {children}
          </motion.main>

          {/* Dock */}
          <Dock />
        </div>
      </div>
    </div>
  );
}
