"use client";

import { Button } from "@/components/ui/button";
import { Quote, CheckCircle2, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { useState } from "react";
import { PolishedModal } from "@/components/ui/polished-modal";

export default function Mentorship() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-32 px-4 md:px-6 bg-white dark:bg-background relative overflow-hidden transition-colors duration-500">
      {/* Visual separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-vibrant/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const}}
            className="order-2 lg:order-1 relative"
          >
             <GlowCard 
               glowColor="rgba(255, 61, 113, 0.15)"
               className="p-8 md:p-12 border-zinc-100 dark:border-white/10 glass rounded-[3rem] shadow-2xl relative z-10"
             >
                <Quote className="w-12 h-12 text-brand-vibrant mb-8 opacity-40" />
                <p className="text-xl md:text-3xl font-black dark:text-white text-zinc-900 leading-tight mb-12 tracking-tighter">
                  &quot;The mentorship program was the turning point. Connecting with a Senior Architect gave me direction I couldn&apos;t find anywhere else.&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-vibrant to-brand-primary p-[3px] shadow-lg shadow-brand-vibrant/20">
                        <div className="w-full h-full rounded-[13px] bg-zinc-900 dark:bg-white overflow-hidden flex items-center justify-center">
                           <Users className="h-8 w-8 text-white dark:text-zinc-900" />
                        </div>
                     </div>
                     <div>
                        <p className="font-black dark:text-white text-zinc-900 text-xl tracking-tight leading-none mb-1">Sarah Jenkins</p>
                        <p className="text-xs dark:text-zinc-500 text-zinc-400 font-black uppercase tracking-widest">UI/UX Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-brand-vibrant text-brand-vibrant" />)}
                  </div>
                </div>
             </GlowCard>

             {/* Floating Elements */}
             <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 glass border-zinc-200 dark:border-white/10 p-6 rounded-[2rem] shadow-2xl backdrop-blur-3xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                   </div>
                   <div>
                      <p className="text-lg font-black dark:text-white text-zinc-900 tracking-tight leading-none">42 Mentors</p>
                      <p className="text-[10px] dark:text-zinc-500 text-zinc-400 font-black uppercase tracking-widest mt-1">Active Now</p>
                   </div>
                </div>
             </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-vibrant/10 text-brand-vibrant text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Zap className="h-3.5 w-3.5" />
              Expert Network
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none dark:text-white text-zinc-900">
              Learn from <br />
              <span className="text-gradient-purple">Architects of</span> <br />
              <span className="opacity-40">The Future.</span>
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500 text-lg md:text-xl mb-12 leading-relaxed font-bold max-w-xl">
              Direct access to individuals who have built the companies you admire. Gain perspective, avoid pitfalls, and accelerate your trajectory.
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-5 mb-12">
              {[
                "1-on-1 strategic sessions",
                "Portfolio roast sessions",
                "Interview masterclass",
                "Trajectory optimization"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-lg bg-brand-vibrant/10 flex items-center justify-center border border-brand-vibrant/20">
                    <CheckCircle2 className="w-4 h-4 text-brand-vibrant" />
                  </div>
                  <span className="font-black text-sm dark:text-zinc-300 text-zinc-600 uppercase tracking-tight">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-brand-vibrant hover:bg-brand-vibrant/90 text-white px-12 h-16 text-lg font-black rounded-2xl transition-all shadow-2xl shadow-brand-vibrant/20 active:scale-95 group"
            >
              Connect with Mentor
              <motion.span 
                className="ml-3 inline-block"
                animate={{ x: [0, 6, 0] }}
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
          <div className="p-16 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/5 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-brand-primary/5 animate-pulse" />
            <div className="flex flex-col items-center gap-8 relative z-10">
              <div className="w-20 h-20 border-t-4 border-l-4 border-brand-vibrant rounded-full animate-spin" />
              <p className="dark:text-zinc-500 text-zinc-400 font-black text-[10px] uppercase tracking-[0.3em]">Optimizing Connectivity...</p>
            </div>
          </div>
          <Button disabled className="w-full h-16 bg-zinc-100 dark:bg-white/5 dark:text-zinc-600 text-zinc-400 rounded-2xl font-black text-lg cursor-not-allowed border border-zinc-100 dark:border-white/10">
            View Connection Roadmap
          </Button>
        </div>
      </PolishedModal>
    </section>
  );
}
