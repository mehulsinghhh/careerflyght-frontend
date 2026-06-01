"use client";

import { Button } from "@/components/ui/button";
import { Quote, CheckCircle2, Star, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { PolishedModal } from "@/components/ui/polished-modal";

export default function Mentorship() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="mentorship" className="py-32 md:py-48 px-6 relative overflow-hidden bg-surface-cool">
      {/* Editorial Watermark */}
      <div className="absolute top-40 right-[-100px] opacity-[0.03] pointer-events-none hidden xl:block rotate-90 origin-center">
        <span className="text-[180px] font-black uppercase tracking-[0.2em] leading-none">ARCHITECTS</span>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
             <div
               className="p-12 md:p-20 border-2 border-zinc-950 bg-white rounded-[4rem] shadow-hero relative z-10"
             >
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white shadow-hero">
                  <Quote className="w-10 h-10 fill-current" />
                </div>

                <p className="text-3xl md:text-5xl font-medium text-zinc-950 leading-[1.1] mb-16 tracking-tight italic uppercase">
                  &quot;The mentorship program was the turning point. Connecting with a Senior Architect gave me direction I couldn&apos;t find anywhere else.&quot;
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-12 border-t-2 border-strong">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-2xl bg-zinc-950 p-[2px] shadow-premium">
                        <div className="w-full h-full rounded-[14px] bg-white overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-tr from-zinc-200 to-zinc-50" />
                        </div>
                     </div>
                     <div>
                        <p className="font-black text-zinc-950 text-2xl tracking-tighter uppercase">Sarah Jenkins</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Senior UI Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                  </div>
                </div>
             </div>

             {/* Architectural UI Elements */}
             <div
                className="absolute -top-16 -right-16 bg-zinc-950 text-white p-8 rounded-[2.5rem] shadow-hero hidden md:block z-20 rotate-6"
             >
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                   </div>
                   <div>
                      <p className="text-2xl font-black tracking-tighter">42 MENTORS</p>
                      <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">LIVE PROTOCOL</p>
                   </div>
                </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border-strong bg-white text-zinc-950 text-[11px] font-black uppercase tracking-[0.4em] mb-12 shadow-premium">
              <Users className="h-4 w-4 text-primary" />
              Expert Network
            </div>

            <h2 className="text-6xl md:text-9xl font-bold mb-12 tracking-[-0.04em] leading-[0.8] text-zinc-950 uppercase">
              The <br />
              <span className="italic font-normal text-primary">Architects.</span>
            </h2>

            <p className="text-xl md:text-2xl text-zinc-600 mb-16 leading-relaxed font-medium border-l-8 border-primary/10 pl-10">
              Direct access to individuals who have built the companies you admire. Gain perspective, avoid pitfalls, and accelerate your trajectory.
            </p>
            
            <ul className="space-y-8 mb-20">
              {[
                "Direct 1-on-1 strategic sessions",
                "Portfolio dissection & feedback",
                "High-stakes interview preparation",
                "Continuous path optimization"
              ].map((item) => (
                <li key={item} className="flex items-center gap-6 text-zinc-950">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-zinc-950 flex items-center justify-center shadow-premium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-black text-sm uppercase tracking-[0.15em]">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-zinc-950 text-white hover:bg-primary px-16 h-24 text-xl rounded-[2rem] transition-all font-black uppercase tracking-widest shadow-hero group"
            >
              Connect with Mentor
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
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
          <div className="p-16 rounded-[3rem] border-2 border-zinc-950 bg-zinc-50 flex items-center justify-center relative overflow-hidden shadow-premium">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <div className="flex flex-col items-center gap-8 relative z-10">
              <div className="w-24 h-24 border-t-4 border-l-4 border-primary rounded-full animate-spin" />
              <p className="text-zinc-950 font-black text-[11px] uppercase tracking-[0.4em]">Optimizing Mentor Match...</p>
            </div>
          </div>
          <Button disabled className="w-full h-20 bg-zinc-100 text-zinc-400 rounded-3xl font-black uppercase tracking-widest text-sm cursor-not-allowed border-strong">
            View Connection Roadmap
          </Button>
        </div>
      </PolishedModal>
    </section>
  );
}
