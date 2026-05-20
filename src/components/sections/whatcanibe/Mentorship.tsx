"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Video,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Zap
} from "lucide-react";

const MENTORS = [
  {
    name: "Sarah Jenkins",
    role: "Senior UI/UX @ Google",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    tags: ["Product Design", "Systems"],
    company: "Google",
    color: "from-blue-500 to-cyan-400"
  },
  {
    name: "David Chen",
    role: "ML Architect @ NVIDIA",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    tags: ["AI", "Algorithms"],
    company: "NVIDIA",
    color: "from-green-500 to-emerald-400"
  },
  {
    name: "Aria Rodriguez",
    role: "Software Lead @ OpenAI",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    tags: ["Backend", "Scaling"],
    company: "OpenAI",
    color: "from-violet-500 to-fuchsia-400"
  },
  {
    name: "Marcus Thorne",
    role: "FinTech Lead @ Stripe",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    tags: ["Finance", "Web3"],
    company: "Stripe",
    color: "from-amber-500 to-orange-400"
  },
];

const TESTIMONIALS = [
  {
    text: "The mentorship here is unmatched. I landed my dream internship at Meta within 3 months of joining.",
    user: "Jordan K.",
    role: "Stanford University"
  },
  {
    text: "AI-powered matching found me a mentor that perfectly understood my non-traditional background.",
    user: "Lila M.",
    role: "Early Career Pro"
  }
];

export default function Mentorship() {
  return (
    <section className="py-32 px-6 bg-[#020202] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Side: Content & Social Proof */}
          <div className="lg:col-span-5">
             <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
             >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] uppercase font-black tracking-widest mb-6">
                   <Users className="w-3 h-3" />
                   The Network
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-8">
                   Learn from <br /> <span className="bg-gradient-to-r from-blue-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">The Best.</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-12">
                   Connect directly with leaders from the world's most innovative companies. Skip the trial and error—get the blueprint to success.
                </p>

                <div className="space-y-6 mb-12">
                   {TESTIMONIALS.map((t, i) => (
                     <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
                     >
                        <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                        <p className="text-gray-300 text-sm italic mb-4 leading-relaxed">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                           <div>
                              <p className="text-[10px] font-black text-white">{t.user}</p>
                              <p className="text-[8px] text-gray-500">{t.role}</p>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>

                <div className="flex items-center gap-6">
                   <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 h-16 text-lg rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      Find Your Mentor
                   </Button>
                   <div className="flex flex-col">
                      <span className="text-2xl font-black text-white">850+</span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black">Verified Mentors</span>
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Right Side: Immersive Mentor Wall */}
          <div className="lg:col-span-7 relative">
             <div className="grid grid-cols-2 gap-6 relative z-10">
                {MENTORS.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 group relative overflow-hidden flex flex-col items-center text-center backdrop-blur-xl"
                  >
                     <div className={`absolute -inset-2 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />

                     {/* Mentor Image */}
                     <div className="relative mb-6">
                        <div className={`absolute -inset-1.5 bg-gradient-to-br ${m.color} rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity`} />
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 relative z-10 shadow-2xl">
                           <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#020202] z-20 flex items-center justify-center">
                           <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </div>
                     </div>

                     <h3 className="text-xl font-black text-white mb-1">{m.name}</h3>
                     <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest mb-4">{m.role}</p>

                     <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                        {m.tags.map(tag => (
                          <span key={tag} className="text-[8px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-medium">{tag}</span>
                        ))}
                     </div>

                     <div className="flex items-center gap-3 w-full">
                        <Button size="sm" className="flex-1 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black text-[10px] font-black uppercase tracking-widest h-10 rounded-xl transition-all">
                           Book Session
                        </Button>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
                           <MessageSquare className="w-4 h-4" />
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>

             {/* Floating Trust Badges */}
             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 p-5 rounded-3xl bg-black/80 border border-white/10 backdrop-blur-2xl shadow-2xl z-20"
             >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">Identity Verified</p>
                      <p className="text-[8px] text-gray-500">Industry Expert Certified</p>
                   </div>
                </div>
             </motion.div>

             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-10 -left-10 p-5 rounded-3xl bg-black/80 border border-white/10 backdrop-blur-2xl shadow-2xl z-20"
             >
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-black" />
                      ))}
                   </div>
                   <p className="text-[10px] font-black text-white">+12k Reviews</p>
                   <div className="flex gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
