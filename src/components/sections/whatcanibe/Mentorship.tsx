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
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
             <div className="absolute inset-0 bg-violet-600/10 blur-[100px] -z-10" />
             <GlowCard className="p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-md rounded-[2.5rem]">
                <Quote className="w-12 h-12 text-violet-500 mb-8 opacity-50" />
                <p className="text-xl md:text-2xl font-medium text-gray-200 leading-relaxed italic mb-10">
                  &quot;The mentorship program at WhatCanIBe was the turning point for my career. Connecting with a Senior Architect while I was still in university gave me the confidence and direction I couldn&apos;t find anywhere else.&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 border-2 border-white/10" />
                     <div>
                        <p className="font-bold text-white text-lg">Sarah Jenkins</p>
                        <p className="text-sm text-gray-500">Junior UI/UX Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-violet-500 text-violet-500" />)}
                  </div>
                </div>
             </GlowCard>

             {/* Floating UI Badges */}
             <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 bg-zinc-900/90 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md hidden md:block"
             >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-white">42 Mentors</p>
                      <p className="text-[10px] text-gray-500 font-medium">Currently Online</p>
                   </div>
                </div>
             </motion.div>

             <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-zinc-900/90 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-md hidden md:block"
             >
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                     {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-violet-600/30" />)}
                   </div>
                   <p className="text-xs font-bold text-white">500+ Sessions Booked</p>
                </div>
             </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium mb-6">
              <Users className="h-3 w-3" />
              Expert Guidance
            </div>
            <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">Learn from Those <br /><span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Who Have Been There</span></h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Don&apos;t just read about careers. Talk to the people living them. Our platform connects you with verified mentors from leading companies across the globe.
            </p>
            
            <ul className="space-y-5 mb-10">
              {[
                "Direct 1-on-1 video consultations",
                "Portfolio and resume reviews",
                "Industry-specific interview prep",
                "Long-term career guidance"
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-gray-300">
                  <div className="shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-violet-500" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-10 h-14 text-lg font-bold rounded-2xl transition-all shadow-xl shadow-white/5 active:scale-95"
            >
              Find a Mentor
            </Button>
          </motion.div>
        </div>
      </div>

      <PolishedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Find Your Perfect Mentor"
        description="Our AI is matching you with industry leaders."
      >
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 font-medium">Scanning mentor database...</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
          </div>
          <Button disabled className="w-full h-12 bg-violet-600 rounded-xl opacity-50">
            View Matches
          </Button>
        </div>
      </PolishedModal>
    </section>
  );
}
