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
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-[0.05]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1]as const }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/whatcanibe" className="inline-block">
             <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
               WhatCanIBe
             </h2>
          </Link>
          <p className="text-zinc-500 font-medium">Welcome back to the future of careers.</p>
        </div>

        <GlowCard className="p-8 border-zinc-200 bg-white backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/5">
          <div className="mb-8 relative">
            <div className="absolute -top-10 -right-4 w-24 h-24 bg-indigo-500/10 blur-3xl rounded-full" />
            <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              Sign In
            </h1>
            <p className="text-sm text-zinc-500 mt-2 font-medium">Access your personalized roadmap and mentors.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-12 h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 bg-zinc-50 border-zinc-100 rounded-2xl focus:border-indigo-500/50 transition-all text-zinc-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg group transition-all shadow-xl shadow-indigo-600/20"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Portal
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link href="/whatcanibe/signup" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
  }
