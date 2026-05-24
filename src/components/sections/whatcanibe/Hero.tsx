"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Zap, ChevronDown } from "lucide-react";

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

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.1),transparent_70%)]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-12 backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3" />
          Neural Career Intelligence
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-10 leading-[0.85] text-white"
        >
          Build Your Future <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent italic font-serif">
            Trajectories.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          The mission-critical platform for the next generation of builders, dreamers, and industry leaders.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-10 h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-brand-primary/20 border-none font-bold">
                Enter Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-10 h-16 text-lg rounded-2xl transition-all shadow-2xl shadow-white/10 border-none font-bold">
                  Initiate Mission
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            
            </>
          )}
        </motion.div>

        {/* Visual Teaser */}
        <motion.div
          variants={itemVariants}
          className="mt-32 relative group mx-auto max-w-4xl"
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000" />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-950/50 p-3 backdrop-blur-xl overflow-hidden shadow-2xl">
             <div className="rounded-[2rem] border border-white/5 bg-black overflow-hidden aspect-[16/9] relative">
                {/* Mock UI Composition */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
                
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="h-8 w-40 bg-white/5 rounded-full border border-white/5" />
                  </div>

                  <div className="grid grid-cols-12 gap-8 flex-1">
                    <div className="col-span-8 space-y-8">
                       <div className="h-48 rounded-3xl bg-white/[0.02] border border-white/5 p-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4">
                            <Zap className="w-5 h-5 text-brand-primary opacity-30" />
                          </div>
                          <div className="flex items-center gap-5 mb-6">
                            <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20" />
                            <div className="space-y-2.5">
                              <div className="h-3 w-48 bg-white/10 rounded" />
                              <div className="h-2 w-32 bg-white/5 rounded" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="h-2 w-full bg-white/5 rounded" />
                            <div className="h-2 w-2/3 bg-white/5 rounded" />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-8">
                          <div className="h-32 rounded-3xl bg-white/[0.02] border border-white/5" />
                          <div className="h-32 rounded-3xl bg-white/[0.02] border border-white/5" />
                       </div>
                    </div>
                    <div className="col-span-4 h-full rounded-3xl bg-white/[0.02] border border-white/5 p-8">
                       <div className="h-4 w-20 bg-white/10 rounded mb-8" />
                       <div className="space-y-6">
                          {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="flex items-center gap-3">
                               <div className="h-1.5 w-1.5 rounded-full bg-brand-primary opacity-30" />
                               <div className="h-1.5 flex-1 bg-white/5 rounded" />
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>

                {/* Floating Glows */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-brand-primary/10 blur-[80px] rounded-full"
                />
             </div>
          </div>
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
