"use client";

import { Button } from "@/components/ui/button";
import { Quote, CheckCircle2, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { useState } from "react";
import { PolishedModal } from "@/components/ui/polished-modal";

export default function Mentorship() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-32 px-6 bg-zinc-50 dark:bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const}}
            className="order-2 lg:order-1 relative"
          >
             <GlowCard 
               glowColor="rgba(168, 85, 247, 0.1)"
               className="p-10 md:p-14 border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/50 backdrop-blur-2xl rounded-[3rem] shadow-2xl relative z-10"
             >
                <Quote className="w-12 h-12 text-brand-primary mb-10 opacity-40" />
                <p className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white leading-tight mb-12 tracking-tight italic">
                  &quot;The mentorship program was the turning point. Connecting with a Senior Architect gave me direction I couldn&apos;t find anywhere else.&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-violet-600 border border-zinc-100 dark:border-white/10 p-[2px]">
                        <div className="w-full h-full rounded-[14px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700" />
                        </div>
                     </div>
                     <div>
                        <p className="font-bold text-zinc-900 dark:text-white text-xl tracking-tight">Sarah Jenkins</p>
                        <p className="text-sm text-zinc-500 font-medium">Junior UI/UX Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-brand-primary text-brand-primary" />)}
                  </div>
                </div>
             </GlowCard>

             {/* Floating UI Elements */}
             <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 p-6 rounded-3xl shadow-2xl backdrop-blur-xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">42 Mentors</p>
                      <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">Active Now</p>
                   </div>
                </div>
             </motion.div>

             <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 p-5 rounded-3xl shadow-2xl backdrop-blur-xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-xl border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                     ))}
                   </div>
                   <p className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">1.2k+ Sessions</p>
                </div>
             </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1]as const }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Users className="h-3 w-3" />
              Expert Network
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
              Learn from <br />
              <span className="text-zinc-400 dark:text-zinc-600">The Architects of</span> <br />
              <span className="bg-gradient-to-r from-brand-primary to-violet-400 bg-clip-text text-transparent">The Future.</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-12 leading-relaxed font-medium">
              Direct access to individuals who have built the companies you admire. Gain perspective, avoid pitfalls, and accelerate your trajectory.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                "Direct 1-on-1 strategic sessions",
                "Portfolio dissection & feedback",
                "High-stakes interview preparation",
                "Continuous path optimization"
              ].map((item) => (
                <li key={item} className="flex items-center gap-5 text-zinc-600 dark:text-zinc-300">
                  <div className="shrink-0 w-6 h-6 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="font-semibold tracking-tight">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-brand-primary text-white hover:bg-brand-primary/90 px-12 h-16 text-lg font-bold rounded-2xl transition-all shadow-2xl shadow-brand-primary/20 active:scale-95 group border-none"
            >
              Connect with Mentor
              <motion.span 
                className="ml-2 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>

      <PolishedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Network Access"
        description="Our engine is identifying relevant industry connections for your profile."
      >
        <div className="space-y-8 py-4">
          <div className="p-10 rounded-[2rem] border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 animate-pulse" />
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-20 h-20 border-t-2 border-l-2 border-brand-primary rounded-full animate-spin" />
              <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Optimizing Mentor Match...</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-24 bg-zinc-100 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5" />
            <div className="h-24 bg-zinc-100 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5" />
          </div>
          <Button disabled className="w-full h-16 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 rounded-2xl font-bold text-lg cursor-not-allowed border-none">
            View Connection Roadmap
          </Button>
        </div>
      </PolishedModal>
    </section>
  );
}
