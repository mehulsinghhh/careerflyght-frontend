"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("careerflyghtUser");
    setIsLoggedIn(!!user);
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

  const stats = [
    { label: "Active Dreamers", value: 12500, suffix: "+" },
    { label: "AI Trajectories", value: 450, suffix: "k+" },
    { label: "Global Mentors", value: 850, suffix: "+" },
    { label: "Career Success", value: 98, suffix: "%" },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3" />
          Neural Career Intelligence
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-10 leading-[0.85] text-white"
        >
          Engineered for <br />
          <span className="italic text-zinc-500">Greatness.</span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          The traditional career path is broken. We built the engine to fix it.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-10 h-16 text-lg rounded-2xl transition-all border-none font-bold">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-10 h-16 text-lg rounded-2xl transition-all border-none font-bold">
                  Initiate Mission
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto pt-12 border-t border-white/10"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <AnimatedCounter value={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-20 flex flex-col items-center gap-4 text-zinc-600 font-bold text-[10px] uppercase tracking-[0.3em]"
        >
          <span>Explore Mission</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
