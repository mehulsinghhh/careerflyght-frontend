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
  ChevronRight
} from "lucide-react";
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
  return (
    <section id="workflow" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-32">
          <div className="max-w-3xl">
            <div className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">The Framework</div>
            <h2 className="text-4xl md:text-8xl font-bold mb-6 tracking-tighter text-white leading-[0.85]">
              Architecting Your <br />
              <span className="italic text-zinc-500">Professional Ascent.</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
              We decompose the journey from ambition to achievement into precise, actionable protocols. Total clarity, zero friction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {METHODOLOGY_PHASES.slice(0, 4).map((phase, idx) => {
            const Icon = iconMap[phase.id as keyof typeof iconMap] || Activity;
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-zinc-950 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-3xl h-full flex flex-col"
              >
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-12">Phase 0{idx + 1}</div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{phase.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 flex-1">
                  {phase.description}
                </p>
                <div className="pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{phase.id === 'assessment' ? 'Genetic Analysis' : phase.id === 'gap-analysis' ? 'Trajectory Mapping' : phase.id === 'solution-design' ? 'Node Connectivity' : 'Apex Deployment'}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Zone */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-12 md:p-20 bg-zinc-950 border border-white/5 rounded-[3rem] text-center overflow-hidden relative"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-8 leading-tight">
                Initiate Your <br /> <span className="italic text-zinc-500">Terminal Assessment.</span>
              </h3>

              <div className="flex flex-col items-center gap-8">
                  <Link href="/whatcanibe/signup">
                    <Button size="lg" className="flex items-center gap-4 px-10 h-16 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-lg border-none">
                        Initiate Roadmap
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
