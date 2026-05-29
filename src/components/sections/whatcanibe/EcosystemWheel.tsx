"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAREER_CLUSTERS, type CareerCluster } from "@/constants/career-clusters";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Target,
  X,
  Layers,
  Cpu,
  Navigation,
  Sparkles
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
      setRadius(window.innerWidth < 768 ? 180 : 320);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="ecosystem" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Core Visualization</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white leading-tight">
            The <span className="text-brand-primary">Ecosystem.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-3xl mx-auto leading-relaxed text-lg tracking-tight">
            A high-fidelity map of the modern industrial landscape.
            Select a domain to deconstruct its DNA and trajectory.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[700px]">
          {/* Wheel Visualization */}
          <div className="relative w-[380px] h-[380px] md:w-[700px] md:h-[700px] flex items-center justify-center shrink-0">

            {/* Core */}
            <div className="absolute z-30 w-32 h-32 md:w-48 md:h-48 rounded-full bg-zinc-950 border border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-2xl backdrop-blur-3xl">
                <Sparkles className="w-6 h-6 text-brand-primary mb-3" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-tight">
                    Career Ready<br/>Practices
                </span>
                <div className="mt-3 h-0.5 w-8 bg-brand-primary rounded-full" />
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
                            className="absolute left-1/2 top-1/2 -ml-8 -mt-8"
                        >
                            <motion.button
                                onClick={() => handleClusterClick(cluster)}
                                whileHover={{ scale: 1.1, zIndex: 50 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center transition-all duration-500 relative group/btn ${
                                    isSelected
                                    ? "bg-white border-white shadow-2xl"
                                    : "bg-zinc-950 border-white/10 hover:border-brand-primary/50 backdrop-blur-xl"
                                }`}
                            >
                                <cluster.icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${
                                    isSelected ? "text-black" : "text-white group-hover/btn:text-brand-primary"
                                }`} />

                                {isSelected && (
                                    <motion.div
                                        layoutId="glow"
                                        className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-2xl -z-10"
                                    />
                                )}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:max-w-xl flex flex-col justify-center" ref={scrollRef}>
            <AnimatePresence mode="wait">
              {selectedCluster ? (
                <motion.div
                  key={selectedCluster.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedCluster.bgGradient} flex items-center justify-center border border-white/10`}>
                            <selectedCluster.icon className="w-5 h-5 text-white" />
                         </div>
                         <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                            {selectedCluster.ring}
                         </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCluster(null)}
                        className="rounded-xl hover:bg-white/10 h-8 w-8 border border-white/5"
                    >
                        <X className="w-4 h-4 text-white" />
                    </Button>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    {selectedCluster.title}
                  </h3>

                  <p className="text-zinc-500 font-medium leading-relaxed text-base mb-8">
                    {selectedCluster.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                        <h4 className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5" />
                            Core Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedCluster.skills.slice(0, 4).map(skill => (
                                <Badge key={skill} className="bg-white/5 text-white border-white/5 py-1 px-2 rounded-lg font-bold text-[10px]">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" />
                            Sub-clusters
                        </h4>
                        <div className="space-y-1">
                            {selectedCluster.subClusters.slice(0, 3).map(sub => (
                                <div key={sub} className="text-[11px] text-zinc-400 font-bold flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-brand-primary" />
                                    {sub}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  <div className="mb-8 pt-6 border-t border-white/5">
                    <h4 className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Navigation className="w-3.5 h-3.5" />
                        Pathways
                    </h4>
                    <div className="space-y-2">
                        {selectedCluster.pathways.slice(0, 2).map(path => (
                            <div key={path} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/path hover:bg-white/[0.05] transition-all">
                                <span className="text-xs text-white font-bold uppercase tracking-tight">{path}</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover/path:text-brand-primary group-hover/path:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-2xl font-bold text-base transition-all group/btn uppercase tracking-tight">
                    Explore Cluster
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-center p-10 border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.01]">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-6">
                      <Target className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Interactive Map</h3>
                  <p className="text-zinc-500 font-medium max-w-xs leading-relaxed text-sm">
                    Select a cluster from the wheel to explore its internal structure and career trajectories.
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
