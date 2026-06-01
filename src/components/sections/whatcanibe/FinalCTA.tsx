"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-48 px-6 relative overflow-hidden bg-zinc-950">
      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
             backgroundSize: "15vw 15vh"
           }}
      />

      {/* Atmospheric Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white text-[11px] font-black uppercase tracking-[0.4em] mb-16 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Strategic Deployment Phase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[12rem] font-bold tracking-[-0.04em] leading-[0.75] text-white uppercase mb-16"
          >
            Secure Your <br />
            <span className="italic font-normal text-primary">Professional</span> <br />
            Fate.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl text-zinc-400 font-medium max-w-4xl leading-tight mb-24 text-balance"
          >
            The engine is ready. The trajectories are mapped. <br className="hidden md:block" />
            The only variable remaining is <span className="text-white font-black border-b-8 border-primary/20">your initiation.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto"
          >
            <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-white hover:text-zinc-950 px-20 h-28 text-2xl rounded-[2.5rem] transition-all font-black uppercase tracking-[0.2em] shadow-hero group">
                Join Free
                <ArrowRight className="ml-4 h-8 w-8 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>

            <Link href="/whatcanibe/careers" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-4 border-white/20 text-white hover:border-white px-16 h-28 text-2xl rounded-[2.5rem] transition-all font-black uppercase tracking-[0.2em] bg-transparent">
                Deconstruct Engine
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-32 pt-16 border-t border-white/10 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-zinc-800" />
                ))}
              </div>
              <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                <span className="text-white">1,240+</span> Pioneers Initiated Today
              </p>
            </div>

            <div className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.6em]">
              High-Fidelity Career Engine v2.0 • Established 2024
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
