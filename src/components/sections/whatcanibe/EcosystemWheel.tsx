"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { CAREER_CLUSTERS, ECOSYSTEM_CATEGORIES } from "@/constants/career-clusters";
import { Sparkles, ArrowRight, Target } from "lucide-react";
import Link from "next/link";

export default function EcosystemWheel() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  const categories = ECOSYSTEM_CATEGORIES;

  // Calculate positions for category segments
  const getCategorySegment = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const nextAngle = (360 / total) * (index + 1);
    return { angle, nextAngle };
  };

  return (
    <section className="py-32 px-6 bg-zinc-50 dark:bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-extrabold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Interactive Discovery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
          >
            The Career <span className="italic font-serif text-brand-primary">Ecosystem.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-2xl mx-auto text-lg"
          >
            Explore the interconnected world of professional domains.
            Discover how your passions bridge multiple industries.
          </motion.p>
        </div>

        <div className="relative aspect-square max-w-3xl mx-auto flex items-center justify-center">
          {/* Wheel Background Decor */}
          <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-white/5 opacity-50" />
          <div className="absolute inset-[10%] rounded-full border border-zinc-200 dark:border-white/5 opacity-50" />
          <div className="absolute inset-[25%] rounded-full border border-zinc-200 dark:border-white/5 opacity-50" />

          {/* Center: Career Ready Practices */}
          <motion.div
            className="relative z-20 w-32 h-32 md:w-44 md:h-44 rounded-full bg-white dark:bg-zinc-900 shadow-2xl border-4 border-brand-primary flex flex-col items-center justify-center text-center p-4 group cursor-help"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-8 h-8 text-brand-primary mb-2 transition-transform group-hover:rotate-12" />
            <span className="text-[10px] font-black uppercase tracking-tighter leading-tight text-zinc-900 dark:text-white">
              Career Ready <br /> Practices
            </span>
          </motion.div>

          {/* Second Ring: Categories */}
          {categories.map((cat, i) => {
            const { angle } = getCategorySegment(i, categories.length);
            const radius = 180; // Responsive radius
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

            return (
              <motion.div
                key={cat}
                className={`absolute z-10 cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                  activeCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20 scale-110'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:border-brand-primary/50'
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                onHoverStart={() => setActiveCategory(cat)}
                onHoverEnd={() => setActiveCategory(null)}
              >
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">{cat}</span>
              </motion.div>
            );
          })}

          {/* Outer Ring: Clusters (Filtered by category) */}
          <AnimatePresence>
            {activeCategory && (
              <>
                {CAREER_CLUSTERS.filter(c => c.category === activeCategory).map((cluster, i, arr) => {
                  const angle = (360 / categories.length) * categories.indexOf(activeCategory) + (i - (arr.length-1)/2) * 15;
                  const radius = 320;
                  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                  return (
                    <motion.div
                      key={cluster.id}
                      initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x, y }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <Link href={`#cluster-${cluster.id}`}>
                        <motion.div
                          className="group relative flex flex-col items-center gap-3"
                          onHoverStart={() => setHoveredCluster(cluster.id)}
                          onHoverEnd={() => setHoveredCluster(null)}
                        >
                           <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cluster.color} border border-white/10 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                              <cluster.icon className="w-6 h-6 text-white" />
                           </div>
                           <div className="absolute top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[10px] font-bold text-zinc-900 dark:text-white">{cluster.title}</span>
                           </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
             <AnimatePresence>
                {activeCategory && (
                  <motion.circle
                    initial={{ r: 0, opacity: 0 }}
                    animate={{ r: 180, opacity: 0.1 }}
                    exit={{ r: 0, opacity: 0 }}
                    cx="50%" cy="50%" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-brand-primary"
                  />
                )}
             </AnimatePresence>
          </svg>
        </div>
      </div>
    </section>
  );
}
