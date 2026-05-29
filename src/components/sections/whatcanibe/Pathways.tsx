"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Map as MapIcon,
  Target,
  Sparkles,
  GitBranch,
  Search,
  Code,
  LineChart,
  Palette,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Award,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PATHWAY_DATA = [
  {
    id: "software",
    title: "DIGITAL TECH",
    subtitle: "SYSTEMS ARCHITECTURE",
    icon: Code,
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.4)",
    nodes: [
      { id: "1", label: "Full-Stack Engineer", type: "ENTRY", x: 10, y: 50, skills: ["React", "Node.js", "SQL"] },
      { id: "2", label: "Systems Architect", type: "GROWTH", x: 40, y: 30, skills: ["K8s", "Distributed Systems"] },
      { id: "3", label: "Security Lead", type: "GROWTH", x: 40, y: 70, skills: ["Pentesting", "Cryptography"] },
      { id: "4", label: "Principal Engineer", type: "ADVANCED", x: 75, y: 50, skills: ["Strategic Design", "Leadership"] },
      { id: "5", label: "VP of Engineering", type: "MASTERY", x: 92, y: 50, skills: ["Operations", "Strategy"] },
    ],
    connections: [
      { from: "1", to: "2" },
      { from: "1", to: "3" },
      { from: "2", to: "4" },
      { from: "3", to: "4" },
      { from: "4", to: "5" },
    ]
  },
  {
    id: "data",
    title: "DATA SCIENCE",
    subtitle: "NEURAL NETWORKS",
    icon: LineChart,
    color: "text-purple-500",
    glow: "rgba(168, 85, 247, 0.4)",
    nodes: [
      { id: "1", label: "Data Scientist", type: "ENTRY", x: 10, y: 50, skills: ["Python", "Statistics"] },
      { id: "2", label: "ML Engineer", type: "GROWTH", x: 40, y: 30, skills: ["PyTorch", "M LOps"] },
      { id: "3", label: "AI Researcher", type: "GROWTH", x: 40, y: 70, skills: ["Deep Learning", "NLP"] },
      { id: "4", label: "Chief Scientist", type: "ADVANCED", x: 75, y: 50, skills: ["Innovation", "Vision"] },
      { id: "5", label: "Chief AI Officer", type: "MASTERY", x: 92, y: 50, skills: ["Ethics", "Strategy"] },
    ],
    connections: [
      { from: "1", to: "2" },
      { from: "1", to: "3" },
      { from: "2", to: "4" },
      { from: "3", to: "4" },
      { from: "4", to: "5" },
    ]
  },
  {
    id: "design",
    title: "CREATIVE TECH",
    subtitle: "EXPERIENCE DESIGN",
    icon: Palette,
    color: "text-pink-500",
    glow: "rgba(236, 72, 153, 0.4)",
    nodes: [
      { id: "1", label: "Product Designer", type: "ENTRY", x: 10, y: 50, skills: ["Figma", "UX Principles"] },
      { id: "2", label: "Interaction Lead", type: "GROWTH", x: 40, y: 30, skills: ["Framer", "Animation"] },
      { id: "3", label: "Design Systems", type: "GROWTH", x: 40, y: 70, skills: ["Systemic Design", "Code"] },
      { id: "4", label: "Design Director", type: "ADVANCED", x: 75, y: 50, skills: ["Mentorship", "Process"] },
      { id: "5", label: "VP of Design", type: "MASTERY", x: 92, y: 50, skills: ["Culture", "Executive leadership"] },
    ],
    connections: [
      { from: "1", to: "2" },
      { from: "1", to: "3" },
      { from: "2", to: "4" },
      { from: "3", to: "4" },
      { from: "4", to: "5" },
    ]
  }
];

