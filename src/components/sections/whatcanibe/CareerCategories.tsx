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
import { GlowCard } from "@/components/ui/glow-card";

const categories = [
  {
    title: "Technology",
    description: "Build the infrastructure of the digital world.",
    icon: Laptop,
    color: "text-blue-400",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence and insights.",
    icon: BrainCircuit,
    color: "text-violet-400",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  {
    title: "Design & Creative",
    description: "Create experiences that inspire and engage.",
    icon: Palette,
    color: "text-pink-400",
    glow: "rgba(236, 72, 153, 0.15)",
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness and longevity.",
    icon: Stethoscope,
    color: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    title: "Sustainability",
    description: "Solve the planet's most pressing challenges.",
    icon: Leaf,
    color: "text-green-400",
    glow: "rgba(34, 197, 94, 0.15)",
  },
  {
    title: "Business & Finance",
    description: "Drive the economy and master the markets.",
    icon: Briefcase,
    color: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    title: "Marketing & Media",
    description: "Tell stories that move people and brands.",
    icon: Megaphone,
    color: "text-indigo-400",
    glow: "rgba(79, 70, 229, 0.15)",
  },
  {
    title: "Entrepreneurship",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "text-fuchsia-400",
    glow: "rgba(217, 70, 239, 0.15)",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Background decoration for section separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="text-muted-foreground font-bold text-[11px] uppercase tracking-[0.3em] mb-4">Core Dimensions</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">Explore Domains.</h2>
          <p className="text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed text-lg">
            Cross-pollinate between diverse industries and specializations. Identify your unique intersection of talent and opportunity.
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
            <motion.div key={category.title} variants={itemVariants}>
              <GlowCard
                glowColor={category.glow}
                className="h-full glass-card glass-card-hover group rounded-3xl p-8 border-white/[0.08]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500">
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{category.title}</h3>
                <p className="text-sm text-muted-foreground font-normal leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Explore</span>
                  <div className="w-6 h-px bg-white/40" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
