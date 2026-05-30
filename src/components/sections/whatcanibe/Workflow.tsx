"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  { label: 'Neural Mapping', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.5)' },
  { label: 'Trajectory Analysis', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },
  { label: 'Network Synthesis', color: '#ec4899', glow: 'rgba(236, 72, 153, 0.5)' },
  { label: 'Active Deployment', color: '#10b981', glow: 'rgba(16, 185, 129, 0.5)' },
  { label: 'Feedback Intelligence', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' }
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0.1, 0.9], [0, 1]), {
    stiffness: 300,
    damping: 60,
    restDelta: 0.001
  });

  return (
    <section id="workflow" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-[#020617]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-8 backdrop-blur-md"
          >
            The Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-white leading-[0.85]"
          >
            Architecting Your <br />
            <span className="italic bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Professional Ascent.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-medium text-lg md:text-2xl leading-relaxed max-w-3xl mt-8 mx-auto"
          >
            A high-fidelity framework designed to decompose the journey from ambition to mastery into precise, actionable protocols.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto min-h-[1500px] py-20">
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <svg width="400" height="100%" viewBox="0 0 400 1500" fill="none" className="h-full w-full opacity-30">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <motion.path
                d="M200 0C200 0 200 150 200 300C200 450 100 450 100 600C100 750 300 750 300 900C300 1050 200 1050 200 1200C200 1350 200 1500 200 1500"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              <motion.path
                d="M200 0C200 0 200 150 200 300C200 450 100 450 100 600C100 750 300 750 300 900C300 1050 200 1050 200 1200C200 1350 200 1500 200 1500"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="10 20"
                className="opacity-50"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-60">
            {METHODOLOGY_PHASES.map((phase, idx) => {
              const Icon = iconMap[phase.id as keyof typeof iconMap] || Activity;
              const meta = phaseMetas[idx] || { label: 'Phase', color: '#fff', glow: 'rgba(255,255,255,0.2)' };
              const isEven = idx % 2 === 0;

              return (
                <div key={phase.id} className={`flex w-full items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -100 : 100, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full md:w-[48%] relative group"
                  >
                    <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hidden md:flex ${isEven ? '-right-[calc(8.5%)]' : '-left-[calc(8.5%)]'}`}>
                      <div className="w-4 h-4 rounded-full bg-white relative z-10 shadow-[0_0_20px_white]">
                        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-40" />
                      </div>
                    </div>

                    <div className="p-10 bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-white/20 transition-all duration-500 rounded-[3rem] relative overflow-hidden shadow-2xl">
                      <div
                        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-10 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110"
                        style={{ backgroundColor: meta.color }}
                      />

                      <div className="flex items-start justify-between mb-10">
                        <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Protocol 0{idx + 1}
                        </div>
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl"
                          style={{ boxShadow: `0 0 30px ${meta.glow}` }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{phase.title}</h3>
                      <p className="text-base text-zinc-500 font-medium leading-relaxed mb-10 group-hover:text-zinc-300 transition-colors">
                        {phase.description}
                      </p>

                      <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">{meta.label}</span>
                        <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0 transition-transform">
                          <span className="text-[10px] font-bold uppercase tracking-widest">Execute</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 p-16 md:p-32 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[5rem] text-center overflow-hidden relative shadow-[0_0_150px_rgba(0,0,0,0.6)] group"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-10 leading-tight">
                Initiate Your <br /> <span className="italic bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Terminal Assessment.</span>
              </h3>

              <div className="flex flex-col items-center gap-8">
                  <Link href="/whatcanibe/signup">
                    <Button size="lg" className="flex items-center gap-6 px-16 h-24 rounded-3xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-2xl border-none shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                        Begin Roadmap
                        <ArrowRight className="w-8 h-8" />
                    </Button>
                  </Link>
                  <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em]">Zero Friction Setup • Instant Access</p>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
