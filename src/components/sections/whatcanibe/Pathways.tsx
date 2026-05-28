"use client";

import { Search, Map, Users, Target, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GlowCard } from "@/components/ui/glow-card";

const steps = [
  {
    title: "Genetic Analysis",
    description: "Deep-dive assessment into your core aptitudes, cognitive strengths, and creative drives.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    status: "done"
  },
  {
    title: "Trajectory Mapping",
    description: "Live simulation of your potential career paths over the next 5 years, with algorithmic precision.",
    icon: Map,
    color: "from-violet-500 to-purple-500",
    status: "active"
  },
  {
    title: "Node Connectivity",
    description: "Instant bridging with high-level mentors and peers already operating at your target destination.",
    icon: Users,
    color: "from-purple-500 to-fuchsia-500",
    status: "pending"
  },
  {
    title: "Apex Deployment",
    description: "Launching into curated opportunities and strategic roles that maximize your market value.",
    icon: Target,
    color: "from-fuchsia-500 to-pink-500",
    status: "pending"
  },
];

export default function Pathways() {
  const router = useRouter();

  return (
    <section className="py-32 px-4 md:px-6 bg-white dark:bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const}}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Zap className="h-3 w-3" />
                The Framework
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter dark:text-white text-zinc-900 leading-none">
                Architecting Your <br />
                <span className="text-gradient-purple">Professional Ascent.</span>
              </h2>
              <p className="dark:text-zinc-400 text-zinc-500 text-lg md:text-xl mb-12 leading-relaxed font-bold max-w-xl">
                We decompose the journey from ambition to viral achievement into precise, actionable protocols. Total clarity, zero friction.
              </p>
            </motion.div>
            
            <div className="space-y-5">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const}}
                >
                  <GlowCard
                    glowColor="rgba(168, 85, 247, 0.15)"
                    className={`flex gap-6 p-6 md:p-8 rounded-[2.5rem] border glass transition-all duration-500 group cursor-default ${
                      step.status === 'active'
                        ? 'border-brand-primary/30 bg-brand-primary/[0.03] dark:bg-brand-primary/5 shadow-2xl'
                        : 'border-zinc-100 dark:border-white/5 hover:border-brand-primary/20'
                    }`}
                  >
                    <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black dark:text-white text-zinc-900 tracking-tight">{step.title}</h3>
                        {step.status === 'done' && (
                          <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </div>
                        )}
                        {step.status === 'active' && (
                          <div className="px-3 py-1 rounded-lg bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest animate-pulse">Running</div>
                        )}
                      </div>
                      <p className="dark:text-zinc-500 text-zinc-400 text-sm md:text-base leading-relaxed font-bold">{step.description}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12"
            >
              <Button
                onClick={() => router.push('/whatcanibe/signup')}
                size="lg"
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white dark:hover:text-white rounded-2xl px-10 h-16 text-lg font-black group shadow-2xl transition-all active:scale-95"
              >
                Initiate Roadmap
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative z-10 aspect-square rounded-[4rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] p-16 flex items-center justify-center overflow-hidden shadow-inner"
            >
               {/* Visual Roadmap Path */}
               <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <svg className="w-full h-full p-24" viewBox="0 0 400 400" fill="none">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      d="M50 350 C 50 200, 350 200, 350 50"
                      stroke="url(#pathGradient)"
                      strokeWidth="3"
                      strokeDasharray="16 10"
                    />
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-brand-primary)" />
                        <stop offset="100%" stopColor="var(--color-brand-secondary)" />
                      </linearGradient>
                    </defs>
                  </svg>
               </div>
               
               <div className="grid grid-cols-2 gap-10 relative z-20">
                  {[
                    { phase: "01", title: "Synthesis", color: "text-blue-500", progress: 100, delay: 0.2, y: 30 },
                    { phase: "02", title: "Mastery", color: "text-brand-primary", progress: 65, delay: 0.4, y: -30 },
                    { phase: "03", title: "Entry", color: "text-brand-vibrant", progress: 30, delay: 0.6, y: 30 },
                    { phase: "04", title: "Apex", color: "text-emerald-500", progress: 0, delay: 0.8, y: -30 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: item.y + 40 }}
                      whileInView={{ opacity: 1, y: item.y }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: item.delay, ease: [0.16, 1, 0.3, 1] as const }}
                      className="glass p-8 rounded-[2.5rem] border border-zinc-100 dark:border-white/10 shadow-2xl w-48 group hover:border-brand-primary/30 transition-all cursor-default"
                    >
                      <p className={`text-[11px] font-black mb-2 uppercase tracking-[0.2em] ${item.color}`}>Phase {item.phase}</p>
                      <p className="font-black dark:text-white text-zinc-900 text-base mb-5 tracking-tight leading-tight">{item.title}</p>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: item.delay + 0.5, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r from-transparent to-current ${item.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
