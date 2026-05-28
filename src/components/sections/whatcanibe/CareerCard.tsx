"use client";

import { Career } from "@/constants/careers";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, BrainCircuit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { useRouter } from "next/navigation";

interface CareerCardProps {
  career: Career;
}

export default function CareerCard({ career }: CareerCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <GlowCard className="h-full flex flex-col p-0 border-zinc-100 dark:border-white/5 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl overflow-hidden group hover:border-brand-primary/20 transition-all duration-500 rounded-[2.5rem] shadow-xl hover:shadow-2xl">
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-brand-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className={`relative h-16 w-16 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 flex items-center justify-center group-hover:border-brand-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                <BrainCircuit className="h-8 w-8 text-brand-primary" />
              </div>
            </div>
            {career.featured && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Elite
              </div>
            )}
          </div>

          <h3 className="text-2xl font-black dark:text-white text-zinc-900 mb-4 tracking-tighter group-hover:text-brand-primary transition-colors leading-tight">{career.title}</h3>
          <p className="text-sm dark:text-zinc-500 text-zinc-500 font-bold leading-relaxed line-clamp-3 mb-8">
            {career.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-[1.5rem] bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 shadow-inner">
            <div className="space-y-1">
              <p className="text-[10px] font-black dark:text-zinc-600 text-zinc-400 uppercase tracking-widest">Comp Package</p>
              <p className="text-sm font-black dark:text-white text-zinc-900 tracking-tight">{career.salaryRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black dark:text-zinc-600 text-zinc-400 uppercase tracking-widest">Momentum</p>
              <p className="text-sm font-black text-emerald-500 flex items-center justify-end gap-1.5">
                <TrendingUp className="h-4 w-4" />
                {career.growthRate || "Viral"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {career.skills?.slice(0, 3).map(skill => (
              <span key={skill} className="text-[10px] font-black px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-xl dark:text-zinc-400 text-zinc-500 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all uppercase tracking-widest shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 pt-0 mt-auto">
          <Button
            onClick={() => router.push(`/whatcanibe/dashboard`)}
            className="w-full h-14 bg-zinc-900 dark:bg-white hover:bg-brand-primary dark:hover:bg-brand-primary text-white dark:text-zinc-900 hover:text-white dark:hover:text-white border-none rounded-2xl group/btn transition-all duration-500 font-black text-sm tracking-tight shadow-xl"
          >
            Deploy Roadmap
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Button>
        </div>
      </GlowCard>
    </motion.div>
  );
}
