"use client";

import { Search, Map, Users, Target, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GlowCard } from "@/components/ui/glow-card";

const steps = [
  {
    title: "Discovery",
    description: "Analyze your cognitive profile and interests through our proprietary assessment framework.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    status: "done"
  },
  {
    title: "Mapping",
    description: "Project your growth across timeline milestones from current status to destination.",
    icon: Map,
    color: "from-violet-500 to-purple-500",
    status: "active"
  },
  {
    title: "Calibration",
    description: "Refine your roadmap with direct insights from those who have already achieved mastery.",
    icon: Users,
    color: "from-purple-500 to-fuchsia-500",
    status: "pending"
  },
  {
    title: "Execution",
    description: "Access a curated pipeline of opportunities, projects, and certifications.",
    icon: Target,
    color: "from-fuchsia-500 to-pink-500",
    status: "pending"
  },
];

export default function Pathways() {
  const router = useRouter();

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Visual separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const}}
            >
              <div className="text-brand-primary font-bold text-[11px] uppercase tracking-[0.3em] mb-4">Strategic Framework</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white leading-tight">
                Architecting <br />
                <span className="bg-gradient-to-r from-brand-primary to-violet-400 bg-clip-text text-transparent">Professional Ascent.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed font-normal max-w-xl">
                We decompose the journey from ambition to achievement into precise, actionable milestones. Remove the fog of uncertainty.
              </p>
            </motion.div>
            
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] as const}}
                >
                  <GlowCard
                    glowColor="rgba(168, 85, 247, 0.1)"
                    className={`flex gap-6 p-6 rounded-2xl border glass-card glass-card-hover transition-all duration-500 group ${
                      step.status === 'active'
                        ? 'border-brand-primary/40 bg-brand-primary/5 shadow-2xl shadow-brand-primary/5'
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                        {step.status === 'done' && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                        )}
                        {step.status === 'active' && (
                          <div className="px-2 py-0.5 rounded-md bg-brand-primary/20 text-brand-primary text-[9px] font-bold uppercase tracking-wider">Active</div>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed font-normal">{step.description}</p>
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
                className="bg-white text-black hover:bg-zinc-100 rounded-xl px-8 h-14 text-base font-semibold group shadow-xl transition-all"
              >
                Initiate Roadmap
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1]as const }}
              className="relative z-10 aspect-square rounded-[3rem] border border-white/10 bg-card/40 backdrop-blur-3xl p-12 flex items-center justify-center overflow-hidden shadow-2xl"
            >
               {/* Visual Roadmap Path */}
               <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg className="w-full h-full p-20" viewBox="0 0 400 400" fill="none">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      d="M50 350 C 50 200, 350 200, 350 50"
                      stroke="url(#pathGradient)"
                      strokeWidth="2"
                      strokeDasharray="12 8"
                    />
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                  </svg>
               </div>
               
               <div className="grid grid-cols-2 gap-6 relative z-20">
                  {[
                    { phase: "01", title: "Synthesis", color: "text-blue-400", bg: "bg-blue-500/10", progress: 100, delay: 0.2, y: 20 },
                    { phase: "02", title: "Mastery", color: "text-brand-primary", bg: "bg-brand-primary/10", progress: 65, delay: 0.4, y: -20 },
                    { phase: "03", title: "Entry", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", progress: 30, delay: 0.6, y: 20 },
                    { phase: "04", title: "Apex", color: "text-emerald-400", bg: "bg-emerald-500/10", progress: 0, delay: 0.8, y: -20 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: item.y + 30 }}
                      whileInView={{ opacity: 1, y: item.y }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: item.delay, ease: [0.22, 1, 0.36, 1]as const }}
                      className="bg-card/60 backdrop-blur-2xl p-6 rounded-2xl border border-white/5 shadow-xl w-40 group hover:border-white/10 transition-colors"
                    >
                      <p className={`text-[10px] font-bold mb-2 uppercase tracking-widest ${item.color}`}>Phase {item.phase}</p>
                      <p className="font-bold text-white text-sm mb-4 tracking-tight leading-tight">{item.title}</p>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
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
