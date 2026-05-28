"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowCard } from "@/components/ui/glow-card";
import { Sparkles, ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://careerflyght-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        alert(data.message || "Login failed");
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
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.05),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/whatcanibe" className="inline-block mb-4">
             <h2 className="text-3xl font-bold tracking-tight text-white">
               WhatCanIBe<span className="text-brand-primary">.</span>
             </h2>
          </Link>
          <p className="text-muted-foreground font-normal">Welcome back to the future of careers.</p>
        </div>

        <GlowCard className="p-8 glass-card rounded-[2rem] border-white/10">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-primary" />
              Sign In
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Access your personalized roadmap and mentors.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-12 h-14 bg-white/5 border-white/5 rounded-xl focus:border-brand-primary/50 transition-all text-white placeholder:text-muted-foreground/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-bold text-brand-primary hover:text-brand-primary/80 uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 bg-white/5 border-white/5 rounded-xl focus:border-brand-primary/50 transition-all text-white placeholder:text-muted-foreground/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold text-base group transition-all shadow-xl shadow-brand-primary/10"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Portal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/whatcanibe/signup" className="text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}
