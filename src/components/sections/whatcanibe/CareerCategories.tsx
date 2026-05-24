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
import { motion, type Variants } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";

const categories = [
  {
    title: "Technology",
    description: "Build the infrastructure of the digital world.",
    icon: Laptop,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    glow: "rgba(59, 130, 246, 0.1)",
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence and insights.",
    icon: BrainCircuit,
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    glow: "rgba(139, 92, 246, 0.1)",
  },
  {
    title: "Design & Creative",
    description: "Create experiences that inspire and engage.",
    icon: Palette,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    glow: "rgba(236, 72, 153, 0.1)",
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness and longevity.",
    icon: Stethoscope,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.1)",
  },
  {
    title: "Sustainability",
    description: "Solve the planet's most pressing challenges.",
    icon: Leaf,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    glow: "rgba(34, 197, 94, 0.1)",
  },
  {
    title: "Business & Finance",
    description: "Drive the economy and master the markets.",
    icon: Briefcase,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.1)",
  },
  {
    title: "Marketing & Media",
    description: "Tell stories that move people and brands.",
    icon: Megaphone,
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
    glow: "rgba(79, 70, 229, 0.1)",
  },
  {
    title: "Entrepreneurship",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-400",
    glow: "rgba(217, 70, 239, 0.1)",
  },
];

export default function CareerCategories() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Core Dimensions</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">Infinite Domains.</h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed text-lg">
            Cross-pollinate between diverse industries and specializations. Identify your unique intersection of talent and opportunity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <GlowCard
                glowColor={category.glow}
                className="h-full cursor-pointer border-white/5 bg-zinc-950/50 hover:border-brand-primary/20 backdrop-blur-xl transition-all duration-500 group rounded-[2.5rem] p-10"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500`}>
                  <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-primary transition-colors">{category.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Explore Dimension</span>
                  <div className="w-6 h-px bg-brand-primary" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
