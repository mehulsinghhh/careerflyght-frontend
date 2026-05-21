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
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.2)",
  },
  {
    title: "AI & Data",
    description: "Shape the future with intelligence and insights.",
    icon: BrainCircuit,
    color: "from-violet-500 to-purple-500",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    title: "Design & Creative",
    description: "Create experiences that inspire and engage.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  {
    title: "Healthcare",
    description: "Innovate for human wellness and longevity.",
    icon: Stethoscope,
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    title: "Sustainability",
    description: "Solve the planet's most pressing challenges.",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    glow: "rgba(34, 197, 94, 0.2)",
  },
  {
    title: "Business & Finance",
    description: "Drive the economy and master the markets.",
    icon: Briefcase,
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.2)",
  },
  {
    title: "Marketing & Media",
    description: "Tell stories that move people and brands.",
    icon: Megaphone,
    color: "from-indigo-500 to-blue-500",
    glow: "rgba(79, 70, 229, 0.2)",
  },
  {
    title: "Entrepreneurship",
    description: "Start something that changes everything.",
    icon: Rocket,
    color: "from-fuchsia-500 to-purple-500",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 px-6 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Explore Infinite Possibilities</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover a wide range of industries and specializations. Dive into the details of every role and find where you belong.
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
                className="h-full cursor-pointer border-white/5 hover:border-white/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {category.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
