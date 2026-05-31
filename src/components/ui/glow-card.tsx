"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export function GlowCard({ children, className, glowColor = "rgba(99, 102, 241, 0.05)", onClick }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-zinc-300",
        className
      )}
    >
      <div
        className="absolute inset-0 -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 80%)`,
          transform: "scale(1.2)",
        }}
      />
      {children}
    </motion.div>
  );
}
