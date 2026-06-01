"use client";

import { motion } from "framer-motion";
import { Users, Target, Shield, Globe, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Guided",
    description: "Access a network of industry leaders who have walked the path before you.",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Our neural engine identifies the exact intersection of your talent and market demand.",
    bg: "bg-purple-50/50",
    border: "border-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Shield,
    title: "Future Proof",
    description: "Navigate market shifts with data-backed trajectories that ensure long-term relevance.",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with opportunities across borders, built for the decentralized workforce.",
    bg: "bg-orange-50/50",
    border: "border-orange-100",
    iconColor: "text-orange-600"
  }
];

export default function AboutUs() {
  return (
    <section id="about" className="py-32 md:py-48 px-6 relative overflow-hidden bg-white">
      {/* Editorial Watermark */}
      <div className="absolute top-20 left-0 opacity-[0.03] pointer-events-none hidden xl:block">
        <span className="text-[220px] font-black uppercase leading-none tracking-tighter">MANIFESTO</span>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          {/* Left Side: Editorial Content */}
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-strong bg-zinc-50 text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 shadow-sm"
            >
              Our Philosophy
            </div>

            <h2 className="text-6xl md:text-9xl font-bold mb-12 tracking-[-0.04em] text-zinc-950 leading-[0.8] uppercase">
              We Don&apos;t <br />
              <span className="italic font-normal text-primary">Just</span> Find <br />
              Jobs.
            </h2>

            <p className="text-2xl md:text-3xl font-medium text-zinc-950 leading-tight mb-16 tracking-tight uppercase max-w-xl">
              We engineer legacies through <span className="text-primary italic">High-Fidelity</span> data and human intuition.
            </p>

            <div className="grid grid-cols-2 gap-12 border-t-2 border-strong pt-12">
              <div>
                <div className="text-5xl font-bold text-zinc-950 mb-2 uppercase tracking-tighter">100%</div>
                <div className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Neural Integration</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-zinc-950 mb-2 uppercase tracking-tighter">∞</div>
                <div className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Growth Potential</div>
              </div>
            </div>
          </div>

          {/* Right Side: Architectural Feature Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -8 }}
                className="group relative p-10 md:p-14 rounded-[3rem] bg-zinc-50 border-2 border-strong hover:bg-white hover:border-zinc-950 transition-all duration-500 overflow-hidden shadow-premium hover:shadow-hero flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  <div className={`w-20 h-20 rounded-2xl bg-white border-2 ${feature.border} flex items-center justify-center mb-10 relative z-10 transition-all duration-500 group-hover:bg-zinc-950 group-hover:text-white shadow-premium ${feature.iconColor}`}>
                    <feature.icon className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-950 mb-6 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-base text-zinc-500 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-3 text-zinc-950">
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol.view</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
