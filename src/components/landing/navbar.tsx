"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="glass-panel-heavy flex items-center justify-between px-6 py-3 rounded-2xl">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold tracking-tight">
              Stack
            </span>
            <span className="text-neutral-500 text-sm hidden sm:inline">
              by Aivre
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Agents", "Widgets", "Pricing"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-neutral-400 text-sm hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-neutral-300">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="accent" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
