"use client";

import { Button } from "@/components/ui/button";
import { Quote, CheckCircle2, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { useRouter } from "next/navigation";

export default function Mentorship() {
  const router = useRouter();

  return (
    <section id="mentorship" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none opacity-[0.05]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/[0.02] blur-[100px] rounded-full pointer-events-none opacity-[0.05]" />

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
               className="p-10 md:p-14 border-zinc-200 bg-white/80 backdrop-blur-3xl rounded-[3rem] shadow-2xl shadow-indigo-500/5 relative z-10"
             >
                <Quote className="w-12 h-12 text-indigo-600 mb-10 opacity-20" />
                <p className="text-2xl md:text-3xl font-medium text-zinc-900 leading-tight mb-12 tracking-tight italic">
                  &quot;The mentorship program was the turning point. Connecting with a Senior Architect gave me direction I couldn&apos;t find anywhere else.&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 border border-indigo-100 p-[2px]">
                        <div className="w-full h-full rounded-[14px] bg-zinc-100 overflow-hidden">
                           {/* Placeholder for avatar */}
                           <div className="w-full h-full bg-gradient-to-tr from-zinc-200 to-zinc-100" />
                        </div>
                     </div>
                     <div>
                        <p className="font-bold text-zinc-900 text-xl tracking-tight">Sarah Jenkins</p>
                        <p className="text-sm text-zinc-400 font-medium">Junior UI/UX Designer @ TechFlow</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-indigo-500 text-indigo-500" />)}
                  </div>
                </div>
             </GlowCard>

             {/* Static UI Elements */}
             <div
                className="absolute -top-10 -right-10 bg-white/80 border border-zinc-100 p-6 rounded-3xl shadow-xl backdrop-blur-2xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-zinc-900 tracking-tight">42 Mentors</p>
                      <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">Active Now</p>
                   </div>
                </div>
             </div>

             <div
                className="absolute -bottom-8 -left-8 bg-white/80 border border-zinc-100 p-5 rounded-3xl shadow-xl backdrop-blur-2xl hidden md:block z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-zinc-100" />
                     ))}
                   </div>
                   <p className="text-sm font-bold text-zinc-900 tracking-tight">1.2k+ Sessions</p>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/10 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Users className="h-3 w-3" />
              Expert Network
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-zinc-900">
              Learn from <br />
              <span className="text-zinc-400 font-medium">The Architects of</span> <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">The Future.</span>
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
                <li key={item} className="flex items-center gap-5 text-zinc-600">
                  <div className="shrink-0 w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="font-semibold tracking-tight">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => router.push("/whatcanibe/mentors")}
              size="lg"
              className="bg-indigo-600 text-white hover:bg-indigo-500 px-12 h-16 text-lg font-bold rounded-2xl transition-all active:scale-95 group"
            >
              Connect with Mentor
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
