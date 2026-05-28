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
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.2)",
    className: "lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence.",
    icon: BrainCircuit,
    color: "text-violet-500",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    title: "Design",
    description: "experiences that inspire.",
    icon: Palette,
    color: "text-pink-500",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness.",
    icon: Stethoscope,
    color: "text-emerald-500",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    title: "Sustainability",
    description: "Solve planet's challenges.",
    icon: Leaf,
    color: "text-green-500",
    glow: "rgba(34, 197, 94, 0.2)",
  },
  {
    title: "Business",
    description: "Drive the global economy.",
    icon: Briefcase,
    color: "text-amber-500",
    glow: "rgba(245, 158, 11, 0.2)",
    className: "lg:col-span-2 lg:row-span-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
  },
  {
    title: "Marketing",
    description: "Tell stories that move people.",
    icon: Megaphone,
    color: "text-indigo-500",
    glow: "rgba(79, 70, 229, 0.2)",
  },
  {
    title: "Entrepreneur",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "text-fuchsia-500",
    glow: "rgba(217, 70, 239, 0.2)",
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 bg-white dark:bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="dark:text-zinc-500 text-zinc-400 font-black text-[12px] uppercase tracking-[0.4em] mb-6">Core Dimensions</div>
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter dark:text-white text-zinc-900 leading-none">
            Choose Your <span className="text-gradient-cyan">Dominion.</span>
          </h2>
          <p className="dark:text-zinc-400 text-zinc-500 font-bold max-w-2xl mx-auto leading-relaxed text-xl">
            Don&apos;t limit yourself to one box. Identify your unique intersection of talent and market opportunity.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={itemVariants} className={category.className}>
              <GlowCard
                glowColor={category.glow}
                className="h-full glass glass-hover group rounded-[2.5rem] p-10 border-zinc-100 dark:border-white/[0.08]"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-brand-primary/30 group-hover:shadow-2xl transition-all duration-500">
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>

                <h3 className="text-2xl md:text-3xl font-black dark:text-white text-zinc-900 mb-3 tracking-tight">{category.title}</h3>
                <p className="text-base dark:text-zinc-400 text-zinc-500 font-bold leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[11px] font-black dark:text-white text-zinc-900 uppercase tracking-widest">Inquire</span>
                  <div className="w-12 h-0.5 bg-brand-primary/40 rounded-full group-hover:w-20 transition-all duration-500" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
