"use client";

import { motion } from "framer-motion";
import { METHODOLOGY_PHASES } from "@/constants/career-clusters";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  LineChart,
  Search,
  ChevronRight,
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

export default function Methodology() {
  return (
    <section id="methodology" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Visual background noise/energy */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(var(--brand-secondary),0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl">
              <Activity className="h-4 w-4 text-brand-secondary" />
              The Framework
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.85] uppercase">
              The <span className="text-gradient-primary">Workflow.</span>
            </h2>
            <p className="text-zinc-400 font-bold text-xl md:text-2xl leading-tight max-w-2xl">
              A high-precision, five-phase engine designed to deconstruct the distance between your current state and terminal career goals.
            </p>
          </div>
          <div className="shrink-0 p-8 bg-zinc-900 border-2 border-white/5 rounded-[2.5rem] hidden lg:block">
            <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Current Cycle</div>
            <div className="text-4xl font-black text-white uppercase tracking-tighter">Phase 01-05</div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Journey Line (Desktop) */}
          <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent opacity-20 hidden md:block" />

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
                    <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center shadow-2xl ${
                        idx === 0 ? 'ring-4 ring-brand-primary/20' : ''
                    }`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    <GlowCard
                        glowColor={idx === 0 ? "rgba(var(--brand-primary), 0.2)" : "rgba(255,255,255,0.05)"}
                        className="p-8 md:p-10 bg-zinc-900/60 border-2 border-white/5 hover:border-white/20 rounded-[2.5rem] group backdrop-blur-xl transition-all duration-500"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-black text-brand-primary uppercase tracking-[0.3em]">Module 0{idx + 1}</span>
                            <div className="h-px flex-1 mx-4 bg-white/10" />
                            <TrendingUp className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 uppercase leading-none">{phase.title}</h3>
                        <p className="text-lg text-zinc-300 font-bold leading-tight mb-8">
                            {phase.description}
                        </p>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol Output</div>
                            <p className="text-sm text-zinc-400 font-bold leading-tight italic">
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-1000" />
            <div className="relative bg-zinc-900 border-2 border-white/10 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--brand-primary),0.1),transparent_70%)]" />

                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tightest mb-8 uppercase leading-none relative z-10">
                    Initiate Your <br /> <span className="text-gradient-primary">Terminal Assessment.</span>
                </h3>

                <div className="flex flex-col items-center gap-8 relative z-10">
                    <button className="flex items-center gap-6 px-12 py-6 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-black text-lg uppercase tracking-tight shadow-2xl group/btn">
                        Start Mission
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </button>

                    <div className="flex items-center gap-8 text-[11px] font-black text-zinc-500 uppercase tracking-widest">
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
