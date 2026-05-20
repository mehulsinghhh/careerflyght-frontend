"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

import { Users, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-40 px-6 bg-[#020202] relative overflow-hidden">
      {/* Intense Background Visuals */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto rounded-[4rem] bg-zinc-950 border border-white/10 p-12 md:p-24 relative overflow-hidden text-center shadow-[0_0_100px_rgba(124,58,237,0.2)]">

           {/* Decorative Top Accent */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-64 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
           >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] uppercase font-black tracking-widest mb-8">
                 <Sparkles className="w-3 h-3" />
                 Launch Your Evolution
              </div>

              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-10">
                 The Future <br /> <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">Belongs to You.</span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-16 max-w-3xl mx-auto">
                 Join 45,000+ students already engineering their future with the world's most advanced career intelligence engine.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-12 h-20 text-xl rounded-[2rem] font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)] group">
                    Create Your Account
                    <ArrowUpRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/whatcanibe/careers" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 text-white px-12 h-20 text-xl rounded-[2rem] font-black hover:bg-white/5 backdrop-blur-md transition-all gap-3">
                    <Target className="w-5 h-5 text-violet-400" />
                    Browse Careers
                  </Button>
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16">
                 {[
                   { label: "AI Guidance", icon: Zap },
                   { label: "Elite Mentors", icon: Users },
                   { label: "Job Guarantee", icon: ShieldCheck }
                 ].map((feat, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <feat.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{feat.label}</span>
                   </div>
                 ))}
              </div>
           </motion.div>

           {/* Floating elements inside the box */}
           <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[-20px] w-40 h-40 bg-violet-600/10 blur-[80px] rounded-full"
           />
           <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-[-20px] w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full"
           />
        </div>
      </div>

      {/* Extreme Bottom Lighting */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full h-[300px] bg-violet-600/10 blur-[150px] rounded-full" />
    </section>
  );
}
