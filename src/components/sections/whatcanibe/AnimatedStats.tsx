"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Globe, Users, TrendingUp, Sparkles } from "lucide-react";

const stats = [
  { label: "Active Dreamers", value: 12400, icon: Users, color: "text-brand-primary" },
  { label: "AI Trajectories", value: 45000, icon: Sparkles, color: "text-brand-accent" },
  { label: "Global Mentors", value: 1200, icon: Globe, color: "text-brand-secondary" },
  { label: "Career Success", value: 94, suffix: "%", icon: TrendingUp, color: "text-brand-vibrant" },
];

export default function AnimatedStats() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all duration-500">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-black tracking-tighter dark:text-white text-zinc-900">
                  <AnimatedCounter value={stat.value} />
                </span>
                {stat.suffix && <span className="text-2xl font-black text-brand-primary">{stat.suffix}</span>}
              </div>
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
