"use client";

import { Search, Map, Users, Target, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GlowCard } from "@/components/ui/glow-card";

const steps = [
  {
    title: "Intelligence Discovery",
    description: "Analyze your cognitive profile and interests through our proprietary assessment framework.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    status: "done"
  },
  {
    title: "Trajectory Mapping",
    description: "Project your growth across timeline milestones from current status to destination.",
    icon: Map,
    color: "from-violet-500 to-purple-500",
    status: "active"
  },
  {
    title: "Expert Calibration",
    description: "Refine your roadmap with direct insights from those who have already achieved mastery.",
    icon: Users,
    color: "from-purple-500 to-fuchsia-500",
    status: "pending"
  },
  {
    title: "Strategic Execution",
    description: "Access a curated pipeline of opportunities, projects, and certifications.",
    icon: Target,
    color: "from-fuchsia-500 to-pink-500",
    status: "pending"
  },
];

export default function Pathways() {
  const router = useRouter();

  return (
    <section id="pathways" className="py-32 px-6 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Strategic Framework</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-zinc-950 leading-tight">
                Architecting <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Professional Ascent.</span>
              </h2>
              <p className="text-zinc-600 text-lg mb-12 leading-relaxed font-medium max-w-xl">
                We decompose the journey from ambition to achievement into precise, actionable milestones. Remove the fog of uncertainty.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <GlowCard
                    glowColor="rgba(79, 70, 229, 0.05)"
                    className={`flex gap-8 p-8 rounded-[2rem] border transition-all duration-500 group ${
                      step.status === 'active'
                        ? 'border-indigo-100 bg-indigo-50/30'
                        : 'border-zinc-100 bg-white shadow-sm'
                    }`}
                  >
                    <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-500`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-zinc-950 tracking-tight">{step.title}</h3>
                        {step.status === 'done' && (
                          <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </div>
                        )}
                        {step.status === 'active' && (
                          <div className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-600 text-[8px] font-black uppercase tracking-widest border border-indigo-200">In Progress</div>
                        )}
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed font-medium group-hover:text-zinc-900 transition-colors duration-500">{step.description}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-12"
            >
              <Button
                onClick={() => router.push('/whatcanibe/signup')}
                size="lg"
                className="bg-zinc-950 text-white hover:bg-zinc-900 rounded-2xl px-10 h-16 text-lg font-bold group shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-500"
              >
                Initiate Roadmap
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 aspect-square rounded-[3rem] border border-zinc-200 bg-white p-12 flex items-center justify-center overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
            >
               {/* Visual Roadmap Path */}
               <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <svg className="w-full h-full p-20" viewBox="0 0 400 400" fill="none">
                    <path
                      d="M50 350 C 50 200, 350 200, 350 50"
                      stroke="url(#pathGradient)"
                      strokeWidth="1.5"
                      strokeDasharray="8 8"
                    />
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="oklch(0.6 0.2 264)" />
                        <stop offset="100%" stopColor="oklch(0.6 0.2 320)" />
                      </linearGradient>
                    </defs>
                  </svg>
               </div>
               
               <div className="grid grid-cols-2 gap-8 relative z-20">
                  {[
                    { year: "Phase 01", title: "Core Synthesis", color: "text-blue-600", bg: "bg-blue-50", progress: 100, delay: 0.1, y: 0 },
                    { year: "Phase 02", title: "Domain Mastery", color: "text-indigo-600", bg: "bg-indigo-50", progress: 65, delay: 0.2, y: 0 },
                    { year: "Phase 03", title: "Market Entry", color: "text-fuchsia-600", bg: "bg-fuchsia-50", progress: 30, delay: 0.3, y: 0 },
                    { year: "Terminal", title: "Apex Placement", color: "text-emerald-600", bg: "bg-emerald-50", progress: 0, delay: 0.4, y: 0 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: item.delay }}
                      whileHover={{ y: -4 }}
                      className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-48 group hover:border-zinc-200 transition-all duration-500"
                    >
                      <p className={`text-[9px] font-black mb-3 uppercase tracking-[0.25em] ${item.color}`}>{item.year}</p>
                      <p className="font-bold text-zinc-950 text-base mb-6 tracking-tight leading-tight">{item.title}</p>
                      <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: item.delay + 0.3, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r from-transparent to-current ${item.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-[120%] h-[120%] bg-indigo-100/20 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
