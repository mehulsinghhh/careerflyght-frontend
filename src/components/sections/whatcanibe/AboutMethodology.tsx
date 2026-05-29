"use client";

import { motion } from "framer-motion";
import {
  Users,
  Globe2,
  Network,
  ClipboardCheck,
  BarChart3,
  Lightbulb,
  Settings,
  CheckCircle2,
  MapPin
} from "lucide-react";

export default function AboutMethodology() {
  const methodology = [
    {
      title: "Assessment",
      desc: "Deep-dive analysis of current capabilities and aspirations.",
      icon: ClipboardCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Gap Analysis",
      desc: "Identifying the precise skills and experience needed for the next level.",
      icon: BarChart3,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Solution Design",
      desc: "Architecting a personalized trajectory based on industry requirements.",
      icon: Lightbulb,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Implementation",
      desc: "Executing the plan through high-impact learning and exposure.",
      icon: Settings,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Measurement",
      desc: "Continuous validation of growth against global benchmarks.",
      icon: CheckCircle2,
      color: "text-brand-primary",
      bg: "bg-brand-primary/10"
    }
  ];

  const stats = [
    { label: "Global Regions", value: "6+", icon: Globe2 },
    { label: "Associates", value: "170+", icon: Network },
    { label: "Industry Experts", value: "100%", icon: Users },
  ];

  return (
    <section className="py-32 px-6 bg-white dark:bg-black relative overflow-hidden" id="about">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Side: Brand Story */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-6"
            >
              The CareerFlyght Advantage
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8"
            >
              Intelligence <br /> Meets <span className="italic font-serif text-brand-primary">Experience.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg leading-relaxed mb-12"
            >
              We are people management experts working with Subject Matter Experts across vertical industries and Academia to provide cutting-edge advanced tools to deliver performance.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
               {stats.map((stat, i) => (
                 <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="space-y-2"
                 >
                    <stat.icon className="w-5 h-5 text-brand-primary mb-3" />
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{stat.label}</div>
                 </motion.div>
               ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/5 relative overflow-hidden group"
            >
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Global Reach</h4>
               </div>
               <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {["SEA", "Middle East", "Africa", "North America", "Europe", "AsiaPac"].map(region => (
                    <span key={region} className="text-xs font-bold text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">{region}</span>
                  ))}
               </div>
            </motion.div>
          </div>

          {/* Right Side: Methodology Framework */}
          <div className="lg:col-span-7 flex flex-col gap-4">
             {methodology.map((item, i) => (
               <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 md:p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all flex items-center gap-8 relative overflow-hidden"
               >
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black text-brand-primary/40 uppercase">Phase 0{i + 1}</span>
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                     </div>
                     <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                       {item.desc}
                     </p>
                  </div>
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-6 h-6 text-brand-primary/20" />
                  </div>
               </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
