"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-48 px-4 md:px-6 relative overflow-hidden bg-white dark:bg-background transition-colors duration-500">
      {/* Visual separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-primary/20 blur-[180px] rounded-full -z-10"
      />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const}}
          className="relative border border-zinc-100 dark:border-white/10 glass rounded-[4rem] py-24 px-8 md:py-32 md:px-20 overflow-hidden shadow-2xl group"
        >
          {/* Decorative elements */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-brand-primary/10 to-transparent blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-brand-secondary/10 to-transparent blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Global Protocol Access
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none dark:text-white text-zinc-900">
              Secure Your <br />
              <span className="text-gradient-purple">Professional Fate.</span>
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500 text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-bold">
              Join a select network of ambitious individuals architecting the next era of global innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto group/btn">
                <Button size="lg" className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-12 h-20 text-xl font-black rounded-2xl transition-all shadow-2xl shadow-brand-primary/30 border-none active:scale-95">
                  Begin Optimization
                  <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover/btn:translate-x-2" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 px-12 h-20 text-xl font-black rounded-2xl transition-all dark:text-white text-zinc-900 active:scale-95 shadow-lg">
                  Access Portal
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8">
               <div className="flex -space-x-4">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="h-12 w-12 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black">
                     U{i}
                   </div>
                 ))}
                 <div className="h-12 w-12 rounded-full border-4 border-white dark:border-zinc-900 bg-brand-vibrant flex items-center justify-center text-[10px] font-black text-white">
                   +2k
                 </div>
               </div>
               <div className="h-12 w-px bg-zinc-200 dark:bg-white/10 hidden sm:block" />
               <p className="text-[10px] dark:text-zinc-500 text-zinc-400 font-black uppercase tracking-[0.2em] flex items-center gap-3">
                 <Zap className="h-4 w-4 text-brand-vibrant animate-pulse" />
                 Deployment Ready &bull; Instant Activation
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
