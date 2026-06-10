"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import EcosystemWheel from "@/components/sections/whatcanibe/EcosystemWheel";
import ClusterIntelligence from "@/components/sections/whatcanibe/ClusterIntelligence";

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden relative bg-white">
      {/* Careers Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-[1000px] bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.03),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Careers Hero (Production Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-left max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/10 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            Discover Your Potential
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-zinc-900 mb-10 tracking-tighter leading-[0.85]">
            Explore <br />
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="italic bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              Careers.
            </motion.span>
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
