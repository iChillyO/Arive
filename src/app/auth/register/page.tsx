"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Layers,
  Mail,
  Lock,
  User,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    gender: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // POST /api/auth/register then signIn
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--accent-color)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard variant="heavy" className="p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl accent-bg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-semibold">Stack</span>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-neutral-500 text-center text-sm mb-8">
            Join the next generation of AI workspaces
          </p>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="glass" className="justify-center gap-2 text-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="glass" className="justify-center gap-2 text-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-neutral-500 text-xs">or with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                  placeholder="Username"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                  required
                />
              </div>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) => update("displayName", e.target.value)}
                placeholder="Display Name"
                className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Email address"
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Password"
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--accent-color)] transition-colors appearance-none"
              >
                <option value="" className="bg-neutral-900">
                  Gender
                </option>
                <option value="male" className="bg-neutral-900">
                  Male
                </option>
                <option value="female" className="bg-neutral-900">
                  Female
                </option>
                <option value="other" className="bg-neutral-900">
                  Other
                </option>
                <option value="prefer_not" className="bg-neutral-900">
                  Prefer not to say
                </option>
              </select>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="date"
                  value={form.birthdate}
                  onChange={(e) => update("birthdate", e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full gap-2 mt-2"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <p className="text-neutral-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="accent-text hover:underline">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
