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
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const}}
            >
              <div className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-4">Strategic Framework</div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-foreground leading-[0.95]">
                Architecting <br />
                <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-400 bg-clip-text text-transparent">Professional Ascent.</span>
              </h2>
              <p className="text-muted-foreground text-xl mb-12 leading-relaxed font-medium max-w-xl">
                We decompose the journey from ambition to achievement into precise, actionable milestones. Remove the fog of uncertainty and secure your professional future.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] as const}}
                >
                  <GlowCard
                    glowColor="rgba(168, 85, 247, 0.1)"
                    className={`flex gap-8 p-8 rounded-[2rem] border transition-all duration-500 group ${
                      step.status === 'active'
                        ? 'border-primary/30 bg-card/50 shadow-xl shadow-primary/5'
                        : 'border-border bg-card/20 hover:border-border/60'
                    }`}
                  >
                    <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                        {step.status === 'done' && (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </div>
                        )}
                        {step.status === 'active' && (
                          <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">In Progress</div>
                        )}
                      </div>
                      <p className="text-muted-foreground text-base leading-relaxed font-medium">{step.description}</p>
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
                className="bg-foreground text-background hover:opacity-90 rounded-2xl px-12 h-16 text-xl font-bold group shadow-xl transition-all"
              >
                Initiate Roadmap
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1]as const }}
              className="relative z-10 aspect-square rounded-[3rem] border border-border bg-card/50 backdrop-blur-xl p-12 flex items-center justify-center overflow-hidden shadow-2xl"
            >
               {/* Visual Roadmap Path */}
               <div className="absolute inset-0 flex items-center justify-center opacity-40">
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
               
               <div className="grid grid-cols-2 gap-8 relative z-20">
                  {[
                    { year: "Phase 01", title: "Core Synthesis", color: "text-blue-500", bg: "bg-blue-500/20", progress: 100, delay: 0.2, y: 30 },
                    { year: "Phase 02", title: "Domain Mastery", color: "text-primary", bg: "bg-primary/20", progress: 65, delay: 0.4, y: -30 },
                    { year: "Phase 03", title: "Market Entry", color: "text-fuchsia-500", bg: "bg-fuchsia-500/20", progress: 30, delay: 0.6, y: 30 },
                    { year: "Terminal", title: "Apex Placement", color: "text-emerald-500", bg: "bg-emerald-500/20", progress: 0, delay: 0.8, y: -30 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: item.y + 50 }}
                      whileInView={{ opacity: 1, y: item.y }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: item.delay, ease: [0.22, 1, 0.36, 1]as const }}
                      className="bg-card backdrop-blur-2xl p-8 rounded-3xl border border-border shadow-xl w-48 group hover:border-primary/30 transition-all"
                    >
                      <p className={`text-[10px] font-black mb-3 uppercase tracking-[0.25em] ${item.color}`}>{item.year}</p>
                      <p className="font-bold text-foreground text-base mb-6 tracking-tight leading-tight">{item.title}</p>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: item.delay + 0.5, ease: "easeOut" }}
                          className={`h-full bg-current ${item.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
