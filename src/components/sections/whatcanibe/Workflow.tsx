"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { METHODOLOGY_PHASES } from '@/constants/career-clusters';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  LineChart,
  Search,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const iconMap = {
  'assessment': Search,
  'gap-analysis': LineChart,
  'solution-design': Target,
  'implementation': Zap,
  'measurement': ShieldCheck
};

const phaseMetas = [
  { label: 'Neural Mapping', bg: 'bg-indigo-50/50', border: 'border-indigo-100', color: 'text-indigo-600' },
  { label: 'Trajectory Analysis', bg: 'bg-purple-50/50', border: 'border-purple-100', color: 'text-purple-600' },
  { label: 'Strategic Alignment', bg: 'bg-pink-50/50', border: 'border-pink-100', color: 'text-pink-600' },
  { label: 'Active Deployment', bg: 'bg-emerald-50/50', border: 'border-emerald-100', color: 'text-emerald-600' },
  { label: 'Feedback Intelligence', bg: 'bg-amber-50/50', border: 'border-amber-100', color: 'text-amber-600' }
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);

  const gridClasses = [
    "md:col-start-1 md:row-start-1", // P1
    "md:col-start-2 md:row-start-1", // P2
    "md:col-start-1 md:row-start-2", // P3
    "md:col-start-2 md:row-start-2", // P4
    "md:col-start-1 md:row-start-3", // P5
  ];

  return (
    <section id="workflow" ref={containerRef} className="py-32 md:py-40 px-6 relative overflow-hidden bg-surface-warm">
      {/* Editorial Watermark */}
      <div className="absolute bottom-40 left-0 opacity-[0.03] pointer-events-none hidden xl:block">
        <span className="text-[200px] font-black uppercase leading-none tracking-tighter">PROTOCOL</span>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section - Editorial */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:max-w-4xl"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-strong bg-white text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 shadow-sm"
            >
              The Methodology
            </div>
            <h2 className="text-6xl md:text-9xl font-bold tracking-[-0.04em] text-zinc-950 leading-[0.8] uppercase">
              Architecting <br />
              <span className="italic font-normal text-primary">Your</span> Ascent.
            </h2>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:max-w-md pb-4"
          >
            <p className="text-xl text-zinc-500 font-medium leading-relaxed border-l-4 border-primary/20 pl-8">
              A high-fidelity framework designed to deconstruct the journey from ambition to mastery into precise, actionable protocols.
            </p>
          </motion.div>
        </div>

        {/* Roadmap Grid */}
        <div className="relative max-w-6xl mx-auto">
          {/* Architectural Connector Path (Desktop) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" preserveAspectRatio="none" className="opacity-10">
              <path
                d="M 250 150 H 750 V 300 H 250 V 450 H 750 V 600"
                stroke="var(--foreground)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative z-10">
            {METHODOLOGY_PHASES.map((phase, idx) => {
              const Icon = iconMap[phase.id as keyof typeof iconMap] || Activity;
              const meta = phaseMetas[idx];

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`${gridClasses[idx]} group`}
                >
                  <div className={`h-full p-10 md:p-14 ${meta.bg} border-2 ${meta.border} hover:bg-white hover:border-zinc-950 transition-all duration-500 rounded-[3rem] relative overflow-hidden flex flex-col justify-between shadow-premium hover:shadow-hero`}>
                    <div>
                      <div className="flex items-start justify-between mb-12">
                        <div className="flex flex-col gap-1">
                          <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${meta.color}`}>
                            {meta.label}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            Protocol 0{idx + 1}
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-strong flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500 shadow-sm">
                          <Icon className="w-8 h-8" />
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-zinc-950 mb-6 tracking-tighter uppercase group-hover:text-primary transition-colors duration-500">{phase.title}</h3>

                      <div className="space-y-6">
                        <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                          {phase.description}
                        </p>

                        <div className="p-6 bg-white/50 rounded-2xl border border-strong group-hover:border-zinc-200 transition-all duration-500">
                          <p className="text-[13px] text-zinc-500 leading-relaxed font-bold italic">
                            {phase.details}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-strong flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${meta.bg.replace('/50', '')} border border-strong shadow-sm`} />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sync: Active</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-950 transition-all duration-500">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">Execute Protocol</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Final Launch Roadmap CTA integrated into the grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="md:col-start-2 md:row-start-3"
            >
               <Link href="/whatcanibe/signup" className="block h-full">
                <Button className="w-full h-full min-h-[220px] rounded-[3rem] bg-zinc-950 text-white hover:bg-primary border-none shadow-hero group/btn transition-all duration-500 flex flex-col items-center justify-center gap-6 p-12">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:bg-white group-hover/btn:text-zinc-950 transition-all duration-500">
                    <Zap className="w-10 h-10 fill-current" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 block mb-3 group-hover/btn:text-white/60">Final Authorization</span>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold tracking-tighter uppercase">Launch Roadmap</span>
                      <ArrowRight className="w-8 h-8 group-hover/btn:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Subtle Bottom Trust Bar */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
        >
            <p className="text-zinc-400 font-black text-[10px] uppercase tracking-[0.6em]">High-Fidelity Career Architecture • Proprietary Methodology v2.0</p>
        </motion.div>
      </div>
    </section>
  );
}
