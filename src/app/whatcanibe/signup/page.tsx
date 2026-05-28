"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowCard } from "@/components/ui/glow-card";
import { Sparkles, ArrowRight, Mail, Lock, User, Zap } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://careerflyght-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        alert(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("careerflyghtUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      setIsLoading(false);
      router.push("/whatcanibe/dashboard");

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Something went wrong");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-background flex items-center justify-center px-4 md:px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-brand-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/whatcanibe" className="inline-block group">
             <h2 className="text-4xl font-black tracking-tighter dark:text-white text-zinc-900 mb-2">
               WhatCanIBe<span className="text-brand-primary group-hover:animate-pulse">.</span>
             </h2>
          </Link>
          <p className="dark:text-zinc-500 text-zinc-400 font-bold tracking-tight">Begin your professional metamorphosis.</p>
        </div>

        <GlowCard className="p-8 md:p-10 glass border-zinc-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 h-48 w-48 bg-brand-secondary/10 blur-[60px] rounded-full group-hover:bg-brand-secondary/20 transition-colors" />

          <div className="mb-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Zap className="h-3 w-3" />
              New Identity
            </div>
            <h1 className="text-2xl font-black dark:text-white text-zinc-900 tracking-tight flex items-center gap-3">
              Join Protocol
            </h1>
            <p className="text-sm dark:text-zinc-500 text-zinc-400 mt-2 font-bold leading-relaxed">Secure your spot in the future workforce.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-[10px] font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group/input">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within/input:text-brand-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Alex Future"
                  className="pl-14 h-16 bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/10 rounded-2xl focus:border-brand-primary/50 transition-all dark:text-white text-zinc-900 font-bold text-sm shadow-inner placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group/input">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within/input:text-brand-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="alex@future.com"
                  className="pl-14 h-16 bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/10 rounded-2xl focus:border-brand-primary/50 transition-all dark:text-white text-zinc-900 font-bold text-sm shadow-inner placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black dark:text-zinc-500 text-zinc-400 uppercase tracking-widest ml-1">Passcode</label>
              <div className="relative group/input">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within/input:text-brand-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-14 h-16 bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/10 rounded-2xl focus:border-brand-primary/50 transition-all dark:text-white text-zinc-900 font-bold text-sm shadow-inner placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl font-black text-lg group transition-all shadow-xl shadow-brand-primary/20 active:scale-[0.98] mt-4"
            >
              {isLoading ? (
                <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  Create Identity
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-white/5 text-center relative">
            <p className="text-sm dark:text-zinc-500 text-zinc-400 font-bold">
              Already in the protocol?{" "}
              <Link href="/whatcanibe/login" className="text-brand-primary font-black hover:text-brand-vibrant transition-colors underline decoration-2 underline-offset-4">
                Log In
              </Link>
            </p>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}
