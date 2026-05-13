"use client";

import { Layers } from "lucide-react";

const links = {
  Product: ["Features", "Agents", "Widgets", "Voice", "Pricing"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API Reference", "Community", "Support"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Aivre</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              The AI workspace that thinks with you.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-medium text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-sm">
            2025 Aivre. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
