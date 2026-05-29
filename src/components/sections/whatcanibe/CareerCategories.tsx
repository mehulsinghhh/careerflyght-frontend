"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { CAREER_CLUSTERS } from "@/constants/career-clusters";
import { Sparkles, ArrowRight } from "lucide-react";

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 bg-white dark:bg-zinc-950 relative overflow-hidden" id="clusters">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            Discovery Engine
          </div>
          <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Explore Your <span className="text-brand-primary italic">Domain.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed text-lg">
            Dive into the 14 specialized Career Clusters. Each world offers unique pathways,
            skills, and future-proof opportunities for the next generation of leaders.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {CAREER_CLUSTERS.map((cluster) => (
            <motion.div
              key={cluster.id}
              variants={itemVariants}
              id={`cluster-${cluster.id}`}
            >
              <GlowCard
                glowColor={cluster.glow}
                className="h-full cursor-pointer border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 hover:border-brand-primary/30 backdrop-blur-xl transition-all duration-500 group rounded-[2.5rem] p-8 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cluster.color} border border-zinc-100 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                  <cluster.icon className="w-7 h-7 text-zinc-900 dark:text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight group-hover:text-brand-primary transition-colors">
                    {cluster.title}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6">
                    {cluster.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                   <div className="flex flex-wrap gap-2">
                      {cluster.subClusters.slice(0, 2).map(sub => (
                        <span key={sub.title} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 rounded-md">
                          {sub.title}
                        </span>
                      ))}
                      {cluster.subClusters.length > 2 && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 rounded-md">
                          +{cluster.subClusters.length - 2} More
                        </span>
                      )}
                   </div>

                   <div className="pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Open Cluster</span>
                    <ArrowRight className="w-4 h-4 text-brand-primary transition-transform group-hover:translate-x-1" />
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
