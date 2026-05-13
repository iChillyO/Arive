"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mic,
  Paperclip,
  ChevronDown,
  Sparkles,
  Copy,
  RotateCcw,
  User,
  Bot,
  StopCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const availableModels = [
  { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4", label: "GPT-4", provider: "OpenAI" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5", provider: "OpenAI" },
  { id: "claude-sonnet", label: "Claude Sonnet", provider: "Anthropic" },
  { id: "claude-haiku", label: "Claude Haiku", provider: "Anthropic" },
  { id: "gemini-pro", label: "Gemini Pro", provider: "Google" },
  { id: "gemini-flash", label: "Gemini Flash", provider: "Google" },
];

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [showModelSelect, setShowModelSelect] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
  } = useChat({
    api: "/api/chat",
    body: { model: selectedModel },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const currentModel = availableModels.find((m) => m.id === selectedModel);

  return (
    <div className="h-full flex flex-col">
      {/* Model selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <button
            onClick={() => setShowModelSelect(!showModelSelect)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 accent-text" />
            <span className="text-white text-sm">{currentModel?.label}</span>
            <span className="text-neutral-500 text-xs">
              {currentModel?.provider}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <AnimatePresence>
            {showModelSelect && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-64 glass-panel-heavy p-2 rounded-xl z-50"
              >
                {availableModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setShowModelSelect(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                      model.id === selectedModel
                        ? "bg-white/10 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{model.label}</span>
                    <span className="text-neutral-600 text-xs">
                      {model.provider}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-600 text-xs">
            {messages.length} messages
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pb-4"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl accent-bg opacity-40 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">
              Start a conversation
            </h2>
            <p className="text-neutral-500 text-sm max-w-md">
              Ask anything. Generate code, analyze data, brainstorm ideas, or
              have a natural conversation with AI.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-neutral-200 border border-white/5"
              )}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>

              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                  <button className="text-neutral-500 hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => reload()}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {message.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-neutral-300" />
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-neutral-400"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-neutral-400"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-neutral-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="pt-4">
        <form onSubmit={handleSubmit} className="relative">
          <GlassCard variant="heavy" className="p-2">
            <div className="flex items-end gap-2">
              <button
                type="button"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                placeholder="Message Stack AI..."
                rows={1}
                className="flex-1 bg-transparent text-white text-sm placeholder:text-neutral-500 resize-none focus:outline-none py-2 max-h-32"
                style={{ minHeight: "36px" }}
              />

              <button
                type="button"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
              >
                <Mic className="w-4 h-4" />
              </button>

              {isLoading ? (
                <Button
                  type="button"
                  onClick={stop}
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 flex-shrink-0"
                >
                  <StopCircle className="w-4 h-4 text-red-400" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="accent"
                  size="icon"
                  className="w-9 h-9 flex-shrink-0"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              )}
            </div>
          </GlassCard>

          <p className="text-neutral-600 text-xs text-center mt-2">
            Stack AI can make mistakes. Consider verifying important information.
          </p>
        </form>
      </div>
    </div>
  );
}
