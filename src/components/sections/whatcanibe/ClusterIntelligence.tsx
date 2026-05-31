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
        staggerChildren: 0.01,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] bg-indigo-100/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-32"
        >
          <div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950 text-[10px] font-bold uppercase tracking-[0.3em] mb-12 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            Cluster Intelligence
          </div>
          <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tighter text-zinc-950 leading-[0.85]">
            Industry <br />
            <span className="italic bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Dominions.</span>
          </h2>
          <p className="text-zinc-600 font-medium max-w-3xl leading-relaxed text-lg md:text-2xl mt-10">
            Deep-dive into the 14 core sectors architecting the future of the global economy. Identify the skills and pathways that define each domain.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CAREER_CLUSTERS.map((cluster) => {
             return (
              <motion.div
                key={cluster.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <div
                  className="h-full border border-zinc-200 bg-white hover:border-zinc-300 transition-all duration-500 rounded-[3rem] p-12 flex flex-col relative overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]"
                >
                  {/* Subtle Gradient Mesh Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cluster.bgGradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                  <div
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-12 transition-all duration-500 relative z-10 border border-zinc-100 bg-zinc-50 group-hover:bg-zinc-950 group-hover:text-white shadow-sm ${cluster.color}`}
                  >
                    <cluster.icon className="w-10 h-10" />
                  </div>

                  <div className="mb-8 relative z-10">
                    <span
                      className={`text-[11px] font-black uppercase tracking-[0.25em] opacity-80 group-hover:opacity-100 transition-opacity ${cluster.color}`}
                    >
                      {cluster.ring}
                    </span>
                    <h3 className="text-3xl font-bold text-zinc-950 mt-3 mb-5 tracking-tight transition-all duration-500 group-hover:text-zinc-900">
                      {cluster.title}
                    </h3>
                    <p className="text-base text-zinc-600 font-medium leading-relaxed group-hover:text-zinc-900 transition-colors duration-500">
                      {cluster.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-10 relative z-10">
                    <div className="flex flex-wrap gap-2.5 mb-12">
                      {cluster.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-4 py-1.5 rounded-xl bg-white border border-zinc-100 text-[11px] font-bold text-zinc-500 group-hover:text-zinc-950 group-hover:border-zinc-300 transition-all duration-500 shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between group/link cursor-pointer pt-10 border-t border-zinc-100">
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em] group-hover:text-zinc-950 transition-all duration-500">Explore Pathways</span>
                      <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover/link:bg-zinc-950 group-hover/link:text-white transition-all duration-500">
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-0.5" />
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
