"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Map,
  BrainCircuit,
  Rocket,
  Users,
  Target,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";

const STEPS = [
  {
    title: "AI Discovery",
    label: "Phase 01",
    desc: "Our neural engine analyzes your personality, cognitive strengths, and passions to uncover hidden career potentials.",
    icon: BrainCircuit,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=600",
    color: "from-blue-600 to-cyan-400"
  },
  {
    title: "Strategic Mapping",
    label: "Phase 02",
    desc: "Generate detailed, multi-year roadmaps including specific degrees, certifications, and skills needed for your target roles.",
    icon: Map,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    color: "from-violet-600 to-purple-400"
  },
  {
    title: "Mentor Synthesis",
    label: "Phase 03",
    desc: "Get matched with industry-leading mentors for 1-on-1 sessions, portfolio reviews, and exclusive career insights.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
    color: "from-fuchsia-600 to-pink-400"
  },
  {
    title: "Career Launch",
    label: "Phase 04",
    desc: "Apply to high-growth internships and jobs with a verified profile backed by AI-driven career milestones.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    color: "from-green-600 to-emerald-400"
  }
];

export default function Pathways() {
  return (
    <section className="py-32 px-6 bg-[#020202] relative">
      {/* Background visual storytelling elements */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-violet-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] uppercase font-black tracking-widest mb-6"
           >
              <Zap className="w-3 h-3" />
              The Journey
           </motion.div>
           <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-8">
              Your Evolution <br /> <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent text-6xl md:text-8xl">Visualized.</span>
           </h2>
           <p className="text-xl text-gray-400 leading-relaxed">
              We've engineered the perfect pipeline from student to industry expert. Step into the future of career planning.
           </p>
        </div>

        {/* Immersive Stacked Pathway Visual */}
        <div className="space-y-32">
           {STEPS.map((step, idx) => (
             <div key={step.title} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                {/* Visual Media Side */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:w-1/2 relative group"
                >
                   <div className={`absolute -inset-4 bg-gradient-to-br ${step.color} opacity-20 blur-2xl rounded-[3rem] group-hover:opacity-40 transition-opacity`} />
                   <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Floating UI Elements inside Image */}
                      <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                        className="absolute bottom-8 left-8 bg-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-3"
                      >
                         <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                            <step.icon className="w-4 h-4 text-white" />
                         </div>
                         <p className="text-[10px] font-black text-white uppercase tracking-widest">{step.title} Active</p>
                      </motion.div>
                   </div>
                </motion.div>

                {/* Text Content Side */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2"
                >
                   <p className={`text-sm font-black uppercase tracking-[0.4em] mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>{step.label}</p>
                   <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">{step.title}</h3>
                   <p className="text-lg text-gray-400 leading-relaxed mb-8">
                      {step.desc}
                   </p>
                   <ul className="space-y-4 mb-10">
                      {[1, 2, 3].map(i => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                           <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                              <ChevronRight className="w-3 h-3 text-violet-500" />
                           </div>
                           Proprietary AI Optimization Level {i}
                        </li>
                      ))}
                   </ul>
                   <Button variant="outline" className="h-12 border-white/10 px-8 text-white font-bold rounded-xl gap-2 hover:bg-white/5">
                      Explore {step.title}
                      <ArrowRight className="w-4 h-4" />
                   </Button>
                </motion.div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
