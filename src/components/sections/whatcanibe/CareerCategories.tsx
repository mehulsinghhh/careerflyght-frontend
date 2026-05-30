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
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence.",
    icon: BrainCircuit,
    color: "#a855f7", // Purple
  },
  {
    title: "Design",
    description: "Create experiences that inspire.",
    icon: Palette,
    color: "#ec4899", // Pink
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness.",
    icon: Stethoscope,
    color: "#10b981", // Emerald
  },
  {
    title: "Sustainability",
    description: "Solve the planet's greatest challenges.",
    icon: Leaf,
    color: "#22c55e", // Green
  },
  {
    title: "Business",
    description: "Drive the engine of the global economy.",
    icon: Briefcase,
    color: "#f59e0b", // Amber
  },
  {
    title: "Marketing",
    description: "Tell stories that move people and markets.",
    icon: Megaphone,
    color: "#f97316", // Orange
  },
  {
    title: "Entrepreneur",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "#8b5cf6", // Violet
  },
];

import { useState } from "react";

export default function CareerCategories() {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden transition-colors duration-1000">
      {/* Background Atmosphere Reaction */}
      <div
        className="absolute inset-0 z-0 opacity-20 transition-all duration-1000 blur-[120px]"
        style={{
          background: hoveredColor
            ? `radial-gradient(circle at 50% 50%, ${hoveredColor}, transparent 70%)`
            : "transparent"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Core Dimensions</div>
          <h2 className="text-4xl md:text-8xl font-bold mb-6 tracking-tighter text-white leading-[0.85]">
            Choose Your <br />
            <span className="italic text-zinc-500">Dominion.</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl leading-relaxed text-lg mt-8">
            Don't limit yourself to one box. Identify your unique intersection of talent and market opportunity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onMouseEnter={() => setHoveredColor(category.color)}
              onMouseLeave={() => setHoveredColor(null)}
              className="relative"
            >
              <div
                className="h-full p-10 bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500 group rounded-3xl overflow-hidden"
              >
                {/* Accent Glow */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: category.color }}
                />

                <div
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-12 group-hover:text-white transition-all duration-500"
                  style={{
                    borderColor: hoveredColor === category.color ? `${category.color}40` : undefined,
                    boxShadow: hoveredColor === category.color ? `0 0 20px ${category.color}20` : undefined
                  }}
                >
                  <category.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" style={{ color: hoveredColor === category.color ? category.color : undefined }} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-10 group-hover:text-zinc-400 transition-colors">
                  {category.description}
                </p>
                
                <Button
                  variant="outline"
                  className="w-full border-white/10 hover:border-white/40 transition-all py-6 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-transparent group-hover:bg-white/5"
                  style={{
                    boxShadow: hoveredColor === category.color ? `0 4px 20px ${category.color}10` : undefined
                  }}
                >
                  Inquire
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
