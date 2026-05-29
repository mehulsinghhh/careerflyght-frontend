"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ChevronDown } from "lucide-react";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("careerflyghtUser");
    if (user) {
      setIsLoggedIn(true);
    }
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
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-mesh opacity-40 scale-125" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(var(--brand-primary),0.15),transparent_60%)]" />
      
      {/* Animated background noise/grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-6xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-[11px] font-black uppercase tracking-[0.3em] mb-10 backdrop-blur-xl shadow-[0_0_20px_rgba(var(--brand-primary),0.2)]"
        >
          <Sparkles className="h-4 w-4" />
          Next-Gen Career Intelligence
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tightest mb-8 leading-[0.8] text-white font-heading"
        >
          DECODE <br />
          <span className="text-gradient-primary">
            YOUR FUTURE.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-3xl text-zinc-300 mb-14 max-w-3xl mx-auto leading-tight font-bold tracking-tight"
        >
          The high-velocity platform for the builders and leaders of the next economy.
          Stop guessing. Start <span className="text-white underline decoration-brand-accent decoration-4 underline-offset-4">executing.</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-10 h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-brand-primary/40 border-none font-black uppercase tracking-wider">
                Enter Command Center
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-10 h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-white/10 border-none font-black uppercase tracking-wider">
                  Initialize Mission
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Visual Teaser */}
        <motion.div
          variants={itemVariants}
          className="mt-24 relative group mx-auto max-w-5xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-[3.2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative rounded-[3rem] border border-white/10 bg-zinc-900/40 p-4 backdrop-blur-3xl overflow-hidden shadow-2xl">
             <div className="rounded-[2.5rem] border border-white/5 bg-black/80 overflow-hidden aspect-[16/9] relative">
                {/* Mock UI Composition */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--brand-primary),0.1),transparent_70%)]" />
                
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="h-8 w-48 bg-white/5 rounded-full border border-white/10 flex items-center px-4">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-brand-primary"
                            />
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-8 flex-1">
                    <div className="col-span-8 space-y-8">
                       <div className="h-48 rounded-[2rem] bg-white/[0.03] border border-white/10 p-8 relative overflow-hidden group/card">
                          <div className="absolute top-0 right-0 p-6">
                            <Zap className="w-6 h-6 text-brand-accent animate-pulse" />
                          </div>
                          <div className="flex items-center gap-6 mb-8">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-white/10" />
                            <div className="space-y-3">
                              <div className="h-4 w-56 bg-white/20 rounded-full" />
                              <div className="h-2.5 w-32 bg-white/10 rounded-full" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="h-2 w-full bg-white/5 rounded-full" />
                            <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-8">
                          <div className="h-32 rounded-[2rem] bg-white/[0.03] border border-white/10" />
                          <div className="h-32 rounded-[2rem] bg-white/[0.03] border border-white/10" />
                       </div>
                    </div>
                    <div className="col-span-4 h-full rounded-[2rem] bg-white/[0.03] border border-white/10 p-8">
                       <div className="h-4 w-24 bg-white/20 rounded-full mb-10" />
                       <div className="space-y-8">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex items-center gap-4">
                               <div className="h-2 w-2 rounded-full bg-brand-secondary" />
                               <div className="h-2 flex-1 bg-white/10 rounded-full" />
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-20 flex flex-col items-center gap-4 text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em]"
        >
          <span>Begin Exploration</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-brand-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
