"use client";

import { Career } from "@/constants/careers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, BrainCircuit } from "lucide-react";
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
    >
      <GlowCard className="h-full flex flex-col p-0 border-white/5 overflow-hidden group">
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-6">
            <div className={`h-12 w-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
              <BrainCircuit className="h-6 w-6 text-violet-400" />
            </div>
            {career.featured && (
              <Badge className="bg-violet-600/20 text-violet-400 border-violet-500/30 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                Featured
              </Badge>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{career.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">
            {career.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Salary Range</p>
              <p className="text-sm font-bold text-white">{career.salaryRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Growth</p>
              <p className="text-sm font-bold text-emerald-500 flex items-center justify-end gap-1">
                <TrendingUp className="h-3 w-3" />
                {career.growthRate || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {career.skills?.slice(0, 3).map(skill => (
              <span key={skill} className="text-[10px] font-bold px-2 py-1 bg-white/5 border border-white/5 rounded-md text-gray-400">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-white/[0.02] mt-auto">
          <Button
            onClick={() => router.push(`/whatcanibe/dashboard`)}
            className="w-full bg-white/5 hover:bg-violet-600 text-white hover:text-white border-white/10 hover:border-violet-500 rounded-xl group/btn transition-all duration-300"
          >
            View Roadmap
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </div>
      </GlowCard>
    </motion.div>
  );
}
