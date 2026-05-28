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
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Visual separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const}}
            className="order-2 lg:order-1 relative"
          >
             <GlowCard 
               glowColor="rgba(168, 85, 247, 0.15)"
               className="p-8 md:p-12 border-white/10 glass-card rounded-[2.5rem] shadow-2xl relative z-10"
             >
                <Quote className="w-10 h-10 text-brand-primary mb-8 opacity-40" />
                <p className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-10 tracking-tight">
                  &quot;The mentorship program was the turning point. Connecting with a Senior Architect gave me direction I couldn&apos;t find anywhere else.&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-violet-600 border border-white/10 p-[2px]">
                        <div className="w-full h-full rounded-[14px] bg-zinc-900 overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700" />
                        </div>
                     </div>
                     <div>
                        <p className="font-bold text-white text-lg tracking-tight">Sarah Jenkins</p>
                        <p className="text-xs text-muted-foreground font-medium">Junior UI/UX Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />)}
                  </div>
                </div>
             </GlowCard>

             {/* Floating Elements */}
             <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-card/80 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl hidden md:block z-20"
             >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white tracking-tight">42 Mentors</p>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Active Now</p>
                   </div>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
              <Users className="h-3.5 w-3.5" />
              Expert Network
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight text-white">
              Learn from <br />
              <span className="text-muted-foreground/60">Architects of</span> <br />
              <span className="bg-gradient-to-r from-brand-primary to-violet-400 bg-clip-text text-transparent">The Future.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-normal">
              Direct access to individuals who have built the companies you admire. Gain perspective, avoid pitfalls, and accelerate your trajectory.
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                "1-on-1 strategic sessions",
                "Portfolio feedback",
                "Interview preparation",
                "Path optimization"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-300">
                  <div className="shrink-0 w-5 h-5 rounded-md bg-brand-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />
                  </div>
                  <span className="font-semibold text-sm tracking-tight">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-brand-primary text-white hover:bg-brand-primary/90 px-10 h-14 text-base font-semibold rounded-xl transition-all shadow-xl shadow-brand-primary/20 active:scale-95 group"
            >
              Connect with Mentor
              <motion.span 
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
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
        <div className="space-y-6 py-4">
          <div className="p-10 rounded-3xl border border-white/5 bg-card/40 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-brand-primary/5 animate-pulse" />
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-16 h-16 border-t-2 border-l-2 border-brand-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Optimizing Mentor Match...</p>
            </div>
          </div>
          <Button disabled className="w-full h-14 bg-white/5 text-muted-foreground rounded-xl font-bold text-base cursor-not-allowed border border-white/5">
            View Connection Roadmap
          </Button>
        </div>
      </PolishedModal>
    </section>
  );
}
