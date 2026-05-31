"use client";

import { motion } from "framer-motion";
import { Users, Target, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Guided",
    description: "Access a network of industry leaders who have walked the path before you.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400"
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Our neural engine identifies the exact intersection of your talent and market demand.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    icon: Shield,
    title: "Future Proof",
    description: "Navigate market shifts with data-backed trajectories that ensure long-term relevance.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with opportunities across borders, built for the decentralized workforce.",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400"
  }
];

export default function AboutUs() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Side: Text Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4"
            >
              Our Philosophy
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter text-white leading-[0.85]"
            >
              We don&apos;t just find jobs. <br />
              <span className="italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                We engineer legacies.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-400 font-medium text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
            >
              CareerFlyght was born from a simple realization: the traditional approach to career planning is obsolete. We combine high-fidelity data with human intuition to create trajectories that don&apos;t just pay the bills—they change the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Digital Native</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all overflow-hidden shadow-sm"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 relative z-10 ${feature.iconColor}`}>
                  <feature.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed relative z-10 group-hover:text-zinc-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
