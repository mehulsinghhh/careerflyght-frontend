"use client";

import { motion } from "framer-motion";
import { CAREER_CLUSTERS } from "@/constants/career-clusters";
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-white">
      {/* Editorial Watermark */}
      <div className="absolute top-40 right-[-50px] opacity-[0.03] pointer-events-none hidden xl:block rotate-90 origin-center">
        <span className="text-[200px] font-black uppercase tracking-[0.2em] leading-none">DOMINIONS</span>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:max-w-4xl"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border-strong bg-zinc-50 text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em] mb-12 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Intelligence Core v2.0
            </div>
            <h2 className="text-6xl md:text-9xl font-bold tracking-[-0.04em] text-zinc-950 leading-[0.8] uppercase">
              Industry <br />
              <span className="italic font-normal text-primary">Dominions.</span>
            </h2>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:max-w-md pb-4"
          >
            <p className="text-xl text-zinc-500 font-medium leading-relaxed border-l-8 border-primary/10 pl-10">
              Deep-dive into the 14 core sectors architecting the future of the global economy. Identify the skills and pathways that define each domain.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CAREER_CLUSTERS.map((cluster, idx) => {
             return (
              <motion.div
                key={cluster.id}
                variants={itemVariants}
                className="group h-full"
              >
                <div
                  className="h-full border-2 border-strong bg-zinc-50 hover:bg-white hover:border-zinc-950 transition-all duration-500 rounded-[3.5rem] p-12 flex flex-col relative overflow-hidden shadow-premium hover:shadow-hero"
                >
                  <div
                    className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-16 transition-all duration-500 relative z-10 border-2 border-strong bg-white group-hover:bg-zinc-950 group-hover:text-white shadow-premium ${cluster.color}`}
                  >
                    <cluster.icon className="w-12 h-12" />
                  </div>

                  <div className="mb-12 relative z-10">
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-100 ${cluster.color}`}
                    >
                      {cluster.ring}
                    </span>
                    <h3 className="text-4xl font-bold text-zinc-950 mt-4 mb-6 tracking-tighter uppercase leading-none">
                      {cluster.title}
                    </h3>
                    <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                      {cluster.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-12 relative z-10">
                    <div className="flex flex-wrap gap-2.5 mb-16">
                      {cluster.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-5 py-2 rounded-xl bg-white border border-strong text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-950 group-hover:border-zinc-300 transition-all duration-500 shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between group/link cursor-pointer pt-12 border-t-2 border-strong">
                      <span className="text-[11px] font-black text-zinc-950 uppercase tracking-[0.3em]">Explore Pathways</span>
                      <div className="w-12 h-12 rounded-full bg-white border border-strong flex items-center justify-center group-hover/link:bg-zinc-950 group-hover/link:text-white transition-all duration-500">
                        <ArrowRight className="w-6 h-6 transition-transform group-hover/link:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
             );
          })}
        </motion.div>
      </div>
    </section>
  );
}
