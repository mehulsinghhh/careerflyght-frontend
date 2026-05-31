"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-40 px-6 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-100/20 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950 text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Global Protocol Access
          </div>

          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.85] text-zinc-950">
            Secure Your <br />
            <span className="italic text-zinc-400">Professional Fate.</span>
          </h2>
          <p className="text-zinc-600 text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            Join a select network of ambitious individuals architecting the next era of global innovation. Secure your professional future today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/whatcanibe/signup" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-zinc-950 text-white hover:bg-zinc-900 px-12 h-20 text-xl font-bold rounded-2xl transition-all border-none shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                Begin Optimization
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/whatcanibe/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-200 bg-white hover:bg-zinc-50 hover:text-zinc-950 px-12 h-20 text-xl font-bold rounded-2xl transition-all text-zinc-950 backdrop-blur-md">
                Access Portal
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600 uppercase">
                    U{i}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600 uppercase">
                   +2k
                </div>
             </div>
             <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
               Deployment Ready • Instant Activation
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
