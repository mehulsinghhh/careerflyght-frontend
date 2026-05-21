"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 px-6 md:py-32">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-4xl"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium mb-8"
        >
          <Sparkles className="h-3 w-3" />
          Next-Gen Career Intelligence
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.05]"
        >
          Discover your future. <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            Define your own path.
          </span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          The all-in-one platform for students and early-career professionals to explore industries, build roadmaps, and connect with world-class mentors.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {isLoggedIn ? (
            <>
              <Link href="/whatcanibe/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 text-base rounded-xl transition-all shadow-lg shadow-violet-600/25 border-none">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/careers" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-8 h-12 text-base rounded-xl transition-all">
                  Explore Careers
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 text-base rounded-xl transition-all shadow-lg shadow-violet-600/25 border-none">
                  Start Exploring Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/pathways" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-8 h-12 text-base rounded-xl transition-all">
                  See How It Works
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          variants={itemVariants}
          className="mt-20 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl border border-white/10 bg-black p-2 backdrop-blur-sm">
             <div className="rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden aspect-[16/9] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/10 to-transparent" />

                {/* Mock UI Elements */}
                <div className="w-full h-full p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-6 w-32 bg-white/5 rounded-full" />
                  </div>

                  <div className="grid grid-cols-3 gap-6 flex-1">
                    <div className="col-span-2 space-y-6">
                      <div className="h-40 w-full bg-white/5 rounded-2xl border border-white/5 p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="h-10 w-10 rounded-lg bg-violet-600/20" />
                          <div className="space-y-2">
                            <div className="h-3 w-32 bg-white/10 rounded" />
                            <div className="h-2 w-20 bg-white/5 rounded" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 w-full bg-white/5 rounded" />
                          <div className="h-2 w-4/5 bg-white/5 rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                        <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="h-full bg-white/5 rounded-2xl border border-white/5 p-6">
                        <div className="h-4 w-20 bg-white/10 rounded mb-6" />
                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-violet-500" />
                              <div className="h-2 flex-1 bg-white/5 rounded" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Decorative Glow */}
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-violet-500/20 blur-[60px] rounded-full"
                />
             </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
