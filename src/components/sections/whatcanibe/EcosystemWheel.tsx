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
  Navigation,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EcosystemWheel() {
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster | null>(null);
  const [radius, setRadius] = useState(380);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 160 : 380);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClusterClick = (cluster: CareerCluster) => {
    setSelectedCluster(selectedCluster?.id === cluster.id ? null : cluster);
  };

  if (!mounted) {
    return <section id="ecosystem" className="py-32 px-6 bg-surface-neutral min-h-[1200px]" />;
  }

  return (
    <section id="ecosystem" className="py-40 px-6 relative overflow-hidden bg-surface-neutral">
      {/* Editorial Watermark */}
      <div className="absolute top-20 right-0 opacity-[0.05] pointer-events-none hidden xl:block">
        <span className="text-[240px] font-black uppercase leading-none tracking-tighter">ENGINE</span>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center mb-32 text-center">
            <div
             className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-strong bg-white text-zinc-950 font-black text-[11px] uppercase tracking-[0.4em] mb-12 shadow-premium"
          >
            Neural Mapping Engine v1.4
            </div>
          <h2 className="text-6xl md:text-9xl font-bold tracking-[-0.04em] text-zinc-950 leading-[0.8] uppercase max-w-4xl">
            Explore the <br />
            <span className="italic font-normal text-primary">Ecosystem.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl leading-relaxed text-xl md:text-2xl mt-12">
            A high-fidelity deconstruction of the modern industrial landscape. Select a dominion to analyze its neural trajectory.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between gap-16 min-h-[1000px]">

          {/* Wheel Visualization - Scaled up */}
          <div className="relative w-[380px] h-[380px] md:w-[900px] md:h-[900px] flex items-center justify-center shrink-0">

            {/* Structured Background Rings */}
            <div className="absolute inset-0 border-[1px] border-zinc-950/5 rounded-full" />
            <div className="absolute inset-[15%] border-[1px] border-zinc-950/10 rounded-full" />
            <div className="absolute inset-[30%] border-[1px] border-zinc-950/5 rounded-full border-dashed" />

            {/* Core Centerpiece - Solid & Architectural */}
            <div
              className="absolute z-30 w-48 h-48 md:w-80 md:h-80 rounded-full bg-zinc-950 text-white flex flex-col items-center justify-center text-center p-12 shadow-hero group"
            >
                <div className="absolute inset-4 rounded-full border border-dashed border-white/20" />
                <Sparkles className="w-10 h-10 text-primary mb-6 relative z-10" />
                <span className="text-[12px] font-black uppercase tracking-[0.4em] leading-tight relative z-10">
                    Core<br/>Synthesis<br/>Unit
                </span>
            </div>

            {/* Orbiting Clusters */}
            <div className="absolute inset-0 z-40">
                {CAREER_CLUSTERS.map((cluster, index) => {
                    const angle = (index / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isSelected = selectedCluster?.id === cluster.id;

                    return (
                        <div
                            key={cluster.id}
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                              transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                            }}
                        >
                            <motion.button
                                onClick={() => handleClusterClick(cluster)}
                                whileHover={{ scale: 1.1 }}
                                className={`w-20 h-20 md:w-32 md:h-32 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500 relative group/btn shadow-premium ${
                                    isSelected
                                    ? "bg-primary border-primary text-white scale-110"
                                    : "bg-white border-zinc-200 hover:border-zinc-950 text-zinc-400"
                                }`}
                            >
                                <cluster.icon
                                  className={`w-8 h-8 md:w-12 md:h-12 relative z-10 transition-all duration-500 ${isSelected ? "text-white" : cluster.color}`}
                                />

                                {isSelected && (
                                  <motion.div
                                    layoutId="cluster-glow"
                                    className="absolute inset-[-10px] rounded-full border-2 border-primary/20 animate-ping"
                                  />
                                )}

                                {/* Floating Architectural Label */}
                                <div className={`absolute bottom-full mb-8 whitespace-nowrap hidden md:block transition-all duration-500 pointer-events-none ${
                                    isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 group-hover/btn:opacity-100 group-hover/btn:translate-y-0"
                                }`}>
                                    <span className="bg-zinc-950 text-white text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-[0.3em] shadow-hero">
                                        {cluster.title}
                                    </span>
                                </div>
                            </motion.button>
                        </div>
                    );
                })}
            </div>

            {/* Structural Mapping Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                {selectedCluster && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (Math.cos((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 9))}%`}
                        y2={`${50 + (Math.sin((CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) / CAREER_CLUSTERS.length) * 2 * Math.PI - Math.PI / 2) * (radius / 9))}%`}
                        stroke="var(--primary)"
                        strokeWidth="2"
                    />
                )}
            </svg>
          </div>

          {/* Details Panel - Editorial Composition */}
          <div className="w-full xl:max-w-xl h-full flex flex-col justify-center">
            <AnimatePresence mode="popLayout">
              {selectedCluster ? (
                <motion.div
                  key={selectedCluster.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="bg-white border-2 border-zinc-950 rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-hero"
                >
                  <div className="flex items-start justify-between mb-16 relative z-10">
                    <div className="flex items-center gap-8">
                        <div
                          className={`w-24 h-24 rounded-3xl flex items-center justify-center border-2 border-zinc-950 bg-zinc-50 shadow-premium ${selectedCluster.color}`}
                        >
                          <selectedCluster.icon className="w-12 h-12" />
                        </div>
                        <div className="flex flex-col gap-2">
                           <div className="px-4 py-1 rounded-full bg-primary/10 text-[9px] font-black text-primary uppercase tracking-[0.2em] w-fit">
                            System Node: {selectedCluster.ring}
                           </div>
                           <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Protocol.0{CAREER_CLUSTERS.findIndex(c => c.id === selectedCluster.id) + 1}</div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCluster(null)}
                        className="rounded-full hover:bg-zinc-100 h-12 w-12 border border-zinc-200 transition-colors"
                    >
                        <X className="w-6 h-6 text-zinc-950" />
                    </Button>
                  </div>

                  <h3 className="text-5xl md:text-7xl font-bold text-zinc-950 tracking-[-0.04em] mb-10 relative z-10 leading-[0.9] uppercase">
                    {selectedCluster.title}
                  </h3>

                  <p className="text-zinc-600 font-medium leading-relaxed text-xl mb-16 border-l-8 border-primary/10 pl-10 py-2 relative z-10">
                    {selectedCluster.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
                    <div className="space-y-8">
                        <h4 className="text-zinc-950 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-primary" />
                            Neural Skills
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {selectedCluster.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} className="bg-zinc-50 text-zinc-950 border-zinc-200 py-2 px-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-colors shadow-sm">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h4 className="text-zinc-950 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <Layers className="w-4 h-4 text-purple-600" />
                            Deconstructed Domains
                        </h4>
                        <div className="space-y-4">
                            {selectedCluster.subClusters.slice(0, 3).map(sub => (
                                <div key={sub} className="text-[14px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-4 group/sub cursor-default">
                                    <div className="w-2 h-2 rounded-full bg-primary/20 group-hover/sub:bg-primary transition-colors" />
                                    {sub}
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  <Button className="w-full bg-zinc-950 text-white hover:bg-primary h-24 rounded-[2.5rem] font-black text-xl transition-all duration-500 group/btn uppercase tracking-[0.3em] shadow-hero relative z-10">
                    <span className="relative z-10 flex items-center gap-4">
                      Initiate Analysis
                      <ArrowRight className="w-7 h-7 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-[800px] flex flex-col items-center justify-center text-center p-20 border-strong border-dashed rounded-[5rem] bg-white shadow-premium relative overflow-hidden"
                >
                  <div className="w-32 h-32 rounded-full bg-zinc-50 border border-strong flex items-center justify-center mb-12 relative z-10 shadow-premium">
                      <Info className="w-12 h-12 text-zinc-300" />
                  </div>
                  <h3 className="text-4xl font-bold text-zinc-950 mb-6 uppercase tracking-[0.3em] relative z-10">Engine Ready</h3>
                  <p className="text-zinc-500 font-medium max-w-sm leading-relaxed text-xl relative z-10">
                    Select a dominion from the universe wheel to initiate high-fidelity neural deconstruction.
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
