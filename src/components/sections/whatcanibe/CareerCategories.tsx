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
    color: "text-blue-600",
    bg: "bg-blue-50/40",
    border: "group-hover:border-blue-500/30",
    button: "hover:bg-blue-600 hover:border-blue-600",
    gradient: "from-blue-600/10 to-indigo-600/10"
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence.",
    icon: BrainCircuit,
    color: "text-purple-600",
    bg: "bg-purple-50/40",
    border: "group-hover:border-purple-500/30",
    button: "hover:bg-purple-600 hover:border-purple-600",
    gradient: "from-purple-600/10 to-fuchsia-600/10"
  },
  {
    title: "Design",
    description: "Create experiences that inspire.",
    icon: Palette,
    color: "text-pink-600",
    bg: "bg-pink-50/40",
    border: "group-hover:border-pink-500/30",
    button: "hover:bg-pink-600 hover:border-pink-600",
    gradient: "from-pink-600/10 to-rose-600/10"
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness.",
    icon: Stethoscope,
    color: "text-emerald-600",
    bg: "bg-emerald-50/40",
    border: "group-hover:border-emerald-500/30",
    button: "hover:bg-emerald-600 hover:border-emerald-600",
    gradient: "from-emerald-600/10 to-teal-600/10"
  },
  {
    title: "Sustainability",
    description: "Solve the planet's greatest challenges.",
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-50/40",
    border: "group-hover:border-green-500/30",
    button: "hover:bg-green-600 hover:border-green-600",
    gradient: "from-green-600/10 to-emerald-600/10"
  },
  {
    title: "Business",
    description: "Drive the engine of the global economy.",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50/40",
    border: "group-hover:border-amber-500/30",
    button: "hover:bg-amber-600 hover:border-amber-600",
    gradient: "from-amber-600/10 to-orange-600/10"
  },
  {
    title: "Marketing",
    description: "Tell stories that move people and markets.",
    icon: Megaphone,
    color: "text-orange-600",
    bg: "bg-orange-50/40",
    border: "group-hover:border-orange-500/30",
    button: "hover:bg-orange-600 hover:border-orange-600",
    gradient: "from-orange-600/10 to-red-600/10"
  },
  {
    title: "Entrepreneur",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "text-violet-600",
    bg: "bg-violet-50/40",
    border: "group-hover:border-violet-500/30",
    button: "hover:bg-violet-600 hover:border-violet-600",
    gradient: "from-violet-600/10 to-purple-600/10"
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
    <section id="categories" className="py-32 px-6 relative overflow-hidden bg-zinc-50/40">
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
                className={`h-full p-10 ${category.bg} border border-zinc-100 ${category.border} transition-all duration-500 rounded-[2.5rem] overflow-hidden relative shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5`}
              >
                {/* Subtle Gradient Mesh Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-[0.2] group-hover:opacity-[0.4] transition-opacity duration-500`}
                />

                <div
                  className={`w-16 h-16 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mb-12 relative z-10 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white ${category.color}`}
                >
                  <category.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight relative z-10">
                  {category.title}
                </h3>
                <p className="text-base text-zinc-600 font-medium leading-relaxed mb-12 relative z-10 group-hover:text-zinc-900 transition-colors line-clamp-2">
                  {category.description}
                </p>
                
                <Button
                  variant="outline"
                  className={`w-full relative z-10 border-zinc-200 transition-all py-8 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] bg-white hover:text-white ${category.button} shadow-sm`}
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
