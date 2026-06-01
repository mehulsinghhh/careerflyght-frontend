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
      <GlowCard className="h-full flex flex-col p-0 border-zinc-100 bg-white overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5">
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`relative h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                <BrainCircuit className="h-7 w-7 text-indigo-600 group-hover:text-white" />
              </div>
            </div>
            {career.featured && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3 h-3" />
                Featured
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">{career.title}</h3>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed line-clamp-3 mb-8">
            {career.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8 p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Est. Salary</p>
              <p className="text-sm font-bold text-zinc-900 tracking-tight">{career.salaryRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Demand</p>
              <p className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />
                {career.growthRate || "High"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {career.skills?.slice(0, 3).map(skill => (
              <span key={skill} className="text-[10px] font-bold px-2.5 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-zinc-500 group-hover:text-zinc-900 group-hover:border-indigo-500/20 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <Button
            onClick={() => router.push(`/whatcanibe/dashboard`)}
            className="w-full h-14 bg-zinc-50 hover:bg-indigo-600 text-zinc-900 hover:text-white border border-zinc-200 hover:border-indigo-600 rounded-2xl group/btn transition-all duration-300 font-bold shadow-sm"
          >
            Explore Roadmap
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Button>
        </div>
      </GlowCard>
    </motion.div>
  );
}
