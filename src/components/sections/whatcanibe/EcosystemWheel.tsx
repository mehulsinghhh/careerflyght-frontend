"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAREER_CLUSTERS, type CareerCluster } from "@/constants/career-clusters";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Target,
  X,
  Layers,
  Cpu,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EcosystemWheel() {
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 160 : 350);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClusterClick = (cluster: CareerCluster) => {
    if (selectedCluster?.id === cluster.id) {
        setSelectedCluster(null);
    } else {
        setSelectedCluster(cluster);
    }
  };

  return (
    <section id="ecosystem" className="py-32 px-6 relative overflow-hidden bg-[#020617]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-32"
        >
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-8 backdrop-blur-md"
          >
            Interactive Universe
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-white leading-[0.85]">
            Explore the <br />
            <span className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">Ecosystem.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl leading-relaxed text-lg md:text-2xl mt-8">
            A high-fidelity map of the modern industrial landscape. Select a domain to deconstruct its DNA and trajectory.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 min-h-[900px]">
          {/* Wheel Visualization */}
          <div className="relative w-[400px] h-[400px] md:w-[850px] md:h-[850px] flex items-center justify-center shrink-0">

            {/* Ambient background rings with rotation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/[0.03] rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 border border-white/[0.02] rounded-full border-dashed"
            />

            {/* Core Centerpiece */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute z-30 w-40 h-40 md:w-64 md:h-64 rounded-full bg-slate-950 border border-white/10 flex flex-col items-center justify-center text-center p-8 shadow-[0_0_80px_rgba(99,102,241,0.15)] backdrop-blur-3xl group"
            >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-dashed border-indigo-500/20"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-indigo-500/5 blur-2xl"
                />
                <Sparkles className="w-8 h-8 text-indigo-400 mb-4 relative z-10 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
                <span className="text-[11px] font-bold text-white uppercase tracking-[0.3em] leading-tight relative z-10 group-hover:text-glow transition-all">
                    Career Ready<br/>Practices
                </span>
            </motion.div>

            {/* Orbiting Clusters */}
            <div className="absolute inset-0 z-40">
                {CAREER_CLUSTERS.map((cluster, index) => {
                    const angle = (index / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isSelected = selectedCluster?.id === cluster.id;
                    const clusterColor = cluster.color.startsWith('#') ? cluster.color : '#6366f1';

                    return (
                        <motion.div
                            key={cluster.id}
                            initial={false}
                            animate={{ x, y }}
                            className="absolute left-1/2 top-1/2 -ml-8 -mt-8 md:-ml-12 md:-mt-12"
                        >
                            <motion.button
                                onClick={() => handleClusterClick(cluster)}
                                whileHover={{ scale: 1.2, zIndex: 50 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-16 h-16 md:w-24 md:h-24 rounded-3xl border flex items-center justify-center transition-all duration-300 relative group/btn overflow-hidden ${
                                    isSelected
                                    ? "bg-white border-white text-black shadow-[0_0_80px_rgba(255,255,255,0.4)] scale-110"
                                    : "bg-white/[0.03] border-white/10 hover:border-white/40 text-white backdrop-blur-2xl"
                                }`}
                            >
                                {/* Active Glow Background */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"
                                    style={{ backgroundColor: clusterColor }}
                                />

                                <cluster.icon
                                  className="w-7 h-7 md:w-10 md:h-10 relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                                  style={{ color: isSelected ? 'black' : clusterColor }}
                                />

                                {/* Floating Label */}
                                <div className={`absolute bottom-full mb-6 whitespace-nowrap hidden md:block transition-all duration-300 pointer-events-none ${
                                    isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 group-hover/btn:opacity-100 group-hover/btn:translate-y-0"
                                }`}>
                                    <span className="bg-white text-black text-[10px] font-bold px-4 py-2 rounded-xl uppercase tracking-widest shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                                        {cluster.title}
                                    </span>
                                </div>
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                {selectedCluster && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (Math.cos((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 8.5))}%`}
                        y2={`${50 + (Math.sin((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 8.5))}%`}
                        stroke={selectedCluster.color.startsWith('#') ? selectedCluster.color : 'white'}
                        strokeWidth="3"
                        strokeDasharray="8 8"
                        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                )}
            </svg>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:max-w-xl h-full flex flex-col justify-center" ref={scrollRef}>
            <AnimatePresence mode="popLayout">
              {selectedCluster ? (
                <motion.div
                  key={selectedCluster.id}
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                  className="bg-white/[0.03] border border-white/10 rounded-[4rem] p-10 md:p-14 backdrop-blur-3xl relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.7)]"
                >
                  {/* Dynamic Corner Glow */}
                  <div
                    className={`absolute -top-40 -right-40 w-96 h-96 opacity-40 blur-[140px] pointer-events-none transition-all duration-1000`}
                    style={{ background: `radial-gradient(circle, ${selectedCluster.color.startsWith('#') ? selectedCluster.color : '#6366f1'}, transparent 70%)` }}
                  />

                  <div className="flex items-start justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-6">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transition-all`}
                          style={{ background: `linear-gradient(135deg, ${selectedCluster.color.startsWith('#') ? selectedCluster.color + '40' : 'rgba(255,255,255,0.1)'}, transparent)` }}
                        >
                          <selectedCluster.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                          {selectedCluster.ring}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCluster(null)}
                        className="rounded-full hover:bg-white/10 h-10 w-10 border border-white/10"
                    >
                        <X className="w-5 h-5 text-white" />
                    </Button>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 relative z-10">
                    {selectedCluster.title}
                  </h3>

                  <p className="text-zinc-400 font-medium leading-relaxed text-lg mb-10 border-l-4 border-indigo-500/30 pl-8 py-2 relative z-10">
                    {selectedCluster.description}
                  </p>

                  <div className="grid grid-cols-2 gap-10 mb-12 relative z-10">
                    <div className="space-y-6">
                        <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-indigo-400" />
                            Core Skills
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {selectedCluster.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} className="bg-white/5 hover:bg-white/10 text-white border-white/10 py-1.5 px-3.5 rounded-xl font-bold text-[11px] transition-colors">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                            <Layers className="w-4 h-4 text-purple-400" />
                            Sub-Domains
                        </h4>
                        <div className="space-y-3">
                            {selectedCluster.subClusters.slice(0, 3).map(sub => (
                                <div key={sub} className="text-[13px] text-zinc-400 font-bold flex items-center gap-3 group/sub cursor-default">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 group-hover/sub:bg-indigo-400 transition-colors" />
                                    {sub}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  <div className="mb-12 relative z-10">
                    <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                        <Navigation className="w-4 h-4 text-emerald-400" />
                        Pathways
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {selectedCluster.pathways.slice(0, 2).map(path => (
                            <div key={path} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 group/path hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer">
                                <span className="text-sm text-white font-bold uppercase tracking-widest">{path}</span>
                                <ArrowRight className="w-5 h-5 text-zinc-700 group-hover/path:text-white group-hover/path:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-zinc-100 h-20 rounded-3xl font-bold text-lg transition-all group/btn uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.15)] relative z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-3">
                      Explore Domain Analysis
                      <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-[600px] flex flex-col items-center justify-center text-center p-16 border border-white/5 rounded-[4rem] bg-white/[0.01] backdrop-blur-2xl shadow-3xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 relative z-10 shadow-2xl"
                  >
                      <Target className="w-12 h-12 text-zinc-700" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-[0.2em] relative z-10">System Ready</h3>
                  <p className="text-zinc-500 font-medium max-w-sm leading-relaxed text-lg md:text-xl relative z-10">
                    Select a dominion from the universe wheel to initiate high-fidelity cluster analysis.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
