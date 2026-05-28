"use client";

import { motion } from "framer-motion";
import { Search, Zap, UserPlus, Map } from "lucide-react";

const steps = [
  {
    title: "Dream",
    description: "Input your raw passions. AI analyzes your hidden potential and market trends.",
    icon: Search,
    color: "from-brand-primary to-purple-500",
  },
  {
    title: "Design",
    description: "We engineer a hyper-personalized roadmap tailored to your specific goals.",
    icon: Map,
    color: "from-brand-secondary to-blue-500",
  },
  {
    title: "Connect",
    description: "Match with industry titans who have already walked your path.",
    icon: UserPlus,
    color: "from-brand-accent to-pink-500",
  },
  {
    title: "Conquer",
    description: "Execute with precision tools and community support. Secure the future.",
    icon: Zap,
    color: "from-brand-vibrant to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-zinc-50 dark:bg-black/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight dark:text-white text-zinc-900">
            Engineered for <span className="text-gradient-purple">Greatness.</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
            The traditional career path is broken. We built the engine to fix it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line - desktop only */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto h-20 w-20 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center mb-8 border border-zinc-100 dark:border-white/5 group hover:scale-110 transition-transform duration-500">
                <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
                <step.icon className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black mb-4 dark:text-white text-zinc-900 tracking-tight">{step.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
