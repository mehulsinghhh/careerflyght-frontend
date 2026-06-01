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
      transition: { duration: 0.2 },
    },
  };

  return (
    <section id="categories" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Static Background Atmosphere */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #4f46e5, transparent 70%)"
        }}
      />

      {/* Static Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)",
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/10 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
          >
            Core Dimensions
          </div>
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-zinc-900 leading-[0.85]">
            Choose Your <br />
            <span className="italic text-zinc-300">Dominion.</span>
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
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <div
                className="h-full p-10 bg-white border border-zinc-100 group-hover:border-indigo-500/20 transition-all duration-500 rounded-[2.5rem] overflow-hidden relative shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5"
              >
                {/* Subtle Gradient Mesh Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-[0.03] group-hover:opacity-[0.15] transition-opacity duration-500`}
                />

                <div
                  className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-12 relative z-10 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white"
                  style={{ color: category.color }}
                >
                  <category.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight relative z-10">
                  {category.title}
                </h3>
                <p className="text-base text-zinc-500 font-medium leading-relaxed mb-12 relative z-10 group-hover:text-zinc-600 transition-colors line-clamp-2">
                  {category.description}
                </p>
                
                <Button
                  variant="outline"
                  className="w-full relative z-10 border-zinc-200 transition-all py-8 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] bg-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm"
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
