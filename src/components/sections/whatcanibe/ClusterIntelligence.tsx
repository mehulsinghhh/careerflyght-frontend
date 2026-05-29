"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { CAREER_CLUSTERS } from "@/constants/career-clusters";
import { ArrowRight, Sparkles, Plus, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ClusterIntelligence() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="clusters" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Visual background noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Market Intelligence</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white leading-tight">
            Cluster <span className="text-brand-primary">Intelligence.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl leading-relaxed text-lg tracking-tight">
            High-density data across 14 industrial domains.
            Deep-dive into the skills and pathways defining the new economy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CAREER_CLUSTERS.map((cluster) => (
            <motion.div key={cluster.id} variants={itemVariants}>
              <GlowCard
                glowColor={cluster.glowColor}
                className="h-full flex flex-col cursor-pointer border border-white/5 bg-zinc-950/50 hover:border-brand-primary/20 backdrop-blur-xl transition-all duration-500 group rounded-[2.5rem] p-10"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cluster.bgGradient} border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                    <cluster.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest pt-2">
                    {cluster.ring}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-primary transition-colors">{cluster.title}</h3>

                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 min-h-[3rem]">
                  {cluster.description}
                </p>

                <div className="space-y-8 mt-auto">
                   <div className="space-y-3">
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" />
                        Core Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cluster.skills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="outline" className="bg-white/5 border-white/5 text-white text-[10px] font-bold py-1 px-3 rounded-lg">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-3">
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" />
                        Key Trajectories
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {cluster.pathways.slice(0, 2).map(path => (
                          <div key={path} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <Plus className="w-3 h-3 text-brand-primary" />
                            <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-tight">{path}</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Primary Outcome</span>
                        <span className="text-xs text-white font-bold uppercase">{cluster.outcomes[0]}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                   </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
