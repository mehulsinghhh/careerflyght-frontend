"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { CAREER_CLUSTERS } from "@/constants/career-clusters";
import { ArrowRight, Sparkles, Plus, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CareerCategories() {
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
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="clusters" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Visual background noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[11px] font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles className="h-4 w-4 text-brand-primary" />
            The Knowledge Graph
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white leading-none uppercase">
            Cluster <span className="text-gradient-secondary">Intelligence.</span>
          </h2>
          <p className="text-zinc-500 font-bold max-w-2xl leading-tight text-xl md:text-2xl tracking-tight">
            High-density data across 14 industrial domains.
            Deep-dive into the skills and pathways defining the new economy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {CAREER_CLUSTERS.map((cluster) => (
            <motion.div key={cluster.id} variants={itemVariants}>
              <GlowCard
                glowColor={cluster.glowColor}
                className="h-full flex flex-col cursor-pointer border-2 border-white/5 bg-zinc-900/60 hover:bg-zinc-900 hover:border-white/20 backdrop-blur-3xl transition-all duration-500 group rounded-[2.5rem] p-10 relative overflow-hidden"
              >
                {/* Background ID text for density feeling */}
                <div className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter">
                    {cluster.id.split('-')[0]}
                </div>

                <div className="flex items-start justify-between mb-10 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cluster.bgGradient} border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500`}>
                    <cluster.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] pt-2">
                    {cluster.ring}
                  </div>
                </div>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-brand-primary transition-colors uppercase leading-none">{cluster.title}</h3>
                
                <p className="text-base text-zinc-400 font-bold leading-tight mb-10 min-h-[4rem]">
                  {cluster.description}
                </p>

                <div className="space-y-10 mt-auto relative z-10">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5" />
                            Core Skills
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cluster.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="bg-white/5 border-white/10 text-white text-[11px] font-bold py-1 px-3 rounded-lg">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" />
                        Key Trajectories
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {cluster.pathways.slice(0, 3).map(path => (
                          <div key={path} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group/path">
                            <Plus className="w-3 h-3 text-brand-primary" />
                            <span className="text-[12px] text-zinc-300 font-black uppercase tracking-tight">{path}</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/10 flex items-center justify-between group-hover:border-white/20 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Primary Outcome</span>
                        <span className="text-sm text-white font-black uppercase">{cluster.outcomes[0]}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary transition-all">
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-all" />
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
