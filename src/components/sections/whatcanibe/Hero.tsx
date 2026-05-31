"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const user = localStorage.getItem("careerflyghtUser");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!user);
  }, [mounted]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const stats = [
    { label: "Active Dreamers", value: 12500, suffix: "+" },
    { label: "AI Trajectories", value: 450, suffix: "k+" },
    { label: "Global Mentors", value: 850, suffix: "+" },
    { label: "Career Success", value: 98, suffix: "%" },
  ];

  if (!mounted) return null;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-28 pb-16 md:pt-20 md:pb-20 px-6 overflow-hidden"
    >
      {/* Premium Static Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Light Mode Gradient Mesh */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 0%, oklch(0.45 0.2 264 / 0.15) 0%, transparent 70%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-900 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 shadow-sm"
        >
          <Sparkles className="h-3 w-3 text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Neural Career Intelligence</span>
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(3.5rem,12vw,11rem)] font-bold tracking-tighter mb-8 md:mb-10 leading-[0.85] md:leading-[0.8] text-zinc-950"
        >
          Engineered for <br className="hidden xs:block" />
          <span className="italic bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Greatness.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-base md:text-2xl text-zinc-600 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          The traditional career path is broken. We built the engine to fix it. <br className="hidden md:block" />
          Navigate the future with <span className="text-zinc-950 font-bold">mathematical certainty.</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-20 md:mb-32"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-zinc-950 text-white hover:bg-zinc-800 px-8 md:px-12 h-16 md:h-20 text-lg md:text-xl rounded-2xl transition-all border-none font-bold shadow-2xl">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          ) : (
            <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-zinc-950 text-white hover:bg-zinc-800 px-8 md:px-12 h-16 md:h-20 text-lg md:text-xl rounded-2xl transition-all border-none font-bold shadow-2xl">
                Initiate Mission
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl mx-auto pt-12 md:pt-16 border-t border-zinc-200 relative"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-3 md:p-4 rounded-2xl transition-all hover:bg-zinc-100 group"
            >
              <div className="text-2xl md:text-5xl font-bold text-zinc-950 mb-1 md:mb-2 flex items-center justify-center transition-all">
                <AnimatedCounter value={stat.value} />
                <span className="text-indigo-600">{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div
          className="mt-32 flex flex-col items-center gap-4 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.4em]"
        >
          <span>Explore Mission</span>
          <ChevronDown className="w-5 h-5 text-indigo-600 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
