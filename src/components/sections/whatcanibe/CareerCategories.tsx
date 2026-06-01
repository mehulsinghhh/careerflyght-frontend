"use client";

import { 
  Laptop, 
  BrainCircuit, 
  Palette, 
  Stethoscope, 
  Leaf, 
  Briefcase, 
  Megaphone, 
  Rocket,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Technology",
    description: "Architect the digital infrastructure of the global economy.",
    icon: Laptop,
    color: "text-indigo-600",
    bg: "bg-indigo-50/50",
    hoverBg: "bg-indigo-100/50",
    borderColor: "border-indigo-100",
    accentColor: "indigo"
  },
  {
    title: "AI & Data",
    description: "Engineer intelligence systems that redefine possibility.",
    icon: BrainCircuit,
    color: "text-violet-600",
    bg: "bg-violet-50/50",
    hoverBg: "bg-violet-100/50",
    borderColor: "border-violet-100",
    accentColor: "violet"
  },
  {
    title: "Design",
    description: "Craft experiences that merge human emotion with precision.",
    icon: Palette,
    color: "text-pink-600",
    bg: "bg-pink-50/50",
    hoverBg: "bg-pink-100/50",
    borderColor: "border-pink-100",
    accentColor: "pink"
  },
  {
    title: "Healthcare",
    description: "Pioneer advancements in human longevity and wellness.",
    icon: Stethoscope,
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    hoverBg: "bg-emerald-100/50",
    borderColor: "border-emerald-100",
    accentColor: "emerald"
  },
  {
    title: "Sustainability",
    description: "Solve the planetary crisis through strategic innovation.",
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-50/50",
    hoverBg: "bg-green-100/50",
    borderColor: "border-green-100",
    accentColor: "green"
  },
  {
    title: "Business",
    description: "Navigate complex markets with high-fidelity strategy.",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50/50",
    hoverBg: "bg-amber-100/50",
    borderColor: "border-amber-100",
    accentColor: "amber"
  },
  {
    title: "Marketing",
    description: "Tell the stories that capture global attention and value.",
    icon: Megaphone,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50/50",
    hoverBg: "bg-fuchsia-100/50",
    borderColor: "border-fuchsia-100",
    accentColor: "fuchsia"
  },
  {
    title: "Entrepreneur",
    description: "Build the next generation of category-defining companies.",
    icon: Rocket,
    color: "text-orange-600",
    bg: "bg-orange-50/50",
    hoverBg: "bg-orange-100/50",
    borderColor: "border-orange-100",
    accentColor: "orange"
  },
];

export default function CareerCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section id="categories" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Editorial Decorative Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-strong pointer-events-none opacity-20" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:max-w-3xl"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-strong bg-zinc-50 text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-sm"
            >
              Industry Dominions
            </div>
            <h2 className="text-6xl md:text-9xl font-bold tracking-[-0.04em] text-zinc-950 leading-[0.8] uppercase">
              Identify <br />
              <span className="italic font-normal text-primary">Your</span> Dominion.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:max-w-md pb-4"
          >
            <p className="text-xl text-zinc-500 font-medium leading-relaxed border-l-4 border-primary/20 pl-8">
              Don&apos;t limit yourself to predefined boxes. Identify the intersection of your unique talent and global market opportunity.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="relative group"
            >
              <div
                className={`h-full p-8 md:p-12 ${category.bg} border-2 ${category.borderColor} hover:bg-white hover:border-zinc-950 transition-all duration-500 rounded-[3rem] overflow-hidden relative shadow-premium group-hover:shadow-hero flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-16">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-white border-2 ${category.borderColor} flex items-center justify-center relative z-10 transition-all duration-500 group-hover:bg-zinc-950 group-hover:text-white shadow-sm ${category.color}`}
                    >
                      <category.icon className="w-8 h-8" />
                    </div>
                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pt-2">
                      CODE.{category.accentColor.slice(0, 3)}
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-zinc-950 mb-6 tracking-tighter uppercase leading-none">
                    {category.title}
                  </h3>
                  <p className="text-base text-zinc-600 font-medium leading-relaxed mb-12">
                    {category.description}
                  </p>
                </div>
                
                <div className="pt-8 border-t border-strong flex items-center justify-between group/link cursor-pointer">
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-950">Deconstruct Domain</span>
                   <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
