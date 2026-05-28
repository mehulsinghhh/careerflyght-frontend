"use client";

import { useState, FormEvent } from "react";
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth
    try {
  const response = await fetch("https://careerflyght-backend.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    setIsLoading(false);
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem(
    "careerflyghtUser",
    JSON.stringify(data.user)
  );

  window.dispatchEvent(new Event("auth-change"));
  setIsLoading(false);
  router.push("/whatcanibe/dashboard");
  

} catch (error) {
  console.error(error);
  alert("Something went wrong");
}

  };
  

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1]as const }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/whatcanibe" className="inline-block">
             <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-primary via-blue-500 to-emerald-400 bg-clip-text text-transparent mb-3">
               WhatCanIBe
             </h2>
          </Link>
          <p className="text-muted-foreground font-bold text-lg">Welcome back to the future of careers.</p>
        </div>

        <GlowCard className="p-10 border-border bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-foreground flex items-center gap-3 tracking-tight">
              <Sparkles className="h-6 w-6 text-primary" />
              Sign In
            </h1>
            <p className="text-base text-muted-foreground font-medium mt-2">Access your personalized roadmap and mentors.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-14 h-16 bg-muted/50 border-border rounded-2xl focus:border-primary/50 transition-all font-medium text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-14 h-16 bg-muted/50 border-border rounded-2xl focus:border-primary/50 transition-all font-medium text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black text-xl group transition-all shadow-xl shadow-primary/20"
            >
              {isLoading ? (
                <div className="h-6 w-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Enter Portal
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-border text-center">
            <p className="text-base text-muted-foreground font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/whatcanibe/signup" className="text-primary font-black hover:text-primary/80 transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
  }
