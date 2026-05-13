"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "heavy" | "subtle";
  glow?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  glow = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        variant === "default" && "glass-panel",
        variant === "heavy" && "glass-panel-heavy",
        variant === "subtle" &&
          "bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl",
        glow && "accent-glow",
        "p-6",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
