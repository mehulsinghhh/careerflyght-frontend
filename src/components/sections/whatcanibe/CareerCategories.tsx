"use client";

import { 
  Laptop, 
  BrainCircuit, 
  Palette, 
  Stethoscope, 
  Leaf, 
  Briefcase, 
  Megaphone, 
  Rocket 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  {
    title: "Technology",
    description: "Build the infrastructure of the digital world.",
    icon: Laptop,
    color: "#3b82f6", // Blue
    gradient: "from-blue-600/20 to-indigo-600/20"
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence.",
    icon: BrainCircuit,
    color: "#a855f7", // Purple
    gradient: "from-purple-600/20 to-fuchsia-600/20"
  },
  {
    title: "Design",
    description: "Create experiences that inspire.",
    icon: Palette,
    color: "#ec4899", // Pink
    gradient: "from-pink-600/20 to-rose-600/20"
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness.",
    icon: Stethoscope,
    color: "#10b981", // Emerald
    gradient: "from-emerald-600/20 to-teal-600/20"
  },
  {
    title: "Sustainability",
    description: "Solve the planet's greatest challenges.",
    icon: Leaf,
    color: "#22c55e", // Green
    gradient: "from-green-600/20 to-emerald-600/20"
  },
  {
    title: "Business",
    description: "Drive the engine of the global economy.",
    icon: Briefcase,
    color: "#f59e0b", // Amber
    gradient: "from-amber-600/20 to-orange-600/20"
  },
  {
    title: "Marketing",
    description: "Tell stories that move people and markets.",
    icon: Megaphone,
    color: "#f97316", // Orange
    gradient: "from-orange-600/20 to-red-600/20"
  },
  {
    title: "Entrepreneur",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "#8b5cf6", // Violet
    gradient: "from-violet-600/20 to-purple-600/20"
  },
];

export default function CareerCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="categories" className="py-32 px-6 relative overflow-hidden bg-[#020617]">
      {/* Static Background Atmosphere */}
      <div
        className="absolute inset-0 z-0 opacity-10 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%)"
        }}
      />

      {/* Static Grid Background */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
             backgroundSize: "60px 60px"
           }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
          >
            Core Dimensions
          </div>
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-white leading-[0.85]">
            Choose Your <br />
            <span className="italic text-zinc-600">Dominion.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed text-lg md:text-xl">
            Don&apos;t limit yourself to one box. Identify your unique intersection of talent and market opportunity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative group"
            >
              <div
                className="h-full p-10 bg-white/[0.02] border border-white/5 group-hover:border-white/20 transition-all duration-300 rounded-[2.5rem] overflow-hidden relative"
              >
                {/* Subtle Gradient Mesh Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                <div
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-12 relative z-10 transition-all duration-300 group-hover:bg-white group-hover:text-black"
                >
                  <category.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight relative z-10">
                  {category.title}
                </h3>
                <p className="text-base text-zinc-500 font-medium leading-relaxed mb-12 relative z-10 group-hover:text-zinc-300 transition-colors">
                  {category.description}
                </p>
                
                <Button
                  variant="outline"
                  className="w-full relative z-10 border-white/10 transition-all py-8 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] bg-white/5 hover:bg-white hover:text-black shadow-sm"
                >
                  Explore Dominion
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
