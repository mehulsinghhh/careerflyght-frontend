"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ChevronDown, Compass, Map, Globe } from "lucide-react";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const user = localStorage.getItem("careerflyghtUser");
    const timer = setTimeout(() => {
      setIsLoggedIn(!!user);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  if (!mounted) return null;

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Floating Gradient Orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-brand-primary/10 blur-[120px] rounded-full"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] bg-brand-secondary/10 blur-[100px] rounded-full"
        />
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-6xl relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[11px] font-extrabold uppercase tracking-[0.25em] mb-12 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Career Intelligence Platform
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.9] text-zinc-900 dark:text-white"
        >
          Navigate Your <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Future Ecosystem.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Discover hidden pathways. Map your unique trajectory. <br className="hidden md:block" />
          Join the elite network of students and young professionals shaping the next era of industry.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {isLoggedIn ? (
            <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-10 h-16 text-lg rounded-2xl transition-all shadow-xl shadow-brand-primary/20 border-none font-bold">
                Enter Command Center
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-10 h-16 text-lg rounded-2xl transition-all shadow-xl shadow-black/10 dark:shadow-white/5 border-none font-bold">
                  Start Your Discovery
                  <Compass className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-white/5 px-10 h-16 text-lg rounded-2xl transition-all font-bold backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Visual Discovery Interface */}
        <motion.div
          variants={itemVariants}
          className="mt-32 relative group mx-auto max-w-5xl"
        >
          <div className="absolute -inset-8 bg-gradient-to-b from-brand-primary/10 to-transparent rounded-[4rem] blur-3xl opacity-50 transition duration-1000" />

          <div className="relative rounded-[3rem] border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 p-4 backdrop-blur-2xl shadow-2xl overflow-hidden">
             <div className="rounded-[2.5rem] border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-black overflow-hidden aspect-[16/10] relative">
                
                {/* Career Intelligence Visualizer Mockup */}
                <div className="absolute inset-0 p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                        <Map className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div className="h-4 w-48 bg-zinc-200 dark:bg-white/10 rounded-full" />
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 w-24 bg-zinc-200 dark:bg-white/10 rounded-xl border border-zinc-100 dark:border-white/5" />
                      <div className="h-10 w-10 bg-brand-primary/20 rounded-xl border border-brand-primary/30" />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-8 flex-1">
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                       {/* Animated Pathway Cards */}
                       {[1, 2].map((i) => (
                         <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1 + i * 0.2 }}
                          className="h-36 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 p-6 shadow-sm flex items-center gap-6 relative overflow-hidden"
                         >
                            <div className={`w-14 h-14 rounded-2xl bg-brand-${i === 1 ? 'primary' : 'secondary'}/10 flex items-center justify-center`}>
                              <Zap className={`w-6 h-6 text-brand-${i === 1 ? 'primary' : 'secondary'}`} />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="h-3 w-1/3 bg-zinc-200 dark:bg-white/10 rounded" />
                              <div className="h-2 w-full bg-zinc-100 dark:bg-white/5 rounded" />
                              <div className="h-2 w-2/3 bg-zinc-100 dark:bg-white/5 rounded" />
                            </div>
                            <div className="absolute top-0 right-0 p-6">
                              <ArrowRight className="w-5 h-5 text-zinc-300" />
                            </div>
                         </motion.div>
                       ))}
                    </div>

                    <div className="hidden lg:flex col-span-4 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-8 flex-col">
                       <div className="flex items-center gap-3 mb-8">
                          <Globe className="w-4 h-4 text-brand-secondary" />
                          <div className="h-2 w-24 bg-zinc-300 dark:bg-white/10 rounded" />
                       </div>
                       <div className="flex-1 space-y-6">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="flex items-center gap-4">
                               <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                               <div className="flex-1 h-2 bg-zinc-200 dark:bg-white/10 rounded" />
                            </div>
                          ))}
                       </div>
                       <div className="h-10 w-full bg-brand-primary/10 rounded-xl mt-8 border border-brand-primary/20" />
                    </div>
                  </div>
                </div>

                {/* Animated Particles/Nodes Background for Mock UI */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <motion.path
                    d="M100,100 C200,300 400,100 700,400"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-brand-primary"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.path
                    d="M50,400 C300,200 500,500 800,200"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-brand-secondary"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                  />
                </svg>
             </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="mt-20 flex flex-col items-center gap-4 text-zinc-400 dark:text-zinc-600 font-extrabold text-[10px] uppercase tracking-[0.4em]"
        >
          <span>Explore Intelligence</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
