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
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence.",
    icon: BrainCircuit,
  },
  {
    title: "Design",
    description: "experiences that inspire.",
    icon: Palette,
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness.",
    icon: Stethoscope,
  },
  {
    title: "Sustainability",
    description: "Solve planet's challenges.",
    icon: Leaf,
  },
  {
    title: "Business",
    description: "Drive the global economy.",
    icon: Briefcase,
  },
  {
    title: "Marketing",
    description: "Tell stories that move people.",
    icon: Megaphone,
  },
  {
    title: "Entrepreneur",
    description: "Start something that changes everything.",
    icon: Rocket,
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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
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
            <motion.div key={category.title} variants={itemVariants}>
              <div
                className="h-full p-10 bg-zinc-950 border border-white/5 hover:border-white/20 transition-all duration-500 group rounded-3xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-12 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <category.icon className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{category.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-10">
                  {category.description}
                </p>
                
                <Button variant="outline" className="w-full border-white/10 hover:bg-white hover:text-black transition-all py-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
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
