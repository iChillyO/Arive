"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const models = [
  { name: "GPT-5", provider: "OpenAI", color: "from-green-500/20 to-transparent" },
  { name: "Claude Sonnet", provider: "Anthropic", color: "from-orange-500/20 to-transparent" },
  { name: "Gemini", provider: "Google", color: "from-blue-500/20 to-transparent" },
  { name: "DeepSeek", provider: "DeepSeek", color: "from-cyan-500/20 to-transparent" },
  { name: "Grok", provider: "xAI", color: "from-purple-500/20 to-transparent" },
  { name: "Mistral", provider: "Mistral AI", color: "from-amber-500/20 to-transparent" },
];

export function ModelsSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Every Model. One Interface.
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Switch between the world's best AI models seamlessly. Use the right
            model for every task.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard
                className="relative overflow-hidden hover:border-white/20 transition-all duration-500"
                whileHover={{ y: -2, transition: { duration: 0.3 } }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-50`}
                />
                <div className="relative">
                  <p className="text-white font-semibold text-sm mb-1">
                    {model.name}
                  </p>
                  <p className="text-neutral-500 text-xs">{model.provider}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
