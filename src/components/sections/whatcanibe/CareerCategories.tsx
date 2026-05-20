"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Laptop,
  BrainCircuit,
  Cpu as CpuIcon,
  Palette,
  Stethoscope,
  Leaf,
  Briefcase,
  Megaphone,
  Rocket,
  ArrowRight
} from "lucide-react";

const CATEGORIES = [
  {
    title: "AI & Neural Systems",
    description: "Architect the next generation of machine intelligence and neural networks.",
    icon: BrainCircuit,
    color: "from-violet-600 to-indigo-600",
    size: "lg",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
    demand: "+42% Growth"
  },
  {
    title: "Quantum Computing",
    description: "Solve impossible problems using quantum mechanics and logic.",
    icon: CpuIcon, // Using Laptop as fallback if Cpu not available, but let's check Lucide
    color: "from-blue-600 to-cyan-500",
    size: "md",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
    demand: "+28% Growth"
  },
  {
    title: "Immersive Design",
    description: "Design the spatial interfaces and worlds of the future metaverse.",
    icon: Palette,
    color: "from-fuchsia-600 to-pink-500",
    size: "md",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400",
    demand: "+15% Growth"
  },
  {
    title: "Bio-Engineering",
    description: "Merge biology with technology to redefine human health.",
    icon: Stethoscope,
    color: "from-emerald-600 to-teal-500",
    size: "lg",
    image: "https://images.unsplash.com/photo-1532187875605-1838d537f844?auto=format&fit=crop&q=80&w=400",
    demand: "+22% Growth"
  },
  {
    title: "Sustainable Systems",
    description: "Create renewable energy and circular economy solutions for the planet.",
    icon: Leaf,
    color: "from-green-600 to-emerald-500",
    size: "md",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400",
    demand: "+31% Growth"
  },
  {
    title: "FinTech & Web3",
    description: "Build the decentralized financial systems of tomorrow.",
    icon: Briefcase,
    color: "from-amber-600 to-orange-500",
    size: "md",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=400",
    demand: "+19% Growth"
  }
];

export default function CareerCategories() {
  return (
    <section className="py-32 px-6 bg-[#020202] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-violet-400 font-black text-xs uppercase tracking-[0.3em] mb-4"
            >
              Industry Verticals
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95]"
            >
              Explore the <br /> <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Unexplored.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="h-14 px-8 border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 gap-2 backdrop-blur-md">
              Browse All Categories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 flex flex-col justify-between ${
                category.size === 'lg' ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/60 to-[#020202]`} />
              </div>

              {/* Top Content */}
              <div className="relative z-10 p-8">
                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <category.icon className="w-7 h-7 text-white" />
                 </div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-black text-[8px] uppercase tracking-widest">{category.demand}</span>
                 </div>
                 <h3 className="text-2xl font-black text-white tracking-tight">{category.title}</h3>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-8 pt-0">
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {category.description}
                </p>
                <div className="flex items-center gap-4">
                   <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-white/30 transition-colors" />
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
              </div>

              {/* Lighting Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
