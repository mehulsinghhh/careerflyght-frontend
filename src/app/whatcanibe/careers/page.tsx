"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import EcosystemWheel from "@/components/sections/whatcanibe/EcosystemWheel";
import ClusterIntelligence from "@/components/sections/whatcanibe/ClusterIntelligence";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        {/* Careers Hero (Preserving Production Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="h-3 w-3" />
            Discover Your Potential
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Explore <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent italic font-serif">Careers.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
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
