"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAREER_CLUSTERS, ECOSYSTEM_RINGS, type CareerCluster } from "@/constants/career-clusters";
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
      setRadius(window.innerWidth < 768 ? 200 : 320);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="ecosystem" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--brand-primary),0.05),transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-white/5 rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[11px] font-black uppercase tracking-[0.3em] mb-8">
            <Target className="h-4 w-4 text-brand-secondary" />
            Interactive Career Universe
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.9]">
            EXPLORE THE <span className="text-gradient-primary">ECOSYSTEM.</span>
          </h2>
          <p className="text-zinc-400 font-bold max-w-3xl mx-auto leading-tight text-xl md:text-2xl tracking-tight">
            A high-fidelity map of the modern industrial landscape.
            Select a domain to deconstruct its DNA and trajectory.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 min-h-[800px]">
          {/* Wheel Visualization */}
          <div className="relative w-[450px] h-[450px] md:w-[750px] md:h-[750px] flex items-center justify-center shrink-0">

            {/* Ambient Spinning background */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/[0.03] rounded-full"
            />

            {/* Core */}
            <div className="absolute z-30 w-40 h-40 md:w-56 md:h-56 rounded-full bg-black border-2 border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-[0_0_80px_rgba(var(--brand-primary),0.15)] backdrop-blur-3xl group">
                <div className="absolute inset-0 bg-mesh opacity-10 group-hover:opacity-20 transition-opacity rounded-full" />
                <Sparkles className="w-8 h-8 text-brand-primary mb-4 animate-pulse" />
                <span className="text-[12px] font-black text-white uppercase tracking-tighter leading-none">
                    Career Ready<br/>Practices
                </span>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
            </div>

            {/* Rings */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 border border-white/[0.05] rounded-full"
                        style={{ margin: `${i * 12}%` }}
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
                            className="absolute left-1/2 top-1/2 -ml-8 -mt-8"
                        >
                            <motion.button
                                onClick={() => handleClusterClick(cluster)}
                                whileHover={{ scale: 1.15, zIndex: 50 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] border-2 flex items-center justify-center transition-all duration-500 relative group/btn ${
                                    isSelected
                                    ? "bg-white border-white shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                                    : "bg-zinc-900/80 border-white/10 hover:border-white/30 backdrop-blur-xl"
                                }`}
                            >
                                <cluster.icon className={`w-7 h-7 md:w-9 md:h-9 transition-colors duration-500 ${
                                    isSelected ? "text-black" : "text-white group-hover/btn:text-brand-primary"
                                }`} />

                                {/* Orbiting Label for desktop */}
                                <div className={`absolute left-full ml-4 whitespace-nowrap hidden md:block transition-all duration-300 pointer-events-none ${
                                    isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                }`}>
                                    <span className="bg-white text-black text-[12px] font-black px-4 py-2 rounded-xl uppercase tracking-tighter shadow-2xl">
                                        {cluster.title}
                                    </span>
                                </div>

                                {isSelected && (
                                    <motion.div
                                        layoutId="glow"
                                        className="absolute -inset-4 bg-white/20 blur-xl rounded-full -z-10"
                                    />
                                )}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--brand-primary)" />
                        <stop offset="100%" stopColor="var(--brand-secondary)" />
                    </linearGradient>
                </defs>
                {selectedCluster && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (Math.cos((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 7.5))}%`}
                        y2={`${50 + (Math.sin((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 7.5))}%`}
                        stroke="url(#lineGrad)"
                        strokeWidth="4"
                        strokeDasharray="8 8"
                    />
                )}
            </svg>
          </div>

          {/* Details Panel - High Density */}
          <div className="w-full lg:max-w-xl h-full flex flex-col justify-center" ref={scrollRef}>
            <AnimatePresence mode="wait">
              {selectedCluster ? (
                <motion.div
                  key={selectedCluster.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  className="bg-zinc-900 border-2 border-white/10 rounded-[3rem] p-10 md:p-12 backdrop-blur-3xl relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                >
                  <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${selectedCluster.bgGradient} opacity-10 blur-[100px] pointer-events-none`} />

                  <div className="flex items-start justify-between mb-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                             <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedCluster.bgGradient} flex items-center justify-center border border-white/10 shadow-lg`}>
                                <selectedCluster.icon className="w-6 h-6 text-white" />
                             </div>
                             <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                {selectedCluster.ring}
                             </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCluster(null)}
                        className="rounded-full hover:bg-white/10 h-10 w-10 border border-white/5"
                    >
                        <X className="w-5 h-5 text-white" />
                    </Button>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tightest mb-6 leading-none">
                    {selectedCluster.title.toUpperCase()}
                  </h3>

                  <p className="text-zinc-300 font-bold leading-tight text-lg mb-10 border-l-4 border-brand-primary pl-6 py-2">
                    {selectedCluster.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 opacity-50">
                            <Cpu className="w-3.5 h-3.5" />
                            Core Intelligence
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedCluster.skills.map(skill => (
                                <Badge key={skill} className="bg-white/5 hover:bg-white/10 text-white border-white/10 py-1.5 px-3 rounded-lg font-bold text-[11px]">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 opacity-50">
                            <Layers className="w-3.5 h-3.5" />
                            Sub-Domains
                        </h4>
                        <div className="space-y-2">
                            {selectedCluster.subClusters.map(sub => (
                                <div key={sub} className="text-[13px] text-zinc-400 font-black flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                                    {sub.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-6 opacity-50 flex items-center gap-2">
                        <Navigation className="w-3.5 h-3.5" />
                        Target Trajectories
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {selectedCluster.pathways.map(path => (
                            <div key={path} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/5 group/path hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer">
                                <span className="text-sm text-white font-black uppercase tracking-tight">{path}</span>
                                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover/path:text-white group-hover/path:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-zinc-200 h-16 rounded-[1.5rem] font-black text-lg transition-all group/btn uppercase tracking-tight">
                    Deploy Profile Analysis
                    <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-white/5 rounded-[3.5rem] bg-white/[0.01]">
                  <div className="relative mb-10">
                    <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full animate-pulse" />
                    <div className="w-24 h-24 rounded-3xl bg-zinc-900 border-2 border-white/10 flex items-center justify-center relative">
                        <Target className="w-12 h-12 text-zinc-600" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">System Ready</h3>
                  <p className="text-zinc-500 font-bold max-w-sm leading-tight text-xl">
                    Choose a domain from the wheel to initiate high-density cluster analysis.
                  </p>

                  <div className="mt-16 grid grid-cols-3 gap-4 w-full opacity-20">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="h-24 rounded-2xl bg-white/5 border border-white/5" />
                    ))}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
