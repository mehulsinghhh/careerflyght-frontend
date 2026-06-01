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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-surface-cool"
    >
      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
             backgroundSize: "10vw 10vh"
           }}
      />

      {/* Decorative Branding Elements */}
      <div className="absolute top-40 left-10 hidden xl:block opacity-10 rotate-90 origin-left">
        <span className="text-[120px] font-black uppercase tracking-[0.2em] select-none">FLYGH T</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-7xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border-strong bg-white text-zinc-950 text-[11px] font-black uppercase tracking-[0.3em] mb-16 shadow-premium"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">Neural Career Intelligence Platform v2.0</span>
        </motion.div>
        
        <div className="relative mb-12">
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(3rem,14vw,14rem)] font-bold tracking-[-0.04em] leading-[0.8] text-zinc-950 uppercase"
          >
            Engineered <br />
            <span className="italic font-normal text-primary">
              for
            </span>{" "}
            Greatness.
          </motion.h1>

          {/* Subtle floating architectural tag */}
          <motion.div
            variants={itemVariants}
            className="absolute -top-10 right-[15%] hidden md:flex items-center gap-4 bg-zinc-950 text-white px-6 py-4 rounded-2xl rotate-6 shadow-hero"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Apex Trajectory Enabled</span>
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-20">
          <p className="text-xl md:text-3xl text-zinc-600 leading-[1.3] font-medium text-balance">
            The traditional career path is an artifact. We built the engine for the future.
            Navigate your professional ascent with <span className="text-zinc-950 font-black border-b-4 border-primary/20">mathematical certainty.</span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-zinc-950 text-white hover:bg-primary px-16 h-24 text-xl rounded-[2rem] transition-all border-none font-black uppercase tracking-widest shadow-hero">
                Access Dashboard
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-zinc-950 text-white hover:bg-primary px-16 h-24 text-xl rounded-[2rem] transition-all border-none font-black uppercase tracking-widest shadow-hero">
                Initiate Mission
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}

          <Button variant="outline" size="lg" className="h-24 px-12 rounded-[2rem] border-2 border-zinc-200 font-black uppercase tracking-widest text-zinc-950 hover:bg-white hover:border-zinc-950 transition-all">
            See the Engine
          </Button>
        </motion.div>

        {/* Stats Grid - Reimagined as Editorial Block */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 max-w-6xl mx-auto border-strong bg-white rounded-[3rem] overflow-hidden shadow-premium"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-10 md:p-14 text-left group transition-colors hover:bg-zinc-50 ${
                idx !== stats.length - 1 ? "md:border-r border-strong" : ""
              }`}
            >
              <div className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Metric.0{idx + 1}
              </div>
              <div className="text-4xl md:text-6xl font-bold text-zinc-950 mb-2 flex items-baseline gap-1">
                <AnimatedCounter value={stat.value} />
                <span className="text-primary text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-950 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div
          className="mt-24 flex flex-col items-center gap-4 text-zinc-400 font-bold text-[10px] uppercase tracking-[0.4em]"
        >
          <span>Deconstruct the Methodology</span>
          <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center">
            <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
