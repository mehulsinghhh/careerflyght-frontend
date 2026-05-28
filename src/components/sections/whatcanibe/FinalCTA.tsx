"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-background">
      {/* Visual separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/10 blur-[150px] rounded-full -z-10"
      />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const}}
          className="relative border border-white/10 glass-card rounded-[3rem] py-24 px-8 md:px-16 overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-brand-primary/10 to-transparent blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-secondary/10 to-transparent blur-3xl opacity-50" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-10"
            >
              <Sparkles className="h-4 w-4" />
              Priority Network Access
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
              Secure Your <br />
              <span className="bg-gradient-to-r from-brand-primary via-violet-500 to-fuchsia-400 bg-clip-text text-transparent">Professional Future.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Join a select network of ambitious individuals architecting the next era of innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-10 h-16 text-lg font-semibold rounded-2xl transition-all shadow-2xl shadow-brand-primary/20 border-none">
                  Begin Optimization
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-10 h-16 text-lg font-semibold rounded-2xl transition-all text-white">
                  Access Portal
                </Button>
              </Link>
            </div>

            <p className="mt-12 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
              Deployment Ready • Zero Friction Onboarding
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
