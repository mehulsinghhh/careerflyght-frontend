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
  TrendingUp,
  Activity
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

const iconMap = {
  "assessment": Search,
  "gap-analysis": LineChart,
  "solution-design": Target,
  "implementation": Zap,
  "measurement": ShieldCheck
};

export default function Workflow() {
  return (
    <section id="workflow" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Visual background noise/energy */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-32">
          <div className="max-w-3xl">
            <div className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Core Methodology</div>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-tight">
              The <span className="text-brand-primary">Workflow.</span>
            </h2>
            <p className="text-zinc-500 font-medium text-xl leading-relaxed max-w-2xl">
              A high-precision, five-phase engine designed to deconstruct the distance between your current state and terminal career goals.
            </p>
          </div>
          <div className="shrink-0 p-8 bg-zinc-950 border border-white/5 rounded-[2.5rem] hidden lg:block backdrop-blur-xl">
            <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4 text-center">Protocol Sequence</div>
            <div className="text-4xl font-bold text-white tracking-tighter">PHASE 01-05</div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Journey Line (Desktop) */}
          <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/50 via-brand-primary/20 to-transparent hidden md:block" />

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
                  <div className="absolute left-[14px] md:left-1/2 -translate-x-1/2 z-20">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-2xl">
                        <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    <GlowCard
                        glowColor="rgba(168, 85, 247, 0.1)"
                        className="p-8 md:p-10 bg-zinc-950/50 border-white/5 hover:border-brand-primary/20 rounded-[2.5rem] group backdrop-blur-xl transition-all duration-500"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Module 0{idx + 1}</span>
                            <div className="h-px flex-1 mx-4 bg-white/5" />
                            <TrendingUp className="w-4 h-4 text-zinc-800 group-hover:text-brand-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-brand-primary transition-colors">{phase.title}</h3>
                        <p className="text-base text-zinc-500 font-medium leading-relaxed mb-8">
                            {phase.description}
                        </p>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Output</div>
                            <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
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
            className="mt-32 relative"
        >
            <div className="relative bg-zinc-950/50 border border-white/5 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />

                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 relative z-10">
                    Initiate Your <br /> <span className="bg-gradient-to-r from-brand-primary to-violet-400 bg-clip-text text-transparent">Terminal Assessment.</span>
                </h3>

                <div className="flex flex-col items-center gap-8 relative z-10">
                    <button className="flex items-center gap-6 px-12 py-6 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-lg shadow-2xl group/btn">
                        Start Mission
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </button>

                    <div className="flex items-center gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5" /> 12.5m Duration
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
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
