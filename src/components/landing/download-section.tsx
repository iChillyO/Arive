"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Apple, Monitor } from "lucide-react";

export function DownloadSection() {
  return (
    <section className="relative py-32 px-6">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--accent-color)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Begin?
          </h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-lg mx-auto">
            Download Stack by Aivre and experience the next generation of AI
            desktop environments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="accent" size="xl" className="gap-2 w-full sm:w-auto">
              <Download className="w-5 h-5" />
              Download for macOS
            </Button>
            <Button variant="glass" size="xl" className="gap-2 w-full sm:w-auto">
              <Monitor className="w-5 h-5" />
              Download for Windows
            </Button>
          </div>

          <p className="text-neutral-600 text-sm">
            Also available for Linux. Requires 64-bit OS.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
