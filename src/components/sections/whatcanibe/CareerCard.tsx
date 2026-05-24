"use client";

import { Career } from "@/constants/careers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, BrainCircuit, Sparkles, Target } from "lucide-react";
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
      <GlowCard className="h-full flex flex-col p-0 border-white/5 bg-zinc-950/40 backdrop-blur-xl overflow-hidden group hover:border-brand-primary/20 transition-all duration-500 rounded-[2.5rem]">
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-brand-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`relative h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-primary/30 group-hover:scale-110 transition-all duration-500`}>
                <BrainCircuit className="h-7 w-7 text-brand-primary" />
              </div>
            </div>
            {career.featured && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Featured
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-primary transition-colors">{career.title}</h3>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed line-clamp-3 mb-8">
            {career.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Est. Salary</p>
              <p className="text-sm font-bold text-white tracking-tight">{career.salaryRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Demand</p>
              <p className="text-sm font-bold text-emerald-500 flex items-center justify-end gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />
                {career.growthRate || "High"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {career.skills?.slice(0, 3).map(skill => (
              <span key={skill} className="text-[10px] font-bold px-2.5 py-1 bg-zinc-900 border border-white/5 rounded-lg text-zinc-400 group-hover:text-zinc-300 group-hover:border-white/10 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <Button
            onClick={() => router.push(`/whatcanibe/dashboard`)}
            className="w-full h-14 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-2xl group/btn transition-all duration-500 font-bold"
          >
            Explore Roadmap
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Button>
        </div>
      </GlowCard>
    </motion.div>
  );
}
