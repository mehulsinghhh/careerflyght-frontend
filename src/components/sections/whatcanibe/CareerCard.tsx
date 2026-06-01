"use client";

import { Career } from "@/constants/careers";
import { CAREER_CLUSTERS } from "@/constants/career-clusters";
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

  // Find cluster to get the right color identity
  const cluster = CAREER_CLUSTERS.find(c => c.title === career.category) ||
                  CAREER_CLUSTERS.find(c => c.id === "digital-technology");

  const clusterColor = cluster?.color.replace('text-', '') || 'indigo-600';
  const tint = cluster?.tint || 'bg-indigo-100/60';
  const border = cluster?.border || 'border-indigo-200/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <GlowCard
        baseColor={tint}
        className={`h-full flex flex-col p-0 border ${border} overflow-hidden group transition-all duration-500 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-${clusterColor}/10`}
      >
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
              <div className={`absolute -inset-2 bg-${clusterColor}/20 blur-xl opacity-40 group-hover:opacity-100 transition-opacity`} />
              <div className={`relative h-14 w-14 rounded-2xl bg-white border ${border} flex items-center justify-center group-hover:bg-${clusterColor} group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                <BrainCircuit className={`h-7 w-7 text-${clusterColor} group-hover:text-white`} />
              </div>
            </div>
            {career.featured && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border ${border} text-${clusterColor} text-[10px] font-black uppercase tracking-widest shadow-sm`}>
                <Sparkles className="w-3 h-3" />
                Featured
              </div>
            )}
          </div>

          <h3 className={`text-2xl font-black text-zinc-900 mb-3 tracking-tight group-hover:text-${clusterColor} transition-colors`}>{career.title}</h3>
          <p className="text-sm text-zinc-700 font-semibold leading-relaxed line-clamp-3 mb-8">
            {career.description}
          </p>

          <div className={`grid grid-cols-2 gap-6 mb-8 p-4 rounded-2xl bg-white/80 border ${border} shadow-inner`}>
            <div className="space-y-1">
              <p className={`text-[10px] font-black text-${clusterColor} uppercase tracking-widest opacity-80`}>Est. Salary</p>
              <p className="text-sm font-black text-zinc-900 tracking-tight">{career.salaryRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className={`text-[10px] font-black text-${clusterColor} uppercase tracking-widest opacity-80`}>Demand</p>
              <p className="text-sm font-black text-emerald-700 flex items-center justify-end gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />
                {career.growthRate || "High"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {career.skills?.slice(0, 3).map(skill => (
              <span key={skill} className={`text-[10px] font-black px-2.5 py-1 bg-white border ${border} rounded-lg text-zinc-800 group-hover:bg-${clusterColor} group-hover:text-white group-hover:border-${clusterColor} transition-all`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <Button
            onClick={() => router.push(`/whatcanibe/dashboard`)}
            className={`w-full h-14 bg-white hover:bg-${clusterColor} text-zinc-900 hover:text-white border ${border} hover:border-${clusterColor} rounded-2xl group/btn transition-all duration-300 font-black shadow-md hover:shadow-lg hover:shadow-${clusterColor}/20`}
          >
            Explore Roadmap
            <ArrowUpRight className={`ml-2 h-4 w-4 text-${clusterColor} group-hover:text-white transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1`} />
          </Button>
        </div>
      </GlowCard>
    </motion.div>
  );
}
