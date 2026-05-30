"use client";

import { motion } from "framer-motion";
import { CAREER_CLUSTERS } from "@/constants/career-clusters";
import { GlowCard } from "@/components/ui/glow-card";
import { Sparkles, ArrowRight } from "lucide-react";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.05),transparent_70%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="h-3 w-3" />
            Cluster Intelligence
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">Industry Dominions.</h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed text-lg">
            Deep-dive into the 14 core sectors architecting the future of the global economy.
            Identify the skills and pathways that define each domain.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CAREER_CLUSTERS.map((cluster) => (
            <motion.div key={cluster.id} variants={itemVariants}>
              <GlowCard
                glowColor={cluster.glowColor}
                className="h-full border-white/5 bg-zinc-950/50 hover:border-white/20 backdrop-blur-xl transition-all duration-500 group rounded-[2.5rem] p-8 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cluster.bgGradient} border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <cluster.icon className="w-7 h-7 text-white" />
                </div>

                <div className="mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${cluster.color} opacity-80`}>
                    {cluster.ring}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3 tracking-tight group-hover:text-white transition-colors">
                    {cluster.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                    {cluster.description}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cluster.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-500">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between group/link cursor-pointer">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:mr-2 transition-all">Explore Pathways</span>
                    <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
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
