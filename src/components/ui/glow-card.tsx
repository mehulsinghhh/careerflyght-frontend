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

export function GlowCard({ children, className, glowColor = "rgba(79, 70, 229, 0.05)", onClick }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white/50 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5",
        className
      )}
    >
      <div
        className="absolute inset-0 -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          transform: "scale(2)",
        }}
      />
      {children}
    </motion.div>
  );
}
