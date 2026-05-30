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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#020617]">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-32"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-12 backdrop-blur-md shadow-2xl"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Cluster Intelligence
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tighter text-white leading-[0.85]">
            Industry <br />
            <span className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Dominions.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-3xl leading-relaxed text-lg md:text-2xl mt-10">
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
             const clusterColor = cluster.color.startsWith('#') ? cluster.color : '#6366f1';
             return (
              <motion.div
                key={cluster.id}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group h-full"
              >
                <div
                  className="h-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-white/20 transition-all duration-400 rounded-[3rem] p-12 flex flex-col relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                >
                  {/* Dynamic Gradient Mesh Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cluster.bgGradient} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-400`} />

                  {/* Accent Glow */}
                  <div
                    className="absolute -top-32 -right-32 w-64 h-64 opacity-0 group-hover:opacity-40 blur-[80px] transition-all duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${clusterColor}, transparent 70%)` }}
                  />

                  <div
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-12 group-hover:scale-110 transition-all duration-300 shadow-2xl relative z-10 border border-white/10`}
                    style={{
                      background: `linear-gradient(135deg, ${clusterColor}40, transparent)`,
                    }}
                  >
                    <cluster.icon className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                  </div>

                  <div className="mb-8 relative z-10">
                    <span
                      className={`text-[11px] font-black uppercase tracking-[0.25em] opacity-60 group-hover:opacity-100 transition-opacity`}
                      style={{ color: clusterColor }}
                    >
                      {cluster.ring}
                    </span>
                    <h3 className="text-3xl font-bold text-white mt-3 mb-5 tracking-tight group-hover:text-glow transition-all">
                      {cluster.title}
                    </h3>
                    <p className="text-base text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-400 transition-colors">
                      {cluster.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-10 relative z-10">
                    <div className="flex flex-wrap gap-2.5 mb-12">
                      {cluster.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between group/link cursor-pointer pt-10 border-t border-white/5">
                      <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em] group-hover:text-indigo-400 transition-all">Explore Pathways</span>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all">
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
