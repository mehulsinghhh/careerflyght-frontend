
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
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
  { label: 'Genetic Analysis', color: '#6366f1' },
  { label: 'Trajectory Mapping', color: '#a855f7' },
  { label: 'Node Connectivity', color: '#ec4899' },
  { label: 'Apex Deployment', color: '#10b981' },
  { label: 'Metric Intelligence', color: '#f59e0b' }
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="workflow" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4"
          >
            The Framework
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-bold mb-6 tracking-tighter text-white leading-[0.85]"
          >
            Architecting Your <br />
            <span className="italic text-zinc-500">Professional Ascent.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mt-8"
          >
            We decompose the journey from ambition to achievement into precise, actionable protocols.
          </motion.p>
        </div>

        {/* Roadmap Visualization */}
        <div className="relative max-w-4xl mx-auto min-h-[1200px] py-20">
          {/* Connecting Line (SVG) */}
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <svg width="400" height="100%" viewBox="0 0 400 1200" fill="none" className="h-full w-full opacity-20">
              <motion.path
                d="M200 0C200 0 200 150 200 300C200 450 100 450 100 600C100 750 300 750 300 900C300 1050 200 1050 200 1200"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="10 10"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Phase Nodes */}
          <div className="relative z-10 flex flex-col gap-40">
            {METHODOLOGY_PHASES.map((phase, idx) => {
              const Icon = iconMap[phase.id as keyof typeof iconMap] || Activity;
              const meta = phaseMetas[idx] || { label: 'Phase', color: '#fff' };
              const isEven = idx % 2 === 0;

              return (
                <div key={phase.id} className={`flex w-full items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full md:w-[45%] relative"
                  >
                    {/* Node Pointer */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white hidden md:block ${isEven ? '-right-[calc(11%)]' : '-left-[calc(11%)]'}`}>
                      <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />
                    </div>

                    <div className="group p-8 bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500 rounded-3xl relative overflow-hidden shadow-2xl">
                      {/* Ambient Glow */}
                      <div
                        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-10 transition-opacity duration-500 group-hover:opacity-30"
                        style={{ backgroundColor: meta.color }}
                      />

                      <div className="flex items-start justify-between mb-8">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Phase 0{idx + 1}</div>
                        <div
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500"
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-glow transition-all">{phase.title}</h3>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8">
                        {phase.description}
                      </p>

                      <div className="pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{meta.label}</span>
                        <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Zone */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 md:p-24 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[4rem] text-center overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-tight">
                Initiate Your <br /> <span className="italic text-zinc-500">Terminal Assessment.</span>
              </h3>

              <div className="flex flex-col items-center gap-8">
                  <Link href="/whatcanibe/signup">
                    <Button size="lg" className="flex items-center gap-4 px-12 h-18 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-xl border-none shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                        Initiate Roadmap
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                  </Link>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
