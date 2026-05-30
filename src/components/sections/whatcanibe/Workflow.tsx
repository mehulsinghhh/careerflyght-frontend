"use client";

import { motion } from "framer-motion";
import { METHODOLOGY_PHASES } from "@/constants/career-clusters";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  LineChart,
  Search,
  Activity,
  TrendingUp,
  ChevronDown
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const iconMap = {
  "assessment": Search,
  "gap-analysis": LineChart,
  "solution-design": Target,
  "implementation": Zap,
  "measurement": ShieldCheck
};

export default function Workflow() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="workflow" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-violet-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-32">
          <div className="max-w-3xl">
            <div className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">The Framework</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">Architecting Your Ascent.</h2>
            <p className="text-zinc-500 font-medium text-lg md:text-xl leading-relaxed max-w-2xl">
              We decompose the journey from ambition to achievement into precise, actionable protocols. Total clarity, zero friction.
            </p>
          </div>
          <div className="shrink-0 p-8 bg-zinc-950 border border-white/10 rounded-[2.5rem] hidden lg:block backdrop-blur-xl">
            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Standard Protocol</div>
            <div className="text-3xl font-bold text-white tracking-tighter italic">Phase 01 — 05</div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Journey Line (Desktop) */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block -translate-x-1/2" />

          <div className="space-y-12">
            {METHODOLOGY_PHASES.map((phase, idx) => {
              const Icon = iconMap[phase.id as keyof typeof iconMap];
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center justify-center md:justify-between w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Phase Marker */}
                  <div className="absolute left-[31px] md:left-1/2 -translate-x-1/2 z-20">
                    <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl group hover:border-white/30 transition-all duration-500">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    <GlowCard
                        glowColor={idx === 0 ? "rgba(168,85,247,0.1)" : "rgba(255,255,255,0.03)"}
                        className="p-8 md:p-10 bg-zinc-950/50 border-white/5 hover:border-white/20 rounded-[2.5rem] group backdrop-blur-xl transition-all duration-500 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Protocol 0{idx + 1}</span>
                            <div className="h-px flex-1 mx-4 bg-white/5" />
                            <TrendingUp className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">{phase.title}</h3>
                        <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed mb-8">
                            {phase.description}
                        </p>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Expected Outcome</div>
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">
                                &quot;{phase.details}&quot;
                            </p>
                        </div>
                    </GlowCard>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Zone */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-1000" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden backdrop-blur-xl shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />

                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight relative z-10">
                    Initiate Your <br /> <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">Terminal Assessment.</span>
                </h3>

                <div className="flex flex-col items-center gap-8 relative z-10">
                    <Link href="/whatcanibe/signup">
                      <Button size="lg" className="flex items-center gap-4 px-10 h-16 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-lg shadow-2xl group/btn">
                          Start Mission
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>

                    <div className="flex items-center gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5" /> 12.5m Duration
                        </span>
                        <div className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5" /> High Fidelity
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
