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
  { label: 'Neural Mapping', color: 'from-indigo-500 to-blue-500', glow: 'rgba(99, 102, 241, 0.3)' },
  { label: 'Trajectory Analysis', color: 'from-purple-500 to-indigo-500', glow: 'rgba(168, 85, 247, 0.3)' },
  { label: 'Strategic Alignment', color: 'from-pink-500 to-purple-500', glow: 'rgba(236, 72, 153, 0.3)' },
  { label: 'Active Deployment', color: 'from-emerald-500 to-teal-500', glow: 'rgba(16, 185, 129, 0.3)' },
  { label: 'Feedback Intelligence', color: 'from-amber-500 to-orange-500', glow: 'rgba(245, 158, 11, 0.3)' }
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Logical flow in 2-column grid: 1 (L), 2 (R), 3 (L), 4 (R), 5 (L), CTA (R)
  const gridClasses = [
    "md:col-start-1 md:row-start-1", // P1
    "md:col-start-2 md:row-start-1", // P2
    "md:col-start-1 md:row-start-2", // P3
    "md:col-start-2 md:row-start-2", // P4
    "md:col-start-1 md:row-start-3", // P5
  ];

  return (
    <section id="workflow" ref={containerRef} className="py-12 md:py-20 px-6 relative overflow-hidden bg-white">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full opacity-[0.05]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 blur-[120px] rounded-full opacity-[0.05]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section - Compact */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-indigo-500/10 bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-6 backdrop-blur-md"
          >
            The Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-zinc-900 leading-[0.9] md:leading-[0.85]"
          >
            Architecting Your <br />
            <span className="italic bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Professional Ascent.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 font-medium text-sm md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            A high-fidelity framework designed to decompose the journey from ambition to mastery into precise, actionable protocols.
          </motion.p>
        </div>

        {/* Roadmap Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connector Path (Desktop) - Continuous Zig-Zag */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" preserveAspectRatio="none" className="opacity-10">
              <path
                d="M 200 100 H 600 V 200 H 200 V 400 H 600 V 500"
                stroke="currentColor"
                className="text-indigo-600"
                strokeWidth="1.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-8 relative z-10">
            {METHODOLOGY_PHASES.map((phase, idx) => {
              const Icon = iconMap[phase.id as keyof typeof iconMap] || Activity;
              const meta = phaseMetas[idx];

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${gridClasses[idx]} group`}
                >
                  <div className={`h-full p-6 md:p-8 ${phase.tint} border border-zinc-100 ${phase.border} group-hover:border-indigo-500/20 transition-all duration-500 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5`}>
                    <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br ${phase.color} opacity-[0.08] group-hover:opacity-[0.15] blur-[60px] transition-opacity duration-500`} />

                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex flex-col gap-1">
                          <div className={`text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                            {meta.label}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            Protocol 0{idx + 1}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">{phase.title}</h3>

                      <div className="space-y-4">
                        <p className="text-sm md:text-base text-zinc-600 font-medium leading-relaxed">
                          {phase.description}
                        </p>

                        <div className="p-4 bg-white/40 rounded-2xl border border-zinc-200/50 group-hover:border-indigo-500/10 transition-all">
                          <p className="text-[11px] md:text-xs text-zinc-500 leading-relaxed italic font-medium">
                            {phase.details}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-zinc-200/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phase.color} shadow-[0_0_8px_rgba(79,70,229,0.3)]`} />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Protocol Sync: Active</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400 group-hover:text-indigo-600 transition-colors duration-300">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Execute</span>
                        <ChevronRight className="w-4 h-4" />
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
                <Button className="w-full h-full min-h-[180px] rounded-3xl bg-indigo-600 text-white hover:bg-indigo-700 border-none shadow-xl shadow-indigo-600/20 group/btn transition-all flex flex-col items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                    <Zap className="w-7 h-7 fill-white" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-200 block mb-1">Final Authorization</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold tracking-tighter">Launch Roadmap</span>
                      <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
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
            className="mt-12 text-center"
        >
            <p className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.5em]">High-Fidelity Career Architecture • Proprietary Methodology</p>
        </motion.div>
      </div>
    </section>
  );
}
