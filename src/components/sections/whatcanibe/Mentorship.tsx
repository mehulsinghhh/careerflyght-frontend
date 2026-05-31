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
    <section id="mentorship" className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-100/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative"
          >
             <GlowCard 
               glowColor="rgba(79, 70, 229, 0.1)"
               className="p-10 md:p-14 border-zinc-200 bg-white rounded-[3rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative z-10"
             >
                <Quote className="w-12 h-12 text-indigo-600 mb-10 opacity-20" />
                <p className="text-2xl md:text-3xl font-medium text-zinc-950 leading-tight mb-12 tracking-tight italic">
                  &quot;The mentorship program was the turning point. Connecting with a Senior Architect gave me direction I couldn&apos;t find anywhere else.&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 border border-zinc-100 p-[2px]">
                        <div className="w-full h-full rounded-[14px] bg-white overflow-hidden">
                           {/* Placeholder for avatar */}
                           <div className="w-full h-full bg-gradient-to-tr from-zinc-100 to-zinc-50" />
                        </div>
                     </div>
                     <div>
                        <p className="font-bold text-zinc-950 text-xl tracking-tight">Sarah Jenkins</p>
                        <p className="text-sm text-zinc-500 font-medium">Junior UI/UX Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-indigo-600 text-indigo-600" />)}
                  </div>
                </div>
             </GlowCard>

             {/* Static UI Elements */}
             <div
                className="absolute -top-10 -right-10 bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-zinc-950 tracking-tight">42 Mentors</p>
                      <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Active Now</p>
                   </div>
                </div>
             </div>

             <div
                className="absolute -bottom-8 -left-8 bg-white border border-zinc-200 p-5 rounded-3xl shadow-xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-zinc-100" />
                     ))}
                   </div>
                   <p className="text-sm font-bold text-zinc-950 tracking-tight">1.2k+ Sessions</p>
                </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
              <Users className="h-3 w-3" />
              Expert Network
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-zinc-950">
              Learn from <br />
              <span className="text-zinc-400">The Architects of</span> <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">The Future.</span>
            </h2>
            <p className="text-zinc-600 text-lg mb-12 leading-relaxed font-medium">
              Direct access to individuals who have built the companies you admire. Gain perspective, avoid pitfalls, and accelerate your trajectory.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                "Direct 1-on-1 strategic sessions",
                "Portfolio dissection & feedback",
                "High-stakes interview preparation",
                "Continuous path optimization"
              ].map((item) => (
                <li key={item} className="flex items-center gap-5 text-zinc-600">
                  <div className="shrink-0 w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="font-semibold tracking-tight">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-zinc-950 text-white hover:bg-zinc-900 px-12 h-16 text-lg font-bold rounded-2xl transition-all active:scale-95 group shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]"
            >
              Connect with Mentor
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
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
          <div className="p-10 rounded-[2rem] border border-zinc-200 bg-zinc-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/5 animate-pulse" />
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="w-20 h-20 border-t-2 border-l-2 border-indigo-600 rounded-full animate-spin" />
              <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Optimizing Mentor Match...</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-24 bg-zinc-100 rounded-2xl border border-zinc-200" />
            <div className="h-24 bg-zinc-100 rounded-2xl border border-zinc-200" />
          </div>
          <Button disabled className="w-full h-16 bg-zinc-200 text-zinc-400 rounded-2xl font-bold text-lg cursor-not-allowed">
            View Connection Roadmap
          </Button>
        </div>
      </PolishedModal>
    </section>
  );
}
