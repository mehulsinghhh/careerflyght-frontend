"use client";

import { Search, Map, Users, Target, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Discovery",
    description: "Analyze your cognitive profile through our proprietary framework.",
    icon: Search,
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    color: "text-blue-600",
    status: "done"
  },
  {
    title: "Mapping",
    description: "Project your growth across timeline milestones to destination.",
    icon: Map,
    bg: "bg-violet-50/50",
    border: "border-violet-100",
    color: "text-violet-600",
    status: "active"
  },
  {
    title: "Calibration",
    description: "Refine your roadmap with insights from industry masters.",
    icon: Users,
    bg: "bg-purple-50/50",
    border: "border-purple-100",
    color: "text-purple-600",
    status: "pending"
  },
  {
    title: "Execution",
    description: "Access a curated pipeline of high-fidelity opportunities.",
    icon: Target,
    bg: "bg-fuchsia-50/50",
    border: "border-fuchsia-100",
    color: "text-fuchsia-600",
    status: "pending"
  },
];

export default function Pathways() {
  const router = useRouter();

  return (
    <section id="pathways" className="py-32 md:py-48 px-6 relative overflow-hidden bg-white">
      {/* Editorial Decorative Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
             backgroundSize: "20vw 20vh"
           }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-32">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-strong bg-zinc-50 text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 shadow-sm">
                Strategic Framework
              </div>
              <h2 className="text-6xl md:text-9xl font-bold mb-12 tracking-[-0.04em] text-zinc-950 leading-[0.8] uppercase">
                Neural <br />
                <span className="italic font-normal text-primary">Pathways.</span>
              </h2>
              <p className="text-xl md:text-2xl text-zinc-600 mb-16 leading-relaxed font-medium border-l-8 border-primary/10 pl-10">
                We deconstruct the journey from ambition to achievement into precise, actionable milestones. Remove the fog of uncertainty.
              </p>
            </motion.div>
            
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group"
                >
                  <div
                    className={`flex gap-8 p-10 rounded-[2.5rem] border-2 transition-all duration-500 ${
                      step.status === 'active'
                        ? 'border-primary bg-white shadow-hero'
                        : 'border-strong bg-zinc-50 hover:bg-white hover:border-zinc-950'
                    }`}
                  >
                    <div className={`shrink-0 w-16 h-16 rounded-2xl bg-white border-2 ${step.border} flex items-center justify-center shadow-premium group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500 ${step.color}`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-zinc-950 tracking-tight uppercase">{step.title}</h3>
                        {step.status === 'done' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        {step.status === 'active' && (
                          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">Active Node</div>
                        )}
                      </div>
                      <p className="text-zinc-500 text-base leading-relaxed font-medium group-hover:text-zinc-900 transition-colors duration-500">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <Button
                onClick={() => router.push('/whatcanibe/signup')}
                size="lg"
                className="bg-zinc-950 text-white hover:bg-primary rounded-[2rem] px-16 h-24 text-xl font-black uppercase tracking-widest group shadow-hero transition-all"
              >
                Initiate Roadmap
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 aspect-square rounded-[4rem] border-2 border-zinc-950 bg-white p-16 flex items-center justify-center overflow-hidden shadow-hero"
            >
               {/* Visual Roadmap Path */}
               <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg className="w-full h-full p-20" viewBox="0 0 400 400" fill="none">
                    <path
                      d="M50 350 C 50 200, 350 200, 350 50"
                      stroke="var(--primary)"
                      strokeWidth="2"
                    />
                  </svg>
               </div>
               
               <div className="grid grid-cols-2 gap-8 relative z-20">
                  {[
                    { year: "Phase 01", title: "Synthesis", color: "text-blue-600", bg: "bg-blue-50", progress: 100, delay: 0.1 },
                    { year: "Phase 02", title: "Mastery", color: "text-indigo-600", bg: "bg-indigo-50", progress: 65, delay: 0.2 },
                    { year: "Phase 03", title: "Market", color: "text-fuchsia-600", bg: "bg-fuchsia-50", progress: 30, delay: 0.3 },
                    { year: "Terminal", title: "Apex", color: "text-emerald-600", bg: "bg-emerald-50", progress: 0, delay: 0.4 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      className="bg-zinc-50 p-10 rounded-[2.5rem] border-2 border-strong shadow-premium w-56 group hover:bg-white hover:border-zinc-950 transition-all duration-500"
                    >
                      <p className={`text-[10px] font-black mb-4 uppercase tracking-[0.3em] ${item.color}`}>{item.year}</p>
                      <p className="font-black text-zinc-950 text-xl mb-8 tracking-tighter uppercase leading-none">{item.title}</p>
                      <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: item.delay + 0.3, ease: "easeOut" }}
                          className={`h-full bg-zinc-950`}
                        />
                      </div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            
            <div className="absolute -top-20 -right-20 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
