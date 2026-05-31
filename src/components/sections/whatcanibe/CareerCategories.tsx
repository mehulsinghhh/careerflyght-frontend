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
    color: "text-indigo-600",
    gradient: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-100"
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence.",
    icon: BrainCircuit,
    color: "text-violet-600",
    gradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-100"
  },
  {
    title: "Design",
    description: "Create experiences that inspire.",
    icon: Palette,
    color: "text-pink-600",
    gradient: "from-pink-50 to-rose-50",
    borderColor: "border-pink-100"
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness.",
    icon: Stethoscope,
    color: "text-emerald-600",
    gradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-100"
  },
  {
    title: "Sustainability",
    description: "Solve the planet's greatest challenges.",
    icon: Leaf,
    color: "text-green-600",
    gradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-100"
  },
  {
    title: "Business",
    description: "Drive the engine of the global economy.",
    icon: Briefcase,
    color: "text-amber-600",
    gradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-100"
  },
  {
    title: "Marketing",
    description: "Tell stories that move people and markets.",
    icon: Megaphone,
    color: "text-fuchsia-600",
    gradient: "from-fuchsia-50 to-pink-50",
    borderColor: "border-fuchsia-100"
  },
  {
    title: "Entrepreneur",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "text-orange-600",
    gradient: "from-orange-50 to-amber-50",
    borderColor: "border-orange-100"
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
    <section id="categories" className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Static Background Atmosphere */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.45 0.2 264 / 0.05), transparent 70%)"
        }}
      />

      {/* Static Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(oklch(0.15 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.15 0 0) 1px, transparent 1px)",
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm"
          >
            Core Dimensions
          </div>
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-zinc-950 leading-[0.85]">
            Choose Your <br />
            <span className="italic text-zinc-400">Dominion.</span>
          </h2>
          <p className="text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed text-lg md:text-xl">
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
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div
                className={`h-full p-10 bg-white border ${category.borderColor} group-hover:border-zinc-300 transition-all duration-500 rounded-[2.5rem] overflow-hidden relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]`}
              >
                {/* Subtle Gradient Mesh Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />

                <div
                  className={`w-16 h-16 rounded-2xl bg-white border ${category.borderColor} flex items-center justify-center mb-12 relative z-10 transition-all duration-500 group-hover:bg-zinc-950 group-hover:text-white shadow-sm ${category.color}`}
                >
                  <category.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-bold text-zinc-950 mb-4 tracking-tight relative z-10">
                  {category.title}
                </h3>
                <p className="text-base text-zinc-600 font-medium leading-relaxed mb-12 relative z-10 group-hover:text-zinc-900 transition-colors">
                  {category.description}
                </p>
                
                <Button
                  variant="outline"
                  className="w-full relative z-10 border-zinc-200 transition-all py-8 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] bg-white/50 hover:bg-zinc-950 hover:text-white shadow-sm"
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