export default function Pathways() {
  const [activeTab, setActiveTab] = useState(PATHWAY_DATA[0].id);
  const currentPathway = PATHWAY_DATA.find(p => p.id === activeTab) || PATHWAY_DATA[0];

  return (
    <section id="pathways" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_80%_0%,rgba(var(--brand-primary),0.1),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl">
              <TrendingUp className="h-4 w-4 text-brand-accent" />
              Career Trajectories
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.85] uppercase">
              Visualize Your <span className="text-gradient-primary">Progression.</span>
            </h2>
            <p className="text-zinc-400 font-bold text-xl md:text-2xl leading-tight max-w-2xl">
              Dynamic skill-trees for the modern builder. Map your evolution from entry-level execution to executive mastery.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 p-2 bg-zinc-900 border-2 border-white/10 rounded-3xl backdrop-blur-2xl">
            {PATHWAY_DATA.map(pathway => (
              <button
                key={pathway.id}
                onClick={() => setActiveTab(pathway.id)}
                className={`h-16 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-4 ${
                  activeTab === pathway.id
                    ? "bg-white text-black shadow-2xl"
                    : "bg-transparent text-zinc-500 hover:text-white"
                }`}
              >
                <pathway.icon className={`w-5 h-5 ${activeTab === pathway.id ? "text-black" : pathway.color}`} />
                {pathway.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Tree Canvas */}
        <div className="relative bg-zinc-900/60 border-2 border-white/5 rounded-[4rem] p-10 md:p-20 h-[600px] md:h-[800px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] group backdrop-blur-xl">
           {/* Visual Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />

           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
               transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
               className="relative h-full w-full"
             >
                {/* SVG Connectors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={currentPathway.glow.replace('0.4', '0.1')} />
                            <stop offset="50%" stopColor={currentPathway.glow} />
                            <stop offset="100%" stopColor={currentPathway.glow.replace('0.4', '0.1')} />
                        </linearGradient>
                    </defs>
                    {currentPathway.connections.map((conn, idx) => {
                        const from = currentPathway.nodes.find(n => n.id === conn.from)!;
                        const to = currentPathway.nodes.find(n => n.id === conn.to)!;
                        return (
                            <motion.path
                                key={`${conn.from}-${conn.to}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.4 }}
                                transition={{ duration: 1.5, delay: 0.5 + idx * 0.1, ease: "easeInOut" }}
                                d={`M ${from.x}% ${from.y}% C ${from.x + 15}% ${from.y}%, ${to.x - 15}% ${to.y}%, ${to.x}% ${to.y}%`}
                                fill="none"
                                stroke="url(#connGrad)"
                                strokeWidth="3"
                                strokeDasharray="12 12"
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {currentPathway.nodes.map((node, idx) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                        className="absolute group/node cursor-pointer z-30"
                        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="relative flex flex-col items-center">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className={`w-16 h-16 md:w-24 md:h-24 rounded-[2rem] border-2 flex items-center justify-center transition-all duration-500 relative ${
                                    node.type === 'ENTRY' ? 'bg-zinc-800 border-white/20' :
                                    node.type === 'GROWTH' ? 'bg-zinc-800 border-brand-primary/50' :
                                    node.type === 'ADVANCED' ? 'bg-brand-primary border-white/20 shadow-[0_0_50px_rgba(var(--brand-primary),0.3)]' :
                                    'bg-white border-white text-black shadow-[0_0_80px_rgba(255,255,255,0.4)]'
                                }`}
                            >
                                {node.type === 'MASTERY' ? (
                                    <Award className="w-8 h-8 md:w-12 md:h-12" />
                                ) : (
                                    <Cpu className={`w-7 h-7 md:w-10 md:h-10 ${node.type === 'ADVANCED' ? 'text-white' : 'text-zinc-500 group-hover/node:text-brand-primary'}`} />
                                )}

                                {node.type === 'MASTERY' && (
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute -inset-8 bg-white/20 blur-3xl rounded-full -z-10"
                                    />
                                )}
                            </motion.div>

                            {/* Label */}
                            <div className="absolute top-full mt-6 text-center w-48">
                                <div className="text-white text-[12px] md:text-[14px] font-black uppercase tracking-tighter mb-1 group-hover/node:text-brand-primary transition-colors leading-none">
                                    {node.label}
                                </div>
                                <div className={`text-[10px] font-black uppercase tracking-widest ${
                                    node.type === 'MASTERY' ? 'text-brand-accent' : 'text-zinc-600'
                                }`}>
                                    {node.type} PHASE
                                </div>
                            </div>

                            {/* Dense Skill Overlay */}
                            <div className="absolute bottom-full mb-8 opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover/node:scale-100">
                                <div className="bg-zinc-950 border-2 border-white/10 rounded-2xl p-4 w-40 shadow-2xl backdrop-blur-3xl">
                                    <div className="text-[9px] font-black text-brand-secondary uppercase tracking-widest mb-3">Required Intelligence</div>
                                    <div className="flex flex-wrap gap-2">
                                        {node.skills.map(s => (
                                            <span key={s} className="text-[10px] font-bold text-white bg-white/5 px-2 py-1 rounded-md border border-white/5">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-3 h-3 bg-zinc-950 border-r-2 border-b-2 border-white/10 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                            </div>
                        </div>
                    </motion.div>
                ))}
             </motion.div>
           </AnimatePresence>

           {/* Perspective Callout */}
           <div className="absolute bottom-12 left-12 right-12 md:left-auto md:w-96 p-8 bg-black/40 backdrop-blur-3xl border-2 border-white/10 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/20">
                        <Sparkles className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Ecosystem Metric</div>
                        <div className="text-lg font-black text-white uppercase tracking-tighter">High Growth Potential</div>
                    </div>
                </div>
                <p className="text-sm text-zinc-300 font-bold leading-tight mb-8">
                    94% of top-tier talent in {currentPathway.title} achieve {currentPathway.nodes[4].label} status within 10 cycles.
                </p>
                <Button className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-2xl font-black uppercase tracking-tight text-xs">
                    Deploy Growth Engine
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
           </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
            {[
                { title: "Recursive Nodes", desc: "Interactive paths that adapt to your personal skill acquisition and market demand.", icon: Layers },
                { title: "Neural Skill Mapping", desc: "Identify critical technical and cognitive leaps required for terminal roles.", icon: Cpu },
                { title: "Market Volatility Sync", desc: "Real-time updates based on global economic shifts and emerging industry needs.", icon: GitBranch }
            ].map((f, i) => (
                <div key={i} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border-2 border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-primary transition-colors">
                        <f.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase mb-2">{f.title}</h3>
                        <p className="text-base text-zinc-500 font-bold leading-tight">{f.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
