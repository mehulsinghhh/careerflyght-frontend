"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-black">
      {/* Background radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/10 blur-[150px] rounded-full -z-10"
      />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-white/5 bg-zinc-950/50 rounded-[4rem] py-24 px-8 md:px-16 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-brand-primary/20 to-transparent blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-600/20 to-transparent blur-3xl opacity-50" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-200" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12"
            >
              <Sparkles className="h-4 w-4" />
              Priority Network Access
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-10 leading-[0.95] text-white">
              Secure Your <br />
              <span className="bg-gradient-to-r from-brand-primary via-violet-500 to-fuchsia-400 bg-clip-text text-transparent">Professional Future.</span>
            </h2>
            <p className="text-zinc-500 text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
              Join a select network of ambitious individuals architecting the next era of innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-12 h-20 text-xl font-bold rounded-3xl transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] border-none">
                  Begin Optimization
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/whatcanibe/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:border-brand-primary/50 hover:bg-white/5 px-12 h-20 text-xl font-bold rounded-3xl transition-all text-white">
                  Access Portal
                </Button>
              </Link>
            </div>

            <p className="mt-16 text-[11px] text-zinc-600 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Deployment Ready • Zero Friction Onboarding
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
