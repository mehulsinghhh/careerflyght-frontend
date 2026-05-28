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
      <GlowCard className="h-full flex flex-col p-0 border-border bg-card/50 backdrop-blur-xl overflow-hidden group hover:border-primary/30 transition-all duration-500 rounded-[2.5rem]">
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`relative h-14 w-14 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500`}>
                <BrainCircuit className="h-7 w-7 text-primary" />
              </div>
            </div>
            {career.featured && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Featured
              </div>
            )}
          </div>

          <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">{career.title}</h3>
          <p className="text-base text-muted-foreground font-medium leading-relaxed line-clamp-3 mb-8">
            {career.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8 p-5 rounded-2xl bg-muted/50 border border-border">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Est. Salary</p>
              <p className="text-base font-bold text-foreground tracking-tight">{career.salaryRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Demand</p>
              <p className="text-base font-bold text-emerald-600 flex items-center justify-end gap-1.5">
                <TrendingUp className="h-4 w-4" />
                {career.growthRate || "High"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {career.skills?.slice(0, 3).map(skill => (
              <span key={skill} className="text-[10px] font-black px-3 py-1 bg-muted border border-border rounded-lg text-muted-foreground group-hover:text-foreground group-hover:border-primary/30 transition-all">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <Button
            onClick={() => router.push(`/whatcanibe/dashboard`)}
            className="w-full h-14 bg-foreground text-background hover:opacity-90 rounded-2xl group/btn transition-all duration-500 font-black text-lg shadow-lg shadow-foreground/10"
          >
            Explore Roadmap
            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Button>
        </div>
      </GlowCard>
    </motion.div>
  );
}
