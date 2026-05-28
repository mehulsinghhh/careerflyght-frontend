"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.08),transparent_60%)]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          The future of career intelligence
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white"
        >
          Navigate Your <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Dream Career.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          The mission-critical platform for the next generation of builders, dreamers, and industry leaders. Secure your professional future today.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-8 h-14 text-base rounded-xl transition-all shadow-xl shadow-brand-primary/20 font-semibold">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-white text-black hover:bg-zinc-100 px-8 h-14 text-base rounded-xl transition-all shadow-xl shadow-white/5 font-semibold">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-8 h-14 text-base rounded-xl font-semibold">
                  Log In
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
          className="mt-24 flex flex-col items-center gap-3 text-muted-foreground/60 font-medium text-[11px] uppercase tracking-[0.2em]"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
