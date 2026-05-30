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

  const handleClusterClick = (cluster: CareerCluster) => {
    if (selectedCluster?.id === cluster.id) {
        setSelectedCluster(null);
    } else {
        setSelectedCluster(cluster);
    }
  };

  const [radius, setRadius] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 160 : 320);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="ecosystem" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Target className="h-4 w-4" />
            Interactive Universe
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">Explore the Ecosystem.</h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed text-lg">
            A high-fidelity map of the modern industrial landscape.
            Select a domain to deconstruct its DNA and trajectory.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[800px]">
          {/* Wheel Visualization */}
          <div className="relative w-[400px] h-[400px] md:w-[750px] md:h-[750px] flex items-center justify-center shrink-0">

            {/* Ambient background ring */}
            <div className="absolute inset-0 border border-white/[0.03] rounded-full" />

            {/* Core */}
            <div className="absolute z-30 w-32 h-32 md:w-48 md:h-48 rounded-full bg-zinc-950 border border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-2xl backdrop-blur-3xl group">
                <Sparkles className="w-6 h-6 text-violet-500 mb-3 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-tight">
                    Career Ready<br/>Practices
                </span>
            </div>

            {/* Rings */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 border border-white/[0.05] rounded-full"
                        style={{ margin: `${i * 12.5}%` }}
                    />
                ))}
            </div>

            {/* Clusters */}
            <div className="absolute inset-0 z-40">
                {CAREER_CLUSTERS.map((cluster, index) => {
                    const angle = (index / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isSelected = selectedCluster?.id === cluster.id;

                    return (
                        <motion.div
                            key={cluster.id}
                            initial={false}
                            animate={{ x, y }}
                            className="absolute left-1/2 top-1/2 -ml-7 -mt-7 md:-ml-10 md:-mt-10"
                        >
                            <motion.button
                                onClick={() => handleClusterClick(cluster)}
                                whileHover={{ scale: 1.1, zIndex: 50 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl border flex items-center justify-center transition-all duration-500 relative group/btn ${
                                    isSelected
                                    ? "bg-white border-white shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                                    : "bg-zinc-900 border-white/10 hover:border-white/30 backdrop-blur-xl shadow-xl"
                                }`}
                            >
                                <cluster.icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 ${
                                    isSelected ? "text-black" : "text-white group-hover/btn:text-white"
                                }`} />

                                {/* Label for desktop on hover/select */}
                                <div className={`absolute bottom-full mb-4 whitespace-nowrap hidden md:block transition-all duration-300 pointer-events-none ${
                                    isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover/btn:opacity-100 group-hover/btn:translate-y-0"
                                }`}>
                                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-2xl">
                                        {cluster.title}
                                    </span>
                                </div>
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                {selectedCluster && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (Math.cos((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 7.5))}%`}
                        y2={`${50 + (Math.sin((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 7.5))}%`}
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                )}
            </svg>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:max-w-xl h-full flex flex-col justify-center" ref={scrollRef}>
            <AnimatePresence mode="wait">
              {selectedCluster ? (
                <motion.div
                  key={selectedCluster.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl relative overflow-hidden shadow-2xl"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedCluster.bgGradient} opacity-10 blur-[100px] pointer-events-none`} />

                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedCluster.bgGradient} flex items-center justify-center border border-white/10 shadow-lg`}>
                          <selectedCluster.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                          {selectedCluster.ring}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCluster(null)}
                        className="rounded-full hover:bg-white/10 h-8 w-8 border border-white/5"
                    >
                        <X className="w-4 h-4 text-white" />
                    </Button>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    {selectedCluster.title}
                  </h3>

                  <p className="text-zinc-400 font-medium leading-relaxed text-base mb-8 border-l-2 border-white/20 pl-6 py-1">
                    {selectedCluster.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                        <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Cpu className="w-3 h-3" />
                            Core Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedCluster.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} className="bg-white/5 hover:bg-white/10 text-white border-white/10 py-1 px-2.5 rounded-lg font-bold text-[10px]">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Layers className="w-3 h-3" />
                            Sub-Domains
                        </h4>
                        <div className="space-y-2">
                            {selectedCluster.subClusters.slice(0, 3).map(sub => (
                                <div key={sub} className="text-[12px] text-zinc-400 font-bold flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                    {sub}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Navigation className="w-3 h-3" />
                        Pathways
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                        {selectedCluster.pathways.slice(0, 2).map(path => (
                            <div key={path} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/path hover:bg-white/5 transition-all cursor-pointer">
                                <span className="text-xs text-white font-bold uppercase tracking-tight">{path}</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover/path:text-white transition-all" />
                            </div>
                        ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-2xl font-bold text-base transition-all group/btn uppercase tracking-widest">
                    Explore Domain
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <div className="h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
                  <div className="w-20 h-20 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-8 shadow-xl">
                      <Target className="w-10 h-10 text-zinc-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight">System Ready</h3>
                  <p className="text-zinc-500 font-medium max-w-xs leading-relaxed text-base">
                    Select a dominion from the universe wheel to initiate cluster analysis.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
