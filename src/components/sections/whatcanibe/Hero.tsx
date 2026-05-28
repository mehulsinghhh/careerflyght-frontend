"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Target, Zap, Trophy, Map } from "lucide-react";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("careerflyghtUser");
    setIsLoggedIn(!!user);
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-mesh-vibrant opacity-60 dark:opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--color-brand-primary)/0.15,transparent_70%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      
      {/* Floating UI Elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <FloatingWidget
          className="top-[20%] left-[10%]"
          delay={0}
          icon={<Target className="text-brand-primary" />}
          label="Next Milestone"
          value="Senior Architect"
        />
        <FloatingWidget
          className="top-[60%] left-[15%]"
          delay={1}
          icon={<Zap className="text-brand-secondary" />}
          label="Daily Progress"
          value="+12% Boost"
        />
        <FloatingWidget
          className="top-[25%] right-[12%]"
          delay={0.5}
          icon={<Trophy className="text-brand-vibrant" />}
          label="Achievement"
          value="Product Lead"
        />
        <FloatingWidget
          className="top-[55%] right-[8%]"
          delay={1.5}
          icon={<Map className="text-brand-accent" />}
          label="Path Clarity"
          value="98% Match"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary text-[12px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-lg shadow-brand-primary/5"
        >
          <Sparkles className="h-4 w-4" />
          The future of career intelligence
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter mb-8 leading-[0.95] dark:text-white text-zinc-900"
        >
          Build Your <br />
          <span className="text-gradient-purple drop-shadow-sm">
            Future Self.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-bold"
        >
          Don&apos;t just pick a job. Engineer a lifestyle. The AI-powered platform designed for the next generation of industry titans.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-10 h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-brand-primary/30 font-black active:scale-95">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 px-10 h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-zinc-500/10 font-black active:scale-95">
                  Join the Mission
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 px-10 h-16 text-lg rounded-2xl font-black transition-all bg-white/50 dark:bg-transparent backdrop-blur-sm active:scale-95">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 flex flex-col items-center gap-4 text-zinc-400 dark:text-zinc-500 font-black text-[11px] uppercase tracking-[0.3em]"
        >
          <span>Initiate Exploration</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-zinc-200 dark:border-zinc-800 rounded-full flex justify-center p-1"
          >
            <motion.div
              animate={{ height: [4, 12, 4], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-brand-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingWidget({ className, delay, icon, label, value }: { className: string; delay: number; icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 0.5, duration: 0.8 }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay }}
        className="glass p-5 rounded-3xl flex items-center gap-5 shadow-2xl border-white/20 min-w-[200px]"
      >
        <div className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 shadow-inner flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">{label}</p>
          <p className="text-sm font-black dark:text-white text-zinc-900 leading-none">{value}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
