"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import EcosystemWheel from "@/components/sections/whatcanibe/EcosystemWheel";
import ClusterIntelligence from "@/components/sections/whatcanibe/ClusterIntelligence";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Careers Hero (Production Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-left max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            Discover Your Potential
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white mb-10 tracking-tighter leading-[0.85]">
            Explore <br />
            <span className="italic text-zinc-500">Careers.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium mb-12">
            Discover the most in-demand roles in tech and beyond. Find your perfect path and start building your future today.
          </p>
        </motion.div>
      </div>

      {/* Ecosystem Wheel Section */}
      <EcosystemWheel />

      {/* Cluster Intelligence Section */}
      <ClusterIntelligence />
    </div>
  );
}
